import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const patternBatch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review-human-batch.v1.json');
const patternTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review.approved-transition.v1.json');
const gid=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-pattern-gid-expansion.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring-human-batch.v1.json');

assert.equal(patternBatch.status,'APPROVED_ALL_DECISIONS');
assert.equal(patternTransition.status,'APPLIED');
assert.equal(patternTransition.after.patterns_approved_for_scoped_L02_authoring,10);
assert.equal(gid.status,'STRUCTURAL_EXPANSION_COMPLETE_NOT_CURRICULUM_AUTHORING');
assert.equal(gid.checks.patterns_expanded,10);
assert.equal(gid.checks.unresolved_transliteration_units,0);
assert.equal(gid.checks.curriculum_OPI_authored,0);

assert.equal(gate.batch_id,'SWHNK-L02-OPI-AUTHORING-HUMAN-BATCH-V1');
assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.decisions_requested.length,13);
assert.equal(gate.checks.patterns_approved,10);
assert.equal(gate.checks.GID_expansions_complete,10);
assert.equal(gate.checks.current_curriculum_OPI_AUTHORED,0);
assert.equal(gate.checks.current_curriculum_OPI_VALIDATED,0);
assert.equal(gate.projected_effect_if_all_approved.curriculum_OPI_AUTHORED,10);
assert.equal(gate.projected_effect_if_all_approved.curriculum_OPI_VALIDATED,0);
assert.equal(gate.projected_effect_if_all_approved.authority_promotions,0);
assert.equal(gate.projected_effect_if_all_approved.new_surface_forms_created,0);

assert.equal(manifest.status,'PATTERNS_APPROVED_GID_EXPANSION_COMPLETE_OPI_AUTHORING_GATE_PENDING');
assert.equal(manifest.pedagogy.curriculum_OPI_authored,0);
assert.equal(manifest.pedagogy.curriculum_OPI_validated,0);
assert.equal(manifest.pedagogy.curriculum_slots_implemented,0);
assert.equal(manifest.next_gate,'SWHNK-L02-OPI-AUTHORING-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-OPI-AUTHORING-GATE-PENDING-V1');
console.log('L02 has 10 approved patterns and complete structural G-ID expansion; authoring remains pending explicit human approval, with 0 OPI slots implemented.');
