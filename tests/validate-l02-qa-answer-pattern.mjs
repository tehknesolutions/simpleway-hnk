import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-qa-answer-pattern-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-qa-answer-pattern-human-batch.v2.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-qa-answer-pattern.approved-transition.v2.json');
const plan=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-sqs-authoring-plan.v2.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V55.json');

assert.equal(review.review_id,'SWHNK-L02-QA-ANSWER-PATTERN-REVIEW-V1');
assert.equal(review.answer_schema_candidates.length,4);
assert.equal(review.checks.full_HNK_declarative_answers_authored,0);
assert.equal(review.checks.new_surface_forms_created,0);
assert.equal(review.checks.authority_promotions,0);
assert.equal(review.checks.blocked_yes_no_branches,1);
assert.equal(review.answer_schema_candidates.find(x=>x.id==='L02-QA-ANSWER-PAT-004').branches.find(x=>x.question_ref==='L02-OPI-006').status,'BLOCKED_NO_GOVERNED_YES_NO_RESPONSE_SCHEMA');

assert.equal(gate.batch_id,'SWHNK-L02-QA-ANSWER-PATTERN-HUMAN-BATCH-V2');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.decisions.length,8);
assert.ok(gate.decisions.every(x=>x.decision==='APPROVED'));
assert.equal(gate.approved_effect.QA_answer_schemas_approved,4);
assert.equal(gate.approved_effect.SQS_slots_AUTHORED,0);
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.QA_answer_schemas_approved,4);
assert.equal(transition.after.SQS_AUTHORED,0);
assert.equal(transition.blocked_branches[0].question_ref,'L02-OPI-006');

assert.equal(plan.readiness.ready_count,16);
assert.equal(plan.readiness.blocked_count,0);
assert.equal(plan.QA_policy.answer_schemas_approved,4);
assert.equal(plan.QA_policy.OPI006_yes_no_response_branch_blocked,true);
assert.equal(manifest.pedagogy.qa_answer_schema_candidates,4);
assert.equal(manifest.pedagogy.qa_answer_schemas_approved,4);
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,0);
assert.equal(manifest.next_gate,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V2');
assert.equal(snapshot.next_gate,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V2');

console.log('PASS SWHNK-L02-QA-ANSWER-PATTERN-APPROVED-V2');
console.log('Four Q&A response schemas are approved in reconciled v2 governance without declarative HNK sentence invention; all 16 SQS slots now await one explicit authoring gate.');
