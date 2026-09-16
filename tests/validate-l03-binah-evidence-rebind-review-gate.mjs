import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-ke-surface-candidate.v1.json');
const designGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-controlled-clause-payload-design-human-batch.v1.json');
const proposalGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-controlled-clause-payload-candidate-proposal-human-batch.v1.json');
const proposalTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-controlled-clause-payload-candidate-proposal.approved-transition.v1.json');
const exactReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-payload-exact-surface-function-package-review.v1.json');
const exactGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-exact-surface-function-package-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_SCOPED_NONPRODUCTIVE_NONRUNTIME');
assert.equal(candidate.payload_contract.slot_content_authorized,false);
assert.equal(candidate.guards.candidate_productive,false);
assert.equal(candidate.guards.candidate_curriculum_mapped,false);

assert.equal(designGate.status,'APPROVED_ALL_DESIGN_AND_GOVERNANCE_DECISIONS');
assert.equal(designGate.checks.payload_membership_model,'CLOSED_ALLOWLIST');
assert.equal(designGate.checks.authorized_payload_count,0);

assert.equal(proposalGate.status,'APPROVED_ALL_PROPOSAL_AND_GOVERNANCE_DECISIONS');
assert.ok(proposalGate.proposal_decisions.every(x=>x.decision==='APPROVED'));
assert.ok(proposalGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(proposalGate.checks.payload_candidate_proposal_approved,true);
assert.equal(proposalGate.checks.payload_candidate_created,false);
assert.equal(proposalGate.checks.payload_surface_fields_selected,0);
assert.equal(proposalGate.applied_effect.selected_payload_candidate_route,'DEDICATED_MINIMAL_CLAUSE_PAYLOAD_CANDIDATE_FIRST');
assert.equal(proposalGate.applied_effect.payload_authorized,false);

assert.equal(proposalTransition.status,'APPLIED_FIRST_PAYLOAD_CANDIDATE_ROUTE_SELECTION_ONLY_NO_SURFACE_NO_PAYLOAD_ADMISSION_NO_PRODUCTIVITY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.equal(proposalTransition.proposal_result.selected_route,'DEDICATED_MINIMAL_CLAUSE_PAYLOAD_CANDIDATE_FIRST');
assert.equal(proposalTransition.proposal_result.payload_candidate_created,false);
assert.equal(proposalTransition.proposal_result.payload_surface_fields_selected,0);
assert.equal(proposalTransition.proposal_result.payload_authorized,false);
assert.equal(proposalTransition.guards.STR001_STR002_reused,false);
assert.equal(proposalTransition.guards.AN_EN_used,false);
assert.equal(proposalTransition.guards.KU_KUVAN_used,false);

assert.equal(exactReview.status,'READY_FOR_EXPLICIT_HUMAN_PACKAGE_NO_AUTOMATIC_SELECTION');
assert.equal(exactReview.required_package_fields.length,6);
assert.ok(Object.values(exactReview.current_values).every(x=>x===null));
assert.equal(exactReview.selection_rule,'ALL_SIX_FIELDS_REQUIRE_EXPLICIT_HUMAN_SELECTION_OR_EXPLICIT_NONE_NOT_APPLICABLE_CONTRACT; BARE_SIGA_SELECTS_NOTHING');

assert.equal(exactGate.status,'AWAITING_EXPLICIT_HUMAN_SURFACE_FUNCTION_PACKAGE');
assert.equal(Object.keys(exactGate.required_fields).length,6);
assert.ok(Object.values(exactGate.required_fields).every(x=>x===null));
assert.equal(exactGate.checks.required_field_count,6);
assert.equal(exactGate.checks.completed_field_count,0);
assert.equal(exactGate.checks.explicit_package_complete,false);
assert.equal(exactGate.checks.payload_candidate_created,false);
assert.equal(exactGate.checks.payload_authorized,false);
assert.equal(exactGate.checks.authorized_payload_count,0);

assert.equal(workstream.status,'ACTIVE_AWAITING_FIRST_PAYLOAD_EXACT_SURFACE_FUNCTION_PACKAGE');
assert.equal(workstream.active_gate,exactGate.batch_id);
assert.equal(workstream.first_payload_candidate.route,'DEDICATED_MINIMAL_CLAUSE_PAYLOAD_CANDIDATE_FIRST');
assert.equal(workstream.first_payload_candidate.proposal_approved,true);
assert.equal(workstream.first_payload_candidate.created,false);
assert.equal(workstream.first_payload_candidate.surface_fields_selected,0);
assert.equal(workstream.payload_architecture.authorized_payload_count,0);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-FIRST-PAYLOAD-ROUTE-APPROVED-EXACT-PACKAGE-PENDING-V133');
