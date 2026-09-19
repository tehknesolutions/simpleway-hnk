import assert from 'node:assert/strict';
import { lexemes, getConstructionByPattern } from '../experiments/a1-rc1-sprint1/core/registry.mjs';
import { validateUtterance, tokenize } from '../experiments/a1-rc1-sprint1/core/validator.mjs';
import { WORLD_1, WORLD_2, WORLD_3, WORLDS, campaignLevels, levelsById, worldByLevelId } from '../experiments/a1-rc1-sprint1/core/levels.mjs';

assert.equal(WORLD_1.levels.length,8);
assert.equal(WORLD_2.levels.length,8);
assert.equal(WORLD_3.levels.length,8);
assert.equal(WORLDS.length,5);
assert.equal(campaignLevels.length,32);
assert.deepEqual(WORLD_3.levels.map(l=>l.order),[17,18,19,20,21,22,23,24]);
assert.equal(new Set(campaignLevels.map(l=>l.id)).size,32);

for (const level of WORLD_3.levels) {
  assert.equal(level.mode,'contrast');
  assert.ok(Array.isArray(level.choices) && level.choices.length>=2);
  assert.equal(level.choices.filter(c=>c.correct).length,1, `${level.id} must have exactly one correct choice`);
  assert.ok(Array.isArray(level.hints) && level.hints.length===3);
  assert.equal(levelsById.get(level.id),level);
  assert.equal(worldByLevelId.get(level.id),WORLD_3);
}

for (const form of ['ERU','RUMI','HAVORI','TUMERA','HAVENU','MISERO','LIKADO','SEVAI','KOPERA']) {
  assert.ok(lexemes[form], `missing Grammar Dungeon lexeme ${form}`);
  assert.deepEqual(lexemes[form].authority,['HNK_AUTHORED_CANDIDATE','LOCKED_FOR_TESTING']);
}

const valid=[
  'AN NE ZAMI HNK.',
  'AN GAVURI HIZEP KAVESO.',
  'AN KORUME VEMI LOKANI DOMERA.',
  'AN MORAKU HIZEP KOPERA SAVETA.',
  'ERU NE RUMI DOMERA.',
  'NE HAVORI TUMERA RUMI HAVENU.',
  'KAVESO MISERO.'
];
for (const input of valid) {
  assert.equal(validateUtterance(input).status,'VALID',input);
}

const unmapped=[
  'AN ZAMI NE HNK.',
  'AN GAVURI KAVESO HIZEP.',
  'AN KORUME LOKANI DOMERA.',
  'AN MORAKU HIZEP SAVETA.',
  'ERU RUMI NE DOMERA.',
  'HAVORI NE TUMERA RUMI HAVENU.',
  'MISERO KAVESO.',
  'AN MORAKU KAVESO MISERO.',
  'VOMA LIKADO SEVAI HAVENU KE?'
];
for (const input of unmapped) {
  assert.equal(validateUtterance(input).status,'UNMAPPED_CONSTRUCTION',input);
}

const locNeg=getConstructionByPattern(tokenize('ERU NE RUMI DOMERA.'));
assert.ok(locNeg.guards.includes('NEGATED_LOCATION_PATCH_SCOPED'));

const existNeg=getConstructionByPattern(tokenize('NE HAVORI TUMERA RUMI HAVENU.'));
assert.ok(existNeg.guards.includes('NEGATED_EXISTENCE_PATCH_SCOPED'));

const descriptor=getConstructionByPattern(tokenize('KAVESO MISERO.'));
assert.ok(descriptor.guards.includes('ATTRIBUTIVE_NP_NOT_LICENSED'));

const water=getConstructionByPattern(tokenize('AN MORAKU HIZEP KOPERA SAVETA.'));
assert.ok(water.guards.includes('MASS_NOUN_NOT_DIRECTLY_COUNTED'));

const qTrap=WORLD_3.levels.find(l=>l.id==='L24_QUESTION_TRAP');
assert.equal(qTrap.choices.find(c=>c.correct).id,'no');

const adjectiveDoor=WORLD_3.levels.find(l=>l.id==='L23_ADJECTIVE_DOOR');
assert.equal(adjectiveDoor.choices.find(c=>c.correct).id,'c');

assert.equal(campaignLevels[15].id,'L16_MY_MOTHER_WORKS');
assert.equal(campaignLevels[16].id,'L17_NE_TRAP');
assert.equal(campaignLevels[23].id,'L24_QUESTION_TRAP');

console.log('PASS HNK-A1-GRAMMAR-DUNGEON-SPRINT3');
