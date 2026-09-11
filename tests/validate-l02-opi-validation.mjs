import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const gid=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-pattern-gid-expansion.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-validation-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-validation.applied-transition.v1.json');
const validated=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-001-010.validated.v1.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V50.json');

assert.equal(gate.batch_id,'SWHNK-L02-OPI-VALIDATION-BATCH-V1');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.decisions_requested.length,14);
assert.ok(gate.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(gate.approved_effect.L02_OPI_AUTHORED,0);
assert.equal(gate.approved_effect.L02_OPI_VALIDATED,10);
assert.equal(gate.approved_effect.GLOBAL_VALIDATED,165);
assert.equal(gate.approved_effect.new_surface_forms_created,0);
assert.equal(gate.approved_effect.authority_promotions,0);
assert.equal(gate.next_gate_status,'NOT_OPENED_BY_THIS_BATCH');
assert.equal(transition.status,'APPLIED');
assert.deepEqual(transition.before,{L02_OPI_AUTHORED:10,L02_OPI_VALIDATED:0,GLOBAL_VALIDATED:155});
assert.deepEqual(transition.after,{L02_OPI_AUTHORED:0,L02_OPI_VALIDATED:10,GLOBAL_VALIDATED:165});
assert.equal(transition.non_effects.universal_grammar_claims,0);
assert.equal(transition.non_effects.PA_tense_grammar_created,false);
assert.equal(transition.non_effects.PITSA_borrowing_grammar_created,false);
assert.equal(validated.artifact_id,'SWHNK-L02-OPI-001-010-VALIDATED-V1');
assert.equal(validated.status,'VALIDATED_SCOPED_COURSE_USE');
assert.equal(validated.slots.length,10);
assert.ok(validated.slots.every(x=>x.implementation_state==='VALIDATED'));
assert.equal(validated.slots.find(x=>x.slot_id==='L02-OPI-006').risk,'HIGH');
assert.equal(validated.slots.find(x=>x.slot_id==='L02-OPI-008').risk,'VERY_HIGH');
assert.equal(validated.checks.validated,10);
assert.equal(validated.checks.authored_remaining,0);
assert.equal(validated.checks.authority_promotions,0);
assert.equal(validated.authority_boundaries.VANI_master_meaning,null);
assert.equal(validated.authority_boundaries.VANUVALI_master_meaning,null);
assert.equal(validated.authority_boundaries.universal_grammar_claims,0);
assert.equal(gid.checks.patterns_expanded,10);
assert.equal(gid.checks.unresolved_transliteration_units,0);
assert.equal(manifest.status,'OPI_10_OF_10_VALIDATED_NEXT_GATE_NOT_OPENED');
assert.equal(manifest.pedagogy.curriculum_OPI_authored,0);
assert.equal(manifest.pedagogy.curriculum_OPI_validated,10);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,10);
assert.equal(manifest.next_gate_status,'NOT_OPENED');
assert.equal('story_qa_structure_contract' in manifest,false);
assert.equal('story_qa_structure_gate' in manifest,false);
assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V50');
assert.deepEqual(snapshot.implementation,{MISSING:843,AUTHORED:0,VALIDATED:165,FROZEN:0});
assert.deepEqual(snapshot.L02.implementation,{MISSING:129,AUTHORED:0,VALIDATED:10,FROZEN:0});
assert.equal(snapshot.next_gate_status,'NOT_OPENED');

console.log('PASS SWHNK-L02-OPI-VALIDATION-V1');
console.log('L02 OPI 001-010 are validated for scoped course use only; language authority is unchanged and Story/QA/Structure remains unopened.');
