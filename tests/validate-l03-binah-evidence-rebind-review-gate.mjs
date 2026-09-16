import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const allocationGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-positional-allocation-strategy-human-batch.v1.json');
const allocationTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-positional-allocation-strategy.approved-transition.v1.json');
const firstPositionReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-position-allocation-proposal-review.v1.json');
const firstPositionGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-position-allocation-proposal-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(allocationGate.status,'APPROVED_ALL_STRATEGY_AND_GOVERNANCE_DECISIONS');
assert.ok(allocationGate.strategy_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(allocationGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(allocationGate.selected_route,'SEQUENTIAL_SINGLE_POSITION_ALLOCATION_WITH_EXPLICIT_CONTENT_GATE');
assert.equal(allocationGate.checks.next_candidate_position_selector,1);
assert.equal(allocationGate.checks.individual_OPI_slots_assigned,0);

assert.equal(allocationTransition.status,'APPLIED_POSITIONAL_ALLOCATION_STRATEGY_SELECTION_ONLY_NO_POSITIONAL_ASSIGNMENT_NO_AUTHORING_NO_QA_NO_RUNTIME');
assert.equal(allocationTransition.selection_result.next_candidate_position_selector,1);
assert.equal(allocationTransition.guards.position_1_assigned,false);

assert.equal(firstPositionReview.status,'READY_FOR_HUMAN_REVIEW_PROPOSAL_ONLY_NO_POSITIONAL_ASSIGNMENT_NO_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(firstPositionReview.recommended_proposal,'PROPOSE_CLOSED_VALI_KE_PARAZAMI_KE_SOURCE_PACKAGE_FOR_INTERNAL_POSITION_1');
assert.deepEqual(firstPositionReview.proposed_package.source_package,['VALI KE','PARAZAMI KE']);
assert.equal(firstPositionReview.proposed_package.position_assignment_applied,false);

assert.equal(firstPositionGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(firstPositionGate.proposal_decisions.every(x=>x.decision==='PENDING'));
assert.ok(firstPositionGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(firstPositionGate.checks.internal_position_selector,1);
assert.deepEqual(firstPositionGate.checks.proposed_source_package,['VALI KE','PARAZAMI KE']);
assert.equal(firstPositionGate.checks.position_1_assigned,false);
assert.equal(firstPositionGate.checks.individual_OPI_slots_assigned,0);
assert.equal(firstPositionGate.checks.OPI_authored,0);
assert.equal(firstPositionGate.checks.OPI_validated,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_FIRST_POSITION_ALLOCATION_PROPOSAL_DECISION');
assert.equal(workstream.active_gate,firstPositionGate.batch_id);
assert.equal(workstream.positional_allocation.strategy_selected,true);
assert.equal(workstream.positional_allocation.next_candidate_position_selector,1);
assert.equal(workstream.positional_allocation.position_1_assigned,false);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-POSITIONAL-ALLOCATION-STRATEGY-SELECTED-FIRST-POSITION-PROPOSAL-PENDING-V143');
