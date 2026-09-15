import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const appGate=await json('proposals/language/HNK_L03_BINAH_KE_BINDING_APPLICATION_HUMAN_BATCH_V1.json');
const appTransition=await json('proposals/language/HNK_L03_BINAH_KE_BINDING_APPLICATION_APPROVED_TRANSITION_V1.json');
const binding=await json('curriculum/cycle-01/L03-binah/bindings/l03-ke-controlled-direct-question.binding.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(appGate.status,'APPROVED_ALL_APPLICATION_AND_GOVERNANCE_DECISIONS');
assert.equal(appGate.application_decisions.length,6);
assert.equal(appGate.governance_decisions.length,6);
assert.ok(appGate.application_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(appGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(appGate.applied_effect.course_binding_reference_created,true);
assert.equal(appGate.applied_effect.KE_bound_to_L03,true);
assert.equal(appGate.applied_effect.KE_generalized_to_L03,false);
assert.equal(appGate.applied_effect.owner_registry_changed,false);
assert.equal(appGate.applied_effect.owner_lessons_changed,false);
assert.equal(appGate.applied_effect.L03_surface_fields_selected,0);
assert.equal(appGate.applied_effect.OPI_unlocked,false);
assert.equal(appGate.applied_effect.QA_unlocked,false);
assert.equal(appGate.applied_effect.runtime_active,false);

assert.equal(appTransition.status,'APPLIED_COURSE_SCOPED_BINDING_REFERENCE_ONLY_NO_EXACT_SURFACE_NO_AUTHORING_NO_UNLOCK_NO_RUNTIME');
assert.equal(appTransition.binding_result.component,'KE');
assert.equal(appTransition.binding_result.source_id,'AUTH-019');
assert.equal(appTransition.binding_result.lesson,'L03');
assert.equal(appTransition.binding_result.lane,'CONTROLLED_L03_DIRECT_QUESTION');
assert.equal(appTransition.binding_result.KE_bound_to_L03,true);
assert.equal(appTransition.owner_preservation.authority,'CANDIDATE');
assert.deepEqual(appTransition.owner_preservation.owner_lessons,['L01','L02']);
assert.equal(appTransition.owner_preservation.owner_registry_changed,false);
assert.equal(appTransition.guards.KE_generalized_to_L03,false);
assert.equal(appTransition.guards.exact_surface_fields_selected,0);
assert.equal(appTransition.guards.surface_candidate_created,false);

assert.equal(binding.status,'APPLIED_COURSE_SCOPED_REFERENCE');
assert.equal(binding.lesson,'L03');
assert.equal(binding.lane,'CONTROLLED_L03_DIRECT_QUESTION');
assert.equal(binding.owner_reference.form,'KE');
assert.equal(binding.owner_reference.source_id,'AUTH-019');
assert.equal(binding.owner_reference.authority,'CANDIDATE');
assert.deepEqual(binding.owner_reference.owner_lessons,['L01','L02']);
assert.equal(binding.owner_reference.owner_mutated,false);
assert.equal(binding.binding_contract.binding_type,'COURSE_SCOPED_REFERENCE');
assert.equal(binding.binding_contract.exact_surface_form_selected,false);
assert.equal(binding.binding_contract.automatic_productivity,false);
assert.equal(binding.binding_contract.universal_l03_interrogative_grammar,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_EXACT_SURFACE_PACKAGE');
assert.equal(workstream.active_gate,exactGate.batch_id);
assert.equal(workstream.active_gate_surface_fields_selected,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.equal(exactGate.status,'AWAITING_EXPLICIT_HUMAN_SURFACE_PACKAGE');
assert.equal(exactGate.binding_context.KE_course_binding_applied,true);
assert.equal(exactGate.binding_context.source_id,'AUTH-019');
assert.equal(exactGate.binding_context.authority,'CANDIDATE');
assert.equal(exactGate.binding_context.automatic_surface_selection,false);
assert.equal(exactGate.checks.KE_bound_to_L03,true);
assert.ok(exactGate.required_surface_package.every(x=>x.value===null));
assert.equal(exactGate.checks.explicit_surface_package_complete,false);
assert.equal(exactGate.checks.HNK_forms_selected,false);
assert.equal(exactGate.checks.surface_schema_selected,false);
assert.equal(exactGate.checks.token_order_selected,false);
assert.equal(exactGate.checks.marking_mechanism_selected,false);
assert.equal(exactGate.checks.candidate_created,false);
assert.equal(exactGate.checks.OPI_AUTHORED,0);
assert.equal(exactGate.checks.OPI_VALIDATED,0);
assert.equal(exactGate.checks.QA_AUTHORED,0);
assert.equal(exactGate.checks.QA_VALIDATED,0);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.foundational_interrogative_HNK_form_selected,false);
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-KE-COURSE-BINDING-APPLIED-STABLE-V127');
