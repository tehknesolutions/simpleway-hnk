import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) { return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8')); }

const pipeline = await json('curriculum/cycle-01/L01-kether/authoring/activation-72.pipeline.v1.json');
const p01 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p01.v1.json');
const p02 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p02.v1.json');
const p03 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p03.v1.json');
const p04 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p04.v1.json');
const p04Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p04-human-batch.v1.json');
const p04Transition = await json('curriculum/cycle-01/L01-kether/validation/activation-p04.validated-transition.v1.json');
const p05 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p05.v1.json');
const p05Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p05-human-batch.v1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');

assert.equal(pipeline.target, 72);
assert.equal(pipeline.historical_evidence.historical_drill_count, 72);
assert.equal(pipeline.historical_evidence.raw_drill_payload_recovered, false);
assert.equal(pipeline.historical_evidence.content_reconstruction_claim, false);
assert.equal(pipeline.allocation.foundation.slots, 60);
assert.equal(pipeline.allocation.integrative.slots, 12);

for (const [pack,start,end] of [[p01,1,12],[p02,13,24],[p03,25,36],[p04,37,48],[p05,49,60]]) {
  assert.deepEqual(pack.slots,[start,end]);
  assert.equal(pack.drills.length,12);
  assert.equal(pack.metrics.new_HNK_lexical_forms,0);
  assert.equal(pack.historical_claim.these_are_recovered_v1_drills,false);
}

assert.equal(p04Batch.status,'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(p04Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(p04Transition.status,'APPLIED');
assert.equal(p04Transition.lesson_activation_after.VALIDATED,48);
assert.equal(p04Transition.authority_effect.VANI,'WATCH_UNCHANGED_MEANING_NULL');
assert.equal(p04Transition.authority_effect.KUVAN,'CANDIDATE_UNCHANGED');
assert.equal(p04Transition.authority_effect.KUON,'CANDIDATE_UNCHANGED');
assert.equal(p04Transition.authority_effect.ON,'GATE_UNCHANGED');
assert.equal(p04Transition.authority_effect.VAMAVALA,'WATCH_UNCHANGED');
assert.equal(p04Transition.authority_effect.WITH_lexeme_created,false);
assert.equal(p04Transition.authority_effect.language_authority_promotions,0);

assert.equal(p05.pack_id,'SWHNK-L01-ACTIVATION-P05-049-060-AUTHORING-V1');
assert.equal(p05.status,'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p05.source_opi,['L01-OPI-009','L01-OPI-010']);
assert.deepEqual(p05.drills.map(x => x.id),Array.from({length:12},(_,i)=>`L01-ACT-${String(i+49).padStart(3,'0')}`));
assert.equal(p05.foundation_completion_after_authoring.foundation_authored_or_better,60);
assert.equal(p05.foundation_completion_after_authoring.percent,100);

const opi9 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-009');
const opi10 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-010');
assert.equal(opi9.implementation_state,'VALIDATED');
assert.equal(opi10.implementation_state,'VALIDATED');
const d9=p05.drills.filter(x=>x.source_opi==='L01-OPI-009');
const d10=p05.drills.filter(x=>x.source_opi==='L01-OPI-010');
assert.equal(d9.length,6); assert.equal(d10.length,6);
assert.ok(d9.every(x=>x.hnk==='EN VAME VAMAZAMU KE'));
assert.equal(p05.drills.find(x=>x.id==='L01-ACT-053').expected.positive,'VAME VAMAZAMU');
assert.equal(p05.drills.find(x=>x.id==='L01-ACT-053').expected.negative,'NE VAME VAMAZAMU');
assert.ok(d10.every(x=>x.hnk==='EN KU VALA KE'));
assert.ok(d10.every(x=>x.hnk_context==='VAMUSARO'));
assert.equal(p05.drills.find(x=>x.id==='L01-ACT-059').response_schema,'[ACTIVITY_DESCRIPTION]');

assert.equal(p05Batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(p05Batch.decisions_requested.length,5);
assert.equal(p05Batch.projected_effect_if_all_approved.L01_Activation_VALIDATED_after,60);
assert.equal(p05Batch.projected_effect_if_all_approved.foundation_VALIDATED_after,60);
assert.equal(p05Batch.projected_effect_if_all_approved.new_lexical_forms,0);
assert.equal(p05Batch.projected_effect_if_all_approved.language_authority_promotions,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_Activation_authored,12);
assert.equal(v.L01_Activation_validated,48);
assert.equal(v.L01_Activation_authored_or_better,60);
assert.equal(v.L01_Activation_remaining_unimplemented,12);
assert.equal(v.L01_Activation_foundation_authored_or_better,60);
assert.equal(v.L01_Activation_foundation_percent,100);
assert.deepEqual(v.L01_Activation_authored_slots,Array.from({length:12},(_,i)=>i+49));
assert.deepEqual(v.L01_Activation_validated_slots,Array.from({length:48},(_,i)=>i+1));

console.log('PASS SWHNK-L01-ACTIVATION-PIPELINE-V5');
console.log('P01-P04 VALIDATED 48/72; P05 AUTHORED 12/12; foundation 60/60 authored-or-better; 60/72 Activation mature; no historical reconstruction or authority inflation.');
