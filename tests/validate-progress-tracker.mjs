import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence=await json('progress/evidence-overrides.v1.json');
const bindings=await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix=await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const p06Batch=await json('curriculum/cycle-01/L01-kether/validation/activation-p06-integrative-human-batch.v1.json');
const p06Transition=await json('curriculum/cycle-01/L01-kether/validation/activation-p06.validated-transition.v1.json');
const structureBatch=await json('curriculum/cycle-01/L01-kether/validation/structure-lane-human-batch.v1.json');
const structureTransition=await json('curriculum/cycle-01/L01-kether/validation/structure-lane.validated-transition.v1.json');
const teacherNotesBatch=await json('curriculum/cycle-01/L01-kether/validation/teacher-notes-human-batch.v1.json');
const teacherNotesTransition=await json('curriculum/cycle-01/L01-kether/validation/teacher-notes.validated-transition.v1.json');
const qa=await json('curriculum/cycle-01/L01-kether/authoring/qa-lane.v1.json');
const qaBatch=await json('curriculum/cycle-01/L01-kether/validation/qa-human-batch.v1.json');
const numeralBatch=await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const kuon=await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,4);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,92);
assert.equal(values.filter(x=>['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length,96);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);
assert.equal(values.filter(x=>x.scaffolded).length,96);

assert.equal(bindings.metrics.validated,10);
assert.equal(matrix.summary.validation_phase,'COMPLETE');
assert.equal(matrix.summary.validated,10);
assert.equal(p06Batch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(p06Transition.status,'APPLIED');
assert.equal(p06Transition.lesson_activation_after.VALIDATED,72);
assert.equal(structureBatch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(structureTransition.status,'APPLIED');
assert.equal(structureTransition.global_after.VALIDATED,89);

const v=evidence.validation_evidence;
assert.equal(v.L01_Activation_validated,72);
assert.equal(v.L01_Structure_headers_validated,2);
assert.equal(v.L01_Structures_validated,5);
assert.equal(v.L01_Structure_lane_validated,7);

assert.equal(teacherNotesBatch.status,'APPROVED_AND_APPLIED_SCOPED_PEDAGOGICAL_VALIDATION');
assert.ok(teacherNotesBatch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(teacherNotesTransition.status,'APPLIED');
assert.equal(teacherNotesTransition.global_after.VALIDATED,92);
assert.equal(v.L01_Teacher_notes_target,3);
assert.equal(v.L01_Teacher_notes_authored,0);
assert.equal(v.L01_Teacher_notes_validated,3);
assert.equal(v.L01_Teacher_notes_authored_or_better,3);
assert.equal(v.prepared_teacher_notes_batch,null);

assert.equal(qa.status,'AUTHORED_4_OF_4_VALIDATION_PENDING');
assert.equal(qa.items.length,4);
assert.equal(qa.metrics.new_HNK_lexical_forms,0);
assert.equal(qa.metrics.new_HNK_grammar_rules,0);
assert.equal(qaBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(qaBatch.projected_effect_if_all_approved.global_VALIDATED_after,96);
assert.equal(v.L01_QA_target,4);
assert.equal(v.L01_QA_authored,4);
assert.equal(v.L01_QA_validated,0);
assert.equal(v.L01_QA_authored_or_better,4);
assert.equal(v.prepared_QA_batch,'../curriculum/cycle-01/L01-kether/validation/qa-human-batch.v1.json');

assert.equal(numeralBatch.status,'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after,45);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');
assert.equal(kuon.authority,'CANDIDATE');
assert.equal(kuon.dependency.authority,'GATE');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V22');
console.log('Cycle 1: 4 AUTHORED + 92 VALIDATED = 96 authored-or-better; L01 OPI, Activation, structures and teacher notes fully validated; 4 Q&A authored, validation pending.');
