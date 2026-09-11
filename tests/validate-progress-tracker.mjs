import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const base=await json('progress/evidence-overrides.v1.json');
const names=(await readdir(new URL('../progress/',import.meta.url)))
  .filter(name=>/^evidence-overrides\.v\d+\.json$/.test(name)&&name!=='evidence-overrides.v1.json')
  .sort((a,b)=>Number(a.match(/\.v(\d+)\./)[1])-Number(b.match(/\.v(\d+)\./)[1]));
const supplements=[];
for(const name of names)supplements.push(await json(`progress/${name}`));
const evidence={...base,overrides:[...base.overrides],lexical_evidence:{...base.lexical_evidence},validation_evidence:{...base.validation_evidence}};
for(const supplement of supplements){
  evidence.overrides.push(...(supplement.overrides??[]));
  Object.assign(evidence.lexical_evidence,supplement.lexical_evidence_updates??{});
  Object.assign(evidence.validation_evidence,supplement.validation_evidence_updates??{});
}

const vocabulary=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const vocabularyBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032-human-batch.v1.json');
const vocabularyTransition=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032.validated-transition.v1.json');
const review=await json('curriculum/cycle-01/L01-kether/authoring/review-lane.v1.json');
const reviewBatch=await json('curriculum/cycle-01/L01-kether/validation/review-22-human-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');

assert.equal(contract.target_total,1008);
assert.ok(names.includes('evidence-overrides.v37.json'));
assert.ok(names.includes('evidence-overrides.v39.json'));
assert.ok(names.includes('evidence-overrides.v40.json'));

const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,22);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,133);
assert.equal(values.filter(x=>['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length,155);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);
assert.equal(values.filter(x=>x.scaffolded).length,155);

assert.equal(vocabulary.status,'AUTHORED_32_OF_32_VALIDATED_32_COMPLETE');
assert.equal(vocabulary.entries.length,32);
assert.equal(vocabulary.metrics.VALIDATED,32);
assert.equal(vocabulary.metrics.language_authority_promotions,0);
assert.equal(vocabularyBatch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.equal(vocabularyTransition.global_after.VALIDATED,133);

assert.equal(review.status,'AUTHORED_22_OF_22_VALIDATION_PENDING');
assert.equal(review.items.length,22);
assert.equal(review.metrics.AUTHORED,22);
assert.equal(review.metrics.VALIDATED,0);
assert.equal(review.metrics.new_hnk_forms_created,0);
assert.equal(review.metrics.language_authority_promotions,0);
assert.deepEqual(review.metrics.by_type,{LEXICAL_RECALL:8,FUNCTION_RECALL:6,CONSTRUCTION_REBUILD:4,COMMUNICATIVE_TRANSFER:4});
assert.equal(reviewBatch.status,'AWAITING_EXPLICIT_HUMAN_VALIDATION');
assert.equal(reviewBatch.projected_effect_if_all_approved.L01_VALIDATED_after,155);
assert.equal(reviewBatch.projected_effect_if_all_approved.global_VALIDATED_after,155);
assert.equal(reviewBatch.projected_effect_if_all_approved.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_OPI_validated,10);
assert.equal(v.L01_Activation_validated,72);
assert.equal(v.L01_Structure_headers_validated,2);
assert.equal(v.L01_Structures_validated,5);
assert.equal(v.L01_Teacher_notes_validated,3);
assert.equal(v.L01_QA_validated,4);
assert.equal(v.L01_Story_validated,5);
assert.equal(v.L01_Vocabulary_validated,32);
assert.equal(v.L01_Vocabulary_authored,0);
assert.equal(v.L01_Vocabulary_missing,0);
assert.equal(v.L01_Review_target,22);
assert.equal(v.L01_Review_authored,22);
assert.equal(v.L01_Review_validated,0);
assert.equal(v.L01_Review_missing,0);
assert.equal(v.L01_Review_authored_or_better,22);
assert.equal(v.prepared_review_batch,'../curriculum/cycle-01/L01-kether/validation/review-22-human-batch.v1.json');

assert.equal(evidence.lexical_evidence.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(evidence.lexical_evidence.governed_unique_language_assets,51);
assert.equal(evidence.lexical_evidence.lesson_authored_candidates.L01,20);
assert.equal(evidence.lexical_evidence.gate,'L01_VOCABULARY_32_OF_32_VALIDATED_REVIEW_LANE_NEXT');
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V40');
console.log('Cycle 1: 133 VALIDATED + 22 AUTHORED = 155 authored-or-better; L01 is fully implemented and Review validation is the final gate before Kether seal.');
