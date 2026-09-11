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

const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V48.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const patternBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review-human-batch.v1.json');
const patternTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review.approved-transition.v1.json');
const gid=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-pattern-gid-expansion.v1.json');
const authoringBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring-human-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');

assert.equal(contract.target_total,1008);
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,0);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,155);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V48');
assert.equal(snapshot.status,'L01_KETHER_COMPLETE_L02_PATTERNS_APPROVED_GID_EXPANSION_COMPLETE_OPI_AUTHORING_GATE_PENDING');
assert.equal(snapshot.package,'simpleway-hnk@0.51.0');
assert.deepEqual(snapshot.implementation,{MISSING:853,AUTHORED:0,VALIDATED:155,FROZEN:0});
assert.equal(snapshot.L01.validated,155);
assert.deepEqual(snapshot.L02.implementation,{MISSING:139,AUTHORED:0,VALIDATED:0,FROZEN:0});
assert.equal(snapshot.L02.opi_patterns_approved,10);
assert.equal(snapshot.L02.opi_gid_expansions_complete,10);
assert.equal(snapshot.L02.curriculum_OPI_authored,0);
assert.equal(snapshot.L02.curriculum_OPI_validated,0);
assert.equal(snapshot.L02.curriculum_slots_implemented,0);
assert.equal(snapshot.L02_OPI_authoring.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(snapshot.next_gate,'SWHNK-L02-OPI-AUTHORING-HUMAN-BATCH-V1');

assert.equal(patternBatch.status,'APPROVED_ALL_DECISIONS');
assert.equal(patternTransition.status,'APPLIED');
assert.equal(patternTransition.after.patterns_approved_for_scoped_L02_authoring,10);
assert.equal(gid.status,'STRUCTURAL_EXPANSION_COMPLETE_NOT_CURRICULUM_AUTHORING');
assert.equal(gid.checks.patterns_expanded,10);
assert.equal(gid.checks.unresolved_transliteration_units,0);
assert.equal(gid.checks.curriculum_OPI_authored,0);
assert.equal(authoringBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(authoringBatch.checks.current_curriculum_OPI_AUTHORED,0);
assert.equal(authoringBatch.projected_effect_if_all_approved.curriculum_OPI_AUTHORED,10);
assert.equal(authoringBatch.projected_effect_if_all_approved.curriculum_OPI_VALIDATED,0);

assert.equal(manifest.status,'PATTERNS_APPROVED_GID_EXPANSION_COMPLETE_OPI_AUTHORING_GATE_PENDING');
assert.equal(manifest.pedagogy.opi_patterns_approved,10);
assert.equal(manifest.pedagogy.opi_gid_expansions_complete,10);
assert.equal(manifest.pedagogy.curriculum_OPI_authored,0);
assert.equal(manifest.pedagogy.curriculum_OPI_validated,0);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,0);
assert.equal(manifest.next_gate,'SWHNK-L02-OPI-AUTHORING-HUMAN-BATCH-V1');

assert.equal(evidence.lexical_evidence.authored_candidate_forms_linked_to_cycle1,20);
assert.equal(evidence.lexical_evidence.governed_unique_language_assets,51);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V48');
console.log('L01 Kether remains 155/155 VALIDATED; L02 has 10 approved scoped OPI patterns with complete G-ID expansion, while OPI authoring remains pending and 0 L02 slots are implemented.');
