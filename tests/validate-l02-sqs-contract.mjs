import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const contract=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-story-qa-structure-contract.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-story-qa-structure-contract-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V51.json');

assert.equal(contract.contract_id,'SWHNK-L02-STORY-QA-STRUCTURE-CONTRACT-V1');
assert.equal(contract.status,'READY_FOR_HUMAN_REVIEW_NO_NEW_HNK_PAYLOAD_YET');
assert.deepEqual(contract.slot_targets,{story:5,qa:4,structure_headers:2,structures:5,total:16});
assert.equal(contract.checks.new_HNK_sentences_authored,0);
assert.equal(contract.checks.authority_promotions,0);
assert.deepEqual(contract.excluded_unresolved_source_forms,['VANI','VANUVALI']);

assert.equal(gate.batch_id,'SWHNK-L02-STORY-QA-STRUCTURE-CONTRACT-HUMAN-BATCH-V1');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.decisions_requested.length,8);
assert.equal(gate.checks.curriculum_slots_authored,0);
assert.equal(gate.checks.curriculum_slots_validated,0);

assert.equal(manifest.status,'OPI_10_OF_10_VALIDATED_SQS_CONTRACT_HUMAN_REVIEW_PENDING');
assert.equal(manifest.pedagogy.curriculum_OPI_validated,10);
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,0);
assert.equal(manifest.pedagogy.story_qa_structure_slots_validated,0);
assert.equal(manifest.next_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V51');
assert.deepEqual(snapshot.implementation,{MISSING:843,AUTHORED:0,VALIDATED:165,FROZEN:0});
assert.equal(snapshot.L02_story_qa_structure.target_slots,16);
assert.equal(snapshot.L02_story_qa_structure.authored,0);
assert.equal(snapshot.L02_story_qa_structure.validated,0);
assert.equal(snapshot.L02_story_qa_structure.pattern_review_opened,false);

await assert.rejects(access(new URL('../curriculum/cycle-01/L02-chokhmah/source-lock/l02-story-qa-structure-pattern-review.v1.json',import.meta.url)));
await assert.rejects(access(new URL('../curriculum/cycle-01/L02-chokhmah/validation/l02-story-qa-structure-pattern-review-human-batch.v1.json',import.meta.url)));

console.log('PASS SWHNK-L02-SQS-CONTRACT-HUMAN-REVIEW-PENDING-V1');
console.log('L02 SQS contract targets 16 slots, with 0 authored/validated SQS slots and no pattern review opened before explicit human approval.');
