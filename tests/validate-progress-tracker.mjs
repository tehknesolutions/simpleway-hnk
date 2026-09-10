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
const p01 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p01.v1.json');
const p01Transition = await json('curriculum/cycle-01/L01-kether/validation/activation-p01.validated-transition.v1.json');
const p02 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p02.v1.json');
const p02Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p02-human-batch.v1.json');
const p02Transition = await json('curriculum/cycle-01/L01-kether/validation/activation-p02.validated-transition.v1.json');
const p03 = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p03.v1.json');
const p03Batch = await json('curriculum/cycle-01/L01-kether/validation/activation-p03-human-batch.v1.json');
const numeralBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const vAni = await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const kuon = await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');

assert.equal(contract.target_total, 1008);

const simulated = new Map();
for (const override of evidence.overrides) {
  const { lesson, category, range } = override.selector;
  const [start, end] = range;
  for (let i = start; i <= end; i++) simulated.set(`${lesson}/${category}/${i}`, override);
}
const values = [...simulated.values()];
assert.equal(values.filter(x => x.evidence_state === 'SOURCE_CONFIRMED_FROZEN').length, 82);
assert.equal(values.filter(x => x.implementation_state === 'AUTHORED').length, 12);
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 34);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 46);
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
assert.equal(p01Transition.status, 'APPLIED');
assert.equal(p01Transition.after.VALIDATED, 12);
assert.equal(p02Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(p02Transition.status, 'APPLIED');
assert.equal(p02Transition.lesson_activation_after.VALIDATED, 24);
assert.equal(p02Transition.authority_effect.language_authority_promotions, 0);
assert.equal(p03.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.equal(p03.drills.length, 12);
assert.deepEqual(p03.slots, [25,36]);
assert.equal(p03Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(p03Batch.projected_effect_if_all_approved.L01_Activation_VALIDATED_after, 36);

assert.equal(evidence.validation_evidence.L01_Activation_target, 72);
assert.equal(evidence.validation_evidence.L01_Activation_authored, 12);
assert.equal(evidence.validation_evidence.L01_Activation_validated, 24);
assert.equal(evidence.validation_evidence.L01_Activation_frozen, 0);
assert.equal(evidence.validation_evidence.L01_Activation_authored_or_better, 36);
assert.equal(evidence.validation_evidence.L01_Activation_remaining_unimplemented, 36);
assert.deepEqual(evidence.validation_evidence.L01_Activation_authored_slots, [25,26,27,28,29,30,31,32,33,34,35,36]);
assert.deepEqual(evidence.validation_evidence.L01_Activation_validated_slots, Array.from({length:24}, (_,i) => i+1));
assert.equal(evidence.validation_evidence.prepared_activation_batch, '../curriculum/cycle-01/L01-kether/validation/activation-p03-human-batch.v1.json');

assert.equal(numeralBatch.status, 'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.applied_effect.recovered_cycle1_forms, 31);
assert.equal(numeralBatch.applied_effect.authored_cycle1_candidates_after, 14);
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after, 45);
assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.dependency.authority, 'GATE');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V14');
console.log('Cycle 1: 12 AUTHORED + 34 VALIDATED = 46 authored-or-better slots; L01 OPI 10/10 VALIDATED; Activation P01-P02 24 VALIDATED + P03 12 AUTHORED; historical evidence remains 82.');
