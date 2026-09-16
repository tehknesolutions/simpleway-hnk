import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V140.json');
const l02=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const l03=await json('curriculum/cycle-01/L03-binah/manifest.json');
const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const mappingBinding=await json('curriculum/cycle-01/L03-binah/bindings/l03-foundational-interrogative-opi-curriculum-source.binding.v1.json');
const slotStrategyGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-slot-identification-authoring-strategy-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');

assert.equal(snap.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V140');
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
assert.equal(snap.L03.first_payload_candidate_productive,true);
assert.equal(snap.L03.first_payload_candidate_curriculum_mapped,true);
assert.equal(snap.L03.first_payload_target_lane,'L03_OPI_FOUNDATIONAL_INTERROGATIVE');
assert.deepEqual(snap.L03.individual_OPI_slot_ids_assigned,[]);

assert.equal(candidate.status,'VALIDATED_ALLOWLISTED_SCOPED_PRODUCTIVE_CURRICULUM_MAPPED_NONRUNTIME');
assert.equal(mappingBinding.target_lane,'L03_OPI_FOUNDATIONAL_INTERROGATIVE');
assert.deepEqual(mappingBinding.individual_OPI_slot_ids_assigned,[]);
assert.equal(slotStrategyGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(workstream.active_gate,slotStrategyGate.batch_id);
assert.equal(workstream.status,'ACTIVE_AWAITING_L03_FOUNDATIONAL_OPI_SLOT_IDENTIFICATION_AUTHORING_STRATEGY_DECISION');

assert.equal(snap.language_architecture.first_payload_exact_opi_curriculum_mapping_status,'APPROVED_ALL_MAPPING_AND_GOVERNANCE_DECISIONS');
assert.equal(snap.language_architecture.current_chat_active_gate,slotStrategyGate.batch_id);
assert.equal(snap.boundaries.first_payload_candidate_productive,true);
assert.equal(snap.boundaries.first_payload_candidate_curriculum_mapped,true);
assert.equal(snap.boundaries.individual_OPI_slots_assigned,0);
assert.equal(snap.boundaries.OPI_unlocked,false);
assert.equal(snap.boundaries.QA_unlocked,false);
assert.equal(snap.boundaries.STR003_STR005_unlocked,false);
assert.equal(snap.boundaries.runtime_active,false);
assert.equal(snap.parallel_workstreams.HNK3000.automatic_cycle1_binding,false);
assert.equal(snap.parallel_workstreams.parent_lexeme_canonical_integration.consumed_by_v140,false);
assert.equal(snap.next_gate,slotStrategyGate.batch_id);
assert.equal(l02.pedagogy.sealed,true);
assert.deepEqual(l03.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(l03.rules.OPI_unlocked,false);
assert.equal(l03.rules.QA_unlocked,false);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V140');
