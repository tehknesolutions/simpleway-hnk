import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const activationPipeline = await json('curriculum/cycle-01/L01-kether/authoring/activation-72.pipeline.v1.json');
const p03Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p03-human-batch.v1.json');
const p03Transition = await json('curriculum/cycle-01/L01-kether/validation/activation-p03.validated-transition.v1.json');
const p04 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p04.v1.json');
const p04Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p04-human-batch.v1.json');
const numeralBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const vAni = await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const kuon = await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');

assert.equal(contract.target_total, 1008);

const simulated = new Map();
for (const override of evidence.overrides) {
  const { lesson, category, range } = override.selector;
  for (let i = range[0]; i <= range[1]; i++) simulated.set(`${lesson}/${category}/${i}`, override);
}
const values = [...simulated.values()];
assert.equal(values.filter(x => x.evidence_state === 'SOURCE_CONFIRMED_FROZEN').length, 82);
assert.equal(values.filter(x => x.implementation_state === 'AUTHORED').length, 12);
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 46);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 58);
assert.equal(values.filter(x => x.implementation_state === 'FROZEN').length, 0);
assert.equal(values.filter(x => x.scaffolded).length, 82);

assert.equal(bindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_COMPLETE_10_OF_10_VALIDATED');
assert.equal(bindings.metrics.validated, 10);
assert.equal(matrix.summary.validation_phase, 'COMPLETE');
assert.equal(matrix.summary.validated, 10);
assert.equal(activationPipeline.target, 72);
assert.equal(activationPipeline.historical_evidence.raw_drill_payload_recovered, false);
assert.equal(activationPipeline.allocation.foundation.slots, 60);
assert.equal(activationPipeline.allocation.integrative.slots, 12);

assert.equal(p03Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(p03Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(p03Transition.status, 'APPLIED');
assert.equal(p03Transition.lesson_activation_after.VALIDATED, 36);
assert.equal(p03Transition.global_after.VALIDATED, 46);
assert.equal(p03Transition.authority_effect.language_authority_promotions, 0);

assert.equal(p04.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.deepEqual(p04.slots, [37,48]);
assert.deepEqual(p04.source_opi, ['L01-OPI-007','L01-OPI-008']);
assert.equal(p04.drills.length, 12);
assert.equal(p04.metrics.new_HNK_lexical_forms, 0);
assert.equal(p04Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(p04Batch.projected_effect_if_all_approved.L01_Activation_VALIDATED_after, 48);

const v = evidence.validation_evidence;
assert.equal(v.L01_Activation_target, 72);
assert.equal(v.L01_Activation_authored, 12);
assert.equal(v.L01_Activation_validated, 36);
assert.equal(v.L01_Activation_frozen, 0);
assert.equal(v.L01_Activation_authored_or_better, 48);
assert.equal(v.L01_Activation_remaining_unimplemented, 24);
assert.deepEqual(v.L01_Activation_authored_slots, Array.from({length:12}, (_,i) => i+37));
assert.deepEqual(v.L01_Activation_validated_slots, Array.from({length:36}, (_,i) => i+1));
assert.equal(v.prepared_activation_batch, '../curriculum/cycle-01/L01-kether/validation/activation-p04-human-batch.v1.json');

assert.equal(numeralBatch.status, 'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after, 45);
assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.dependency.authority, 'GATE');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V15');
console.log('Cycle 1: 12 AUTHORED + 46 VALIDATED = 58 authored-or-better slots; L01 OPI 10/10 VALIDATED; Activation P01-P03 VALIDATED 36/72 and P04 AUTHORED 12/12; historical evidence remains 82.');
