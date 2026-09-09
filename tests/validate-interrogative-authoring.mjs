import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const wh = await json('curriculum/cycle-01/L01-kether/recovery/wh-system-recovery.v1.json');
const contrast = await json('curriculum/cycle-01/L01-kether/recovery/ku-zamo-contrastive-analysis.v1.json');
const activityV1 = await json('curriculum/cycle-01/L01-kether/authoring/opi-006.activity-frame.v1.json');
const activityV2 = await json('curriculum/cycle-01/L01-kether/authoring/opi-006.activity-frame.v2.json');
const opi7 = await json('curriculum/cycle-01/L01-kether/authoring/opi-007.residence-frame.v1.json');
const kuvanPromotion = await json('proposals/language/HNK_KUVAN_PROMOTION_RECORD_V1.json');
const valaPromotion = await json('proposals/language/HNK_VALA_PROMOTION_RECORD_V1.json');
const kuonPromotion = await json('proposals/language/HNK_KUON_PROMOTION_RECORD_V1.json');
const vAni = await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');
const valency = await json('proposals/language/HNK_RESIDENCE_VALENCY_RULE_V1.json');
const opiBindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');

assert.equal(wh.status, 'RECOVERY_HYPOTHESIS_NOT_CANON');
const ku = wh.hypotheses.find(x => x.form === 'KU');
assert.ok(ku);
assert.equal(ku.canonical, false);
assert.equal(ku.role, 'INTERROGATIVE_CONTENT_SELECTOR_OR_DETERMINER');
assert.equal(ku.likely_position, 'PRE_NOMINAL_WITHIN_CONTENT_PHRASE');
assert.deepEqual(ku.not_authorized_as, ['WHAT','WHICH','WHERE','WHO','HOW']);
assert.equal(contrast.inference.KU.exact_english_gloss, null);
assert.equal(contrast.inference.KU.canonical, false);

assert.equal(kuvanPromotion.status, 'PROMOTED_TO_CANONICAL_AUTHORED_REGISTRY_AS_CANDIDATE');
assert.equal(kuvanPromotion.canonical_id, 'AUTH-001');
assert.equal(kuvanPromotion.authority, 'CANDIDATE');
assert.equal(kuvanPromotion.historical_recovery_claim, false);

assert.equal(valaPromotion.status, 'PROMOTED_TO_CANONICAL_AUTHORED_REGISTRY_AS_CANDIDATE');
assert.equal(valaPromotion.canonical_id, 'AUTH-002');
assert.equal(valaPromotion.authority, 'CANDIDATE');
assert.equal(valaPromotion.historical_recovery_claim, false);

assert.equal(kuonPromotion.status, 'PROMOTED_TO_CANONICAL_AUTHORED_REGISTRY_AS_CANDIDATE');
assert.equal(kuonPromotion.canonical_id, 'AUTH-003');
assert.equal(kuonPromotion.authority, 'CANDIDATE');
assert.equal(kuonPromotion.historical_recovery_claim, false);
assert.equal(kuonPromotion.dependency.form, 'ON');
assert.equal(kuonPromotion.dependency.authority, 'GATE');
assert.equal(kuonPromotion.dependency.promotion_effect_on_dependency, 'NONE');

// Preserve historical uncertainty around VANI even while using it in a test frame.
assert.equal(vAni.status, 'WATCH_SEMANTIC_HYPOTHESIS_NOT_LEXICON_PROMOTION');
assert.equal(vAni.target_form.form, 'VANI');
assert.equal(vAni.target_form.current_authority, 'WATCH');
assert.equal(vAni.target_form.current_meaning, null);
assert.equal(vAni.boundaries.modify_master_lexicon_meaning, false);
assert.equal(vAni.boundaries.promote_authority, false);
assert.equal(vAni.boundaries.curriculum_rebind_created, false);

// Preserve the historical OPI6 V1 failure and its governed V2 resolution.
assert.equal(activityV1.implementation_state, 'MISSING');
assert.equal(activityV1.new_lexeme_required, false);
assert.equal(activityV2.implementation_state, 'AUTHORED');
assert.equal(activityV2.hnk_question, 'EN KU VALA KE');
assert.equal(activityV2.validation_state, 'HOLD_AUTHORED_CANDIDATE_AND_INFERRED_GRAMMAR');

// OPI7 is authored as two explicit microquestions; no English WITH particle is calqued.
assert.equal(opi7.implementation_state, 'AUTHORED');
assert.equal(opi7.design.strategy, 'TWO_MICROQUESTIONS_ONE_OPI_CARD');
assert.deepEqual(opi7.questions.map(x => x.hnk), ['EN VANI KUVAN KE','EN VANI KUON KE']);
assert.equal(opi7.comitative_design.overt_with_particle_added, false);
assert.equal(opi7.recovered_form_dependency.master_lexicon_meaning, null);
assert.equal(opi7.recovered_form_dependency.authority, 'WATCH');
assert.equal(opi7.progress_effect.AUTHORED_slots_after, 10);
assert.equal(opi7.progress_effect.VALIDATED_slots_after, 0);
assert.equal(valency.semantic_safety.does_not_create_WITH_lexeme, true);
assert.equal(valency.semantic_safety.does_not_change_LEX_031_meaning, true);
assert.equal(valency.semantic_safety.does_not_claim_historical_valency, true);

const opi4 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-004');
const opi5 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-005');
const opi6 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-006');
const bound7 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-007');
const opi8 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-008');
assert.equal(opi4.hnk_question, 'EN SARADAYA KUVAN KE');
assert.deepEqual(opi4.authored_candidate_ids, ['AUTH-001']);
assert.equal(opi5.hnk_question, 'EN VALI KUVAN KE');
assert.deepEqual(opi5.authored_candidate_ids, ['AUTH-001']);
assert.equal(opi6.hnk_question, 'EN KU VALA KE');
assert.deepEqual(opi6.authored_candidate_ids, ['AUTH-002']);
assert.deepEqual(bound7.hnk_question_sequence, ['EN VANI KUVAN KE','EN VANI KUON KE']);
assert.deepEqual(bound7.authored_candidate_ids, ['AUTH-001','AUTH-003']);
assert.deepEqual(bound7.experimental_recovered_form_meaning, [null]);
assert.equal(bound7.comitative_strategy.overt_with_particle_added, false);
assert.equal(opi8.hnk_question, 'EN KU VAMAVALA KE');

console.log('PASS SWHNK-INTERROGATIVE-AUTHORING-V3');
console.log('KU remains historically unglossed by exact WH type; KUVAN/VALA/KUON remain authored CANDIDATE assets; VANI stays WATCH meaning=null; L01 OPI authorship is 10/10 with validation still pending.');
