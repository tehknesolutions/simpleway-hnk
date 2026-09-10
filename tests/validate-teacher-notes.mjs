import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const notes=await json('curriculum/cycle-01/L01-kether/authoring/teacher-notes.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/teacher-notes-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L01-kether/validation/teacher-notes.validated-transition.v1.json');
const evidence=await json('progress/evidence-overrides.v1.json');

assert.equal(notes.lane_id,'SWHNK-L01-TEACHER-NOTES-AUTHORING-V1');
assert.equal(notes.status,'AUTHORED_3_OF_3_VALIDATION_PENDING');
assert.equal(notes.notes.length,3);
assert.deepEqual(notes.notes.map(x=>x.slot_id),['L01-NOTE-001','L01-NOTE-002','L01-NOTE-003']);
assert.equal(notes.metrics.teacher_notes_target,3);
assert.equal(notes.metrics.AUTHORED,3);
assert.equal(notes.metrics.VALIDATED,0);
assert.equal(notes.metrics.FROZEN,0);
assert.equal(notes.metrics.new_HNK_lexical_forms,0);
assert.equal(notes.metrics.new_HNK_grammar_rules,0);
assert.equal(notes.source_contract.payload_historical_recovery_claim,false);

const n1=notes.notes[0], n2=notes.notes[1], n3=notes.notes[2];
assert.ok(n1.guidance_pt.some(x=>x.includes('YA e ES')));
assert.ok(n1.guidance_pt.some(x=>x.includes('WATCH, GATE e CANDIDATE')));
assert.deepEqual(n2.recommended_flow,['OPI_INTENT','FOUNDATION_ACTIVATION','SCOPED_STRUCTURE_FRAME','INTEGRATIVE_ACTIVATION']);
assert.ok(n2.guidance_pt.some(x=>x.includes('WORK_OR_SCHOOL')));
assert.ok(n2.guidance_pt.some(x=>x.includes('VAMUSARO')));
assert.ok(n3.guidance_pt.some(x=>x.includes('WITH')));
assert.ok(n3.guidance_pt.some(x=>x.includes('NE VAME VAMAZAMU')));
assert.ok(n3.guidance_pt.some(x=>x.includes('weekend')));

assert.equal(batch.status,'APPROVED_AND_APPLIED_SCOPED_PEDAGOGICAL_VALIDATION');
assert.ok(batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(batch.applied_effect.teacher_notes_VALIDATED,3);
assert.equal(batch.applied_effect.global_VALIDATED_after,92);
assert.equal(batch.applied_effect.new_HNK_lexical_forms,0);
assert.equal(batch.applied_effect.new_HNK_grammar_rules,0);
assert.equal(batch.applied_effect.language_authority_promotions,0);
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.VALIDATED,3);
assert.equal(transition.global_after.VALIDATED,92);
assert.equal(transition.authority_effect.historical_note_payload_claim,false);

const v=evidence.validation_evidence;
assert.equal(v.L01_Teacher_notes_target,3);
assert.equal(v.L01_Teacher_notes_authored,0);
assert.equal(v.L01_Teacher_notes_validated,3);
assert.equal(v.L01_Teacher_notes_authored_or_better,3);
assert.equal(v.prepared_teacher_notes_batch,null);

console.log('PASS SWHNK-L01-TEACHER-NOTES-V2');
console.log('3/3 teacher notes VALIDATED for scoped pedagogical use; source authorship record preserved; no new HNK lexicon, grammar or authority promotion.');
