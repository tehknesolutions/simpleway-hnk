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

assert.equal(contract.target_total, 1008);
assert.equal(allocation.cycle_totals.total, 1008);
assert.equal(allocation.status, 'SOURCE_CONSTRAINED_DERIVED_ALLOCATION');
assert.equal(allocation.derivation.source_confirmed_per_lesson.teacher_notes, 3);
assert.equal(allocation.derivation.source_confirmed_per_lesson.structure_headers, 2);
assert.equal(allocation.derivation.vocabulary_distribution_state, 'DERIVED_FROM_SOURCE_CONSTRAINTS');
assert.equal(Object.keys(allocation.lessons).length, 7);

for (const [category, target] of Object.entries(contract.category_targets)) assert.equal(allocation.cycle_totals[category], target);
for (const [lesson, target] of Object.entries(contract.lesson_target_totals)) assert.equal(allocation.lessons[lesson].total, target);

assert.deepEqual(model.implementation_states.map(x => x.id), ['MISSING','AUTHORED','VALIDATED','FROZEN']);

const simulated = new Map();
for (const override of evidence.overrides) {
  const { lesson, category, range } = override.selector;
  const [start, end] = range;
  for (let i = start; i <= end; i++) simulated.set(`${lesson}/${category}/${i}`, override);
}

assert.equal([...simulated.values()].filter(x => x.evidence_state === 'SOURCE_CONFIRMED_FROZEN').length, 82);
assert.equal([...simulated.values()].filter(x => x.implementation_state === 'AUTHORED').length, 5);
assert.equal([...simulated.values()].filter(x => x.scaffolded).length, 82);

assert.deepEqual(opiBindings.bindings.map(x => x.slot_id), ['L01-OPI-001','L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-008']);

const opi4 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-004');
assert.equal(opi4.hnk_question, 'EN SARADAYA KUVAN KE');
assert.deepEqual(opi4.authored_candidate_ids, ['AUTH-001']);
assert.deepEqual(opi4.authored_candidate_authority, ['CANDIDATE']);
assert.equal(opi4.validation_state, 'HOLD_AUTHORED_CANDIDATE_GRAMMAR');

const opi5 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-005');
assert.equal(opi5.hnk_question, 'EN VALI KUVAN KE');
assert.deepEqual(opi5.lexeme_binding_origin, ['GOVERNED_CURRICULUM_REBIND']);
assert.deepEqual(opi5.authored_candidate_ids, ['AUTH-001']);
assert.equal(rebinds.rebinds[0].semantic_change, false);
assert.equal(rebinds.coverage_effect.L01_after, 10);
assert.equal(rebinds.coverage_effect.unique_cycle1_forms_after, 31);

const opi8 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-008');
assert.equal(opi8.hnk_question, 'EN VAMAVALA KU KE');
assert.equal(opi8.usage_scope, 'TEST_ONLY_WATCH_VISIBLE');

assert.equal(opiBindings.metrics.authored, 5);
assert.equal(opiBindings.metrics.authored_language_candidate_usage, 2);
assert.equal(opiBindings.metrics.validated, 0);
assert.equal(opiBindings.metrics.frozen, 0);

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 1);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN']);
assert.equal(lex.governed_unique_language_assets, 32);
assert.equal(lex.curriculum_vocabulary_target, 144);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 22.2222);
assert.equal(lex.recovered_phrases, 7);
assert.equal(lex.lesson_bindings.L01, 10);
assert.equal(lex.lesson_recovered_bindings.L01, 9);
assert.equal(lex.lesson_governed_rebinds.L01, 1);
assert.equal(lex.lesson_authored_candidates.L01, 1);
assert.equal(lex.lesson_bindings.L06, 0);
assert.equal(lex.lesson_bindings.L07, 0);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V1');
console.log('1008 slots locked; 5 AUTHORED; 82 historical frozen-evidence; 31 recovered forms + 1 authored candidate remain distinct.');
