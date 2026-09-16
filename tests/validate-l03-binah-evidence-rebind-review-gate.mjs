import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const mappingBinding=await json('curriculum/cycle-01/L03-binah/bindings/l03-foundational-interrogative-opi-curriculum-source.binding.v1.json');
const strategyGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-slot-identification-authoring-strategy-human-batch.v1.json');
const strategyTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-slot-identification-authoring-strategy.approved-transition.v1.json');
const slotModelReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-slot-model-source-lock-review.v1.json');
const slotModelGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-slot-model-source-lock-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_ALLOWLISTED_SCOPED_PRODUCTIVE_CURRICULUM_MAPPED_NONRUNTIME');
assert.equal(candidate.guards.candidate_productive,true);
assert.equal(candidate.guards.candidate_curriculum_mapped,true);
assert.deepEqual(candidate.productivity.productive_realizations,['VALI KE','PARAZAMI KE']);
assert.equal(mappingBinding.target_lane,'L03_OPI_FOUNDATIONAL_INTERROGATIVE');
assert.deepEqual(mappingBinding.individual_OPI_slot_ids_assigned,[]);
assert.equal(mappingBinding.slot_consumption,0);

assert.equal(strategyGate.status,'APPROVED_ALL_STRATEGY_AND_GOVERNANCE_DECISIONS');
assert.ok(strategyGate.strategy_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(strategyGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(strategyGate.selected_route,'SOURCE_LOCK_L03_FOUNDATIONAL_OPI_SLOT_MODEL_BEFORE_AUTHORING');
assert.equal(strategyGate.checks.OPI_authored,0);
assert.equal(strategyGate.checks.OPI_validated,0);

assert.equal(strategyTransition.status,'APPLIED_SLOT_IDENTIFICATION_AUTHORING_STRATEGY_SELECTION_ONLY_NO_SLOT_CREATION_NO_ASSIGNMENT_NO_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(strategyTransition.selection_result.known_OPI_cardinality,10);
assert.deepEqual(strategyTransition.selection_result.canonical_individual_slot_ids,[]);

assert.equal(slotModelReview.status,'READY_FOR_HUMAN_REVIEW_SOURCE_LOCK_MODEL_ONLY_NO_SLOT_ASSIGNMENT_NO_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(slotModelReview.evidence_classification,'CARDINALITY_KNOWN_INDIVIDUAL_SLOT_IDENTITY_UNRESOLVED');
assert.equal(slotModelReview.recommended_model.slot_cardinality,10);
assert.deepEqual(slotModelReview.recommended_model.canonical_slot_ids,[]);
assert.deepEqual(slotModelReview.recommended_model.internal_position_selectors,[1,2,3,4,5,6,7,8,9,10]);
assert.equal(slotModelReview.recommended_model.internal_position_selectors_are_slot_ids,false);

assert.equal(slotModelGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(slotModelGate.decisions.every(x=>x.decision==='PENDING'));
assert.ok(slotModelGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(slotModelGate.checks.manifest_OPI_target,10);
assert.deepEqual(slotModelGate.checks.canonical_slot_ids,[]);
assert.equal(slotModelGate.checks.individual_OPI_slots_assigned,0);
assert.equal(slotModelGate.checks.OPI_authored,0);
assert.equal(slotModelGate.checks.OPI_validated,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_SLOT_MODEL_SOURCE_LOCK_DECISION');
assert.equal(workstream.active_gate,slotModelGate.batch_id);
assert.equal(workstream.OPI_slot_strategy.selected,true);
assert.equal(workstream.OPI_slot_strategy.route,'SOURCE_LOCK_L03_FOUNDATIONAL_OPI_SLOT_MODEL_BEFORE_AUTHORING');
assert.equal(workstream.OPI_slot_strategy.slot_model_source_locked,false);
assert.deepEqual(workstream.OPI_slot_strategy.canonical_slot_ids,[]);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.equal(manifest.pedagogy.opi_target,10);
assert.equal(manifest.pedagogy.opi_AUTHORED,0);
assert.equal(manifest.pedagogy.opi_VALIDATED,0);
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-OPI-SLOT-STRATEGY-SELECTED-SLOT-MODEL-SOURCE-LOCK-PENDING-V141');
