import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const surfaceGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-exact-surface-function-package-human-batch.v1.json');
const surfaceTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-exact-surface-function-package.approved-transition.v1.json');
const matReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-payload-candidate-materialization-review.v1.json');
const matGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-candidate-materialization-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(surfaceGate.status,'APPROVED_EXPLICIT_HUMAN_SURFACE_FUNCTION_PACKAGE');
assert.equal(surfaceGate.checks.required_field_count,6);
assert.equal(surfaceGate.checks.completed_field_count,6);
assert.equal(surfaceGate.checks.explicit_package_complete,true);
assert.equal(surfaceGate.required_fields.surface_form_or_package,'VALI | PARAZAMI');
assert.equal(surfaceGate.required_fields.surface_schema,'[L03_CONTROLLED_ACTIVITY_LEXEME]');
assert.equal(surfaceGate.required_fields.token_order_or_orderless_contract,'SINGLE_ATOMIC_LEXEME');
assert.equal(surfaceGate.required_fields.predication_or_copula_contract,'DEDICATED_LEXICAL_ACTIVITY_PREDICATION_NO_COPULA_ASSERTED');
assert.equal(surfaceGate.required_fields.subject_person_contract,'NO_SUBJECT_PERSON_VALUE_ENCODED_OR_INFERRED');
assert.equal(surfaceGate.required_fields.tense_aspect_contract,'NO_TENSE_ASPECT_VALUE_ENCODED_OR_INFERRED');
assert.deepEqual(surfaceGate.shell_composition.composed_candidate_examples,['VALI KE','PARAZAMI KE']);
assert.equal(surfaceGate.checks.payload_candidate_created,false);
assert.equal(surfaceGate.checks.payload_authorized,false);
assert.equal(surfaceGate.checks.authorized_payload_count,0);

assert.equal(surfaceTransition.status,'APPLIED_EXPLICIT_SIX_FIELD_PACKAGE_SELECTION_ONLY_NO_MATERIALIZATION_NO_ADMISSION_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(surfaceTransition.selection_result.completed_fields,6);
assert.equal(surfaceTransition.guards.payload_candidate_created,false);
assert.equal(surfaceTransition.guards.payload_authorized,false);
assert.equal(surfaceTransition.guards.authorized_payload_count,0);

assert.equal(matReview.status,'READY_FOR_HUMAN_REVIEW_MATERIALIZATION_ONLY_NO_ALLOWLIST_ADMISSION_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(matReview.future_candidate.surface_form_or_package,'VALI | PARAZAMI');
assert.deepEqual(matReview.future_candidate.composed_shell_examples,['VALI KE','PARAZAMI KE']);
assert.equal(matReview.post_materialization_if_approved.payload_authorized,false);
assert.equal(matReview.post_materialization_if_approved.authorized_payload_count,0);

assert.equal(matGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(matGate.decisions.every(x=>x.decision==='PENDING'));
assert.equal(matGate.checks.surface_function_package_complete,true);
assert.equal(matGate.checks.surface_function_fields_selected,6);
assert.equal(matGate.checks.payload_candidate_created,false);
assert.equal(matGate.checks.payload_authorized,false);
assert.equal(matGate.checks.authorized_payload_count,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_FIRST_PAYLOAD_CANDIDATE_MATERIALIZATION_DECISION');
assert.equal(workstream.active_gate,matGate.batch_id);
assert.equal(workstream.first_payload_candidate.surface_fields_selected,6);
assert.equal(workstream.first_payload_candidate.created,false);
assert.equal(workstream.first_payload_candidate.authorized,false);
assert.equal(workstream.payload_architecture.authorized_payload_count,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-FIRST-PAYLOAD-SURFACE-FUNCTION-6-OF-6-APPROVED-MATERIALIZATION-PENDING-V134');
