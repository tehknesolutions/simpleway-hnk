import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence=await json('progress/evidence-overrides.v1.json');
const bindings=await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix=await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const p06Batch=await json('curriculum/cycle-01/L01-kether/validation/activation-p06-integrative-human-batch.v1.json');
const p06Transition=await json('curriculum/cycle-01/L01-kether/validation/activation-p06.validated-transition.v1.json');
const numeralBatch=await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const kuon=await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,0);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,82);
assert.equal(values.filter(x=>['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length,82);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);
assert.equal(values.filter(x=>x.scaffolded).length,82);

assert.equal(bindings.metrics.validated,10);
assert.equal(matrix.summary.validation_phase,'COMPLETE');
assert.equal(matrix.summary.validated,10);
assert.equal(p06Batch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(p06Batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(p06Transition.status,'APPLIED');
assert.equal(p06Transition.lesson_activation_after.VALIDATED,72);
assert.equal(p06Transition.global_after.VALIDATED,82);
assert.equal(p06Transition.authority_effect.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_Activation_target,72);
assert.equal(v.L01_Activation_authored,0);
assert.equal(v.L01_Activation_validated,72);
assert.equal(v.L01_Activation_frozen,0);
assert.equal(v.L01_Activation_authored_or_better,72);
assert.equal(v.L01_Activation_remaining_unimplemented,0);
assert.equal(v.L01_Activation_foundation_target,60);
assert.equal(v.L01_Activation_foundation_validated,60);
assert.equal(v.L01_Activation_foundation_percent,100);
assert.equal(v.L01_Activation_integrative_target,12);
assert.equal(v.L01_Activation_integrative_authored,0);
assert.equal(v.L01_Activation_integrative_validated,12);
assert.equal(v.L01_Activation_integrative_authored_or_better,12);
assert.equal(v.L01_Activation_integrative_percent,100);
assert.deepEqual(v.L01_Activation_authored_slots,[]);
assert.deepEqual(v.L01_Activation_validated_slots,Array.from({length:72},(_,i)=>i+1));
assert.equal(v.prepared_activation_batch,null);

assert.equal(numeralBatch.status,'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after,45);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');
assert.equal(kuon.authority,'CANDIDATE');
assert.equal(kuon.dependency.authority,'GATE');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V18');
console.log('Cycle 1: 82 VALIDATED, 0 AUTHORED; L01 OPI 10/10 and Activation 72/72 VALIDATED; historical evidence remains 82 on a separate axis.');
