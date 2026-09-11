import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const contract=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-pedagogy-source-contract.v1.json');
const batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract.approved-transition.v1.json');
const patternBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review-human-batch.v1.json');

assert.equal(contract.contract_id,'SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-V1');
assert.equal(contract.status,'READY_FOR_HUMAN_REVIEW_NO_SENTENCE_AUTHORING_YET');
assert.equal(contract.teachable_source_set.length,16);
assert.equal(contract.opi_intent_targets.length,10);
assert.equal(contract.checks.HNK_sentences_authored,0);
assert.equal(contract.checks.new_surface_forms_created,0);
assert.equal(contract.checks.authority_promotions,0);
assert.deepEqual(contract.excluded_source_observations.map(x=>x.form),['VANUVALI','VANI']);
assert.equal(contract.sentence_pattern_policy.status,'NOT_AUTHORIZED_YET');

assert.equal(batch.batch_id,'SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-HUMAN-BATCH-V1');
assert.equal(batch.status,'APPROVED_ALL_DECISIONS');
assert.equal(batch.decisions_requested.length,8);
assert.ok(batch.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(batch.approved_effect.teachable_source_assets,16);
assert.equal(batch.approved_effect.opi_intents_approved,10);
assert.equal(batch.approved_effect.sentence_patterns_approved,0);
assert.equal(batch.approved_effect.HNK_sentences_authored,0);
assert.equal(batch.approved_effect.curriculum_slots_implemented,0);

assert.equal(transition.transition_id,'SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-APPROVED-V1');
assert.equal(transition.status,'APPLIED');
assert.deepEqual(transition.after,{teachable_source_assets:16,opi_intents_approved:10,sentence_patterns_approved:0,HNK_sentences_authored:0,curriculum_slots_implemented:0});
assert.equal(transition.boundaries.authority_promotions,0);
assert.equal(transition.boundaries.universal_grammar_claims,0);

assert.equal(manifest.status,'PEDAGOGY_SOURCE_APPROVED_OPI_PATTERN_REVIEW_PENDING');
assert.equal(manifest.pedagogy.source_contract_approved,true);
assert.equal(manifest.pedagogy.opi_intents_approved,10);
assert.equal(manifest.pedagogy.opi_pattern_candidates,10);
assert.equal(manifest.pedagogy.opi_patterns_approved,0);
assert.equal(manifest.pedagogy.curriculum_OPI_authored,0);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,0);
assert.equal(manifest.pedagogy.authoring_hold,true);
assert.equal(manifest.next_gate,'SWHNK-L02-OPI-PATTERN-REVIEW-HUMAN-BATCH-V1');

assert.equal(patternBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');

console.log('PASS SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-APPROVED-V1');
console.log('L02 has 16 approved teachable source assets and 10 approved communicative intents; OPI pattern review remains pending, with 0 authored curriculum slots.');
