import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-story-qa-structure-pattern-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-pattern-review-human-batch.v1.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V52.json');

assert.equal(review.review_id,'SWHNK-L02-STORY-QA-STRUCTURE-PATTERN-REVIEW-V1');
assert.equal(review.status,'READY_FOR_HUMAN_PATTERN_REVIEW_NOT_APPLIED');
assert.equal(review.patterns.length,16);
assert.equal(review.patterns.filter(x=>x.category==='story').length,5);
assert.equal(review.patterns.filter(x=>x.category==='qa').length,4);
assert.equal(review.patterns.filter(x=>x.category==='structure_header').length,2);
assert.equal(review.patterns.filter(x=>x.category==='structure').length,5);
assert.ok(review.patterns.filter(x=>x.category==='qa').every(x=>x.answer_HNK_pattern===null));
assert.equal(review.checks.new_HNK_sentences_authored,0);
assert.equal(review.checks.new_HNK_answers_authored,0);
assert.equal(review.checks.new_surface_forms_created,0);
assert.equal(review.checks.authority_promotions,0);
assert.equal(review.checks.curriculum_slots_AUTHORED,0);
assert.equal(review.checks.curriculum_slots_VALIDATED,0);
assert.equal(gate.batch_id,'SWHNK-L02-SQS-PATTERN-REVIEW-HUMAN-BATCH-V1');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.decisions_requested.length,20);
assert.equal(gate.projected_effect_if_all_approved.curriculum_slots_AUTHORED,0);
assert.equal(gate.projected_effect_if_all_approved.curriculum_slots_VALIDATED,0);
assert.equal(snapshot.next_gate,'SWHNK-L02-SQS-PATTERN-REVIEW-HUMAN-BATCH-V1');
assert.equal(snapshot.next_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');

console.log('PASS SWHNK-L02-SQS-PATTERN-REVIEW-HUMAN-GATE-PENDING-V1');
console.log('16 SQS pattern candidates are reviewable, with Q&A answers still null and 0 SQS slots authored or validated.');
