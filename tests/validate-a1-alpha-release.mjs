import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  PLAYER_STATE_VERSION,
  createPlayerState,
  beginQaSession,
  startNewQaSession,
  markQaSessionComplete
} from '../experiments/a1-rc1-sprint1/core/player-state.mjs';

const release=JSON.parse(await readFile(new URL('../experiments/a1-rc1-sprint1/release.json',import.meta.url),'utf8'));
assert.equal(release.appVersion,'HNK-A1-APP-ALPHA-0.1.2');
assert.equal(release.languageVersion,'HNK-A1-RC1-CANDIDATE');
assert.equal(release.playableLevels,32);
assert.equal(release.runtimeStatus,'EXPERIMENTAL_HUMAN_QA_ONLY');

let state=createPlayerState({playerId:'PLAYER-QA-TEST',qaSessionId:'SESSION-A'});
assert.equal(state.version,PLAYER_STATE_VERSION);
assert.equal(state.qaSessionStatus,'NEW');
assert.equal(state.currentLevelId,'L01_FIRST_CONTACT');
assert.equal(state.xp,0);

state=beginQaSession(state,'2026-09-19T12:00:00.000Z');
assert.equal(state.qaSessionStatus,'ACTIVE');
assert.equal(state.qaSessionStartedAt,'2026-09-19T12:00:00.000Z');

state.xp=123;
state.completedLevels=['L01_FIRST_CONTACT'];
state.telemetry=[{eventId:'OLD'}];
const next=startNewQaSession(state,'2026-09-19T12:30:00.000Z');
assert.equal(next.playerId,'PLAYER-QA-TEST');
assert.notEqual(next.qaSessionId,'SESSION-A');
assert.equal(next.qaSessionStatus,'ACTIVE');
assert.equal(next.qaSessionStartedAt,'2026-09-19T12:30:00.000Z');
assert.equal(next.xp,0);
assert.deepEqual(next.completedLevels,[]);
assert.deepEqual(next.telemetry,[]);
assert.equal(next.currentLevelId,'L01_FIRST_CONTACT');

const completed=markQaSessionComplete(next,'2026-09-19T13:00:00.000Z');
assert.equal(completed.qaSessionStatus,'COMPLETE');
assert.equal(completed.qaSessionCompletedAt,'2026-09-19T13:00:00.000Z');

console.log('PASS HNK-A1-ALPHA-RELEASE');
