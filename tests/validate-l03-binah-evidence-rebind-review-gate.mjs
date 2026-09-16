import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const proposalGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-position-allocation-proposal-human-batch.v1.json');
const proposalTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-position-allocation-proposal.approved-transition.v1.json');
const applicationReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-position-allocation-application-review.v1.json');
const applicationGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-position-allocation-application-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(proposalGate.status,'APPROVED_ALL_PROPOSAL_AND_GOVERNANCE_DECISIONS');
assert.ok(proposalGate.proposal_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(proposalGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(proposalGate.checks.first_position_package_proposal_approved,true);
assert.equal(proposalGate.checks.position_1_assigned,false);
assert.equal(proposalGate.checks.individual_OPI_slots_assigned,0);

assert.equal(proposalTransition.status,'APPLIED_FIRST_POSITION_SOURCE_PACKAGE_PROPOSAL_ONLY_NO_POSITIONAL_ASSIGNMENT_NO_AUTHORING_NO_QA_NO_RUNTIME');
assert.equal(proposalTransition.proposal_result.internal_position_selector,1);
assert.deepEqual(proposalTransition.proposal_result.proposed_source_package,['VALI KE','PARAZAMI KE']);
assert.equal(proposalTransition.proposal_result.position_1_assigned,false);

assert.equal(applicationReview.status,'READY_FOR_HUMAN_REVIEW_APPLICATION_ONLY_NO_OPI_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(applicationReview.recommended_decision,'APPLY_CLOSED_VALI_KE_PARAZAMI_KE_PACKAGE_TO_INTERNAL_POSITION_1_ONLY');
assert.equal(applicationReview.application_if_approved.position_1_assigned,true);
assert.equal(applicationReview.application_if_approved.individual_OPI_slots_assigned,1);
assert.equal(applicationReview.application_if_approved.OPI_authored,0);

assert.equal(applicationGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(applicationGate.application_decisions.every(x=>x.decision==='PENDING'));
assert.ok(applicationGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(applicationGate.checks.first_position_package_proposal_approved,true);
assert.equal(applicationGate.checks.internal_position_selector,1);
assert.deepEqual(applicationGate.checks.source_package,['VALI KE','PARAZAMI KE']);
assert.equal(applicationGate.checks.position_1_assigned,false);
assert.equal(applicationGate.checks.individual_OPI_slots_assigned,0);
assert.equal(applicationGate.checks.slot_consumption,0);
assert.equal(applicationGate.checks.OPI_authored,0);
assert.equal(applicationGate.checks.OPI_validated,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_FIRST_POSITION_ALLOCATION_APPLICATION_DECISION');
assert.equal(workstream.active_gate,applicationGate.batch_id);
assert.equal(workstream.positional_allocation.first_position_package_proposal_approved,true);
assert.equal(workstream.positional_allocation.position_1_assigned,false);
assert.equal(workstream.OPI_slot_model.individual_slots_assigned,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-FIRST-POSITION-PROPOSAL-APPROVED-APPLICATION-PENDING-V144');
