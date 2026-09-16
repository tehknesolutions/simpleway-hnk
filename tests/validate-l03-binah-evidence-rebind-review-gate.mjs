import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const mappingBinding=await json('curriculum/cycle-01/L03-binah/bindings/l03-foundational-interrogative-opi-curriculum-source.binding.v1.json');
const slotStrategyGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-slot-identification-authoring-strategy-human-batch.v1.json');
const slotModelGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-slot-model-source-lock-human-batch.v1.json');
const slotModelTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-slot-model-source-lock.approved-transition.v1.json');
const allocationReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-positional-allocation-strategy-review.v1.json');
const allocationGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-positional-allocation-strategy-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_ALLOWLISTED_SCOPED_PRODUCTIVE_CURRICULUM_MAPPED_NONRUNTIME');
assert.equal(candidate.guards.candidate_curriculum_mapped,true);
assert.deepEqual(mappingBinding.productive_realizations,['VALI KE','PARAZAMI KE']);
assert.equal(mappingBinding.slot_consumption,0);

assert.equal(slotStrategyGate.status,'APPROVED_ALL_STRATEGY_AND_GOVERNANCE_DECISIONS');
assert.ok(slotStrategyGate.strategy_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(slotStrategyGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(slotStrategyGate.selected_route,'SOURCE_LOCK_L03_FOUNDATIONAL_OPI_SLOT_MODEL_BEFORE_AUTHORING');

assert.equal(slotModelGate.status,'APPROVED_ALL_SLOT_MODEL_AND_GOVERNANCE_DECISIONS');
assert.ok(slotModelGate.decisions.every(x=>x.decision==='APPROVED'));
assert.ok(slotModelGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(slotModelGate.checks.manifest_OPI_target,10);
assert.deepEqual(slotModelGate.checks.canonical_slot_ids,[]);
assert.deepEqual(slotModelGate.checks.internal_position_selectors_approved,[1,2,3,4,5,6,7,8,9,10]);
assert.equal(slotModelGate.checks.individual_OPI_slots_assigned,0);

assert.equal(slotModelTransition.status,'APPLIED_SLOT_MODEL_SOURCE_LOCK_ONLY_NO_POSITIONAL_ALLOCATION_NO_AUTHORING_NO_QA_NO_RUNTIME');
assert.equal(slotModelTransition.slot_model_result.cardinality,10);
assert.equal(slotModelTransition.slot_model_result.selector_authority,'NONCANONICAL_STRUCTURAL_INDEX_ONLY');
assert.equal(slotModelTransition.slot_model_result.individual_OPI_slots_assigned,0);

assert.equal(allocationReview.status,'READY_FOR_HUMAN_REVIEW_STRATEGY_ONLY_NO_POSITIONAL_ASSIGNMENT_NO_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(allocationReview.recommended_route,'SEQUENTIAL_SINGLE_POSITION_ALLOCATION_WITH_EXPLICIT_CONTENT_GATE');
assert.equal(allocationReview.post_strategy_if_approved.next_candidate_position_selector,1);

assert.equal(allocationGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(allocationGate.strategy_decisions.every(x=>x.decision==='PENDING'));
assert.ok(allocationGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(allocationGate.checks.individual_OPI_slots_assigned,0);
assert.equal(allocationGate.checks.OPI_authored,0);
assert.equal(allocationGate.checks.OPI_validated,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_POSITIONAL_ALLOCATION_STRATEGY_DECISION');
assert.equal(workstream.active_gate,allocationGate.batch_id);
assert.equal(workstream.OPI_slot_model.source_locked,true);
assert.equal(workstream.OPI_slot_model.cardinality,10);
assert.deepEqual(workstream.OPI_slot_model.canonical_slot_ids,[]);
assert.equal(workstream.OPI_slot_model.individual_slots_assigned,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-OPI-SLOT-MODEL-SOURCE-LOCKED-POSITIONAL-ALLOCATION-STRATEGY-PENDING-V142');
