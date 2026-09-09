import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const cycle = await json('curriculum/cycle-01/cycle.manifest.json');

assert.equal(contract.contract_id, 'HNK-C1-NUM-CONTRACT-V1');
assert.equal(contract.status, 'APPROVED_FOR_IMPLEMENTATION');
assert.equal(contract.lessons, 7);
assert.equal(contract.target_total, 1008);
assert.equal(contract.category_targets.vocabulary, 144);
assert.equal(contract.category_targets.activation, 504);
assert.equal(contract.category_targets.review, 154);
assert.equal(contract.category_targets.final_seals, 3);
assert.deepEqual(contract.per_lesson_invariants, {
  opi: 10,
  story: 5,
  qa: 4,
  structures: 5,
  activation: 72,
  review: 22,
});

assert.equal(cycle.cycle_id, 'HNK-C1');
assert.equal(cycle.status, 'HOLD_INCOMPLETE_BINDING');
assert.equal(cycle.rules.non_invention, true);
assert.equal(cycle.lessons.length, 7);

const expectedTree = [
  ['HNK-L01', 'Kether'],
  ['HNK-L02', 'Chokhmah'],
  ['HNK-L03', 'Binah'],
  ['HNK-L04', 'Chesed'],
  ['HNK-L05', 'Gevurah'],
  ['HNK-L06', 'Yesod'],
  ['HNK-L07', 'Malkuth'],
];
assert.deepEqual(cycle.lessons.map(({ id, sphere }) => [id, sphere]), expectedTree);

const manifests = [];
for (const lesson of cycle.lessons) {
  const manifest = await json(`curriculum/cycle-01/${lesson.path}`);
  manifests.push(manifest);
  assert.equal(manifest.lesson_id, lesson.id);
  assert.equal(manifest.sphere, lesson.sphere);
  assert.equal(manifest.language_bindings, lesson.language_bindings);
  assert.equal(manifest.recovered_phrases, lesson.recovered_phrases);
  assert.equal(manifest.rules.non_invention, true);
}

const [l01, l02, l03, l04, l05, l06, l07] = manifests;

assert.equal(l01.source_status, 'PUBLICATION-FROZEN');
assert.equal(l01.pedagogy.opi_expected, 10);
assert.equal(l01.pedagogy.teacher_drills_expected, 72);
assert.equal(l01.pedagogy.raw_payload_recovered, false);
assert.deepEqual(l01.watch_lexemes, ['SARASALA', 'VAMAVALA', 'VAMAZAMU']);
assert.ok(l01.missing_sources.includes('lesson1.release.v1.json'));

assert.equal(l02.pedagogy.student_cards, 0);
assert.equal(l02.pedagogy.teacher_drills, 0);
assert.equal(l02.pedagogy.content_frozen, false);

assert.equal(l03.evidence_gate.automated_decision, 'HOLD_INSUFFICIENT_EVIDENCE');
assert.equal(l03.evidence_gate.runtime_activation, false);
assert.deepEqual(l03.authority_distribution, { FROZEN: 3, WATCH: 3, CANDIDATE: 2 });

assert.equal(l04.evidence_gate.automated_decision, 'HOLD_INSUFFICIENT_EVIDENCE');
assert.equal(l04.evidence_gate.runtime_promotion_allowed, false);
assert.deepEqual(l04.authority_distribution, { WATCH: 1, GATE: 8 });

for (const manifest of [l05, l06, l07]) {
  assert.equal(manifest.status, 'NO_RECOVERED_LEXEMES');
  assert.equal(manifest.language_bindings, 0);
  assert.equal(manifest.recovered_phrases, 0);
  assert.equal(manifest.rules.unknown_hnk_forms_remain_null, true);
}

assert.equal(l05.hnk_structure_equivalent, null);
assert.equal(l06.mapping_lock, 'L06=Yesod');
assert.equal(l07.mapping_lock, 'L07=Malkuth');
assert.deepEqual(l07.final_seals, ['VERBUM', 'LOGOS', 'DIALOGOS']);
assert.deepEqual(l07.curriculum_semantic_targets.map(x => x.source_term), ['FAITH', 'PURPOSE', 'PEACE']);
assert.ok(l07.curriculum_semantic_targets.every(x => x.hnk_form === null));

const bound = cycle.lessons.reduce((sum, lesson) => sum + lesson.language_bindings, 0);
assert.equal(bound, 37, 'Per-lesson bindings include repeated lexemes across lessons and must not be confused with unique registry forms.');

console.log('PASS SWHNK-C1-BASELINE-V1');
console.log('7 lessons | 144 vocabulary target | 504 activation | 1008 total');
console.log('L01 raw payload recovery remains OPEN; non-invention gate remains active.');
