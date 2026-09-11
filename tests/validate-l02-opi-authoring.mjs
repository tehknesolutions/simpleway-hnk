import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring-human-batch.v1.json');
const authored=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-001-010.authored.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring.applied-transition.v1.json');
const validationBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-validation-batch.v1.json');
const evidence=await json('progress/evidence-overrides.v49.json');

assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.decisions_requested.length,13);
assert.equal(authored.artifact_id,'SWHNK-L02-OPI-001-010-AUTHORED-V1');
assert.equal(authored.status,'AUTHORED_PENDING_VALIDATION');
assert.equal(authored.slots.length,10);
assert.equal(authored.slots.every(x=>x.implementation_state==='AUTHORED'),true);
assert.equal(authored.checks.authored,10);
assert.equal(authored.checks.validated,0);
assert.equal(authored.checks.authority_promotions,0);
assert.equal(authored.checks.new_surface_forms_created,0);
assert.deepEqual(authored.excluded_unresolved_source_forms,['VANI','VANUVALI']);
assert.equal(authored.slots.find(x=>x.slot_id==='L02-OPI-006').risk,'HIGH');
assert.equal(authored.slots.find(x=>x.slot_id==='L02-OPI-008').risk,'VERY_HIGH');
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.L02_OPI_AUTHORED,10);
assert.equal(transition.after.L02_OPI_VALIDATED,0);
assert.equal(validationBatch.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(validationBatch.decisions_requested.length,14);
assert.equal(validationBatch.checks.authored,10);
assert.equal(validationBatch.checks.validated_before_gate,0);
assert.equal(evidence.overrides.length,1);
assert.equal(evidence.overrides[0].selector.lesson,'L02');
assert.equal(evidence.overrides[0].selector.category,'opi');
assert.deepEqual(evidence.overrides[0].selector.range,[1,10]);
assert.equal(evidence.overrides[0].implementation_state,'AUTHORED');
assert.equal(manifest.pedagogy.curriculum_OPI_authored,10);
assert.equal(manifest.pedagogy.curriculum_OPI_validated,0);
assert.equal(manifest.next_gate,'SWHNK-L02-OPI-VALIDATION-BATCH-V1');

console.log('PASS SWHNK-L02-OPI-001-010-AUTHORED-V1');
console.log('L02 has 10/10 authored OPI slots, 0 validated OPI slots, explicit risk visibility, and a separate validation batch pending.');
