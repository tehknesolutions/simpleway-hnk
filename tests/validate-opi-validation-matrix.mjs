import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const opi2Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-002-negation-candidate-human-batch.v1.json');
const opi2Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-002.validated-transition.v1.json');
const nePromotion = await json('proposals/language/HNK_NE_PROMOTION_RECORD_V1.json');
const batch4 = await json('curriculum/cycle-01/L01-kether/validation/validation-batch-4-selection.v1.json');
const opi9Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-009-preference-negation-human-batch.v1.json');
const nePredicate = await json('proposals/language/HNK_NE_PREDICATE_NEGATION_SCOPED_EXTENSION_V1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_6_OF_10_VALIDATED_BATCH4_PREPARED');
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
assert.equal(matrix.summary.next_ready_human_candidate, 'L01-OPI-009');
assert.deepEqual(matrix.summary.remaining_hold, ['L01-OPI-001','L01-OPI-003','L01-OPI-007','L01-OPI-009']);
assert.deepEqual(matrix.summary.system_heavy_after_batch4, ['L01-OPI-001','L01-OPI-003','L01-OPI-007']);
assert.equal(matrix.batch4_selection, 'validation-batch-4-selection.v1.json');
assert.equal(matrix.prepared_next_human_batch, 'opi-009-preference-negation-human-batch.v1.json');
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-009-PREFERENCE-NEGATION-HUMAN-BATCH-V1');

const card2 = matrix.cards.find(x => x.slot_id === 'L01-OPI-002');
assert.equal(card2.review_state, 'REVIEWED_VALIDATED');
assert.equal(card2.answer_strategy.negative, 'NE VAMAKALA');
assert.ok(card2.boundaries.some(x => x.includes('NE remains AUTH-004 CANDIDATE')));
assert.equal(opi2Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(opi2Transition.status, 'APPLIED');
assert.equal(nePromotion.authority, 'CANDIDATE');
assert.equal(nePromotion.historical_recovery_claim, false);

const card9 = matrix.cards.find(x => x.slot_id === 'L01-OPI-009');
assert.equal(card9.review_state, 'REVIEWED_HOLD');
assert.equal(card9.validation_state, 'AUTHORED_HOLD');
assert.equal(card9.prepared_human_batch, 'opi-009-preference-negation-human-batch.v1.json');
assert.equal(card9.proposed_answers.affirmative, 'VAME VAMAZAMU');
assert.equal(card9.proposed_answers.negative, 'NE VAME VAMAZAMU');

assert.equal(batch4.status, 'SELECTION_COMPLETE_HUMAN_APPROVAL_NOT_YET_APPLIED');
assert.equal(batch4.selected_slot, 'L01-OPI-009');
assert.equal(batch4.projected_effect_if_future_batch_approved.L01_OPI_validated_after, 7);
assert.equal(batch4.projected_effect_if_future_batch_approved.new_lexical_forms, 0);
assert.equal(opi9Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(opi9Batch.projected_effect_if_all_decisions_approved.L01_OPI_validated_after, 7);
assert.equal(opi9Batch.projected_effect_if_all_decisions_approved.language_authority_promotions, 0);
assert.equal(opi9Batch.decisions_requested[0].if_approved.VAME_authority, 'GATE_UNCHANGED');
assert.equal(opi9Batch.decisions_requested[1].if_approved.VAMAZAMU_authority, 'WATCH_UNCHANGED');
assert.equal(opi9Batch.decisions_requested[2].if_approved.NE_authority, 'CANDIDATE_UNCHANGED');
assert.equal(opi9Batch.decisions_requested[2].if_approved.global_predicate_negation_productivity, false);
assert.equal(nePredicate.status, 'AUTHORING_RULE_PROPOSAL_NOT_CANON');
assert.equal(nePredicate.proposed_extension.schema, 'NE + PREDICATE_PHRASE');
assert.equal(nePredicate.proposed_extension.global_productivity, false);
assert.equal(nePredicate.boundaries.does_not_promote_VAME, true);
assert.equal(nePredicate.boundaries.does_not_promote_VAMAZAMU, true);
assert.equal(nePredicate.boundaries.does_not_promote_NE, true);
assert.equal(nePredicate.boundaries.does_not_create_new_lexeme, true);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 4);
assert.equal(bindings.metrics.validated, 6);
assert.equal(bindings.metrics.frozen, 0);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V9');
console.log('10/10 reviewed; 6/10 VALIDATED; OPI9 Batch 4 prepared but not applied; VAME=GATE, VAMAZAMU=WATCH, NE=CANDIDATE preserved.');
