import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const validation = await json('curriculum/cycle-01/L01-kether/validation/opi-001.validation.v1.json');
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

const binding = bindings.bindings.find(x => x.slot_id === 'L01-OPI-001');
assert.ok(binding);
assert.deepEqual(binding.glyph_ids, expectedGlyphIds);
assert.equal(binding.validation_state, 'TECHNICAL_PASS_SEMANTIC_HOLD');
assert.equal(binding.answer_pattern.pattern, '[PERSONAL_NAME]');
assert.equal(bindings.metrics.authored, 1);
assert.equal(bindings.metrics.question_technical_pass, 1);
assert.equal(bindings.metrics.validated, 0);

console.log('PASS SWHNK-L01-OPI-001-TECHNICAL-V1');
console.log('Question G-ID sequence verified; whole-slot semantic promotion remains HOLD.');
