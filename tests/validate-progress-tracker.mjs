import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) { return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8')); }

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence=await json('progress/evidence-overrides.v1.json');
const bindings=await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix=await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const p04Batch=await json('curriculum/cycle-01/L01-kether/validation/activation-p04-human-batch.v1.json');
const p04Transition=await json('curriculum/cycle-01/L01-kether/validation/activation-p04.validated-transition.v1.json');
const p05=await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p05.v1.json');
const p05Batch=await json('curriculum/cycle-01/L01-kether/validation/activation-p05-human-batch.v1.json');
const numeralBatch=await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const kuon=await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,12);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,58);
assert.equal(values.filter(x=>['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length,70);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);
assert.equal(values.filter(x=>x.scaffolded).length,82);

assert.equal(bindings.metrics.validated,10);
assert.equal(matrix.summary.validation_phase,'COMPLETE');
assert.equal(matrix.summary.validated,10);
assert.equal(p04Batch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(p04Transition.status,'APPLIED');
assert.equal(p04Transition.lesson_activation_after.VALIDATED,48);
assert.equal(p04Transition.global_after.VALIDATED,58);
assert.equal(p04Transition.authority_effect.language_authority_promotions,0);
assert.equal(p05.status,'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p05.slots,[49,60]);
assert.deepEqual(p05.source_opi,['L01-OPI-009','L01-OPI-010']);
assert.equal(p05.drills.length,12);
assert.equal(p05.metrics.new_HNK_lexical_forms,0);
assert.equal(p05Batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(p05Batch.projected_effect_if_all_approved.L01_Activation_VALIDATED_after,60);

const v=evidence.validation_evidence;
assert.equal(v.L01_Activation_target,72);
assert.equal(v.L01_Activation_authored,12);
assert.equal(v.L01_Activation_validated,48);
assert.equal(v.L01_Activation_frozen,0);
assert.equal(v.L01_Activation_authored_or_better,60);
assert.equal(v.L01_Activation_remaining_unimplemented,12);
assert.equal(v.L01_Activation_foundation_target,60);
assert.equal(v.L01_Activation_foundation_authored_or_better,60);
assert.equal(v.L01_Activation_foundation_percent,100);
assert.deepEqual(v.L01_Activation_authored_slots,Array.from({length:12},(_,i)=>i+49));
assert.deepEqual(v.L01_Activation_validated_slots,Array.from({length:48},(_,i)=>i+1));
assert.equal(v.prepared_activation_batch,'../curriculum/cycle-01/L01-kether/validation/activation-p05-human-batch.v1.json');

assert.equal(numeralBatch.status,'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after,45);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');
assert.equal(kuon.authority,'CANDIDATE');
assert.equal(kuon.dependency.authority,'GATE');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V16');
console.log('Cycle 1: 12 AUTHORED + 58 VALIDATED = 70 authored-or-better; L01 OPI 10/10 VALIDATED; Activation P01-P04 48 VALIDATED + P05 12 AUTHORED; foundation 60/60 mature; historical evidence 82.');
