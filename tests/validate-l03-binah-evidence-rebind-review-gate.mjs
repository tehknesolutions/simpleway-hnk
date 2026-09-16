import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const matGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-artifact-materialization-human-batch.v1.json');
const matTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-artifact-materialization.approved-transition.v1.json');
const artifact=await json('curriculum/cycle-01/L03-binah/candidates/l03-opi-foundational-interrogative-position-1-source-artifact-candidate.v1.json');
const authoringReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-position-1-artifact-authoring-review.v1.json');
const authoringGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-artifact-authoring-review-human-batch.v1.json');
const positionBinding=await json('curriculum/cycle-01/L03-binah/bindings/l03-foundational-interrogative-opi-position-1-allocation.binding.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(matGate.status,'APPROVED_ALL_MATERIALIZATION_AND_GOVERNANCE_DECISIONS');
assert.ok(matGate.materialization_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(matGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(matGate.checks.artifact_materialized,true);
assert.equal(matGate.checks.OPI_authored,0);
assert.equal(matGate.checks.OPI_validated,0);

assert.equal(matTransition.status,'APPLIED_SOURCE_ARTIFACT_CANDIDATE_MATERIALIZATION_ONLY_NO_OPI_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(matTransition.materialization_result.artifact_materialized,true);
assert.equal(matTransition.materialization_result.OPI_authored,0);

assert.equal(artifact.status,'MATERIALIZED_CANDIDATE_NOT_AUTHORED_NOT_VALIDATED_NONRUNTIME');
assert.equal(artifact.authority,'CANDIDATE');
assert.equal(artifact.internal_position_selector,1);
assert.equal(artifact.selector_authority,'NONCANONICAL_STRUCTURAL_INDEX_ONLY');
assert.equal(artifact.artifact_kind,'BOUNDED_DUAL_REALIZATION_OPI_SOURCE_ARTIFACT');
assert.equal(artifact.representation_mode,'PARALLEL_SOURCE_REALIZATIONS_NO_TRANSLATION');
assert.deepEqual(artifact.source_package,['VALI KE','PARAZAMI KE']);
assert.equal(artifact.natural_language_translation_contract,'UNRESOLVED_NOT_ASSERTED');
assert.equal(artifact.lexical_anchors.find(x=>x.form==='VALI').authority,'FROZEN');
assert.equal(artifact.lexical_anchors.find(x=>x.form==='PARAZAMI').authority,'WATCH');
assert.equal(artifact.guards.KE_generalized,false);
assert.equal(artifact.OPI_authored,false);
assert.equal(artifact.OPI_validated,false);

assert.equal(authoringReview.status,'READY_FOR_HUMAN_REVIEW_AUTHORING_ELIGIBILITY_ONLY_NO_OPI_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(authoringReview.recommended_route,'APPROVE_CANDIDATE_FOR_EXPLICIT_OPI_AUTHORING_APPLICATION_GATE');
assert.equal(authoringReview.post_review_if_approved.OPI_authored,0);

assert.equal(authoringGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(authoringGate.review_decisions.every(x=>x.decision==='PENDING'));
assert.ok(authoringGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(authoringGate.checks.artifact_materialized,true);
assert.equal(authoringGate.checks.authoring_eligible,false);
assert.equal(authoringGate.checks.OPI_authored,0);
assert.equal(authoringGate.checks.OPI_validated,0);

assert.equal(positionBinding.position_assigned,true);
assert.equal(positionBinding.structural_slot_consumption,1);
assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_POSITION_1_ARTIFACT_AUTHORING_REVIEW_DECISION');
assert.equal(workstream.active_gate,authoringGate.batch_id);
assert.equal(workstream.cross_chat_reconciliation.result,'NO_CONFLICT');
assert.equal(workstream.position_1_authoring.artifact_materialized,true);
assert.equal(workstream.position_1_authoring.OPI_authored,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-POSITION-1-SOURCE-ARTIFACT-MATERIALIZED-AUTHORING-REVIEW-PENDING-V148');
