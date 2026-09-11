import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const contract=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-pedagogy-source-contract.v1.json');
const approval=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract.approved-transition.v1.json');
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-opi-pattern-review.v1.json');
const batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review-human-batch.v1.json');

assert.equal(approval.status,'APPROVED_ALL_DECISIONS');
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.opi_intents_approved,10);
assert.equal(contract.checks.teachable_source_assets,16);
assert.equal(contract.checks.opi_intents,10);
assert.equal(review.review_id,'SWHNK-L02-OPI-PATTERN-REVIEW-V1');
assert.equal(review.status,'READY_FOR_HUMAN_PATTERN_REVIEW_NOT_APPLIED');
assert.equal(review.patterns.length,10);
assert.equal(review.checks.curriculum_OPI_authored,0);
assert.equal(review.checks.curriculum_OPI_validated,0);
assert.equal(review.checks.new_surface_forms_created,0);
assert.equal(review.checks.authority_promotions,0);
assert.equal(review.patterns.filter(x=>x.evidence_class==='DIRECT_REUSE_VALIDATED').length,1);
assert.equal(review.patterns.find(x=>x.id==='L02-OPI-PAT-002').hnk_candidate,'EN VALI KUVAN KE');
assert.equal(review.patterns.find(x=>x.id==='L02-OPI-PAT-008').risk,'VERY_HIGH');
assert.equal(review.glyph_policy.status,'STRUCTURAL_SEGMENTATION_REQUIRED_AFTER_PATTERN_APPROVAL_BEFORE_OPI_AUTHORING');
assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,13);
assert.equal(batch.projected_effect_if_all_approved.curriculum_OPI_authored,0);
assert.equal(manifest.status,'PEDAGOGY_SOURCE_APPROVED_OPI_PATTERN_REVIEW_PENDING');
assert.equal(manifest.pedagogy.opi_pattern_candidates,10);
assert.equal(manifest.pedagogy.opi_patterns_approved,0);
assert.equal(manifest.pedagogy.curriculum_OPI_authored,0);
assert.equal(manifest.next_gate,'SWHNK-L02-OPI-PATTERN-REVIEW-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-OPI-PATTERN-REVIEW-V1');
console.log('L02 has 10 evidence-ranked OPI pattern candidates, 0 approved patterns and 0 authored curriculum OPI slots.');
