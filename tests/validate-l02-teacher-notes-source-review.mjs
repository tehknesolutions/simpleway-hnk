import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-teacher-notes-source-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-teacher-notes-source-review-human-batch.v1.json');
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V63.json');
assert.equal(review.status,'READY_FOR_HUMAN_REVIEW_NO_TEACHER_NOTE_AUTHORING');
assert.equal(review.note_scope_candidates.length,3);
assert.equal(review.checks.teacher_notes_authored,0);
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.scope_decisions.length,3);
assert.equal(gate.governance_decisions.length,5);
assert.equal(snap.next_gate,'SWHNK-L02-TEACHER-NOTES-SOURCE-REVIEW-HUMAN-BATCH-V1');
console.log('PASS SWHNK-L02-TEACHER-NOTES-SOURCE-REVIEW-PENDING-V1');
