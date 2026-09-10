import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const technical = await json('curriculum/cycle-01/L01-kether/validation/opi-001.validation.v1.json');
const semanticReview = await json('curriculum/cycle-01/L01-kether/validation/opi-001.semantic-review.v1.json');
const humanBatch = await json('curriculum/cycle-01/L01-kether/validation/opi-001-whole-utterance-human-batch.v1.json');
const transition = await json('curriculum/cycle-01/L01-kether/validation/opi-001.validated-transition.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');

const expectedGlyphIds = ['G23','G01','G14','G01','G40','G01','G02','G12','G02','G26','G23','G05','G23','G02'];

assert.equal(technical.validation_id, 'SWHNK-L01-OPI-001-VALIDATION-V1');
assert.equal(technical.status, 'TECHNICAL_PASS_SEMANTIC_HOLD');
assert.equal(technical.source_phrase.phrase_id, 'PHR-001');
assert.equal(technical.source_phrase.transliteration, 'KALA YA EN ES KU KE');
assert.equal(technical.source_phrase.certainty, 'APPROXIMATE');
assert.deepEqual(technical.glyph_ids, expectedGlyphIds);
assert.equal(technical.glyph_count, 14);
assert.deepEqual(technical.unresolved_transliteration_units, []);
assert.equal(technical.hnk40_authority.structural_ids_authoritative, true);
assert.equal(technical.hnk40_authority.visual_canon_claimed, false);

assert.equal(semanticReview.status, 'HOLD_APPROXIMATE_GLOSS_TOKEN_ALIGNMENT_UNRECOVERED');
assert.deepEqual(semanticReview.evidence_balance.unresolved_tokens, ['YA','ES']);
assert.deepEqual(semanticReview.evidence_balance.inferred_not_canonical_tokens, ['KALA','EN','KU','KE']);
assert.equal(semanticReview.decision.whole_slot_validated, false);

assert.equal(humanBatch.status, 'APPROVED_AND_APPLIED_SCOPED_COURSE_VALIDATION');
assert.equal(humanBatch.source_basis.phrase_id, 'PHR-001');
assert.equal(humanBatch.source_basis.certainty, 'APPROXIMATE_UNCHANGED');
assert.ok(humanBatch.decisions.every(x => x.decision === 'APPROVED_SCOPED'));
assert.equal(humanBatch.applied_effect.token_gloss_promotions, 0);
assert.equal(humanBatch.applied_effect.language_authority_promotions, 0);

assert.equal(transition.status, 'APPLIED');
assert.equal(transition.after, 'VALIDATED');
assert.equal(transition.validation_model, 'WHOLE_UTTERANCE_FORMULA_WITHOUT_TOKEN_GLOSS_PROMOTION');
assert.equal(transition.token_boundary.YA_meaning, null);
assert.equal(transition.token_boundary.ES_meaning, null);
assert.equal(transition.token_boundary.token_gloss_promotions, 0);
assert.equal(transition.language_authority_effect, 'NONE');
assert.equal(transition.answer_schema, '[PERSONAL_NAME]');

const binding = bindings.bindings.find(x => x.slot_id === 'L01-OPI-001');
assert.ok(binding);
assert.equal(binding.implementation_state, 'VALIDATED');
assert.equal(binding.validation_state, 'VALIDATED_FOR_L01_V1_1_COURSE_USE_AS_RECOVERED_WHOLE_UTTERANCE');
assert.equal(binding.phrase_id, 'PHR-001');
assert.equal(binding.phrase_certainty, 'APPROXIMATE_UNCHANGED');
assert.equal(binding.token_semantics.YA, null);
assert.equal(binding.token_semantics.ES, null);
assert.deepEqual(binding.glyph_ids, expectedGlyphIds);
assert.equal(binding.answer_pattern.pattern, '[PERSONAL_NAME]');
assert.equal(binding.answer_pattern.status, 'VALIDATED_FOR_L01_V1_1_COURSE_USE');

assert.equal(bindings.metrics.authored_or_better, 10);
assert.equal(bindings.metrics.authored_current_state, 0);
assert.equal(bindings.metrics.validated, 10);
assert.equal(bindings.metrics.frozen, 0);
assert.ok(bindings.metrics.validated_opi.includes('L01-OPI-001'));
assert.deepEqual(bindings.metrics.reviewed_hold_opi, []);

console.log('PASS SWHNK-L01-OPI-001-WHOLE-UTTERANCE-VALIDATED-V2');
console.log('OPI001 stays validated as a recovered whole-utterance formula while YA/ES remain unresolved; L01 OPI overall is now 10/10 VALIDATED.');
