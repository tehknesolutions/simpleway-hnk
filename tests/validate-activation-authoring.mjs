import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const pipeline = await json('curriculum/cycle-01/L01-kether/authoring/activation-72.pipeline.v1.json');
const p01 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p01.v1.json');
const p02 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p02.v1.json');
const p03 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p03.v1.json');
const p03Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p03-human-batch.v1.json');
const p03Transition = await json('curriculum/cycle-01/L01-kether/validation/activation-p03.validated-transition.v1.json');
const p04 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p04.v1.json');
const p04Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p04-human-batch.v1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');

assert.equal(pipeline.target, 72);
assert.equal(pipeline.historical_evidence.historical_drill_count, 72);
assert.equal(pipeline.historical_evidence.raw_drill_payload_recovered, false);
assert.equal(pipeline.historical_evidence.content_reconstruction_claim, false);
assert.equal(pipeline.allocation.foundation.slots, 60);
assert.equal(pipeline.allocation.integrative.slots, 12);

for (const [pack, start, end] of [[p01,1,12],[p02,13,24],[p03,25,36],[p04,37,48]]) {
  assert.deepEqual(pack.slots, [start,end]);
  assert.equal(pack.drills.length, 12);
  assert.equal(pack.metrics.new_HNK_lexical_forms, 0);
  assert.equal(pack.historical_claim.these_are_recovered_v1_drills, false);
}

assert.equal(p03Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(p03Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(p03Transition.status, 'APPLIED');
assert.equal(p03Transition.lesson_activation_after.VALIDATED, 36);
assert.equal(p03Transition.authority_effect.KUVAN, 'CANDIDATE_UNCHANGED');
assert.equal(p03Transition.authority_effect.VALA, 'CANDIDATE_UNCHANGED');
assert.equal(p03Transition.authority_effect.generic_DO_verb_created, false);
assert.equal(p03Transition.authority_effect.language_authority_promotions, 0);

assert.equal(p04.pack_id, 'SWHNK-L01-ACTIVATION-P04-037-048-AUTHORING-V1');
assert.equal(p04.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p04.source_opi, ['L01-OPI-007','L01-OPI-008']);
assert.deepEqual(p04.drills.map(x => x.id), Array.from({length:12}, (_,i) => `L01-ACT-${String(i+37).padStart(3,'0')}`));
assert.equal(p04.metrics.AUTHORED, 12);
assert.equal(p04.metrics.VALIDATED, 0);
assert.equal(p04.metrics.FROZEN, 0);

const opi7 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-007');
const opi8 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-008');
assert.equal(opi7.implementation_state, 'VALIDATED');
assert.equal(opi8.implementation_state, 'VALIDATED');

const opi7Drills = p04.drills.filter(x => x.source_opi === 'L01-OPI-007');
const opi8Drills = p04.drills.filter(x => x.source_opi === 'L01-OPI-008');
assert.equal(opi7Drills.length, 6);
assert.equal(opi8Drills.length, 6);
assert.ok(opi7Drills.every(x => Array.isArray(x.hnk) && x.hnk.length === 2));
assert.ok(opi7Drills.every(x => Array.isArray(x.authority_notes) && x.authority_notes.length > 0));
assert.ok(opi8Drills.every(x => x.hnk === 'EN KU VAMAVALA KE'));
assert.equal(p04.drills.find(x => x.id === 'L01-ACT-041').response_schema, '[PLACE] + [PERSON_OR_PEOPLE]');
assert.equal(p04.drills.find(x => x.id === 'L01-ACT-047').response_schema, '[HOBBY_OR_PLEASURE_ACTIVITY]');

assert.equal(p04Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(p04Batch.decisions_requested.length, 5);
assert.equal(p04Batch.projected_effect_if_all_approved.L01_Activation_VALIDATED_after, 48);
assert.equal(p04Batch.projected_effect_if_all_approved.new_lexical_forms, 0);
assert.equal(p04Batch.projected_effect_if_all_approved.language_authority_promotions, 0);

assert.equal(evidence.validation_evidence.L01_Activation_authored, 12);
assert.equal(evidence.validation_evidence.L01_Activation_validated, 36);
assert.equal(evidence.validation_evidence.L01_Activation_authored_or_better, 48);
assert.equal(evidence.validation_evidence.L01_Activation_remaining_unimplemented, 24);
assert.deepEqual(evidence.validation_evidence.L01_Activation_authored_slots, Array.from({length:12}, (_,i) => i+37));
assert.deepEqual(evidence.validation_evidence.L01_Activation_validated_slots, Array.from({length:36}, (_,i) => i+1));

console.log('PASS SWHNK-L01-ACTIVATION-PIPELINE-V4');
console.log('P01-P03 VALIDATED 36/72; P04 AUTHORED 12/12; 48/72 Activation authored-or-better; no historical reconstruction or authority inflation.');
