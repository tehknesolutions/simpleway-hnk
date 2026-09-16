import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const binding=await json('curriculum/cycle-01/L03-binah/bindings/l03-ke-controlled-direct-question.binding.v1.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection-human-batch.v1.json');
const exactTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection.approved-transition.v1.json');
const matReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-candidate-materialization-review.v1.json');
const matGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-candidate-materialization-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(binding.status,'APPLIED_COURSE_SCOPED_REFERENCE');
assert.equal(binding.owner_reference.form,'KE');
assert.equal(binding.owner_reference.source_id,'AUTH-019');
assert.equal(binding.owner_reference.authority,'CANDIDATE');
assert.equal(binding.owner_reference.owner_mutated,false);

assert.equal(exactGate.status,'APPROVED_EXPLICIT_HUMAN_SURFACE_PACKAGE');
assert.equal(exactGate.checks.KE_bound_to_L03,true);
assert.equal(exactGate.checks.explicit_surface_package_complete,true);
assert.equal(exactGate.checks.HNK_forms_selected,true);
assert.equal(exactGate.checks.surface_schema_selected,true);
assert.equal(exactGate.checks.token_order_selected,true);
assert.equal(exactGate.checks.marking_mechanism_selected,true);
assert.equal(exactGate.checks.candidate_created,false);
assert.equal(exactGate.required_surface_package.length,4);
assert.ok(exactGate.required_surface_package.every(x=>x.status==='SELECTED_APPROVED'));
assert.equal(exactGate.required_surface_package[0].value,'KE');
assert.equal(exactGate.required_surface_package[1].value,'[CONTROLLED_L03_DIRECT_QUESTION_CLAUSE] KE');
assert.equal(exactGate.required_surface_package[2].value,'CONTROLLED_L03_DIRECT_QUESTION_CLAUSE_FIRST__KE_CLAUSE_FINAL');
assert.equal(exactGate.required_surface_package[3].value,'CLAUSE_FINAL_PARTICLE_KE');

assert.equal(exactTransition.status,'APPLIED_EXACT_SURFACE_SELECTION_ONLY_NO_CANDIDATE_NO_OPI_AUTHORING_NO_UNLOCK_NO_RUNTIME');
assert.equal(exactTransition.guards.candidate_created,false);
assert.equal(exactTransition.guards.KE_generalized_to_L03,false);
assert.equal(exactTransition.guards.OPI_unlocked,false);
assert.equal(exactTransition.guards.QA_unlocked,false);
assert.equal(exactTransition.guards.runtime_active,false);

assert.equal(matReview.status,'READY_FOR_HUMAN_REVIEW_MATERIALIZATION_ONLY_NO_OPI_AUTHORING_NO_VALIDATION_NO_UNLOCK_NO_RUNTIME');
assert.equal(matReview.proposed_materialization.authority,'CANDIDATE');
assert.equal(matReview.proposed_materialization.schema,'[CONTROLLED_L03_DIRECT_QUESTION_CLAUSE] KE');
assert.equal(matGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(matGate.materialization_decisions.length,6);
assert.equal(matGate.governance_decisions.length,6);
assert.ok(matGate.materialization_decisions.every(x=>x.decision==='PENDING'));
assert.ok(matGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(matGate.checks.surface_fields_selected,4);
assert.equal(matGate.checks.candidate_created,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_INTERROGATIVE_CANDIDATE_MATERIALIZATION_DECISION');
assert.equal(workstream.active_gate,matGate.batch_id);
assert.equal(workstream.active_gate_surface_fields_selected,4);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-EXACT-SURFACE-SELECTED-STABLE-V128');
