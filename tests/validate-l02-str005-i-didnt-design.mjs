import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-str005-i-didnt-design-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-i-didnt-design-human-batch.v1.json');
const structures=await json('curriculum/cycle-01/L02-chokhmah/authoring/structure-lane.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');

const required=contract.additions.find(x=>x.lesson===2&&x.category==='structures');
assert.equal(required.content,"I didn't...");
assert.equal(review.required_slot,'L02-STR-005');
assert.equal(review.required_content,"I didn't...");
assert.equal(review.semantic_target.approved_form,null);
assert.equal(review.checks.approved_exact_HNK_pattern,false);
assert.equal(review.checks.new_surface_forms_created,0);
assert.ok(review.prohibited_shortcuts.some(x=>x.includes('DID')));
assert.ok(review.prohibited_shortcuts.some(x=>x.includes("PA from 'ontem' to PAST")));

assert.equal(gate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
assert.equal(gate.decisions_requested.length,8);
assert.equal(gate.projected_effect_if_all_approved.exact_HNK_pattern_approved,0);
assert.equal(gate.projected_effect_if_all_approved.NE_L02_scope_extension_applied,0);
assert.equal(gate.projected_effect_if_all_approved.STR005_AUTHORED,0);

const str005=structures.structures.find(x=>x.slot_id==='L02-STR-005');
assert.equal(str005.required_content,"I didn't...");
assert.equal(str005.frame,null);
assert.equal(str005.implementation_state,'MISSING_CANONICAL_DESIGN_GATE_REQUIRED');
assert.equal(str005.displaced_pattern.pattern_ref,'L02-SQS-PAT-016');
assert.equal(manifest.rules.canonical_L02_STR005_requires_I_didnt,true);
assert.equal(manifest.rules.STR005_must_not_be_filled_by_EN_SAROSARI_KE,true);
assert.equal(manifest.parallel_gate,'SWHNK-L02-STR005-I-DIDNT-DESIGN-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-STR005-I-DIDNT-DESIGN-GATE-PENDING-V1');
console.log("The canonical L02 'I didn't...' structure slot is protected and remains missing; no negative-past HNK form, DID auxiliary, or generic PA=PAST rule has been invented.");
