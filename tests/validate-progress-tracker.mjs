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
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V46.json');
const l02Manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const l02Audit=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-source-lock-audit.v1.json');
const l02Matrix=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-semantic-curriculum-targets.v1.json');
const l02Batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets-human-batch.v1.json');
const l02Transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets.approved-transition.v1.json');
const l02RebindReview=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-exact-rebind-mapping-review.v1.json');
const l02RebindBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-exact-rebind-mapping-human-batch.v1.json');
const l02RebindTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-exact-rebind-mapping.applied-transition.v1.json');
const l02UnresolvedBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-unresolved-vocabulary-human-batch.v1.json');
const l02UnresolvedTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-unresolved-vocabulary.applied-transition.v1.json');
const l02PedagogyContract=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-pedagogy-source-contract.v1.json');
const l02PedagogyBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract-human-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,0);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,155);
assert.equal(values.filter(x=>['AUTHORED','VALIDATED','FROZEN'].includes(x.implementation_state)).length,155);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);

assert.equal(vocabulary.metrics.VALIDATED,32);
assert.equal(review.metrics.VALIDATED,22);
assert.equal(reviewBatch.status,'APPROVED_AND_APPLIED_SCOPED_CURRICULUM_VALIDATION');
assert.equal(reviewTransition.lesson_after.VALIDATED,155);
assert.equal(seal.validated,155);
assert.equal(seal.cycle_final_seal_boundary.cycle_final_seal_slot_consumed,false);

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V46');
assert.equal(snapshot.status,'L01_KETHER_COMPLETE_L02_SOURCE_TEACHABILITY_COMPLETE_PEDAGOGY_SOURCE_CONTRACT_REVIEW_PENDING');
assert.equal(snapshot.package,'simpleway-hnk@0.49.0');
assert.deepEqual(snapshot.implementation,{MISSING:853,AUTHORED:0,VALIDATED:155,FROZEN:0});
assert.equal(snapshot.L01.validated,155);

assert.equal(l02Audit.status,'AUDITED_PEDAGOGY_HOLD');
assert.equal(l02Audit.source_inventory.recovered_lexemes,11);
assert.equal(l02Audit.source_inventory.recovered_phrases,0);
assert.equal(l02Audit.source_inventory.with_master_meaning,9);
assert.equal(l02Audit.source_inventory.without_master_meaning,2);
assert.equal(l02Audit.coverage.vocabulary_target,16);
assert.equal(l02Audit.coverage.proxy_gap,5);
assert.deepEqual(l02Audit.lexemes.filter(x=>x.meaning_pt===null).map(x=>x.form),['VANUVALI','VANI']);

assert.equal(l02Matrix.semantic_targets.length,5);
assert.ok(l02Matrix.semantic_targets.every(x=>x.semantic_approval==='APPROVED'));
assert.equal(l02Batch.status,'APPROVED_ALL_DECISIONS_APPLIED_TO_SEMANTICS_ONLY');
assert.equal(l02Transition.after.semantic_targets_approved,5);

assert.equal(l02RebindReview.proposed_rebinds.length,5);
assert.equal(l02RebindBatch.status,'APPROVED_ALL_DECISIONS');
assert.ok(l02RebindBatch.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(l02RebindTransition.status,'APPLIED');
assert.equal(l02RebindTransition.scope_extensions.length,5);
assert.equal(l02RebindTransition.after.L02_authored_candidates_scoped,5);
assert.equal(l02RebindTransition.non_effects.curriculum_slots_implemented,0);
assert.equal(l02RebindTransition.non_effects.authority_promotions,0);

assert.equal(l02UnresolvedBatch.status,'APPROVED_AND_APPLIED_TO_LANGUAGE_SCOPE');
assert.ok(l02UnresolvedBatch.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.deepEqual(l02UnresolvedBatch.application.rebind_refs,['LEX-003','LEX-004']);
assert.equal(l02UnresolvedBatch.application.semantic_teachable_assets_after,16);
assert.equal(l02UnresolvedBatch.application.curriculum_slots_implemented,0);
assert.equal(l02UnresolvedTransition.status,'APPLIED');
assert.deepEqual(l02UnresolvedTransition.rebinds.map(x=>x.form),['VALIVAN','PARAZAMO']);
assert.equal(l02UnresolvedTransition.after.L02_governed_source_references,18);
assert.equal(l02UnresolvedTransition.after.L02_semantic_teachable_assets,16);
assert.equal(l02UnresolvedTransition.after.L02_unresolved_source_observations,2);
assert.equal(l02UnresolvedTransition.after.remaining_teachable_gap,0);

assert.equal(l02PedagogyContract.status,'READY_FOR_HUMAN_REVIEW_NO_SENTENCE_AUTHORING_YET');
assert.equal(l02PedagogyContract.teachable_source_set.length,16);
assert.equal(l02PedagogyContract.opi_intent_targets.length,10);
assert.equal(l02PedagogyContract.sentence_pattern_policy.status,'NOT_AUTHORIZED_YET');
assert.equal(l02PedagogyContract.checks.HNK_sentences_authored,0);
assert.equal(l02PedagogyBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(l02PedagogyBatch.checks.curriculum_slots_implemented,0);

assert.equal(l02Manifest.status,'SOURCE_TEACHABILITY_COMPLETE_PEDAGOGY_SOURCE_CONTRACT_REVIEW_PENDING');
assert.equal(l02Manifest.language_bindings.governed_source_references,18);
assert.equal(l02Manifest.teachability.semantic_teachable_assets,16);
assert.equal(l02Manifest.teachability.unresolved_source_observations,2);
assert.equal(l02Manifest.teachability.remaining_teachable_gap,0);
assert.equal(l02Manifest.pedagogy.opi_intents_drafted,10);
assert.equal(l02Manifest.pedagogy.opi_sentence_patterns,0);
assert.equal(l02Manifest.pedagogy.curriculum_slots_implemented,0);
assert.equal(l02Manifest.pedagogy.authoring_hold,true);
assert.equal(l02Manifest.next_gate,'SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-HUMAN-BATCH-V1');

assert.equal(snapshot.L02.status,'SOURCE_TEACHABILITY_COMPLETE_PEDAGOGY_SOURCE_CONTRACT_REVIEW_PENDING');
assert.equal(snapshot.L02.governed_source_references,18);
assert.equal(snapshot.L02.semantic_teachable_assets,16);
assert.equal(snapshot.L02.unresolved_source_observations,2);
assert.equal(snapshot.L02.remaining_teachable_gap,0);
assert.equal(snapshot.L02.opi_intents_drafted,10);
assert.equal(snapshot.L02.opi_sentence_patterns,0);
assert.equal(snapshot.L02.curriculum_slots_implemented,0);
assert.equal(snapshot.L02_pedagogy_source.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snapshot.next_gate,'SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-HUMAN-BATCH-V1');

assert.equal(evidence.lexical_evidence.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(evidence.lexical_evidence.governed_unique_language_assets,51);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V46');
console.log('L01 Kether remains 155/155 VALIDATED; L02 source teachability is complete at 16/16, pedagogy-source review is pending, and 0 L02 curriculum slots are implemented.');
