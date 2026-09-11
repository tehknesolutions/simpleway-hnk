import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const base=await json('progress/evidence-overrides.v1.json');
const names=(await readdir(new URL('../progress/',import.meta.url)))
  .filter(name=>/^evidence-overrides\.v\d+\.json$/.test(name)&&name!=='evidence-overrides.v1.json')
  .sort((a,b)=>Number(a.match(/\.v(\d+)\./)[1])-Number(b.match(/\.v(\d+)\./)[1]));
const evidence={...base,overrides:[...base.overrides],lexical_evidence:{...base.lexical_evidence},validation_evidence:{...base.validation_evidence}};
for(const name of names){
  const supplement=await json(`progress/${name}`);
  evidence.overrides.push(...(supplement.overrides??[]));
  Object.assign(evidence.lexical_evidence,supplement.lexical_evidence_updates??{});
  Object.assign(evidence.validation_evidence,supplement.validation_evidence_updates??{});
}

const vocabulary=await json('curriculum/cycle-01/L01-kether/authoring/vocabulary-lane.v1.json');
const review=await json('curriculum/cycle-01/L01-kether/authoring/review-lane.v1.json');
const seal=await json('curriculum/cycle-01/L01-kether/closure/kether-seal.v1.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V49.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const sourceAudit=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-source-lock-audit.v1.json');
const semanticBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-semantic-targets-human-batch.v1.json');
const exactRebindBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-exact-rebind-mapping-human-batch.v1.json');
const exactRebindTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-exact-rebind-mapping.applied-transition.v1.json');
const unresolvedBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-unresolved-vocabulary-human-batch.v1.json');
const unresolvedTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-unresolved-vocabulary.applied-transition.v1.json');
const pedagogyContract=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-pedagogy-source-contract.v1.json');
const pedagogyBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract-human-batch.v1.json');
const pedagogyTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract.approved-transition.v1.json');
const patternReview=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-opi-pattern-review.v1.json');
const patternBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review-human-batch.v1.json');
const patternTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review.approved-transition.v1.json');
const gid=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-pattern-gid-expansion.v1.json');
const authoringBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring-human-batch.v1.json');
const authored=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-001-010.authored.v1.json');
const authoringTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring.applied-transition.v1.json');
const validationBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-validation-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.evidence_state==='SOURCE_CONFIRMED_FROZEN').length,82);
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,10);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,155);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);

assert.equal(vocabulary.metrics.VALIDATED,32);
assert.equal(review.metrics.VALIDATED,22);
assert.equal(seal.validated,155);
assert.equal(seal.cycle_final_seal_boundary.cycle_final_seal_slot_consumed,false);

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V49');
assert.equal(snapshot.status,'L01_KETHER_COMPLETE_L02_OPI_10_OF_10_AUTHORED_VALIDATION_PENDING');
assert.equal(snapshot.package,'simpleway-hnk@0.52.0');
assert.deepEqual(snapshot.implementation,{MISSING:843,AUTHORED:10,VALIDATED:155,FROZEN:0});
assert.equal(snapshot.cumulative_maturity.AUTHORED_OR_BETTER,165);
assert.equal(snapshot.cumulative_maturity.VALIDATED_OR_BETTER,155);
assert.equal(snapshot.L01.validated,155);
assert.equal(snapshot.L02.status,'OPI_10_OF_10_AUTHORED_VALIDATION_PENDING');
assert.deepEqual(snapshot.L02.implementation,{MISSING:129,AUTHORED:10,VALIDATED:0,FROZEN:0});
assert.equal(snapshot.L02.semantic_teachable_assets,16);
assert.equal(snapshot.L02.unresolved_source_observations,2);
assert.equal(snapshot.L02.opi_patterns_approved,10);
assert.equal(snapshot.L02.opi_gid_expansions_complete,10);
assert.equal(snapshot.L02.curriculum_OPI_authored,10);
assert.equal(snapshot.L02.curriculum_OPI_validated,0);
assert.equal(snapshot.L02.curriculum_slots_implemented,10);
assert.equal(snapshot.L02_OPI_validation.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snapshot.next_gate,'SWHNK-L02-OPI-VALIDATION-BATCH-V1');

