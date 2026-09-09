import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const allocation = await json('progress/cycle1-allocation.v1.json');
const model = await json('progress/progress-model.v1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const opiBindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const rebinds = await json('curriculum/cycle-01/L01-kether/authoring/curriculum-rebinds.v1.json');
const opi3 = await json('curriculum/cycle-01/L01-kether/authoring/opi-003.age-frame.v1.json');
const opi6 = await json('curriculum/cycle-01/L01-kether/authoring/opi-006.activity-frame.v2.json');
const opi9 = await json('curriculum/cycle-01/L01-kether/authoring/opi-009.preference-frame.v1.json');

assert.equal(contract.target_total, 1008);
assert.equal(allocation.cycle_totals.total, 1008);
assert.deepEqual(model.implementation_states.map(x => x.id), ['MISSING','AUTHORED','VALIDATED','FROZEN']);

const simulated = new Map();
for (const override of evidence.overrides) {
  const { lesson, category, range } = override.selector;
  const [start, end] = range;
  for (let i = start; i <= end; i++) simulated.set(`${lesson}/${category}/${i}`, override);
}

assert.equal([...simulated.values()].filter(x => x.evidence_state === 'SOURCE_CONFIRMED_FROZEN').length, 82);
assert.equal([...simulated.values()].filter(x => x.implementation_state === 'AUTHORED').length, 8);
assert.equal([...simulated.values()].filter(x => x.scaffolded).length, 82);

assert.deepEqual(
  opiBindings.bindings.map(x => x.slot_id),
  ['L01-OPI-001','L01-OPI-002','L01-OPI-003','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009']
);
assert.deepEqual(opiBindings.remaining_missing_opi, ['L01-OPI-007','L01-OPI-010']);

const bound3 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-003');
assert.equal(bound3.hnk_question, 'EN KU SARASALA KE');
assert.deepEqual(bound3.lexeme_authority, ['WATCH']);
assert.equal(bound3.validation_state, 'HOLD_WATCH_AND_CONTEXTUAL_SEMANTICS');
assert.equal(opi3.progress_effect.AUTHORED_slots_after, 7);

const opi4 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-004');
assert.equal(opi4.hnk_question, 'EN SARADAYA KUVAN KE');
assert.deepEqual(opi4.authored_candidate_ids, ['AUTH-001']);

const opi5 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-005');
assert.equal(opi5.hnk_question, 'EN VALI KUVAN KE');
assert.deepEqual(opi5.lexeme_binding_origin, ['GOVERNED_CURRICULUM_REBIND']);
assert.equal(rebinds.coverage_effect.unique_cycle1_forms_after, 31);

const bound6 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-006');
assert.equal(bound6.hnk_question, 'EN KU VALA KE');
assert.deepEqual(bound6.authored_candidate_ids, ['AUTH-002']);
assert.equal(opi6.status, 'AUTHORED_CANDIDATE_HOLD');

const opi8 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-008');
assert.equal(opi8.hnk_question, 'EN KU VAMAVALA KE');
assert.equal(opi8.usage_scope, 'TEST_ONLY_WATCH_VISIBLE');

const bound9 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-009');
assert.equal(bound9.hnk_question, 'EN VAME VAMAZAMU KE');
assert.deepEqual(bound9.lexeme_authority, ['GATE','WATCH']);
assert.equal(bound9.usage_scope, 'EXPERIMENTAL_GATE_AND_WATCH_VISIBLE');
assert.equal(opi9.progress_effect.AUTHORED_slots_after, 8);

assert.equal(opiBindings.metrics.authored, 8);
assert.equal(opiBindings.metrics.authored_language_candidate_usage, 3);
assert.equal(opiBindings.metrics.watch_test_only, 3);
assert.equal(opiBindings.metrics.gate_test_only, 1);
assert.equal(opiBindings.metrics.validated, 0);
assert.equal(opiBindings.metrics.frozen, 0);

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 2);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN','VALA']);
assert.equal(lex.governed_unique_language_assets, 33);
assert.equal(lex.curriculum_vocabulary_target, 144);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 22.9167);
assert.equal(lex.recovered_phrases, 7);
assert.equal(lex.lesson_bindings.L01, 10);
assert.equal(lex.lesson_recovered_bindings.L01, 9);
assert.equal(lex.lesson_governed_rebinds.L01, 1);
assert.equal(lex.lesson_authored_candidates.L01, 2);
assert.equal(lex.lesson_bindings.L06, 0);
assert.equal(lex.lesson_bindings.L07, 0);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V1');
console.log('1008 slots locked; 8 AUTHORED; 82 historical frozen-evidence; 31 recovered + 2 authored candidates remain distinct.');
