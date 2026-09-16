import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const validationGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-validation-allowlist-admission-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-validation-allowlist-admission.approved-transition.v1.json');
const allowlist=await json('curriculum/cycle-01/L03-binah/bindings/l03-controlled-direct-question-clause-payload-allowlist.v1.json');
const eligibilityReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-payload-productivity-eligibility-review.v1.json');
const eligibilityGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-productivity-eligibility-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_ALLOWLISTED_NONPRODUCTIVE_NONRUNTIME');
assert.equal(candidate.guards.candidate_validated,true);
assert.equal(candidate.guards.payload_authorized,true);
assert.equal(candidate.guards.candidate_productive,false);
assert.equal(candidate.allowlist.admitted,true);
assert.equal(candidate.allowlist.authorized_payload_count,1);
assert.deepEqual(candidate.shell_composition.composed_examples,['VALI KE','PARAZAMI KE']);
assert.equal(candidate.shell_composition.examples_productive,false);
assert.equal(candidate.lexical_anchors[0].lexical_authority,'FROZEN');
assert.equal(candidate.lexical_anchors[1].lexical_authority,'WATCH');

assert.equal(validationGate.status,'APPROVED_ALL_VALIDATION_ADMISSION_AND_GOVERNANCE_DECISIONS');
assert.ok(validationGate.decisions.every(x=>x.decision==='APPROVED'));
assert.ok(validationGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(validationGate.checks.payload_candidate_validated,true);
assert.equal(validationGate.checks.payload_authorized,true);
assert.equal(validationGate.checks.authorized_payload_count,1);
assert.equal(validationGate.checks.candidate_productive,false);

assert.equal(transition.status,'APPLIED_VALIDATION_AND_FIRST_CLOSED_ALLOWLIST_ADMISSION_ONLY_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(transition.allowlist_result.authorized_payload_count,1);
assert.equal(transition.allowlist_result.slot_content_authorized,true);
assert.equal(transition.guards.candidate_productive,false);

assert.equal(allowlist.status,'ACTIVE_ONE_VALIDATED_MEMBER_NONPRODUCTIVE_NONRUNTIME');
assert.equal(allowlist.membership_model,'CLOSED_ALLOWLIST');
assert.equal(allowlist.authorized_payload_count,1);
assert.equal(allowlist.members.length,1);
assert.equal(allowlist.members[0].candidate_id,candidate.candidate_id);
assert.equal(allowlist.members[0].validated,true);
assert.equal(allowlist.members[0].authorized,true);
assert.equal(allowlist.members[0].productive,false);
assert.equal(allowlist.guards.arbitrary_clause_admission,false);

assert.equal(eligibilityReview.status,'READY_FOR_HUMAN_REVIEW_ELIGIBILITY_ONLY_NO_PRODUCTIVITY_PROMOTION_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(eligibilityReview.recommended_decision,'ELIGIBLE_FOR_SEPARATE_SCOPED_PRODUCTIVITY_PROMOTION');
assert.equal(eligibilityReview.current_state.validated,true);
assert.equal(eligibilityReview.current_state.allowlisted,true);
assert.equal(eligibilityReview.current_state.productive,false);

assert.equal(eligibilityGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(eligibilityGate.decisions.every(x=>x.decision==='PENDING'));
assert.ok(eligibilityGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(eligibilityGate.checks.productivity_eligible,false);
assert.equal(eligibilityGate.checks.candidate_productive,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_FIRST_PAYLOAD_PRODUCTIVITY_ELIGIBILITY_DECISION');
assert.equal(workstream.active_gate,eligibilityGate.batch_id);
assert.equal(workstream.payload_architecture.authorized_payload_count,1);
assert.equal(workstream.first_payload_candidate.validated,true);
assert.equal(workstream.first_payload_candidate.authorized,true);
assert.equal(workstream.first_payload_candidate.productivity_eligible,false);
assert.equal(workstream.first_payload_candidate.productive,false);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-FIRST-PAYLOAD-VALIDATED-ALLOWLISTED-PRODUCTIVITY-ELIGIBILITY-PENDING-V136');
