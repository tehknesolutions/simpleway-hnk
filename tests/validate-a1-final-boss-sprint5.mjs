import assert from 'node:assert/strict';
import { constructions, lexemes, getLexeme } from '../experiments/a1-rc1-sprint1/core/registry.mjs';
import { evaluateMission } from '../experiments/a1-rc1-sprint1/core/validator.mjs';
import { FINAL_STAGE, WORLDS, campaignLevels, levelsById, worldByLevelId } from '../experiments/a1-rc1-sprint1/core/levels.mjs';
import { BOSS_VERSION, BOSS_OBJECTIVE_POOL, makeBossSeed, generateBossScenario } from '../experiments/a1-rc1-sprint1/core/final-boss.mjs';
import { createPlayerState, hydratePlayerState, PLAYER_STATE_VERSION } from '../experiments/a1-rc1-sprint1/core/player-state.mjs';
import { QA_SCHEMA_VERSION, sanitizeQaTokens, createQaEvent, appendQaEvent, assessRuntimeIntegrity, buildQaExport } from '../experiments/a1-rc1-sprint1/core/telemetry.mjs';

assert.equal(WORLDS.length,5);
assert.equal(FINAL_STAGE.finalStage,true);
assert.equal(FINAL_STAGE.levels.length,1);
assert.equal(FINAL_STAGE.levels[0].id,'L32_A1_FINAL_BOSS');
assert.equal(FINAL_STAGE.levels[0].order,32);
assert.equal(FINAL_STAGE.levels[0].mode,'final_boss');
assert.equal(campaignLevels.length,32);
assert.equal(levelsById.get('L32_A1_FINAL_BOSS'),FINAL_STAGE.levels[0]);
assert.equal(worldByLevelId.get('L32_A1_FINAL_BOSS'),FINAL_STAGE);

const seed=makeBossSeed('PLAYER-QA-TEST','SESSION-TEST');
assert.equal(seed,`${BOSS_VERSION}|PLAYER-QA-TEST|SESSION-TEST`);
const scenarioA=generateBossScenario(seed);
const scenarioB=generateBossScenario(seed);
assert.deepEqual(scenarioA,scenarioB);
assert.ok(scenarioA.objectiveCount>=4 && scenarioA.objectiveCount<=6);
assert.equal(scenarioA.objectives.length,scenarioA.objectiveCount);
assert.equal(new Set(scenarioA.objectives.map(o=>o.id)).size,scenarioA.objectiveCount);
assert.equal(new Set(scenarioA.objectives.map(o=>o.intent)).size,scenarioA.objectiveCount);
assert.ok(scenarioA.seedHash.match(/^[0-9a-f]{8}$/));

const different=generateBossScenario(makeBossSeed('PLAYER-QA-OTHER','SESSION-TEST'));
assert.notEqual(different.seedHash,scenarioA.seedHash);

const registeredIntents=new Set(constructions.map(c=>c.intent));
for (const objective of BOSS_OBJECTIVE_POOL) {
  assert.ok(registeredIntents.has(objective.intent), `boss intent lacks construction: ${objective.intent}`);
  for(const token of objective.tokens) assert.ok(lexemes[token], `boss token missing from registry: ${token}`);
}

const answerByIntent={
  GREETING:'VODEMI.',
  REQUEST_ROUTE_STATION:'DARUVI KODERA?',
  SIGNAL_NONUNDERSTANDING:'AN NE KURAVI.',
  REQUEST_REPEAT:'REVATI?',
  STATE_WANT_TWO_BOTTLES_WATER:'AN MORAKU HIZEP KOPERA SAVETA.',
  STATE_TOMORROW_NEED_GO_STATION:'TAMURI AN KORUME VEMI LOKANI KODERA.',
  REQUEST_LOCATION_MY_BOOK:'AN LENU KAVESO RUMI KUVAN KE?',
  STATE_NO_BATHROOM_AT_HOTEL:'NE HAVORI TUMERA RUMI HAVENU.',
  IDENTIFY_THIS_BOOK:'SEVAI KAVESO.',
  STATE_WANT_TWO_BOOKS:'AN MORAKU HIZEP KAVESO.',
  REQUEST_PRICE:'KADURI?',
  THANKS:'TUMAVI.'
};

const bossUtterances=scenarioA.objectives.map(o=>answerByIntent[o.intent]);
assert.ok(bossUtterances.every(Boolean));
const complete=evaluateMission(bossUtterances,scenarioA.objectives);
assert.equal(complete.status,'MISSION_COMPLETE');
assert.equal(complete.communicativeSuccess,true);
assert.equal(complete.score,1);

const partial=evaluateMission(bossUtterances.slice(0,-1),scenarioA.objectives);
assert.notEqual(partial.status,'MISSION_COMPLETE');
assert.ok(partial.score<1);
assert.equal(partial.missing.length,1);

