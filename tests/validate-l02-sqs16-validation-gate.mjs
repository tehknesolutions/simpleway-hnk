import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-16-validation-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-16-validation.applied-transition.v1.json');
const artifact=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-001-016.validated.v1.json');
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V60.json');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.slot_decisions.length,16);
assert.equal(gate.governance_decisions.length,5);
assert.ok(gate.slot_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(gate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(transition.status,'APPLIED');
assert.equal(artifact.metrics.validated,16);
assert.deepEqual(snap.implementation,{MISSING:827,AUTHORED:0,VALIDATED:181,FROZEN:0});
assert.equal(snap.L02_SQS16_validation.validated,16);
assert.equal(snap.boundaries.authority_promotions,0);
assert.equal(snap.boundaries.OPI006_yes_no_branch_blocked,true);
console.log('PASS SWHNK-L02-SQS16-VALIDATION-APPLIED-V1');
