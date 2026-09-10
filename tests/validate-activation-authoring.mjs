import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) { return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8')); }

const pipeline=await json('curriculum/cycle-01/L01-kether/authoring/activation-72.pipeline.v1.json');
const p01=await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p01.v1.json');
const p02=await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p02.v1.json');
const p03=await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p03.v1.json');
const p04=await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p04.v1.json');
const p05=await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p05.v1.json');
const p06=await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p06-integrative.v1.json');
const p06Batch=await json('curriculum/cycle-01/L01-kether/validation/activation-p06-integrative-human-batch.v1.json');
const p06Transition=await json('curriculum/cycle-01/L01-kether/validation/activation-p06.validated-transition.v1.json');
const evidence=await json('progress/evidence-overrides.v1.json');

assert.equal(pipeline.target,72);
assert.equal(pipeline.historical_evidence.historical_drill_count,72);
assert.equal(pipeline.historical_evidence.raw_drill_payload_recovered,false);
assert.equal(pipeline.allocation.foundation.slots,60);
assert.equal(pipeline.allocation.integrative.slots,12);

for(const [pack,start,end] of [[p01,1,12],[p02,13,24],[p03,25,36],[p04,37,48],[p05,49,60],[p06,61,72]]){
  assert.deepEqual(pack.slots,[start,end]);
  assert.equal(pack.drills.length,12);
  assert.equal(pack.metrics.new_HNK_lexical_forms,0);
}
assert.equal(p06.metrics.new_HNK_grammar_rules,0);
assert.equal(p06.pack_type,'INTEGRATIVE');
assert.equal(p06.drills.find(x=>x.id==='L01-ACT-072').mode,'FULL_L01_INTERVIEW_CAPSTONE');

assert.equal(p06Batch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(p06Batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(p06Batch.applied_effect.L01_Activation_VALIDATED_after,72);
assert.equal(p06Batch.applied_effect.new_lexical_forms,0);
assert.equal(p06Batch.applied_effect.new_HNK_grammar_rules,0);
assert.equal(p06Batch.applied_effect.language_authority_promotions,0);
assert.equal(p06Transition.status,'APPLIED');
assert.equal(p06Transition.lesson_activation_after.VALIDATED,72);
assert.equal(p06Transition.lesson_activation_after.VALIDATED_percent,100);
assert.equal(p06Transition.global_after.VALIDATED,82);
assert.equal(p06Transition.authority_effect.VANI_meaning,'NULL_UNCHANGED');
assert.equal(p06Transition.authority_effect.language_authority_promotions,0);
assert.equal(p06Transition.historical_effect.historical_reconstruction_claim,false);

const v=evidence.validation_evidence;
assert.equal(v.L01_Activation_target,72);
assert.equal(v.L01_Activation_authored,0);
assert.equal(v.L01_Activation_validated,72);
assert.equal(v.L01_Activation_authored_or_better,72);
assert.equal(v.L01_Activation_remaining_unimplemented,0);
assert.equal(v.L01_Activation_foundation_validated,60);
assert.equal(v.L01_Activation_foundation_percent,100);
assert.equal(v.L01_Activation_integrative_target,12);
assert.equal(v.L01_Activation_integrative_authored,0);
assert.equal(v.L01_Activation_integrative_validated,12);
assert.equal(v.L01_Activation_integrative_percent,100);
assert.deepEqual(v.L01_Activation_authored_slots,[]);
assert.deepEqual(v.L01_Activation_validated_slots,Array.from({length:72},(_,i)=>i+1));
assert.equal(v.prepared_activation_batch,null);

console.log('PASS SWHNK-L01-ACTIVATION-PIPELINE-V7');
console.log('Activation 72/72 VALIDATED: foundation 60/60 + integrative 12/12; zero new lexical forms, zero new grammar rules, zero historical reconstruction.');
