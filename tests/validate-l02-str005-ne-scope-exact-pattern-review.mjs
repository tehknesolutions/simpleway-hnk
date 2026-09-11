import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-str005-ne-scope-exact-pattern-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-ne-scope-exact-pattern-human-batch.v1.json');
const validationGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-15-validation-human-batch.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V57.json');

assert.equal(review.review_id,'SWHNK-L02-STR005-NE-SCOPE-EXACT-PATTERN-REVIEW-V1');
assert.equal(review.status,'READY_FOR_HUMAN_REVIEW_NOT_APPLIED');
assert.equal(review.pattern_candidates.length,2);
assert.equal(review.scope_extension_candidate.form,'NE');
assert.equal(review.scope_extension_candidate.status,'PROPOSED_NOT_APPLIED');
assert.equal(review.selection_status.exact_pattern_selected,null);
assert.equal(review.selection_status.NE_L02_scope_extension_applied,false);
assert.equal(review.selection_status.STR005_approved_form,null);
const a=review.pattern_candidates.find(x=>x.id==='L02-STR005-PAT-A');
const b=review.pattern_candidates.find(x=>x.id==='L02-STR005-PAT-B');
assert.equal(a.canonical_fit,'INSUFFICIENT_BY_ITSELF_FOR_I_DIDNT');
assert.equal(b.frame,'PA + AN + NE + PREDICATE');
assert.ok(b.boundary.includes("PA remains lexical 'ontem' only"));
assert.equal(review.checks.exact_pattern_selected,0);
assert.equal(review.checks.NE_scope_extension_applied,0);
assert.equal(review.checks.STR005_AUTHORED,0);
assert.equal(review.checks.STR005_VALIDATED,0);

assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.decisions_requested.length,12);
assert.equal(gate.checks.exact_pattern_selected_before_gate,0);
assert.equal(gate.checks.NE_scope_extension_applied_before_gate,0);
assert.equal(gate.projected_effect_if_all_approved.selected_pattern,'L02-STR005-PAT-B');
assert.equal(gate.projected_effect_if_all_approved.STR005_AUTHORED,0);
assert.equal(gate.projected_effect_if_all_approved.SQS15_VALIDATED,0);
assert.equal(validationGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(manifest.pedagogy.sqs15_validation_deferred,true);
assert.equal(manifest.next_gate,'SWHNK-L02-STR005-NE-SCOPE-EXACT-PATTERN-HUMAN-BATCH-V1');
assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V57');
assert.deepEqual(snapshot.implementation,{MISSING:828,AUTHORED:15,VALIDATED:165,FROZEN:0});
assert.equal(snapshot.L02_STR005_pattern_review.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snapshot.L02_SQS15_validation.status,'PREPARED_DEFERRED_NOT_ACTIVE');

console.log('PASS SWHNK-L02-STR005-NE-SCOPE-EXACT-PATTERN-REVIEW-V1');
console.log('Two STR005 candidates are review-only, NE scope remains unapplied, no exact pattern is selected, and SQS15 validation stays deferred behind the sole active human gate.');
