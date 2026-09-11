import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const patternTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review.approved-transition.v1.json');
const gid=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-pattern-gid-expansion.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring.applied-transition.v1.json');
const authored=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-001-010.authored.v1.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V49.json');

assert.equal(patternTransition.status,'APPLIED');
assert.equal(patternTransition.after.patterns_approved_for_scoped_L02_authoring,10);
assert.equal(gid.status,'STRUCTURAL_EXPANSION_COMPLETE_NOT_CURRICULUM_AUTHORING');
assert.equal(gid.checks.patterns_expanded,10);
assert.equal(gid.checks.unresolved_transliteration_units,0);

assert.equal(gate.batch_id,'SWHNK-L02-OPI-AUTHORING-HUMAN-BATCH-V1');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.decisions_requested.length,13);
assert.ok(gate.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(gate.approved_effect.curriculum_OPI_AUTHORED,10);
assert.equal(gate.approved_effect.curriculum_OPI_VALIDATED,0);
assert.equal(gate.approved_effect.authority_promotions,0);
assert.equal(gate.approved_effect.new_surface_forms_created,0);

assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.L02_OPI_AUTHORED,10);
assert.equal(transition.after.L02_OPI_VALIDATED,0);
assert.equal(authored.artifact_id,'SWHNK-L02-OPI-001-010-AUTHORED-V1');
assert.equal(authored.status,'AUTHORED_PENDING_VALIDATION');
assert.equal(authored.slots.length,10);
assert.equal(authored.checks.authored,10);
assert.equal(authored.checks.validated,0);
assert.equal(authored.slots.find(x=>x.slot_id==='L02-OPI-006').risk,'HIGH');
assert.equal(authored.slots.find(x=>x.slot_id==='L02-OPI-008').risk,'VERY_HIGH');
assert.deepEqual(authored.excluded_unresolved_source_forms,['VANI','VANUVALI']);

assert.equal(manifest.status,'OPI_10_OF_10_AUTHORED_VALIDATION_PENDING');
assert.equal(manifest.pedagogy.curriculum_OPI_authored,10);
assert.equal(manifest.pedagogy.curriculum_OPI_validated,0);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,10);
assert.equal(manifest.next_gate,'SWHNK-L02-OPI-VALIDATION-BATCH-V1');

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V49');
assert.equal(snapshot.implementation.AUTHORED,10);
assert.equal(snapshot.implementation.VALIDATED,155);
assert.equal(snapshot.L02.curriculum_OPI_authored,10);
assert.equal(snapshot.L02.curriculum_OPI_validated,0);

console.log('PASS SWHNK-L02-OPI-AUTHORING-APPLIED-V1');
console.log('L02 contains exactly 10 AUTHORED OPI and 0 VALIDATED OPI; separate human validation remains the next gate.');
