import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const snapshot = await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V9.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_ACTIVE_0_OF_10_VALIDATED');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.deepEqual(matrix.cards.map(x => x.readiness_rank).sort((a,b)=>a-b), [1,2,3,4,5,6,7,8,9,10]);
assert.ok(matrix.cards.every(x => x.structural_encoding === 'STATIC_PASS'));
assert.ok(matrix.cards.every(x => x.validation_state === 'AUTHORED_HOLD'));
assert.equal(matrix.summary.authored, 10);
assert.equal(matrix.summary.structural_static_pass, 10);
assert.equal(matrix.summary.validated, 0);
assert.equal(matrix.summary.frozen, 0);
assert.equal(matrix.summary.first_validation_candidate, 'L01-OPI-001');
assert.equal(matrix.summary.validation_order[0], 'L01-OPI-001');
assert.equal(matrix.summary.validation_order.at(-1), 'L01-OPI-007');

assert.equal(bindings.metrics.authored, 10);
assert.equal(bindings.metrics.validated, 0);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.remaining_missing_opi, []);

const opi1 = matrix.cards.find(x => x.slot_id === 'L01-OPI-001');
assert.equal(opi1.origin_class, 'RECOVERED_PHRASE_APPROXIMATE');
assert.equal(opi1.authority_risk, 'LOW');
assert.equal(opi1.next_action, 'HUMAN_SEMANTIC_REVIEW_AND_TOKEN_ALIGNMENT');

const opi7 = matrix.cards.find(x => x.slot_id === 'L01-OPI-007');
assert.equal(opi7.semantic_risk, 'VERY_HIGH');
assert.ok(opi7.blockers.some(x => x.includes('meaning null')));
assert.ok(opi7.blockers.some(x => x.includes('ON=GATE')));

assert.equal(snapshot.L01.opi.AUTHORED, 10);
assert.equal(snapshot.L01.opi.percent, 100);
assert.equal(snapshot.validation_summary.whole_slot_validated, 0);
assert.equal(snapshot.validation_summary.whole_slot_frozen, 0);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
console.log('10/10 authored; validation queue locked; OPI001 first, OPI007 last; no semantic promotion implied.');
