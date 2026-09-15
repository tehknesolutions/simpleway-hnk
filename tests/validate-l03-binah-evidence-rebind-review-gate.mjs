import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const proposal=await json('proposals/language/HNK_L03_BINAH_KE_BINDING_PROPOSAL_HUMAN_BATCH_V1.json');
const transition=await json('proposals/language/HNK_L03_BINAH_KE_BINDING_PROPOSAL_APPROVED_TRANSITION_V1.json');
const appReview=await json('proposals/language/HNK_L03_BINAH_KE_BINDING_APPLICATION_REVIEW_V1.json');
const appGate=await json('proposals/language/HNK_L03_BINAH_KE_BINDING_APPLICATION_HUMAN_BATCH_V1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(proposal.status,'APPROVED_ALL_PROPOSAL_AND_GOVERNANCE_DECISIONS');
assert.ok(proposal.proposal_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(proposal.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(proposal.applied_effect.binding_performed,false);
assert.equal(proposal.applied_effect.KE_bound_to_L03,false);
assert.equal(proposal.applied_effect.L03_exact_surface_fields_selected,0);
assert.equal(proposal.applied_effect.OPI_unlocked,false);
assert.equal(proposal.applied_effect.QA_unlocked,false);
assert.equal(proposal.applied_effect.runtime_active,false);

assert.equal(transition.status,'APPLIED_PROPOSAL_APPROVAL_ONLY_NO_BINDING_NO_SURFACE_NO_AUTHORING_NO_UNLOCK_NO_RUNTIME');
assert.equal(transition.approved_target.component,'KE');
assert.equal(transition.approved_target.source_id,'AUTH-019');
assert.equal(transition.approved_target.lesson,'L03');
assert.equal(transition.approved_target.lane,'CONTROLLED_L03_DIRECT_QUESTION');
assert.equal(transition.guards.binding_performed,false);
assert.equal(transition.guards.KE_bound_to_L03,false);
assert.equal(transition.guards.owner_lesson_scope_changed,false);
assert.equal(transition.guards.L03_surface_fields_selected,0);

assert.equal(appReview.status,'READY_FOR_HUMAN_REVIEW_BINDING_APPLICATION_ONLY_NO_SURFACE_NO_AUTHORING');
assert.equal(appReview.source_owner.source_id,'AUTH-019');
assert.equal(appReview.source_owner.authority,'CANDIDATE');
assert.deepEqual(appReview.source_owner.owner_lessons,['L01','L02']);
assert.equal(appReview.application_contract.binding_type,'COURSE_SCOPED_REFERENCE');
assert.equal(appReview.application_contract.owner_registry_mutation,false);
assert.equal(appReview.application_contract.owner_lesson_scope_mutation,false);
assert.equal(appReview.application_contract.exact_surface_fields_selected,0);

assert.equal(appGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(appGate.application_decisions.length,6);
assert.equal(appGate.governance_decisions.length,6);
assert.ok(appGate.application_decisions.every(x=>x.decision==='PENDING'));
assert.ok(appGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(appGate.checks.KE_bound_to_L03,false);
assert.equal(appGate.checks.L03_exact_surface_fields_selected,0);
assert.equal(appGate.projected_effect_if_approved.KE_bound_to_L03,true);
assert.equal(appGate.projected_effect_if_approved.owner_registry_changed,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_KE_BINDING_APPLICATION_DECISION');
assert.equal(workstream.active_gate,appGate.batch_id);
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

console.log('PASS SWHNK-L03-BINAH-KE-BINDING-PROPOSAL-STABLE-V126');
