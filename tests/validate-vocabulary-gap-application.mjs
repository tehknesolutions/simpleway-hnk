import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const application=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-gap-8-application.v1.json');
const mappingBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-form-mapping-human-batch.v1.json');
const finalBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032-human-batch.v1.json');
const supplement=await json('progress/evidence-overrides.v37.json');

assert.equal(mappingBatch.status,'APPROVED_EXACT_MAPPING_APPLICATION_AUTHORIZED');
assert.equal(mappingBatch.authorization.register_auth_015_020,true);
assert.equal(mappingBatch.authorization.bind_VANI_scoped_L01,true);
assert.equal(mappingBatch.authorization.rebind_VAME_scoped_L01,true);
assert.equal(mappingBatch.authorization.author_VOC_025_032,true);
assert.equal(mappingBatch.authorization.validate_VOC_025_032,false);

assert.equal(application.application_id,'SWHNK-L01-VOCABULARY-GAP-8-APPLICATION-V1');
assert.equal(application.status,'APPLIED_TO_AUTHORING_NOT_VALIDATION');
assert.equal(application.language_authority_source.repository,'tehknesolutions/codex-hnk');
assert.equal(application.language_authority_source.package,'@hnk/linguas/authored');
assert.equal(application.language_authority_source.registry_version,'1.5.0-candidate');
assert.equal(application.entries.length,8);
assert.deepEqual(application.entries.map(x=>x.slot_id),Array.from({length:8},(_,i)=>`L01-VOC-${String(i+25).padStart(3,'0')}`));
assert.deepEqual(application.entries.map(x=>x.form),['KALA','AN','EN','KU','KE','VANI','VAME','ZAMI']);
assert.deepEqual(application.entries.filter(x=>x.canonical_ref?.startsWith('AUTH-')).map(x=>x.canonical_ref),['AUTH-015','AUTH-016','AUTH-017','AUTH-018','AUTH-019','AUTH-020']);

const vani=application.entries.find(x=>x.form==='VANI');
const vame=application.entries.find(x=>x.form==='VAME');
assert.equal(vani.canonical_ref,'LEX-031');
assert.equal(vani.authority,'WATCH');
assert.match(vani.boundary,/Master Lexicon meaning remains null/);
assert.equal(vame.canonical_ref,'LEX-025');
assert.equal(vame.authority,'GATE');
assert.match(vame.boundary,/no global preference grammar/i);

assert.equal(application.effects.vocabulary_authored_before,24);
assert.equal(application.effects.vocabulary_authored_after,32);
assert.equal(application.effects.vocabulary_validated_unchanged,24);
assert.equal(application.effects.vocabulary_missing_after,0);
assert.equal(application.effects.new_authored_candidate_registry_entries,6);
assert.equal(application.effects.new_surface_forms_created,0);
assert.equal(application.effects.scoped_recovered_bindings,2);
assert.equal(application.effects.language_authority_promotions,0);
assert.equal(application.effects.historical_standalone_gloss_claims,0);

assert.equal(lane.status,'AUTHORED_32_OF_32_VALIDATED_24_PENDING_VALIDATION_8');
assert.equal(lane.entries.length,32);
assert.equal(lane.unfilled_slots.length,0);
assert.equal(new Set(lane.entries.map(x=>x.form)).size,32);
assert.equal(lane.entries.slice(24).filter(x=>x.implementation_state==='AUTHORED').length,8);
assert.equal(lane.metrics.new_authored_candidate_registry_entries,6);
assert.equal(lane.metrics.scoped_recovered_bindings_added,2);
assert.equal(lane.metrics.language_authority_promotions,0);

assert.equal(supplement.overrides[0].implementation_state,'AUTHORED');
assert.deepEqual(supplement.overrides[0].selector,{lesson:'L01',category:'vocabulary',range:[25,32]});
assert.equal(supplement.lexical_evidence_updates.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(supplement.lexical_evidence_updates.governed_unique_language_assets,51);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_authored,8);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_validated,24);
assert.equal(supplement.validation_evidence_updates.L01_Vocabulary_missing,0);

assert.equal(finalBatch.status,'AWAITING_EXPLICIT_HUMAN_VALIDATION');
assert.equal(finalBatch.items.length,8);
assert.equal(finalBatch.projected_effect_if_all_approved.global_VALIDATED_after,133);
assert.equal(finalBatch.projected_effect_if_all_approved.language_authority_promotions,0);

console.log('PASS SWHNK-L01-VOCABULARY-GAP-8-APPLICATION-V1');
console.log('Gap-8 mapping applied to authoring only: 6 governed CANDIDATE refs + 2 scoped recovered bindings; final 8 Vocabulary slots remain awaiting human validation.');
