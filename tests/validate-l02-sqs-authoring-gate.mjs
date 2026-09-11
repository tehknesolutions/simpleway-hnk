import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-authoring-human-batch.v2.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-authoring.partial-transition.v1.json');
const story=await json('curriculum/cycle-01/L02-chokhmah/authoring/story-lane.v1.json');
const qa=await json('curriculum/cycle-01/L02-chokhmah/authoring/qa-lane.v1.json');
const structures=await json('curriculum/cycle-01/L02-chokhmah/authoring/structure-lane.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V56.json');

const required=contract.additions.find(x=>x.lesson===2&&x.category==='structures');
assert.equal(required.content,"I didn't...");
assert.equal(gate.status,'APPROVED_BY_USER_APPLICATION_PARTIAL_CANONICAL_CONTRACT_GUARD');
assert.equal(gate.slot_decisions.length,16);
assert.equal(gate.governance_decisions.length,4);
assert.equal(gate.slot_decisions.filter(x=>x.decision==='APPROVED_APPLIED').length,15);
assert.equal(gate.slot_decisions.find(x=>x.slot==='L02-STR-005').decision,'APPROVED_NOT_APPLIED_CANONICAL_CONTRACT_CONFLICT');
assert.equal(gate.canonical_guard.protected_slot,'L02-STR-005');
assert.equal(gate.canonical_guard.invent_negative_past_HNK_form,false);
assert.equal(gate.actual_effect.L02_SQS_AUTHORED,15);
assert.equal(gate.actual_effect.GLOBAL_AUTHORED,15);
assert.equal(gate.actual_effect.GLOBAL_MISSING,828);

assert.equal(transition.status,'APPLIED_WITH_CANONICAL_CONTRACT_GUARD');
assert.equal(transition.applied.total,15);
assert.equal(transition.held.slot,'L02-STR-005');
assert.equal(story.metrics.AUTHORED,5);
assert.equal(qa.metrics.AUTHORED,4);
assert.equal(structures.metrics.structure_headers_AUTHORED,2);
assert.equal(structures.metrics.structures_AUTHORED,4);
assert.equal(structures.metrics.structures_MISSING,1);
assert.equal(structures.structures.find(x=>x.slot_id==='L02-STR-005').required_content,"I didn't...");
assert.equal(structures.structures.find(x=>x.slot_id==='L02-STR-005').frame,null);

assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,15);
assert.equal(manifest.pedagogy.STR005_state,'MISSING_CANONICAL_DESIGN_GATE_REQUIRED');
assert.equal(manifest.next_gate,'SWHNK-L02-SQS-15-VALIDATION-HUMAN-BATCH-V1');
assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V56');
assert.deepEqual(snapshot.implementation,{MISSING:828,AUTHORED:15,VALIDATED:165,FROZEN:0});

console.log('PASS SWHNK-L02-SQS-AUTHORING-CANONICAL-GUARD-V1');
console.log("15 SQS slots are AUTHORED. L02-STR-005 remains MISSING because the canonical Cycle 1 contract requires 'I didn't...' and the negative-past HNK frame is not yet governed.");
