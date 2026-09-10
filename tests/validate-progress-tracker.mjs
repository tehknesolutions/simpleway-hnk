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
const activationPack = await json('curriculum/cycle-01/L01-kether/authoring/activation-pack-p01.v1.json');
const numeralBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const opi7Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-007-final-human-batch.v1.json');
const opi7Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-007.validated-transition.v1.json');
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
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 10);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 22);
assert.equal(values.filter(x => x.implementation_state === 'FROZEN').length, 0);
assert.equal(values.filter(x => x.scaffolded).length, 82);

assert.equal(bindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_COMPLETE_10_OF_10_VALIDATED');
assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 0);
assert.equal(bindings.metrics.validated, 10);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.metrics.reviewed_hold_opi, []);
assert.equal(matrix.summary.validation_phase, 'COMPLETE');
assert.equal(matrix.summary.validated, 10);
assert.equal(matrix.summary.validated_percent, 100);

const opi7 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-007');
assert.equal(opi7.implementation_state, 'VALIDATED');
assert.deepEqual(opi7.experimental_recovered_form_meaning, [null]);
assert.equal(opi7.semantic_hypothesis.historical_gloss_recovered, false);
assert.equal(opi7.comitative_strategy.overt_with_particle_added, false);
assert.equal(opi7.comitative_strategy.global_comitative_grammar, false);
assert.equal(opi7Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(opi7Batch.applied_effect.language_authority_promotions, 0);
assert.equal(opi7Batch.applied_effect.master_lexicon_meaning_changes, 0);
assert.equal(opi7Batch.applied_effect.new_WITH_lexeme, false);
assert.equal(opi7Transition.after, 'VALIDATED');
assert.equal(opi7Transition.language_authority_effect.VANI, 'WATCH_UNCHANGED_MEANING_NULL');
assert.equal(opi7Transition.language_authority_effect.ON, 'LEX-026_GATE_UNCHANGED');

assert.equal(activationPipeline.target, 72);
assert.equal(activationPipeline.historical_evidence.raw_drill_payload_recovered, false);
assert.equal(activationPipeline.allocation.foundation.slots, 60);
assert.equal(activationPipeline.allocation.integrative.slots, 12);
assert.equal(activationPack.status, 'AUTHORED_12_OF_12_VALIDATION_PENDING');
assert.equal(activationPack.drills.length, 12);
assert.equal(activationPack.metrics.AUTHORED, 12);
assert.equal(activationPack.metrics.VALIDATED, 0);
assert.equal(activationPack.metrics.new_HNK_lexical_forms, 0);

assert.equal(evidence.validation_evidence.L01_Activation_target, 72);
assert.equal(evidence.validation_evidence.L01_Activation_authored, 12);
assert.equal(evidence.validation_evidence.L01_Activation_validated, 0);
assert.equal(evidence.validation_evidence.L01_Activation_frozen, 0);
assert.deepEqual(evidence.validation_evidence.L01_Activation_authored_slots, [1,2,3,4,5,6,7,8,9,10,11,12]);

assert.equal(numeralBatch.status, 'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.applied_effect.recovered_cycle1_forms, 31);
assert.equal(numeralBatch.applied_effect.authored_cycle1_candidates_after, 14);
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after, 45);
assert.equal(numeralBatch.applied_effect.new_FROZEN_forms, 0);
assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.dependency.authority, 'GATE');

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 14);
assert.equal(lex.governed_unique_language_assets, 45);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 31.25);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V11');
console.log('Cycle 1: 12 AUTHORED + 10 VALIDATED current implementation slots; L01 OPI validation is complete 10/10; Activation P01 authors 12/72 new v1.1 drills while historical evidence remains 82 and no historical drill payload is reconstructed.');
