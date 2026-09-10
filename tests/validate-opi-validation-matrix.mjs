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

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_8_OF_10_VALIDATED');
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
assert.deepEqual(matrix.summary.next_system_heavy_triage, ['L01-OPI-001','L01-OPI-007']);
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-001-AND-007-HOLD-TRIAGE-V1');

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
assert.equal(ageBatch.decisions.length, 4);
assert.ok(ageBatch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(ageBatch.applied_effect.L01_OPI_validated_after, 8);
assert.equal(ageBatch.applied_effect.language_authority_promotions, 0);
assert.equal(ageBatch.applied_effect.new_lexical_forms, 0);
assert.equal(ageBatch.applied_effect.governed_unique_language_assets, 45);

assert.equal(ageTransition.status, 'APPLIED');
assert.equal(ageTransition.after, 'VALIDATED');
assert.equal(ageTransition.answer_schema, '[CARDINAL_0_99]');
assert.equal(ageTransition.language_authority_effect.SARASALA, 'WATCH_UNCHANGED');
assert.equal(ageTransition.grammar_effect.cardinal_10_99, 'APPROVED_FOR_NUMERIC_CONTEXT_ONLY');
assert.equal(ageTransition.grammar_effect['100_plus'], 'NOT_GRANTED');
assert.equal(ageTransition.grammar_effect.ordinals, 'NOT_GRANTED');

assert.equal(cardinal.status, 'APPROVED_FOR_SCOPED_L01_OPI003_NUMERIC_CONTEXT_NOT_GLOBAL_CANON');
assert.equal(cardinal.rule.schema, 'DIGIT_TENS DIGIT_UNITS');
assert.equal(cardinal.rule.new_lexeme_required, false);
assert.equal(cardinal.rule.historical_grammar_claim, false);
assert.equal(cardinal.rule.global_HNK_number_grammar_claim, false);
assert.equal(cardinal.age_application.SARASALA_authority, 'WATCH_UNCHANGED');
assert.equal(cardinal.age_application.OPI3_validation, 'APPLIED');
assert.equal(cardinal.boundaries.global_productivity_granted, false);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 2);
assert.equal(bindings.metrics.validated, 8);
assert.equal(bindings.metrics.frozen, 0);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V12');
console.log('10/10 reviewed; 8/10 validated; OPI3 age/cardinal batch applied with SARASALA=WATCH, numerals=CANDIDATE and 10-99 scope constrained to numeric/cardinal L01 use.');
