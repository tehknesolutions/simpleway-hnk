import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const qa=await json('curriculum/cycle-01/L01-kether/authoring/qa-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/qa-human-batch.v1.json');
const evidence=await json('progress/evidence-overrides.v1.json');

assert.equal(qa.lane_id,'SWHNK-L01-QA-AUTHORING-V1');
assert.equal(qa.status,'AUTHORED_4_OF_4_VALIDATION_PENDING');
assert.equal(qa.items.length,4);
assert.deepEqual(qa.items.map(x=>x.slot_id),['L01-QA-001','L01-QA-002','L01-QA-003','L01-QA-004']);
assert.equal(qa.metrics.qa_target,4);
assert.equal(qa.metrics.AUTHORED,4);
assert.equal(qa.metrics.VALIDATED,0);
assert.equal(qa.metrics.FROZEN,0);
assert.equal(qa.metrics.new_HNK_lexical_forms,0);
assert.equal(qa.metrics.new_HNK_grammar_rules,0);
assert.equal(qa.source_contract.payload_historical_recovery_claim,false);

assert.equal(qa.items[0].question_hnk,'KALA YA EN ES KU KE');
assert.equal(qa.items[0].answer_schema,'[PERSONAL_NAME]');
assert.match(qa.items[0].authority_boundary,/YA and ES remain/);
assert.equal(qa.items[1].question_hnk,'EN KU SARASALA KE');
assert.equal(qa.items[1].answer_schema,'[CARDINAL_0_99]');
assert.deepEqual(qa.items[1].example_answers,['TOMI','DUVE TOMI','LUSO HOYU']);
assert.match(qa.items[1].authority_boundary,/SARASALA remains WATCH/);
assert.equal(qa.items[2].question_hnk,'EN SARADAYA KUVAN KE');
assert.equal(qa.items[2].answer_schema,'[PLACE]');
assert.match(qa.items[2].authority_boundary,/KUVAN remains CANDIDATE/);
assert.equal(qa.items[3].question_hnk,'EN KU VAMAVALA KE');
assert.equal(qa.items[3].answer_schema,'[HOBBY_OR_PLEASURE_ACTIVITY]');
assert.match(qa.items[3].authority_boundary,/VAMAVALA remains WATCH/);

assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,5);
assert.equal(batch.projected_effect_if_all_approved.qa_VALIDATED,4);
assert.equal(batch.projected_effect_if_all_approved.global_VALIDATED_after,96);
assert.equal(batch.projected_effect_if_all_approved.new_HNK_lexical_forms,0);
assert.equal(batch.projected_effect_if_all_approved.new_HNK_grammar_rules,0);
assert.equal(batch.projected_effect_if_all_approved.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_QA_target,4);
assert.equal(v.L01_QA_authored,4);
assert.equal(v.L01_QA_validated,0);
assert.equal(v.L01_QA_authored_or_better,4);
assert.equal(v.prepared_QA_batch,'../curriculum/cycle-01/L01-kether/validation/qa-human-batch.v1.json');

console.log('PASS SWHNK-L01-QA-LANE-V1');
console.log('4/4 Q&A AUTHORED; validation pending; all payloads reuse validated L01 questions/response schemas; no new HNK lexicon or grammar.');
