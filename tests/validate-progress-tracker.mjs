import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const contract = await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const evidence = await json('progress/evidence-overrides.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');
const matrix = await json('curriculum/cycle-01/L01-kether/validation/opi-validation-matrix.v1.json');
const numeralBatch = await json('curriculum/cycle-01/L01-kether/validation/spoken-numeral-0-9-candidate-promotion-batch.v1.json');
const ageBatch = await json('curriculum/cycle-01/L01-kether/validation/opi-003-age-cardinal-human-batch.v1.json');
const ageTransition = await json('curriculum/cycle-01/L01-kether/validation/opi-003.validated-transition.v1.json');
const cardinal = await json('proposals/language/HNK_CARDINAL_10_99_POSITIONAL_COMPOSITION_V1.json');
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
assert.equal(values.filter(x => x.implementation_state === 'AUTHORED').length, 2);
assert.equal(values.filter(x => x.implementation_state === 'VALIDATED').length, 8);
assert.equal(values.filter(x => ['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length, 10);
assert.equal(values.filter(x => x.implementation_state === 'FROZEN').length, 0);
assert.equal(values.filter(x => x.scaffolded).length, 82);

assert.equal(bindings.status, 'AUTHORING_COMPLETE_10_OF_10_VALIDATION_ACTIVE_8_OF_10_VALIDATED');
assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 2);
assert.equal(bindings.metrics.validated, 8);
assert.equal(bindings.metrics.frozen, 0);
assert.deepEqual(bindings.metrics.validated_opi, ['L01-OPI-002','L01-OPI-003','L01-OPI-004','L01-OPI-005','L01-OPI-006','L01-OPI-008','L01-OPI-009','L01-OPI-010']);
assert.deepEqual(bindings.metrics.reviewed_hold_opi, ['L01-OPI-001','L01-OPI-007']);

const opi3 = bindings.bindings.find(x => x.slot_id === 'L01-OPI-003');
assert.equal(opi3.implementation_state, 'VALIDATED');
assert.equal(opi3.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_WITH_WATCH_VISIBLE_AND_SCOPED_CARDINALS');
assert.deepEqual(opi3.lexeme_authority, ['WATCH']);
assert.equal(opi3.answer_pattern.pattern, '[CARDINAL_0_99]');
assert.equal(opi3.answer_pattern.year_unit, null);
assert.deepEqual(opi3.answer_pattern.examples, {8:'TOMI',18:'DUVE TOMI',42:'LUSO HOYU'});
assert.equal(opi3.cardinal_rule.schema, 'DIGIT_TENS DIGIT_UNITS');
assert.equal(opi3.cardinal_rule.scope, 'CARDINAL_10_99_NUMERIC_CONTEXT_ONLY');
assert.equal(opi3.cardinal_rule['100_plus'], false);
assert.equal(opi3.numeral_authority, 'CANDIDATE_UNCHANGED');

assert.equal(ageBatch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(ageBatch.decisions.length, 4);
assert.ok(ageBatch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(ageBatch.applied_effect.L01_OPI_validated_after, 8);
assert.equal(ageBatch.applied_effect.language_authority_promotions, 0);
assert.equal(ageBatch.applied_effect.new_lexical_forms, 0);
assert.equal(ageTransition.status, 'APPLIED');
assert.equal(ageTransition.after, 'VALIDATED');
assert.equal(ageTransition.language_authority_effect.SARASALA, 'WATCH_UNCHANGED');
assert.equal(ageTransition.grammar_effect['100_plus'], 'NOT_GRANTED');
assert.equal(ageTransition.grammar_effect.ordinals, 'NOT_GRANTED');

assert.equal(cardinal.status, 'APPROVED_FOR_SCOPED_L01_OPI003_NUMERIC_CONTEXT_NOT_GLOBAL_CANON');
assert.equal(cardinal.rule.schema, 'DIGIT_TENS DIGIT_UNITS');
assert.equal(cardinal.rule.historical_grammar_claim, false);
assert.equal(cardinal.rule.global_HNK_number_grammar_claim, false);
assert.equal(cardinal.age_application.SARASALA_authority, 'WATCH_UNCHANGED');
assert.equal(cardinal.age_application.year_unit, null);
assert.equal(cardinal.boundaries.global_productivity_granted, false);

assert.equal(numeralBatch.status, 'APPROVED_AND_APPLIED_CANDIDATE_REGISTRATION');
assert.equal(numeralBatch.candidates.length, 10);
assert.ok(numeralBatch.candidates.every(x => x.authority === 'CANDIDATE'));
assert.equal(numeralBatch.applied_effect.recovered_cycle1_forms, 31);
assert.equal(numeralBatch.applied_effect.authored_cycle1_candidates_after, 14);
assert.equal(numeralBatch.applied_effect.governed_unique_language_assets_after, 45);
assert.equal(numeralBatch.applied_effect.new_FROZEN_forms, 0);

assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(kuon.authority, 'CANDIDATE');
assert.equal(kuon.dependency.authority, 'GATE');

const lex = evidence.lexical_evidence;
assert.equal(lex.unique_recovered_forms_linked_to_cycle1, 31);
assert.equal(lex.authored_candidate_forms_linked_to_cycle1, 14);
assert.deepEqual(lex.authored_candidate_forms, ['KUVAN','VALA','KUON','NE','BIZO','DUVE','HOYU','KETI','LUSO','MUPI','NURA','PEVU','TOMI','ZOKA']);
assert.deepEqual(lex.spoken_numeral_candidates, {0:'BIZO',1:'DUVE',2:'HOYU',3:'KETI',4:'LUSO',5:'MUPI',6:'NURA',7:'PEVU',8:'TOMI',9:'ZOKA'});
assert.equal(lex.governed_unique_language_assets, 45);
assert.equal(lex.recovered_proxy_percent, 21.5278);
assert.equal(lex.governed_asset_proxy_percent, 31.25);
assert.equal(lex.lesson_authored_candidates.L01, 14);
assert.equal(evidence.validation_evidence.L01_OPI_authored_current_state, 2);
assert.equal(evidence.validation_evidence.L01_OPI_validated, 8);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V8');
console.log('1008 slots locked; 8/10 L01 OPI validated; OPI3 uses scoped 0-99 cardinals with SARASALA=WATCH and numeral CANDIDATE authorities unchanged; governed assets remain 45.');
