import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const lane=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const application=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-gap-8-application.v1.json');
const validationBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032-human-batch.v1.json');
const validationTransition=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-025-032.validated-transition.v1.json');
const mappingBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-form-mapping-human-batch.v1.json');
const semanticBatch=await json('curriculum/cycle-01/L01-kether/validation/vocabulary-gap-8-semantic-targets-human-batch.v1.json');
const authoredSupplement=await json('progress/evidence-overrides.v37.json');
const validatedSupplement=await json('progress/evidence-overrides.v39.json');

assert.equal(lane.lane_id,'SWHNK-L01-VOCABULARY-AUTHORING-V1');
assert.equal(lane.status,'AUTHORED_32_OF_32_VALIDATED_32_COMPLETE');
assert.equal(lane.source_contract.vocabulary,32);
assert.equal(lane.entries.length,32);
assert.equal(lane.unfilled_slots.length,0);
assert.equal(new Set(lane.entries.map(x=>x.form)).size,32);
assert.deepEqual(lane.entries.map(x=>x.slot_id),Array.from({length:32},(_,i)=>`L01-VOC-${String(i+1).padStart(3,'0')}`));
assert.ok(lane.entries.every(x=>x.implementation_state==='AUTHORED'));
assert.equal(lane.metrics.AUTHORED,32);
assert.equal(lane.metrics.VALIDATED,32);
assert.equal(lane.metrics.MISSING_GOVERNED_ASSET,0);
assert.equal(lane.metrics.distinct_governed_assets_used,32);
assert.equal(lane.metrics.new_surface_forms_created,0);
assert.equal(lane.metrics.new_authored_candidate_registry_entries,6);
assert.equal(lane.metrics.scoped_recovered_bindings_added,2);
assert.equal(lane.metrics.language_authority_promotions,0);

const forms=Object.fromEntries(lane.entries.map(x=>[x.form,x]));
for(const form of ['KUVAN','VALA','KUON','NE','BIZO','DUVE','HOYU','KETI','LUSO','MUPI','NURA','PEVU','TOMI','ZOKA','KALA','AN','EN','KU','KE','ZAMI']) assert.equal(forms[form].authority,'CANDIDATE');
assert.equal(forms.VANI.authority,'WATCH');
assert.equal(forms.VANI.canonical_ref,'LEX-031');
assert.match(forms.VANI.boundary,/Master Lexicon meaning remains null/);
assert.equal(forms.VAME.authority,'GATE');
assert.equal(forms.VAME.canonical_ref,'LEX-025');
assert.match(forms.KU.boundary,/fixed WH word/);

assert.equal(semanticBatch.status,'APPROVED_SEMANTIC_TARGETS_ONLY_FORM_MAPPING_NOT_APPLIED');
assert.equal(mappingBatch.status,'APPROVED_EXACT_MAPPING_APPLICATION_AUTHORIZED');
assert.equal(application.status,'APPLIED_TO_AUTHORING_NOT_VALIDATION');
assert.equal(application.effects.language_authority_promotions,0);

assert.equal(validationBatch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.equal(validationBatch.items.length,8);
assert.ok(validationBatch.decisions.every(x=>x.decision==='APPROVED_SCOPED'));
assert.equal(validationBatch.applied_effect.L01_Vocabulary_VALIDATED_after,32);
assert.equal(validationBatch.applied_effect.global_VALIDATED_after,133);
assert.equal(validationBatch.applied_effect.language_authority_promotions,0);
assert.equal(validationTransition.status,'APPLIED');
assert.equal(validationTransition.vocabulary_after.VALIDATED,32);
assert.equal(validationTransition.global_after.VALIDATED,133);
assert.equal(validationTransition.preserved_boundaries.VANI.authority,'WATCH');
assert.equal(validationTransition.preserved_boundaries.VANI.master_meaning,null);
assert.equal(validationTransition.preserved_boundaries.VAME.authority,'GATE');

assert.equal(authoredSupplement.status,'ACTIVE_SUPPLEMENT');
assert.equal(authoredSupplement.overrides[0].implementation_state,'AUTHORED');
assert.equal(validatedSupplement.status,'ACTIVE_SUPPLEMENT');
assert.equal(validatedSupplement.overrides[0].implementation_state,'VALIDATED');
assert.equal(validatedSupplement.lexical_evidence_updates.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(validatedSupplement.lexical_evidence_updates.governed_unique_language_assets,51);
assert.equal(validatedSupplement.validation_evidence_updates.L01_Vocabulary_authored,0);
assert.equal(validatedSupplement.validation_evidence_updates.L01_Vocabulary_validated,32);
assert.equal(validatedSupplement.validation_evidence_updates.L01_Vocabulary_missing,0);
assert.equal(validatedSupplement.validation_evidence_updates.prepared_vocabulary_batch,null);
assert.equal(validatedSupplement.validation_evidence_updates.vocabulary_final_validation_status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');

console.log('PASS SWHNK-L01-VOCABULARY-LANE-V39');
console.log('L01 Vocabulary 32/32 VALIDATED; six evidence-mapped candidates remain CANDIDATE, VANI WATCH and VAME GATE unchanged.');
