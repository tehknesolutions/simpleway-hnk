import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-24-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-24.validated-transition.v1.json');
const gap=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_AUTHORING_PLAN_V1.json');
const semanticTargets=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_TARGETS_V1.json');
const semanticBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');
const evidence=await json('progress/evidence-overrides.v1.json');

assert.equal(lane.lane_id,'SWHNK-L01-VOCABULARY-AUTHORING-V1');
assert.equal(lane.status,'AUTHORED_24_OF_32_GOVERNED_ASSET_GAP_8');
assert.equal(lane.source_contract.vocabulary,32);
assert.equal(lane.entries.length,24);
assert.equal(lane.unfilled_slots.length,8);
assert.equal(new Set(lane.entries.map(x=>x.form)).size,24);
assert.deepEqual(lane.entries.map(x=>x.slot_id),Array.from({length:24},(_,i)=>`L01-VOC-${String(i+1).padStart(3,'0')}`));
assert.deepEqual(lane.unfilled_slots.map(x=>x.slot_id),Array.from({length:8},(_,i)=>`L01-VOC-${String(i+25).padStart(3,'0')}`));
assert.ok(lane.entries.every(x=>x.implementation_state==='AUTHORED'));
assert.ok(lane.unfilled_slots.every(x=>x.state==='MISSING_GOVERNED_ASSET'));
assert.equal(lane.metrics.new_HNK_lexical_forms_created,0);
assert.equal(lane.metrics.language_authority_promotions,0);
assert.equal(lane.selection_policy.one_distinct_asset_per_filled_slot,true);
assert.equal(lane.selection_policy.phrase_only_unresolved_tokens_eligible,false);

const forms=Object.fromEntries(lane.entries.map(x=>[x.form,x]));
assert.equal(forms.VAMAKALA.authority,'FROZEN');
assert.equal(forms.SARASALA.authority,'WATCH');
assert.equal(forms.HENUVOKODAN.authority,'REFERENCE');
assert.equal(forms.VALI.origin,'GOVERNED_L01_REBIND_FROM_RECOVERED_L02_L03');
for(const form of ['KUVAN','VALA','KUON','NE','BIZO','DUVE','HOYU','KETI','LUSO','MUPI','NURA','PEVU','TOMI','ZOKA']) assert.equal(forms[form].authority,'CANDIDATE');

assert.equal(batch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.ok(batch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(batch.applied_state.VALIDATED,24);
assert.equal(batch.applied_state.MISSING,8);
assert.equal(batch.applied_effect.global_VALIDATED_after,125);
assert.equal(batch.applied_effect.new_HNK_lexical_forms_created,0);
assert.equal(batch.applied_effect.language_authority_promotions,0);
assert.equal(transition.status,'APPLIED');
assert.equal(transition.vocabulary_after.VALIDATED,24);
assert.equal(transition.vocabulary_after.MISSING,8);
assert.equal(transition.global_after.VALIDATED,125);
assert.equal(transition.authority_effect.language_authority_promotions,0);

assert.equal(gap.status,'SEMANTIC_TARGET_SET_PROPOSED_AWAITING_APPROVAL');
assert.equal(gap.problem.remaining_gap,8);
assert.equal(gap.current_decision,'EIGHT_SEMANTIC_TARGETS_PROPOSED_NO_FORMS_SELECTED');
assert.equal(gap.new_HNK_lexical_forms_created,0);
assert.equal(gap.canonical_registry_entries_created,0);

assert.equal(semanticTargets.status,'PROPOSED_AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(semanticTargets.targets.length,8);
assert.deepEqual(semanticTargets.targets.map(x=>x.slot_id),Array.from({length:8},(_,i)=>`L01-VOC-${String(i+25).padStart(3,'0')}`));
assert.ok(semanticTargets.targets.every(x=>x.form_selected===null));
assert.ok(semanticTargets.targets.every(x=>x.historical_form_meaning_claim===false));
assert.equal(semanticBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(semanticBatch.current_state.semantic_targets_proposed,8);
assert.equal(semanticBatch.current_state.forms_selected,0);
assert.equal(semanticBatch.current_state.canonical_registry_entries_created,0);
assert.equal(semanticBatch.projected_effect_if_all_approved.vocabulary_MISSING,8);

const v=evidence.validation_evidence;
assert.equal(v.L01_Vocabulary_target,32);
assert.equal(v.L01_Vocabulary_authored,0);
assert.equal(v.L01_Vocabulary_validated,24);
assert.equal(v.L01_Vocabulary_missing,8);
assert.equal(v.L01_Vocabulary_authored_or_better,24);
assert.deepEqual(v.L01_Vocabulary_validated_slots,Array.from({length:24},(_,i)=>i+1));
assert.deepEqual(v.L01_Vocabulary_missing_slots,Array.from({length:8},(_,i)=>i+25));
assert.equal(v.prepared_vocabulary_batch,null);
assert.equal(v.prepared_vocabulary_semantic_targets_batch,'../curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');

console.log('PASS SWHNK-L01-VOCABULARY-LANE-V2');
console.log('24/32 Vocabulary VALIDATED; 8 slots remain missing; semantic targets proposed with zero forms selected and zero language-authority promotions.');
