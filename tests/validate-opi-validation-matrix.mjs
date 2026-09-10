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

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_9_OF_10_VALIDATED_OPI7_FINAL_BATCH_PREPARED');
assert.equal(matrix.cards.length, 10);
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
assert.equal(matrix.prepared_human_batch, 'opi-007-final-human-batch.v1.json');
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-007-FINAL-HUMAN-BATCH-V1');

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
assert.equal(card7.review_state, 'REVIEWED_HOLD_FINAL_BATCH_PREPARED');
assert.equal(card7.validation_state, 'AUTHORED_HOLD');
assert.equal(card7.prepared_human_batch, 'opi-007-final-human-batch.v1.json');
assert.equal(card7.risk, 'VERY_HIGH');
assert.ok(card7.blockers.some(x => x.includes('VANI remains recovered WATCH with meaning null')));
assert.ok(card7.blockers.some(x => x.includes('ON=GATE')));
assert.equal(card7.projected_if_approved.L01_validated, 10);
assert.equal(card7.projected_if_approved.language_authority_promotions, 0);
assert.equal(card7.projected_if_approved.master_lexicon_meaning_changes, 0);

assert.equal(opi7Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(opi7Batch.risk, 'VERY_HIGH');
assert.equal(opi7Batch.decisions_requested.length, 5);
assert.equal(opi7Batch.projected_effect_if_all_approved.L01_OPI_validated_after, 10);
assert.equal(opi7Batch.projected_effect_if_all_approved.language_authority_promotions, 0);
assert.equal(opi7Batch.projected_effect_if_all_approved.new_lexical_forms, 0);
assert.equal(opi7Batch.projected_effect_if_all_approved.master_lexicon_meaning_changes, 0);
assert.equal(opi7Batch.projected_effect_if_all_approved.new_WITH_lexeme, false);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 1);
assert.equal(bindings.metrics.validated, 9);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.metrics.reviewed_hold_opi, ['L01-OPI-007']);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V15');
console.log('10/10 reviewed; 9/10 validated; OPI7 final human batch is prepared but not applied; VANI meaning=null, ON=GATE and all authority boundaries remain locked.');
