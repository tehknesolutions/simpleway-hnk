import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const snapshot = await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V9.json');
const locativeBatch = await json('curriculum/cycle-01/L01-kether/validation/locative-question-human-promotion-batch.v1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_ACTIVE_0_OF_10_VALIDATED_3_REVIEWED_HOLD');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.deepEqual(matrix.cards.map(x => x.readiness_rank).sort((a,b)=>a-b), [1,2,3,4,5,6,7,8,9,10]);
assert.ok(matrix.cards.every(x => x.structural_encoding === 'STATIC_PASS'));
assert.ok(matrix.cards.every(x => x.validation_state === 'AUTHORED_HOLD'));
assert.deepEqual(matrix.reviewed_holds, ['L01-OPI-001','L01-OPI-004','L01-OPI-005']);
assert.equal(matrix.summary.authored, 10);
assert.equal(matrix.summary.structural_static_pass, 10);
assert.equal(matrix.summary.reviewed, 3);
assert.equal(matrix.summary.validated, 0);
assert.equal(matrix.summary.frozen, 0);
assert.equal(matrix.summary.next_independent_review_candidate, 'L01-OPI-002');
assert.equal(matrix.summary.pending_review_order[0], 'L01-OPI-002');
assert.equal(matrix.summary.pending_review_order.at(-1), 'L01-OPI-007');

assert.equal(bindings.metrics.authored, 10);
assert.equal(bindings.metrics.validated, 0);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.remaining_missing_opi, []);

const opi1 = matrix.cards.find(x => x.slot_id === 'L01-OPI-001');
assert.equal(opi1.review_state, 'REVIEWED_HOLD');
assert.match(opi1.next_action, /TOKEN_ALIGNMENT/);
const opi4 = matrix.cards.find(x => x.slot_id === 'L01-OPI-004');
const opi5 = matrix.cards.find(x => x.slot_id === 'L01-OPI-005');
assert.equal(opi4.review_state, 'REVIEWED_HOLD_AWAITING_HUMAN_BATCH');
assert.equal(opi5.review_state, 'REVIEWED_HOLD_AWAITING_HUMAN_BATCH');
assert.equal(opi4.next_action, 'LOCATIVE_HUMAN_PROMOTION_BATCH');
assert.equal(opi5.next_action, 'LOCATIVE_HUMAN_PROMOTION_BATCH');

assert.equal(locativeBatch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.deepEqual(locativeBatch.scope, ['L01-OPI-004','L01-OPI-005']);
assert.equal(locativeBatch.projected_effect_if_all_three_decisions_are_approved.L01_OPI_VALIDATED_after, 2);
assert.equal(locativeBatch.projected_effect_if_all_three_decisions_are_approved.candidate_authorities_changed, 0);

const opi7 = matrix.cards.find(x => x.slot_id === 'L01-OPI-007');
assert.ok(opi7.blockers.some(x => x.includes('meaning null')));
assert.ok(opi7.blockers.some(x => x.includes('ON=GATE')));

assert.equal(snapshot.L01.opi.AUTHORED, 10);
assert.equal(snapshot.L01.opi.percent, 100);
assert.equal(snapshot.validation_summary.whole_slot_validated, 0);
assert.equal(snapshot.validation_summary.whole_slot_frozen, 0);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V2');
console.log('10/10 authored; 3 reviewed HOLD; 0 validated; locative human batch prepared; OPI002 next independent review.');
