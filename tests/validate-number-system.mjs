import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const recovery = await json('curriculum/cycle-01/L01-kether/recovery/number-system-recovery.v1.json');
const bridge = await json('proposals/language/HNK_NUMERIC_LITERAL_BRIDGE_V1.json');
const spoken = await json('proposals/language/HNK_SPOKEN_NUMERAL_0_9_AUTHORING_DECISION_V1.json');
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
assert.equal(bridge.composition.internal_HNK_base, null);
assert.equal(bridge.age_use.display_answer_pattern, '[NUMERIC_LITERAL]');
assert.equal(bridge.age_use.spoken_answer_pattern, null);
assert.equal(bridge.age_use.year_unit, null);
assert.equal(bridge.governance.numerology_may_select_forms, false);
assert.equal(bridge.governance.visual_glyph_shape_may_select_meanings, false);

assert.equal(spoken.status, 'STRATEGY_RECOMMENDED_FOR_HUMAN_APPROVAL_FORMS_NOT_GENERATED');
assert.equal(spoken.recommended_strategy.id, 'TEN_PRIMITIVE_DIGIT_NUMERALS');
assert.equal(spoken.concept_queue.length, 10);
assert.deepEqual(spoken.concept_queue.map(x => x.concept_id), ['NUM-0','NUM-1','NUM-2','NUM-3','NUM-4','NUM-5','NUM-6','NUM-7','NUM-8','NUM-9']);
assert.ok(spoken.concept_queue.every(x => x.candidate_form === null));
assert.equal(spoken.candidate_generation_constraints.formation_type, 'PRIMITIVE_AUTHORED');
assert.equal(spoken.candidate_generation_constraints.initial_authority, 'CANDIDATE');
assert.equal(spoken.candidate_generation_constraints.historical_recovery_claim, false);
assert.equal(spoken.candidate_generation_constraints.numerology_must_not_choose_form, true);
assert.equal(spoken.candidate_generation_constraints.visual_shape_must_not_choose_meaning, true);
assert.equal(spoken.projected_progress_effect.immediate_validation_change, 0);
assert.equal(spoken.application_rule.includes('Do not generate'), true);

assert.equal(triage.selected_next, 'L01-OPI-003');
assert.equal(triage.selected_next_gate, 'SWHNK-HNK-NUMBER-SYSTEM-RECOVERY-AND-DESIGN-V1');

console.log('PASS SWHNK-HNK-NUMBER-SYSTEM-V2');
console.log('Historical numerals remain unrecovered; display digits are a bridge only; 0-9 spoken strategy is prepared with all forms null pending explicit approval.');
