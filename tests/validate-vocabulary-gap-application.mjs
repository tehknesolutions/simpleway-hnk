import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const application=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-gap-8-application.v1.json');
const mappingBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-form-mapping-human-batch.v1.json');
const finalBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032-human-batch.v1.json');
const finalTransition=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032.validated-transition.v1.json');
const supplement=await json('progress/evidence-overrides.v37.json');

assert.equal(mappingBatch.status,'APPROVED_EXACT_MAPPING_APPLICATION_AUTHORIZED');
assert.equal(mappingBatch.authorization.register_auth_015_020,true);
assert.equal(mappingBatch.authorization.bind_VANI_scoped_L01,true);
assert.equal(mappingBatch.authorization.rebind_VAME_scoped_L01,true);
assert.equal(mappingBatch.authorization.author_VOC_025_032,true);
assert.equal(mappingBatch.authorization.validate_VOC_025_032,false);

assert.equal(application.application_id,'SWHNK-L01-VOCABULARY-GAP-8-APPLICATION-V1');
assert.equal(application.status,'APPLIED_TO_AUTHORING_NOT_VALIDATION');
assert.equal(application.language_authority_source.repository,'tehknesolutions/codex-hnk');
assert.equal(application.language_authority_source.registry_version,'1.5.0-candidate');
assert.deepEqual(application.entries.map(x=>x.form),['KALA','AN','EN','KU','KE','VANI','VAME','ZAMI']);
assert.deepEqual(application.entries.filter(x=>x.canonical_ref?.startsWith('AUTH-')).map(x=>x.canonical_ref),['AUTH-015','AUTH-016','AUTH-017','AUTH-018','AUTH-019','AUTH-020']);

const vani=application.entries.find(x=>x.form==='VANI');
const vame=application.entries.find(x=>x.form==='VAME');
assert.equal(vani.canonical_ref,'LEX-031');
assert.equal(vani.authority,'WATCH');
assert.match(vani.boundary,/Master Lexicon meaning remains null/);
assert.equal(vame.canonical_ref,'LEX-025');
assert.equal(vame.authority,'GATE');
assert.equal(application.effects.new_authored_candidate_registry_entries,6);
assert.equal(application.effects.new_surface_forms_created,0);
assert.equal(application.effects.scoped_recovered_bindings,2);
assert.equal(application.effects.language_authority_promotions,0);

assert.equal(lane.status,'AUTHORED_32_OF_32_VALIDATED_32_COMPLETE');
assert.equal(lane.entries.length,32);
assert.equal(lane.metrics.VALIDATED,32);
assert.equal(lane.metrics.language_authority_promotions,0);

assert.equal(finalBatch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.ok(finalBatch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(finalBatch.applied_effect.global_VALIDATED_after,133);
assert.equal(finalBatch.applied_effect.language_authority_promotions,0);
assert.equal(finalTransition.status,'APPLIED');
assert.equal(finalTransition.global_after.AUTHORED,0);
assert.equal(finalTransition.global_after.VALIDATED,133);
assert.equal(finalTransition.vocabulary_after.VALIDATED,32);
assert.equal(finalTransition.preserved_boundaries.AUTH_015_020,'CANDIDATE_UNCHANGED');
assert.equal(finalTransition.preserved_boundaries.VANI.authority,'WATCH');
assert.equal(finalTransition.preserved_boundaries.VANI.master_meaning,null);
assert.equal(finalTransition.preserved_boundaries.VAME.authority,'GATE');

assert.equal(supplement.overrides[0].implementation_state,'VALIDATED');
assert.equal(supplement.lexical_evidence_updates.governed_unique_language_assets,51);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_authored,0);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_validated,32);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_missing,0);
assert.equal(supplement.validation_evidence_updates.prepared_vocabulary_batch,null);

console.log('PASS SWHNK-L01-VOCABULARY-GAP-8-APPLICATION-V2');
console.log('Gap-8 mapping remains governed authorship; VOC-025..032 are now scoped VALIDATED with zero language-authority promotions.');
