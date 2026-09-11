import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-story-qa-structure-pattern-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-pattern-review-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-pattern-review.approved-transition.v1.json');
const plan=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-sqs-authoring-plan.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');

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
assert.equal(transition.after.patterns_approved,16);
assert.equal(transition.after.SQS_AUTHORED,0);

assert.equal(plan.allocation.total,16);
assert.equal(plan.checks.patterns_approved,16);
assert.equal(plan.checks.slots_AUTHORED,0);
assert.equal(plan.checks.slots_VALIDATED,0);
assert.ok(plan.readiness.ready_count>=12 && plan.readiness.ready_count<=16);
assert.equal(manifest.pedagogy.sqs_patterns_approved,16);
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,0);

console.log('PASS SWHNK-L02-SQS-PATTERN-APPROVED-LIFECYCLE-STABLE-V1');
console.log('All 16 scoped SQS patterns remain approved with zero slot authoring at this historical gate; later response-schema and authoring gates may advance without invalidating this proof.');
