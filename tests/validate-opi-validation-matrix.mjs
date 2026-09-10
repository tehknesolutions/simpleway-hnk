import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const opi1Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-001-whole-utterance-human-batch.v1.json');
const opi1Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-001.validated-transition.v1.json');
const opi7Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-007-final-human-batch.v1.json');
const opi7Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-007.validated-transition.v1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_COMPLETE_10_OF_10_REVIEWED_10_OF_10_VALIDATED');
assert.equal(matrix.cards.length, 10);
assert.equal(matrix.reviewed_slots.length, 10);
assert.equal(matrix.validated_slots.length, 10);
assert.equal(matrix.reviewed_hold_slots.length, 0);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-001','L01-OPI-002','L01-OPI-003','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-007','L01-OPI-008','L01-OPI-009','L01-OPI-010']);
assert.deepEqual(matrix.reviewed_hold_slots, []);
assert.equal(matrix.summary.authored_or_better, 10);
assert.equal(matrix.summary.authored_current_state, 0);
assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 10);
assert.equal(matrix.summary.validated_percent, 100);
assert.equal(matrix.summary.frozen, 0);
assert.deepEqual(matrix.summary.remaining_hold, []);
assert.equal(matrix.summary.validation_phase, 'COMPLETE');
assert.equal(matrix.summary.next_phase, 'L01_NON_OPI_CONTENT_IMPLEMENTATION');
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-VALIDATION-COMPLETE-10-OF-10-V1');

const card1 = matrix.cards.find(x => x.slot_id === 'L01-OPI-001');
assert.equal(card1.review_state, 'REVIEWED_VALIDATED');
assert.equal(card1.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_AS_RECOVERED_WHOLE_UTTERANCE');
assert.equal(card1.applied_human_batch, 'opi-001-whole-utterance-human-batch.v1.json');
assert.equal(card1.validation_transition, 'opi-001.validated-transition.v1.json');
assert.equal(opi1Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(opi1Transition.after, 'VALIDATED');
assert.equal(opi1Transition.token_boundary.YA_meaning, null);
assert.equal(opi1Transition.token_boundary.ES_meaning, null);

const card7 = matrix.cards.find(x => x.slot_id === 'L01-OPI-007');
assert.equal(card7.review_state, 'REVIEWED_VALIDATED');
assert.equal(card7.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_WITH_VANI_MEANING_NULL_WATCH_KUON_CANDIDATE_AND_ON_GATE_VISIBLE');
assert.equal(card7.applied_human_batch, 'opi-007-final-human-batch.v1.json');
assert.equal(card7.validation_transition, 'opi-007.validated-transition.v1.json');
assert.equal(card7.risk, 'VERY_HIGH_PRESERVED');
assert.equal(card7.semantic_hypothesis.master_lexicon_meaning, null);
assert.equal(card7.semantic_hypothesis.scope, 'L01-OPI-007_ONLY');
assert.equal(card7.answer_strategy.location, '[PLACE]');
assert.equal(card7.answer_strategy.coresident, '[PERSON_OR_PEOPLE]');
assert.ok(card7.boundaries.some(x => x.includes('VANI remains WATCH')));
assert.ok(card7.boundaries.some(x => x.includes('ON remains GATE')));
assert.ok(card7.boundaries.some(x => x.includes('No WITH lexeme')));

assert.equal(opi7Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(opi7Batch.risk, 'VERY_HIGH_PRESERVED_IN_METADATA');
assert.equal(opi7Batch.decisions.length, 5);
assert.ok(opi7Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(opi7Batch.applied_effect.L01_OPI_validated_after, 10);
assert.equal(opi7Batch.applied_effect.language_authority_promotions, 0);
assert.equal(opi7Batch.applied_effect.new_lexical_forms, 0);
assert.equal(opi7Batch.applied_effect.master_lexicon_meaning_changes, 0);
assert.equal(opi7Batch.applied_effect.new_WITH_lexeme, false);

assert.equal(opi7Transition.status, 'APPLIED');
assert.equal(opi7Transition.after, 'VALIDATED');
assert.equal(opi7Transition.language_authority_effect.VANI, 'WATCH_UNCHANGED_MEANING_NULL');
assert.equal(opi7Transition.language_authority_effect.KUVAN, 'AUTH-001_CANDIDATE_UNCHANGED');
assert.equal(opi7Transition.language_authority_effect.KUON, 'AUTH-003_CANDIDATE_UNCHANGED');
assert.equal(opi7Transition.language_authority_effect.ON, 'LEX-026_GATE_UNCHANGED');
assert.equal(opi7Transition.semantic_effect.historical_VANI_gloss_recovered, false);
assert.equal(opi7Transition.semantic_effect.master_lexicon_meaning_changed, false);
assert.equal(opi7Transition.semantic_effect.new_WITH_lexeme, false);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 0);
assert.equal(bindings.metrics.validated, 10);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.metrics.reviewed_hold_opi, []);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V16');
console.log('10/10 reviewed and VALIDATED for scoped L01 v1.1 course use; 0 FROZEN; OPI7 preserves VANI meaning=null, ON=GATE, authored candidates and no WITH/comitative lexeme.');
