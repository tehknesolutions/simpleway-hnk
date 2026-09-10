import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence=await json('progress/evidence-overrides.v1.json');
const bindings=await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix=await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const storyBatch=await json('curriculum/cycle-01/L01-kether/validation/story-human-batch.v1.json');
const storyTransition=await json('curriculum/cycle-01/L01-kether/validation/story-lane.validated-transition.v1.json');
const vocabulary=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const vocabularyBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-24-human-batch.v1.json');
const vocabularyGap=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_AUTHORING_PLAN_V1.json');
const numeralBatch=await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const kuon=await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){
  const {lesson,category,range}=override.selector;
  for(let i=range[0];i<=range[1];i++) simulated.set(`${lesson}/${category}/${i}`,override);
}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,24);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,101);
assert.equal(values.filter(x=>['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length,125);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);
assert.equal(values.filter(x=>x.scaffolded).length,125);

assert.equal(bindings.metrics.validated,10);
assert.equal(matrix.summary.validation_phase,'COMPLETE');
assert.equal(matrix.summary.validated,10);

const v=evidence.validation_evidence;
assert.equal(v.L01_Activation_validated,72);
assert.equal(v.L01_Structure_headers_validated,2);
assert.equal(v.L01_Structures_validated,5);
assert.equal(v.L01_Teacher_notes_validated,3);
assert.equal(v.L01_QA_validated,4);

assert.equal(storyBatch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(storyBatch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(storyTransition.status,'APPLIED');
assert.equal(storyTransition.global_after.VALIDATED,101);
assert.equal(v.L01_Story_target,5);
assert.equal(v.L01_Story_authored,0);
assert.equal(v.L01_Story_validated,5);
assert.equal(v.L01_Story_authored_or_better,5);
assert.equal(v.prepared_story_batch,null);

assert.equal(vocabulary.status,'AUTHORED_24_OF_32_GOVERNED_ASSET_GAP_8');
assert.equal(vocabulary.entries.length,24);
assert.equal(vocabulary.unfilled_slots.length,8);
assert.equal(vocabulary.metrics.new_HNK_lexical_forms_created,0);
assert.equal(vocabulary.metrics.language_authority_promotions,0);
assert.equal(vocabularyBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(vocabularyBatch.projected_effect_if_all_approved.global_VALIDATED_after,125);
assert.equal(v.L01_Vocabulary_target,32);
assert.equal(v.L01_Vocabulary_authored,24);
assert.equal(v.L01_Vocabulary_validated,0);
assert.equal(v.L01_Vocabulary_missing,8);
assert.equal(v.L01_Vocabulary_authored_or_better,24);
assert.equal(v.prepared_vocabulary_batch,'../curriculum/cycle-01/L01-kether/validation/vocabulary-24-human-batch.v1.json');
assert.equal(vocabularyGap.status,'PREPARED_NOT_APPROVED');
assert.equal(vocabularyGap.problem.remaining_gap,8);
assert.equal(vocabularyGap.current_decision,'NO_FORMS_SELECTED');

assert.equal(numeralBatch.status,'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after,45);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');
assert.equal(kuon.authority,'CANDIDATE');
assert.equal(kuon.dependency.authority,'GATE');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V24');
console.log('Cycle 1: 24 AUTHORED + 101 VALIDATED = 125 authored-or-better; L01 Stories fully validated; Vocabulary 24/32 authored from governed assets with 8 explicit gaps.');
