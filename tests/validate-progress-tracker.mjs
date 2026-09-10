import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) { return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8')); }

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence=await json('progress/evidence-overrides.v1.json');
const bindings=await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix=await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const p05Batch=await json('curriculum/cycle-01/L01-kether/validation/activation-p05-human-batch.v1.json');
const p05Transition=await json('curriculum/cycle-01/L01-kether/validation/activation-p05.validated-transition.v1.json');
const p06=await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p06-integrative.v1.json');
const p06Batch=await json('curriculum/cycle-01/L01-kether/validation/activation-p06-integrative-human-batch.v1.json');
const numeralBatch=await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const kuon=await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,12);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,70);
assert.equal(values.filter(x=>['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length,82);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);
assert.equal(values.filter(x=>x.scaffolded).length,82);

assert.equal(bindings.metrics.validated,10);
assert.equal(matrix.summary.validation_phase,'COMPLETE');
assert.equal(matrix.summary.validated,10);
assert.equal(p05Batch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(p05Transition.status,'APPLIED');
assert.equal(p05Transition.after.L01_Activation.VALIDATED,60);
assert.equal(p05Transition.after.global.VALIDATED,70);
assert.equal(p05Transition.authority_effect.language_authority_promotions,0);
assert.equal(p06.status,'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p06.slots,[61,72]);
assert.equal(p06.drills.length,12);
assert.equal(p06.metrics.new_HNK_lexical_forms,0);
assert.equal(p06.metrics.new_HNK_grammar_rules,0);
assert.equal(p06Batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(p06Batch.projected_effect_if_all_approved.L01_Activation_VALIDATED_after,72);

const v=evidence.validation_evidence;
assert.equal(v.L01_Activation_target,72);
assert.equal(v.L01_Activation_authored,12);
assert.equal(v.L01_Activation_validated,60);
assert.equal(v.L01_Activation_frozen,0);
assert.equal(v.L01_Activation_authored_or_better,72);
assert.equal(v.L01_Activation_remaining_unimplemented,0);
assert.equal(v.L01_Activation_foundation_target,60);
assert.equal(v.L01_Activation_foundation_validated,60);
assert.equal(v.L01_Activation_foundation_percent,100);
assert.equal(v.L01_Activation_integrative_target,12);
assert.equal(v.L01_Activation_integrative_authored,12);
assert.equal(v.L01_Activation_integrative_validated,0);
assert.equal(v.L01_Activation_integrative_authored_or_better,12);
assert.equal(v.L01_Activation_integrative_percent,100);
assert.deepEqual(v.L01_Activation_authored_slots,Array.from({length:12},(_,i)=>i+61));
assert.deepEqual(v.L01_Activation_validated_slots,Array.from({length:60},(_,i)=>i+1));
assert.equal(v.prepared_activation_batch,'../curriculum/cycle-01/L01-kether/validation/activation-p06-integrative-human-batch.v1.json');

assert.equal(numeralBatch.status,'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after,45);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');
assert.equal(kuon.authority,'CANDIDATE');
assert.equal(kuon.dependency.authority,'GATE');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V17');
console.log('Cycle 1: 12 AUTHORED + 70 VALIDATED = 82 authored-or-better; L01 OPI 10/10 VALIDATED; Activation foundation 60/60 VALIDATED and integrative P06 12/12 AUTHORED; historical evidence remains 82.');
