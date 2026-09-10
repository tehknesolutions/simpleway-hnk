import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const opi9Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-009-preference-negation-human-batch.v1.json');
const opi9Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-009.validated-transition.v1.json');
const nePromotion = await json('proposals/language/HNK_NE_PROMOTION_RECORD_V1.json');
const nePredicate = await json('proposals/language/HNK_NE_PREDICATE_NEGATION_SCOPED_EXTENSION_V1.json');
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
assert.equal(bindings.metrics.reviewed, 10);
assert.deepEqual(bindings.metrics.validated_opi, ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']);

const opi9 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-009');
assert.equal(opi9.implementation_state, 'VALIDATED');
assert.equal(opi9.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_WITH_GATE_WATCH_AND_AUTHORED_NEGATION_VISIBLE');
assert.deepEqual(opi9.lexeme_authority, ['GATE','WATCH']);
assert.deepEqual(opi9.authored_candidate_ids, ['AUTH-004']);
assert.deepEqual(opi9.authored_candidate_authority, ['CANDIDATE']);
assert.equal(opi9.answer_patterns.affirmative.form, 'VAME VAMAZAMU');
assert.equal(opi9.answer_patterns.negative.form, 'NE VAME VAMAZAMU');
assert.equal(opi9.answer_patterns.negative.negation_scope, 'L01-OPI-009_ONLY');
assert.equal(opi9.language_authority_effect, 'NONE');

assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 7);
assert.equal(matrix.summary.validated_percent, 70);
assert.equal(matrix.summary.authored_current_state, 3);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']);
assert.deepEqual(matrix.reviewed_hold_slots, ['L01-OPI-001','L01-OPI-003','L01-OPI-007']);

assert.equal(opi9Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(opi9Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(opi9Batch.applied_effect.L01_OPI_validated_after, 7);
assert.equal(opi9Batch.applied_effect.new_lexical_forms, 0);
assert.equal(opi9Batch.applied_effect.language_authority_promotions, 0);
assert.equal(opi9Transition.status, 'APPLIED');
assert.equal(opi9Transition.after, 'VALIDATED');
assert.equal(opi9Transition.language_authority_effect.VAME, 'GATE_UNCHANGED');
assert.equal(opi9Transition.language_authority_effect.VAMAZAMU, 'WATCH_UNCHANGED');
assert.equal(opi9Transition.language_authority_effect.NE, 'CANDIDATE_UNCHANGED');
assert.equal(opi9Transition.grammar_effect.global_predicate_negation_productivity, 'NOT_GRANTED');

assert.equal(nePromotion.authority, 'CANDIDATE');
assert.equal(nePromotion.historical_recovery_claim, false);
assert.equal(nePredicate.status, 'AUTHORING_RULE_PROPOSAL_NOT_CANON');
assert.equal(nePredicate.proposed_extension.global_productivity, false);
assert.equal(nePredicate.boundaries.does_not_promote_VAME, true);
assert.equal(nePredicate.boundaries.does_not_promote_VAMAZAMU, true);
assert.equal(nePredicate.boundaries.does_not_promote_NE, true);

assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.dependency.authority, 'GATE');

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 4);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN','VALA','KUON','NE']);
assert.equal(lex.governed_unique_language_assets, 35);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 24.3056);
assert.equal(evidence.validation_evidence.L01_OPI_authored_current_state, 3);
assert.equal(evidence.validation_evidence.L01_OPI_validated, 7);
assert.deepEqual(evidence.validation_evidence.L01_OPI_validated_slots, ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V6');
console.log('1008 slots locked; L01 OPI 10 authored-or-better, 7 VALIDATED, 3 AUTHORED-HOLD, 0 FROZEN; VAME=GATE, VAMAZAMU=WATCH and NE=CANDIDATE remain unchanged.');
