import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V59.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const structures=await json('curriculum/cycle-01/L02-chokhmah/authoring/structure-lane.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-16-validation-human-batch.v1.json');
assert.equal(snap.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V59');
assert.equal(snap.package,'simpleway-hnk@0.62.0');
assert.deepEqual(snap.implementation,{MISSING:827,AUTHORED:16,VALIDATED:165,FROZEN:0});
assert.deepEqual(snap.L02.implementation,{MISSING:113,AUTHORED:16,VALIDATED:10,FROZEN:0});
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,16);
assert.equal(manifest.pedagogy.story_qa_structure_slots_validated,0);
assert.equal(manifest.pedagogy.STR005_state,'AUTHORED_NOT_VALIDATED');
assert.equal(structures.metrics.structures_AUTHORED,5);
assert.equal(structures.metrics.structures_MISSING,0);
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(manifest.next_gate,'SWHNK-L02-SQS-16-VALIDATION-HUMAN-BATCH-V1');
console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V59');