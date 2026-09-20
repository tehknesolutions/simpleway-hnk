import assert from 'node:assert/strict';
import {lexemes,constructions} from '../experiments/a1-rc1-sprint1/core/registry.mjs';
assert.equal(lexemes.HNK.form,'HNK');
assert.equal(lexemes.HNK.function,'LANGUAGE_CONTENT_HNK');
assert.equal(lexemes.HNK.notes.some(x=>/distinct term/.test(x)),true);
assert.equal(lexemes.HNK.notes.some(x=>/abbreviation/i.test(x)),false);
const q=constructions.find(x=>x.id==='A1_QUESTION_ZAMI_HNK');
assert.deepEqual(q.pattern,['EN','ZAMI','HNK','KE']);
console.log('PASS HNK-CANON-DISTINCTION');
