import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-ke-surface-candidate.v1.json');
const validationGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-candidate-validation-human-batch.v1.json');
const validationTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-candidate-validation.approved-transition.v1.json');
const strategyReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-productivity-curriculum-use-strategy-review.v1.json');
const strategyGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-productivity-curriculum-use-strategy-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_SCOPED_NONPRODUCTIVE_NONRUNTIME');
assert.equal(candidate.authority,'CANDIDATE');
assert.equal(candidate.scope,'HNK-L03_BINAH_CONTROLLED_DIRECT_QUESTION_ONLY');
assert.equal(candidate.source_component.form,'KE');
assert.equal(candidate.source_component.source_id,'AUTH-019');
assert.equal(candidate.surface.schema,'[CONTROLLED_L03_DIRECT_QUESTION_CLAUSE] KE');
assert.equal(candidate.surface.token_order,'CONTROLLED_L03_DIRECT_QUESTION_CLAUSE_FIRST__KE_CLAUSE_FINAL');
assert.equal(candidate.surface.interrogative_marking_mechanism,'CLAUSE_FINAL_PARTICLE_KE');
assert.equal(candidate.payload_contract.bounded,true);
assert.equal(candidate.payload_contract.slot_content_authorized,false);
assert.equal(candidate.payload_contract.STR001_STR002_auto_wrapping,false);
assert.equal(candidate.payload_contract.arbitrary_clause_wrapping,false);
assert.equal(candidate.guards.candidate_validated,true);
assert.equal(candidate.guards.candidate_productive,false);
assert.equal(candidate.guards.candidate_curriculum_mapped,false);

assert.equal(validationGate.status,'APPROVED_ALL_VALIDATION_AND_GOVERNANCE_DECISIONS');
assert.ok(validationGate.validation_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(validationGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(validationGate.checks.candidate_validated,true);
assert.equal(validationGate.checks.candidate_productive,false);
assert.equal(validationGate.applied_effect.candidate_validated,true);
assert.equal(validationGate.applied_effect.candidate_productive,false);
assert.equal(validationGate.applied_effect.candidate_curriculum_mapped,false);
assert.equal(validationGate.applied_effect.OPI_unlocked,false);
assert.equal(validationGate.applied_effect.QA_unlocked,false);
assert.equal(validationGate.applied_effect.runtime_active,false);

assert.equal(validationTransition.status,'APPLIED_SCOPED_CANDIDATE_VALIDATION_ONLY_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(validationTransition.validation_result.candidate_validated,true);
assert.equal(validationTransition.guards.candidate_productive,false);
assert.equal(validationTransition.guards.candidate_curriculum_mapped,false);
assert.equal(validationTransition.guards.slot_content_authorized,false);
assert.equal(validationTransition.guards.KE_generalized_to_L03,false);
assert.equal(validationTransition.guards.OPI_unlocked,false);
assert.equal(validationTransition.guards.QA_unlocked,false);
assert.equal(validationTransition.guards.runtime_active,false);

assert.equal(strategyReview.status,'READY_FOR_HUMAN_REVIEW_STRATEGY_ONLY_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(strategyReview.recommended_route,'CONTROLLED_CLAUSE_PAYLOAD_DESIGN_FIRST');
assert.equal(strategyReview.candidate_state.validated,true);
assert.equal(strategyReview.candidate_state.productive,false);
assert.equal(strategyReview.candidate_state.curriculum_mapped,false);
assert.equal(strategyReview.candidate_state.slot_content_authorized,false);

assert.equal(strategyGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(strategyGate.strategy_decisions.every(x=>x.decision==='PENDING'));
assert.ok(strategyGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(strategyGate.checks.candidate_validated,true);
assert.equal(strategyGate.checks.candidate_productive,false);
assert.equal(strategyGate.checks.slot_content_authorized,false);
assert.equal(strategyGate.projected_effect_if_approved.selected_route,'CONTROLLED_CLAUSE_PAYLOAD_DESIGN_FIRST');
assert.equal(strategyGate.projected_effect_if_approved.candidate_productive,false);
assert.equal(strategyGate.projected_effect_if_approved.slot_content_authorized,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_INTERROGATIVE_PRODUCTIVITY_CURRICULUM_USE_STRATEGY_DECISION');
assert.equal(workstream.active_gate,strategyGate.batch_id);
assert.equal(workstream.recommended_route,'CONTROLLED_CLAUSE_PAYLOAD_DESIGN_FIRST');
assert.equal(workstream.candidate.created,true);
assert.equal(workstream.candidate.validated,true);
assert.equal(workstream.candidate.productive,false);
assert.equal(workstream.candidate.curriculum_mapped,false);
assert.equal(workstream.candidate.slot_content_authorized,false);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.equal(exactGate.status,'APPROVED_EXPLICIT_HUMAN_SURFACE_PACKAGE');
assert.equal(exactGate.applied_effect.surface_fields_selected,4);
assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-INTERROGATIVE-CANDIDATE-VALIDATED-STABLE-V130');
