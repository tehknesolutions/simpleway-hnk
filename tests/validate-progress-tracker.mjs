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
assert.deepEqual(
  Object.entries(allocation.lessons).map(([id, x]) => [id, x.sphere]),
  [['L01','Kether'],['L02','Chokhmah'],['L03','Binah'],['L04','Chesed'],['L05','Gevurah'],['L06','Yesod'],['L07','Malkuth']]
);

for (const [category, target] of Object.entries(contract.category_targets)) {
  assert.equal(allocation.cycle_totals[category], target, `${category} allocation drift`);
}
for (const [lesson, target] of Object.entries(contract.lesson_target_totals)) {
  assert.equal(allocation.lessons[lesson].total, target, `${lesson} total drift`);
}

assert.equal(allocation.lessons.L01.vocabulary, 32);
assert.equal(allocation.lessons.L07.vocabulary, 32);
for (const lesson of ['L02','L03','L04','L05','L06']) assert.equal(allocation.lessons[lesson].vocabulary, 16);

assert.deepEqual(model.implementation_states.map(x => x.id), ['MISSING','AUTHORED','VALIDATED','FROZEN']);
assert.ok(model.counting_rules.some(x => x.includes('historical evidence')));
assert.ok(model.counting_rules.some(x => x.includes('lexical binding')));

const simulated = new Map();
for (const override of evidence.overrides) {
  const { lesson, category, range } = override.selector;
  const [start, end] = range;
  for (let i = start; i <= end; i++) {
    simulated.set(`${lesson}/${category}/${i}`, {
      implementation_state: override.implementation_state,
      evidence_state: override.evidence_state,
      scaffolded: override.scaffolded
    });
  }
}

const frozenEvidenceSlots = [...simulated.values()].filter(x => x.evidence_state === 'SOURCE_CONFIRMED_FROZEN').length;
const authoredSlots = [...simulated.values()].filter(x => x.implementation_state === 'AUTHORED').length;
const scaffoldedSlots = [...simulated.values()].filter(x => x.scaffolded).length;

assert.equal(frozenEvidenceSlots, 82);
assert.equal(authoredSlots, 5);
assert.equal(scaffoldedSlots, 82);
assert.equal(opiBindings.bindings.length, 5);
assert.deepEqual(
  opiBindings.bindings.map(x => x.slot_id),
  ['L01-OPI-001','L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-008']
);
assert.ok(opiBindings.bindings.every(x => x.implementation_state === 'AUTHORED'));

const opi1 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-001');
assert.equal(opi1.phrase_id, 'PHR-001');
assert.equal(opi1.phrase_certainty, 'APPROXIMATE');
assert.equal(opi1.validation_state, 'TECHNICAL_PASS_SEMANTIC_HOLD');
assert.equal(opi1.glyph_ids.length, 14);

const opi2 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-002');
assert.equal(opi2.binding_origin, 'V1_1_AUTHORING_CANDIDATE');
assert.deepEqual(opi2.lexeme_authority, ['FROZEN']);
assert.equal(opi2.hnk_question, 'EN VAMAKALA KE');

const opi4 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-004');
assert.equal(opi4.hnk_question, 'EN SARADAYA KU KE');
assert.deepEqual(opi4.lexeme_authority, ['FROZEN']);

const opi5 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-005');
assert.equal(opi5.hnk_question, 'EN VALI KU KE');
assert.deepEqual(opi5.lexeme_authority, ['FROZEN']);
assert.deepEqual(opi5.lexeme_binding_origin, ['GOVERNED_CURRICULUM_REBIND']);
assert.equal(rebinds.rebinds[0].lexeme_id, 'LEX-013');
assert.equal(rebinds.rebinds[0].semantic_change, false);
assert.equal(rebinds.coverage_effect.L01_after, 10);
assert.equal(rebinds.coverage_effect.unique_cycle1_forms_after, 31);

const opi8 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-008');
assert.equal(opi8.hnk_question, 'EN VAMAVALA KU KE');
assert.deepEqual(opi8.lexeme_authority, ['WATCH']);
assert.equal(opi8.usage_scope, 'TEST_ONLY_WATCH_VISIBLE');

assert.equal(opiBindings.metrics.authored, 5);
assert.equal(opiBindings.metrics.governed_rebind_usage, 1);
assert.equal(opiBindings.metrics.validated, 0);
assert.equal(opiBindings.metrics.frozen, 0);

assert.equal(evidence.lexical_evidence.unique_forms_linked_to_cycle1, 31);
assert.equal(evidence.lexical_evidence.curriculum_vocabulary_target, 144);
assert.equal(evidence.lexical_evidence.recovered_phrases, 7);
assert.equal(evidence.lexical_evidence.lesson_bindings.L01, 10);
assert.equal(evidence.lexical_evidence.lesson_recovered_bindings.L01, 9);
assert.equal(evidence.lexical_evidence.lesson_governed_rebinds.L01, 1);
assert.equal(evidence.lexical_evidence.lesson_bindings.L06, 0);
assert.equal(evidence.lexical_evidence.lesson_bindings.L07, 0);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V1');
console.log('1008 slots locked; 5 AUTHORED; 82 historical frozen-evidence slots; governed rebind provenance preserved.');
