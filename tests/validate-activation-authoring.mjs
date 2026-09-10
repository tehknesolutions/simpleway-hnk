import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) { return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8')); }

const pipeline = await json('curriculum/cycle-01/L01-kether/authoring/activation-72.pipeline.v1.json');
const p01 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p01.v1.json');
const p02 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p02.v1.json');
const p03 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p03.v1.json');
const p04 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p04.v1.json');
const p05 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p05.v1.json');
const p05Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p05-human-batch.v1.json');
const p05Transition = await json('curriculum/cycle-01/L01-kether/validation/activation-p05.validated-transition.v1.json');
const p06 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p06-integrative.v1.json');
const p06Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p06-integrative-human-batch.v1.json');
const evidence = await json('progress/evidence-overrides.v1.json');

assert.equal(pipeline.target,72);
assert.equal(pipeline.historical_evidence.historical_drill_count,72);
assert.equal(pipeline.historical_evidence.raw_drill_payload_recovered,false);
assert.equal(pipeline.allocation.foundation.slots,60);
assert.equal(pipeline.allocation.integrative.slots,12);

for (const [pack,start,end] of [[p01,1,12],[p02,13,24],[p03,25,36],[p04,37,48],[p05,49,60]]) {
  assert.deepEqual(pack.slots,[start,end]);
  assert.equal(pack.drills.length,12);
  assert.equal(pack.metrics.new_HNK_lexical_forms,0);
  assert.equal(pack.historical_claim.these_are_recovered_v1_drills,false);
}

assert.equal(p05Batch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(p05Batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(p05Transition.status,'APPLIED');
assert.equal(p05Transition.after.L01_Activation.VALIDATED,60);
assert.equal(p05Transition.after.L01_Activation.foundation_VALIDATED,60);
assert.equal(p05Transition.after.L01_Activation.foundation_VALIDATED_percent,100);
assert.equal(p05Transition.authority_effect.VAME,'GATE_UNCHANGED');
assert.equal(p05Transition.authority_effect.VAMAZAMU,'WATCH_UNCHANGED');
assert.equal(p05Transition.authority_effect.NE,'CANDIDATE_UNCHANGED');
assert.equal(p05Transition.authority_effect.weekend_gloss_claim,false);
assert.equal(p05Transition.authority_effect.language_authority_promotions,0);

assert.equal(p06.pack_id,'SWHNK-L01-ACTIVATION-P06-061-072-INTEGRATIVE-AUTHORING-V1');
assert.equal(p06.status,'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p06.slots,[61,72]);
assert.equal(p06.pack_type,'INTEGRATIVE');
assert.equal(p06.drills.length,12);
assert.deepEqual(p06.drills.map(x=>x.id),Array.from({length:12},(_,i)=>`L01-ACT-${String(i+61).padStart(3,'0')}`));
assert.equal(p06.metrics.new_HNK_lexical_forms,0);
assert.equal(p06.metrics.new_HNK_grammar_rules,0);
assert.equal(p06.metrics.source_OPI_count,10);
assert.equal(p06.activation_completion_after_authoring.activation_authored_or_better,72);
assert.equal(p06.activation_completion_after_authoring.percent,100);
assert.ok(p06.drills.every(x=>x.new_HNK_grammar===false || x.id==='L01-ACT-069'));
assert.equal(p06.drills.find(x=>x.id==='L01-ACT-072').mode,'FULL_L01_INTERVIEW_CAPSTONE');
assert.ok(p06.drills.find(x=>x.id==='L01-ACT-072').constraints.some(x=>x.includes('Create no new HNK conjunction')));

assert.equal(p06Batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(p06Batch.decisions_requested.length,5);
assert.equal(p06Batch.projected_effect_if_all_approved.L01_Activation_VALIDATED_after,72);
assert.equal(p06Batch.projected_effect_if_all_approved.new_lexical_forms,0);
assert.equal(p06Batch.projected_effect_if_all_approved.new_HNK_grammar_rules,0);
assert.equal(p06Batch.projected_effect_if_all_approved.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_Activation_target,72);
assert.equal(v.L01_Activation_authored,12);
assert.equal(v.L01_Activation_validated,60);
assert.equal(v.L01_Activation_authored_or_better,72);
assert.equal(v.L01_Activation_remaining_unimplemented,0);
assert.equal(v.L01_Activation_foundation_validated,60);
assert.equal(v.L01_Activation_foundation_percent,100);
assert.equal(v.L01_Activation_integrative_target,12);
assert.equal(v.L01_Activation_integrative_authored,12);
assert.equal(v.L01_Activation_integrative_validated,0);
assert.deepEqual(v.L01_Activation_authored_slots,Array.from({length:12},(_,i)=>i+61));
assert.deepEqual(v.L01_Activation_validated_slots,Array.from({length:60},(_,i)=>i+1));
assert.equal(v.prepared_activation_batch,'../curriculum/cycle-01/L01-kether/validation/activation-p06-integrative-human-batch.v1.json');

console.log('PASS SWHNK-L01-ACTIVATION-PIPELINE-V6');
console.log('P01-P05 VALIDATED 60/72; P06 integrative AUTHORED 12/12; Activation 72/72 authored-or-better; foundation 60/60 validated; no historical reconstruction or authority inflation.');
