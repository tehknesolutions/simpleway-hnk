import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-ke-surface-candidate.v1.json');
const designGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-controlled-clause-payload-design-human-batch.v1.json');
const designTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-controlled-clause-payload-design.approved-transition.v1.json');
const proposalReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-controlled-clause-payload-candidate-proposal-review.v1.json');
const proposalGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-controlled-clause-payload-candidate-proposal-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_SCOPED_NONPRODUCTIVE_NONRUNTIME');
assert.equal(candidate.payload_contract.slot_content_authorized,false);
assert.equal(candidate.guards.candidate_productive,false);
assert.equal(candidate.guards.candidate_curriculum_mapped,false);

assert.equal(designGate.status,'APPROVED_ALL_DESIGN_AND_GOVERNANCE_DECISIONS');
assert.ok(designGate.design_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(designGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(designGate.checks.payload_design_approved,true);
assert.equal(designGate.checks.payload_membership_model,'CLOSED_ALLOWLIST');
assert.equal(designGate.checks.authorized_payload_count,0);
assert.equal(designGate.checks.slot_content_authorized,false);

assert.equal(designTransition.status,'APPLIED_PAYLOAD_DESIGN_ARCHITECTURE_ONLY_EMPTY_CLOSED_ALLOWLIST_NO_PAYLOAD_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(designTransition.design_result.membership_model,'CLOSED_ALLOWLIST');
assert.deepEqual(designTransition.design_result.authorized_payloads,[]);
assert.equal(designTransition.design_result.authorized_payload_count,0);
assert.equal(designTransition.design_result.slot_content_authorized,false);
assert.equal(designTransition.guards.STR001_STR002_admitted_by_default,false);
assert.equal(designTransition.guards.arbitrary_clauses_admitted,false);

assert.equal(proposalReview.status,'READY_FOR_HUMAN_REVIEW_PROPOSAL_ONLY_NO_PAYLOAD_AUTHORIZATION_NO_SURFACE_SELECTION_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(proposalReview.recommended_route,'DEDICATED_MINIMAL_CLAUSE_PAYLOAD_CANDIDATE_FIRST');
assert.equal(proposalReview.payload_contract.membership_model,'CLOSED_ALLOWLIST');
assert.equal(proposalReview.payload_contract.authorized_payload_count,0);
assert.equal(proposalReview.proposed_candidate.surface_form_or_package,null);
assert.equal(proposalReview.proposed_candidate.surface_schema,null);
assert.equal(proposalReview.proposed_candidate.subject_person_contract,null);
assert.equal(proposalReview.proposed_candidate.reuses_STR001_STR002,false);

assert.equal(proposalGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(proposalGate.proposal_decisions.every(x=>x.decision==='PENDING'));
assert.ok(proposalGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(proposalGate.checks.payload_design_approved,true);
assert.equal(proposalGate.checks.authorized_payload_count,0);
assert.equal(proposalGate.checks.payload_candidate_created,false);
assert.equal(proposalGate.checks.payload_surface_fields_selected,0);
assert.equal(proposalGate.projected_effect_if_approved.selected_payload_candidate_route,'DEDICATED_MINIMAL_CLAUSE_PAYLOAD_CANDIDATE_FIRST');
assert.equal(proposalGate.projected_effect_if_approved.payload_authorized,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_FIRST_CONTROLLED_CLAUSE_PAYLOAD_CANDIDATE_PROPOSAL_DECISION');
assert.equal(workstream.active_gate,proposalGate.batch_id);
assert.equal(workstream.payload_architecture.approved,true);
assert.equal(workstream.payload_architecture.membership_model,'CLOSED_ALLOWLIST');
assert.equal(workstream.payload_architecture.authorized_payload_count,0);
assert.equal(workstream.recommended_first_payload_route,'DEDICATED_MINIMAL_CLAUSE_PAYLOAD_CANDIDATE_FIRST');
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-CLOSED-ALLOWLIST-ARCHITECTURE-APPROVED-FIRST-PAYLOAD-PROPOSAL-PENDING-V132');
