import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const batch = await json('curriculum/cycle-01/L01-kether/validation/locative-question-human-promotion-batch.v1.json');
const transition = await json('curriculum/cycle-01/L01-kether/validation/opi-004-005.validated-transition.v1.json');
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
assert.equal(values.filter(x => x.implementation_state === 'AUTHORED').length, 8);
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 2);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 10);
assert.equal(values.filter(x => x.scaffolded).length, 82);

assert.equal(bindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_ACTIVE_2_OF_10_VALIDATED');
assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 8);
assert.equal(bindings.metrics.validated, 2);
assert.equal(bindings.metrics.frozen, 0);
assert.equal(bindings.metrics.reviewed, 10);
assert.deepEqual(bindings.validated_opi, ['L01-OPI-004','L01-OPI-005']);
assert.deepEqual(bindings.remaining_missing_opi, []);

for (const slot of ['L01-OPI-004','L01-OPI-005']) {
  const item = bindings.bindings.find(x => x.slot_id === slot);
  assert.equal(item.implementation_state, 'VALIDATED');
  assert.equal(item.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE');
  assert.equal(item.answer_pattern.pattern, '[PLACE]');
  assert.equal(item.authored_candidate_authority[0], 'CANDIDATE');
  assert.equal(item.historical_recovery_claim, false);
}

assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 2);
assert.equal(matrix.summary.validated_percent, 20);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-004','L01-OPI-005']);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_VALIDATED').length, 2);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_HOLD').length, 8);

assert.equal(batch.status, 'APPROVED_FOR_SCOPED_COURSE_VALIDATION');
assert.deepEqual(batch.approval.decisions_approved, ['DEC-L01-LOC-001','DEC-L01-LOC-002','DEC-L01-LOC-003']);
assert.equal(batch.applied_effect.L01_OPI_VALIDATED_after, 2);
assert.equal(batch.applied_effect.candidate_authorities_changed, 0);
assert.equal(transition.status, 'APPLIED');
assert.equal(transition.slots.length, 2);
assert.ok(transition.slots.every(x => x.to === 'VALIDATED'));
assert.equal(transition.approved_conventions.KUVAN.authority, 'CANDIDATE');
assert.equal(transition.approved_conventions.KUVAN.historical_recovery_claim, false);

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
assert.equal(evidence.validation_evidence.L01_OPI_validated, 2);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V2');
console.log('1008 slots locked; L01 OPI 10 authored-or-better, 2 VALIDATED, 8 AUTHORED-HOLD, 0 FROZEN; language authority boundaries preserved.');
