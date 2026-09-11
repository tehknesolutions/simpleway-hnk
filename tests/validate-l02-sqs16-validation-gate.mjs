import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-16-validation-human-batch.v1.json');
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V59.json');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.slot_decisions.length,16);
assert.equal(gate.governance_decisions.length,5);
assert.equal(gate.checks.authored_slots,16);
assert.equal(gate.checks.validated_before_gate,0);
assert.deepEqual(snap.implementation,{MISSING:827,AUTHORED:16,VALIDATED:165,FROZEN:0});
assert.equal(snap.next_gate,'SWHNK-L02-SQS-16-VALIDATION-HUMAN-BATCH-V1');
console.log('PASS SWHNK-L02-SQS16-VALIDATION-GATE-PENDING-V1');