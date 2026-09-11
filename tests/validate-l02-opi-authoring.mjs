import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const patternTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review.approved-transition.v1.json');
const gid=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-pattern-gid-expansion.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring.applied-transition.v1.json');
const authored=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-001-010.authored.v1.json');
const validationTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-validation.applied-transition.v1.json');

assert.equal(patternTransition.status,'APPLIED');
assert.equal(patternTransition.after.patterns_approved_for_scoped_L02_authoring,10);
assert.equal(gid.status,'STRUCTURAL_EXPANSION_COMPLETE_NOT_CURRICULUM_AUTHORING');
assert.equal(gid.checks.patterns_expanded,10);
assert.equal(gid.checks.unresolved_transliteration_units,0);
assert.equal(gate.batch_id,'SWHNK-L02-OPI-AUTHORING-HUMAN-BATCH-V1');
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.ok(gate.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(gate.approved_effect.curriculum_OPI_AUTHORED,10);
assert.equal(gate.approved_effect.curriculum_OPI_VALIDATED,0);
assert.equal(transition.status,'APPLIED');
assert.deepEqual(transition.after,{L02_OPI_AUTHORED:10,L02_OPI_VALIDATED:0,L02_curriculum_slots_implemented:10});
assert.equal(authored.artifact_id,'SWHNK-L02-OPI-001-010-AUTHORED-V1');
assert.equal(authored.slots.length,10);
assert.equal(authored.checks.authored,10);
assert.equal(authored.checks.validated,0);
assert.equal(authored.slots.find(x=>x.slot_id==='L02-OPI-006').risk,'HIGH');
assert.equal(authored.slots.find(x=>x.slot_id==='L02-OPI-008').risk,'VERY_HIGH');
assert.deepEqual(authored.excluded_unresolved_source_forms,['VANI','VANUVALI']);
assert.equal(validationTransition.before.L02_OPI_AUTHORED,10);
assert.equal(validationTransition.before.L02_OPI_VALIDATED,0);
assert.equal(manifest.pedagogy.curriculum_OPI_authored,0);
assert.equal(manifest.pedagogy.curriculum_OPI_validated,10);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,10);

console.log('PASS SWHNK-L02-OPI-AUTHORING-PROVENANCE-V1');
console.log('The 10-slot AUTHORED layer remains preserved as audited provenance; current curriculum state has separately advanced to 10 VALIDATED OPI.');
