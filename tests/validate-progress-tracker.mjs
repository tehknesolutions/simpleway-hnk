import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const numeralBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const ageBatch = await json('curriculum/cycle-01/L01-kether/validation/opi-003-age-cardinal-human-batch.v1.json');
const ageTransition = await json('curriculum/cycle-01/L01-kether/validation/opi-003.validated-transition.v1.json');
const opi1Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-001-whole-utterance-human-batch.v1.json');
const opi1Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-001.validated-transition.v1.json');
const cardinal = await json('proposals/language/HNK_CARDINAL_10_99_POSITIONAL_COMPOSITION_V1.json');
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
assert.equal(values.filter(x => x.implementation_state === 'AUTHORED').length, 1);
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 9);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 10);
assert.equal(values.filter(x => x.implementation_state === 'FROZEN').length, 0);
assert.equal(values.filter(x => x.scaffolded).length, 82);

assert.equal(bindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_ACTIVE_9_OF_10_VALIDATED');
assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 1);
assert.equal(bindings.metrics.validated, 9);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.metrics.validated_opi, ['L01-OPI-001','L01-OPI-002','L01-OPI-003','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']);
assert.deepEqual(bindings.metrics.reviewed_hold_opi, ['L01-OPI-007']);

const opi1 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-001');
assert.equal(opi1.implementation_state, 'VALIDATED');
assert.equal(opi1.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_AS_RECOVERED_WHOLE_UTTERANCE');
assert.equal(opi1.phrase_id, 'PHR-001');
assert.equal(opi1.phrase_certainty, 'APPROXIMATE_UNCHANGED');
assert.equal(opi1.token_semantics.YA, null);
assert.equal(opi1.token_semantics.ES, null);
assert.equal(opi1.answer_pattern.pattern, '[PERSONAL_NAME]');
assert.equal(opi1.answer_pattern.status, 'VALIDATED_FOR_L01_V1_1_COURSE_USE');

assert.equal(opi1Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(opi1Batch.decisions.length, 3);
assert.ok(opi1Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(opi1Batch.applied_effect.L01_OPI_validated_after, 9);
assert.equal(opi1Batch.applied_effect.token_gloss_promotions, 0);
assert.equal(opi1Batch.applied_effect.language_authority_promotions, 0);
assert.equal(opi1Transition.status, 'APPLIED');
assert.equal(opi1Transition.after, 'VALIDATED');
assert.equal(opi1Transition.token_boundary.YA_meaning, null);
assert.equal(opi1Transition.token_boundary.ES_meaning, null);
assert.equal(opi1Transition.token_boundary.token_gloss_promotions, 0);
assert.equal(opi1Transition.language_authority_effect, 'NONE');

const opi3 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-003');
assert.equal(opi3.implementation_state, 'VALIDATED');
assert.deepEqual(opi3.lexeme_authority, ['WATCH']);
assert.equal(opi3.answer_pattern.pattern, '[CARDINAL_0_99]');
assert.equal(opi3.answer_pattern.year_unit, null);
assert.deepEqual(opi3.answer_pattern.examples, {8:'TOMI',18:'DUVE TOMI',42:'LUSO HOYU'});
assert.equal(opi3.cardinal_rule.scope, 'CARDINAL_10_99_NUMERIC_CONTEXT_ONLY');
assert.equal(opi3.numeral_authority, 'CANDIDATE_UNCHANGED');
assert.equal(ageBatch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(ageTransition.status, 'APPLIED');
assert.equal(cardinal.status, 'APPROVED_FOR_SCOPED_L01_OPI003_NUMERIC_CONTEXT_NOT_GLOBAL_CANON');

assert.equal(numeralBatch.status, 'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.candidates.length, 10);
assert.ok(numeralBatch.candidates.every(x => x.authority === 'CANDIDATE'));
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
assert.equal(evidence.validation_evidence.L01_OPI_authored_current_state, 1);
assert.equal(evidence.validation_evidence.L01_OPI_validated, 9);
assert.deepEqual(evidence.validation_evidence.L01_OPI_hold_slots, ['L01-OPI-007']);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V9');
console.log('1008 slots locked; 9/10 L01 OPI validated; OPI1 validated as recovered whole utterance with YA/ES unresolved; only OPI7 remains AUTHORED-HOLD.');
