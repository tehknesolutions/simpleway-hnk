import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const audit=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-source-lock-audit.v1.json');
const matrix=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-semantic-curriculum-targets.v1.json');
const batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets.approved-transition.v1.json');

assert.equal(audit.status,'AUDITED_PEDAGOGY_HOLD');
assert.equal(audit.source_inventory.recovered_lexemes,11);
assert.equal(audit.coverage.proxy_gap,5);

assert.equal(matrix.matrix_id,'SWHNK-L02-CHOKHMAH-SEMANTIC-CURRICULUM-TARGETS-V1');
assert.equal(matrix.status,'SEMANTIC_TARGETS_APPROVED_FORM_MAPPING_PENDING');
assert.equal(matrix.principle,'SEMANTICS_BEFORE_FORM_AND_REUSE_BEFORE_INVENTION');
assert.equal(matrix.vocabulary_target,16);
assert.equal(matrix.recovered_asset_count,11);
assert.equal(matrix.recovered_phrase_count,0);
assert.equal(matrix.recovered_semantic_matrix.length,11);
assert.equal(matrix.semantic_targets.length,5);
assert.deepEqual(matrix.semantic_targets.map(x=>x.semantic_key),['FIRST_PERSON_REFERENT','SECOND_PERSON_REFERENT','LOCATION_INTERROGATIVE','CONTENT_SELECTOR','QUESTION_OPERATOR']);
assert.ok(matrix.semantic_targets.every(x=>x.semantic_approval==='APPROVED'));
assert.ok(matrix.semantic_targets.every(x=>x.form_selected===null));
assert.ok(matrix.semantic_targets.every(x=>x.historical_form_meaning_claim===false));
assert.deepEqual(matrix.semantic_targets.map(x=>x.available_governed_candidate.form),['AN','EN','KUVAN','KU','KE']);
assert.ok(matrix.semantic_targets.every(x=>x.available_governed_candidate.authority==='CANDIDATE'));
assert.ok(matrix.semantic_targets.every(x=>x.available_governed_candidate.mapping_status==='READY_FOR_EXACT_REBIND_REVIEW_NOT_APPLIED'));
assert.equal(matrix.mapping_summary.semantic_targets,5);
assert.equal(matrix.mapping_summary.semantic_targets_approved,5);
assert.equal(matrix.mapping_summary.forms_selected,0);
assert.equal(matrix.mapping_summary.new_surface_forms_created,0);
assert.equal(matrix.mapping_summary.new_language_assets_created,0);
assert.equal(matrix.mapping_summary.candidate_rebinds_suggested,5);
assert.equal(matrix.mapping_summary.authority_promotions,0);
assert.match(matrix.gap_analysis.interpretation,/not treated as a command to invent five thematic nouns/i);
assert.match(matrix.boundaries.join(' '),/VANI and VANUVALI remain unresolved/);
assert.match(matrix.boundaries.join(' '),/Numerology does not select forms or meanings/);

assert.equal(batch.batch_id,'SWHNK-L02-SEMANTIC-TARGETS-HUMAN-BATCH-V1');
assert.equal(batch.status,'APPROVED_ALL_DECISIONS_APPLIED_TO_SEMANTICS_ONLY');
assert.ok(batch.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(batch.checks.semantic_targets_approved,5);
assert.equal(batch.checks.forms_selected,0);
assert.equal(batch.checks.new_surface_forms_created,0);
assert.equal(batch.checks.new_language_assets_created,0);
assert.equal(batch.checks.authority_promotions,0);
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.semantic_targets_approved,5);
assert.equal(transition.after.forms_selected,0);
assert.equal(transition.after.rebinds_applied,0);

assert.equal(manifest.lesson_id,'HNK-L02');
assert.equal(manifest.status,'SEMANTIC_TARGETS_APPROVED_REBIND_REVIEW_PENDING_PEDAGOGY_HOLD');
assert.equal(manifest.semantic_gap.approved,5);
assert.equal(manifest.semantic_gap.forms_selected,0);
assert.equal(manifest.semantic_gap.scoped_rebinds_applied,0);
assert.equal(manifest.pedagogy.authoring_hold,true);
assert.equal(manifest.rules.non_invention,true);

console.log('PASS SWHNK-L02-SEMANTIC-TARGETS-V2');
console.log('L02: five communicative semantics APPROVED; exact forms remain unselected, rebinds unapplied and pedagogy remains HOLD.');
