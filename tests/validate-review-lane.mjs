import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/review-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/review-22-human-batch.v1.json');
const vocabBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032-human-batch.v1.json');
const supplement=await json('progress/evidence-overrides.v40.json');

assert.equal(lane.lane_id,'SWHNK-L01-REVIEW-AUTHORING-V1');
assert.equal(lane.status,'AUTHORED_22_OF_22_VALIDATION_PENDING');
assert.equal(lane.target,22);
assert.equal(lane.items.length,22);
assert.deepEqual(lane.items.map(x=>x.slot_id),Array.from({length:22},(_,i)=>`L01-REV-${String(i+1).padStart(3,'0')}`));
assert.ok(lane.items.every(x=>x.implementation_state==='AUTHORED'));
assert.equal(lane.rules.new_hnk_forms_allowed,false);
assert.equal(lane.rules.unvalidated_constructions_allowed,false);
assert.equal(lane.rules.authority_promotion_allowed,false);
assert.equal(lane.rules.historical_reconstruction_claim,false);
assert.equal(lane.metrics.new_hnk_forms_created,0);
assert.equal(lane.metrics.language_authority_promotions,0);
assert.equal(lane.metrics.historical_reconstruction_claims,0);
assert.deepEqual(lane.metrics.by_type,{LEXICAL_RECALL:8,FUNCTION_RECALL:6,CONSTRUCTION_REBUILD:4,COMMUNICATIVE_TRANSFER:4});

const byId=Object.fromEntries(lane.items.map(x=>[x.slot_id,x]));
assert.equal(byId['L01-REV-006'].expected,'VANI');
assert.equal(byId['L01-REV-006'].authority,'WATCH');
assert.match(byId['L01-REV-006'].boundary,/Master Lexicon meaning remains null/);
assert.equal(byId['L01-REV-007'].expected,'VAME');
assert.equal(byId['L01-REV-007'].authority,'GATE');
assert.equal(byId['L01-REV-011'].expected,'KU');
assert.match(byId['L01-REV-011'].boundary,/universal WH/i);
assert.equal(byId['L01-REV-015'].expected,'EN ZAMI HENUVOKODAN KE');
assert.equal(byId['L01-REV-016'].expected,'EN VALI KUVAN KE');
assert.equal(byId['L01-REV-017'].expected,'EN KU VAMAVALA KE');
assert.equal(byId['L01-REV-018'].expected,'EN VAME VAMAZAMU KE');
assert.equal(byId['L01-REV-019'].expected,'NE VAMAKALA');
assert.equal(byId['L01-REV-020'].expected,'DUVE TOMI');
assert.equal(byId['L01-REV-021'].expected,'EN VANI KUVAN KE');
assert.equal(byId['L01-REV-022'].expected,'KALA YA EN ES KU KE');
assert.match(byId['L01-REV-022'].boundary,/YA and ES remain semantically unresolved/);

assert.equal(vocabBatch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.equal(batch.batch_id,'SWHNK-L01-REVIEW-22-HUMAN-BATCH-V1');
assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_VALIDATION');
assert.equal(batch.review_groups.reduce((n,g)=>n+g.count,0),22);
assert.equal(batch.decisions_requested.length,5);
assert.equal(batch.checks.new_hnk_forms_created,0);
assert.equal(batch.checks.language_authority_promotions,0);
assert.equal(batch.projected_effect_if_all_approved.L01_VALIDATED_after,155);
assert.equal(batch.projected_effect_if_all_approved.global_VALIDATED_after,155);

assert.equal(supplement.status,'ACTIVE_SUPPLEMENT');
assert.equal(supplement.overrides.length,1);
assert.deepEqual(supplement.overrides[0].selector,{lesson:'L01',category:'review',range:[1,22]});
assert.equal(supplement.overrides[0].implementation_state,'AUTHORED');
assert.equal(supplement.validation_evidence_updates.L01_Review_authored,22);
assert.equal(supplement.validation_evidence_updates.L01_Review_validated,0);

console.log('PASS SWHNK-L01-REVIEW-LANE-V40');
console.log('22/22 Reviews AUTHORED; final explicit validation gate prepared; zero new HNK forms or language-authority promotions.');
