import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-story-qa-structure-pattern-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-pattern-review-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-pattern-review.approved-transition.v1.json');
const plan=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-sqs-authoring-plan.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V53.json');

assert.equal(review.review_id,'SWHNK-L02-STORY-QA-STRUCTURE-PATTERN-REVIEW-V1');
assert.equal(review.patterns.length,16);
assert.equal(review.patterns.filter(x=>x.category==='story').length,5);
assert.equal(review.patterns.filter(x=>x.category==='qa').length,4);
assert.equal(review.patterns.filter(x=>x.category==='structure_header').length,2);
assert.equal(review.patterns.filter(x=>x.category==='structure').length,5);
assert.ok(review.patterns.filter(x=>x.category==='qa').every(x=>x.answer_HNK_pattern===null));
assert.equal(review.checks.new_HNK_sentences_authored,0);
assert.equal(review.checks.new_HNK_answers_authored,0);
assert.equal(review.checks.curriculum_slots_AUTHORED,0);
assert.equal(review.checks.curriculum_slots_VALIDATED,0);

assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.decisions_requested.length,20);
assert.ok(gate.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(gate.approved_effect.patterns_approved,16);
assert.equal(gate.approved_effect.curriculum_slots_AUTHORED,0);
assert.equal(gate.approved_effect.curriculum_slots_VALIDATED,0);
assert.equal(transition.status,'APPLIED');
assert.deepEqual(transition.after,{pattern_candidates:16,patterns_approved:16,SQS_AUTHORED:0,SQS_VALIDATED:0});
assert.equal(transition.QA_answer_patterns.approved,0);
assert.equal(transition.QA_answer_patterns.pending,4);

assert.equal(plan.status,'READY_PLAN_NO_SLOTS_AUTHORED');
assert.equal(plan.readiness.ready_count,12);
assert.equal(plan.readiness.blocked_count,4);
assert.equal(plan.QA_policy.answer_patterns_pending,4);
assert.equal(plan.checks.slots_AUTHORED,0);

assert.equal(manifest.pedagogy.sqs_patterns_approved,16);
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,0);
assert.equal(manifest.next_gate,'SWHNK-L02-QA-ANSWER-PATTERN-HUMAN-BATCH-V1');
assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V53');
assert.equal(snapshot.L02.sqs_patterns_approved,16);
assert.equal(snapshot.L02.qa_answer_schemas_approved,0);

console.log('PASS SWHNK-L02-SQS-PATTERN-APPROVED-V1');
console.log('All 16 scoped SQS patterns are approved without slot authoring; 12 slots are authoring-ready after a future gate and four Q&A slots remain blocked by response-schema governance.');
