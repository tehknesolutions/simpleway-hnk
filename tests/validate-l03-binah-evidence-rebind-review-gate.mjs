import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const constructionGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-surface-candidate-construction-human-batch.v1.json');
const constructionTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-surface-candidate-construction.approved-transition.v1.json');
const exactReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-exact-surface-selection-review.v1.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');
const strategy=await json('proposals/language/HNK_GRAMMAR_CORE_V1_STRATEGY_APPROVAL.json');
const coreGate=await json('proposals/language/HNK_GRAMMAR_CORE_V1_HUMAN_BATCH.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');

assert.equal(constructionGate.status,'APPROVED_ALL_DECISIONS');
assert.ok(constructionGate.construction_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(constructionGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(constructionGate.applied_effect.construction_protocol_approved,true);
assert.equal(constructionGate.applied_effect.HNK_forms_selected,false);
assert.equal(constructionGate.applied_effect.candidate_created,false);
assert.equal(constructionTransition.status,'APPLIED_CONSTRUCTION_PROTOCOL_ONLY_NO_FORM_SELECTION_NO_CANDIDATE_NO_AUTHORING_NO_UNLOCK_NO_RUNTIME');
assert.equal(constructionTransition.guards.KE_selected_or_generalized_to_L03,false);
assert.equal(constructionTransition.guards.AN_EN_selected_or_generalized_to_L03,false);
assert.equal(constructionTransition.guards.new_surface_forms,0);
assert.equal(constructionTransition.guards.new_grammar_rules,0);

assert.equal(exactReview.status,'READY_FOR_EXPLICIT_HUMAN_SURFACE_PACKAGE_NO_PRESELECTED_FORM_NO_CANDIDATE');
assert.equal(exactReview.selection_policy.bare_siga_without_surface_package_selects_nothing,true);
assert.equal(exactGate.status,'AWAITING_EXPLICIT_HUMAN_SURFACE_PACKAGE');
assert.equal(exactGate.required_surface_package.length,4);
assert.ok(exactGate.required_surface_package.every(x=>x.value===null));
assert.ok(exactGate.required_surface_package.every(x=>x.status==='REQUIRED_UNSET'));
assert.equal(exactGate.checks.explicit_surface_package_complete,false);
assert.equal(exactGate.checks.HNK_forms_selected,false);
assert.equal(exactGate.checks.surface_schema_selected,false);
assert.equal(exactGate.checks.token_order_selected,false);
assert.equal(exactGate.checks.marking_mechanism_selected,false);
assert.equal(exactGate.checks.candidate_created,false);

assert.equal(strategy.status,'APPROVED_STRATEGIC_PIVOT_ONLY');
assert.equal(strategy.approved_strategy_decisions.length,6);
assert.ok(strategy.approved_strategy_decisions.every(x=>x.state==='APPROVED'));
assert.equal(strategy.guards.linguistic_package_approved_by_this_action,false);
assert.equal(strategy.guards.KE_promoted,false);
assert.equal(strategy.guards.AN_promoted,false);
assert.equal(strategy.guards.EN_promoted,false);
assert.equal(strategy.guards.KU_promoted,false);
assert.equal(strategy.guards.KUVAN_promoted,false);
assert.equal(strategy.guards.L03_surface_fields_selected,0);
assert.equal(strategy.guards.unrelated_parent_lexeme_gate_consumed,false);

assert.equal(coreGate.batch_id,'SWHNK-HNK-GRAMMAR-CORE-V1-HUMAN-BATCH-V1');
assert.equal(coreGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL_OF_RECOMMENDED_PACKAGE');
assert.equal(coreGate.recommended_decisions.length,8);
assert.equal(coreGate.governance_decisions.length,6);
assert.ok(coreGate.recommended_decisions.every(x=>x.decision==='PENDING'));
assert.ok(coreGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(coreGate.checks.KE_new_authority_granted,false);
assert.equal(coreGate.checks.AN_new_authority_granted,false);
assert.equal(coreGate.checks.EN_new_authority_granted,false);
assert.equal(coreGate.checks.KU_new_authority_granted,false);
assert.equal(coreGate.checks.KUVAN_new_authority_granted,false);
assert.equal(coreGate.checks.L03_exact_surface_fields_selected,0);
assert.equal(coreGate.checks.cycle1_binding_changes,0);
assert.equal(coreGate.checks.OPI_unlocked,false);
assert.equal(coreGate.checks.QA_unlocked,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_GRAMMAR_CORE_V1_HUMAN_DECISION');
assert.equal(workstream.active_gate,'SWHNK-HNK-GRAMMAR-CORE-V1-HUMAN-BATCH-V1');
assert.equal(workstream.paused_dependent_gate.gate_id,exactGate.batch_id);
assert.equal(workstream.paused_dependent_gate.surface_fields_selected,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);
assert.equal(workstream.parallel_workstreams.HNK3000,'LEXICAL_SEMANTIC_EXPANSION_PARALLEL_NO_AUTOMATIC_GRAMMAR_OR_CYCLE1_BINDING');

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.foundational_interrogative_HNK_form_selected,false);
assert.equal(manifest.rules.foundational_interrogative_surface_schema_selected,false);
assert.equal(manifest.rules.foundational_interrogative_token_order_selected,false);
assert.equal(manifest.rules.foundational_interrogative_candidate_created,false);
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);
assert.equal(manifest.next_gate,exactGate.batch_id);
assert.equal(workstream.paused_dependent_gate.gate_id,manifest.next_gate);

console.log('PASS SWHNK-L03-BINAH-GRAMMAR-CORE-PIVOT-STABLE-V122');
