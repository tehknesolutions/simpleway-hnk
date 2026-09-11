import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const matrix=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-semantic-curriculum-targets.v1.json');
const semanticBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets-human-batch.v1.json');
const semanticTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets.approved-transition.v1.json');
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-exact-rebind-mapping-review.v1.json');
const mappingBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-exact-rebind-mapping-human-batch.v1.json');
const mappingTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-exact-rebind-mapping.applied-transition.v1.json');

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
assert.equal(review.proposed_rebinds.length,5);
assert.deepEqual(review.proposed_rebinds.map(x=>x.form),['AN','EN','KUVAN','KU','KE']);
assert.ok(review.proposed_rebinds.every(x=>x.authority==='CANDIDATE'));
assert.ok(review.proposed_rebinds.every(x=>x.mapping_action==='EXTEND_CURRICULUM_SCOPE_ONLY'));
assert.ok(review.proposed_rebinds.every(x=>x.authority_promotion===false));

assert.equal(mappingBatch.batch_id,'SWHNK-L02-EXACT-REBIND-MAPPING-HUMAN-BATCH-V1');
assert.equal(mappingBatch.status,'APPROVED_ALL_DECISIONS');
assert.equal(mappingBatch.decisions_requested.length,8);
assert.ok(mappingBatch.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(mappingBatch.approved_effect.registry_entries_to_change,5);
assert.equal(mappingBatch.approved_effect.registry_change_type,'LESSON_SCOPE_EXTENSION_ONLY');
assert.equal(mappingBatch.approved_effect.new_surface_forms_created,0);
assert.equal(mappingBatch.approved_effect.authority_promotions,0);

assert.equal(mappingTransition.transition_id,'SWHNK-L02-EXACT-REBIND-MAPPING-APPLIED-V1');
assert.equal(mappingTransition.status,'APPLIED');
assert.equal(mappingTransition.scope_extensions.length,5);
assert.deepEqual(mappingTransition.scope_extensions.map(x=>x.form),['KUVAN','AN','EN','KU','KE']);
assert.equal(mappingTransition.after.L02_recovered_lexemes,11);
assert.equal(mappingTransition.after.L02_authored_candidates_scoped,5);
assert.equal(mappingTransition.after.L02_governed_language_assets,16);
assert.equal(mappingTransition.non_effects.new_surface_forms_created,0);
assert.equal(mappingTransition.non_effects.authority_promotions,0);
assert.equal(mappingTransition.non_effects.curriculum_slots_implemented,0);

assert.equal(manifest.status,'SEMANTIC_TARGETS_APPROVED_EXACT_REBINDS_APPLIED_PEDAGOGY_HOLD');
assert.equal(manifest.semantic_gap.approved,5);
assert.equal(manifest.semantic_gap.forms_selected,5);
assert.equal(manifest.semantic_gap.scoped_rebinds_applied,5);
assert.deepEqual(manifest.semantic_gap.mapped_forms,['AN','EN','KUVAN','KU','KE']);
assert.equal(manifest.language_bindings.governed_total,16);
assert.equal(manifest.teachability.semantic_teachable_assets,14);
assert.equal(manifest.teachability.unresolved_assets,2);
assert.equal(manifest.teachability.remaining_teachable_gap,2);
assert.equal(manifest.pedagogy.authoring_hold,true);
assert.equal(manifest.rules.scope_binding_is_not_pedagogy_validation,true);
assert.equal(manifest.next_gate,'SWHNK-L02-UNRESOLVED-VOCABULARY-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-EXACT-REBIND-APPLIED-V1');
console.log('L02 reuses AN/EN/KUVAN/KU/KE as scoped CANDIDATE bindings; 16 governed assets exist, 14 are currently semantically teachable, and pedagogy remains HOLD.');
