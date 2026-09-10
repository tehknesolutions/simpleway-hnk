import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const targets=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_TARGETS_V1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');
const plan=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_AUTHORING_PLAN_V1.json');
const evidence=await json('progress/evidence-overrides.v1.json');

assert.equal(targets.proposal_id,'SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-TARGETS-V1');
assert.equal(targets.status,'PROPOSED_AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(targets.principle,'SEMANTICS_BEFORE_FORM');
assert.equal(targets.target_count,8);
assert.equal(targets.targets.length,8);
assert.deepEqual(targets.targets.map(x=>x.target_id),['SEM-025','SEM-026','SEM-027','SEM-028','SEM-029','SEM-030','SEM-031','SEM-032']);
assert.deepEqual(targets.targets.map(x=>x.semantic_key),['PERSONAL_NAME_DOMAIN','FIRST_PERSON_REFERENT','SECOND_PERSON_REFERENT','CONTENT_SELECTOR','QUESTION_OPERATOR','RESIDENCE_LIVE','PREFERENCE_LIKE','SPEAK_LANGUAGE_USE']);
assert.ok(targets.targets.every(x=>x.form_selected===null));
assert.ok(targets.targets.every(x=>x.historical_form_meaning_claim===false));
assert.deepEqual(targets.targets.map(x=>x.observed_form_to_investigate),['KALA','AN','EN','KU','KE','VANI','VAME','ZAMI']);

assert.equal(batch.batch_id,'SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-TARGETS-HUMAN-BATCH-V1');
assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,5);
assert.equal(batch.current_state.semantic_targets_proposed,8);
assert.equal(batch.current_state.forms_selected,0);
assert.equal(batch.current_state.canonical_registry_entries_created,0);
assert.equal(batch.projected_effect_if_all_approved.semantic_targets_approved,8);
assert.equal(batch.projected_effect_if_all_approved.vocabulary_MISSING,8);
assert.equal(batch.projected_effect_if_all_approved.new_HNK_lexical_forms_created,0);
assert.equal(batch.projected_effect_if_all_approved.language_authority_promotions,0);

assert.equal(plan.status,'SEMANTIC_TARGET_SET_PROPOSED_AWAITING_APPROVAL');
assert.equal(plan.current_decision,'EIGHT_SEMANTIC_TARGETS_PROPOSED_NO_FORMS_SELECTED');
assert.equal(plan.new_HNK_lexical_forms_created,0);
assert.equal(plan.canonical_registry_entries_created,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_Vocabulary_validated,24);
assert.equal(v.L01_Vocabulary_missing,8);
assert.equal(v.prepared_vocabulary_batch,null);
assert.equal(v.prepared_vocabulary_semantic_targets_batch,'../curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');

console.log('PASS SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-TARGETS-V1');
console.log('Eight semantic targets proposed under SEMANTICS_BEFORE_FORM; zero forms selected, zero canonical entries created, eight Vocabulary slots remain MISSING.');
