import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-str005-ne-scope-exact-pattern-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-ne-scope-exact-pattern-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-ne-scope-exact-pattern.approved-transition.v1.json');
const authorGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-authoring-human-batch.v1.json');
const validationGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-15-validation-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V58.json');

assert.equal(review.review_id,'SWHNK-L02-STR005-NE-SCOPE-EXACT-PATTERN-REVIEW-V1');
assert.equal(review.pattern_candidates.length,2);
const a=review.pattern_candidates.find(x=>x.id==='L02-STR005-PAT-A');
const b=review.pattern_candidates.find(x=>x.id==='L02-STR005-PAT-B');
assert.equal(a.canonical_fit,'INSUFFICIENT_BY_ITSELF_FOR_I_DIDNT');
assert.equal(b.frame,'PA + AN + NE + PREDICATE');
assert.ok(b.boundary.includes("PA remains lexical 'ontem' only"));

assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.decisions_requested.length,12);
assert.ok(gate.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(gate.approved_effect.NE_L02_scope_extension_applied,1);
assert.equal(gate.approved_effect.selected_pattern,'L02-STR005-PAT-B');
assert.equal(gate.approved_effect.STR005_AUTHORED,0);
assert.equal(gate.approved_effect.SQS15_VALIDATED,0);

assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.NE_L02_scope_extension_applied,1);
assert.equal(transition.after.exact_pattern_selected,'L02-STR005-PAT-B');
assert.equal(transition.after.STR005_AUTHORED,0);
assert.equal(transition.after.STR005_VALIDATED,0);
assert.equal(transition.after.SQS15_VALIDATED,0);
assert.equal(transition.scope_application.PA.generic_past_marker,false);
assert.equal(transition.non_effects.DID_auxiliary_created,false);
assert.equal(transition.non_effects.authority_promotions,0);

assert.equal(authorGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(authorGate.slot,'L02-STR-005');
assert.equal(authorGate.selected_pattern_ref,'L02-STR005-PAT-B');
assert.equal(authorGate.proposed_first_example.hnk,'PA AN NE VALI');
assert.equal(authorGate.checks.STR005_AUTHORED_before_gate,0);
assert.equal(authorGate.checks.STR005_VALIDATED_before_gate,0);
assert.equal(authorGate.checks.SQS15_VALIDATED_before_gate,0);

assert.equal(validationGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(manifest.pedagogy.STR005_exact_pattern_selected,1);
assert.equal(manifest.pedagogy.STR005_selected_pattern,'L02-STR005-PAT-B');
assert.equal(manifest.pedagogy.NE_L02_scope_extension_applied,1);
assert.equal(manifest.pedagogy.STR005_state,'MISSING_AUTHORING_GATE_REQUIRED');
assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,15);
assert.equal(manifest.pedagogy.story_qa_structure_slots_validated,0);
assert.equal(manifest.next_gate,'SWHNK-L02-STR005-AUTHORING-HUMAN-BATCH-V1');
assert.equal(manifest.deferred_gate,'SWHNK-L02-SQS-15-VALIDATION-HUMAN-BATCH-V1');

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V58');
assert.equal(snapshot.package,'simpleway-hnk@0.61.0');
assert.deepEqual(snapshot.implementation,{MISSING:828,AUTHORED:15,VALIDATED:165,FROZEN:0});
assert.equal(snapshot.L02_STR005_pattern_approval.selected_pattern,'L02-STR005-PAT-B');
assert.equal(snapshot.L02_STR005_authoring.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snapshot.L02_SQS15_validation.status,'PREPARED_DEFERRED_NOT_ACTIVE');

console.log('PASS SWHNK-L02-STR005-PATTERN-APPROVED-V58');
console.log('NE is extended only for scoped STR005 use, PAT-B is selected only as a lexical-yesterday course frame, STR005 remains missing, and SQS15 validation remains deferred.');
