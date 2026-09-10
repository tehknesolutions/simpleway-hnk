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
const p02Transition = await json('curriculum/cycle-01/L01-kether/validation/activation-p02.validated-transition.v1.json');
const p03 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p03.v1.json');
const p03Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p03-human-batch.v1.json');
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
assert.equal(p01.drills.length, 12);
assert.equal(p01.metrics.new_HNK_lexical_forms, 0);
assert.equal(p01Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(p01Transition.status, 'APPLIED');
assert.equal(p01Transition.after.VALIDATED, 12);

assert.equal(p02.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p02.slots, [13,24]);
assert.deepEqual(p02.source_opi, ['L01-OPI-003','L01-OPI-004']);
assert.equal(p02.drills.length, 12);
assert.equal(p02.metrics.new_HNK_lexical_forms, 0);
assert.equal(p02Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(p02Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(p02Transition.status, 'APPLIED');
assert.equal(p02Transition.after.VALIDATED, 12);
assert.equal(p02Transition.lesson_activation_after.VALIDATED, 24);
assert.equal(p02Transition.authority_effect.SARASALA, 'WATCH_UNCHANGED');
assert.equal(p02Transition.authority_effect.KUVAN, 'CANDIDATE_UNCHANGED');
assert.equal(p02Transition.authority_effect.language_authority_promotions, 0);

assert.equal(p03.pack_id, 'SWHNK-L01-ACTIVATION-P03-025-036-AUTHORING-V1');
assert.equal(p03.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p03.slots, [25,36]);
assert.deepEqual(p03.source_opi, ['L01-OPI-005','L01-OPI-006']);
assert.equal(p03.historical_claim.these_are_recovered_v1_drills, false);
assert.equal(p03.drills.length, 12);
assert.deepEqual(p03.drills.map(x => x.id), Array.from({length:12}, (_,i) => `L01-ACT-${String(i+25).padStart(3,'0')}`));
assert.equal(p03.metrics.AUTHORED, 12);
assert.equal(p03.metrics.VALIDATED, 0);
assert.equal(p03.metrics.FROZEN, 0);
assert.equal(p03.metrics.new_HNK_lexical_forms, 0);

const opi5Drills = p03.drills.filter(x => x.source_opi === 'L01-OPI-005');
const opi6Drills = p03.drills.filter(x => x.source_opi === 'L01-OPI-006');
assert.deepEqual(opi5Drills.map(x => x.mode), expectedModes);
assert.deepEqual(opi6Drills.map(x => x.mode), expectedModes);

const opi5 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-005');
const opi6 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-006');
assert.equal(opi5.implementation_state, 'VALIDATED');
assert.equal(opi6.implementation_state, 'VALIDATED');
assert.ok(opi5Drills.every(x => x.hnk === opi5.hnk_question));
assert.ok(opi6Drills.every(x => x.hnk === opi6.hnk_question));
assert.equal(p03.drills.find(x => x.id === 'L01-ACT-029').response_schema, '[PLACE]');
assert.equal(p03.drills.find(x => x.id === 'L01-ACT-035').response_schema, '[ACTIVITY_DESCRIPTION]');
assert.ok(p03.drills.find(x => x.id === 'L01-ACT-033').authority_notes.some(x => x.includes('Context must remain visible')));

assert.equal(p03Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(p03Batch.decisions_requested.length, 5);
assert.equal(p03Batch.projected_effect_if_all_approved.L01_Activation_VALIDATED_after, 36);
assert.equal(p03Batch.projected_effect_if_all_approved.new_lexical_forms, 0);
assert.equal(p03Batch.projected_effect_if_all_approved.language_authority_promotions, 0);

assert.equal(evidence.validation_evidence.L01_Activation_target, 72);
assert.equal(evidence.validation_evidence.L01_Activation_authored, 12);
assert.equal(evidence.validation_evidence.L01_Activation_validated, 24);
assert.equal(evidence.validation_evidence.L01_Activation_authored_or_better, 36);
assert.equal(evidence.validation_evidence.L01_Activation_remaining_unimplemented, 36);
assert.deepEqual(evidence.validation_evidence.L01_Activation_authored_slots, [25,26,27,28,29,30,31,32,33,34,35,36]);
assert.deepEqual(evidence.validation_evidence.L01_Activation_validated_slots, Array.from({length:24}, (_,i) => i+1));

console.log('PASS SWHNK-L01-ACTIVATION-PIPELINE-V3');
console.log('P01-P02 VALIDATED 24/72; P03 AUTHORED 12/12 with validation batch prepared; 36/72 Activation authored-or-better; no historical reconstruction or authority inflation.');