assert.equal(sourceAudit.status,'AUDITED_PEDAGOGY_HOLD');
assert.equal(sourceAudit.source_inventory.recovered_lexemes,11);
assert.equal(sourceAudit.source_inventory.recovered_phrases,0);
assert.deepEqual(sourceAudit.lexemes.filter(x=>x.meaning_pt===null).map(x=>x.form),['VANUVALI','VANI']);

assert.equal(semanticBatch.status,'APPROVED_ALL_DECISIONS_APPLIED_TO_SEMANTICS_ONLY');
assert.equal(exactRebindBatch.status,'APPROVED_ALL_DECISIONS');
assert.equal(exactRebindTransition.status,'APPLIED');
assert.equal(unresolvedBatch.status,'APPROVED_AND_APPLIED_TO_LANGUAGE_SCOPE');
assert.equal(unresolvedTransition.status,'APPLIED');
assert.equal(unresolvedTransition.after.L02_governed_source_references,18);
assert.equal(unresolvedTransition.after.L02_semantic_teachable_assets,16);
assert.equal(unresolvedTransition.after.L02_unresolved_source_observations,2);
assert.equal(unresolvedTransition.after.remaining_teachable_gap,0);

assert.equal(pedagogyContract.status,'READY_FOR_HUMAN_REVIEW_NO_SENTENCE_AUTHORING_YET');
assert.equal(pedagogyContract.teachable_source_set.length,16);
assert.equal(pedagogyContract.opi_intent_targets.length,10);
assert.equal(pedagogyBatch.status,'APPROVED_ALL_DECISIONS');
assert.ok(pedagogyBatch.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(pedagogyTransition.status,'APPLIED');
assert.equal(pedagogyTransition.after.opi_intents_approved,10);

assert.equal(patternReview.status,'READY_FOR_HUMAN_PATTERN_REVIEW_NOT_APPLIED');
assert.equal(patternReview.patterns.length,10);
assert.equal(patternBatch.status,'APPROVED_ALL_DECISIONS');
assert.equal(patternTransition.status,'APPLIED');
assert.equal(patternTransition.after.patterns_approved_for_scoped_L02_authoring,10);
assert.equal(gid.checks.patterns_expanded,10);
assert.equal(gid.checks.unresolved_transliteration_units,0);

assert.equal(authoringBatch.status,'APPROVED_ALL_DECISIONS');
assert.equal(authoringBatch.approved_effect.curriculum_OPI_AUTHORED,10);
assert.equal(authoringBatch.approved_effect.curriculum_OPI_VALIDATED,0);
assert.equal(authored.status,'AUTHORED_PENDING_VALIDATION');
assert.equal(authored.slots.length,10);
assert.equal(authored.checks.authored,10);
assert.equal(authored.checks.validated,0);
assert.equal(authoringTransition.status,'APPLIED');
assert.equal(authoringTransition.after.L02_OPI_AUTHORED,10);
assert.equal(authoringTransition.after.L02_OPI_VALIDATED,0);
assert.equal(validationBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(validationBatch.decisions_requested.length,14);

assert.equal(manifest.status,'OPI_10_OF_10_AUTHORED_VALIDATION_GATE_PENDING');
assert.equal(manifest.teachability.semantic_teachable_assets,16);
assert.equal(manifest.pedagogy.source_contract_approved,true);
assert.equal(manifest.pedagogy.opi_intents_approved,10);
assert.equal(manifest.pedagogy.opi_pattern_candidates,10);
assert.equal(manifest.pedagogy.opi_patterns_approved,10);
assert.equal(manifest.pedagogy.opi_gid_expansions_complete,10);
assert.equal(manifest.pedagogy.curriculum_OPI_authored,10);
assert.equal(manifest.pedagogy.curriculum_OPI_validated,0);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,10);
assert.equal(manifest.pedagogy.authoring_hold,true);
assert.equal(manifest.next_gate,'SWHNK-L02-OPI-VALIDATION-BATCH-V1');

assert.equal(evidence.lexical_evidence.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(evidence.lexical_evidence.governed_unique_language_assets,51);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V49');
console.log('L01 Kether remains 155/155 VALIDATED; L02 now has 10/10 OPI AUTHORED, 0 VALIDATED, and an explicit validation batch pending.');
