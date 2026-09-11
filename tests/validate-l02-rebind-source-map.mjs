import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const semanticBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets-human-batch.v1.json');
const semanticTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets.approved-transition.v1.json');
const rebind=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-exact-rebind-mapping.v1.json');
const sourceMap=await json('curriculum/cycle-01/L02-chokhmah/authoring/vocabulary-source-map.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');

assert.equal(semanticBatch.status,'APPROVED_ALL_DECISIONS_APPLIED_TO_SEMANTICS_ONLY');
assert.ok(semanticBatch.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(semanticTransition.status,'APPLIED');
assert.equal(semanticTransition.after.semantic_targets_approved,5);
assert.equal(rebind.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_REUSE');
assert.equal(rebind.mappings.length,5);
assert.deepEqual(rebind.mappings.map(x=>x.form),['AN','EN','KUVAN','KU','KE']);
assert.ok(rebind.mappings.every(x=>x.source_authority==='CANDIDATE'));
assert.ok(rebind.mappings.every(x=>x.authority_promotion===false));
assert.equal(rebind.checks.new_surface_forms_created,0);
assert.equal(rebind.checks.new_language_assets_created,0);

assert.equal(sourceMap.status,'SOURCE_BOUND_16_OF_16_WITH_2_SEMANTIC_HOLDS');
assert.equal(sourceMap.target,16);
assert.equal(sourceMap.entries.length,16);
assert.equal(sourceMap.metrics.source_bound,16);
assert.equal(sourceMap.metrics.semantically_ready,14);
assert.equal(sourceMap.metrics.semantic_hold,2);
assert.equal(sourceMap.metrics.recovered_assets,11);
assert.equal(sourceMap.metrics.scoped_rebinds,5);
assert.deepEqual(sourceMap.entries.filter(x=>x.teaching_state==='HOLD_UNRESOLVED_SEMANTICS').map(x=>x.form),['VANUVALI','VANI']);
assert.deepEqual(sourceMap.entries.slice(11).map(x=>x.form),['AN','EN','KUVAN','KU','KE']);
assert.ok(sourceMap.entries.slice(11).every(x=>x.source_class==='SCOPED_CURRICULUM_REBIND'));
assert.equal(sourceMap.metrics.authority_promotions,0);

assert.equal(manifest.status,'SEMANTIC_TARGETS_APPROVED_REBIND_APPLIED_VOCAB_SOURCE_BOUND_PEDAGOGY_HOLD');
assert.equal(manifest.semantic_gap.approved,5);
assert.equal(manifest.semantic_gap.forms_selected,5);
assert.equal(manifest.semantic_gap.scoped_rebinds_applied,5);
assert.equal(manifest.vocabulary_source_state.source_bound,16);
assert.equal(manifest.vocabulary_source_state.semantically_ready,14);
assert.equal(manifest.vocabulary_source_state.semantic_hold,2);
assert.equal(manifest.vocabulary_source_state.curriculum_validated,0);
assert.equal(manifest.pedagogy.authoring_hold,true);
assert.equal(manifest.rules.source_bound_is_not_validated,true);

console.log('PASS SWHNK-L02-REBIND-SOURCE-MAP-V1');
console.log('L02: five governed cross-lesson rebinds applied; 16/16 source-bound, 14 semantically ready, VANUVALI/VANI remain unresolved; zero authority promotions.');
