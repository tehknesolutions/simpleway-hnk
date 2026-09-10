import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const review=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_FORM_MAPPING_REVIEW_V1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-form-mapping-human-batch.v1.json');
const semanticBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');

assert.equal(semanticBatch.status,'APPROVED_SEMANTIC_TARGETS_ONLY_FORM_MAPPING_NOT_APPLIED');
assert.equal(review.review_id,'SWHNK-L01-VOCABULARY-GAP-8-FORM-MAPPING-REVIEW-V1');
assert.equal(review.status,'PROPOSED_MAPPING_AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(review.target_count,8);
assert.equal(review.mappings.length,8);
assert.deepEqual(review.mappings.map(x=>x.proposed_form),['KALA','AN','EN','KU','KE','VANI','VAME','ZAMI']);
assert.deepEqual(review.mappings.slice(0,5).map(x=>x.proposed_canonical_id),['AUTH-015','AUTH-016','AUTH-017','AUTH-018','AUTH-019']);
assert.equal(review.mappings[5].proposed_canonical_id,null);
assert.equal(review.mappings[5].proposed_authority,'WATCH_UNCHANGED');
assert.equal(review.mappings[5].master_lexicon_meaning_change,false);
assert.equal(review.mappings[6].proposed_canonical_id,null);
assert.equal(review.mappings[6].proposed_authority,'GATE_UNCHANGED');
assert.equal(review.mappings[6].master_lexicon_authority_change,false);
assert.equal(review.mappings[7].proposed_canonical_id,'AUTH-020');
assert.ok(review.mappings.every(x=>x.historical_standalone_gloss_claim===false));
assert.equal(review.projected_architecture_if_approved.new_canonical_authored_candidates,6);
assert.equal(review.projected_architecture_if_approved.governed_unique_language_assets_before,45);
assert.equal(review.projected_architecture_if_approved.governed_unique_language_assets_after,51);
assert.equal(review.projected_architecture_if_approved.L01_distinct_governed_vocabulary_assets_after,32);

assert.equal(batch.batch_id,'SWHNK-L01-VOCABULARY-GAP-8-FORM-MAPPING-HUMAN-BATCH-V1');
assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,7);
assert.equal(batch.exact_mapping.length,8);
assert.deepEqual(batch.exact_mapping.map(x=>x.form),['KALA','AN','EN','KU','KE','VANI','VAME','ZAMI']);
assert.equal(batch.projected_effect_if_all_approved.new_canonical_authored_candidates,6);
assert.equal(batch.projected_effect_if_all_approved.canonical_authored_candidates_before,14);
assert.equal(batch.projected_effect_if_all_approved.canonical_authored_candidates_after,20);
assert.equal(batch.projected_effect_if_all_approved.governed_unique_language_assets_after,51);
assert.equal(batch.projected_effect_if_all_approved.vocabulary_slots_validated_by_this_gate,0);
assert.equal(batch.projected_effect_if_all_approved.language_authority_promotions,0);
assert.equal(batch.projected_effect_if_all_approved.historical_standalone_gloss_claims,0);

console.log('PASS SWHNK-L01-VOCABULARY-GAP-8-FORM-MAPPING-V1');
console.log('Exact mapping proposed only: 6 new CANDIDATE registrations + 2 scoped recovered-asset bindings; no application yet.');
