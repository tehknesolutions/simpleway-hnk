import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-ne-scope-exact-pattern-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-ne-scope-exact-pattern.approved-transition.v1.json');
const authorGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-authoring-human-batch.v1.json');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.decisions_requested.length,12);
assert.ok(gate.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.selected_pattern,'L02-STR005-PAT-B');
assert.equal(transition.after.NE_L02_scope_extension_applied,1);
assert.equal(authorGate.status,'APPROVED_ALL_DECISIONS');
console.log('PASS SWHNK-L02-STR005-PATTERN-APPROVED-V58');