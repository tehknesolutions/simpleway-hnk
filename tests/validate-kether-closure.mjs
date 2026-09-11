import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const seal=await json('curriculum/cycle-01/L01-kether/closure/kether-seal.v1.json');
const reviewTransition=await json('curriculum/cycle-01/L01-kether/validation/review-22.validated-transition.v1.json');
const snapshot=await json('progress/CYCLE1_PROGRESS_SNAPSHOT_V41.json');
const l02=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');

assert.equal(seal.seal_id,'SWHNK-L01-KETHER-SEAL-V1');
assert.equal(seal.status,'SEALED_CURRICULUM_VALIDATION_COMPLETE');
assert.equal(seal.target,155);
assert.equal(seal.validated,155);
assert.equal(seal.completion_percent,100);
assert.equal(Object.values(seal.category_totals).reduce((a,b)=>a+b,0),155);
assert.deepEqual(seal.category_totals,seal.category_validation);
assert.equal(seal.preserved_boundaries.language_authority_promotions,0);
assert.equal(seal.preserved_boundaries.visual_canon_promotions,0);
assert.equal(seal.preserved_boundaries.VANI.authority,'WATCH');
assert.equal(seal.preserved_boundaries.VANI.master_meaning,null);
assert.equal(seal.preserved_boundaries.VAME,'GATE');
assert.equal(seal.preserved_boundaries.VAMUSARO_literal_weekend,false);
assert.equal(seal.preserved_boundaries.universal_grammar_created,false);

assert.equal(reviewTransition.status,'APPLIED');
assert.equal(reviewTransition.closure.status,'VALIDATED_COMPLETE');
assert.equal(reviewTransition.closure.seal_authorized,true);
assert.equal(reviewTransition.lesson_after.VALIDATED,155);
assert.equal(reviewTransition.lesson_after.MISSING,0);

assert.equal(snapshot.snapshot_id,'SWHNK-C1-PROGRESS-SNAPSHOT-V41');
assert.equal(snapshot.status,'L01_KETHER_SEALED_155_OF_155_VALIDATED_L02_CHOKHMAH_ENTRY_OPEN');
assert.equal(snapshot.implementation.VALIDATED,155);
assert.equal(snapshot.implementation.AUTHORED,0);
assert.equal(snapshot.implementation.MISSING,853);
assert.equal(snapshot.L01.validated,155);
assert.equal(snapshot.L01.pending_validation,0);
assert.equal(snapshot.L01.status,'SEALED_CURRICULUM_VALIDATION_COMPLETE');

assert.equal(l02.sphere,'Chokhmah');
assert.equal(l02.status,'LEXICON_RECOVERED_PEDAGOGY_SCAFFOLD');
assert.equal(l02.language_bindings,11);
assert.equal(l02.recovered_phrases,0);
assert.equal(l02.pedagogy.content_frozen,false);
assert.equal(seal.next_lesson.entry_rule,'SOURCE_LOCK_FIRST');

console.log('PASS SWHNK-L01-KETHER-CLOSURE-V41');
console.log('Kether is sealed at 155/155 scoped curriculum validation; Chokhmah opens under Source Lock with 11 recovered bindings and zero recovered phrases.');
