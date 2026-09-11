import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const plan=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-sqs-authoring-plan.v1.json');
const candidates=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-sqs-001-016.authoring-candidates.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-authoring-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V54.json');

assert.equal(plan.status,'ALL_16_READY_FOR_EXPLICIT_AUTHORING_GATE_NO_SLOTS_AUTHORED');
assert.equal(plan.readiness.ready_count,16);
assert.equal(plan.readiness.blocked_count,0);
assert.equal(plan.QA_policy.answer_schemas_approved,4);
assert.equal(plan.QA_policy.OPI006_yes_no_response_branch_blocked,true);

assert.equal(candidates.artifact_id,'SWHNK-L02-SQS-001-016-AUTHORING-CANDIDATES-V1');
assert.equal(candidates.status,'READY_FOR_EXPLICIT_AUTHORING_GATE_NOT_AUTHORED');
assert.equal(candidates.slots.length,16);
assert.equal(candidates.slots.filter(x=>x.category==='story').length,5);
assert.equal(candidates.slots.filter(x=>x.category==='qa').length,4);
assert.equal(candidates.slots.filter(x=>x.category==='structure_header').length,2);
assert.equal(candidates.slots.filter(x=>x.category==='structure').length,5);
assert.ok(candidates.slots.every(x=>x.implementation_state==='CANDIDATE_FOR_AUTHORING_GATE'));
assert.equal(candidates.checks.slots_AUTHORED,0);
assert.equal(candidates.checks.slots_VALIDATED,0);
assert.equal(candidates.checks.new_HNK_sentences_authored,0);
assert.equal(candidates.checks.new_surface_forms_created,0);
assert.equal(candidates.checks.authority_promotions,0);
assert.equal(candidates.checks.blocked_yes_no_branches,1);

const qa4=candidates.slots.find(x=>x.slot_id==='L02-QA-004');
assert.equal(qa4.blocked_branch.question_ref,'L02-OPI-006');
assert.equal(qa4.blocked_branch.status,'BLOCKED_NO_GOVERNED_YES_NO_RESPONSE_SCHEMA');

assert.equal(gate.batch_id,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V1');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.decisions_requested.length,20);
assert.equal(gate.projected_effect_if_all_approved.L02_SQS_AUTHORED,16);
assert.equal(gate.projected_effect_if_all_approved.L02_SQS_VALIDATED,0);
assert.equal(gate.projected_effect_if_all_approved.GLOBAL_AUTHORED,16);
assert.equal(gate.projected_effect_if_all_approved.GLOBAL_VALIDATED,165);
assert.equal(gate.projected_effect_if_all_approved.GLOBAL_MISSING,827);

assert.equal(manifest.pedagogy.qa_answer_schemas_approved,4);
assert.equal(manifest.pedagogy.sqs_slots_ready_after_authoring_gate,16);
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,0);
assert.equal(manifest.next_gate,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V1');
assert.equal(snapshot.next_gate,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-SQS-AUTHORING-GATE-PENDING-V1');
console.log('Exactly 16 evidence-backed SQS slots are ready for explicit authoring approval, while 0 are authored/validated and the OPI-006 yes/no response branch remains blocked.');
