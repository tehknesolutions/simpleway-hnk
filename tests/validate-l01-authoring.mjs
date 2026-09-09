import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

async function json(path) {
  return JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), 'utf8'));
}

const queue = await json('curriculum/cycle-01/L01-kether/authoring/lesson.authoring.v1.1.json');
const snapshot = await json('curriculum/cycle-01/L01-kether/authoring/lexicon.bindings.snapshot.json');

const expectedOpi = [
  "What's your name?",
  'Do you have a nickname?',
  'How old are you?',
  'Where were you born?',
  'Where do you work?',
  'What do you do at work/school?',
  'Where do you live and who do you live with?',
  'What are your hobbies?',
  'Do you like to sing?',
  'What do you do on weekends?',
];

assert.equal(queue.lesson_id, 'HNK-L01');
assert.equal(queue.sphere, 'Kether');
assert.equal(queue.version, '1.1.0-authoring');
assert.equal(queue.status, 'AUTHORING_QUEUE');
assert.equal(queue.inherits_from.source_version, '1.0.0');
assert.equal(queue.inherits_from.source_status, 'PUBLICATION-FROZEN');
assert.equal(queue.inherits_from.raw_v1_payload_recovered, false);
assert.equal(queue.rules.non_invention, true);
assert.equal(queue.rules.null_until_bound, true);
assert.equal(queue.rules.watch_requires_label, true);
assert.equal(queue.rules.v1_0_history_must_not_be_overwritten, true);

assert.equal(queue.student_cards.length, 10);
assert.deepEqual(queue.student_cards.map(x => x.opi_english), expectedOpi);
assert.ok(queue.student_cards.every(x => x.source_state === 'FROZEN_PROMPT_RECOVERED'));
assert.ok(queue.student_cards.every(x => x.hnk_question === null));
assert.ok(queue.student_cards.every(x => x.hnk_phrase_id === null));
assert.ok(queue.student_cards.every(x => x.hnk_answer_pattern === null));
assert.ok(queue.student_cards.every(x => x.glyph_ids === null));
assert.ok(queue.student_cards.every(x => x.lexeme_ids.length === 0));
assert.ok(queue.student_cards.every(x => x.binding_state === 'UNBOUND_AUTHORING'));

assert.equal(queue.activation_slot_ids.length, 72);
assert.equal(new Set(queue.activation_slot_ids).size, 72);
assert.equal(queue.activation_slot_ids[0], 'L01-ACT-001');
assert.equal(queue.activation_slot_ids.at(-1), 'L01-ACT-072');
assert.equal(queue.activation_slot_template.hnk, null);
assert.equal(queue.activation_slot_template.glyph_ids, null);
assert.equal(queue.activation_slot_template.binding_state, 'UNBOUND_AUTHORING');
assert.equal(queue.targets.opi, 10);
assert.equal(queue.targets.activation, 72);

assert.equal(snapshot.lesson_id, 'L01');
assert.equal(snapshot.source.registry_version, '1.0.0-preproduction');
assert.equal(snapshot.source.registry_status, 'RECOVERED_BETA_REGISTRY');
assert.equal(snapshot.lexemes.length, 9);
assert.equal(snapshot.phrases.length, 7);
assert.deepEqual(snapshot.counts, { lexemes: 9, phrases: 7, frozen: 5, watch: 3, reference: 1 });

const byAuthority = Object.groupBy(snapshot.lexemes, x => x.authority);
assert.equal(byAuthority.FROZEN.length, 5);
assert.deepEqual(byAuthority.WATCH.map(x => x.transliteration), ['SARASALA', 'VAMAVALA', 'VAMAZAMU']);
assert.deepEqual(byAuthority.REFERENCE.map(x => x.transliteration), ['HENUVOKODAN']);
assert.equal(snapshot.phrases.filter(x => x.meaning === null).length, 4);
assert.equal(snapshot.phrases.filter(x => x.certainty === 'APPROXIMATE').length, 3);

console.log('PASS SWHNK-L01-AUTHORING-V1');
console.log('10 OPI structural slots | 72 Activation slots | 9 lexemes | 7 phrases');
console.log('All new HNK authoring fields remain null/unbound until governed binding.');
