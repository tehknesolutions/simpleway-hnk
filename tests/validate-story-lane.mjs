import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const story=await json('curriculum/cycle-01/L01-kether/authoring/story-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/story-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L01-kether/validation/story-lane.validated-transition.v1.json');
const evidence=await json('progress/evidence-overrides.v1.json');

assert.equal(story.lane_id,'SWHNK-L01-STORY-AUTHORING-V1');
assert.equal(story.status,'AUTHORED_5_OF_5_VALIDATION_PENDING');
assert.equal(story.stories.length,5);
assert.deepEqual(story.stories.map(x=>x.slot_id),['L01-STORY-001','L01-STORY-002','L01-STORY-003','L01-STORY-004','L01-STORY-005']);
assert.equal(story.metrics.story_target,5);
assert.equal(story.metrics.AUTHORED,5);
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

assert.equal(batch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(batch.applied_effect.story_VALIDATED,5);
assert.equal(batch.applied_effect.global_VALIDATED_after,101);
assert.equal(batch.applied_effect.new_HNK_lexical_forms,0);
assert.equal(batch.applied_effect.new_HNK_grammar_rules,0);
assert.equal(batch.applied_effect.language_authority_promotions,0);
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.VALIDATED,5);
assert.equal(transition.global_after.VALIDATED,101);
assert.equal(transition.authority_effect.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_Story_target,5);
assert.equal(v.L01_Story_authored,0);
assert.equal(v.L01_Story_validated,5);
assert.equal(v.L01_Story_authored_or_better,5);
assert.equal(v.prepared_story_batch,null);

console.log('PASS SWHNK-L01-STORY-LANE-V2');
console.log('5/5 Stories VALIDATED for scoped course use; narrative framing remains v1.1 authorship and creates no new HNK lexicon or grammar.');
