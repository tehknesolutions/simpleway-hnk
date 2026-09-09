import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);

async function readJson(path) {
  return JSON.parse(await readFile(resolve(root, path), 'utf8'));
}

const allocation = await readJson('progress/cycle1-allocation.v1.json');
const evidence = await readJson('progress/evidence-overrides.v1.json');
const model = await readJson('progress/progress-model.v1.json');

const categoryOrder = [
  'teacher_notes', 'opi', 'story', 'qa', 'structure_headers',
  'structures', 'vocabulary', 'activation', 'review', 'final_seals'
];

function pad(n, width = 3) {
  return String(n).padStart(width, '0');
}

function slotId(lesson, category, index) {
  const codes = {
    teacher_notes: 'NOTE', opi: 'OPI', story: 'STORY', qa: 'QA',
    structure_headers: 'HDR', structures: 'STR', vocabulary: 'VOC',
    activation: 'ACT', review: 'REV', final_seals: 'SEAL'
  };
  return `${lesson}-${codes[category]}-${pad(index)}`;
}

const slots = [];
for (const [lesson, lessonAllocation] of Object.entries(allocation.lessons)) {
  for (const category of categoryOrder) {
    const count = lessonAllocation[category] ?? 0;
    for (let i = 1; i <= count; i++) {
      slots.push({
        slot_id: slotId(lesson, category, i),
        lesson,
        sphere: lessonAllocation.sphere,
        category,
        index: i,
        implementation_state: evidence.defaults.implementation_state,
        evidence_state: evidence.defaults.evidence_state,
        scaffolded: evidence.defaults.scaffolded,
        evidence_reason: null
      });
    }
  }
}

for (const override of evidence.overrides) {
  const { lesson, category, range } = override.selector;
  const [start, end] = range;
  const matched = slots.filter(s => s.lesson === lesson && s.category === category && s.index >= start && s.index <= end);
  if (matched.length !== end - start + 1) {
    throw new Error(`Override ${lesson}/${category}/${start}-${end} matched ${matched.length} slots.`);
  }
  for (const slot of matched) {
    slot.implementation_state = override.implementation_state;
    slot.evidence_state = override.evidence_state;
    slot.scaffolded = override.scaffolded;
    slot.evidence_reason = override.reason;
  }
}

function countBy(items, key, allowed = null) {
  const result = Object.fromEntries((allowed ?? []).map(x => [x, 0]));
  for (const item of items) result[item[key]] = (result[item[key]] ?? 0) + 1;
  return result;
}

function pct(n, d) {
  return d === 0 ? 0 : Number(((n / d) * 100).toFixed(4));
}

const implementationIds = model.implementation_states.map(s => s.id);
const evidenceIds = model.evidence_states.map(s => s.id);
const implementation = countBy(slots, 'implementation_state', implementationIds);
const evidenceCounts = countBy(slots, 'evidence_state', evidenceIds);
const scaffolded = slots.filter(s => s.scaffolded).length;

const perLesson = {};
for (const lesson of Object.keys(allocation.lessons)) {
  const lessonSlots = slots.filter(s => s.lesson === lesson);
  perLesson[lesson] = {
    sphere: allocation.lessons[lesson].sphere,
    target: lessonSlots.length,
    implementation: countBy(lessonSlots, 'implementation_state', implementationIds),
    evidence: countBy(lessonSlots, 'evidence_state', evidenceIds),
    scaffolded: lessonSlots.filter(s => s.scaffolded).length
  };
}

const perCategory = {};
for (const category of categoryOrder) {
  const categorySlots = slots.filter(s => s.category === category);
  perCategory[category] = {
    target: categorySlots.length,
    implementation: countBy(categorySlots, 'implementation_state', implementationIds),
    evidence: countBy(categorySlots, 'evidence_state', evidenceIds),
    scaffolded: categorySlots.filter(s => s.scaffolded).length
  };
}

const frozenHistorical = evidenceCounts.SOURCE_CONFIRMED_FROZEN ?? 0;
const lexical = evidence.lexical_evidence;

const summary = {
  snapshot_id: 'SWHNK-C1-PROGRESS-SNAPSHOT-V1',
  generated_from: [
    'progress/cycle1-allocation.v1.json',
    'progress/progress-model.v1.json',
    'progress/evidence-overrides.v1.json'
  ],
  target_slots: slots.length,
  implementation,
  implementation_percent: Object.fromEntries(Object.entries(implementation).map(([k, v]) => [k, pct(v, slots.length)])),
  evidence: evidenceCounts,
  evidence_percent: Object.fromEntries(Object.entries(evidenceCounts).map(([k, v]) => [k, pct(v, slots.length)])),
  scaffolded,
  scaffolded_percent: pct(scaffolded, slots.length),
  historical_frozen_evidence_floor: frozenHistorical,
  historical_frozen_evidence_floor_percent: pct(frozenHistorical, slots.length),
  lexical_proxy: {
    unique_cycle1_forms: lexical.unique_forms_linked_to_cycle1,
    curriculum_vocabulary_target: lexical.curriculum_vocabulary_target,
    percent: pct(lexical.unique_forms_linked_to_cycle1, lexical.curriculum_vocabulary_target),
    warning: lexical.warning
  },
  recovered_language_assets: {
    master_lexicon_registry_forms: lexical.master_lexicon_registry_forms,
    cycle1_linked_forms: lexical.unique_forms_linked_to_cycle1,
    recovered_phrases: lexical.recovered_phrases,
    lesson_bindings: lexical.lesson_bindings,
    gate: lexical.gate
  },
  per_lesson: perLesson,
  per_category: perCategory,
  interpretation: {
    current_frozen_is_reproducible: true,
    historical_frozen_evidence_is_not_current_payload: true,
    lexical_proxy_is_not_vocabulary_slot_completion: true
  }
};

if (slots.length !== allocation.cycle_totals.total) {
  throw new Error(`Generated ${slots.length} slots; contract allocation expects ${allocation.cycle_totals.total}.`);
}

const write = process.argv.includes('--write');
if (write) {
  const ledgerPath = resolve(root, 'progress/generated/cycle1-slots.v1.json');
  const summaryPath = resolve(root, 'progress/generated/cycle1-progress.snapshot.v1.json');
  await mkdir(dirname(ledgerPath), { recursive: true });
  await writeFile(ledgerPath, JSON.stringify({ ledger_id: 'SWHNK-C1-SLOT-LEDGER-V1', slots }, null, 2) + '\n');
  await writeFile(summaryPath, JSON.stringify(summary, null, 2) + '\n');
  console.log(`WROTE ${slots.length} slots`);
  console.log(summaryPath);
} else {
  console.log(JSON.stringify(summary, null, 2));
}
