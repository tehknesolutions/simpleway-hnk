import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V61.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const mapGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-source-mapping-human-batch.v1.json');
const authorGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-authoring-human-batch.v1.json');
assert.equal(snap.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V61');
assert.equal(snap.package,'simpleway-hnk@0.64.0');
assert.deepEqual(snap.implementation,{MISSING:827,AUTHORED:0,VALIDATED:181,FROZEN:0});
assert.deepEqual(snap.L02.implementation,{MISSING:113,AUTHORED:0,VALIDATED:26,FROZEN:0});
assert.equal(manifest.pedagogy.vocabulary_mapping_approved,16);
assert.equal(manifest.pedagogy.vocabulary_authored,0);
assert.equal(manifest.pedagogy.vocabulary_validated,0);
assert.equal(mapGate.status,'APPROVED_ALL_DECISIONS');
assert.equal(authorGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(manifest.next_gate,'SWHNK-L02-VOCABULARY-16-AUTHORING-HUMAN-BATCH-V1');
console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V61');
