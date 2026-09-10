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
const opi2Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-002-negation-candidate-human-batch.v1.json');
const neProposal = await json('proposals/language/HNK_NE_NEGATION_ABSENCE_PROPOSAL_V1.json');
const microgrammar = await json('proposals/language/HNK_NEGATION_EXISTENCE_MICROGRAMMAR_V1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_5_OF_10_VALIDATED');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.equal(matrix.reviewed_slots.length, 10);
assert.equal(matrix.reviewed_hold_slots.length, 5);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.equal(matrix.summary.authored_or_better, 10);
assert.equal(matrix.summary.authored_current_state, 5);
assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 5);
assert.equal(matrix.summary.validated_percent, 50);
assert.equal(matrix.summary.frozen, 0);
assert.equal(matrix.summary.next_ready_human_candidate, 'L01-OPI-002');
assert.deepEqual(matrix.summary.high_risk_hold, ['L01-OPI-003','L01-OPI-007','L01-OPI-009']);
assert.equal(matrix.prepared_next_human_batch, 'opi-002-negation-candidate-human-batch.v1.json');
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-002-NEGATION-CANDIDATE-HUMAN-BATCH-V1');

const validatedCards = matrix.cards.filter(x => x.review_state === 'REVIEWED_VALIDATED');
assert.deepEqual(validatedCards.map(x => x.slot_id), ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_HOLD').length, 5);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 5);
assert.equal(bindings.metrics.validated, 5);
assert.equal(bindings.metrics.frozen, 0);

assert.equal(opi10Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(opi10Transition.status, 'APPLIED');
assert.equal(opi10Transition.after, 'VALIDATED');
assert.equal(opi10Transition.course_contract.must_not_translate_VAMUSARO_as_weekend, true);

assert.equal(opi2Design.status, 'DESIGN_COMPLETE_HUMAN_DECISION_READY_NO_VALIDATION_TRANSITION');
assert.equal(opi2Design.selected_route.route, 'NOMINAL_INTERVIEW_PLUS_ABSENCE_OPERATOR');
assert.equal(opi2Design.selected_route.negative_answer.form, 'NE VAMAKALA');
assert.equal(opi2Design.validation_effect.validated, false);
assert.equal(opi2Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(opi2Batch.projected_effect_if_all_decisions_approved.L01_OPI_validated_after, 6);
assert.equal(opi2Batch.projected_effect_if_all_decisions_approved.authored_language_candidates_after, 4);
assert.equal(opi2Batch.projected_effect_if_all_decisions_approved.governed_unique_language_assets_after, 35);
assert.equal(neProposal.status, 'AUTHORING_PROPOSAL_NOT_CANON');
assert.equal(neProposal.candidate.form, 'NE');
assert.equal(neProposal.candidate.proposed_authority, 'CANDIDATE');
assert.equal(neProposal.candidate.historical_recovery_claim, false);
assert.deepEqual(neProposal.candidate.glyph_ids, ['G12','G02']);
assert.equal(microgrammar.status, 'AUTHORING_PROPOSAL_NOT_CANON');
assert.equal(microgrammar.question_strategy.HAVE_lexeme_required, false);
assert.equal(microgrammar.answer_strategy.negative.form, 'NE VAMAKALA');

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V7');
console.log('10/10 reviewed; 5/10 VALIDATED; OPI2 nominal+NE design is prepared for explicit human approval; 0 FROZEN.');
