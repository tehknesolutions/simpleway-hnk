import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const ageBatch = await json('curriculum/cycle-01/L01-kether/validation/opi-003-age-cardinal-human-batch.v1.json');
const cardinal = await json('proposals/language/HNK_CARDINAL_10_99_POSITIONAL_COMPOSITION_V1.json');

assert.equal(matrix.matrix_id, 'SWHNK-L01-OPI-VALIDATION-MATRIX-V1');
assert.equal(matrix.status, 'VALIDATION_REVIEW_COMPLETE_10_OF_10_REVIEWED_7_OF_10_VALIDATED_OPI3_BATCH_PREPARED');
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
assert.equal(matrix.summary.next_ready_human_candidate, 'L01-OPI-003');
assert.equal(matrix.summary.projected_validated_if_next_batch_approved, 8);
assert.equal(matrix.summary.projected_validated_percent, 80);
assert.equal(matrix.prepared_human_batch, 'opi-003-age-cardinal-human-batch.v1.json');
assert.equal(matrix.next_gate, 'SWHNK-L01-OPI-003-AGE-CARDINAL-HUMAN-BATCH-V1');

const card3 = matrix.cards.find(x => x.slot_id === 'L01-OPI-003');
assert.equal(card3.review_state, 'REVIEWED_HOLD_BATCH_PREPARED');
assert.equal(card3.validation_state, 'AUTHORED_HOLD');
assert.equal(card3.prepared_human_batch, 'opi-003-age-cardinal-human-batch.v1.json');
assert.deepEqual(card3.number_assets, {0:'BIZO',1:'DUVE',2:'HOYU',3:'KETI',4:'LUSO',5:'MUPI',6:'NURA',7:'PEVU',8:'TOMI',9:'ZOKA'});
assert.deepEqual(card3.proposed_answer_examples, {8:'TOMI',18:'DUVE TOMI',42:'LUSO HOYU'});
assert.ok(card3.blockers.some(x => x.includes('human approval')));
assert.ok(card3.blockers.some(x => x.includes('SARASALA remains WATCH')));

assert.equal(ageBatch.status, 'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(ageBatch.decisions_requested.length, 4);
assert.equal(ageBatch.projected_effect_if_all_approved.L01_OPI_validated_after, 8);
assert.equal(ageBatch.projected_effect_if_all_approved.language_authority_promotions, 0);
assert.equal(ageBatch.projected_effect_if_all_approved.new_lexical_forms, 0);
assert.equal(ageBatch.projected_effect_if_all_approved.governed_unique_language_assets, 45);

assert.equal(cardinal.status, 'AUTHORING_RULE_PROPOSAL_NOT_CANON');
assert.equal(cardinal.rule.schema, 'DIGIT_TENS DIGIT_UNITS');
assert.equal(cardinal.rule.new_lexeme_required, false);
assert.equal(cardinal.age_application_proposal.SARASALA_authority, 'WATCH_UNCHANGED');
assert.equal(cardinal.age_application_proposal.OPI3_validation_implied, false);

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 3);
assert.equal(bindings.metrics.validated, 7);
assert.equal(bindings.metrics.frozen, 0);

console.log('PASS SWHNK-L01-OPI-VALIDATION-MATRIX-V11');
console.log('10/10 reviewed; 7/10 validated; OPI3 age/cardinal batch is prepared but not applied; projected next state is 8/10 with no language-authority promotion.');
