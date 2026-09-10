import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const opi2Batch = await json('curriculum/cycle-01/L01-kether/validation/opi-002-negation-candidate-human-batch.v1.json');
const opi2Transition = await json('curriculum/cycle-01/L01-kether/validation/opi-002.validated-transition.v1.json');
const nePromotion = await json('proposals/language/HNK_NE_PROMOTION_RECORD_V1.json');
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
assert.equal(values.filter(x => x.implementation_state === 'AUTHORED').length, 4);
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 6);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 10);
assert.equal(values.filter(x => x.implementation_state === 'FROZEN').length, 0);
assert.equal(values.filter(x => x.scaffolded).length, 82);

assert.equal(bindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_ACTIVE_6_OF_10_VALIDATED');
assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 4);
assert.equal(bindings.metrics.validated, 6);
assert.equal(bindings.metrics.frozen, 0);
assert.equal(bindings.metrics.reviewed, 10);
assert.deepEqual(bindings.metrics.validated_opi, ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.deepEqual(bindings.remaining_missing_opi, []);

const opi2 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-002');
assert.equal(opi2.implementation_state, 'VALIDATED');
assert.equal(opi2.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_WITH_AUTHORED_NEGATION');
assert.deepEqual(opi2.authored_candidate_ids, ['AUTH-004']);
assert.deepEqual(opi2.authored_candidate_authority, ['CANDIDATE']);
assert.equal(opi2.historical_possession_claim, false);
assert.equal(opi2.answer_patterns.affirmative.pattern, '[NICKNAME]');
assert.equal(opi2.answer_patterns.negative.form, 'NE VAMAKALA');
assert.deepEqual(opi2.answer_patterns.negative.glyph_ids, ['G12','G02','G31','G01','G11','G01','G23','G01','G14','G01']);

assert.equal(matrix.summary.reviewed, 10);
assert.equal(matrix.summary.validated, 6);
assert.equal(matrix.summary.validated_percent, 60);
assert.equal(matrix.summary.authored_current_state, 4);
assert.deepEqual(matrix.validated_slots, ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_VALIDATED').length, 6);
assert.equal(matrix.cards.filter(x => x.review_state === 'REVIEWED_HOLD').length, 4);

assert.equal(opi2Batch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.ok(opi2Batch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(opi2Batch.applied_effect.L01_OPI_validated_after, 6);
assert.equal(opi2Batch.applied_effect.authored_language_candidates_after, 4);
assert.equal(opi2Batch.applied_effect.governed_unique_language_assets_after, 35);
assert.equal(opi2Transition.status, 'APPLIED');
assert.equal(opi2Transition.after, 'VALIDATED');
assert.equal(opi2Transition.language_authority_effect.NE, 'CANDIDATE_UNCHANGED_AFTER_ENTRY');
assert.equal(opi2Transition.language_authority_effect.HAVE_verb_created, false);
assert.equal(opi2Transition.language_authority_effect.global_negation_rule_granted, false);

assert.equal(nePromotion.status, 'PROMOTED_TO_CANONICAL_AUTHORED_REGISTRY_AS_CANDIDATE');
assert.equal(nePromotion.canonical_id, 'AUTH-004');
assert.equal(nePromotion.form, 'NE');
assert.equal(nePromotion.authority, 'CANDIDATE');
assert.equal(nePromotion.historical_recovery_claim, false);
assert.deepEqual(nePromotion.glyph_ids, ['G12','G02']);
assert.equal(nePromotion.promotion_effect.recovered_cycle1_forms_after, 31);
assert.equal(nePromotion.promotion_effect.authored_cycle1_candidates_after, 4);
assert.equal(nePromotion.promotion_effect.governed_unique_language_assets_after, 35);

assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(vAni.boundaries.modify_master_lexicon_meaning, false);
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.dependency.authority, 'GATE');

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 4);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN','VALA','KUON','NE']);
assert.equal(lex.governed_unique_language_assets, 35);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 24.3056);
assert.equal(evidence.validation_evidence.L01_OPI_reviewed, 10);
assert.equal(evidence.validation_evidence.L01_OPI_authored_or_better, 10);
assert.equal(evidence.validation_evidence.L01_OPI_authored_current_state, 4);
assert.equal(evidence.validation_evidence.L01_OPI_validated, 6);
assert.deepEqual(evidence.validation_evidence.L01_OPI_validated_slots, ['L01-OPI-002','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-010']);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V5');
console.log('1008 slots locked; L01 OPI 10 authored-or-better, 6 VALIDATED, 4 AUTHORED-HOLD, 0 FROZEN; NE is AUTH-004 CANDIDATE and recovered-form count remains 31.');
