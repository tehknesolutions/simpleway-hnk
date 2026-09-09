import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const validation = await json('curriculum/cycle-01/L01-kether/validation/opi-001.validation.v1.json');
const semanticReview = await json('curriculum/cycle-01/L01-kether/validation/opi-001.semantic-review.v1.json');
const bindings = await json('curriculum/cycle-01/L01-kether/authoring/opi-bindings.v1.json');

const expectedGlyphIds = [
  'G23','G01','G14','G01',
  'G40','G01',
  'G02','G12',
  'G02','G26',
  'G23','G05',
  'G23','G02'
];

assert.equal(validation.validation_id, 'SWHNK-L01-OPI-001-VALIDATION-V1');
assert.equal(validation.status, 'TECHNICAL_PASS_SEMANTIC_HOLD');
assert.equal(validation.source_phrase.phrase_id, 'PHR-001');
assert.equal(validation.source_phrase.transliteration, 'KALA YA EN ES KU KE');
assert.equal(validation.source_phrase.certainty, 'APPROXIMATE');
assert.deepEqual(validation.glyph_ids, expectedGlyphIds);
assert.equal(validation.glyph_count, 14);
assert.deepEqual(validation.unresolved_transliteration_units, []);
assert.equal(validation.hnk40_authority.structural_ids_authoritative, true);
assert.equal(validation.hnk40_authority.visual_canon_claimed, false);
assert.equal(validation.answer_strategy.pattern, '[PERSONAL_NAME]');
assert.equal(validation.answer_strategy.hnk_function_words_added, false);
assert.equal(validation.checks.glyph_id_generation, 'PASS');
assert.equal(validation.checks.human_linguistic_review, 'PENDING');
assert.equal(validation.promotion.implementation_state, 'AUTHORED');
assert.equal(validation.promotion.slot_validation, 'HOLD');

assert.equal(semanticReview.review_id, 'SWHNK-L01-OPI-001-WHOLE-SLOT-SEMANTIC-REVIEW-V1');
assert.equal(semanticReview.status, 'HOLD_APPROXIMATE_GLOSS_TOKEN_ALIGNMENT_UNRECOVERED');
assert.equal(semanticReview.recovery_sweep.file_library.lesson1_release_payload_found, false);
assert.equal(semanticReview.recovery_sweep.file_library.lesson1_data_js_found, false);
assert.equal(semanticReview.recovery_sweep.google_drive.exact_phrase_source_with_token_glosses_found, false);
assert.equal(semanticReview.recovery_sweep.github.project_scoped_exact_phrase_source_with_token_glosses_found, false);
assert.deepEqual(semanticReview.evidence_balance.unresolved_tokens, ['YA','ES']);
assert.deepEqual(semanticReview.evidence_balance.inferred_not_canonical_tokens, ['KALA','EN','KU','KE']);
const kala = semanticReview.token_alignment.find(x => x.token === 'KALA');
assert.equal(kala.semantic_state, 'INFERRED_STRONG_MORPHOLOGICAL_DOMAIN');
assert.equal(kala.candidate_role, 'name / name-domain');
assert.equal(kala.canonical_gloss_assigned, false);
assert.equal(semanticReview.decision.whole_slot_validated, false);
assert.equal(semanticReview.progress_effect.L01_OPI_AUTHORED, 10);
assert.equal(semanticReview.progress_effect.L01_OPI_VALIDATED, 0);

const binding = bindings.bindings.find(x => x.slot_id === 'L01-OPI-001');
assert.ok(binding);
assert.deepEqual(binding.glyph_ids, expectedGlyphIds);
assert.equal(binding.validation_state, 'TECHNICAL_PASS_SEMANTIC_HOLD');
assert.equal(binding.answer_pattern.pattern, '[PERSONAL_NAME]');
assert.equal(bindings.metrics.authored, 10);
assert.equal(bindings.metrics.question_technical_pass, 1);
assert.equal(bindings.metrics.validated, 0);
assert.equal(bindings.metrics.frozen, 0);

console.log('PASS SWHNK-L01-OPI-001-TECHNICAL-AND-SEMANTIC-REVIEW-V1');
console.log('Question G-ID sequence passes; KALA has strong name-domain evidence; YA/ES remain unresolved; whole-slot validation remains HOLD; L01 stays 10 AUTHORED / 0 VALIDATED.');
