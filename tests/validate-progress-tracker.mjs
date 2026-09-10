import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const opi10Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-010-contextual-equivalence-human-batch.v1.json');
const opi10Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-010.validated-transition.v1.json');
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
assert.equal(values.filter(x => x.implementation_state === 'AUTHORED').length, 5);
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 5);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 10);
assert.equal(values.filter(x => x.implementation_state === 'FROZEN').length, 0);
assert.equal(values.filter(x => x.scaffolded).length, 82);

assert.equal(bindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_ACTIVE_5_OF_10_VALIDATED');
assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 5);
assert.equal(bindings.metrics.validated, 5);
assert.equal(bindings.metrics.frozen, 0);
assert.equal(bindings.metrics.reviewed, 10);
assert.deepEqual(bindings.metrics.validated_opi, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.deepEqual(bindings.remaining_missing_opi, []);

const opi10 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-010');
assert.equal(opi10.implementation_state, 'VALIDATED');
assert.equal(opi10.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_AS_APPROXIMATE_CONTEXTUAL_EQUIVALENT');
assert.equal(opi10.hnk_context, 'VAMUSARO');
assert.equal(opi10.context_authority, 'FROZEN');
assert.equal(opi10.context_meaning.en, 'rest / leisure period');
assert.equal(opi10.weekend_translation_claim, false);
assert.equal(opi10.semantic_fidelity, 'APPROXIMATE_CONTEXTUAL_EQUIVALENT');
assert.deepEqual(opi10.authored_candidate_authority, ['CANDIDATE']);
assert.equal(opi10.language_authority_effect, 'NONE');

assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 5);
assert.equal(matrix.summary.validated_percent, 50);
assert.equal(matrix.summary.authored_current_state, 5);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_VALIDATED').length, 5);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_HOLD').length, 5);

assert.equal(opi10Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(opi10Batch.decision.decision, 'APPROVED_SCOPED');
assert.equal(opi10Batch.decision.applied_effect.VAMUSARO_authority, 'FROZEN_UNCHANGED');
assert.equal(opi10Batch.decision.applied_effect.VAMUSARO_meaning, 'rest / leisure period UNCHANGED');
assert.equal(opi10Batch.decision.applied_effect.weekend_lexeme_created, false);
assert.equal(opi10Batch.decision.applied_effect.VALA_authority, 'CANDIDATE_UNCHANGED');
assert.equal(opi10Batch.applied_effect.L01_OPI_validated_after, 5);
assert.equal(opi10Batch.applied_effect.language_authority_changes, 0);
assert.equal(opi10Transition.status, 'APPLIED');
assert.equal(opi10Transition.after, 'VALIDATED');
assert.equal(opi10Transition.semantic_fidelity, 'APPROXIMATE_CONTEXTUAL_EQUIVALENT');
assert.equal(opi10Transition.course_contract.must_not_translate_VAMUSARO_as_weekend, true);
assert.equal(opi10Transition.language_authority_effect.VAMUSARO, 'FROZEN_UNCHANGED');
assert.equal(opi10Transition.language_authority_effect.VALA, 'CANDIDATE_UNCHANGED');

assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(vAni.boundaries.modify_master_lexicon_meaning, false);
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.dependency.authority, 'GATE');

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 3);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN','VALA','KUON']);
assert.equal(lex.governed_unique_language_assets, 34);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 23.6111);
assert.equal(evidence.validation_evidence.L01_OPI_reviewed, 10);
assert.equal(evidence.validation_evidence.L01_OPI_authored_or_better, 10);
assert.equal(evidence.validation_evidence.L01_OPI_authored_current_state, 5);
assert.equal(evidence.validation_evidence.L01_OPI_validated, 5);
assert.deepEqual(evidence.validation_evidence.L01_OPI_validated_slots, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V4');
console.log('1008 slots locked; L01 OPI 10 authored-or-better, 5 VALIDATED, 5 AUTHORED-HOLD, 0 FROZEN; weekend approximation and language-authority boundaries preserved.');
