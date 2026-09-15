import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V124.json');
const l02=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const l03=await json('curriculum/cycle-01/L03-binah/manifest.json');
const bindingGate=await json('proposals/language/HNK_GRAMMAR_CORE_V1_CYCLE1_BINDING_STRATEGY_HUMAN_BATCH_V1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');

assert.equal(snap.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V124');
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
assert.equal(snap.L03.exact_surface_completed_fields,0);

assert.equal(snap.language_architecture.owner_materialization_status,'COMPLETED_REFERENCE_LAYER_ONLY');
assert.equal(snap.language_architecture.owner_commit,'9bc84c470dfe79c64b9b0bee47195ce43844e374');
assert.equal(snap.language_architecture.owner_files_changed,4);
assert.equal(snap.language_architecture.authority_upgrades,0);
assert.equal(snap.language_architecture.duplicate_forms_created,0);
assert.equal(snap.language_architecture.cycle1_binding_changes,0);
assert.deepEqual(snap.language_architecture.materialized_components,{KUVAN:'AUTH-001',AN:'AUTH-016',EN:'AUTH-017',KU:'AUTH-018',KE:'AUTH-019'});
assert.equal(snap.language_architecture.current_chat_active_gate,bindingGate.batch_id);
assert.equal(snap.language_architecture.current_chat_active_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snap.language_architecture.recommended_route,'L03_KE_BINDING_PROPOSAL_FIRST');

assert.equal(snap.boundaries.KE_generalized_to_L03,false);
assert.equal(snap.boundaries.KE_bound_to_L03,false);
assert.equal(snap.boundaries.AN_EN_generalized_to_L03,false);
assert.equal(snap.boundaries.KU_generalized_to_L03,false);
assert.equal(snap.boundaries.KUVAN_generalized_to_L03,false);
assert.equal(snap.boundaries.NE_global_negation_promoted,false);
assert.equal(snap.boundaries.PA_generic_past_created,false);
assert.equal(snap.boundaries.new_surface_forms,0);
assert.equal(snap.boundaries.new_promoted_grammar_rules,0);
assert.equal(snap.boundaries.L03_surface_fields_selected,0);
assert.equal(snap.boundaries.OPI_unlocked,false);
assert.equal(snap.boundaries.QA_unlocked,false);
assert.equal(snap.boundaries.STR003_STR005_unlocked,false);
assert.equal(snap.boundaries.runtime_active,false);

assert.equal(snap.parallel_workstreams.HNK3000.automatic_grammar_binding,false);
assert.equal(snap.parallel_workstreams.HNK3000.automatic_cycle1_binding,false);
assert.equal(snap.parallel_workstreams.parent_lexeme_canonical_integration.consumed_by_v124,false);
assert.equal(workstream.active_gate,bindingGate.batch_id);
assert.equal(snap.next_gate,bindingGate.batch_id);
assert.equal(snap.next_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(l02.pedagogy.sealed,true);
assert.deepEqual(l03.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(l03.rules.OPI_unlocked,false);
assert.equal(l03.rules.QA_unlocked,false);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V124');
