import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V143.json');
const l02=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const l03=await json('curriculum/cycle-01/L03-binah/manifest.json');
const firstPositionGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-position-allocation-proposal-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');

assert.equal(snap.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V143');
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
assert.equal(snap.L03.OPI_slot_model_source_locked,true);
assert.equal(snap.L03.OPI_slot_model_cardinality,10);
assert.equal(snap.L03.OPI_positional_allocation_strategy_selected,true);
assert.equal(snap.L03.OPI_positional_allocation_selected_route,'SEQUENTIAL_SINGLE_POSITION_ALLOCATION_WITH_EXPLICIT_CONTENT_GATE');
assert.equal(snap.L03.OPI_next_candidate_position_selector,1);
assert.equal(snap.L03.OPI_position_1_assigned,false);
assert.deepEqual(snap.L03.OPI_first_position_proposed_source_package,['VALI KE','PARAZAMI KE']);
assert.equal(snap.L03.individual_OPI_slots_assigned,0);

assert.equal(firstPositionGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(workstream.active_gate,firstPositionGate.batch_id);
assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_FIRST_POSITION_ALLOCATION_PROPOSAL_DECISION');

assert.equal(snap.language_architecture.OPI_positional_allocation_strategy_status,'APPROVED_ALL_STRATEGY_AND_GOVERNANCE_DECISIONS');
assert.equal(snap.language_architecture.current_chat_active_gate,firstPositionGate.batch_id);
assert.equal(snap.boundaries.canonical_OPI_slot_ids_created,0);
assert.equal(snap.boundaries.canonical_OPI_slot_labels_created,0);
assert.equal(snap.boundaries.individual_OPI_slots_assigned,0);
assert.equal(snap.boundaries.OPI_position_1_assigned,false);
assert.equal(snap.boundaries.OPI_unlocked,false);
assert.equal(snap.boundaries.QA_unlocked,false);
assert.equal(snap.boundaries.STR003_STR005_unlocked,false);
assert.equal(snap.boundaries.runtime_active,false);
assert.equal(snap.parallel_workstreams.HNK3000.automatic_cycle1_binding,false);
assert.equal(snap.parallel_workstreams.parent_lexeme_canonical_integration.consumed_by_v143,false);
assert.equal(snap.next_gate,firstPositionGate.batch_id);

assert.equal(l02.pedagogy.sealed,true);
assert.deepEqual(l03.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(l03.rules.OPI_unlocked,false);
assert.equal(l03.rules.QA_unlocked,false);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V143');
