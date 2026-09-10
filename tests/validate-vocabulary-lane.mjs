import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const application=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-gap-8-application.v1.json');
const validationBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032-human-batch.v1.json');
const mappingBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-form-mapping-human-batch.v1.json');
const semanticBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');
const supplement=await json('progress/evidence-overrides.v37.json');

assert.equal(lane.lane_id,'SWHNK-L01-VOCABULARY-AUTHORING-V1');
assert.equal(lane.status,'AUTHORED_32_OF_32_VALIDATED_24_PENDING_VALIDATION_8');
assert.equal(lane.source_contract.vocabulary,32);
assert.equal(lane.entries.length,32);
assert.equal(lane.unfilled_slots.length,0);
assert.equal(new Set(lane.entries.map(x=>x.form)).size,32);
assert.deepEqual(lane.entries.map(x=>x.slot_id),Array.from({length:32},(_,i)=>`L01-VOC-${String(i+1).padStart(3,'0')}`));
assert.ok(lane.entries.every(x=>x.implementation_state==='AUTHORED'));
assert.equal(lane.selection_policy.one_distinct_asset_per_filled_slot,true);
assert.equal(lane.selection_policy.phrase_only_unresolved_tokens_eligible,false);
assert.equal(lane.metrics.AUTHORED,32);
assert.equal(lane.metrics.VALIDATED,24);
assert.equal(lane.metrics.MISSING_GOVERNED_ASSET,0);
assert.equal(lane.metrics.distinct_governed_assets_used,32);
assert.equal(lane.metrics.new_surface_forms_created,0);
assert.equal(lane.metrics.new_authored_candidate_registry_entries,6);
assert.equal(lane.metrics.scoped_recovered_bindings_added,2);
assert.equal(lane.metrics.language_authority_promotions,0);

const forms=Object.fromEntries(lane.entries.map(x=>[x.form,x]));
assert.equal(forms.VAMAKALA.authority,'FROZEN');
assert.equal(forms.SARASALA.authority,'WATCH');
assert.equal(forms.HENUVOKODAN.authority,'REFERENCE');
assert.equal(forms.VALI.origin,'GOVERNED_L01_REBIND_FROM_RECOVERED_L02_L03');
for(const form of ['KUVAN','VALA','KUON','NE','BIZO','DUVE','HOYU','KETI','LUSO','MUPI','NURA','PEVU','TOMI','ZOKA','KALA','AN','EN','KU','KE','ZAMI']) assert.equal(forms[form].authority,'CANDIDATE');
assert.equal(forms.VANI.authority,'WATCH');
assert.equal(forms.VANI.canonical_ref,'LEX-031');
assert.match(forms.VANI.boundary,/Master Lexicon meaning remains null/);
assert.equal(forms.VAME.authority,'GATE');
assert.equal(forms.VAME.canonical_ref,'LEX-025');
assert.match(forms.KU.boundary,/fixed WH word/);

assert.equal(semanticBatch.status,'APPROVED_SEMANTIC_TARGETS_ONLY_FORM_MAPPING_NOT_APPLIED');
assert.equal(semanticBatch.current_state.semantic_targets_approved,8);
assert.equal(mappingBatch.status,'APPROVED_EXACT_MAPPING_APPLICATION_AUTHORIZED');
assert.equal(mappingBatch.authorization.author_VOC_025_032,true);
assert.equal(mappingBatch.authorization.validate_VOC_025_032,false);
assert.equal(application.status,'APPLIED_TO_AUTHORING_NOT_VALIDATION');
assert.equal(application.entries.length,8);
assert.equal(application.effects.vocabulary_authored_after,32);
assert.equal(application.effects.vocabulary_validated_unchanged,24);
assert.equal(application.effects.language_authority_promotions,0);

assert.equal(validationBatch.status,'AWAITING_EXPLICIT_HUMAN_VALIDATION');
assert.equal(validationBatch.items.length,8);
assert.equal(validationBatch.projected_effect_if_all_approved.L01_Vocabulary_VALIDATED_after,32);
assert.equal(validationBatch.projected_effect_if_all_approved.global_VALIDATED_after,133);
assert.equal(validationBatch.projected_effect_if_all_approved.language_authority_promotions,0);

assert.equal(supplement.status,'ACTIVE_SUPPLEMENT');
assert.equal(supplement.overrides.length,1);
assert.deepEqual(supplement.overrides[0].selector,{lesson:'L01',category:'vocabulary',range:[25,32]});
assert.equal(supplement.overrides[0].implementation_state,'AUTHORED');
assert.equal(supplement.lexical_evidence_updates.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(supplement.lexical_evidence_updates.governed_unique_language_assets,51);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_authored,8);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_validated,24);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_missing,0);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_authored_or_better,32);

console.log('PASS SWHNK-L01-VOCABULARY-LANE-V38');
console.log('32/32 Vocabulary AUTHORED; 24 VALIDATED; VOC-025..032 prepared for explicit human validation; zero language-authority promotions.');
