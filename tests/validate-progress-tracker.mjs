import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const base=await json('progress/evidence-overrides.v1.json');
const names=(await readdir(new URL('../progress/',import.meta.url))).filter(name=>/^evidence-overrides\.v\d+\.json$/.test(name)&&name!=='evidence-overrides.v1.json').sort((a,b)=>Number(a.match(/\.v(\d+)\./)[1])-Number(b.match(/\.v(\d+)\./)[1]));
const evidence={...base,overrides:[...base.overrides],lexical_evidence:{...base.lexical_evidence},validation_evidence:{...base.validation_evidence}};
for(const name of names){const s=await json(`progress/${name}`);evidence.overrides.push(...(s.overrides??[]));Object.assign(evidence.lexical_evidence,s.lexical_evidence_updates??{});Object.assign(evidence.validation_evidence,s.validation_evidence_updates??{});}

const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V58.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const authorGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-authoring-human-batch.v2.json');
const structures=await json('curriculum/cycle-01/L02-chokhmah/authoring/structure-lane.v1.json');
const validationGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-sqs-15-validation-human-batch.v1.json');
const designGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-i-didnt-design-human-batch.v1.json');
const patternGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-ne-scope-exact-pattern-human-batch.v1.json');
const patternTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-ne-scope-exact-pattern.approved-transition.v1.json');
const str005AuthorGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-authoring-human-batch.v1.json');
const vAni=await json('proposals/language/HNK_VANI_RESIDENCE_SEMANTIC_HYPOTHESIS_V1.json');

assert.equal(contract.target_total,1008);
assert.ok(contract.additions.some(x=>x.lesson===2&&x.category==='structures'&&x.content==="I didn't..."));
const simulated=new Map();
for(const override of evidence.overrides){const {lesson,category,range}=override.selector;for(let i=range[0];i<=range[1];i++)simulated.set(`${lesson}/${category}/${i}`,override);}
const values=[...simulated.values()];
assert.equal(values.filter(x=>x.implementation_state==='AUTHORED').length,15);
assert.equal(values.filter(x=>x.implementation_state==='VALIDATED').length,165);
assert.equal(values.filter(x=>x.implementation_state==='FROZEN').length,0);

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V58');
assert.equal(snapshot.package,'simpleway-hnk@0.61.0');
assert.deepEqual(snapshot.implementation,{MISSING:828,AUTHORED:15,VALIDATED:165,FROZEN:0});
assert.deepEqual(snapshot.L02.implementation,{MISSING:114,AUTHORED:15,VALIDATED:10,FROZEN:0});
assert.equal(snapshot.L02.STR005_missing,1);
assert.equal(snapshot.L02_STR005_pattern_approval.NE_L02_scope_extension_applied,1);
assert.equal(snapshot.L02_STR005_pattern_approval.selected_pattern,'L02-STR005-PAT-B');
assert.equal(snapshot.L02_STR005_pattern_approval.STR005_AUTHORED,0);
assert.equal(snapshot.L02_SQS15_validation.status,'PREPARED_DEFERRED_NOT_ACTIVE');

assert.equal(authorGate.actual_effect.L02_SQS_AUTHORED,15);
assert.equal(structures.metrics.structures_AUTHORED,4);
assert.equal(structures.metrics.structures_MISSING,1);
assert.equal(structures.structures.find(x=>x.slot_id==='L02-STR-005').implementation_state,'MISSING_CANONICAL_DESIGN_GATE_REQUIRED');
assert.equal(validationGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(designGate.status,'APPROVED_ALL_DECISIONS');
assert.equal(patternGate.status,'APPROVED_ALL_DECISIONS');
assert.equal(patternTransition.after.NE_L02_scope_extension_applied,1);
assert.equal(patternTransition.after.exact_pattern_selected,'L02-STR005-PAT-B');
assert.equal(str005AuthorGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(str005AuthorGate.proposed_first_example.hnk,'PA AN NE VALI');

assert.equal(manifest.pedagogy.story_qa_structure_slots_authored,15);
assert.equal(manifest.pedagogy.story_qa_structure_slots_validated,0);
assert.equal(manifest.pedagogy.STR005_semantic_target_approved,true);
assert.equal(manifest.pedagogy.STR005_exact_pattern_selected,1);
assert.equal(manifest.pedagogy.STR005_selected_pattern,'L02-STR005-PAT-B');
assert.equal(manifest.pedagogy.NE_L02_scope_extension_applied,1);
assert.equal(manifest.pedagogy.sqs15_validation_deferred,true);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,25);
assert.equal(manifest.next_gate,'SWHNK-L02-STR005-AUTHORING-HUMAN-BATCH-V1');
assert.equal(manifest.deferred_gate,'SWHNK-L02-SQS-15-VALIDATION-HUMAN-BATCH-V1');

assert.equal(evidence.validation_evidence.L02_SQS_authored_total,15);
assert.equal(evidence.validation_evidence.L02_STR005_missing,1);
assert.equal(evidence.validation_evidence.GLOBAL_authored_total,15);
assert.equal(evidence.validation_evidence.GLOBAL_validated_total,165);
assert.equal(evidence.validation_evidence.GLOBAL_missing_total,828);
assert.equal(vAni.target_form.current_meaning,null);
assert.equal(vAni.target_form.current_authority,'WATCH');

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V58');
console.log("Kether remains 155/155 VALIDATED; Chokhmah remains 15 SQS AUTHORED and 0 SQS validated. Scoped NE extension and PAT-B selection are approved, while STR005 authoring is still behind the sole active human gate.");
