import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const base=await json('progress/evidence-overrides.v1.json');
const names=(await readdir(new URL('../progress/',import.meta.url))).filter(name=>/^evidence-overrides\.v\d+\.json$/.test(name)&&name!=='evidence-overrides.v1.json').sort((a,b)=>Number(a.match(/\.v(\d+)\./)[1])-Number(b.match(/\.v(\d+)\./)[1]));
const evidence={...base,overrides:[...base.overrides],lexical_evidence:{...base.lexical_evidence},validation_evidence:{...base.validation_evidence}};
for(const name of names){const s=await json(`progress/${name}`);evidence.overrides.push(...(s.overrides??[]));Object.assign(evidence.lexical_evidence,s.lexical_evidence_updates??{});Object.assign(evidence.validation_evidence,s.validation_evidence_updates??{});}

const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V54.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const qaGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-qa-answer-pattern-human-batch.v1.json');
const qaTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-qa-answer-pattern.approved-transition.v1.json');
const authorGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-authoring-human-batch.v1.json');
const candidates=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-sqs-001-016.authoring-candidates.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,0);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,165);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V54');
assert.equal(snapshot.package,'simpleway-hnk@0.57.0');
assert.deepEqual(snapshot.implementation,{MISSING:843,AUTHORED:0,VALIDATED:165,FROZEN:0});
assert.equal(snapshot.L01.validated,155);
assert.deepEqual(snapshot.L02.implementation,{MISSING:129,AUTHORED:0,VALIDATED:10,FROZEN:0});
assert.equal(snapshot.L02.sqs_patterns_approved,16);
assert.equal(snapshot.L02.qa_answer_schemas_approved,4);
assert.equal(snapshot.L02.sqs_authoring_candidates,16);
assert.equal(snapshot.L02.story_qa_structure_slots_authored,0);
assert.equal(snapshot.next_gate,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V1');

assert.equal(qaGate.status,'APPROVED_ALL_DECISIONS');
assert.ok(qaGate.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(qaGate.approved_effect.QA_answer_schemas_approved,4);
assert.equal(qaTransition.after.QA_answer_schemas_approved,4);
assert.equal(qaTransition.after.SQS_AUTHORED,0);
assert.equal(authorGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(authorGate.decisions_requested.length,20);
assert.equal(authorGate.projected_effect_if_all_approved.L02_SQS_AUTHORED,16);
assert.equal(authorGate.projected_effect_if_all_approved.GLOBAL_AUTHORED,16);
assert.equal(candidates.slots.length,16);
assert.ok(candidates.slots.every(x=>x.implementation_state==='CANDIDATE_FOR_AUTHORING_GATE'));
assert.equal(candidates.checks.slots_AUTHORED,0);

assert.equal(manifest.pedagogy.curriculum_OPI_validated,10);
assert.equal(manifest.pedagogy.sqs_patterns_approved,16);
assert.equal(manifest.pedagogy.qa_answer_schemas_approved,4);
assert.equal(manifest.pedagogy.sqs_slots_ready_after_authoring_gate,16);
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,0);
assert.equal(manifest.next_gate,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V1');

assert.equal(evidence.lexical_evidence.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(evidence.lexical_evidence.governed_unique_language_assets,51);
assert.equal(evidence.validation_evidence.L02_OPI_validated,10);
assert.equal(evidence.validation_evidence.L02_SQS_patterns_approved,16);
assert.equal(evidence.validation_evidence.L02_QA_answer_schemas_approved,4);
assert.equal(evidence.validation_evidence.GLOBAL_validated_total,165);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V54');
console.log('Kether remains 155/155 VALIDATED; Chokhmah has 10 VALIDATED OPI, 16 approved SQS patterns and 4 approved Q&A response schemas, while all 16 SQS slots await one explicit authoring gate.');
