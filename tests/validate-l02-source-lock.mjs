import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path){return JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));}

const manifest=await json('curriculum/cycle-01/L02-chokhmah/manifest.json');
const scaffold=await json('curriculum/cycle-01/L02-chokhmah/recovered/lesson.scaffold.v0.0.1.json');
const audit=await json('curriculum/cycle-01/L02-chokhmah/source-lock/l02-source-lock-audit.v1.json');
const kether=await json('curriculum/cycle-01/L01-kether/closure/kether-seal.v1.json');

assert.equal(kether.status,'SEALED_CURRICULUM_VALIDATION_COMPLETE');
assert.equal(kether.validated,155);
assert.equal(manifest.lesson_id,'HNK-L02');
assert.equal(manifest.sphere,'Chokhmah');
assert.equal(manifest.status,'SEMANTIC_TARGETS_DRAFTED_PEDAGOGY_HOLD');
assert.equal(manifest.version,'0.0.3');
assert.equal(manifest.language_bindings,11);
assert.equal(manifest.recovered_phrases,0);
assert.equal(manifest.language_inventory.FROZEN,5);
assert.equal(manifest.language_inventory.WATCH,5);
assert.equal(manifest.language_inventory.GATE,1);
assert.equal(manifest.language_inventory.with_master_meaning,9);
assert.equal(manifest.language_inventory.without_master_meaning,2);
assert.equal(manifest.semantic_gap.target,5);
assert.equal(manifest.semantic_gap.approved,0);
assert.equal(manifest.semantic_gap.forms_selected,0);
assert.equal(manifest.semantic_gap.strategy,'SEMANTICS_BEFORE_FORM_AND_REUSE_BEFORE_INVENTION');
assert.equal(manifest.pedagogy.authoring_hold,true);
assert.equal(manifest.rules.non_invention,true);
assert.equal(manifest.rules.reference_layers_are_not_independent_course_commitments,true);
assert.equal(manifest.rules.numerology_selects_forms,false);
assert.equal(manifest.next_gate,'SWHNK-L02-SEMANTIC-TARGETS-HUMAN-BATCH-V1');

assert.equal(scaffold.source_canon,'UNDEFINED — must be approved before content production');
assert.deepEqual(scaffold.student_cards,[]);
assert.deepEqual(scaffold.teacher_drills,[]);
assert.equal(audit.audit_id,'SWHNK-L02-CHOKHMAH-SOURCE-LOCK-AUDIT-V1');
assert.equal(audit.status,'AUDITED_PEDAGOGY_HOLD');
assert.equal(audit.curriculum_target,139);
assert.equal(audit.vocabulary_target,16);
assert.equal(audit.source_inventory.recovered_lexemes,11);
assert.equal(audit.source_inventory.recovered_phrases,0);
assert.equal(audit.source_inventory.authored_candidates_bound_to_L02,0);
assert.deepEqual(audit.source_inventory.authority_counts,{FROZEN:5,WATCH:5,GATE:1,CANDIDATE:0,BRIDGE:0,REFERENCE:0});
assert.equal(audit.source_inventory.with_master_meaning,9);
assert.equal(audit.source_inventory.without_master_meaning,2);
assert.equal(audit.lexemes.length,11);
assert.deepEqual(audit.lexemes.map(x=>x.id),['LEX-009','LEX-010','LEX-011','LEX-012','LEX-013','LEX-014','LEX-015','LEX-020','LEX-030','LEX-031','LEX-032']);
assert.deepEqual(audit.lexemes.filter(x=>x.meaning_pt===null).map(x=>x.form),['VANUVALI','VANI']);
assert.equal(audit.coverage.recovered_lexeme_proxy,11);
assert.equal(audit.coverage.proxy_gap,5);
assert.equal(audit.coverage.recovered_proxy_percent,68.75);
assert.equal(audit.decision,'HOLD_PEDAGOGY_AUTHORING_PENDING_SOURCE_TARGETS');
assert.match(audit.blockers.join(' '),/No recovered L02 phrases/);
assert.match(audit.non_effects.join(' '),/reference\/comparison layers/);

console.log('PASS SWHNK-L02-CHOKHMAH-SOURCE-LOCK-V2');
console.log('L02 Source Lock remains intact; five semantics-first targets are drafted, exact forms remain unselected, and pedagogy remains HOLD.');
