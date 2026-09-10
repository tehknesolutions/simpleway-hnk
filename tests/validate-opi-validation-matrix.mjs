import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const ageBatch = await json('curriculum/cycle-01/L01-kether/validation/opi-003-age-cardinal-human-batch.v1.json');
const ageTransition = await json('curriculum/cycle-01/L01-kether/validation/opi-003.validated-transition.v1.json');
const cardinal = await json('proposals/language/HNK_CARDINAL_10_99_POSITIONAL_COMPOSITION_V1.json');
const finalTriage = await json('curriculum/cycle-01/L01-kether/validation/opi-001-and-007-hold-triage.v1.json');
const opi1Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-001-whole-utterance-human-batch.v1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_8_OF_10_VALIDATED_OPI1_BATCH_PREPARED');
assert.equal(matrix.cards.length, 10);
assert.equal(new Set(matrix.cards.map(x => x.slot_id)).size, 10);
assert.equal(matrix.reviewed_slots.length, 10);
assert.equal(matrix.reviewed_hold_slots.length, 2);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-002','L01-OPI-003','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']);
assert.deepEqual(matrix.reviewed_hold_slots, ['L01-OPI-001','L01-OPI-007']);
assert.equal(matrix.summary.authored_or_better, 10);
assert.equal(matrix.summary.authored_current_state, 2);
assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 8);
assert.equal(matrix.summary.validated_percent, 80);
assert.equal(matrix.summary.frozen, 0);
assert.deepEqual(matrix.summary.remaining_hold, ['L01-OPI-001','L01-OPI-007']);
assert.equal(matrix.summary.next_ready_human_candidate, 'L01-OPI-001');
assert.equal(matrix.summary.projected_validated_if_next_batch_approved, 9);
assert.equal(matrix.summary.projected_validated_percent, 90);
assert.equal(matrix.prepared_human_batch, 'opi-001-whole-utterance-human-batch.v1.json');
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-001-WHOLE-UTTERANCE-HUMAN-BATCH-V1');

const card1 = matrix.cards.find(x => x.slot_id === 'L01-OPI-001');
assert.equal(card1.review_state, 'REVIEWED_HOLD_BATCH_PREPARED');
assert.equal(card1.validation_state, 'AUTHORED_HOLD');
assert.equal(card1.validation_strategy, 'WHOLE_UTTERANCE_FORMULA_WITHOUT_TOKEN_GLOSS_PROMOTION');
assert.equal(card1.prepared_human_batch, 'opi-001-whole-utterance-human-batch.v1.json');
assert.equal(card1.projected_if_approved.L01_validated, 9);
assert.equal(card1.projected_if_approved.token_gloss_promotions, 0);

const card3 = matrix.cards.find(x => x.slot_id === 'L01-OPI-003');
assert.equal(card3.review_state, 'REVIEWED_VALIDATED');
assert.equal(card3.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_WITH_WATCH_VISIBLE_AND_SCOPED_CARDINALS');
assert.equal(card3.applied_human_batch, 'opi-003-age-cardinal-human-batch.v1.json');
assert.equal(card3.validation_transition, 'opi-003.validated-transition.v1.json');
assert.deepEqual(card3.number_assets, {0:'BIZO',1:'DUVE',2:'HOYU',3:'KETI',4:'LUSO',5:'MUPI',6:'NURA',7:'PEVU',8:'TOMI',9:'ZOKA'});
assert.deepEqual(card3.answer_strategy.examples, {8:'TOMI',18:'DUVE TOMI',42:'LUSO HOYU'});
assert.equal(card3.answer_strategy.year_unit, null);
assert.ok(card3.boundaries.some(x => x.includes('SARASALA remains WATCH')));
assert.ok(card3.boundaries.some(x => x.includes('Numerals remain CANDIDATE')));

assert.equal(ageBatch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(ageTransition.status, 'APPLIED');
assert.equal(ageTransition.after, 'VALIDATED');
assert.equal(cardinal.status, 'APPROVED_FOR_SCOPED_L01_OPI003_NUMERIC_CONTEXT_NOT_GLOBAL_CANON');
assert.equal(cardinal.boundaries.global_productivity_granted, false);

assert.equal(finalTriage.status, 'COMPLETE_OPI001_SELECTED_NEXT');
assert.equal(finalTriage.decision.selected_next, 'L01-OPI-001');
assert.equal(finalTriage.candidates.find(x => x.slot_id === 'L01-OPI-001').safe_validation_route, 'WHOLE_UTTERANCE_FORMULA_WITHOUT_TOKEN_GLOSS_PROMOTION');
assert.equal(finalTriage.candidates.find(x => x.slot_id === 'L01-OPI-007').risk, 'VERY_HIGH');

assert.equal(opi1Batch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(opi1Batch.decisions_requested.length, 3);
assert.equal(opi1Batch.projected_effect_if_all_approved.L01_OPI_validated_after, 9);
assert.equal(opi1Batch.projected_effect_if_all_approved.token_gloss_promotions, 0);
assert.equal(opi1Batch.projected_effect_if_all_approved.new_lexical_forms, 0);
assert.equal(opi1Batch.source_basis.phrase_id, 'PHR-001');
assert.equal(opi1Batch.source_basis.certainty, 'APPROXIMATE');

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 2);
assert.equal(bindings.metrics.validated, 8);
assert.equal(bindings.metrics.frozen, 0);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V13');
console.log('10/10 reviewed; 8/10 validated; OPI1 whole-utterance validation is prepared but not applied; YA/ES remain unresolved and no token gloss promotion is allowed.');
