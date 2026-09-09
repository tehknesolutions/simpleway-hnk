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

assert.equal(wh.status, 'RECOVERY_HYPOTHESIS_NOT_CANON');
const ku = wh.hypotheses.find(x => x.form === 'KU');
assert.ok(ku);
assert.equal(ku.canonical, false);
assert.deepEqual(ku.not_authorized_as, ['WHAT','WHERE','WHO','HOW']);

assert.equal(disambiguation.status, 'AUTHORING_REQUIRED_NO_RECOVERED_WH_CANON');
assert.equal(disambiguation.recovered_inferences.KU.specific_wh, null);
assert.equal(disambiguation.critical_collision.form, 'EN VALI KU KE');
assert.equal(disambiguation.critical_collision.current_binding, 'L01-OPI-005 Where do you work?');
assert.equal(disambiguation.critical_collision.forbidden_second_binding, 'L01-OPI-006 What do you do at work/school?');

assert.equal(activity.status, 'DESIGN_GATE_NO_SLOT_PROMOTION');
assert.equal(activity.implementation_state, 'MISSING');
assert.equal(activity.new_lexeme_required, false);
assert.equal(activity.new_grammar_or_recovery_required, true);
assert.equal(activity.progress_effect.AUTHORED_slots_before, 5);
assert.equal(activity.progress_effect.AUTHORED_slots_after, 5);
const duplicateProbe = activity.candidate_probes_rejected_or_held.find(x => x.form === 'EN VALI KU KE');
assert.equal(duplicateProbe.decision, 'REJECT_FOR_OPI006_CURRENTLY');

assert.equal(kuvan.status, 'AUTHORING_PROPOSAL_NOT_CANON');
assert.equal(kuvan.candidate.form, 'KUVAN');
assert.equal(kuvan.candidate.proposed_authority, 'CANDIDATE');
assert.equal(kuvan.candidate.historical_recovery_claim, false);
assert.equal(kuvan.candidate.master_lexicon_exact_collision, false);
assert.deepEqual(kuvan.candidate.glyph_ids, ['G23','G05','G31','G01','G12']);
assert.equal(kuvan.candidate.phonotactic_shape, 'CVCVC');
assert.equal(kuvan.progress_effect.change, 0);

assert.equal(rule.status, 'AUTHORING_RULE_PROPOSAL_NOT_CANON');
assert.equal(rule.form.productivity, 'CLOSED_LIST_ONLY');
assert.equal(rule.form.automatic_generation, false);
assert.equal(rule.allowed_v1.length, 1);
assert.equal(rule.allowed_v1[0].compound, 'KUVAN');
assert.ok(rule.not_allowed_v1.some(x => x.pattern === 'KU + ON'));
assert.ok(rule.not_allowed_v1.some(x => x.pattern === 'KU + SARASALA'));
assert.equal(rule.semantic_safety.does_not_retroactively_define_KU, true);
assert.equal(rule.semantic_safety.does_not_make_VAN_productive_globally, true);
assert.equal(rule.semantic_safety.does_not_assign_meanings_to_PHR_004_005_006, true);
assert.equal(rule.semantic_safety.does_not_promote_any_WATCH_GATE_form, true);

console.log('PASS SWHNK-INTERROGATIVE-AUTHORING-V1');
console.log('KU remains unresolved by WH type; KUVAN remains candidate-only; OPI006 collision stays blocked.');
