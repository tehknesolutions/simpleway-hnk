import assert from 'node:assert/strict';
import { lexemes, getConstructionByPattern } from '../experiments/a1-rc1-sprint1/core/registry.mjs';
import { validateUtterance, evaluateMission, tokenize } from '../experiments/a1-rc1-sprint1/core/validator.mjs';
import { WORLD_1, WORLD_2, WORLD_3, WORLD_4, WORLDS, campaignLevels, levelsById, worldByLevelId } from '../experiments/a1-rc1-sprint1/core/levels.mjs';
import { createPlayerState, recordAttempt, recordCodexUse, hasUsedCodex, getAssistanceCount, recordHint, penalizeHeart } from '../experiments/a1-rc1-sprint1/core/player-state.mjs';

assert.equal(WORLDS.length,5);
assert.deepEqual([WORLD_1.levels.length,WORLD_2.levels.length,WORLD_3.levels.length,WORLD_4.levels.length],[8,8,8,7]);
assert.equal(campaignLevels.length,32);
assert.deepEqual(WORLD_4.levels.map(l=>l.order),[25,26,27,28,29,30,31]);

for (const level of WORLD_4.levels) {
  assert.equal(level.mode,'open_world');
  assert.ok(Array.isArray(level.objectives) && level.objectives.length>=1);
  assert.ok(Array.isArray(level.tokenTray) && level.tokenTray.length>=4);
  assert.ok(Array.isArray(level.hints) && level.hints.length===3);
  assert.equal(levelsById.get(level.id),level);
  assert.equal(worldByLevelId.get(level.id),WORLD_4);
}

const openWorldGIds={
  DARUVI:['G19','G01','G15','G05','G31','G03'],
  KODERA:['G23','G04','G19','G02','G15','G01'],
  KURAVI:['G23','G05','G15','G01','G31','G03'],
  LURAVO:['G14','G05','G15','G01','G31','G04'],
  REVATI:['G15','G02','G31','G01','G22','G03'],
  KADURI:['G23','G01','G19','G05','G15','G03']
};
for (const [form,gIds] of Object.entries(openWorldGIds)) {
  assert.ok(lexemes[form], `missing Open World lexeme ${form}`);
  assert.deepEqual(lexemes[form].authority,['HNK_AUTHORED_CANDIDATE','LOCKED_FOR_TESTING']);
  assert.deepEqual(lexemes[form].gIds,gIds);
}
assert.deepEqual(lexemes.KUVAN.gIds,['G23','G05','G31','G01','G12']);
assert.deepEqual(lexemes.KUVAN.authority,['RECOVERED','VALIDATED']);

const exactValid=[
  'DARUVI KODERA?',
  'AN NE KURAVI.',
  'LURAVO.',
  'REVATI?',
  'AN MORAKU HIZEP KOPERA SAVETA.',
  'TAMURI AN KORUME VEMI LOKANI KODERA.',
  'AN LENU KAVESO RUMI KUVAN KE?',
  'NE HAVORI TUMERA RUMI HAVENU.',
  'SEVAI KAVESO.',
  'AN MORAKU HIZEP KAVESO.',
  'KADURI?'
];
for (const input of exactValid) assert.equal(validateUtterance(input).status,'VALID',input);

const repairLevel=WORLD_4.levels.find(l=>l.id==='L26_DONT_UNDERSTAND');
const repeatOnly=evaluateMission(['REVATI?'],repairLevel.objectives);
assert.equal(repeatOnly.status,'MISSION_PARTIAL');
assert.deepEqual(repeatOnly.achieved,['REPEAT']);
assert.deepEqual(repeatOnly.missing,['NONUNDERSTANDING']);

const repairComplete=evaluateMission(['AN NE KURAVI.','REVATI?'],repairLevel.objectives);
assert.equal(repairComplete.status,'MISSION_COMPLETE');
assert.equal(repairComplete.communicativeSuccess,true);
assert.deepEqual(repairComplete.optionalAchieved,[]);

const repairPolite=evaluateMission(['LURAVO.','REVATI?','AN NE KURAVI.'],repairLevel.objectives);
assert.equal(repairPolite.status,'MISSION_COMPLETE');
assert.deepEqual(repairPolite.optionalAchieved,['POLITENESS']);

const market=WORLD_4.levels.find(l=>l.id==='L31_MARKET_SURVIVAL');
const marketComplete=evaluateMission(
  ['KADURI?','AN MORAKU HIZEP KAVESO.','SEVAI KAVESO.'],
  market.objectives
);
assert.equal(marketComplete.status,'MISSION_COMPLETE');
assert.equal(marketComplete.score,1);
assert.deepEqual(new Set(marketComplete.achieved),new Set(['IDENTIFY_BOOK','WANT_TWO_BOOKS','ASK_PRICE']));

const marketPartial=evaluateMission(['SEVAI KAVESO.'],market.objectives);
assert.equal(marketPartial.status,'MISSION_PARTIAL');
assert.equal(marketPartial.score,1/3);

const unmapped=evaluateMission(['AN MORAKU HIZEP SAVETA.'],[
  {id:'WATER',intent:'STATE_WANT_TWO_BOTTLES_WATER'}
]);
assert.equal(unmapped.status,'MISSION_INCOMPLETE');
assert.equal(unmapped.unmapped.length,1);
assert.equal(unmapped.score,0);

const unknown=evaluateMission(['AN FOO.'],[
  {id:'ROUTE',intent:'REQUEST_ROUTE_STATION'}
]);
assert.equal(unknown.unknown.length,1);
assert.equal(unknown.communicativeSuccess,false);

const bookQuestion=getConstructionByPattern(tokenize('AN LENU KAVESO RUMI KUVAN KE?'));
assert.ok(bookQuestion.guards.includes('KE_NOT_GENERALIZED'));

const tomorrowTrip=getConstructionByPattern(tokenize('TAMURI AN KORUME VEMI LOKANI KODERA.'));
assert.ok(tomorrowTrip.guards.includes('TEMPORAL_ACTION_CHAIN_EXACT_FRAME'));

let state=createPlayerState();
assert.equal(getAssistanceCount(state,'L25_LOST'),0);
state=recordCodexUse(state,'L25_LOST');
assert.equal(hasUsedCodex(state,'L25_LOST'),true);
assert.equal(getAssistanceCount(state,'L25_LOST'),1);
state=recordHint(state,'L25_LOST');
assert.equal(getAssistanceCount(state,'L25_LOST'),2);

let attempts=createPlayerState();
attempts=recordAttempt(attempts,'L25_LOST',false);
assert.deepEqual(attempts.attempts.L25_LOST,{count:1,correct:0});
assert.equal(attempts.hearts,5);
attempts=penalizeHeart(attempts,.5);
assert.equal(attempts.hearts,4.5);

assert.equal(campaignLevels[23].id,'L24_QUESTION_TRAP');
assert.equal(campaignLevels[24].id,'L25_LOST');
assert.equal(campaignLevels[30].id,'L31_MARKET_SURVIVAL');

console.log('PASS HNK-A1-OPEN-WORLD-SPRINT4');

const level28=WORLD_4.levels.find(l=>l.id==='L28_TOMORROWS_TRIP');
assert.equal(level28.prompt.includes('Amanhã eu preciso'),true);
assert.equal(level28.prompt.includes('Amanhã você precisa'),false);
assert.equal(level28.tokenTray.includes('AN'),true);
assert.equal(level28.tokenTray.includes('PA'),false);
assert.equal(validateUtterance('TAMURI AN KORUME VEMI LOKANI KODERA.').status,'VALID');
