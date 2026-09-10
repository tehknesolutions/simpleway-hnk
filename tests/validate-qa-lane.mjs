import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const qa=await json('curriculum/cycle-01/L01-kether/authoring/qa-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/qa-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L01-kether/validation/qa.validated-transition.v1.json');
const story=await json('curriculum/cycle-01/L01-kether/authoring/story-lane.v1.json');
const storyBatch=await json('curriculum/cycle-01/L01-kether/validation/story-human-batch.v1.json');
const evidence=await json('progress/evidence-overrides.v1.json');

assert.equal(qa.lane_id,'SWHNK-L01-QA-AUTHORING-V1');
assert.equal(qa.status,'AUTHORED_4_OF_4_VALIDATION_PENDING');
assert.equal(qa.items.length,4);
assert.deepEqual(qa.items.map(x=>x.slot_id),['L01-QA-001','L01-QA-002','L01-QA-003','L01-QA-004']);
assert.equal(qa.metrics.new_HNK_lexical_forms,0);
assert.equal(qa.metrics.new_HNK_grammar_rules,0);
assert.equal(qa.source_contract.payload_historical_recovery_claim,false);

assert.equal(qa.items[0].question_hnk,'KALA YA EN ES KU KE');
assert.equal(qa.items[1].question_hnk,'EN KU SARASALA KE');
assert.deepEqual(qa.items[1].example_answers,['TOMI','DUVE TOMI','LUSO HOYU']);
assert.equal(qa.items[2].question_hnk,'EN SARADAYA KUVAN KE');
assert.equal(qa.items[3].question_hnk,'EN KU VAMAVALA KE');

assert.equal(batch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(batch.applied_effect.qa_VALIDATED,4);
assert.equal(batch.applied_effect.global_VALIDATED_after,96);
assert.equal(batch.applied_effect.new_HNK_lexical_forms,0);
assert.equal(batch.applied_effect.new_HNK_grammar_rules,0);
assert.equal(batch.applied_effect.language_authority_promotions,0);
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.VALIDATED,4);
assert.equal(transition.global_after.VALIDATED,96);
assert.equal(transition.authority_effect.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_QA_target,4);
assert.equal(v.L01_QA_authored,0);
assert.equal(v.L01_QA_validated,4);
assert.equal(v.L01_QA_authored_or_better,4);
assert.equal(v.prepared_QA_batch,null);

assert.equal(story.status,'AUTHORED_5_OF_5_VALIDATION_PENDING');
assert.equal(story.stories.length,5);
assert.equal(story.metrics.new_HNK_lexical_forms,0);
assert.equal(story.metrics.new_HNK_grammar_rules,0);
assert.equal(storyBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(storyBatch.projected_effect_if_all_approved.story_VALIDATED,5);

console.log('PASS SWHNK-L01-QA-LANE-V2');
console.log('4/4 Q&A VALIDATED; Story lane 5/5 AUTHORED pending validation; no new HNK lexicon, grammar, or authority promotions.');
