import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const pipeline = await json('curriculum/cycle-01/L01-kether/authoring/activation-72.pipeline.v1.json');
const p01 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p01.v1.json');
const p01Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p01-human-batch.v1.json');
const p01Transition = await json('curriculum/cycle-01/L01-kether/validation/activation-p01.validated-transition.v1.json');
const p02 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p02.v1.json');
const p02Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p02-human-batch.v1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');

assert.equal(pipeline.pipeline_id, 'SWHNK-L01-ACTIVATION-72-PIPELINE-V1');
assert.equal(pipeline.target, 72);
assert.equal(pipeline.historical_evidence.historical_drill_count, 72);
assert.equal(pipeline.historical_evidence.raw_drill_payload_recovered, false);
assert.equal(pipeline.historical_evidence.content_reconstruction_claim, false);
assert.equal(pipeline.allocation.foundation.slots, 60);
assert.equal(pipeline.allocation.integrative.slots, 12);
assert.equal(pipeline.foundation_modes.length, 6);

const expectedModes = ['RECOGNIZE_INTENT','REPEAT_FORM','PRODUCE_QUESTION','TRACE_GIDS','PRODUCE_RESPONSE','MICRO_DIALOGUE'];

assert.equal(p01.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p01.slots, [1,12]);
assert.equal(p01.drills.length, 12);
assert.equal(p01.metrics.new_HNK_lexical_forms, 0);
assert.equal(p01Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(p01Transition.status, 'APPLIED');
assert.equal(p01Transition.after.VALIDATED, 12);
assert.equal(p01Transition.language_authority_effect, 'NONE');

assert.equal(p02.pack_id, 'SWHNK-L01-ACTIVATION-P02-013-024-AUTHORING-V1');
assert.equal(p02.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p02.slots, [13,24]);
assert.deepEqual(p02.source_opi, ['L01-OPI-003','L01-OPI-004']);
assert.equal(p02.historical_claim.these_are_recovered_v1_drills, false);
assert.equal(p02.drills.length, 12);
assert.deepEqual(p02.drills.map(x => x.id), Array.from({length:12}, (_,i) => `L01-ACT-${String(i+13).padStart(3,'0')}`));
assert.equal(p02.metrics.AUTHORED, 12);
assert.equal(p02.metrics.VALIDATED, 0);
assert.equal(p02.metrics.FROZEN, 0);
assert.equal(p02.metrics.new_HNK_lexical_forms, 0);

const opi3Drills = p02.drills.filter(x => x.source_opi === 'L01-OPI-003');
const opi4Drills = p02.drills.filter(x => x.source_opi === 'L01-OPI-004');
assert.deepEqual(opi3Drills.map(x => x.mode), expectedModes);
assert.deepEqual(opi4Drills.map(x => x.mode), expectedModes);

const opi3 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-003');
const opi4 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-004');
assert.equal(opi3.implementation_state, 'VALIDATED');
assert.equal(opi4.implementation_state, 'VALIDATED');
assert.ok(opi3Drills.every(x => x.hnk === opi3.hnk_question));
assert.ok(opi4Drills.every(x => x.hnk === opi4.hnk_question));
assert.equal(p02.drills.find(x => x.id === 'L01-ACT-017').response_schema, '[CARDINAL_0_99]');
assert.equal(p02.drills.find(x => x.id === 'L01-ACT-023').response_schema, '[PLACE]');

assert.equal(p02Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(p02Batch.decisions_requested.length, 5);
assert.equal(p02Batch.projected_effect_if_all_approved.L01_Activation_VALIDATED_after, 24);
assert.equal(p02Batch.projected_effect_if_all_approved.new_lexical_forms, 0);
assert.equal(p02Batch.projected_effect_if_all_approved.language_authority_promotions, 0);

assert.equal(evidence.validation_evidence.L01_Activation_target, 72);
assert.equal(evidence.validation_evidence.L01_Activation_authored, 12);
assert.equal(evidence.validation_evidence.L01_Activation_validated, 12);
assert.equal(evidence.validation_evidence.L01_Activation_authored_or_better, 24);
assert.equal(evidence.validation_evidence.L01_Activation_remaining_unimplemented, 48);
assert.deepEqual(evidence.validation_evidence.L01_Activation_authored_slots, [13,14,15,16,17,18,19,20,21,22,23,24]);
assert.deepEqual(evidence.validation_evidence.L01_Activation_validated_slots, [1,2,3,4,5,6,7,8,9,10,11,12]);

console.log('PASS SWHNK-L01-ACTIVATION-PIPELINE-V2');
console.log('P01 12/12 VALIDATED; P02 12/12 AUTHORED with validation batch prepared; 24/72 Activation authored-or-better; no historical reconstruction or authority inflation.');
