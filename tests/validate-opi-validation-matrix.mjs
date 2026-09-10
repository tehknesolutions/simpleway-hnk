import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const opi2Design = await json('curriculum/cycle-01/L01-kether/authoring/opi-002-possession-existential-negative-design.v1.json');
const opi2Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-002-negation-candidate-human-batch.v1.json');
const opi2Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-002.validated-transition.v1.json');
const neProposal = await json('proposals/language/HNK_NE_NEGATION_ABSENCE_PROPOSAL_V1.json');
const nePromotion = await json('proposals/language/HNK_NE_PROMOTION_RECORD_V1.json');
const microgrammar = await json('proposals/language/HNK_NEGATION_EXISTENCE_MICROGRAMMAR_V1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_6_OF_10_VALIDATED');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.equal(matrix.reviewed_slots.length, 10);
assert.equal(matrix.reviewed_hold_slots.length, 4);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.equal(matrix.summary.authored_or_better, 10);
assert.equal(matrix.summary.authored_current_state, 4);
assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 6);
assert.equal(matrix.summary.validated_percent, 60);
assert.equal(matrix.summary.frozen, 0);
assert.equal(matrix.summary.likely_next_design_candidate, 'L01-OPI-009');
assert.deepEqual(matrix.summary.remaining_hold, ['L01-OPI-001','L01-OPI-003','L01-OPI-007','L01-OPI-009']);
assert.equal(matrix.next_gate, 'SWHNK-L01-VALIDATION-BATCH-4-SELECTION-V1');

const validatedCards = matrix.cards.filter(x => x.review_state === 'REVIEWED_VALIDATED');
assert.deepEqual(validatedCards.map(x => x.slot_id), ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_HOLD').length, 4);

const card2 = matrix.cards.find(x => x.slot_id === 'L01-OPI-002');
assert.equal(card2.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_WITH_AUTHORED_NEGATION');
assert.equal(card2.answer_strategy.affirmative, '[NICKNAME]');
assert.equal(card2.answer_strategy.negative, 'NE VAMAKALA');
assert.ok(card2.boundaries.some(x => x.includes('NE remains AUTH-004 CANDIDATE')));
assert.ok(card2.boundaries.some(x => x.includes('No HAVE verb')));

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 4);
assert.equal(bindings.metrics.validated, 6);
assert.equal(bindings.metrics.frozen, 0);

assert.equal(opi2Design.status, 'DESIGN_COMPLETE_HUMAN_DECISION_READY_NO_VALIDATION_TRANSITION');
assert.equal(opi2Design.selected_route.route, 'NOMINAL_INTERVIEW_PLUS_ABSENCE_OPERATOR');
assert.equal(opi2Design.selected_route.negative_answer.form, 'NE VAMAKALA');
assert.equal(opi2Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(opi2Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(opi2Batch.applied_effect.L01_OPI_validated_after, 6);
assert.equal(opi2Transition.status, 'APPLIED');
assert.equal(opi2Transition.after, 'VALIDATED');
assert.equal(opi2Transition.language_authority_effect.HAVE_verb_created, false);
assert.equal(opi2Transition.language_authority_effect.global_negation_rule_granted, false);

assert.equal(neProposal.status, 'AUTHORING_PROPOSAL_NOT_CANON');
assert.equal(neProposal.candidate.form, 'NE');
assert.equal(neProposal.candidate.proposed_authority, 'CANDIDATE');
assert.equal(neProposal.candidate.historical_recovery_claim, false);
assert.deepEqual(neProposal.candidate.glyph_ids, ['G12','G02']);
assert.equal(nePromotion.status, 'PROMOTED_TO_CANONICAL_AUTHORED_REGISTRY_AS_CANDIDATE');
assert.equal(nePromotion.canonical_id, 'AUTH-004');
assert.equal(nePromotion.authority, 'CANDIDATE');
assert.equal(nePromotion.historical_recovery_claim, false);
assert.equal(microgrammar.question_strategy.HAVE_lexeme_required, false);
assert.equal(microgrammar.answer_strategy.negative.form, 'NE VAMAKALA');

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V8');
console.log('10/10 reviewed; 6/10 VALIDATED; NE is AUTH-004 CANDIDATE; no HAVE calque; four OPI remain HOLD; 0 FROZEN.');
