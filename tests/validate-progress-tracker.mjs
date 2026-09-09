import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const allocation = await json('progress/cycle1-allocation.v1.json');
const model = await json('progress/progress-model.v1.json');
const evidence = await json('progress/evidence-overrides.v1.json');

assert.equal(contract.target_total, 1008);
assert.equal(allocation.cycle_totals.total, 1008);
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

const frozenEvidenceSlots = evidence.overrides.reduce((sum, item) => {
  if (item.evidence_state !== 'SOURCE_CONFIRMED_FROZEN') return sum;
  const [start, end] = item.selector.range;
  return sum + (end - start + 1);
}, 0);
assert.equal(frozenEvidenceSlots, 82);
assert.equal(evidence.lexical_evidence.unique_forms_linked_to_cycle1, 31);
assert.equal(evidence.lexical_evidence.curriculum_vocabulary_target, 144);
assert.equal(evidence.lexical_evidence.recovered_phrases, 7);
assert.equal(evidence.lexical_evidence.lesson_bindings.L06, 0);
assert.equal(evidence.lexical_evidence.lesson_bindings.L07, 0);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V1');
console.log('1008 slots locked; historical evidence and current implementation remain separate.');
