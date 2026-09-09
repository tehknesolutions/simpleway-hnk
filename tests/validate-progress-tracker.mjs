import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const locativeBatch = await json('curriculum/cycle-01/L01-kether/validation/locative-question-human-promotion-batch.v1.json');
const locativeTransition = await json('curriculum/cycle-01/L01-kether/validation/opi-004-005.validated-transition.v1.json');
const contentBatch = await json('curriculum/cycle-01/L01-kether/validation/content-question-human-promotion-batch.v1.json');
const contentTransition = await json('curriculum/cycle-01/L01-kether/validation/opi-006-008.validated-transition.v1.json');
const vAni = await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const kuon = await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');

assert.equal(contract.target_total, 1008);

const simulated = new Map();
for (const override of evidence.overrides) {
  const { lesson, category, range } = override.selector;
  const [start, end] = range;
  for (let i = start; i <= end; i++) simulated.set(`${lesson}/${category}/${i}`, override);
}
const values = [...simulated.values()];
assert.equal(values.filter(x => x.evidence_state === 'SOURCE_CONFIRMED_FROZEN').length, 82);
assert.equal(values.filter(x => x.implementation_state === 'AUTHORED').length, 6);
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 4);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 10);
assert.equal(values.filter(x => x.implementation_state === 'FROZEN').length, 0);
assert.equal(values.filter(x => x.scaffolded).length, 82);

assert.equal(bindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_ACTIVE_4_OF_10_VALIDATED');
assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 6);
assert.equal(bindings.metrics.validated, 4);
assert.equal(bindings.metrics.frozen, 0);
assert.equal(bindings.metrics.reviewed, 10);
assert.deepEqual(bindings.metrics.validated_opi, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008']);
assert.deepEqual(bindings.remaining_missing_opi, []);

for (const slot of ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008']) {
  const item = bindings.bindings.find(x => x.slot_id === slot);
  assert.equal(item.implementation_state, 'VALIDATED');
  assert.match(item.validation_state, /^VALIDATED_FOR_L01_V1_1_COURSE_USE/);
}

const opi6 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-006');
assert.deepEqual(opi6.authored_candidate_ids, ['AUTH-002']);
assert.deepEqual(opi6.authored_candidate_authority, ['CANDIDATE']);
assert.equal(opi6.context_contract, 'WORK_OR_SCHOOL_CARD_CONTEXT_REQUIRED');
assert.equal(opi6.answer_pattern.pattern, '[ACTIVITY_DESCRIPTION]');
assert.equal(opi6.language_authority_effect, 'NONE');

const opi8 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-008');
assert.deepEqual(opi8.lexeme_authority, ['WATCH']);
assert.equal(opi8.answer_pattern.pattern, '[HOBBY_OR_PLEASURE_ACTIVITY]');
assert.equal(opi8.language_authority_effect, 'NONE');

assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 4);
assert.equal(matrix.summary.validated_percent, 40);
assert.equal(matrix.summary.authored_current_state, 6);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008']);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_VALIDATED').length, 4);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_HOLD').length, 6);

assert.equal(locativeBatch.status, 'APPROVED_FOR_SCOPED_COURSE_VALIDATION');
assert.equal(locativeTransition.status, 'APPLIED');
assert.equal(contentBatch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(contentBatch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(contentBatch.applied_effect.L01_OPI_VALIDATED_after, 4);
assert.equal(contentBatch.applied_effect.language_authority_changes, 0);
assert.equal(contentTransition.status, 'APPLIED');
assert.deepEqual(contentTransition.scope, ['L01-OPI-006','L01-OPI-008']);
assert.ok(contentTransition.transitions.every(x => x.after === 'VALIDATED'));
assert.equal(contentTransition.language_authority_effect.VALA, 'CANDIDATE_UNCHANGED');
assert.equal(contentTransition.language_authority_effect.VAMAVALA, 'WATCH_UNCHANGED');
assert.equal(contentTransition.language_authority_effect.KU, 'INFERRED_NOT_CANONICAL');
assert.equal(contentTransition.language_authority_effect.historical_registry_rewritten, false);

assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(vAni.boundaries.modify_master_lexicon_meaning, false);
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.dependency.authority, 'GATE');

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 3);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN','VALA','KUON']);
assert.equal(lex.governed_unique_language_assets, 34);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 23.6111);
assert.equal(lex.lesson_bindings.L06, 0);
assert.equal(lex.lesson_bindings.L07, 0);
assert.equal(evidence.validation_evidence.L01_OPI_reviewed, 10);
assert.equal(evidence.validation_evidence.L01_OPI_authored_or_better, 10);
assert.equal(evidence.validation_evidence.L01_OPI_authored_current_state, 6);
assert.equal(evidence.validation_evidence.L01_OPI_validated, 4);
assert.deepEqual(evidence.validation_evidence.L01_OPI_validated_slots, ['L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008']);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V3');
console.log('1008 slots locked; L01 OPI 10 authored-or-better, 4 VALIDATED, 6 AUTHORED-HOLD, 0 FROZEN; language authority boundaries preserved.');
