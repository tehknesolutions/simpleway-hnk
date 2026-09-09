import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const authoring = await json('schemas/hnk-lexeme-authoring-contract.v1.json');
const decisions = await json('curriculum/cycle-01/L01-kether/authoring/authoring-decisions.v1.json');
const hypotheses = await json('curriculum/cycle-01/L01-kether/recovery/token-hypotheses.v1.json');
const promotion = await json('proposals/language/HNK_RECOVERED_TOKEN_PROMOTION_V1.json');
const grammar = await json('proposals/language/HNK_GRAMMAR_CANDIDATE_V1.json');

assert.equal(authoring.contract_id, 'HNK-LEXEME-AUTHORING-CONTRACT-V1');
assert.equal(authoring.status, 'ACTIVE_FOR_CANDIDATE_AUTHORING');
assert.equal(authoring.known_runtime_boundary.hnk40_glyph_count, 40);
assert.equal(authoring.known_runtime_boundary.safe_transliteration_units.length, 20);
assert.equal(authoring.known_runtime_boundary.safe_transliteration_gids.length, 20);
assert.equal(authoring.candidate_defaults.authority, 'CANDIDATE');
assert.equal(authoring.candidate_defaults.transliteration, null);
assert.ok(authoring.prohibitions.some(x => x.includes('unmapped G-ID')));

assert.equal(decisions.decision_id, 'SWHNK-L01-AUTHORING-DECISIONS-V1');
assert.equal(decisions.metrics.new_forms_created_in_this_decision, 0);
const vali = decisions.decisions.find(x => x.form === 'VALI');
assert.equal(vali.decision, 'PROPOSE_EXISTING_LEXEME_REBIND');
assert.equal(vali.canonical_registry_changed, false);
const vame = decisions.decisions.find(x => x.form === 'VAME');
assert.equal(vame.decision, 'KEEP_EXISTING_FORM_GATED_DO_NOT_REBIND');
assert.equal(vame.canonical_registry_changed, false);
assert.ok(decisions.decisions.filter(x => x.decision.includes('OPEN_')).every(x => x.form === null));

assert.equal(hypotheses.status, 'RECOVERY_HYPOTHESES_NOT_CANON');
assert.equal(hypotheses.rules.creates_lexemes, false);
assert.equal(hypotheses.rules.creates_grammar_canon, false);
for (const token of ['AN','EN','ZAMI','KE']) {
  const item = hypotheses.hypotheses.find(x => x.token === token);
  assert.ok(item, `missing token hypothesis ${token}`);
  assert.equal(item.confidence, 'INFERRED');
}
for (const token of ['KU','KALA','YA','ES','SARI','LO','DA']) {
  const item = hypotheses.hypotheses.find(x => x.token === token);
  assert.ok(item, `missing unresolved token ${token}`);
  assert.equal(item.confidence, 'UNKNOWN');
}

assert.equal(promotion.status, 'PROPOSAL_NOT_APPLIED_TO_CANON');
assert.deepEqual(promotion.candidates.map(x => x.form), ['AN','EN','ZAMI','KE']);
assert.ok(promotion.candidates.every(x => x.proposed_authority === 'CANDIDATE'));
assert.ok(promotion.candidates.every(x => x.meaning_state === 'INFERRED_DISTRIBUTIONAL'));
assert.ok(promotion.must_not_promote.includes('KU'));
assert.ok(promotion.must_not_promote.includes('ZAMO'));

assert.equal(grammar.status, 'CANDIDATE_NOT_CANON');
assert.equal(grammar.evidence_led_rules.question_operator.candidate_form, 'KE');
assert.equal(grammar.evidence_led_rules.question_operator.canonical, false);
assert.equal(grammar.evidence_led_rules.first_person.candidate_form, 'AN');
assert.equal(grammar.evidence_led_rules.second_person.candidate_form, 'EN');
assert.equal(grammar.evidence_led_rules.speak_predicate.candidate_form, 'ZAMI');
assert.equal(grammar.evidence_led_rules.location_formative.candidate_segment, 'VAN');
assert.equal(grammar.evidence_led_rules.location_formative.productive_rule, false);
assert.equal(grammar.evidence_led_rules.action_final_i.productive_rule, false);
assert.ok(Object.values(grammar.still_undecided).every(x => x === null));

console.log('PASS SWHNK-LANGUAGE-PROPOSALS-V1');
console.log('Recovered, inferred, candidate and canonical boundaries remain distinct.');
