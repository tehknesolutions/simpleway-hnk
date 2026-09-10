import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const targets=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_TARGETS_V1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets.approved-transition.v1.json');
const plan=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_AUTHORING_PLAN_V1.json');
const mapping=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-form-mapping-human-batch.v1.json');
const application=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-gap-8-application.v1.json');
const supplement=await json('progress/evidence-overrides.v37.json');

assert.equal(targets.proposal_id,'SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-TARGETS-V1');
assert.equal(targets.status,'APPROVED_SEMANTICS_MAPPING_APPLIED_VALIDATION_PENDING');
assert.equal(targets.principle,'SEMANTICS_BEFORE_FORM');
assert.equal(targets.target_count,8);
assert.deepEqual(targets.targets.map(x=>x.target_id),['SEM-025','SEM-026','SEM-027','SEM-028','SEM-029','SEM-030','SEM-031','SEM-032']);
assert.deepEqual(targets.targets.map(x=>x.semantic_key),['PERSONAL_NAME_DOMAIN','FIRST_PERSON_REFERENT','SECOND_PERSON_REFERENT','CONTENT_SELECTOR','QUESTION_OPERATOR','RESIDENCE_LIVE','PREFERENCE_LIKE','SPEAK_LANGUAGE_USE']);
assert.ok(targets.targets.every(x=>x.form_selected===null));
assert.ok(targets.targets.every(x=>x.historical_form_meaning_claim===false));
assert.deepEqual(targets.mapping_application.mapped_forms,['KALA','AN','EN','KU','KE','VANI','VAME','ZAMI']);
assert.equal(targets.mapping_application.new_authored_candidates,6);
assert.equal(targets.mapping_application.scoped_recovered_bindings,2);
assert.equal(targets.mapping_application.vocabulary_slots_authored,8);
assert.equal(targets.mapping_application.vocabulary_slots_validated,0);

assert.equal(batch.status,'APPROVED_SEMANTIC_TARGETS_ONLY_FORM_MAPPING_NOT_APPLIED');
assert.ok(batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(batch.current_state.semantic_targets_approved,8);
assert.equal(batch.current_state.forms_selected,0);
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.semantic_targets_approved,8);

assert.equal(mapping.status,'APPROVED_EXACT_MAPPING_APPLICATION_AUTHORIZED');
assert.equal(application.status,'APPLIED_TO_AUTHORING_NOT_VALIDATION');
assert.equal(application.entries.length,8);

assert.equal(plan.status,'MAPPING_APPLIED_VOCABULARY_AUTHORED_VALIDATION_PENDING');
assert.equal(plan.problem.remaining_gap,0);
assert.equal(plan.problem.authored_pending_validation,8);
assert.equal(plan.mapping_architecture.canonical_registry_entries_created,6);
assert.equal(plan.mapping_architecture.vocabulary_slots_filled_by_mapping,8);
assert.equal(plan.mapping_architecture.vocabulary_slots_validated_by_mapping,0);
assert.equal(plan.current_decision,'VOCABULARY_32_OF_32_AUTHORED_FINAL_8_AWAITING_EXPLICIT_HUMAN_VALIDATION');
assert.equal(plan.new_surface_forms_created,0);
assert.equal(plan.language_authority_promotions,0);

assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_authored,8);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_validated,24);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_missing,0);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_authored_or_better,32);

console.log('PASS SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-TARGETS-V3');
console.log('Eight semantic targets approved; mapping applied under separate governance; 8 Vocabulary slots authored and still awaiting explicit validation.');
