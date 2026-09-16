import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const strategyGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-curriculum-mapping-strategy-human-batch.v1.json');
const strategyTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-curriculum-mapping-strategy.approved-transition.v1.json');
const mappingReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-payload-exact-opi-curriculum-mapping-review.v1.json');
const mappingGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-exact-opi-curriculum-mapping-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_ALLOWLISTED_SCOPED_PRODUCTIVE_NONRUNTIME');
assert.equal(candidate.guards.candidate_productive,true);
assert.equal(candidate.guards.candidate_curriculum_mapped,false);
assert.deepEqual(candidate.productivity.productive_realizations,['VALI KE','PARAZAMI KE']);

assert.equal(strategyGate.status,'APPROVED_ALL_STRATEGY_AND_GOVERNANCE_DECISIONS');
assert.ok(strategyGate.strategy_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(strategyGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(strategyGate.selected_route,'MAP_TO_L03_OPI_FOUNDATIONAL_INTERROGATIVE_FIRST');
assert.equal(strategyGate.checks.candidate_curriculum_mapped,false);

assert.equal(strategyTransition.status,'APPLIED_MAPPING_STRATEGY_SELECTION_ONLY_NO_MAPPING_NO_OPI_AUTHORING_NO_QA_NO_RUNTIME');
assert.equal(strategyTransition.selection_result.target_lane,'L03_OPI_FOUNDATIONAL_INTERROGATIVE');
assert.equal(strategyTransition.guards.OPI_authored,0);

assert.equal(mappingReview.status,'READY_FOR_HUMAN_REVIEW_MAPPING_ONLY_NO_OPI_AUTHORING_NO_QA_NO_RUNTIME');
assert.equal(mappingReview.recommended_decision,'MAP_EXACT_PAIR_TO_L03_OPI_FOUNDATIONAL_INTERROGATIVE_LANE_ONLY');
assert.equal(mappingReview.proposed_mapping.individual_OPI_slot_assignment_authorized,false);

assert.equal(mappingGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(mappingGate.decisions.every(x=>x.decision==='PENDING'));
assert.ok(mappingGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(mappingGate.checks.candidate_curriculum_mapped,false);
assert.deepEqual(mappingGate.checks.individual_OPI_slot_ids_assigned,[]);
assert.equal(mappingGate.checks.OPI_authored,0);
assert.equal(mappingGate.checks.OPI_validated,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_EXACT_L03_OPI_CURRICULUM_MAPPING_DECISION');
assert.equal(workstream.active_gate,mappingGate.batch_id);
assert.equal(workstream.first_payload_candidate.curriculum_mapping_strategy_selected,true);
assert.equal(workstream.first_payload_candidate.curriculum_mapped,false);
assert.deepEqual(workstream.first_payload_candidate.individual_OPI_slot_ids_assigned,[]);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-MAPPING-STRATEGY-SELECTED-EXACT-OPI-MAPPING-PENDING-V139');
