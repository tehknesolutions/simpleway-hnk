import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const base=await json('progress/evidence-overrides.v1.json');
const names=(await readdir(new URL('../progress/',import.meta.url)))
  .filter(name=>/^evidence-overrides\.v\d+\.json$/.test(name)&&name!=='evidence-overrides.v1.json')
  .sort((a,b)=>Number(a.match(/\.v(\d+)\./)[1])-Number(b.match(/\.v(\d+)\./)[1]));
const evidence={...base,overrides:[...base.overrides],lexical_evidence:{...base.lexical_evidence},validation_evidence:{...base.validation_evidence}};
for(const name of names){const s=await json(`progress/${name}`);evidence.overrides.push(...(s.overrides??[]));Object.assign(evidence.lexical_evidence,s.lexical_evidence_updates??{});Object.assign(evidence.validation_evidence,s.validation_evidence_updates??{});}

const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V50.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const validationBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-validation-batch.v1.json');
const validationTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-validation.applied-transition.v1.json');
const validated=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-001-010.validated.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,0);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,165);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V50');
assert.equal(snapshot.status,'L01_KETHER_COMPLETE_L02_OPI_10_OF_10_VALIDATED_NEXT_GATE_NOT_OPENED');
assert.equal(snapshot.package,'simpleway-hnk@0.53.0');
assert.deepEqual(snapshot.implementation,{MISSING:843,AUTHORED:0,VALIDATED:165,FROZEN:0});
assert.equal(snapshot.L01.validated,155);
assert.deepEqual(snapshot.L02.implementation,{MISSING:129,AUTHORED:0,VALIDATED:10,FROZEN:0});
assert.equal(snapshot.L02.opi_patterns_approved,10);
assert.equal(snapshot.L02.opi_gid_expansions_complete,10);
assert.equal(snapshot.L02.curriculum_OPI_authored,0);
assert.equal(snapshot.L02.curriculum_OPI_validated,10);
assert.equal(snapshot.L02.curriculum_slots_implemented,10);
assert.equal(snapshot.next_gate_status,'NOT_OPENED');

assert.equal(validationBatch.status,'APPROVED_ALL_DECISIONS');
assert.equal(validationBatch.approved_effect.L02_OPI_VALIDATED,10);
assert.equal(validationBatch.approved_effect.authority_promotions,0);
assert.equal(validationTransition.status,'APPLIED');
assert.equal(validationTransition.after.GLOBAL_VALIDATED,165);
assert.equal(validated.checks.validated,10);
assert.equal(validated.authority_boundaries.universal_grammar_claims,0);

assert.equal(manifest.status,'OPI_10_OF_10_VALIDATED_NEXT_GATE_NOT_OPENED');
assert.equal(manifest.pedagogy.opi_patterns_approved,10);
assert.equal(manifest.pedagogy.opi_gid_expansions_complete,10);
assert.equal(manifest.pedagogy.curriculum_OPI_authored,0);
assert.equal(manifest.pedagogy.curriculum_OPI_validated,10);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,10);
assert.equal(manifest.next_gate_status,'NOT_OPENED');
assert.equal('story_qa_structure_contract' in manifest,false);

assert.equal(evidence.lexical_evidence.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(evidence.lexical_evidence.governed_unique_language_assets,51);
assert.equal(evidence.validation_evidence.L02_OPI_validated,10);
assert.equal(evidence.validation_evidence.GLOBAL_validated_total,165);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V50');
console.log('L01 Kether remains 155/155 VALIDATED; L02 now has 10/10 OPI VALIDATED for scoped course use, while the next Story/QA/Structure gate remains unopened.');
