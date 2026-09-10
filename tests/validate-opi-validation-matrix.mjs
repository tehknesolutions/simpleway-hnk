import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const opi9Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-009-preference-negation-human-batch.v1.json');
const opi9Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-009.validated-transition.v1.json');
const nePromotion = await json('proposals/language/HNK_NE_PROMOTION_RECORD_V1.json');
const nePredicate = await json('proposals/language/HNK_NE_PREDICATE_NEGATION_SCOPED_EXTENSION_V1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_7_OF_10_VALIDATED');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.equal(matrix.reviewed_slots.length, 10);
assert.equal(matrix.reviewed_hold_slots.length, 3);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']);
assert.equal(matrix.summary.authored_or_better, 10);
assert.equal(matrix.summary.authored_current_state, 3);
assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 7);
assert.equal(matrix.summary.validated_percent, 70);
assert.equal(matrix.summary.frozen, 0);
assert.deepEqual(matrix.summary.remaining_hold, ['L01-OPI-001','L01-OPI-003','L01-OPI-007']);
assert.deepEqual(matrix.summary.next_system_heavy_triage, ['L01-OPI-001','L01-OPI-003','L01-OPI-007']);
assert.equal(matrix.next_gate, 'SWHNK-L01-REMAINING-HOLD-TRIAGE-V1');

const card9 = matrix.cards.find(x => x.slot_id === 'L01-OPI-009');
assert.equal(card9.review_state, 'REVIEWED_VALIDATED');
assert.equal(card9.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_WITH_GATE_WATCH_AND_AUTHORED_NEGATION_VISIBLE');
assert.equal(card9.validation_transition, 'opi-009.validated-transition.v1.json');
assert.equal(card9.answer_strategy.affirmative, 'VAME VAMAZAMU');
assert.equal(card9.answer_strategy.negative, 'NE VAME VAMAZAMU');
assert.ok(card9.boundaries.some(x => x.includes('VAME remains GATE')));
assert.ok(card9.boundaries.some(x => x.includes('VAMAZAMU remains WATCH')));
assert.ok(card9.boundaries.some(x => x.includes('NE remains AUTH-004 CANDIDATE')));

assert.equal(opi9Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(opi9Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(opi9Batch.applied_effect.L01_OPI_validated_after, 7);
assert.equal(opi9Batch.applied_effect.new_lexical_forms, 0);
assert.equal(opi9Batch.applied_effect.language_authority_promotions, 0);
assert.equal(opi9Transition.status, 'APPLIED');
assert.equal(opi9Transition.after, 'VALIDATED');
assert.equal(opi9Transition.language_authority_effect.VAME, 'GATE_UNCHANGED');
assert.equal(opi9Transition.language_authority_effect.VAMAZAMU, 'WATCH_UNCHANGED');
assert.equal(opi9Transition.language_authority_effect.NE, 'CANDIDATE_UNCHANGED');
assert.equal(opi9Transition.grammar_effect.global_predicate_negation_productivity, 'NOT_GRANTED');
assert.equal(nePromotion.authority, 'CANDIDATE');
assert.equal(nePromotion.historical_recovery_claim, false);
assert.equal(nePredicate.status, 'AUTHORING_RULE_PROPOSAL_NOT_CANON');
assert.equal(nePredicate.proposed_extension.global_productivity, false);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 3);
assert.equal(bindings.metrics.validated, 7);
assert.equal(bindings.metrics.frozen, 0);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V10');
console.log('10/10 reviewed; 7/10 VALIDATED; OPI9 scoped preference/negation batch applied with VAME=GATE, VAMAZAMU=WATCH and NE=CANDIDATE unchanged.');
