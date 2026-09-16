import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const strategyGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-authoring-strategy-human-batch.v1.json');
const strategyTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-authoring-strategy.approved-transition.v1.json');
const designReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-position-1-artifact-design-review.v1.json');
const designGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-position-1-artifact-design-human-batch.v1.json');
const positionBinding=await json('curriculum/cycle-01/L03-binah/bindings/l03-foundational-interrogative-opi-position-1-allocation.binding.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(strategyGate.status,'APPROVED_ALL_STRATEGY_AND_GOVERNANCE_DECISIONS');
assert.ok(strategyGate.strategy_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(strategyGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(strategyGate.selected_route,'SOURCE_PACKAGE_PRESERVING_OPI_ARTIFACT_DESIGN_FIRST');
assert.equal(strategyGate.checks.position_1_assigned,true);
assert.equal(strategyGate.checks.OPI_authored,0);
assert.equal(strategyGate.checks.OPI_validated,0);

assert.equal(strategyTransition.status,'APPLIED_AUTHORING_STRATEGY_SELECTION_ONLY_NO_OPI_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(strategyTransition.selection_result.selected_route,'SOURCE_PACKAGE_PRESERVING_OPI_ARTIFACT_DESIGN_FIRST');
assert.deepEqual(strategyTransition.selection_result.source_package,['VALI KE','PARAZAMI KE']);
assert.equal(strategyTransition.selection_result.OPI_authored,0);
assert.equal(strategyTransition.selection_result.OPI_validated,0);

assert.equal(designReview.status,'READY_FOR_HUMAN_REVIEW_DESIGN_ONLY_NO_OPI_AUTHORING_NO_VALIDATION_NO_QA_NO_RUNTIME');
assert.equal(designReview.recommended_design.artifact_kind,'BOUNDED_DUAL_REALIZATION_OPI_SOURCE_ARTIFACT');
assert.equal(designReview.recommended_design.representation_mode,'PARALLEL_SOURCE_REALIZATIONS_NO_TRANSLATION');
assert.deepEqual(designReview.recommended_design.source_package,['VALI KE','PARAZAMI KE']);
assert.equal(designReview.recommended_design.natural_language_translation_contract,'UNRESOLVED_NOT_ASSERTED');
assert.equal(designReview.recommended_design.semantic_function,'CONTROLLED_L03_DIRECT_QUESTION');
assert.equal(designReview.post_design_if_approved.artifact_materialized,false);

assert.equal(designGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(designGate.design_decisions.every(x=>x.decision==='PENDING'));
assert.ok(designGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(designGate.checks.position_1_assigned,true);
assert.equal(designGate.checks.artifact_materialized,false);
assert.equal(designGate.checks.OPI_authored,0);
assert.equal(designGate.checks.OPI_validated,0);

assert.equal(positionBinding.position_assigned,true);
assert.equal(positionBinding.structural_slot_consumption,1);
assert.deepEqual(positionBinding.source_package,['VALI KE','PARAZAMI KE']);

assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_POSITION_1_ARTIFACT_DESIGN_DECISION');
assert.equal(workstream.active_gate,designGate.batch_id);
assert.equal(workstream.position_1_authoring.strategy_selected,true);
assert.equal(workstream.position_1_authoring.selected_route,'SOURCE_PACKAGE_PRESERVING_OPI_ARTIFACT_DESIGN_FIRST');
assert.equal(workstream.position_1_authoring.artifact_design_approved,false);
assert.equal(workstream.position_1_authoring.OPI_authored,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-POSITION-1-AUTHORING-STRATEGY-SELECTED-ARTIFACT-DESIGN-PENDING-V146');
