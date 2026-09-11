import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}
const contract=await json('contracts/HNK_CYCLE_1_NUMEROLOGICAL_CONTRACT_V1.json');
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-str005-i-didnt-design-review.v1.json');
const gate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-i-didnt-design-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-i-didnt-design.approved-transition.v1.json');
const patternReview=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-str005-ne-scope-exact-pattern-review.v1.json');
const patternGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-str005-ne-scope-exact-pattern-human-batch.v1.json');
const structures=await json('curriculum/cycle-01/L02-chokhmah/authoring/structure-lane.v1.json');
const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');

const required=contract.additions.find(x=>x.lesson===2&&x.category==='structures');
assert.equal(required.content,"I didn't...");
assert.equal(review.required_slot,'L02-STR-005');
assert.equal(review.semantic_target.approved_form,null);
assert.equal(gate.status,'APPROVED_ALL_DECISIONS');
assert.equal(gate.decisions_requested.length,8);
assert.ok(gate.decisions_requested.every(x=>x.decision==='APPROVED'));
assert.equal(gate.approved_effect.exact_HNK_pattern_approved,0);
assert.equal(gate.approved_effect.NE_L02_scope_extension_applied,0);
assert.equal(gate.approved_effect.STR005_AUTHORED,0);
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.semantic_target_approved,1);
assert.equal(transition.after.exact_HNK_pattern_approved,0);
assert.equal(transition.after.NE_L02_scope_extension_applied,0);
assert.equal(transition.after.STR005_AUTHORED,0);
assert.equal(patternReview.status,'READY_FOR_HUMAN_REVIEW_NOT_APPLIED');
assert.equal(patternGate.status,'AWAITING_EXPLICIT_HUMAN_APPROVAL');
const str005=structures.structures.find(x=>x.slot_id==='L02-STR-005');
assert.equal(str005.frame,null);
assert.equal(str005.implementation_state,'MISSING_CANONICAL_DESIGN_GATE_REQUIRED');
assert.equal(manifest.pedagogy.STR005_semantic_target_approved,true);
assert.equal(manifest.pedagogy.STR005_exact_pattern_selected,0);
assert.equal(manifest.pedagogy.NE_L02_scope_extension_applied,0);
assert.equal(manifest.next_gate,'SWHNK-L02-STR005-NE-SCOPE-EXACT-PATTERN-HUMAN-BATCH-V1');
assert.equal(manifest.deferred_gate,'SWHNK-L02-SQS-15-VALIDATION-HUMAN-BATCH-V1');

console.log('PASS SWHNK-L02-STR005-I-DIDNT-DESIGN-APPROVED-V2');
console.log("STR005 semantic/component design is approved, while NE extension and exact HNK pattern remain unapplied and the canonical slot stays missing.");
