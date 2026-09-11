import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-qa-answer-pattern-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-qa-answer-pattern-human-batch.v1.json');
const plan=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-sqs-authoring-plan.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V53.json');

assert.equal(review.review_id,'SWHNK-L02-QA-ANSWER-PATTERN-REVIEW-V1');
assert.equal(review.status,'READY_FOR_HUMAN_REVIEW_NOT_APPLIED');
assert.equal(review.answer_schema_candidates.length,4);
assert.equal(review.checks.full_HNK_declarative_answers_authored,0);
assert.equal(review.checks.new_surface_forms_created,0);
assert.equal(review.checks.authority_promotions,0);
assert.equal(review.checks.blocked_yes_no_branches,1);
assert.equal(review.answer_schema_candidates.find(x=>x.id==='L02-QA-ANSWER-PAT-001').answer_schema,'[WORKPLACE_OR_WORK_LOCATION]');
assert.equal(review.answer_schema_candidates.find(x=>x.id==='L02-QA-ANSWER-PAT-002').answer_schema,'[STUDY_LOCATION_OR_SCHOOL_DOMAIN]');
assert.equal(review.answer_schema_candidates.find(x=>x.id==='L02-QA-ANSWER-PAT-004').branches.find(x=>x.question_ref==='L02-OPI-006').status,'BLOCKED_NO_GOVERNED_YES_NO_RESPONSE_SCHEMA');

assert.equal(gate.batch_id,'SWHNK-L02-QA-ANSWER-PATTERN-HUMAN-BATCH-V1');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.decisions_requested.length,8);
assert.equal(gate.projected_effect_if_all_approved.QA_answer_schemas_approved,4);
assert.equal(gate.projected_effect_if_all_approved.full_HNK_declarative_answers_authored,0);
assert.equal(gate.projected_effect_if_all_approved.SQS_slots_AUTHORED,0);
assert.equal(gate.projected_effect_if_all_approved.SQS_slots_VALIDATED,0);

assert.equal(plan.readiness.ready_count,12);
assert.equal(plan.readiness.blocked_count,4);
assert.equal(manifest.pedagogy.qa_answer_schema_candidates,4);
assert.equal(manifest.pedagogy.qa_answer_schemas_approved,0);
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,0);
assert.equal(manifest.rules.QA_answer_schemas_are_not_declarative_grammar,true);
assert.equal(manifest.rules.QA_yes_no_response_requires_separate_governance,true);
assert.equal(manifest.next_gate,'SWHNK-L02-QA-ANSWER-PATTERN-HUMAN-BATCH-V1');
assert.equal(snapshot.next_gate,'SWHNK-L02-QA-ANSWER-PATTERN-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-QA-ANSWER-PATTERN-GATE-PENDING-V1');
console.log('Four Q&A response schemas are prepared without declarative HNK sentence invention; the travel yes/no response branch remains blocked and 0 SQS slots are authored.');
