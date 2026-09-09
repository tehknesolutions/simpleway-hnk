import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const batch = await json('curriculum/cycle-01/L01-kether/validation/locative-question-human-promotion-batch.v1.json');
const transition = await json('curriculum/cycle-01/L01-kether/validation/opi-004-005.validated-transition.v1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_2_OF_10_VALIDATED');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.equal(matrix.reviewed_slots.length, 10);
assert.equal(matrix.reviewed_hold_slots.length, 8);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-004','L01-OPI-005']);
assert.equal(matrix.summary.authored_or_better, 10);
assert.equal(matrix.summary.authored_current_state, 8);
assert.equal(matrix.summary.structural_static_pass, 10);
assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 2);
assert.equal(matrix.summary.validated_percent, 20);
assert.equal(matrix.summary.frozen, 0);
assert.deepEqual(matrix.summary.next_batch_candidates, ['L01-OPI-006','L01-OPI-008']);

const validatedCards = matrix.cards.filter(x => x.review_state === 'REVIEWED_VALIDATED');
assert.deepEqual(validatedCards.map(x => x.slot_id), ['L01-OPI-004','L01-OPI-005']);
assert.ok(validatedCards.every(x => x.validation_state === 'VALIDATED_FOR_L01_V1_1_COURSE_USE'));
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_HOLD').length, 8);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 8);
assert.equal(bindings.metrics.validated, 2);
assert.equal(bindings.metrics.reviewed, 10);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.validated_opi, ['L01-OPI-004','L01-OPI-005']);

assert.equal(batch.status, 'APPROVED_FOR_SCOPED_COURSE_VALIDATION');
assert.deepEqual(batch.approval.decisions_approved, ['DEC-L01-LOC-001','DEC-L01-LOC-002','DEC-L01-LOC-003']);
assert.equal(batch.applied_effect.L01_OPI_VALIDATED_after, 2);
assert.equal(batch.applied_effect.candidate_authorities_changed, 0);
assert.equal(transition.status, 'APPLIED');
assert.ok(transition.slots.every(x => x.to === 'VALIDATED'));
assert.equal(transition.approved_conventions.KUVAN.authority, 'CANDIDATE');
assert.equal(transition.approved_conventions.KUVAN.historical_recovery_claim, false);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V3');
console.log('10/10 reviewed; 2/10 VALIDATED; 8 reviewed HOLD; KUVAN remains CANDIDATE; 0 FROZEN.');