// Player-state migration must preserve old progress while adding anonymous QA fields.
const oldState={
  version:1,
  xp:250,
  hearts:4.5,
  currentLevelId:'L31_MARKET_SURVIVAL',
  completedLevels:['L01_FIRST_CONTACT','L31_MARKET_SURVIVAL'],
  perfectLevels:[],
  unlocked:['FINAL_BOSS_READY'],
  hintsUsed:{L31_MARKET_SURVIVAL:1},
  attempts:{L31_MARKET_SURVIVAL:{count:2,correct:1}},
  achievements:[]
};
const hydrated=hydratePlayerState(oldState);
assert.equal(hydrated.version,PLAYER_STATE_VERSION);
assert.equal(hydrated.xp,250);
assert.equal(hydrated.hearts,4.5);
assert.deepEqual(hydrated.completedLevels,oldState.completedLevels);
assert.ok(hydrated.playerId.startsWith('PLAYER-QA-'));
assert.ok(hydrated.qaSessionId.startsWith('SESSION-'));
assert.deepEqual(hydrated.telemetry,[]);

const fresh=createPlayerState({playerId:'PLAYER-QA-FIXED',qaSessionId:'SESSION-FIXED'});
assert.equal(fresh.playerId,'PLAYER-QA-FIXED');
assert.equal(fresh.qaSessionId,'SESSION-FIXED');
assert.deepEqual(fresh.telemetry,[]);

// QA privacy: unknown/free text is removed before event creation.
const sanitized=sanitizeQaTokens(['AN','PRIVATE_NAME','ZAMI','HNK'],token=>Boolean(getLexeme(token)));
assert.deepEqual(sanitized,['AN','ZAMI','HNK']);

const event=createQaEvent({
  eventId:'EVT-1',
  sessionId:'SESSION-FIXED',
  playerId:'PLAYER-QA-FIXED',
  levelId:'L32_A1_FINAL_BOSS',
  type:'MISSION_UTTERANCE',
  timestamp:'2026-09-19T12:00:00.000Z',
  runtimeAppVersion:'HNK-A1-APP-ALPHA-0.2.0',
  seed:scenarioA.seedHash,
  inputTokens:sanitized,
  result:'VALID',
  achieved:['A'],
  missing:['B'],
  hintsUsed:0,
  codexUsed:false,
  hearts:5
});
assert.equal(event.schemaVersion,QA_SCHEMA_VERSION);
assert.deepEqual(event.inputTokens,['AN','ZAMI','HNK']);
assert.equal(JSON.stringify(event).includes('PRIVATE_NAME'),false);

let qaState=createPlayerState({playerId:'PLAYER-QA-FIXED',qaSessionId:'SESSION-FIXED'});
qaState.qaSessionStartedAppVersion='HNK-A1-APP-ALPHA-0.2.0';
qaState=appendQaEvent(qaState,event);
assert.equal(qaState.telemetry.length,1);

const exported=buildQaExport(qaState,{
  appVersion:'HNK-A1-APP-ALPHA-0.2.0',
  languageVersion:'HNK-A1-RC1-CANDIDATE',
  campaignVersion:'HNK-A1-CAMPAIGN-V1',
  bossVersion:BOSS_VERSION
});
assert.equal(exported.schemaVersion,QA_SCHEMA_VERSION);
assert.equal(exported.appVersion,'HNK-A1-APP-ALPHA-0.2.0');
assert.equal(exported.languageVersion,'HNK-A1-RC1-CANDIDATE');
assert.equal(exported.bossVersion,BOSS_VERSION);
assert.equal(exported.playerId,'PLAYER-QA-FIXED');
assert.equal(exported.sessionId,'SESSION-FIXED');
assert.equal(exported.events.length,1);
assert.equal(exported.runtimeIntegrity.status,'SINGLE_RUNTIME');
assert.equal(exported.runtimeIntegrity.eligible,true);
assert.deepEqual(exported.runtimeIntegrity.observedRuntimeAppVersions,['HNK-A1-APP-ALPHA-0.2.0']);
assert.ok(Array.isArray(exported.summary.completedLevels));

const mixedState=structuredClone(qaState);
mixedState.telemetry.push({...event,eventId:'EVT-OLD',runtimeAppVersion:'HNK-A1-APP-ALPHA-0.1.2'});
const mixedIntegrity=assessRuntimeIntegrity(mixedState,'HNK-A1-APP-ALPHA-0.2.0');
assert.equal(mixedIntegrity.status,'MIXED_RUNTIME');
assert.equal(mixedIntegrity.eligible,false);

console.log('PASS HNK-A1-FINAL-BOSS-SPRINT5');
