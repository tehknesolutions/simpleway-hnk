import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-15-validation-human-batch.v1.json');
const story=await json('curriculum/cycle-01/L02-chokhmah/authoring/story-lane.v1.json');
const qa=await json('curriculum/cycle-01/L02-chokhmah/authoring/qa-lane.v1.json');
const structures=await json('curriculum/cycle-01/L02-chokhmah/authoring/structure-lane.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');

assert.equal(gate.batch_id,'SWHNK-L02-SQS-15-VALIDATION-HUMAN-BATCH-V1');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.slot_decisions.length,15);
assert.equal(gate.governance_decisions.length,5);
assert.equal(gate.checks.authored_slots,15);
assert.equal(gate.checks.STR005_missing,true);
assert.equal(gate.projected_effect_if_all_approved.L02_SQS_VALIDATED,15);
assert.equal(gate.projected_effect_if_all_approved.GLOBAL_VALIDATED,180);
assert.equal(gate.projected_effect_if_all_approved.GLOBAL_MISSING,828);
assert.equal(gate.projected_effect_if_all_approved.STR005_remains_missing,true);
assert.equal(story.metrics.AUTHORED,5);
assert.equal(qa.metrics.AUTHORED,4);
assert.equal(structures.metrics.structure_headers_AUTHORED,2);
assert.equal(structures.metrics.structures_AUTHORED,4);
assert.equal(structures.metrics.structures_MISSING,1);
assert.equal(manifest.next_gate,'SWHNK-L02-SQS-15-VALIDATION-HUMAN-BATCH-V1');
console.log('PASS SWHNK-L02-SQS-15-VALIDATION-GATE-PENDING-V1');
