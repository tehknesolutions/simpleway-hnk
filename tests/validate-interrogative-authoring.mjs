import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const wh = await json('curriculum/cycle-01/L01-kether/recovery/wh-system-recovery.v1.json');
const disambiguation = await json('curriculum/cycle-01/L01-kether/authoring/content-question-disambiguation.v1.json');
const activity = await json('curriculum/cycle-01/L01-kether/authoring/opi-006.activity-frame.v1.json');
const kuvan = await json('proposals/language/HNK_KUVAN_LOCATIVE_INTERROGATIVE_PROPOSAL_V1.json');
const rule = await json('proposals/language/HNK_COMPOSITIONAL_INTERROGATIVE_RULE_V1.json');
const promotion = await json('proposals/language/HNK_KUVAN_PROMOTION_RECORD_V1.json');
const opiBindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');

assert.equal(wh.status, 'RECOVERY_HYPOTHESIS_NOT_CANON');
const ku = wh.hypotheses.find(x => x.form === 'KU');
assert.ok(ku);
assert.equal(ku.canonical, false);
assert.deepEqual(ku.not_authorized_as, ['WHAT','WHERE','WHO','HOW']);

assert.equal(disambiguation.recovered_inferences.KU.specific_wh, null);
assert.equal(activity.implementation_state, 'MISSING');
assert.equal(activity.new_lexeme_required, false);

assert.equal(kuvan.status, 'AUTHORING_PROPOSAL_NOT_CANON');
assert.equal(kuvan.candidate.form, 'KUVAN');
assert.equal(kuvan.candidate.proposed_authority, 'CANDIDATE');
assert.equal(kuvan.candidate.historical_recovery_claim, false);
assert.deepEqual(kuvan.candidate.glyph_ids, ['G23','G05','G31','G01','G12']);

assert.equal(rule.status, 'AUTHORING_RULE_PROPOSAL_NOT_CANON');
assert.equal(rule.form.productivity, 'CLOSED_LIST_ONLY');
assert.equal(rule.form.automatic_generation, false);
assert.equal(rule.allowed_v1.length, 1);
assert.equal(rule.allowed_v1[0].compound, 'KUVAN');
assert.equal(rule.semantic_safety.does_not_retroactively_define_KU, true);
assert.equal(rule.semantic_safety.does_not_make_VAN_productive_globally, true);
assert.equal(rule.semantic_safety.does_not_assign_meanings_to_PHR_004_005_006, true);

assert.equal(promotion.status, 'PROMOTED_TO_CANONICAL_AUTHORED_REGISTRY_AS_CANDIDATE');
assert.equal(promotion.canonical_registry, '@hnk/linguas/authored');
assert.equal(promotion.canonical_id, 'AUTH-001');
assert.equal(promotion.authority, 'CANDIDATE');
assert.equal(promotion.historical_recovery_claim, false);
assert.equal(promotion.promotion_effect.recovered_cycle1_forms_after, 31);
assert.equal(promotion.promotion_effect.authored_cycle1_candidates_after, 1);
assert.equal(promotion.promotion_effect.governed_unique_language_assets_after, 32);

const opi4 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-004');
const opi5 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-005');
const opi8 = opiBindings.bindings.find(x => x.slot_id === 'L01-OPI-008');
assert.equal(opi4.hnk_question, 'EN SARADAYA KUVAN KE');
assert.deepEqual(opi4.authored_candidate_ids, ['AUTH-001']);
assert.equal(opi5.hnk_question, 'EN VALI KUVAN KE');
assert.deepEqual(opi5.authored_candidate_ids, ['AUTH-001']);
assert.equal(opi8.hnk_question, 'EN VAMAVALA KU KE');

console.log('PASS SWHNK-INTERROGATIVE-AUTHORING-V1');
console.log('KUVAN is canonical authored CANDIDATE only; KU remains historically unresolved by WH type; OPI006 stays gated.');
