import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const review=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_FORM_MAPPING_REVIEW_V1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-form-mapping-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-form-mapping.approved-transition.v1.json');
const application=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-gap-8-application.v1.json');
const semanticBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');

assert.equal(semanticBatch.status,'APPROVED_SEMANTIC_TARGETS_ONLY_FORM_MAPPING_NOT_APPLIED');
assert.equal(review.review_id,'SWHNK-L01-VOCABULARY-GAP-8-FORM-MAPPING-REVIEW-V1');
assert.equal(review.target_count,8);
assert.equal(review.mappings.length,8);
assert.deepEqual(review.mappings.map(x=>x.proposed_form),['KALA','AN','EN','KU','KE','VANI','VAME','ZAMI']);
assert.deepEqual(review.mappings.slice(0,5).map(x=>x.proposed_canonical_id),['AUTH-015','AUTH-016','AUTH-017','AUTH-018','AUTH-019']);
assert.equal(review.mappings[5].proposed_authority,'WATCH_UNCHANGED');
assert.equal(review.mappings[6].proposed_authority,'GATE_UNCHANGED');
assert.equal(review.mappings[7].proposed_canonical_id,'AUTH-020');
assert.ok(review.mappings.every(x=>x.historical_standalone_gloss_claim===false));

assert.equal(batch.batch_id,'SWHNK-L01-VOCABULARY-GAP-8-FORM-MAPPING-HUMAN-BATCH-V1');
assert.equal(batch.status,'APPROVED_EXACT_MAPPING_APPLICATION_AUTHORIZED');
assert.deepEqual(batch.decisions_approved,['DEC-MAP-001','DEC-MAP-002','DEC-MAP-003','DEC-MAP-004','DEC-MAP-005','DEC-MAP-006','DEC-MAP-007']);
assert.equal(batch.authorization.register_auth_015_020,true);
assert.equal(batch.authorization.bind_VANI_scoped_L01,true);
assert.equal(batch.authorization.rebind_VAME_scoped_L01,true);
assert.equal(batch.authorization.author_VOC_025_032,true);
assert.equal(batch.authorization.validate_VOC_025_032,false);
assert.equal(batch.preserved_boundaries.VANI_master_meaning,null);
assert.equal(batch.preserved_boundaries.VANI_authority,'WATCH');
assert.equal(batch.preserved_boundaries.VAME_authority,'GATE');
assert.equal(batch.preserved_boundaries.language_authority_promotions,0);

assert.equal(transition.status,'APPLIED_APPROVAL_ONLY');
assert.equal(transition.after.forms_mapping_approved,8);
assert.equal(transition.explicit_non_effects.vocabulary_slot_state_changes,0);

assert.equal(application.status,'APPLIED_TO_AUTHORING_NOT_VALIDATION');
assert.equal(application.entries.length,8);
assert.deepEqual(application.entries.map(x=>x.form),['KALA','AN','EN','KU','KE','VANI','VAME','ZAMI']);
assert.deepEqual(application.entries.filter(x=>x.canonical_ref?.startsWith('AUTH-')).map(x=>x.canonical_ref),['AUTH-015','AUTH-016','AUTH-017','AUTH-018','AUTH-019','AUTH-020']);
assert.equal(application.entries.find(x=>x.form==='VANI').canonical_ref,'LEX-031');
assert.equal(application.entries.find(x=>x.form==='VANI').authority,'WATCH');
assert.equal(application.entries.find(x=>x.form==='VAME').canonical_ref,'LEX-025');
assert.equal(application.entries.find(x=>x.form==='VAME').authority,'GATE');
assert.equal(application.effects.vocabulary_authored_after,32);
assert.equal(application.effects.vocabulary_validated_unchanged,24);
assert.equal(application.effects.language_authority_promotions,0);

console.log('PASS SWHNK-L01-VOCABULARY-GAP-8-FORM-MAPPING-V37');
console.log('Exact mapping approved and applied to authoring: 6 CANDIDATE registry refs + VANI/VAME scoped bindings; VOC-025..032 remain pending validation.');
