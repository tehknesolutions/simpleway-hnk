import assert from 'node:assert/strict';
import { lexemes, constructions, getConstructionByPattern } from '../experiments/a1-rc1-sprint1/core/registry.mjs';
import { validateUtterance, validateAgainstIntents, tokenize } from '../experiments/a1-rc1-sprint1/core/validator.mjs';
import { WORLD_1, WORLD_2, campaignLevels, levelsById, worldByLevelId } from '../experiments/a1-rc1-sprint1/core/levels.mjs';

assert.equal(WORLD_1.levels.length,8);
assert.equal(WORLD_2.levels.length,8);
assert.equal(campaignLevels.length,16);
assert.deepEqual(WORLD_2.levels.map(l=>l.order),[9,10,11,12,13,14,15,16]);
assert.equal(new Set(campaignLevels.map(l=>l.id)).size,16);

for (const level of WORLD_2.levels) {
  assert.equal(level.mode,'builder');
  assert.ok(level.targetIntent);
  assert.ok(Array.isArray(level.tokenTray) && level.tokenTray.length>=4);
  assert.ok(Array.isArray(level.hints) && level.hints.length===3);
  assert.equal(levelsById.get(level.id),level);
  assert.equal(worldByLevelId.get(level.id),WORLD_2);
}

const authoredLocked=[
  'GAVURI','KAVESO','HIZEP','MORAKU','SAVETA',
  'KORUME','VEMI','LOKANI','DOMERA','TAMURI',
  'NEMA','VOMA','PELUKI','LENU','MAVERA'
];
for (const form of authoredLocked) {
  assert.ok(lexemes[form],`missing Sprint 2 lexeme ${form}`);
  assert.deepEqual(lexemes[form].authority,['HNK_AUTHORED_CANDIDATE','LOCKED_FOR_TESTING']);
  assert.equal(lexemes[form].a1Enabled,true);
}

const validCases=[
  ['AN GAVURI KAVESO.','STATE_HAVE_BOOK'],
  ['AN GAVURI HIZEP KAVESO.','STATE_HAVE_TWO_BOOKS'],
  ['AN MORAKU SAVETA.','STATE_WANT_WATER'],
  ['AN NE MORAKU SAVETA.','STATE_NOT_WANT_WATER'],
  ['AN KORUME VEMI LOKANI DOMERA.','STATE_NEED_GO_HOME'],
  ['TAMURI NEMA VALI.','STATE_TOMORROW_WE_WORK'],
  ['VOMA PELUKI.','STATE_THEY_STUDY'],
  ['AN LENU MAVERA VALI.','STATE_MY_MOTHER_WORKS']
];

for (const [input,intent] of validCases) {
  const result=validateAgainstIntents(input,[intent]);
  assert.equal(result.status,'VALID',input);
  assert.equal(result.construction.intent,intent);
  assert.equal(result.construction.generalizes,false);
}

const invalidCases=[
  'AN GAVURI KAVESO HIZEP.',
  'AN GAVURI HIZEP SAVETA.',
  'AN MORAKU HIZEP SAVETA.',
  'AN KORUME LOKANI DOMERA.',
  'AN VEMI LOKANI DOMERA.',
  'NEMA TAMURI VALI.',
  'VOMA VALI.',
  'AN MAVERA LENU VALI.',
  'AN LENU MAVERA GAVURI.'
];
for (const input of invalidCases) {
  assert.equal(validateUtterance(input).status,'UNMAPPED_CONSTRUCTION',input);
}

const chain=getConstructionByPattern(tokenize('AN KORUME VEMI LOKANI DOMERA.'));
assert.ok(chain.guards.includes('VEMI_CONTROLLED_ACTION_COMPLEMENT'));

const counted=getConstructionByPattern(tokenize('AN GAVURI HIZEP KAVESO.'));
assert.ok(counted.guards.includes('COUNTABLE_OBJECT_FRAME_ONLY'));

const complexNp=getConstructionByPattern(tokenize('AN LENU MAVERA VALI.'));
assert.ok(complexNp.guards.includes('COMPLEX_POSSESSIVE_NP_SUBJECT_SCOPED'));

for (const c of constructions.filter(c=>c.id.startsWith('A1_') && [
  'STATE_HAVE_BOOK','STATE_HAVE_TWO_BOOKS','STATE_WANT_WATER','STATE_NOT_WANT_WATER',
  'STATE_NEED_GO_HOME','STATE_TOMORROW_WE_WORK','STATE_THEY_STUDY','STATE_MY_MOTHER_WORKS'
].includes(c.intent))) {
  assert.deepEqual(c.authority,['HNK_AUTHORED_CANDIDATE','LOCKED_FOR_TESTING']);
  assert.equal(c.generalizes,false);
}

assert.equal(campaignLevels[7].id,'L08_FIRST_CONVERSATION');
assert.equal(campaignLevels[8].id,'L09_I_HAVE_A_BOOK');
assert.equal(campaignLevels[15].id,'L16_MY_MOTHER_WORKS');

console.log('PASS HNK-A1-CONSTRUCTION-FORGE-SPRINT2');
