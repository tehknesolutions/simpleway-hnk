import assert from 'node:assert/strict';
import {tokenizeSafeRomanization,SAFE_ROMANIZATION_TO_GID} from '../src/hnk/lexeme-gid-tokenization-v1.mjs';
assert.equal(Object.keys(SAFE_ROMANIZATION_TO_GID).length,20);
assert.deepEqual(tokenizeSafeRomanization('PITSA').gIds,['G21','G03','G30','G01']);
assert.deepEqual(tokenizeSafeRomanization('DAYI').gIds,['G19','G01','G40','G03']);
assert.equal(tokenizeSafeRomanization('HNK').status,'NON_LEXICAL_CONTENT_TOKEN');
assert.equal(tokenizeSafeRomanization('FA').status,'UNRESOLVED_ROMANIZATION');
console.log('PASS HNK-LEXEME-GID-TOKENIZATION-V1');
