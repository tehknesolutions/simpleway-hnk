import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const opi1Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-001-whole-utterance-human-batch.v1.json');
const opi1Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-001.validated-transition.v1.json');
const finalTriage = await json('curriculum/cycle-01/L01-kether/validation/opi-001-and-007-hold-triage.v1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_9_OF_10_VALIDATED_FINAL_HOLD_OPI7');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.equal(matrix.reviewed_slots.length, 10);
assert.equal(matrix.reviewed_hold_slots.length, 1);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-001','L01-OPI-002','L01-OPI-003','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']);
assert.deepEqual(matrix.reviewed_hold_slots, ['L01-OPI-007']);
assert.equal(matrix.summary.authored_or_better, 10);
assert.equal(matrix.summary.authored_current_state, 1);
assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 9);
assert.equal(matrix.summary.validated_percent, 90);
assert.equal(matrix.summary.frozen, 0);
assert.deepEqual(matrix.summary.remaining_hold, ['L01-OPI-007']);
assert.equal(matrix.summary.next_ready_human_candidate, 'L01-OPI-007');
assert.equal(matrix.summary.projected_validated_if_next_batch_approved, 10);
assert.equal(matrix.summary.projected_validated_percent, 100);
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-007-FINAL-HOLD-REVIEW-V1');

const card1 = matrix.cards.find(x => x.slot_id === 'L01-OPI-001');
assert.equal(card1.review_state, 'REVIEWED_VALIDATED');
assert.equal(card1.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_AS_RECOVERED_WHOLE_UTTERANCE');
assert.equal(card1.validation_strategy, 'WHOLE_UTTERANCE_FORMULA_WITHOUT_TOKEN_GLOSS_PROMOTION');
assert.equal(card1.applied_human_batch, 'opi-001-whole-utterance-human-batch.v1.json');
assert.equal(card1.validation_transition, 'opi-001.validated-transition.v1.json');
assert.equal(card1.answer_strategy.schema, '[PERSONAL_NAME]');
assert.ok(card1.boundaries.some(x => x.includes('YA and ES remain semantically unresolved')));
assert.ok(card1.boundaries.some(x => x.includes('No token gloss promotion occurred')));

assert.equal(opi1Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(opi1Batch.decisions.length, 3);
assert.ok(opi1Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(opi1Batch.applied_effect.L01_OPI_validated_after, 9);
assert.equal(opi1Batch.applied_effect.token_gloss_promotions, 0);
assert.equal(opi1Transition.status, 'APPLIED');
assert.equal(opi1Transition.after, 'VALIDATED');
assert.equal(opi1Transition.token_boundary.YA_meaning, null);
assert.equal(opi1Transition.token_boundary.ES_meaning, null);
assert.equal(opi1Transition.language_authority_effect, 'NONE');

const card7 = matrix.cards.find(x => x.slot_id === 'L01-OPI-007');
assert.equal(card7.review_state, 'REVIEWED_HOLD_FINAL');
assert.equal(card7.validation_state, 'AUTHORED_HOLD');
assert.ok(card7.blockers.some(x => x.includes('VANI remains recovered WATCH with meaning null')));
assert.ok(card7.blockers.some(x => x.includes('ON=GATE')));

assert.equal(finalTriage.decision.selected_next, 'L01-OPI-001');
assert.equal(finalTriage.candidates.find(x => x.slot_id === 'L01-OPI-007').risk, 'VERY_HIGH');

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 1);
assert.equal(bindings.metrics.validated, 9);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.metrics.reviewed_hold_opi, ['L01-OPI-007']);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V14');
console.log('10/10 reviewed; 9/10 validated; OPI1 whole-utterance validation applied without token-gloss promotion; OPI7 is the only remaining HOLD.');
