import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const base=await json('progress/evidence-overrides.v1.json');
const names=(await readdir(new URL('../progress/',import.meta.url)))
  .filter(name=>/^evidence-overrides\.v\d+\.json$/.test(name)&&name!=='evidence-overrides.v1.json')
  .sort((a,b)=>Number(a.match(/\.v(\d+)\./)[1])-Number(b.match(/\.v(\d+)\./)[1]));
const supplements=[];
for(const name of names)supplements.push(await json(`progress/${name}`));
const evidence={...base,overrides:[...base.overrides],lexical_evidence:{...base.lexical_evidence},validation_evidence:{...base.validation_evidence}};
for(const supplement of supplements){
  evidence.overrides.push(...(supplement.overrides??[]));
  Object.assign(evidence.lexical_evidence,supplement.lexical_evidence_updates??{});
  Object.assign(evidence.validation_evidence,supplement.validation_evidence_updates??{});
}

const vocabulary=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const review=await json('curriculum/cycle-01/L01-kether/authoring/review-lane.v1.json');
const reviewBatch=await json('curriculum/cycle-01/L01-kether/validation/review-22-human-batch.v1.json');
const reviewTransition=await json('curriculum/cycle-01/L01-kether/validation/review-22.validated-transition.v1.json');
const seal=await json('curriculum/cycle-01/L01-kether/closure/kether-seal.v1.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V43.json');
const l02Manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const l02Audit=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-source-lock-audit.v1.json');
const l02Matrix=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-semantic-curriculum-targets.v1.json');
const l02Batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets-human-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');

assert.equal(contract.target_total,1008);
assert.ok(names.includes('evidence-overrides.v37.json'));
assert.ok(names.includes('evidence-overrides.v39.json'));
assert.ok(names.includes('evidence-overrides.v40.json'));
assert.ok(names.includes('evidence-overrides.v41.json'));

