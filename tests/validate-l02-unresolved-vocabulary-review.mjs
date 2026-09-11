import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-unresolved-vocabulary-review.v1.json');
const batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-unresolved-vocabulary-human-batch.v1.json');
const rebindTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-exact-rebind-mapping.applied-transition.v1.json');

assert.equal(rebindTransition.status,'APPLIED');
assert.equal(rebindTransition.after.L02_governed_language_assets,16);
assert.equal(manifest.status,'SEMANTIC_TARGETS_APPROVED_EXACT_REBINDS_APPLIED_PEDAGOGY_HOLD');
assert.equal(manifest.language_bindings.governed_total,16);
assert.equal(manifest.teachability.semantic_teachable_assets,14);
assert.equal(manifest.teachability.unresolved_assets,2);
assert.equal(manifest.teachability.remaining_teachable_gap,2);
assert.deepEqual(manifest.unresolved_source_forms.map(x=>x.form),['VANUVALI','VANI']);
assert.equal(manifest.next_gate,'SWHNK-L02-UNRESOLVED-VOCABULARY-HUMAN-BATCH-V1');

assert.equal(review.review_id,'SWHNK-L02-UNRESOLVED-VOCABULARY-REVIEW-V1');
assert.equal(review.status,'READY_FOR_HUMAN_POLICY_REVIEW_NOT_APPLIED');
assert.equal(review.current_state.semantic_teachable_assets,14);
assert.equal(review.current_state.remaining_teachable_gap,2);
assert.deepEqual(review.recommended_rebinds.map(x=>x.form),['VALIVAN','PARAZAMO']);
assert.ok(review.recommended_rebinds.every(x=>x.authority_promotion===false));
assert.equal(review.projected_teachability_if_approved.semantic_teachable_assets,16);
assert.equal(review.projected_teachability_if_approved.remaining_teachable_gap,0);
assert.equal(review.projected_teachability_if_approved.new_surface_forms_created,0);

assert.equal(batch.batch_id,'SWHNK-L02-UNRESOLVED-VOCABULARY-HUMAN-BATCH-V1');
assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,7);
assert.deepEqual(batch.checks.recommended_forms,['VALIVAN','PARAZAMO']);
assert.equal(batch.checks.current_semantic_teachable_assets,14);
assert.equal(batch.checks.current_unresolved_assets,2);
assert.equal(batch.projected_effect_if_all_approved.semantic_teachable_assets,16);
assert.equal(batch.projected_effect_if_all_approved.remaining_teachable_gap,0);
assert.equal(batch.projected_effect_if_all_approved.curriculum_slots_implemented,0);
assert.equal(batch.projected_effect_if_all_approved.pedagogy_authoring_hold,true);

console.log('PASS SWHNK-L02-UNRESOLVED-VOCABULARY-REVIEW-V1');
console.log('L02 has 16 governed assets but only 14 semantically teachable; VALIVAN/PARAZAMO are the pending FROZEN rebind recommendation, while VANI/VANUVALI remain unresolved evidence.');
