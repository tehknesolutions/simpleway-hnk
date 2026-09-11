import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-authoring-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-authoring.applied-transition.v1.json');
const lane=await json('curriculum/cycle-01/L02-chokhmah/authoring/vocabulary-lane.v1.json');
const valGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-validation-human-batch.v1.json');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.slot_decisions.length,16);
assert.equal(gate.governance_decisions.length,5);
assert.equal(transition.status,'APPLIED');
assert.equal(lane.items.length,16);
assert.equal(lane.metrics.AUTHORED,16);
assert.equal(lane.metrics.VALIDATED,0);
assert.equal(lane.metrics.new_HNK_surface_forms,0);
assert.equal(lane.metrics.authority_promotions,0);
assert.equal(valGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
console.log('PASS SWHNK-L02-VOCABULARY16-AUTHORING-V62');
