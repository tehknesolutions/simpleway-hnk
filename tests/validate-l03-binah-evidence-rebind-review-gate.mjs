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
const coreTransition=await json('proposals/language/HNK_GRAMMAR_CORE_V1_APPROVED_TRANSITION_V1.json');
const materialReview=await json('proposals/language/HNK_GRAMMAR_CORE_V1_OWNER_MATERIALIZATION_REVIEW_V1.json');
const materialGate=await json('proposals/language/HNK_GRAMMAR_CORE_V1_OWNER_MATERIALIZATION_HUMAN_BATCH_V1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');

assert.equal(constructionGate.status,'APPROVED_ALL_DECISIONS');
assert.equal(constructionTransition.status,'APPLIED_CONSTRUCTION_PROTOCOL_ONLY_NO_FORM_SELECTION_NO_CANDIDATE_NO_AUTHORING_NO_UNLOCK_NO_RUNTIME');
assert.equal(exactReview.status,'READY_FOR_EXPLICIT_HUMAN_SURFACE_PACKAGE_NO_PRESELECTED_FORM_NO_CANDIDATE');
assert.equal(exactGate.status,'AWAITING_EXPLICIT_HUMAN_SURFACE_PACKAGE');
assert.equal(exactGate.required_surface_package.length,4);
assert.ok(exactGate.required_surface_package.every(x=>x.value===null));
assert.ok(exactGate.required_surface_package.every(x=>x.status==='REQUIRED_UNSET'));
assert.equal(exactGate.checks.explicit_surface_package_complete,false);
assert.equal(exactGate.checks.HNK_forms_selected,false);
assert.equal(exactGate.checks.candidate_created,false);

assert.equal(strategy.status,'APPROVED_STRATEGIC_PIVOT_ONLY');
assert.equal(coreGate.batch_id,'SWHNK-HNK-GRAMMAR-CORE-V1-HUMAN-BATCH-V1');
assert.equal(coreGate.status,'APPROVED_ALL_RECOMMENDED_AND_GOVERNANCE_DECISIONS');
assert.equal(coreGate.recommended_decisions.length,8);
assert.equal(coreGate.governance_decisions.length,6);
assert.ok(coreGate.recommended_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(coreGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.deepEqual(coreGate.applied_effect.component_candidates_declared_eligible_for_separate_owner_materialization,['KE','AN','EN','KU','KUVAN']);
assert.equal(coreGate.applied_effect.predication_policy,'CONSTRUCTION_SPECIFIC');
assert.equal(coreGate.applied_effect.negation_policy,'SCOPED_EXISTING_GOVERNED_USES_ONLY');
assert.equal(coreGate.applied_effect.temporal_policy,'LEXICAL_SCOPED_FIRST');
assert.equal(coreGate.applied_effect.canonical_registry_changed,false);
assert.equal(coreGate.applied_effect.cycle1_binding_changed,false);
assert.equal(coreGate.applied_effect.L03_surface_selected,false);
assert.equal(coreGate.applied_effect.new_surface_forms,0);
assert.equal(coreGate.applied_effect.new_promoted_grammar_rules,0);
assert.equal(coreGate.applied_effect.OPI_unlocked,false);
assert.equal(coreGate.applied_effect.QA_unlocked,false);

assert.equal(coreTransition.status,'APPLIED_CLASSIFICATION_APPROVAL_ONLY_NO_OWNER_MATERIALIZATION_NO_CYCLE1_BINDING_NO_L03_SURFACE_NO_RUNTIME');
assert.equal(coreTransition.guards.owner_registry_changed,false);
assert.equal(coreTransition.guards.authored_registry_changed,false);
assert.equal(coreTransition.guards.component_authority_upgraded,false);
assert.equal(coreTransition.guards.lesson_bindings_changed,false);
assert.equal(coreTransition.guards.L03_surface_fields_selected,0);
assert.equal(coreTransition.guards.parent_lexeme_gate_consumed,false);
assert.equal(coreTransition.guards.HNK3000_binding_changed,false);

assert.equal(materialReview.status,'READY_FOR_HUMAN_REVIEW_NO_OWNER_WRITE_NO_BINDING_NO_RUNTIME');
assert.equal(materialReview.observed_owner_state.repository,'tehknesolutions/codex-hnk');
assert.equal(materialReview.observed_owner_state.package,'@hnk/linguas');
assert.equal(materialReview.observed_owner_state.package_version,'1.1.0-preproduction');
assert.equal(materialReview.observed_owner_state.authored_registry_version,'1.10.0-candidate');
assert.equal(materialReview.existing_owner_components.length,5);
assert.deepEqual(materialReview.existing_owner_components.map(x=>x.auth_id),['AUTH-001','AUTH-016','AUTH-017','AUTH-018','AUTH-019']);
assert.equal(materialReview.recommended_materialization_route.strategy,'DEDICATED_GRAMMAR_CORE_V1_REGISTRY_REFERENCING_EXISTING_OWNER_ENTRIES');
assert.equal(materialReview.recommended_materialization_route.duplicate_authored_entries,false);
assert.equal(materialReview.recommended_materialization_route.authority_upgrades,0);
assert.equal(materialReview.recommended_materialization_route.lesson_binding_changes,0);
assert.equal(materialReview.non_effects.no_L03_binding,true);
assert.equal(materialReview.non_effects.no_L03_surface_selection,true);

assert.equal(materialGate.batch_id,'SWHNK-HNK-GRAMMAR-CORE-V1-OWNER-MATERIALIZATION-HUMAN-BATCH-V1');
assert.equal(materialGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(materialGate.materialization_decisions.length,8);
assert.equal(materialGate.governance_decisions.length,6);
assert.ok(materialGate.materialization_decisions.every(x=>x.decision==='PENDING'));
assert.ok(materialGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(materialGate.checks.source_package_approved,true);
assert.equal(materialGate.checks.owner_write_performed,false);
assert.equal(materialGate.checks.canonical_registry_changed,false);
assert.equal(materialGate.checks.authority_upgrades,0);
assert.equal(materialGate.checks.lesson_binding_changes,0);
assert.equal(materialGate.checks.L03_exact_surface_fields_selected,0);
assert.equal(materialGate.checks.OPI_unlocked,false);
assert.equal(materialGate.checks.QA_unlocked,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_GRAMMAR_CORE_V1_OWNER_MATERIALIZATION_DECISION');
assert.equal(workstream.approved_gate,coreGate.batch_id);
assert.equal(workstream.active_gate,materialGate.batch_id);
assert.equal(workstream.paused_dependent_gate.gate_id,exactGate.batch_id);
assert.equal(workstream.paused_dependent_gate.surface_fields_selected,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.foundational_interrogative_HNK_form_selected,false);
assert.equal(manifest.rules.foundational_interrogative_surface_schema_selected,false);
assert.equal(manifest.rules.foundational_interrogative_token_order_selected,false);
assert.equal(manifest.rules.foundational_interrogative_candidate_created,false);
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);
assert.equal(manifest.next_gate,exactGate.batch_id);

console.log('PASS SWHNK-L03-BINAH-GRAMMAR-CORE-PACKAGE-APPROVED-MATERIALIZATION-GATE-PENDING-V123');
