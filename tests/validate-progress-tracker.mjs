import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V137.json');
const l02=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const l03=await json('curriculum/cycle-01/L03-binah/manifest.json');
const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const allowlist=await json('curriculum/cycle-01/L03-binah/bindings/l03-controlled-direct-question-clause-payload-allowlist.v1.json');
const promotionGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-scoped-productivity-promotion-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');

assert.equal(snap.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V137');
assert.equal(snap.package,'simpleway-hnk@0.75.0');
assert.deepEqual(snap.implementation,{MISSING:701,AUTHORED:0,VALIDATED:307,FROZEN:0});
assert.deepEqual(snap.L02.implementation,{MISSING:0,AUTHORED:0,VALIDATED:139,FROZEN:0});
assert.equal(snap.L02.sealed,true);
assert.equal(snap.L02.content_frozen,true);
assert.deepEqual(snap.L03.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(snap.L03.structures_VALIDATED,2);
assert.equal(snap.L03.opi_AUTHORED,0);
assert.equal(snap.L03.opi_VALIDATED,0);
assert.equal(snap.L03.qa_AUTHORED,0);
assert.equal(snap.L03.qa_VALIDATED,0);
assert.equal(snap.L03.controlled_clause_authorized_payload_count,1);
assert.equal(snap.L03.first_payload_candidate_status,'VALIDATED_ALLOWLISTED_PRODUCTIVITY_ELIGIBLE_NONPRODUCTIVE_NONRUNTIME');
assert.equal(snap.L03.first_payload_productivity_eligible,true);
assert.equal(snap.L03.first_payload_candidate_productive,false);
assert.equal(snap.L03.first_payload_candidate_curriculum_mapped,false);

assert.equal(candidate.status,'VALIDATED_ALLOWLISTED_PRODUCTIVITY_ELIGIBLE_NONPRODUCTIVE_NONRUNTIME');
assert.equal(allowlist.authorized_payload_count,1);
assert.equal(allowlist.members[0].productivity_eligible,true);
assert.equal(allowlist.members[0].productive,false);
assert.equal(promotionGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(workstream.active_gate,promotionGate.batch_id);
assert.equal(workstream.status,'ACTIVE_AWAITING_FIRST_PAYLOAD_SCOPED_PRODUCTIVITY_PROMOTION_DECISION');

assert.equal(snap.language_architecture.first_payload_productivity_eligibility_status,'APPROVED_ALL_ELIGIBILITY_AND_GOVERNANCE_DECISIONS');
assert.equal(snap.language_architecture.current_chat_active_gate,promotionGate.batch_id);
assert.equal(snap.language_architecture.current_chat_active_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snap.boundaries.first_payload_productivity_eligible,true);
assert.equal(snap.boundaries.first_payload_candidate_productive,false);
assert.equal(snap.boundaries.first_payload_candidate_curriculum_mapped,false);
assert.equal(snap.boundaries.OPI_unlocked,false);
assert.equal(snap.boundaries.QA_unlocked,false);
assert.equal(snap.boundaries.STR003_STR005_unlocked,false);
assert.equal(snap.boundaries.runtime_active,false);
assert.equal(snap.parallel_workstreams.HNK3000.automatic_cycle1_binding,false);
assert.equal(snap.parallel_workstreams.parent_lexeme_canonical_integration.consumed_by_v137,false);
assert.equal(snap.next_gate,promotionGate.batch_id);
assert.equal(snap.next_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(l02.pedagogy.sealed,true);
assert.deepEqual(l03.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(l03.rules.OPI_unlocked,false);
assert.equal(l03.rules.QA_unlocked,false);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V137');
