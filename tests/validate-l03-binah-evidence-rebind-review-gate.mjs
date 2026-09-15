import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const materialGate=await json('proposals/language/HNK_GRAMMAR_CORE_V1_OWNER_MATERIALIZATION_HUMAN_BATCH_V1.json');
const transition=await json('proposals/language/HNK_GRAMMAR_CORE_V1_OWNER_MATERIALIZATION_APPLIED_TRANSITION_V1.json');
const bindingReview=await json('proposals/language/HNK_GRAMMAR_CORE_V1_CYCLE1_BINDING_STRATEGY_REVIEW_V1.json');
const bindingGate=await json('proposals/language/HNK_GRAMMAR_CORE_V1_CYCLE1_BINDING_STRATEGY_HUMAN_BATCH_V1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(materialGate.status,'APPROVED_ALL_MATERIALIZATION_AND_GOVERNANCE_DECISIONS');
assert.ok(materialGate.materialization_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(materialGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(materialGate.drift_verification.material_owner_drift,false);
assert.equal(materialGate.applied_effect.owner_commit,'9bc84c470dfe79c64b9b0bee47195ce43844e374');
assert.equal(materialGate.applied_effect.owner_files_changed,4);
assert.equal(materialGate.applied_effect.authority_upgrades,0);
assert.equal(materialGate.applied_effect.duplicate_forms_created,0);
assert.equal(materialGate.applied_effect.cycle1_binding_changes,0);
assert.equal(materialGate.applied_effect.L03_exact_surface_fields_selected,0);
assert.equal(materialGate.applied_effect.OPI_unlocked,false);
assert.equal(materialGate.applied_effect.QA_unlocked,false);
assert.equal(materialGate.applied_effect.runtime_active,false);

assert.equal(transition.status,'APPLIED_OWNER_REGISTRY_REFERENCE_LAYER_ONLY_NO_CYCLE1_BINDING_NO_L03_SURFACE_NO_OPI_QA_OR_RUNTIME');
assert.equal(transition.owner_result.dedicated_registry_created,true);
assert.equal(transition.owner_result.existing_entries_referenced,5);
assert.equal(transition.owner_result.new_forms_created,0);
assert.equal(transition.owner_result.authority_upgrades,0);
assert.equal(transition.owner_result.lesson_scope_changes,0);
assert.equal(transition.guards.KE_generalized_to_L03,false);
assert.equal(transition.guards.L03_surface_fields_selected,0);

assert.equal(bindingReview.status,'READY_FOR_HUMAN_REVIEW_STRATEGY_ONLY_NO_BINDING_NO_SURFACE_NO_AUTHORING');
assert.equal(bindingGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(bindingGate.strategy_decisions.length,6);
assert.equal(bindingGate.governance_decisions.length,6);
assert.ok(bindingGate.strategy_decisions.every(x=>x.decision==='PENDING'));
assert.ok(bindingGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(bindingGate.checks.KE_bound_to_L03,false);
assert.equal(bindingGate.checks.AN_EN_bound_to_L03,false);
assert.equal(bindingGate.checks.KU_KUVAN_bound_to_L03,false);
assert.equal(bindingGate.projected_effect_if_approved.binding_performed,false);
assert.equal(bindingGate.projected_effect_if_approved.selected_route,'L03_KE_BINDING_PROPOSAL_FIRST');

assert.equal(workstream.status,'ACTIVE_AWAITING_CYCLE1_BINDING_STRATEGY_DECISION');
assert.equal(workstream.active_gate,bindingGate.batch_id);
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

console.log('PASS SWHNK-L03-BINAH-GRAMMAR-CORE-OWNER-MATERIALIZED-STABLE-V124');
