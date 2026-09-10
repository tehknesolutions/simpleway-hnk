import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const recovery = await json('curriculum/cycle-01/L01-kether/recovery/number-system-recovery.v1.json');
const bridge = await json('proposals/language/HNK_NUMERIC_LITERAL_BRIDGE_V1.json');
const triage = await json('curriculum/cycle-01/L01-kether/validation/remaining-hold-triage.v1.json');

assert.equal(recovery.status, 'NO_HISTORICAL_NUMERAL_LEXICON_RECOVERED');
assert.equal(recovery.sources_checked.github.historical_numeral_system_found, false);
assert.equal(recovery.sources_checked.file_library.historical_numeral_system_found, false);
assert.equal(recovery.sources_checked.google_drive.historical_numeral_system_found, false);
assert.ok(recovery.confirmed_absences.some(x => x.includes('0-9')));

assert.equal(bridge.status, 'AUTHORING_ARCHITECTURE_PROPOSAL_NOT_CANON');
assert.equal(bridge.layers.display_bridge.status, 'EXTERNAL_NOTATION_BRIDGE');
assert.equal(bridge.layers.display_bridge.hnk_glyph_claim, false);
assert.equal(bridge.layers.display_bridge.spoken_hnk_claim, false);
assert.equal(bridge.layers.spoken_hnk.status, 'UNAUTHORED');
assert.equal(bridge.digit_concepts.length, 10);
assert.deepEqual(bridge.digit_concepts.map(x => x.value), [0,1,2,3,4,5,6,7,8,9]);
assert.ok(bridge.digit_concepts.every(x => x.hnk_form === null));
assert.ok(bridge.digit_concepts.every(x => x.glyph_ids === null));
assert.ok(bridge.digit_concepts.every(x => x.transliteration === null));
assert.ok(bridge.digit_concepts.every(x => x.authority === 'MISSING_AUTHORING_REQUIRED'));
assert.equal(bridge.composition.internal_HNK_base, null);
assert.equal(bridge.composition.spoken_cardinal_rule, null);
assert.equal(bridge.age_use.display_answer_pattern, '[NUMERIC_LITERAL]');
assert.equal(bridge.age_use.spoken_answer_pattern, null);
assert.equal(bridge.age_use.year_unit, null);
assert.equal(bridge.governance.numerology_may_select_forms, false);
assert.equal(bridge.governance.visual_glyph_shape_may_select_meanings, false);
assert.equal(bridge.explicit_non_effects.includes('Does not validate L01 OPI 3.'), true);
assert.equal(bridge.explicit_non_effects.includes('Does not promote SARASALA from WATCH.'), true);

assert.equal(triage.selected_next, 'L01-OPI-003');
assert.equal(triage.selected_next_gate, 'SWHNK-HNK-NUMBER-SYSTEM-RECOVERY-AND-DESIGN-V1');

console.log('PASS SWHNK-HNK-NUMBER-SYSTEM-V1');
console.log('Historical numerals remain unrecovered; numeric literals are bridge notation only; spoken HNK 0-9 forms remain null and OPI003 stays HOLD.');
