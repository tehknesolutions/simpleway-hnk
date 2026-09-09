import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const wh = await json('curriculum/cycle-01/L01-kether/recovery/wh-system-recovery.v1.json');
const contrast = await json('curriculum/cycle-01/L01-kether/recovery/ku-zamo-contrastive-analysis.v1.json');
const activityV1 = await json('curriculum/cycle-01/L01-kether/authoring/opi-006.activity-frame.v1.json');
const activityV2 = await json('curriculum/cycle-01/L01-kether/authoring/opi-006.activity-frame.v2.json');
const kuvanPromotion = await json('proposals/language/HNK_KUVAN_PROMOTION_RECORD_V1.json');
const valaPromotion = await json('proposals/language/HNK_VALA_PROMOTION_RECORD_V1.json');
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

// Preserve the historical V1 design failure and the governed V2 resolution.
assert.equal(activityV1.implementation_state, 'MISSING');
assert.equal(activityV1.new_lexeme_required, false);
assert.equal(activityV2.implementation_state, 'AUTHORED');
assert.equal(activityV2.hnk_question, 'EN KU VALA KE');
assert.equal(activityV2.validation_state, 'HOLD_AUTHORED_CANDIDATE_AND_INFERRED_GRAMMAR');

const opi4 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-004');
const opi5 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-005');
const opi6 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-006');
const opi8 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-008');
assert.equal(opi4.hnk_question, 'EN SARADAYA KUVAN KE');
assert.deepEqual(opi4.authored_candidate_ids, ['AUTH-001']);
assert.equal(opi5.hnk_question, 'EN VALI KUVAN KE');
assert.deepEqual(opi5.authored_candidate_ids, ['AUTH-001']);
assert.equal(opi6.hnk_question, 'EN KU VALA KE');
assert.deepEqual(opi6.authored_candidate_ids, ['AUTH-002']);
assert.equal(opi8.hnk_question, 'EN KU VAMAVALA KE');

console.log('PASS SWHNK-INTERROGATIVE-AUTHORING-V2');
console.log('KU remains historically unglossed by exact WH type; KUVAN and VALA remain authored CANDIDATE assets.');
