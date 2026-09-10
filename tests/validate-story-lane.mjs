import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const story=await json('curriculum/cycle-01/L01-kether/authoring/story-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/story-human-batch.v1.json');
const evidence=await json('progress/evidence-overrides.v1.json');

assert.equal(story.lane_id,'SWHNK-L01-STORY-AUTHORING-V1');
assert.equal(story.status,'AUTHORED_5_OF_5_VALIDATION_PENDING');
assert.equal(story.stories.length,5);
assert.deepEqual(story.stories.map(x=>x.slot_id),['L01-STORY-001','L01-STORY-002','L01-STORY-003','L01-STORY-004','L01-STORY-005']);
assert.equal(story.metrics.story_target,5);
assert.equal(story.metrics.AUTHORED,5);
assert.equal(story.metrics.VALIDATED,0);
assert.equal(story.metrics.FROZEN,0);
assert.equal(story.metrics.new_HNK_lexical_forms,0);
assert.equal(story.metrics.new_HNK_grammar_rules,0);
assert.equal(story.source_contract.payload_historical_recovery_claim,false);

assert.equal(story.stories[0].dialogue[0].hnk,'KALA YA EN ES KU KE');
assert.equal(story.stories[1].dialogue[0].hnk,'EN KU SARASALA KE');
assert.equal(story.stories[1].dialogue[1].hnk,'EN SARADAYA KUVAN KE');
assert.equal(story.stories[2].dialogue[0].hnk,'EN VALI KUVAN KE');
assert.equal(story.stories[2].dialogue[1].context,'WORK_OR_SCHOOL');
assert.equal(story.stories[2].dialogue[1].hnk,'EN KU VALA KE');
assert.equal(story.stories[3].dialogue[0].hnk,'EN VANI KUVAN KE');
assert.equal(story.stories[3].dialogue[1].hnk,'EN VANI KUON KE');
assert.equal(story.stories[3].dialogue[2].hnk,'EN KU VAMAVALA KE');
assert.equal(story.stories[4].dialogue[0].hnk,'EN VAME VAMAZAMU KE');
assert.equal(story.stories[4].dialogue[1].context,'VAMUSARO');
assert.equal(story.stories[4].dialogue[1].hnk,'EN KU VALA KE');

assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,5);
assert.equal(batch.projected_effect_if_all_approved.story_VALIDATED,5);
assert.equal(batch.projected_effect_if_all_approved.global_VALIDATED_after,101);
assert.equal(batch.projected_effect_if_all_approved.new_HNK_lexical_forms,0);
assert.equal(batch.projected_effect_if_all_approved.new_HNK_grammar_rules,0);
assert.equal(batch.projected_effect_if_all_approved.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_Story_target,5);
assert.equal(v.L01_Story_authored,5);
assert.equal(v.L01_Story_validated,0);
assert.equal(v.L01_Story_authored_or_better,5);
assert.equal(v.prepared_story_batch,'../curriculum/cycle-01/L01-kether/validation/story-human-batch.v1.json');

console.log('PASS SWHNK-L01-STORY-LANE-V1');
console.log('5/5 Stories AUTHORED; validation pending; narrative framing uses only validated HNK payloads and creates no new lexicon or grammar.');
