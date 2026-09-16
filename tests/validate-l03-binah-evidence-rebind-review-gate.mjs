import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const mappingBinding=await json('curriculum/cycle-01/L03-binah/bindings/l03-foundational-interrogative-opi-curriculum-source.binding.v1.json');
const mappingGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-exact-opi-curriculum-mapping-human-batch.v1.json');
const mappingTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-exact-opi-curriculum-mapping.approved-transition.v1.json');
const slotStrategyReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-slot-identification-authoring-strategy-review.v1.json');
const slotStrategyGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-slot-identification-authoring-strategy-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_ALLOWLISTED_SCOPED_PRODUCTIVE_CURRICULUM_MAPPED_NONRUNTIME');
assert.equal(candidate.guards.candidate_productive,true);
assert.equal(candidate.guards.candidate_curriculum_mapped,true);
assert.deepEqual(candidate.productivity.productive_realizations,['VALI KE','PARAZAMI KE']);
assert.equal(candidate.curriculum_mapping.target_lane,'L03_OPI_FOUNDATIONAL_INTERROGATIVE');
assert.deepEqual(candidate.curriculum_mapping.individual_OPI_slot_ids_assigned,[]);
assert.equal(candidate.curriculum_mapping.OPI_authored,0);
assert.equal(candidate.curriculum_mapping.OPI_validated,0);

assert.equal(mappingBinding.status,'APPLIED_BOUNDED_SOURCE_MAPPING_NO_SLOT_ASSIGNMENT_NO_AUTHORING_NONRUNTIME');
assert.equal(mappingBinding.target_lane,'L03_OPI_FOUNDATIONAL_INTERROGATIVE');
assert.deepEqual(mappingBinding.productive_realizations,['VALI KE','PARAZAMI KE']);
assert.deepEqual(mappingBinding.individual_OPI_slot_ids_assigned,[]);
assert.equal(mappingBinding.slot_consumption,0);

assert.equal(mappingGate.status,'APPROVED_ALL_MAPPING_AND_GOVERNANCE_DECISIONS');
assert.ok(mappingGate.decisions.every(x=>x.decision==='APPROVED'));
assert.ok(mappingGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(mappingGate.checks.candidate_curriculum_mapped,true);
assert.deepEqual(mappingGate.checks.individual_OPI_slot_ids_assigned,[]);
assert.equal(mappingGate.checks.OPI_authored,0);
assert.equal(mappingGate.checks.OPI_validated,0);

assert.equal(mappingTransition.status,'APPLIED_BOUNDED_OPI_CURRICULUM_SOURCE_MAPPING_ONLY_NO_SLOT_ASSIGNMENT_NO_AUTHORING_NO_QA_NO_RUNTIME');
assert.equal(mappingTransition.mapping_result.target_lane,'L03_OPI_FOUNDATIONAL_INTERROGATIVE');
assert.equal(mappingTransition.guards.slot_consumption,0);

assert.equal(slotStrategyReview.status,'READY_FOR_HUMAN_REVIEW_STRATEGY_ONLY_NO_SLOT_CREATION_NO_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(slotStrategyReview.recommended_route,'SOURCE_LOCK_L03_FOUNDATIONAL_OPI_SLOT_MODEL_BEFORE_AUTHORING');
assert.deepEqual(slotStrategyReview.current_state.individual_OPI_slot_ids_assigned,[]);

assert.equal(slotStrategyGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(slotStrategyGate.strategy_decisions.every(x=>x.decision==='PENDING'));
assert.ok(slotStrategyGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.deepEqual(slotStrategyGate.checks.individual_OPI_slot_ids_assigned,[]);
assert.equal(slotStrategyGate.checks.OPI_authored,0);
assert.equal(slotStrategyGate.checks.OPI_validated,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_SLOT_IDENTIFICATION_AUTHORING_STRATEGY_DECISION');
assert.equal(workstream.active_gate,slotStrategyGate.batch_id);
assert.equal(workstream.first_payload_candidate.curriculum_mapped,true);
assert.deepEqual(workstream.first_payload_candidate.individual_OPI_slot_ids_assigned,[]);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-EXACT-OPI-CURRICULUM-SOURCE-MAPPED-SLOT-STRATEGY-PENDING-V140');
