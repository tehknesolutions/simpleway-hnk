import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const opiBindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const gaps = await json('curriculum/cycle-01/L01-kether/authoring/remaining-opi-gaps.v1.json');
const opi7 = await json('curriculum/cycle-01/L01-kether/authoring/opi-007.residence-frame.v1.json');
const opi10 = await json('curriculum/cycle-01/L01-kether/authoring/opi-010.weekend-context.v1.json');
const vAni = await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const kuon = await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');

assert.equal(contract.target_total, 1008);

const simulated = new Map();
for (const override of evidence.overrides) {
  const { lesson, category, range } = override.selector;
  const [start, end] = range;
  for (let i = start; i <= end; i++) simulated.set(`${lesson}/${category}/${i}`, override);
}

assert.equal([...simulated.values()].filter(x => x.evidence_state === 'SOURCE_CONFIRMED_FROZEN').length, 82);
assert.equal([...simulated.values()].filter(x => x.implementation_state === 'AUTHORED').length, 10);
assert.equal([...simulated.values()].filter(x => x.scaffolded).length, 82);

assert.deepEqual(
  opiBindings.bindings.map(x => x.slot_id),
  ['L01-OPI-001','L01-OPI-002','L01-OPI-003','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-007','L01-OPI-008','L01-OPI-009','L01-OPI-010']
);
assert.deepEqual(opiBindings.remaining_missing_opi, []);
assert.equal(opiBindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_PENDING');
assert.equal(opiBindings.metrics.authored, 10);
assert.equal(opiBindings.metrics.validated, 0);
assert.equal(opiBindings.metrics.frozen, 0);

const bound7 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-007');
assert.deepEqual(bound7.hnk_question_sequence, ['EN VANI KUVAN KE','EN VANI KUON KE']);
assert.deepEqual(bound7.experimental_recovered_form_ids, ['LEX-031']);
assert.deepEqual(bound7.experimental_recovered_form_authority, ['WATCH']);
assert.deepEqual(bound7.experimental_recovered_form_meaning, [null]);
assert.equal(bound7.semantic_hypothesis.VANI, 'live / reside');
assert.deepEqual(bound7.authored_candidate_ids, ['AUTH-001','AUTH-003']);
assert.equal(bound7.comitative_strategy.overt_with_particle_added, false);
assert.equal(bound7.implementation_state, 'AUTHORED');
assert.match(bound7.validation_state, /^HOLD_/);
assert.equal(opi7.progress_effect.AUTHORED_slots_after, 10);
assert.equal(opi7.progress_effect.VALIDATED_slots_after, 0);
assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(vAni.boundaries.modify_master_lexicon_meaning, false);
assert.equal(kuon.canonical_id, 'AUTH-003');
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.historical_recovery_claim, false);
assert.equal(kuon.dependency.authority, 'GATE');

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

assert.equal(gaps.status, 'CLOSED_BY_GOVERNED_EXPERIMENTAL_AUTHORING_VALIDATION_PENDING');
assert.deepEqual(gaps.remaining, []);
assert.equal(gaps.final_authorship_state.L01_OPI_AUTHORED, 10);
assert.equal(gaps.final_authorship_state.L01_OPI_PERCENT, 100);
assert.equal(gaps.final_authorship_state.VALIDATED, 0);

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 3);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN','VALA','KUON']);
assert.equal(lex.governed_unique_language_assets, 34);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 23.6111);
assert.equal(lex.lesson_bindings.L06, 0);
assert.equal(lex.lesson_bindings.L07, 0);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V1');
console.log('1008 slots locked; L01 OPI authorship 10/10; 10 AUTHORED, 0 VALIDATED, 0 reproducible FROZEN; recovery/authorship boundaries preserved.');
