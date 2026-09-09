import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const opiBindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const gaps = await json('curriculum/cycle-01/L01-kether/authoring/remaining-opi-gaps.v1.json');
const opi10 = await json('curriculum/cycle-01/L01-kether/authoring/opi-010.weekend-context.v1.json');

assert.equal(contract.target_total, 1008);

const simulated = new Map();
for (const override of evidence.overrides) {
  const { lesson, category, range } = override.selector;
  const [start, end] = range;
  for (let i = start; i <= end; i++) simulated.set(`${lesson}/${category}/${i}`, override);
}

assert.equal([...simulated.values()].filter(x => x.evidence_state === 'SOURCE_CONFIRMED_FROZEN').length, 82);
assert.equal([...simulated.values()].filter(x => x.implementation_state === 'AUTHORED').length, 9);
assert.equal([...simulated.values()].filter(x => x.scaffolded).length, 82);

assert.deepEqual(
  opiBindings.bindings.map(x => x.slot_id),
  ['L01-OPI-001','L01-OPI-002','L01-OPI-003','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']
);
assert.deepEqual(opiBindings.remaining_missing_opi, ['L01-OPI-007']);
assert.equal(opiBindings.metrics.authored, 9);
assert.equal(opiBindings.metrics.validated, 0);
assert.equal(opiBindings.metrics.frozen, 0);

const bound10 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-010');
assert.equal(bound10.hnk_context, 'VAMUSARO');
assert.equal(bound10.context_authority, 'FROZEN');
assert.equal(bound10.context_is_sentence_grammar, false);
assert.equal(bound10.weekend_translation_claim, false);
assert.equal(bound10.hnk_question, 'EN KU VALA KE');
assert.deepEqual(bound10.authored_candidate_ids, ['AUTH-002']);
assert.equal(bound10.semantic_fidelity, 'APPROXIMATE_CONTEXTUAL_EQUIVALENT');
assert.equal(bound10.validation_state, 'HOLD_SEMANTIC_FIDELITY_AND_AUTHORED_CANDIDATE');
assert.equal(opi10.progress_effect.AUTHORED_slots_after, 9);
assert.deepEqual(opi10.remaining_missing_opi, ['L01-OPI-007']);

const gap7 = gaps.remaining.find(x => x.slot === 'L01-OPI-007');
assert.equal(gap7.state, 'HARD_LANGUAGE_GAP');
assert.equal(gap7.decision, 'KEEP_MISSING_UNTIL_RECOVERY_OR_EXPLICIT_MULTI_PART_AUTHORING');
assert.ok(gap7.forbidden_shortcuts.some(x => x.includes('VANI = live/reside')));

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 2);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN','VALA']);
assert.equal(lex.governed_unique_language_assets, 33);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 22.9167);
assert.equal(lex.lesson_bindings.L06, 0);
assert.equal(lex.lesson_bindings.L07, 0);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V1');
console.log('1008 slots locked; 9 AUTHORED; one L01 OPI hard gap remains; recovered/authored boundaries preserved.');
