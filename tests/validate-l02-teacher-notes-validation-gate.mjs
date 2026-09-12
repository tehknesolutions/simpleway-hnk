import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-teacher-notes-validation-human-batch.v1.json');
const artifact=await json('curriculum/cycle-01/L02-chokhmah/authoring/teacher-notes.v1.json');
const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V65.json');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.note_decisions.length,3);
assert.equal(gate.governance_decisions.length,5);
assert.equal(gate.checks.authored_notes,3);
assert.equal(gate.checks.validated_before_gate,0);
assert.equal(gate.checks.new_surface_forms,0);
assert.equal(gate.checks.new_grammar_rules,0);
assert.equal(gate.checks.authority_promotions,0);
assert.equal(artifact.metrics.VALIDATED,0);
assert.equal(snap.L02_teacher_notes_validation.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snap.next_gate,'SWHNK-L02-TEACHER-NOTES-VALIDATION-HUMAN-BATCH-V1');
console.log('PASS SWHNK-L02-TEACHER-NOTES-VALIDATION-GATE-PENDING-V1');
