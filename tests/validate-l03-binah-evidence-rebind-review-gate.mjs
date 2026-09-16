import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const applicationGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-position-allocation-application-human-batch.v1.json');
const applicationTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-position-allocation-application.approved-transition.v1.json');
const positionBinding=await json('curriculum/cycle-01/L03-binah/bindings/l03-foundational-interrogative-opi-position-1-allocation.binding.v1.json');
const authoringReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-position-1-authoring-strategy-review.v1.json');
const authoringGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-authoring-strategy-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(applicationGate.status,'APPROVED_ALL_APPLICATION_AND_GOVERNANCE_DECISIONS');
assert.ok(applicationGate.application_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(applicationGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(applicationGate.checks.position_1_assigned,true);
assert.equal(applicationGate.checks.individual_OPI_slots_assigned,1);
assert.equal(applicationGate.checks.slot_consumption,1);
assert.equal(applicationGate.checks.OPI_authored,0);
assert.equal(applicationGate.checks.OPI_validated,0);

assert.equal(applicationTransition.status,'APPLIED_FIRST_POSITION_STRUCTURAL_ALLOCATION_ONLY_NO_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(applicationTransition.allocation_result.position_1_assigned,true);
assert.equal(applicationTransition.allocation_result.individual_OPI_slots_assigned,1);
assert.equal(applicationTransition.allocation_result.slot_consumption,1);

assert.equal(positionBinding.status,'APPLIED_STRUCTURAL_POSITION_ALLOCATION_NO_AUTHORING_NO_VALIDATION_NONRUNTIME');
assert.equal(positionBinding.internal_position_selector,1);
assert.equal(positionBinding.selector_authority,'NONCANONICAL_STRUCTURAL_INDEX_ONLY');
assert.deepEqual(positionBinding.source_package,['VALI KE','PARAZAMI KE']);
assert.equal(positionBinding.position_assigned,true);
assert.equal(positionBinding.structural_slot_consumption,1);
assert.equal(positionBinding.OPI_authored,0);
assert.equal(positionBinding.OPI_validated,0);
assert.equal(positionBinding.guards.canonical_slot_id_created,false);
assert.equal(positionBinding.guards.canonical_slot_label_created,false);

assert.equal(authoringReview.status,'READY_FOR_HUMAN_REVIEW_STRATEGY_ONLY_NO_OPI_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(authoringReview.recommended_route,'SOURCE_PACKAGE_PRESERVING_OPI_ARTIFACT_DESIGN_FIRST');
assert.equal(authoringReview.current_state.position_assigned,true);
assert.deepEqual(authoringReview.current_state.source_package,['VALI KE','PARAZAMI KE']);

assert.equal(authoringGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(authoringGate.strategy_decisions.every(x=>x.decision==='PENDING'));
assert.ok(authoringGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(authoringGate.checks.position_1_assigned,true);
assert.equal(authoringGate.checks.individual_OPI_slots_assigned,1);
assert.equal(authoringGate.checks.OPI_authored,0);
assert.equal(authoringGate.checks.OPI_validated,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_POSITION_1_AUTHORING_STRATEGY_DECISION');
assert.equal(workstream.active_gate,authoringGate.batch_id);
assert.equal(workstream.positional_allocation.position_1_assigned,true);
assert.equal(workstream.positional_allocation.slot_consumption,1);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-POSITION-1-STRUCTURALLY-ALLOCATED-AUTHORING-STRATEGY-PENDING-V145');
