import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const numeralBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const opi9Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-009-preference-negation-human-batch.v1.json');
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
assert.equal(values.filter(x => x.implementation_state === 'AUTHORED').length, 3);
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 7);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 10);
assert.equal(values.filter(x => x.implementation_state === 'FROZEN').length, 0);
assert.equal(values.filter(x => x.scaffolded).length, 82);

assert.equal(bindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_ACTIVE_7_OF_10_VALIDATED');
assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 3);
assert.equal(bindings.metrics.validated, 7);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.metrics.validated_opi, ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']);

assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 7);
assert.equal(matrix.summary.validated_percent, 70);
assert.equal(matrix.summary.authored_current_state, 3);
assert.deepEqual(matrix.reviewed_hold_slots, ['L01-OPI-001','L01-OPI-003','L01-OPI-007']);

assert.equal(opi9Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(numeralBatch.status, 'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.candidates.length, 10);
assert.ok(numeralBatch.candidates.every(x => x.authority === 'CANDIDATE'));
assert.equal(numeralBatch.applied_effect.recovered_cycle1_forms, 31);
assert.equal(numeralBatch.applied_effect.authored_cycle1_candidates_after, 14);
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after, 45);
assert.equal(numeralBatch.applied_effect.governed_asset_proxy_percent_after, 31.25);
assert.equal(numeralBatch.applied_effect.L01_OPI_validated, 7);
assert.equal(numeralBatch.applied_effect.new_FROZEN_forms, 0);

assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.dependency.authority, 'GATE');

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 14);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN','VALA','KUON','NE','BIZO','DUVE','HOYU','KETI','LUSO','MUPI','NURA','PEVU','TOMI','ZOKA']);
assert.deepEqual(lex.spoken_numeral_candidates, {0:'BIZO',1:'DUVE',2:'HOYU',3:'KETI',4:'LUSO',5:'MUPI',6:'NURA',7:'PEVU',8:'TOMI',9:'ZOKA'});
assert.equal(lex.governed_unique_language_assets, 45);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 31.25);
assert.equal(lex.lesson_authored_candidates.L01, 14);
assert.equal(evidence.validation_evidence.L01_OPI_authored_current_state, 3);
assert.equal(evidence.validation_evidence.L01_OPI_validated, 7);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V7');
console.log('1008 slots locked; 7/10 L01 OPI validated; spoken 0-9 candidates registered as AUTH-005..014; recovered forms stay 31; governed assets rise to 45 without validating OPI3.');
