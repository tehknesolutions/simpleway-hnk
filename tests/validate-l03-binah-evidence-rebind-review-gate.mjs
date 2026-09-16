import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const surfaceGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-exact-surface-function-package-human-batch.v1.json');
const matGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-candidate-materialization-human-batch.v1.json');
const matTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-candidate-materialization.approved-transition.v1.json');
const payloadCandidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const valAdmReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-payload-validation-allowlist-admission-review.v1.json');
const valAdmGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-validation-allowlist-admission-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(surfaceGate.status,'APPROVED_EXPLICIT_HUMAN_SURFACE_FUNCTION_PACKAGE');
assert.equal(surfaceGate.checks.completed_field_count,6);
assert.equal(matGate.status,'APPROVED_ALL_MATERIALIZATION_AND_GOVERNANCE_DECISIONS');
assert.ok(matGate.decisions.every(x=>x.decision==='APPROVED'));
assert.equal(matGate.checks.payload_candidate_created,true);
assert.equal(matGate.checks.payload_candidate_validated,false);
assert.equal(matGate.checks.payload_authorized,false);
assert.equal(matGate.checks.authorized_payload_count,0);

assert.equal(matTransition.status,'APPLIED_MATERIALIZATION_ONLY_UNVALIDATED_NOT_ALLOWLISTED_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(matTransition.materialization_result.created,true);
assert.equal(matTransition.materialization_result.validated,false);
assert.equal(matTransition.materialization_result.allowlisted,false);

assert.equal(payloadCandidate.status,'MATERIALIZED_UNVALIDATED_NOT_ALLOWLISTED_NONPRODUCTIVE_NONRUNTIME');
assert.equal(payloadCandidate.authority,'CANDIDATE');
assert.equal(payloadCandidate.surface.surface_form_or_package,'VALI | PARAZAMI');
assert.equal(payloadCandidate.surface.surface_schema,'[L03_CONTROLLED_ACTIVITY_LEXEME]');
assert.deepEqual(payloadCandidate.shell_composition.composed_examples,['VALI KE','PARAZAMI KE']);
assert.equal(payloadCandidate.relationship_to_existing_microgrammars.STR001_rule_inherited,false);
assert.equal(payloadCandidate.relationship_to_existing_microgrammars.STR002_rule_inherited,false);
assert.equal(payloadCandidate.allowlist.admitted,false);
assert.equal(payloadCandidate.allowlist.authorized_payload_count,0);
assert.equal(payloadCandidate.guards.candidate_validated,false);
assert.equal(payloadCandidate.guards.payload_authorized,false);
assert.equal(payloadCandidate.guards.candidate_productive,false);

assert.equal(valAdmReview.status,'READY_FOR_HUMAN_REVIEW_VALIDATION_AND_ALLOWLIST_ADMISSION_ONLY_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(valAdmReview.current_state.authorized_payload_count,0);
assert.equal(valAdmReview.admission_effect_if_approved.authorized_payload_count,1);
assert.equal(valAdmReview.admission_effect_if_approved.candidate_productive,false);

assert.equal(valAdmGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(valAdmGate.decisions.every(x=>x.decision==='PENDING'));
assert.ok(valAdmGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(valAdmGate.checks.payload_candidate_created,true);
assert.equal(valAdmGate.checks.payload_candidate_validated,false);
assert.equal(valAdmGate.checks.payload_authorized,false);
assert.equal(valAdmGate.checks.authorized_payload_count,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_FIRST_PAYLOAD_VALIDATION_AND_ALLOWLIST_ADMISSION_DECISION');
assert.equal(workstream.active_gate,valAdmGate.batch_id);
assert.equal(workstream.first_payload_candidate.created,true);
assert.equal(workstream.first_payload_candidate.validated,false);
assert.equal(workstream.first_payload_candidate.authorized,false);
assert.equal(workstream.payload_architecture.authorized_payload_count,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-FIRST-PAYLOAD-MATERIALIZED-VALIDATION-ADMISSION-PENDING-V135');
