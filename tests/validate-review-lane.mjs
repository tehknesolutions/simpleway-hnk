import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/review-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/review-22-human-batch.v1.json');
const vocabBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032-human-batch.v1.json');
const vocabSupplement=await json('progress/evidence-overrides.v39.json');
const reviewSupplement=await json('progress/evidence-overrides.v40.json');

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
assert.equal(lane.rules.two_slots_per_validated_opi,true);
assert.equal(lane.metrics.new_hnk_forms_created,0);
assert.equal(lane.metrics.language_authority_promotions,0);
assert.equal(lane.metrics.historical_reconstruction_claims,0);
assert.deepEqual(lane.metrics.by_type,{QUESTION_RECALL:10,RESPONSE_RECALL:10,INTEGRATIVE_INTERVIEW_A:1,INTEGRATIVE_INTERVIEW_B:1});

for(let opi=1;opi<=10;opi++){
  const first=lane.items[(opi-1)*2];
  const second=lane.items[(opi-1)*2+1];
  const ref=`L01-OPI-${String(opi).padStart(3,'0')}`;
  assert.equal(first.source_ref,ref);
  assert.equal(second.source_ref,ref);
  assert.equal(first.review_type,'QUESTION_RECALL');
  assert.equal(second.review_type,'RESPONSE_RECALL');
}

const byId=Object.fromEntries(lane.items.map(x=>[x.slot_id,x]));
assert.equal(byId['L01-REV-001'].expected,'KALA YA EN ES KU KE');
assert.match(byId['L01-REV-001'].boundary,/YA and ES remain unresolved/);
assert.deepEqual(byId['L01-REV-004'].response_contract,['[NICKNAME]','NE VAMAKALA']);
assert.deepEqual(byId['L01-REV-006'].validated_examples,['TOMI','DUVE TOMI','LUSO HOYU']);
assert.deepEqual(byId['L01-REV-013'].expected_sequence,['EN VANI KUVAN KE','EN VANI KUON KE']);
assert.match(byId['L01-REV-013'].boundary,/Master Lexicon meaning null/);
assert.equal(byId['L01-REV-015'].expected,'EN KU VAMAVALA KE');
assert.equal(byId['L01-REV-017'].expected,'EN VAME VAMAZAMU KE');
assert.equal(byId['L01-REV-019'].context_hnk,'VAMUSARO');
assert.match(byId['L01-REV-019'].boundary,/not relabeled weekend/);
assert.equal(byId['L01-REV-021'].source_refs.length,5);
assert.equal(byId['L01-REV-022'].source_refs.length,5);
assert.match(byId['L01-REV-022'].boundary,/VANI meaning-null WATCH/);

assert.equal(vocabBatch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.equal(vocabSupplement.validation_evidence_updates.L01_Vocabulary_validated,32);
assert.equal(batch.batch_id,'SWHNK-L01-REVIEW-22-HUMAN-BATCH-V1');
assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_VALIDATION');
assert.equal(batch.review_groups[0].model,'TWO_SLOTS_PER_VALIDATED_OPI');
assert.equal(batch.review_groups[0].count,20);
assert.equal(batch.review_groups[1].count,2);
assert.equal(batch.decisions_requested.length,5);
assert.equal(batch.checks.new_hnk_forms_created,0);
assert.equal(batch.checks.language_authority_promotions,0);
assert.equal(batch.projected_effect_if_all_approved.L01_VALIDATED_after,155);
assert.equal(batch.projected_effect_if_all_approved.global_VALIDATED_after,155);

assert.equal(reviewSupplement.status,'ACTIVE_SUPPLEMENT');
assert.equal(reviewSupplement.overrides.length,1);
assert.deepEqual(reviewSupplement.overrides[0].selector,{lesson:'L01',category:'review',range:[1,22]});
assert.equal(reviewSupplement.overrides[0].implementation_state,'AUTHORED');
assert.equal(reviewSupplement.validation_evidence_updates.L01_Review_authored,22);
assert.equal(reviewSupplement.validation_evidence_updates.L01_Review_validated,0);

console.log('PASS SWHNK-L01-REVIEW-LANE-V40-RECONCILED');
console.log('22/22 Reviews AUTHORED as 20 OPI-linked + 2 integrative; final explicit validation gate remains pending; zero new HNK forms or authority promotions.');
