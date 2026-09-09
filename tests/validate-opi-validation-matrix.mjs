import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const locativeBatch = await json('curriculum/cycle-01/L01-kether/validation/locative-question-human-promotion-batch.v1.json');
const locativeTransition = await json('curriculum/cycle-01/L01-kether/validation/opi-004-005.validated-transition.v1.json');
const contentBatch = await json('curriculum/cycle-01/L01-kether/validation/content-question-human-promotion-batch.v1.json');
const contentTransition = await json('curriculum/cycle-01/L01-kether/validation/opi-006-008.validated-transition.v1.json');
const batch3Selection = await json('curriculum/cycle-01/L01-kether/validation/validation-batch-3-selection.v1.json');
const opi10Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-010-contextual-equivalence-human-batch.v1.json');
const opi2Design = await json('curriculum/cycle-01/L01-kether/authoring/opi-002-possession-existential-negative-design.v1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_4_OF_10_VALIDATED');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.equal(matrix.reviewed_slots.length, 10);
assert.equal(matrix.reviewed_hold_slots.length, 6);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008']);
assert.equal(matrix.summary.authored_or_better, 10);
assert.equal(matrix.summary.authored_current_state, 6);
assert.equal(matrix.summary.structural_static_pass, 10);
assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 4);
assert.equal(matrix.summary.validated_percent, 40);
assert.equal(matrix.summary.frozen, 0);
assert.equal(matrix.summary.next_ready_human_candidate, 'L01-OPI-010');
assert.equal(matrix.summary.next_design_candidate, 'L01-OPI-002');
assert.deepEqual(matrix.summary.high_risk_hold, ['L01-OPI-003','L01-OPI-007','L01-OPI-009']);
assert.equal(matrix.batch3_selection, 'validation-batch-3-selection.v1.json');
assert.equal(matrix.prepared_next_human_batch, 'opi-010-contextual-equivalence-human-batch.v1.json');
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-010-CONTEXTUAL-EQUIVALENCE-HUMAN-BATCH-V1');

const validatedCards = matrix.cards.filter(x => x.review_state === 'REVIEWED_VALIDATED');
assert.deepEqual(validatedCards.map(x => x.slot_id), ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008']);
assert.ok(validatedCards.every(x => /^VALIDATED_FOR_L01_V1_1_COURSE_USE/.test(x.validation_state)));
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_HOLD').length, 6);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 6);
assert.equal(bindings.metrics.validated, 4);
assert.equal(bindings.metrics.reviewed, 10);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.metrics.validated_opi, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008']);

assert.equal(locativeBatch.status, 'APPROVED_FOR_SCOPED_COURSE_VALIDATION');
assert.equal(locativeTransition.status, 'APPLIED');
assert.equal(contentBatch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(contentBatch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(contentBatch.applied_effect.L01_OPI_VALIDATED_after, 4);
assert.equal(contentBatch.applied_effect.language_authority_changes, 0);
assert.equal(contentTransition.status, 'APPLIED');
assert.deepEqual(contentTransition.scope, ['L01-OPI-006','L01-OPI-008']);
assert.ok(contentTransition.transitions.every(x => x.after === 'VALIDATED'));
assert.equal(contentTransition.language_authority_effect.VALA, 'CANDIDATE_UNCHANGED');
assert.equal(contentTransition.language_authority_effect.VAMAVALA, 'WATCH_UNCHANGED');
assert.equal(contentTransition.language_authority_effect.KU, 'INFERRED_NOT_CANONICAL');
assert.equal(contentTransition.language_authority_effect.historical_registry_rewritten, false);

assert.equal(batch3Selection.status, 'SELECTION_COMPLETE_HUMAN_APPROVAL_NOT_YET_APPLIED');
assert.equal(batch3Selection.evaluated_candidates[0].slot_id, 'L01-OPI-010');
assert.equal(batch3Selection.evaluated_candidates[0].readiness, 'READY_FOR_SCOPED_HUMAN_EQUIVALENCE_DECISION');
assert.equal(batch3Selection.evaluated_candidates[1].slot_id, 'L01-OPI-002');
assert.equal(batch3Selection.evaluated_candidates[1].readiness, 'DESIGN_REQUIRED_BEFORE_VALIDATION_BATCH');
assert.equal(opi10Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(opi10Batch.projected_effect_if_approved.L01_OPI_validated_after, 5);
assert.equal(opi10Batch.decision_requested.if_approved.VAMUSARO_meaning, 'rest / leisure period UNCHANGED');
assert.equal(opi10Batch.decision_requested.if_approved.weekend_lexeme_created, false);
assert.equal(opi2Design.status, 'DESIGN_REQUIRED_NO_VALIDATION_TRANSITION');
assert.equal(opi2Design.validation_effect.validated, false);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V5');
console.log('10/10 reviewed; 4/10 VALIDATED; OPI10 is the next prepared human batch; OPI2 stays in possession/negative design; 0 FROZEN.');
