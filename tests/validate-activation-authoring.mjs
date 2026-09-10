import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const pipeline = await json('curriculum/cycle-01/L01-kether/authoring/activation-72.pipeline.v1.json');
const pack = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p01.v1.json');
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
assert.equal(pipeline.progress_policy.slot_state_when_payload_created, 'AUTHORED');
assert.equal(pipeline.progress_policy.historical_evidence_state_remains, 'SOURCE_CONFIRMED_FROZEN');

assert.equal(pack.pack_id, 'SWHNK-L01-ACTIVATION-P01-001-012-AUTHORING-V1');
assert.equal(pack.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(pack.slots, [1,12]);
assert.deepEqual(pack.source_opi, ['L01-OPI-001','L01-OPI-002']);
assert.equal(pack.historical_claim.these_are_recovered_v1_drills, false);
assert.equal(pack.historical_claim.historical_release_only_proves_slot_count, true);
assert.equal(pack.drills.length, 12);
assert.equal(new Set(pack.drills.map(x => x.id)).size, 12);
assert.deepEqual(pack.drills.map(x => x.id), Array.from({length:12}, (_,i) => `L01-ACT-${String(i+1).padStart(3,'0')}`));
assert.equal(pack.metrics.AUTHORED, 12);
assert.equal(pack.metrics.VALIDATED, 0);
assert.equal(pack.metrics.FROZEN, 0);
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
assert.ok(opi1Drills.every(x => JSON.stringify(x.glyph_ids) === JSON.stringify(opi1.glyph_ids)));
assert.ok(opi2Drills.every(x => JSON.stringify(x.glyph_ids) === JSON.stringify(opi2.glyph_ids)));

const opi1Response = pack.drills.find(x => x.id === 'L01-ACT-005');
assert.equal(opi1Response.response_schema, '[PERSONAL_NAME]');
const opi2Response = pack.drills.find(x => x.id === 'L01-ACT-011');
assert.equal(opi2Response.expected.affirmative, '[NICKNAME]');
assert.equal(opi2Response.expected.negative, 'NE VAMAKALA');
assert.deepEqual(opi2Response.negative_glyph_ids, ['G12','G02','G31','G01','G11','G01','G23','G01','G14','G01']);

assert.ok(pack.drills.every(x => Array.isArray(x.authority_notes) && x.authority_notes.length > 0));
assert.ok(pack.drills.every(x => !String(x.teacher_prompt_pt).includes('recuperado v1')));

console.log('PASS SWHNK-L01-ACTIVATION-P01-AUTHORING-V1');
console.log('Activation pipeline locked at 72 slots; P01 authors 12 new v1.1 drills from validated OPI 1-2 with zero new HNK lexical forms and no historical reconstruction claim.');
