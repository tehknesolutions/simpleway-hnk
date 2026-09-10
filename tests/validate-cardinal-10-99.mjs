import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const proposal = JSON.parse(await readFile(new URL('../proposals/language/HNK_CARDINAL_10_99_POSITIONAL_COMPOSITION_V1.json', import.meta.url), 'utf8'));

const digits = {BIZO:0,DUVE:1,HOYU:2,KETI:3,LUSO:4,MUPI:5,NURA:6,PEVU:7,TOMI:8,ZOKA:9};
function decodeTwoTokenCardinal(hnk) {
  const parts = hnk.split(/\s+/).filter(Boolean);
  assert.equal(parts.length, 2, '10-99 proposal requires exactly two numeral tokens');
  assert.ok(parts[0] in digits && parts[1] in digits, 'unknown numeral token');
  assert.notEqual(digits[parts[0]], 0, 'leading zero is outside 10-99 range');
  return digits[parts[0]] * 10 + digits[parts[1]];
}

assert.equal(proposal.status, 'AUTHORING_RULE_PROPOSAL_NOT_CANON');
assert.equal(proposal.rule.schema, 'DIGIT_TENS DIGIT_UNITS');
assert.equal(proposal.rule.semantic_interpretation, '10 × value(first) + value(second)');
assert.equal(proposal.rule.domain_requirement, 'NUMERIC_CARDINAL_CONTEXT');
assert.deepEqual(proposal.rule.range, [10,99]);
assert.equal(proposal.rule.new_lexeme_required, false);
assert.equal(proposal.rule.ten_morpheme_required, false);
assert.equal(proposal.rule.base, 'DECIMAL_POSITIONAL_FOR_THIS_RULE');
assert.equal(proposal.rule.historical_grammar_claim, false);
assert.equal(proposal.rule.global_HNK_number_grammar_claim, false);

for (const example of proposal.examples) assert.equal(decodeTwoTokenCardinal(example.hnk), example.value);
assert.equal(decodeTwoTokenCardinal('DUVE TOMI'), 18);
assert.equal(decodeTwoTokenCardinal('LUSO HOYU'), 42);
assert.equal(decodeTwoTokenCardinal('ZOKA ZOKA'), 99);

assert.equal(proposal.age_application_proposal.year_unit, null);
assert.equal(proposal.age_application_proposal.SARASALA_authority, 'WATCH_UNCHANGED');
assert.equal(proposal.age_application_proposal.OPI3_validation_implied, false);
assert.equal(proposal.boundaries.numeral_primitives_remain_CANDIDATE, true);
assert.equal(proposal.boundaries.recovered_lexicon_changed, false);
assert.equal(proposal.boundaries.base12_claim, false);
assert.equal(proposal.boundaries['100_plus_rule_created'], false);
assert.equal(proposal.projected_effect_if_approved_rule_only.L01_OPI_validated, 7);
assert.equal(proposal.projected_effect_if_rule_and_age_application_approved.L01_OPI_validated_after, 8);

console.log('PASS SWHNK-HNK-CARDINAL-10-99-V1');
console.log('10-99 positional proposal is deterministic and creates no new lexemes; OPI3 remains HOLD until explicit human approval of the age application.');
