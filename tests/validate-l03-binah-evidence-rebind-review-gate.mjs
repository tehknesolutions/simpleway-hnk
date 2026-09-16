import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-dedicated-minimal-clause-payload-candidate.v1.json');
const allowlist=await json('curriculum/cycle-01/L03-binah/bindings/l03-controlled-direct-question-clause-payload-allowlist.v1.json');
const promotionGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-scoped-productivity-promotion-human-batch.v1.json');
const promotionTransition=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-scoped-productivity-promotion.approved-transition.v1.json');
const mappingReview=await json('curriculum/cycle-01/L03-binah/source-lock/l03-opi-foundational-interrogative-first-payload-curriculum-mapping-strategy-review.v1.json');
const mappingGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-first-payload-curriculum-mapping-strategy-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');
const manifest=await json('curriculum/cycle-01/L03-binah/manifest.json');

assert.equal(candidate.status,'VALIDATED_ALLOWLISTED_SCOPED_PRODUCTIVE_NONRUNTIME');
assert.equal(candidate.guards.candidate_validated,true);
assert.equal(candidate.guards.payload_authorized,true);
assert.equal(candidate.guards.productivity_eligible,true);
assert.equal(candidate.guards.candidate_productive,true);
assert.equal(candidate.guards.candidate_curriculum_mapped,false);
assert.deepEqual(candidate.productivity.productive_realizations,['VALI KE','PARAZAMI KE']);
assert.equal(candidate.productivity.arbitrary_activity_lexeme_extension,false);
assert.equal(candidate.shell_composition.examples_productive,true);
assert.equal(candidate.lexical_anchors[0].lexical_authority,'FROZEN');
assert.equal(candidate.lexical_anchors[1].lexical_authority,'WATCH');

assert.equal(allowlist.status,'ACTIVE_ONE_VALIDATED_PRODUCTIVE_MEMBER_NONRUNTIME');
assert.equal(allowlist.authorized_payload_count,1);
assert.equal(allowlist.members.length,1);
assert.equal(allowlist.members[0].productive,true);
assert.deepEqual(allowlist.members[0].productive_realizations,['VALI KE','PARAZAMI KE']);
assert.equal(allowlist.guards.productivity_promoted,true);
assert.equal(allowlist.guards.curriculum_mapped,false);

assert.equal(promotionGate.status,'APPROVED_ALL_SCOPED_PRODUCTIVITY_AND_GOVERNANCE_DECISIONS');
assert.ok(promotionGate.decisions.every(x=>x.decision==='APPROVED'));
assert.ok(promotionGate.governance_decisions.every(x=>x.decision==='APPROVED'));
assert.equal(promotionGate.checks.candidate_productive,true);
assert.equal(promotionGate.checks.candidate_curriculum_mapped,false);
assert.equal(promotionTransition.status,'APPLIED_EXACT_SCOPED_PRODUCTIVITY_ONLY_NO_MAPPING_NO_OPI_QA_NO_RUNTIME');
assert.deepEqual(promotionTransition.productivity_result.productive_realizations,['VALI KE','PARAZAMI KE']);

assert.equal(mappingReview.status,'READY_FOR_HUMAN_REVIEW_STRATEGY_ONLY_NO_MAPPING_NO_OPI_AUTHORING_NO_QA_NO_RUNTIME');
assert.equal(mappingReview.recommended_route,'MAP_TO_L03_OPI_FOUNDATIONAL_INTERROGATIVE_FIRST');
assert.equal(mappingReview.current_state.productive,true);
assert.equal(mappingReview.current_state.curriculum_mapped,false);

assert.equal(mappingGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.ok(mappingGate.strategy_decisions.every(x=>x.decision==='PENDING'));
assert.ok(mappingGate.governance_decisions.every(x=>x.decision==='PENDING'));
assert.equal(mappingGate.checks.candidate_productive,true);
assert.equal(mappingGate.checks.candidate_curriculum_mapped,false);

assert.equal(workstream.status,'ACTIVE_AWAITING_FIRST_PAYLOAD_CURRICULUM_MAPPING_STRATEGY_DECISION');
assert.equal(workstream.active_gate,mappingGate.batch_id);
assert.equal(workstream.first_payload_candidate.productive,true);
assert.equal(workstream.first_payload_candidate.curriculum_mapped,false);
assert.equal(workstream.independent_pending_gates_not_superseded[0].consumed_by_this_workstream,false);

assert.deepEqual(manifest.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(manifest.rules.OPI_unlocked,false);
assert.equal(manifest.rules.QA_unlocked,false);
assert.equal(manifest.rules.STR003_STR005_unlocked,false);

console.log('PASS SWHNK-L03-BINAH-FIRST-PAYLOAD-SCOPED-PRODUCTIVE-MAPPING-STRATEGY-PENDING-V138');
