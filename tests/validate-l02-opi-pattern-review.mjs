import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const contract=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-pedagogy-source-contract.v1.json');
const approval=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract-human-batch.v1.json');
const transition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-pedagogy-source-contract.approved-transition.v1.json');
const review=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-opi-pattern-review.v1.json');
const batch=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review-human-batch.v1.json');
const patternTransition=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-pattern-review.approved-transition.v1.json');
const gid=await json('curriculum/cycle-01/L02-chokhmah/authoring/l02-opi-pattern-gid-expansion.v1.json');
const authoringGate=await json('curriculum/cycle-01/L02-chokhmah/validation/l02-opi-authoring-human-batch.v1.json');

assert.equal(approval.status,'APPROVED_ALL_DECISIONS');
assert.equal(transition.status,'APPLIED');
assert.equal(transition.after.opi_intents_approved,10);
assert.equal(contract.checks.teachable_source_assets,16);
assert.equal(contract.checks.opi_intents,10);
assert.equal(review.review_id,'SWHNK-L02-OPI-PATTERN-REVIEW-V1');
assert.equal(review.patterns.length,10);
assert.equal(review.patterns.filter(x=>x.evidence_class==='DIRECT_REUSE_VALIDATED').length,1);
assert.equal(review.patterns.find(x=>x.id==='L02-OPI-PAT-002').hnk_candidate,'EN VALI KUVAN KE');
assert.equal(review.patterns.find(x=>x.id==='L02-OPI-PAT-008').risk,'VERY_HIGH');
assert.equal(batch.status,'APPROVED_ALL_DECISIONS');
assert.equal(batch.decisions_requested.length,13);
assert.equal(patternTransition.status,'APPLIED');
assert.equal(patternTransition.after.patterns_approved_for_scoped_L02_authoring,10);

assert.equal(gid.artifact_id,'SWHNK-L02-OPI-PATTERN-GID-EXPANSION-V1');
assert.equal(gid.status,'STRUCTURAL_EXPANSION_COMPLETE_NOT_CURRICULUM_AUTHORING');
assert.equal(gid.patterns.length,10);
assert.equal(gid.checks.patterns_expanded,10);
assert.equal(gid.checks.unresolved_transliteration_units,0);
assert.deepEqual(gid.patterns.find(x=>x.id==='L02-OPI-PAT-002').words.find(x=>x.form==='KUVAN').gids,['G23','G05','G31','G01','G12']);
assert.deepEqual(gid.patterns.find(x=>x.id==='L02-OPI-PAT-009').words.find(x=>x.form==='PITSA').gids,['G21','G03','G30','G01']);

assert.equal(authoringGate.status,'APPROVED_ALL_DECISIONS');
assert.equal(authoringGate.decisions_requested.length,13);
assert.equal(authoringGate.approved_effect.curriculum_OPI_AUTHORED,10);
assert.equal(authoringGate.approved_effect.curriculum_OPI_VALIDATED,0);

assert.equal(manifest.status,'OPI_10_OF_10_AUTHORED_VALIDATION_GATE_PENDING');
assert.equal(manifest.pedagogy.opi_pattern_candidates,10);
assert.equal(manifest.pedagogy.opi_patterns_approved,10);
assert.equal(manifest.pedagogy.opi_gid_expansions_complete,10);
assert.equal(manifest.pedagogy.curriculum_OPI_authored,10);
assert.equal(manifest.pedagogy.curriculum_OPI_validated,0);
assert.equal(manifest.next_gate,'SWHNK-L02-OPI-VALIDATION-BATCH-V1');

console.log('PASS SWHNK-L02-OPI-PATTERN-GID-EXPANSION-V1');
console.log('L02 patterns and G-ID expansions remain governed; 10 OPI are now authored and await a separate validation gate.');
