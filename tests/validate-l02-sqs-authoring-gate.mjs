import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const plan=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-sqs-authoring-plan.v2.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-authoring-human-batch.v2.json');
const qaApproval=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-qa-answer-pattern-human-batch.v2.json');
const qaTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-qa-answer-pattern.approved-transition.v2.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V55.json');

assert.equal(plan.plan_id,'SWHNK-L02-SQS-AUTHORING-PLAN-V2');
assert.equal(plan.status,'ALL_16_READY_FOR_EXPLICIT_AUTHORING_GATE_NO_SLOTS_AUTHORED');
assert.equal(plan.readiness.ready_count,16);
assert.equal(plan.readiness.blocked_count,0);
assert.equal(plan.QA_policy.answer_schemas_approved,4);
assert.equal(plan.QA_policy.OPI006_yes_no_response_branch_blocked,true);
assert.equal(plan.checks.slots_AUTHORED,0);
assert.equal(plan.checks.slots_VALIDATED,0);

assert.equal(qaApproval.status,'APPROVED_ALL_DECISIONS');
assert.equal(qaApproval.decisions.length,8);
assert.ok(qaApproval.decisions.every(x=>x.decision==='APPROVED'));
assert.equal(qaApproval.approved_effect.QA_answer_schemas_approved,4);
assert.equal(qaTransition.status,'APPLIED');
assert.equal(qaTransition.after.QA_answer_schemas_approved,4);
assert.equal(qaTransition.after.SQS_AUTHORED,0);
assert.equal(qaTransition.blocked_branches[0].question_ref,'L02-OPI-006');

assert.equal(gate.batch_id,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V2');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.slot_decisions.length,16);
assert.equal(gate.governance_decisions.length,4);
assert.equal(gate.projected_effect_if_all_approved.L02_SQS_AUTHORED,16);
assert.equal(gate.projected_effect_if_all_approved.L02_SQS_VALIDATED,0);
assert.equal(gate.projected_effect_if_all_approved.GLOBAL_AUTHORED,16);
assert.equal(gate.projected_effect_if_all_approved.GLOBAL_VALIDATED,165);
assert.equal(gate.projected_effect_if_all_approved.GLOBAL_MISSING,827);
assert.equal(gate.slot_decisions.find(x=>x.slot==='L02-QA-004').blocked_branch,'L02-OPI-006');

assert.equal(manifest.pedagogy.qa_answer_schemas_approved,4);
assert.equal(manifest.pedagogy.sqs_slots_ready_after_authoring_gate,16);
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,0);
assert.equal(manifest.next_gate,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V2');
assert.equal(snapshot.next_gate,'SWHNK-L02-SQS-AUTHORING-HUMAN-BATCH-V2');

console.log('PASS SWHNK-L02-SQS-AUTHORING-GATE-PENDING-V2');
console.log('Exactly 16 SQS slots are ready for explicit authoring approval through the reconciled v2 gate; 0 slots are authored/validated and the OPI-006 yes/no response branch remains blocked.');
