import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const strategyGate=await json('proposals/language/HNK_GRAMMAR_CORE_V1_CYCLE1_BINDING_STRATEGY_HUMAN_BATCH_V1.json');
const strategyTransition=await json('proposals/language/HNK_GRAMMAR_CORE_V1_CYCLE1_BINDING_STRATEGY_APPROVED_TRANSITION_V1.json');
const keReview=await json('proposals/language/HNK_L03_BINAH_KE_BINDING_PROPOSAL_REVIEW_V1.json');
const keGate=await json('proposals/language/HNK_L03_BINAH_KE_BINDING_PROPOSAL_HUMAN_BATCH_V1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(strategyGate.status,'APPROVED_ALL_STRATEGY_AND_GOVERNANCE_DECISIONS');
assert.equal(strategyGate.strategy_decisions.length,6);
assert.equal(strategyGate.governance_decisions.length,6);
assert.ok(strategyGate.strategy_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(strategyGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(strategyGate.applied_effect.selected_route,'L03_KE_BINDING_PROPOSAL_FIRST');
assert.equal(strategyGate.applied_effect.binding_performed,false);
assert.equal(strategyGate.applied_effect.KE_bound_to_L03,false);
assert.equal(strategyGate.applied_effect.L03_exact_surface_fields_selected,0);
assert.equal(strategyGate.applied_effect.OPI_unlocked,false);
assert.equal(strategyGate.applied_effect.QA_unlocked,false);
assert.equal(strategyGate.applied_effect.runtime_active,false);

assert.equal(strategyTransition.status,'APPLIED_STRATEGY_ONLY_NO_BINDING_NO_SURFACE_NO_AUTHORING_NO_UNLOCK_NO_RUNTIME');
assert.equal(strategyTransition.selected_route,'L03_KE_BINDING_PROPOSAL_FIRST');
assert.equal(strategyTransition.guards.KE_bound_to_L03,false);
assert.equal(strategyTransition.guards.KE_generalized_to_L03,false);
assert.equal(strategyTransition.guards.AN_EN_bound_to_L03,false);
assert.equal(strategyTransition.guards.KU_KUVAN_bound_to_L03,false);
assert.equal(strategyTransition.guards.L03_surface_fields_selected,0);
assert.equal(strategyTransition.guards.surface_candidate_created,false);

assert.equal(keReview.status,'READY_FOR_HUMAN_REVIEW_BINDING_PROPOSAL_ONLY_NO_BINDING_NO_SURFACE_NO_AUTHORING');
assert.equal(keReview.source_component.form,'KE');
assert.equal(keReview.source_component.source_id,'AUTH-019');
assert.equal(keReview.source_component.authority,'CANDIDATE');
assert.equal(keReview.target.lesson,'L03');
assert.equal(keReview.target.lane,'CONTROLLED_L03_DIRECT_QUESTION');
assert.equal(keReview.proposal.binding_kind,'SCOPED_CONSTRUCTION_ELIGIBILITY');
assert.equal(keReview.proposal.universal_l03_interrogative_grammar,false);
assert.equal(keReview.proposal.automatic_surface_schema,false);
assert.equal(keReview.proposal.automatic_token_order,false);

assert.equal(keGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(keGate.proposal_decisions.length,6);
assert.equal(keGate.governance_decisions.length,6);
assert.ok(keGate.proposal_decisions.every(x=>x.decision==='PENDING'));
assert.ok(keGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(keGate.checks.KE_owner_source_id,'AUTH-019');
assert.equal(keGate.checks.KE_owner_authority,'CANDIDATE');
assert.equal(keGate.checks.KE_bound_to_L03,false);
assert.equal(keGate.checks.L03_exact_surface_fields_selected,0);
assert.equal(keGate.checks.surface_candidate_created,false);
assert.equal(keGate.projected_effect_if_approved.binding_performed,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_KE_BINDING_PROPOSAL_DECISION');
assert.equal(workstream.active_gate,keGate.batch_id);
assert.equal(workstream.paused_dependent_gate.gate_id,exactGate.batch_id);
assert.equal(workstream.paused_dependent_gate.surface_fields_selected,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.equal(exactGate.status,'AWAITING_EXPLICIT_HUMAN_SURFACE_PACKAGE');
assert.ok(exactGate.required_surface_package.every(x=>x.value===null));
assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.foundational_interrogative_HNK_form_selected,false);
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-GRAMMAR-CORE-BINDING-STRATEGY-STABLE-V125');
