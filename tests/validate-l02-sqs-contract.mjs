import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const contract=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-story-qa-structure-contract.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-story-qa-structure-contract-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-story-qa-structure-contract.approved-transition.v1.json');
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-story-qa-structure-pattern-review.v1.json');
const reviewGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-pattern-review-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V52.json');

assert.equal(contract.contract_id,'SWHNK-L02-STORY-QA-STRUCTURE-CONTRACT-V1');
assert.deepEqual(contract.slot_targets,{story:5,qa:4,structure_headers:2,structures:5,total:16});
assert.equal(contract.checks.new_HNK_sentences_authored,0);

assert.equal(gate.batch_id,'SWHNK-L02-STORY-QA-STRUCTURE-CONTRACT-HUMAN-BATCH-V1');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.decisions_requested.length,8);
assert.ok(gate.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(gate.approved_effect.total_targets_approved,16);
assert.equal(gate.approved_effect.curriculum_slots_authored,0);
assert.equal(gate.approved_effect.curriculum_slots_validated,0);

assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.total_targets_approved,16);
assert.equal(transition.after.slots_AUTHORED,0);
assert.equal(transition.after.slots_VALIDATED,0);
assert.equal(transition.non_effects.authority_promotions,0);

assert.equal(review.status,'READY_FOR_HUMAN_PATTERN_REVIEW_NOT_APPLIED');
assert.equal(review.patterns.length,16);
assert.equal(review.checks.curriculum_slots_AUTHORED,0);
assert.equal(review.checks.curriculum_slots_VALIDATED,0);
assert.equal(review.checks.new_HNK_sentences_authored,0);
assert.equal(review.checks.new_HNK_answers_authored,0);
assert.deepEqual(review.risk_summary.VERY_HIGH,['L02-SQS-PAT-004','L02-SQS-PAT-009','L02-SQS-PAT-015']);
assert.deepEqual(review.risk_summary.HIGH,['L02-SQS-PAT-016']);

assert.equal(reviewGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(reviewGate.decisions_requested.length,20);
assert.equal(reviewGate.checks.curriculum_slots_AUTHORED_before_gate,0);
assert.equal(reviewGate.checks.curriculum_slots_VALIDATED_before_gate,0);

assert.equal(manifest.pedagogy.sqs_pattern_candidates,16);
assert.equal(manifest.pedagogy.sqs_patterns_approved,0);
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,0);
assert.equal(manifest.pedagogy.story_qa_structure_slots_validated,0);
assert.equal(manifest.next_gate,'SWHNK-L02-SQS-PATTERN-REVIEW-HUMAN-BATCH-V1');
assert.equal(manifest.next_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V52');
assert.deepEqual(snapshot.implementation,{MISSING:843,AUTHORED:0,VALIDATED:165,FROZEN:0});
assert.equal(snapshot.L02_story_qa_structure.pattern_candidates,16);
assert.equal(snapshot.L02_story_qa_structure.patterns_approved,0);
assert.equal(snapshot.L02_story_qa_structure.authored,0);
assert.equal(snapshot.L02_story_qa_structure.validated,0);

console.log('PASS SWHNK-L02-SQS-CONTRACT-APPROVED-PATTERN-REVIEW-PENDING-V1');
console.log('SQS contract is approved and 16 pattern candidates are prepared; pattern approval and all SQS authoring remain behind a separate human gate.');
