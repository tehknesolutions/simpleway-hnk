import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/review-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/review-22-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L01-kether/validation/review-22.validated-transition.v1.json');
const vocabBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032-human-batch.v1.json');
const vocabSupplement=await json('progress/evidence-overrides.v39.json');
const reviewSupplement=await json('progress/evidence-overrides.v40.json');
const seal=await json('curriculum/cycle-01/L01-kether/closure/kether-seal.v1.json');

assert.equal(lane.lane_id,'SWHNK-L01-REVIEW-AUTHORING-V1');
assert.equal(lane.status,'AUTHORED_22_OF_22_VALIDATED_22_COMPLETE');
assert.equal(lane.target,22);
assert.equal(lane.items.length,22);
assert.deepEqual(lane.items.map(x=>x.slot_id),Array.from({length:22},(_,i)=>`L01-REV-${String(i+1).padStart(3,'0')}`));
assert.ok(lane.items.every(x=>x.implementation_state==='VALIDATED'));
assert.equal(lane.rules.new_hnk_forms_allowed,false);
assert.equal(lane.rules.unvalidated_constructions_allowed,false);
assert.equal(lane.rules.authority_promotion_allowed,false);
assert.equal(lane.rules.historical_reconstruction_claim,false);
assert.equal(lane.rules.two_slots_per_validated_opi,true);
assert.equal(lane.metrics.AUTHORED,22);
assert.equal(lane.metrics.VALIDATED,22);
assert.equal(lane.metrics.new_hnk_forms_created,0);
assert.equal(lane.metrics.language_authority_promotions,0);
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
assert.deepEqual(byId['L01-REV-013'].expected_sequence,['EN VANI KUVAN KE','EN VANI KUON KE']);
assert.match(byId['L01-REV-013'].boundary,/Master Lexicon meaning null/);
assert.equal(byId['L01-REV-015'].expected,'EN KU VAMAVALA KE');
assert.equal(byId['L01-REV-017'].expected,'EN VAME VAMAZAMU KE');
assert.equal(byId['L01-REV-019'].context_hnk,'VAMUSARO');
assert.match(byId['L01-REV-019'].boundary,/not relabeled weekend/);

assert.equal(vocabBatch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.equal(vocabSupplement.validation_evidence_updates.L01_Vocabulary_validated,32);
assert.equal(batch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.ok(batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(batch.applied_effect.L01_VALIDATED_after,155);
assert.equal(batch.applied_effect.global_VALIDATED_after,155);
assert.equal(batch.applied_effect.language_authority_promotions,0);
assert.equal(transition.status,'APPLIED');
assert.equal(transition.lesson_after.VALIDATED,155);
assert.equal(transition.review_after.VALIDATED,22);
assert.equal(transition.global_after.VALIDATED,155);
assert.equal(transition.closure.seal_authorized,true);

assert.equal(reviewSupplement.overrides[0].implementation_state,'VALIDATED');
assert.equal(reviewSupplement.validation_evidence_updates.L01_Review_authored,0);
assert.equal(reviewSupplement.validation_evidence_updates.L01_Review_validated,22);
assert.equal(reviewSupplement.validation_evidence_updates.L01_validated_total,155);
assert.equal(seal.status,'SEALED_CURRICULUM_VALIDATION_COMPLETE');
assert.equal(seal.validated,155);
assert.equal(seal.preserved_boundaries.language_authority_promotions,0);

console.log('PASS SWHNK-L01-REVIEW-LANE-V41');
console.log('22/22 Reviews VALIDATED; L01 Kether sealed at 155/155 with zero language-authority or visual-canon promotions.');