const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,0);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,155);
assert.equal(values.filter(x=>['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length,155);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);
assert.equal(values.filter(x=>x.scaffolded).length,155);

assert.equal(vocabulary.status,'AUTHORED_32_OF_32_VALIDATED_32_COMPLETE');
assert.equal(vocabulary.metrics.VALIDATED,32);
assert.equal(review.status,'AUTHORED_22_OF_22_VALIDATED_22_COMPLETE');
assert.equal(review.items.length,22);
assert.ok(review.items.every(x=>x.implementation_state==='VALIDATED'));
assert.equal(review.metrics.VALIDATED,22);
assert.equal(reviewBatch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.equal(reviewTransition.lesson_after.VALIDATED,155);
assert.equal(reviewTransition.global_after.VALIDATED,155);

const v=evidence.validation_evidence;
assert.equal(v.L01_OPI_validated,10);
assert.equal(v.L01_Activation_validated,72);
assert.equal(v.L01_Structure_headers_validated,2);
assert.equal(v.L01_Structures_validated,5);
assert.equal(v.L01_Teacher_notes_validated,3);
assert.equal(v.L01_QA_validated,4);
assert.equal(v.L01_Story_validated,5);
assert.equal(v.L01_Vocabulary_validated,32);
assert.equal(v.L01_Review_validated,22);
assert.equal(v.L01_completion_status,'VALIDATED_COMPLETE');

assert.equal(seal.status,'SEALED_CURRICULUM_VALIDATION_COMPLETE');
assert.equal(seal.validated,155);
assert.equal(seal.cycle_final_seal_boundary.cycle_final_seal_slot_consumed,false);
assert.deepEqual(seal.cycle_final_seal_boundary.reserved_cycle_final_seals,['Verbum','Logos','Dialogos']);

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V43');
assert.equal(snapshot.status,'L01_KETHER_155_OF_155_VALIDATED_L02_CHOKHMAH_SEMANTIC_TARGETS_DRAFTED_PEDAGOGY_HOLD');
assert.equal(snapshot.package,'simpleway-hnk@0.45.0');
assert.deepEqual(snapshot.implementation,{MISSING:853,AUTHORED:0,VALIDATED:155,FROZEN:0});
assert.equal(snapshot.L01.validated,155);
assert.equal(snapshot.L01.cycle_final_seal_slot_consumed,false);

assert.equal(l02Manifest.status,'SEMANTIC_TARGETS_DRAFTED_PEDAGOGY_HOLD');
assert.equal(l02Manifest.pedagogy.authoring_hold,true);
assert.equal(l02Manifest.semantic_gap.target,5);
assert.equal(l02Manifest.semantic_gap.approved,0);
assert.equal(l02Manifest.semantic_gap.forms_selected,0);
assert.equal(l02Audit.status,'AUDITED_PEDAGOGY_HOLD');
assert.equal(l02Audit.source_inventory.recovered_lexemes,11);
assert.equal(l02Audit.source_inventory.recovered_phrases,0);
assert.equal(l02Audit.source_inventory.with_master_meaning,9);
assert.equal(l02Audit.source_inventory.without_master_meaning,2);
assert.equal(l02Audit.coverage.vocabulary_target,16);
assert.equal(l02Audit.coverage.proxy_gap,5);
assert.deepEqual(l02Audit.lexemes.filter(x=>x.meaning_pt===null).map(x=>x.form),['VANUVALI','VANI']);

assert.equal(l02Matrix.status,'DRAFT_SEMANTICS_ONLY_FORM_MAPPING_NOT_APPLIED');
assert.equal(l02Matrix.semantic_targets.length,5);
assert.deepEqual(l02Matrix.semantic_targets.map(x=>x.semantic_key),['FIRST_PERSON_REFERENT','SECOND_PERSON_REFERENT','LOCATION_INTERROGATIVE','CONTENT_SELECTOR','QUESTION_OPERATOR']);
assert.ok(l02Matrix.semantic_targets.every(x=>x.form_selected===null));
assert.deepEqual(l02Matrix.mapping_summary.suggested_forms,['AN','EN','KUVAN','KU','KE']);
assert.equal(l02Matrix.mapping_summary.forms_selected,0);
assert.equal(l02Matrix.mapping_summary.new_surface_forms_created,0);
assert.equal(l02Matrix.mapping_summary.authority_promotions,0);
assert.equal(l02Batch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(l02Batch.projected_effect_if_all_approved.semantic_targets_approved,5);
assert.equal(l02Batch.projected_effect_if_all_approved.forms_selected,0);

assert.equal(snapshot.L02.status,'SEMANTIC_TARGETS_DRAFTED_PEDAGOGY_HOLD');
assert.equal(snapshot.L02.source_inventory.recovered_lexemes,11);
assert.equal(snapshot.L02.vocabulary_target,16);
assert.equal(snapshot.L02.numerical_proxy_gap,5);
assert.equal(snapshot.L02.semantic_targets_proposed,5);
assert.equal(snapshot.L02.semantic_targets_approved,0);
assert.equal(snapshot.L02.forms_selected,0);
assert.deepEqual(snapshot.L02.suggested_reuse_candidates,['AN','EN','KUVAN','KU','KE']);
assert.equal(snapshot.L02.pedagogy_authoring_hold,true);
assert.equal(snapshot.next_gate,'SWHNK-L02-SEMANTIC-TARGETS-HUMAN-BATCH-V1');
assert.equal(snapshot.next_gate_rule,'APPROVE_SEMANTICS_ONLY_BEFORE_EXACT_REBIND_MAPPING');

assert.equal(evidence.lexical_evidence.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(evidence.lexical_evidence.governed_unique_language_assets,51);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V43');
console.log('L01 Kether remains 155/155 VALIDATED; L02 has 5 semantics-first communicative targets drafted, 0 forms selected and pedagogy remains HOLD.');
