import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const pipeline = await json('curriculum/cycle-01/L01-kether/authoring/activation-72.pipeline.v1.json');
const pack = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p01.v1.json');
const batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p01-human-batch.v1.json');
const transition = await json('curriculum/cycle-01/L01-kether/validation/activation-p01.validated-transition.v1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');

assert.equal(pipeline.pipeline_id, 'SWHNK-L01-ACTIVATION-72-PIPELINE-V1');
assert.equal(pipeline.status, 'ACTIVE_AUTHORING_PIPELINE');
assert.equal(pipeline.target, 72);
assert.equal(pipeline.historical_evidence.historical_drill_count, 72);
assert.equal(pipeline.historical_evidence.raw_drill_payload_recovered, false);
assert.equal(pipeline.historical_evidence.content_reconstruction_claim, false);
assert.equal(pipeline.allocation.foundation.slots, 60);
assert.equal(pipeline.allocation.integrative.slots, 12);
assert.equal(pipeline.foundation_modes.length, 6);
assert.equal(pipeline.pack_plan.length, 6);
assert.deepEqual(pipeline.pack_plan[0].slots, [1,12]);

// Authoring pack remains immutable evidence of the authored stage.
assert.equal(pack.pack_id, 'SWHNK-L01-ACTIVATION-P01-001-012-AUTHORING-V1');
assert.equal(pack.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(pack.slots, [1,12]);
assert.deepEqual(pack.source_opi, ['L01-OPI-001','L01-OPI-002']);
assert.equal(pack.historical_claim.these_are_recovered_v1_drills, false);
assert.equal(pack.drills.length, 12);
assert.equal(pack.metrics.AUTHORED, 12);
assert.equal(pack.metrics.VALIDATED, 0);
assert.equal(pack.metrics.new_HNK_lexical_forms, 0);

const expectedModes = ['RECOGNIZE_INTENT','REPEAT_FORM','PRODUCE_QUESTION','TRACE_GIDS','PRODUCE_RESPONSE','MICRO_DIALOGUE'];
const opi1Drills = pack.drills.filter(x => x.source_opi === 'L01-OPI-001');
const opi2Drills = pack.drills.filter(x => x.source_opi === 'L01-OPI-002');
assert.equal(opi1Drills.length, 6);
assert.equal(opi2Drills.length, 6);
assert.deepEqual(opi1Drills.map(x => x.mode), expectedModes);
assert.deepEqual(opi2Drills.map(x => x.mode), expectedModes);

const opi1 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-001');
const opi2 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-002');
assert.equal(opi1.implementation_state, 'VALIDATED');
assert.equal(opi2.implementation_state, 'VALIDATED');
assert.ok(opi1Drills.every(x => x.hnk === opi1.hnk_question));
assert.ok(opi2Drills.every(x => x.hnk === opi2.hnk_question));

assert.equal(batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(batch.decisions.length, 5);
assert.ok(batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(batch.applied_effect.L01_Activation_VALIDATED_after, 12);
assert.equal(batch.applied_effect.new_lexical_forms, 0);
assert.equal(batch.applied_effect.language_authority_promotions, 0);
assert.equal(batch.applied_effect.historical_reconstruction_claim, false);

assert.equal(transition.status, 'APPLIED');
assert.deepEqual(transition.scope.slots, [1,12]);
assert.equal(transition.after.VALIDATED, 12);
assert.equal(transition.after.FROZEN, 0);
assert.equal(transition.language_authority_effect, 'NONE');
assert.equal(transition.historical_boundary.these_12_are_historical_reconstructions, false);
assert.equal(transition.visual_boundary.candidate_D_visual_canon_claim, false);
assert.equal(transition.lexical_boundary.new_HNK_lexical_forms, 0);
assert.equal(transition.lexical_boundary.NE_authority, 'CANDIDATE_UNCHANGED');

assert.equal(evidence.validation_evidence.L01_Activation_target, 72);
assert.equal(evidence.validation_evidence.L01_Activation_authored, 0);
assert.equal(evidence.validation_evidence.L01_Activation_validated, 12);
assert.equal(evidence.validation_evidence.L01_Activation_remaining_unimplemented, 60);
assert.deepEqual(evidence.validation_evidence.L01_Activation_validated_slots, [1,2,3,4,5,6,7,8,9,10,11,12]);

console.log('PASS SWHNK-L01-ACTIVATION-P01-VALIDATION-V1');
console.log('Activation P01: 12/12 VALIDATED; historical 72-slot evidence preserved; zero new HNK forms, zero authority promotions, Candidate D remains non-canon.');
