import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const contract=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-pedagogy-source-contract.v1.json');
const batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract-human-batch.v1.json');

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
assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,8);
assert.equal(batch.checks.teachable_source_assets,16);
assert.equal(batch.checks.opi_intents,10);
assert.equal(batch.checks.HNK_sentences_authored,0);
assert.equal(batch.projected_effect_if_all_approved.curriculum_slots_implemented,0);
assert.equal(batch.projected_effect_if_all_approved.next_gate,'PREPARE_L02_OPI_PATTERN_REVIEW');

assert.equal(manifest.status,'SOURCE_TEACHABILITY_COMPLETE_PEDAGOGY_SOURCE_CONTRACT_REVIEW_PENDING');
assert.equal(manifest.pedagogy.opi_intents_drafted,10);
assert.equal(manifest.pedagogy.opi_sentence_patterns,0);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,0);
assert.equal(manifest.rules.intent_approval_does_not_create_sentence_grammar,true);
assert.equal(manifest.next_gate,'SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-V1');
console.log('L02 has 16 teachable source assets and 10 communicative intents, but sentence-pattern authoring remains gated and 0 curriculum slots are implemented.');
