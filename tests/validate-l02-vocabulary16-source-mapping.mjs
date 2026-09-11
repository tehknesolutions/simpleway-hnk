import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-vocabulary-16-source-mapping-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-vocabulary-16-source-mapping-human-batch.v1.json');
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V60.json');
assert.equal(review.mapping.length,16);
assert.equal(new Set(review.mapping.map(x=>x.slot_id)).size,16);
assert.equal(new Set(review.mapping.map(x=>x.form)).size,16);
assert.equal(review.checks.new_surface_forms,0);
assert.equal(review.checks.authority_promotions,0);
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.slot_decisions.length,16);
assert.equal(gate.governance_decisions.length,5);
assert.equal(gate.checks.vocabulary_authored_before_gate,0);
assert.equal(gate.checks.vocabulary_validated_before_gate,0);
assert.equal(snap.next_gate,'SWHNK-L02-VOCABULARY-16-SOURCE-MAPPING-HUMAN-BATCH-V1');
console.log('PASS SWHNK-L02-VOCABULARY16-SOURCE-MAPPING-GATE-PENDING-V1');
