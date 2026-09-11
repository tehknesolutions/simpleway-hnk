import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-validation-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-validation.applied-transition.v1.json');
const artifact=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-001-016.validated.v1.json');
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V63.json');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.slot_decisions.length,16);
assert.equal(gate.governance_decisions.length,5);
assert.equal(transition.status,'APPLIED');
assert.equal(artifact.items.length,16);
assert.equal(artifact.metrics.VALIDATED,16);
assert.deepEqual(snap.implementation,{MISSING:811,AUTHORED:0,VALIDATED:197,FROZEN:0});
assert.equal(snap.L02.vocabulary_validated,16);
console.log('PASS SWHNK-L02-VOCABULARY16-VALIDATED-V1');
