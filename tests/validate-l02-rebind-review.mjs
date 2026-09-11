import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const matrix=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-semantic-curriculum-targets.v1.json');
const semanticBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets-human-batch.v1.json');
const semanticTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets.approved-transition.v1.json');
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-exact-rebind-mapping-review.v1.json');
const mappingBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-exact-rebind-mapping-human-batch.v1.json');

assert.equal(semanticBatch.status,'APPROVED_ALL_DECISIONS_APPLIED_TO_SEMANTICS_ONLY');
assert.equal(semanticBatch.checks.semantic_targets_approved,5);
assert.equal(semanticBatch.checks.forms_selected,0);
assert.equal(semanticTransition.status,'APPLIED');
assert.deepEqual(semanticTransition.after,{semantic_targets_drafted:5,semantic_targets_approved:5,forms_selected:0,rebinds_applied:0});

assert.equal(matrix.status,'SEMANTIC_TARGETS_APPROVED_FORM_MAPPING_PENDING');
assert.equal(matrix.mapping_summary.semantic_targets_approved,5);
assert.equal(matrix.mapping_summary.forms_selected,0);
assert.ok(matrix.semantic_targets.every(x=>x.semantic_approval==='APPROVED'));
assert.ok(matrix.semantic_targets.every(x=>x.form_selected===null));
assert.deepEqual(matrix.mapping_summary.suggested_forms,['AN','EN','KUVAN','KU','KE']);

assert.equal(review.review_id,'SWHNK-L02-EXACT-REBIND-MAPPING-V1');
assert.equal(review.status,'READY_FOR_HUMAN_REBIND_REVIEW_NOT_APPLIED');
assert.equal(review.proposed_rebinds.length,5);
assert.deepEqual(review.proposed_rebinds.map(x=>x.form),['AN','EN','KUVAN','KU','KE']);
assert.ok(review.proposed_rebinds.every(x=>x.authority==='CANDIDATE'));
assert.ok(review.proposed_rebinds.every(x=>x.mapping_action==='EXTEND_CURRICULUM_SCOPE_ONLY'));
assert.ok(review.proposed_rebinds.every(x=>x.authority_promotion===false));
assert.equal(review.checks.registry_changes_applied,0);
assert.equal(review.checks.L02_curriculum_slots_implemented,0);

assert.equal(mappingBatch.batch_id,'SWHNK-L02-EXACT-REBIND-MAPPING-HUMAN-BATCH-V1');
assert.equal(mappingBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(mappingBatch.decisions_requested.length,8);
assert.equal(mappingBatch.checks.registry_changes_applied,0);
assert.equal(mappingBatch.checks.L02_curriculum_slots_implemented,0);
assert.equal(mappingBatch.projected_effect_if_all_approved.registry_entries_changed,5);
assert.equal(mappingBatch.projected_effect_if_all_approved.registry_change_type,'LESSON_SCOPE_EXTENSION_ONLY');
assert.equal(mappingBatch.projected_effect_if_all_approved.new_surface_forms_created,0);
assert.equal(mappingBatch.projected_effect_if_all_approved.authority_promotions,0);

assert.equal(manifest.status,'SEMANTIC_TARGETS_APPROVED_REBIND_REVIEW_PENDING_PEDAGOGY_HOLD');
assert.equal(manifest.semantic_gap.approved,5);
assert.equal(manifest.semantic_gap.forms_selected,0);
assert.equal(manifest.semantic_gap.scoped_rebinds_applied,0);
assert.equal(manifest.pedagogy.authoring_hold,true);
assert.equal(manifest.rules.semantic_approval_does_not_apply_form_mapping,true);
assert.equal(manifest.next_gate,'SWHNK-L02-EXACT-REBIND-MAPPING-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-EXACT-REBIND-REVIEW-V1');
console.log('L02 semantics are approved; AN/EN/KUVAN/KU/KE remain proposed CANDIDATE rebinds only, with 0 registry changes and pedagogy HOLD.');
