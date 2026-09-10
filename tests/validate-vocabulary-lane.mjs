import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const batch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-24-human-batch.v1.json');
const gap=await json('proposals/language/HNK_L01_VOCABULARY_GAP_8_SEMANTIC_AUTHORING_PLAN_V1.json');
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
assert.equal(lane.metrics.target,32);
assert.equal(lane.metrics.AUTHORED,24);
assert.equal(lane.metrics.MISSING_GOVERNED_ASSET,8);
assert.equal(lane.metrics.new_HNK_lexical_forms_created,0);
assert.equal(lane.metrics.language_authority_promotions,0);
assert.equal(lane.selection_policy.one_distinct_asset_per_filled_slot,true);
assert.equal(lane.selection_policy.phrase_only_unresolved_tokens_eligible,false);
assert.ok(lane.explicit_exclusions.includes('YA'));
assert.ok(lane.explicit_exclusions.includes('ES'));
assert.ok(lane.explicit_exclusions.includes('KU'));
assert.ok(lane.explicit_exclusions.includes('KE'));

const forms=Object.fromEntries(lane.entries.map(x=>[x.form,x]));
assert.equal(forms.VAMAKALA.authority,'FROZEN');
assert.equal(forms.SARASALA.authority,'WATCH');
assert.equal(forms.HENUVOKODAN.authority,'REFERENCE');
assert.equal(forms.VALI.origin,'GOVERNED_L01_REBIND_FROM_RECOVERED_L02_L03');
assert.equal(forms.KUVAN.authority,'CANDIDATE');
assert.equal(forms.VALA.authority,'CANDIDATE');
assert.equal(forms.KUON.authority,'CANDIDATE');
assert.equal(forms.NE.authority,'CANDIDATE');
for(const form of ['BIZO','DUVE','HOYU','KETI','LUSO','MUPI','NURA','PEVU','TOMI','ZOKA']) assert.equal(forms[form].authority,'CANDIDATE');

assert.equal(batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(batch.decisions_requested.length,6);
assert.equal(batch.projected_effect_if_all_approved.vocabulary_VALIDATED,24);
assert.equal(batch.projected_effect_if_all_approved.vocabulary_MISSING,8);
assert.equal(batch.projected_effect_if_all_approved.global_VALIDATED_after,125);
assert.equal(batch.projected_effect_if_all_approved.new_HNK_lexical_forms_created,0);
assert.equal(batch.projected_effect_if_all_approved.language_authority_promotions,0);

assert.equal(gap.status,'PREPARED_NOT_APPROVED');
assert.equal(gap.problem.remaining_gap,8);
assert.equal(gap.current_decision,'NO_FORMS_SELECTED');
assert.equal(gap.new_HNK_lexical_forms_created,0);
assert.equal(gap.canonical_registry_entries_created,0);

const v=evidence.validation_evidence;
assert.equal(v.L01_Vocabulary_target,32);
assert.equal(v.L01_Vocabulary_authored,24);
assert.equal(v.L01_Vocabulary_validated,0);
assert.equal(v.L01_Vocabulary_missing,8);
assert.equal(v.L01_Vocabulary_authored_or_better,24);
assert.deepEqual(v.L01_Vocabulary_filled_slots,Array.from({length:24},(_,i)=>i+1));
assert.deepEqual(v.L01_Vocabulary_missing_slots,Array.from({length:8},(_,i)=>i+25));
assert.equal(v.prepared_vocabulary_batch,'../curriculum/cycle-01/L01-kether/validation/vocabulary-24-human-batch.v1.json');

console.log('PASS SWHNK-L01-VOCABULARY-LANE-V1');
console.log('24/32 Vocabulary AUTHORED from distinct governed assets; 8 slots remain explicitly missing; zero new HNK lexical forms or authority promotions.');
