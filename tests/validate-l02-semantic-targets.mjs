import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const audit=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-source-lock-audit.v1.json');
const matrix=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-semantic-curriculum-targets.v1.json');
const batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets-human-batch.v1.json');

assert.equal(audit.status,'AUDITED_PEDAGOGY_HOLD');
assert.equal(audit.source_inventory.recovered_lexemes,11);
assert.equal(audit.coverage.proxy_gap,5);

assert.equal(matrix.matrix_id,'SWHNK-L02-CHOKHMAH-SEMANTIC-CURRICULUM-TARGETS-V1');
assert.equal(matrix.status,'DRAFT_SEMANTICS_ONLY_FORM_MAPPING_NOT_APPLIED');
assert.equal(matrix.principle,'SEMANTICS_BEFORE_FORM_AND_REUSE_BEFORE_INVENTION');
assert.equal(matrix.vocabulary_target,16);
assert.equal(matrix.recovered_asset_count,11);
assert.equal(matrix.recovered_phrase_count,0);
assert.equal(matrix.recovered_semantic_matrix.length,11);
assert.equal(matrix.semantic_targets.length,5);
assert.deepEqual(matrix.semantic_targets.map(x=>x.semantic_key),['FIRST_PERSON_REFERENT','SECOND_PERSON_REFERENT','LOCATION_INTERROGATIVE','CONTENT_SELECTOR','QUESTION_OPERATOR']);
assert.ok(matrix.semantic_targets.every(x=>x.form_selected===null));
assert.ok(matrix.semantic_targets.every(x=>x.historical_form_meaning_claim===false));
assert.deepEqual(matrix.semantic_targets.map(x=>x.available_governed_candidate.form),['AN','EN','KUVAN','KU','KE']);
assert.ok(matrix.semantic_targets.every(x=>x.available_governed_candidate.authority==='CANDIDATE'));
assert.ok(matrix.semantic_targets.every(x=>x.available_governed_candidate.mapping_status==='AVAILABLE_FOR_LATER_REBIND_REVIEW_NOT_APPLIED'));
assert.equal(matrix.mapping_summary.semantic_targets,5);
assert.equal(matrix.mapping_summary.forms_selected,0);
assert.equal(matrix.mapping_summary.new_surface_forms_created,0);
assert.equal(matrix.mapping_summary.new_language_assets_created,0);
assert.equal(matrix.mapping_summary.candidate_rebinds_suggested,5);
assert.equal(matrix.mapping_summary.authority_promotions,0);
assert.match(matrix.gap_analysis.interpretation,/not treated as a command to invent five thematic nouns/i);
assert.match(matrix.boundaries.join(' '),/VANI and VANUVALI remain unresolved/);
assert.match(matrix.boundaries.join(' '),/Numerology does not select forms or meanings/);

assert.equal(batch.batch_id,'SWHNK-L02-SEMANTIC-TARGETS-HUMAN-BATCH-V1');
assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,8);
assert.equal(batch.checks.recovered_assets,11);
assert.equal(batch.checks.semantic_targets,5);
assert.equal(batch.checks.forms_selected,0);
assert.equal(batch.checks.new_surface_forms_created,0);
assert.equal(batch.checks.new_language_assets_created,0);
assert.equal(batch.checks.authority_promotions,0);
assert.equal(batch.projected_effect_if_all_approved.semantic_targets_approved,5);
assert.deepEqual(batch.projected_effect_if_all_approved.next_mapping_candidates,['AN','EN','KUVAN','KU','KE']);

assert.equal(manifest.lesson_id,'HNK-L02');
assert.equal(manifest.pedagogy.authoring_hold,true);
assert.equal(manifest.rules.non_invention,true);

console.log('PASS SWHNK-L02-SEMANTIC-TARGETS-V1');
console.log('L02: 11 recovered assets + 5 semantics-first communicative targets; exact forms remain unselected and pedagogy remains HOLD.');
