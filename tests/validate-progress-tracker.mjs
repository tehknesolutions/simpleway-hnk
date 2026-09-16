import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const snap=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V129.json');
const l02=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const l03=await json('curriculum/cycle-01/L03-binah/manifest.json');
const candidate=await json('curriculum/cycle-01/L03-binah/candidates/l03-controlled-direct-question-ke-surface-candidate.v1.json');
const validationGate=await json('curriculum/cycle-01/L03-binah/validation/l03-opi-foundational-interrogative-candidate-validation-human-batch.v1.json');
const workstream=await json('proposals/language/HNK_GRAMMAR_CORE_V1_ACTIVE_DECISION_V1.json');

assert.equal(snap.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V129');
assert.equal(snap.package,'simpleway-hnk@0.75.0');
assert.deepEqual(snap.implementation,{MISSING:701,AUTHORED:0,VALIDATED:307,FROZEN:0});
assert.deepEqual(snap.L02.implementation,{MISSING:0,AUTHORED:0,VALIDATED:139,FROZEN:0});
assert.equal(snap.L02.sealed,true);
assert.equal(snap.L02.content_frozen,true);
assert.deepEqual(snap.L03.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(snap.L03.structures_VALIDATED,2);
assert.equal(snap.L03.opi_AUTHORED,0);
assert.equal(snap.L03.opi_VALIDATED,0);
assert.equal(snap.L03.qa_AUTHORED,0);
assert.equal(snap.L03.qa_VALIDATED,0);
assert.equal(snap.L03.KE_course_binding_applied,true);
assert.equal(snap.L03.exact_surface_completed_fields,4);
assert.equal(snap.L03.surface_candidate_created,true);
assert.equal(snap.L03.surface_candidate_validated,false);
assert.equal(snap.L03.surface_candidate_productive,false);
assert.equal(snap.L03.surface_candidate_curriculum_mapped,false);

assert.equal(candidate.status,'MATERIALIZED_UNVALIDATED_NONPRODUCTIVE_NONRUNTIME');
assert.equal(validationGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(workstream.active_gate,validationGate.batch_id);
assert.equal(workstream.status,'ACTIVE_AWAITING_L03_INTERROGATIVE_CANDIDATE_VALIDATION_DECISION');

assert.equal(snap.boundaries.KE_bound_to_L03,true);
assert.equal(snap.boundaries.KE_generalized_to_L03,false);
assert.equal(snap.boundaries.KE_owner_authority,'CANDIDATE');
assert.deepEqual(snap.boundaries.KE_owner_lessons,['L01','L02']);
assert.equal(snap.boundaries.owner_registry_changed,false);
assert.equal(snap.boundaries.AN_EN_bound_to_L03,false);
assert.equal(snap.boundaries.KU_KUVAN_bound_to_L03,false);
assert.equal(snap.boundaries.new_surface_forms,0);
assert.equal(snap.boundaries.new_promoted_grammar_rules,0);
assert.equal(snap.boundaries.L03_surface_fields_selected,4);
assert.equal(snap.boundaries.surface_candidate_created,true);
assert.equal(snap.boundaries.surface_candidate_validated,false);
assert.equal(snap.boundaries.surface_candidate_productive,false);
assert.equal(snap.boundaries.surface_candidate_curriculum_mapped,false);
assert.equal(snap.boundaries.OPI_unlocked,false);
assert.equal(snap.boundaries.QA_unlocked,false);
assert.equal(snap.boundaries.STR003_STR005_unlocked,false);
assert.equal(snap.boundaries.runtime_active,false);
assert.equal(snap.parallel_workstreams.HNK3000.automatic_cycle1_binding,false);
assert.equal(snap.parallel_workstreams.parent_lexeme_canonical_integration.consumed_by_v129,false);
assert.equal(snap.next_gate,validationGate.batch_id);
assert.equal(snap.next_gate_status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(l02.pedagogy.sealed,true);
assert.deepEqual(l03.implementation,{MISSING:126,AUTHORED:0,VALIDATED:13,FROZEN:0});
assert.equal(l03.rules.OPI_unlocked,false);
assert.equal(l03.rules.QA_unlocked,false);

console.log('PASS SWHNK-C1-PROGRESS-TRACKER-V129');
