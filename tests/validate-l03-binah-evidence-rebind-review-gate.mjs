import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-ke-surface-candidate.v1.json');
const validationGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-candidate-validation-human-batch.v1.json');
const strategyGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-productivity-curriculum-use-strategy-human-batch.v1.json');
const strategyTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-productivity-curriculum-use-strategy.approved-transition.v1.json');
const payloadReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-controlled-clause-payload-design-review.v1.json');
const payloadGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-controlled-clause-payload-design-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_SCOPED_NONPRODUCTIVE_NONRUNTIME');
assert.equal(candidate.authority,'CANDIDATE');
assert.equal(candidate.scope,'HNK-L03_BINAH_CONTROLLED_DIRECT_QUESTION_ONLY');
assert.equal(candidate.surface.schema,'[CONTROLLED_L03_DIRECT_QUESTION_CLAUSE] KE');
assert.equal(candidate.payload_contract.slot_content_authorized,false);
assert.equal(candidate.guards.candidate_validated,true);
assert.equal(candidate.guards.candidate_productive,false);
assert.equal(candidate.guards.candidate_curriculum_mapped,false);

assert.equal(validationGate.status,'APPROVED_ALL_VALIDATION_AND_GOVERNANCE_DECISIONS');
assert.equal(validationGate.applied_effect.candidate_validated,true);
assert.equal(validationGate.applied_effect.candidate_productive,false);

assert.equal(strategyGate.status,'APPROVED_ALL_STRATEGY_AND_GOVERNANCE_DECISIONS');
assert.ok(strategyGate.strategy_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(strategyGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(strategyGate.applied_effect.selected_route,'CONTROLLED_CLAUSE_PAYLOAD_DESIGN_FIRST');
assert.equal(strategyGate.applied_effect.candidate_productive,false);
assert.equal(strategyGate.applied_effect.slot_content_authorized,false);

assert.equal(strategyTransition.status,'APPLIED_STRATEGY_SELECTION_ONLY_NO_PAYLOAD_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(strategyTransition.strategy_result.selected_route,'CONTROLLED_CLAUSE_PAYLOAD_DESIGN_FIRST');
assert.equal(strategyTransition.strategy_result.slot_content_authorized,false);
assert.equal(strategyTransition.guards.STR001_STR002_auto_wrapped,false);
assert.equal(strategyTransition.guards.arbitrary_clause_payload_authorized,false);

assert.equal(payloadReview.status,'READY_FOR_HUMAN_REVIEW_DESIGN_ONLY_NO_PAYLOAD_AUTHORIZATION_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(payloadReview.recommended_design,'CLOSED_ALLOWLIST_OF_EXPLICITLY_VALIDATED_L03_DIRECT_QUESTION_CLAUSE_PATTERNS');
assert.equal(payloadReview.recommended_contract.membership_model,'CLOSED_ALLOWLIST');
assert.deepEqual(payloadReview.recommended_contract.initial_authorized_payloads,[]);
assert.equal(payloadReview.recommended_contract.automatic_admission,false);
assert.equal(payloadReview.recommended_contract.STR001_STR002_admitted_by_default,false);

assert.equal(payloadGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(payloadGate.design_decisions.every(x=>x.decision==='PENDING'));
assert.ok(payloadGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(payloadGate.checks.strategy_selected,'CONTROLLED_CLAUSE_PAYLOAD_DESIGN_FIRST');
assert.equal(payloadGate.checks.payload_design_approved,false);
assert.equal(payloadGate.checks.slot_content_authorized,false);
assert.equal(payloadGate.checks.authorized_payload_count,0);
assert.equal(payloadGate.projected_effect_if_approved.payload_membership_model,'CLOSED_ALLOWLIST');
assert.equal(payloadGate.projected_effect_if_approved.authorized_payload_count,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_CONTROLLED_CLAUSE_PAYLOAD_DESIGN_DECISION');
assert.equal(workstream.selected_strategy,'CONTROLLED_CLAUSE_PAYLOAD_DESIGN_FIRST');
assert.equal(workstream.recommended_payload_design,'CLOSED_ALLOWLIST_OF_EXPLICITLY_VALIDATED_L03_DIRECT_QUESTION_CLAUSE_PATTERNS');
assert.equal(workstream.active_gate,payloadGate.batch_id);
assert.equal(workstream.candidate.validated,true);
assert.equal(workstream.candidate.productive,false);
assert.equal(workstream.candidate.slot_content_authorized,false);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.equal(exactGate.status,'APPROVED_EXPLICIT_HUMAN_SURFACE_PACKAGE');
assert.equal(exactGate.applied_effect.surface_fields_selected,4);
assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-CONTROLLED-CLAUSE-PAYLOAD-DESIGN-GATE-STABLE-V131');
