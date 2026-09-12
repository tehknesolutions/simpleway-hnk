import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-teacher-notes-authoring-human-batch.v1.json');
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V64.json');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.note_decisions.length,3);
assert.equal(gate.governance_decisions.length,5);
assert.equal(gate.checks.approved_scopes,3);
assert.equal(gate.checks.teacher_notes_authored_before_gate,0);
assert.equal(gate.checks.teacher_notes_validated_before_gate,0);
assert.equal(gate.checks.new_surface_forms,0);
assert.equal(gate.checks.authority_promotions,0);
assert.equal(snap.L02.teacher_notes_authored,0);
assert.equal(snap.L02_teacher_notes_authoring.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snap.next_gate,'SWHNK-L02-TEACHER-NOTES-AUTHORING-HUMAN-BATCH-V1');
console.log('PASS SWHNK-L02-TEACHER-NOTES-AUTHORING-GATE-PENDING-V1');
