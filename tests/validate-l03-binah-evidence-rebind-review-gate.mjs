import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const designGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-artifact-design-human-batch.v1.json');
const designTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-artifact-design.approved-transition.v1.json');
const materializationReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-position-1-artifact-materialization-review.v1.json');
const materializationGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-artifact-materialization-human-batch.v1.json');
const positionBinding=await json('curriculum/cycle-01/L03-binah/bindings/l03-foundational-interrogative-opi-position-1-allocation.binding.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(designGate.status,'APPROVED_ALL_DESIGN_AND_GOVERNANCE_DECISIONS');
assert.ok(designGate.design_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(designGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(designGate.selected_design.artifact_kind,'BOUNDED_DUAL_REALIZATION_OPI_SOURCE_ARTIFACT');
assert.equal(designGate.selected_design.representation_mode,'PARALLEL_SOURCE_REALIZATIONS_NO_TRANSLATION');
assert.deepEqual(designGate.selected_design.source_package,['VALI KE','PARAZAMI KE']);
assert.equal(designGate.selected_design.natural_language_translation_contract,'UNRESOLVED_NOT_ASSERTED');
assert.equal(designGate.checks.artifact_design_approved,true);
assert.equal(designGate.checks.artifact_materialized,false);
assert.equal(designGate.checks.OPI_authored,0);
assert.equal(designGate.checks.OPI_validated,0);

assert.equal(designTransition.status,'APPLIED_ARTIFACT_DESIGN_APPROVAL_ONLY_NO_MATERIALIZATION_NO_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(designTransition.design_contract.artifact_kind,'BOUNDED_DUAL_REALIZATION_OPI_SOURCE_ARTIFACT');
assert.equal(designTransition.guards.artifact_materialized,false);
assert.equal(designTransition.guards.OPI_authored,0);
assert.equal(designTransition.guards.OPI_validated,0);

assert.equal(materializationReview.status,'READY_FOR_HUMAN_REVIEW_MATERIALIZATION_ONLY_NO_OPI_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(materializationReview.recommended_decision,'MATERIALIZE_POSITION_1_SOURCE_ARTIFACT_CANDIDATE_ONLY');
assert.equal(materializationReview.planned_artifact.artifact_id,'SWHNK-L03-BINAH-OPI-FOUNDATIONAL-INTERROGATIVE-POSITION-1-SOURCE-ARTIFACT-CANDIDATE-V1');
assert.deepEqual(materializationReview.planned_artifact.source_package,['VALI KE','PARAZAMI KE']);
assert.equal(materializationReview.post_materialization_if_approved.OPI_authored,0);
assert.equal(materializationReview.post_materialization_if_approved.OPI_validated,0);

assert.equal(materializationGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(materializationGate.materialization_decisions.every(x=>x.decision==='PENDING'));
assert.ok(materializationGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(materializationGate.checks.position_1_assigned,true);
assert.equal(materializationGate.checks.artifact_design_approved,true);
assert.equal(materializationGate.checks.artifact_materialized,false);
assert.equal(materializationGate.checks.OPI_authored,0);
assert.equal(materializationGate.checks.OPI_validated,0);

assert.equal(positionBinding.position_assigned,true);
assert.equal(positionBinding.structural_slot_consumption,1);
assert.deepEqual(positionBinding.source_package,['VALI KE','PARAZAMI KE']);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_POSITION_1_ARTIFACT_MATERIALIZATION_DECISION');
assert.equal(workstream.active_gate,materializationGate.batch_id);
assert.equal(workstream.position_1_authoring.artifact_design_approved,true);
assert.equal(workstream.position_1_authoring.artifact_materialized,false);
assert.equal(workstream.position_1_authoring.OPI_authored,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-POSITION-1-ARTIFACT-DESIGN-APPROVED-MATERIALIZATION-PENDING-V147');
