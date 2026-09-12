import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V64.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const reviewGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-teacher-notes-source-review-human-batch.v1.json');
const authorGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-teacher-notes-authoring-human-batch.v1.json');
assert.equal(snap.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V64');
assert.equal(snap.package,'simpleway-hnk@0.67.0');
assert.deepEqual(snap.implementation,{MISSING:811,AUTHORED:0,VALIDATED:197,FROZEN:0});
assert.deepEqual(snap.L02.implementation,{MISSING:97,AUTHORED:0,VALIDATED:42,FROZEN:0});
assert.equal(manifest.pedagogy.vocabulary_validated,16);
assert.equal(manifest.pedagogy.teacher_notes_scope_approved,3);
assert.equal(manifest.pedagogy.teacher_notes_authored,0);
assert.equal(manifest.pedagogy.teacher_notes_validated,0);
assert.equal(reviewGate.status,'APPROVED_ALL_DECISIONS');
assert.equal(authorGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(manifest.next_gate,'SWHNK-L02-TEACHER-NOTES-AUTHORING-HUMAN-BATCH-V1');
console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V64');
