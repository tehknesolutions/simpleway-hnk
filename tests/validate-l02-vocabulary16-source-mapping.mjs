import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-source-mapping-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-source-mapping.approved-transition.v1.json');
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V61.json');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.slot_decisions.length,16);
assert.equal(gate.governance_decisions.length,5);
assert.ok(gate.slot_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(gate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(transition.status,'APPLIED');
assert.equal(transition.effect.mappings_approved,16);
assert.equal(transition.effect.vocabulary_AUTHORED,0);
assert.equal(transition.effect.vocabulary_VALIDATED,0);
assert.deepEqual(snap.implementation,{MISSING:827,AUTHORED:0,VALIDATED:181,FROZEN:0});
assert.equal(snap.next_gate,'SWHNK-L02-VOCABULARY-16-AUTHORING-HUMAN-BATCH-V1');
console.log('PASS SWHNK-L02-VOCABULARY16-MAPPING-APPROVED-V1');
