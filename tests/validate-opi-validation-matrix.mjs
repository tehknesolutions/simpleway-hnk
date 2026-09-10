import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const opi10Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-010-contextual-equivalence-human-batch.v1.json');
const opi10Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-010.validated-transition.v1.json');
const opi2Design = await json('curriculum/cycle-01/L01-kether/authoring/opi-002-possession-existential-negative-design.v1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_5_OF_10_VALIDATED');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.equal(matrix.reviewed_slots.length, 10);
assert.equal(matrix.reviewed_hold_slots.length, 5);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.equal(matrix.summary.authored_or_better, 10);
assert.equal(matrix.summary.authored_current_state, 5);
assert.equal(matrix.summary.structural_static_pass, 10);
assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 5);
assert.equal(matrix.summary.validated_percent, 50);
assert.equal(matrix.summary.frozen, 0);
assert.equal(matrix.summary.next_design_candidate, 'L01-OPI-002');
assert.deepEqual(matrix.summary.high_risk_hold, ['L01-OPI-003','L01-OPI-007','L01-OPI-009']);
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-002-POSSESSION-NEGATION-DESIGN-V1');

const validatedCards = matrix.cards.filter(x => x.review_state === 'REVIEWED_VALIDATED');
assert.deepEqual(validatedCards.map(x => x.slot_id), ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_HOLD').length, 5);
const opi10 = matrix.cards.find(x => x.slot_id === 'L01-OPI-010');
assert.equal(opi10.review_state, 'REVIEWED_VALIDATED');
assert.equal(opi10.semantic_fidelity, 'APPROXIMATE_CONTEXTUAL_EQUIVALENT');
assert.match(opi10.boundary, /not weekend/);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 5);
assert.equal(bindings.metrics.validated, 5);
assert.equal(bindings.metrics.reviewed, 10);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.metrics.validated_opi, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);

assert.equal(opi10Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(opi10Batch.decision.decision, 'APPROVED_SCOPED');
assert.equal(opi10Batch.decision.applied_effect.VAMUSARO_meaning, 'rest / leisure period UNCHANGED');
assert.equal(opi10Batch.decision.applied_effect.weekend_lexeme_created, false);
assert.equal(opi10Batch.applied_effect.L01_OPI_validated_after, 5);
assert.equal(opi10Transition.status, 'APPLIED');
assert.equal(opi10Transition.slot_id, 'L01-OPI-010');
assert.equal(opi10Transition.after, 'VALIDATED');
assert.equal(opi10Transition.course_contract.must_display_approximation, true);
assert.equal(opi10Transition.course_contract.must_not_translate_VAMUSARO_as_weekend, true);

assert.equal(opi2Design.status, 'DESIGN_REQUIRED_NO_VALIDATION_TRANSITION');
assert.equal(opi2Design.validation_effect.validated, false);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V6');
console.log('10/10 reviewed; 5/10 VALIDATED; OPI10 validated only as approximate contextual equivalent; OPI2 is next design gate; 0 FROZEN.');
