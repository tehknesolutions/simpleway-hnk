import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const allowlist=await json('curriculum/cycle-01/L03-binah/bindings/l03-controlled-direct-question-clause-payload-allowlist.v1.json');
const eligibilityGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-productivity-eligibility-human-batch.v1.json');
const eligibilityTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-productivity-eligibility.approved-transition.v1.json');
const promotionReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-payload-scoped-productivity-promotion-review.v1.json');
const promotionGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-scoped-productivity-promotion-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_ALLOWLISTED_PRODUCTIVITY_ELIGIBLE_NONPRODUCTIVE_NONRUNTIME');
assert.equal(candidate.guards.candidate_validated,true);
assert.equal(candidate.guards.payload_authorized,true);
assert.equal(candidate.guards.productivity_eligible,true);
assert.equal(candidate.guards.candidate_productive,false);
assert.equal(candidate.allowlist.authorized_payload_count,1);
assert.deepEqual(candidate.shell_composition.composed_examples,['VALI KE','PARAZAMI KE']);
assert.equal(candidate.shell_composition.examples_productivity_eligible,true);
assert.equal(candidate.shell_composition.examples_productive,false);
assert.equal(candidate.lexical_anchors[0].lexical_authority,'FROZEN');
assert.equal(candidate.lexical_anchors[1].lexical_authority,'WATCH');

assert.equal(allowlist.status,'ACTIVE_ONE_VALIDATED_ELIGIBLE_MEMBER_NONPRODUCTIVE_NONRUNTIME');
assert.equal(allowlist.authorized_payload_count,1);
assert.equal(allowlist.members.length,1);
assert.equal(allowlist.members[0].productivity_eligible,true);
assert.equal(allowlist.members[0].productive,false);
assert.equal(allowlist.guards.productivity_promoted,false);

assert.equal(eligibilityGate.status,'APPROVED_ALL_ELIGIBILITY_AND_GOVERNANCE_DECISIONS');
assert.ok(eligibilityGate.decisions.every(x=>x.decision==='APPROVED'));
assert.ok(eligibilityGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(eligibilityGate.checks.productivity_eligible,true);
assert.equal(eligibilityGate.checks.candidate_productive,false);
assert.equal(eligibilityTransition.status,'APPLIED_PRODUCTIVITY_ELIGIBILITY_ONLY_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(eligibilityTransition.eligibility_result.productivity_eligible,true);
assert.equal(eligibilityTransition.guards.candidate_productive,false);

assert.equal(promotionReview.status,'READY_FOR_HUMAN_REVIEW_PROMOTION_ONLY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(promotionReview.recommended_decision,'PROMOTE_EXACT_VALIDATED_ALLOWLISTED_MEMBER_TO_SCOPED_PRODUCTIVITY_ONLY');
assert.equal(promotionReview.current_state.productivity_eligible,true);
assert.equal(promotionReview.current_state.productive,false);

assert.equal(promotionGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(promotionGate.decisions.every(x=>x.decision==='PENDING'));
assert.ok(promotionGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(promotionGate.checks.productivity_eligible,true);
assert.equal(promotionGate.checks.candidate_productive,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_FIRST_PAYLOAD_SCOPED_PRODUCTIVITY_PROMOTION_DECISION');
assert.equal(workstream.active_gate,promotionGate.batch_id);
assert.equal(workstream.first_payload_candidate.productivity_eligible,true);
assert.equal(workstream.first_payload_candidate.productive,false);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-FIRST-PAYLOAD-PRODUCTIVITY-ELIGIBLE-PROMOTION-PENDING-V137');
