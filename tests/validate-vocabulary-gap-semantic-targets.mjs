import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const targets=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_TARGETS_V1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets.approved-transition.v1.json');
const plan=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_AUTHORING_PLAN_V1.json');
const evidence=await json('progress/evidence-overrides.v1.json');

assert.equal(targets.proposal_id,'SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-TARGETS-V1');
assert.equal(targets.status,'APPROVED_SEMANTICS_FORM_MAPPING_PENDING');
assert.equal(targets.principle,'SEMANTICS_BEFORE_FORM');
assert.equal(targets.target_count,8);
assert.equal(targets.targets.length,8);
assert.deepEqual(targets.targets.map(x=>x.target_id),['SEM-025','SEM-026','SEM-027','SEM-028','SEM-029','SEM-030','SEM-031','SEM-032']);
assert.deepEqual(targets.targets.map(x=>x.semantic_key),['PERSONAL_NAME_DOMAIN','FIRST_PERSON_REFERENT','SECOND_PERSON_REFERENT','CONTENT_SELECTOR','QUESTION_OPERATOR','RESIDENCE_LIVE','PREFERENCE_LIKE','SPEAK_LANGUAGE_USE']);
assert.ok(targets.targets.every(x=>x.form_selected===null));
assert.ok(targets.targets.every(x=>x.historical_form_meaning_claim===false));
assert.deepEqual(targets.targets.map(x=>x.observed_form_to_investigate),['KALA','AN','EN','KU','KE','VANI','VAME','ZAMI']);

assert.equal(batch.batch_id,'SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-TARGETS-HUMAN-BATCH-V1');
assert.equal(batch.status,'APPROVED_SEMANTIC_TARGETS_ONLY_FORM_MAPPING_NOT_APPLIED');
assert.equal(batch.decisions.length,5);
assert.ok(batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(batch.current_state.semantic_targets_approved,8);
assert.equal(batch.current_state.forms_selected,0);
assert.equal(batch.current_state.canonical_registry_entries_created,0);
assert.equal(batch.applied_effect.vocabulary_MISSING,8);
assert.equal(batch.applied_effect.new_HNK_lexical_forms_created,0);
assert.equal(batch.applied_effect.language_authority_promotions,0);

assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.semantic_targets_approved,8);
assert.equal(transition.after.forms_selected,0);
assert.equal(transition.explicit_non_effects.canonical_registry_entries,0);

assert.equal(plan.status,'SEMANTIC_TARGETS_APPROVED_FORM_MAPPING_PROPOSED');
assert.equal(plan.current_decision,'EIGHT_SEMANTIC_TARGETS_APPROVED_EXACT_FORM_MAPPING_PROPOSED_NOT_APPLIED');
assert.equal(plan.mapping_architecture.canonical_registry_entries_created,0);
assert.equal(plan.new_HNK_lexical_forms_created,0);
assert.equal(plan.canonical_registry_entries_created,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_Vocabulary_validated,24);
assert.equal(v.L01_Vocabulary_missing,8);
assert.equal(v.prepared_vocabulary_batch,null);

console.log('PASS SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-TARGETS-V2');
console.log('Eight semantic targets APPROVED; exact form mapping is a separate proposed gate; zero forms or canonical entries applied.');
