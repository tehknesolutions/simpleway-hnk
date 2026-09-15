import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V123.json');
const l02=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const l03=await json('curriculum/cycle-01/L03-binah/manifest.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-exact-surface-selection-human-batch.v1.json');
const coreGate=await json('proposals/language/HNK_GRAMMAR_CORE_V1_HUMAN_BATCH.json');
const coreTransition=await json('proposals/language/HNK_GRAMMAR_CORE_V1_APPROVED_TRANSITION_V1.json');
const materialReview=await json('proposals/language/HNK_GRAMMAR_CORE_V1_OWNER_MATERIALIZATION_REVIEW_V1.json');
const materialGate=await json('proposals/language/HNK_GRAMMAR_CORE_V1_OWNER_MATERIALIZATION_HUMAN_BATCH_V1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');

assert.equal(snap.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V123');
assert.equal(snap.package,'simpleway-hnk@0.75.0');
assert.deepEqual(snap.implementation,{MISSING:701,AUTHORED:0,VALIDATED:307,FROZEN:0});
assert.deepEqual(snap.L02.implementation,{MISSING:0,AUTHORED:0,VALIDATED:139,FROZEN:0});
assert.equal(snap.L02.sealed,true);
assert.equal(snap.L02.content_frozen,true);
assert.deepEqual(snap.L03.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(snap.L03.structures_VALIDATED,2);
assert.equal(snap.L03.opi_AUTHORED,0);
assert.equal(snap.L03.opi_VALIDATED,0);
assert.equal(snap.L03.qa_AUTHORED,0);
assert.equal(snap.L03.qa_VALIDATED,0);
assert.equal(snap.L03.exact_surface_selection_status,'PAUSED_PENDING_GRAMMAR_CORE_OWNER_MATERIALIZATION_AND_SEPARATE_CYCLE1_BINDING');
assert.equal(snap.L03.exact_surface_required_fields,4);
assert.equal(snap.L03.exact_surface_completed_fields,0);
assert.equal(snap.L03.exact_surface_package_complete,false);
assert.equal(exactGate.status,'AWAITING_EXPLICIT_HUMAN_SURFACE_PACKAGE');
assert.ok(exactGate.required_surface_package.every(x=>x.value===null));

assert.equal(coreGate.status,'APPROVED_ALL_RECOMMENDED_AND_GOVERNANCE_DECISIONS');
assert.equal(coreTransition.status,'APPLIED_CLASSIFICATION_APPROVAL_ONLY_NO_OWNER_MATERIALIZATION_NO_CYCLE1_BINDING_NO_L03_SURFACE_NO_RUNTIME');
assert.equal(materialReview.status,'READY_FOR_HUMAN_REVIEW_NO_OWNER_WRITE_NO_BINDING_NO_RUNTIME');
assert.equal(materialGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(workstream.status,'ACTIVE_AWAITING_GRAMMAR_CORE_V1_OWNER_MATERIALIZATION_DECISION');
assert.equal(workstream.active_gate,materialGate.batch_id);

assert.equal(snap.language_architecture.grammar_core_package_status,'APPROVED_ALL_RECOMMENDED_AND_GOVERNANCE_DECISIONS');
assert.deepEqual(snap.language_architecture.approved_component_candidates,['KE','AN','EN','KU','KUVAN']);
assert.equal(snap.language_architecture.approved_predication_policy,'CONSTRUCTION_SPECIFIC');
assert.equal(snap.language_architecture.approved_negation_policy,'SCOPED_EXISTING_GOVERNED_USES_ONLY');
assert.equal(snap.language_architecture.approved_temporal_policy,'LEXICAL_SCOPED_FIRST');
assert.equal(snap.language_architecture.current_chat_active_gate,materialGate.batch_id);
assert.equal(snap.language_architecture.current_chat_active_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snap.language_architecture.owner_materialization_performed,false);
assert.equal(snap.language_architecture.canonical_registry_changed_by_v123,false);
assert.equal(snap.language_architecture.cycle1_binding_changes,0);

assert.equal(snap.owner_observation.repository,'tehknesolutions/codex-hnk');
assert.equal(snap.owner_observation.package,'@hnk/linguas');
assert.equal(snap.owner_observation.package_version,'1.1.0-preproduction');
assert.equal(snap.owner_observation.authored_registry_version,'1.10.0-candidate');
assert.deepEqual(snap.owner_observation.existing_approved_component_entries,{KUVAN:'AUTH-001',AN:'AUTH-016',EN:'AUTH-017',KU:'AUTH-018',KE:'AUTH-019'});
assert.equal(snap.owner_observation.recommended_materialization,'DEDICATED_GRAMMAR_CORE_V1_REGISTRY_REFERENCING_EXISTING_ENTRIES');

assert.equal(snap.parallel_workstreams.HNK3000.automatic_grammar_binding,false);
assert.equal(snap.parallel_workstreams.HNK3000.automatic_cycle1_binding,false);
assert.equal(snap.parallel_workstreams.parent_lexeme_canonical_integration.consumed_by_v123,false);

assert.equal(snap.boundaries.KE_generalized_to_L03,false);
assert.equal(snap.boundaries.AN_EN_generalized_to_L03,false);
assert.equal(snap.boundaries.KU_generalized_to_L03,false);
assert.equal(snap.boundaries.KUVAN_generalized_to_L03,false);
assert.equal(snap.boundaries.NE_global_negation_promoted,false);
assert.equal(snap.boundaries.PA_generic_past_created,false);
assert.equal(snap.boundaries.universal_copula_created,false);
assert.equal(snap.boundaries.tense_grammar_created,false);
assert.equal(snap.boundaries.new_surface_forms,0);
assert.equal(snap.boundaries.new_promoted_grammar_rules,0);
assert.equal(snap.boundaries.owner_registry_changed,false);
assert.equal(snap.boundaries.OPI_unlocked,false);
assert.equal(snap.boundaries.QA_unlocked,false);
assert.equal(snap.boundaries.STR003_STR005_unlocked,false);
assert.equal(snap.boundaries.runtime_active,false);

assert.equal(l02.pedagogy.sealed,true);
assert.deepEqual(l03.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(l03.rules.foundational_interrogative_HNK_form_selected,false);
assert.equal(l03.rules.OPI_unlocked,false);
assert.equal(l03.rules.QA_unlocked,false);
assert.equal(snap.next_gate,materialGate.batch_id);
assert.equal(snap.next_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V123');
