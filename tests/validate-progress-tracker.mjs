import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const base=await json('progress/evidence-overrides.v1.json');
const supplement=await json('progress/evidence-overrides.v37.json');
const vocabulary=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const validationBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032-human-batch.v1.json');
const validationTransition=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032.validated-transition.v1.json');
const mappingBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-form-mapping-human-batch.v1.json');
const semanticBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');

const evidence={
  ...base,
  overrides:[...base.overrides,...supplement.overrides],
  lexical_evidence:{...base.lexical_evidence,...supplement.lexical_evidence_updates},
  validation_evidence:{...base.validation_evidence,...supplement.validation_evidence_updates},
};

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,0);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,133);
assert.equal(values.filter(x=>['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length,133);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);
assert.equal(values.filter(x=>x.scaffolded).length,133);

assert.equal(vocabulary.status,'AUTHORED_32_OF_32_VALIDATED_32_COMPLETE');
assert.equal(vocabulary.entries.length,32);
assert.equal(vocabulary.unfilled_slots.length,0);
assert.equal(vocabulary.metrics.AUTHORED,32);
assert.equal(vocabulary.metrics.VALIDATED,32);
assert.equal(vocabulary.metrics.MISSING_GOVERNED_ASSET,0);
assert.equal(vocabulary.metrics.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_OPI_validated,10);
assert.equal(v.L01_Activation_validated,72);
assert.equal(v.L01_Structure_headers_validated,2);
assert.equal(v.L01_Structures_validated,5);
assert.equal(v.L01_Teacher_notes_validated,3);
assert.equal(v.L01_QA_validated,4);
assert.equal(v.L01_Story_validated,5);
assert.equal(v.L01_Vocabulary_target,32);
assert.equal(v.L01_Vocabulary_authored,0);
assert.equal(v.L01_Vocabulary_validated,32);
assert.equal(v.L01_Vocabulary_missing,0);
assert.equal(v.L01_Vocabulary_authored_or_better,32);
assert.deepEqual(v.L01_Vocabulary_authored_slots,[]);
assert.deepEqual(v.L01_Vocabulary_validated_slots,Array.from({length:32},(_,i)=>i+1));
assert.deepEqual(v.L01_Vocabulary_missing_slots,[]);
assert.equal(v.prepared_vocabulary_batch,null);
assert.equal(v.vocabulary_validation_status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');

assert.equal(evidence.lexical_evidence.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(evidence.lexical_evidence.governed_unique_language_assets,51);
assert.equal(evidence.lexical_evidence.lesson_authored_candidates.L01,20);
assert.equal(evidence.lexical_evidence.gate,'L01_VOCABULARY_VALIDATED_COMPLETE_REVIEW_PENDING');

assert.equal(semanticBatch.status,'APPROVED_SEMANTIC_TARGETS_ONLY_FORM_MAPPING_NOT_APPLIED');
assert.equal(mappingBatch.status,'APPROVED_EXACT_MAPPING_APPLICATION_AUTHORIZED');
assert.equal(validationBatch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.ok(validationBatch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(validationTransition.status,'APPLIED');
assert.equal(validationTransition.global_after.VALIDATED,133);
assert.equal(validationTransition.global_after.MISSING,875);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V39');
console.log('Cycle 1: 133 VALIDATED, 0 AUTHORED; L01 Vocabulary 32/32 VALIDATED; only 22 L01 Review slots remain unimplemented.');
