import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-unresolved-vocabulary-review.v1.json');
const batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-unresolved-vocabulary-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-unresolved-vocabulary.applied-transition.v1.json');

assert.equal(review.review_id,'SWHNK-L02-UNRESOLVED-VOCABULARY-REVIEW-V1');
assert.deepEqual(review.recommended_rebinds.map(x=>x.form),['VALIVAN','PARAZAMO']);
assert.ok(review.recommended_rebinds.every(x=>x.authority_promotion===false));

assert.equal(batch.batch_id,'SWHNK-L02-UNRESOLVED-VOCABULARY-HUMAN-BATCH-V1');
assert.equal(batch.status,'APPROVED_ALL_DECISIONS');
assert.equal(batch.decisions_requested.length,7);
assert.ok(batch.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.deepEqual(batch.approved_effect.rebind_refs,['LEX-003','LEX-004']);
assert.equal(batch.approved_effect.semantic_teachable_assets,16);
assert.equal(batch.approved_effect.remaining_teachable_gap,0);
assert.equal(batch.approved_effect.curriculum_slots_implemented,0);

assert.equal(transition.status,'APPLIED');
assert.deepEqual(transition.rebinds.map(x=>x.form),['VALIVAN','PARAZAMO']);
assert.equal(transition.after.L02_governed_source_references,18);
assert.equal(transition.after.L02_semantic_teachable_assets,16);
assert.equal(transition.after.L02_unresolved_source_observations,2);
assert.equal(transition.after.remaining_teachable_gap,0);
assert.equal(transition.non_effects.curriculum_slots_implemented,0);

assert.equal(manifest.status,'SOURCE_TEACHABILITY_COMPLETE_PEDAGOGY_SOURCE_CONTRACT_REVIEW_PENDING');
assert.equal(manifest.teachability.governed_source_references,18);
assert.equal(manifest.teachability.semantic_teachable_assets,16);
assert.equal(manifest.teachability.unresolved_source_observations,2);
assert.equal(manifest.teachability.remaining_teachable_gap,0);
assert.deepEqual(manifest.teachability.teachable_rebinds,['VALIVAN','PARAZAMO']);
assert.deepEqual(manifest.unresolved_source_forms.map(x=>x.form),['VANUVALI','VANI']);
assert.ok(manifest.unresolved_source_forms.every(x=>x.teachable===false));
assert.equal(manifest.pedagogy.curriculum_slots_implemented,0);
assert.equal(manifest.next_gate,'SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-UNRESOLVED-VOCABULARY-APPLIED-V1');
console.log('L02 preserves VANI/VANUVALI as unresolved evidence and reaches 16/16 teachable source assets via FROZEN VALIVAN/PARAZAMO rebinds, with zero curriculum slots implemented.');
