import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  PLAYER_STATE_VERSION,
  createPlayerState,
  beginQaSession,
  startNewQaSession,
  markQaSessionComplete
} from '../experiments/a1-rc1-sprint1/core/player-state.mjs';
import { ACQUISITION_ENGINE_VERSION, canUseHelp } from '../experiments/a1-rc1-sprint1/core/acquisition.mjs';

const release=JSON.parse(await readFile(new URL('../experiments/a1-rc1-sprint1/release.json',import.meta.url),'utf8'));
const appSource=await readFile(new URL('../experiments/a1-rc1-sprint1/web/app.mjs',import.meta.url),'utf8');
assert.equal(release.appVersion,'HNK-A1-APP-ALPHA-0.2.0');
assert.equal(release.languageVersion,'HNK-A1-RC1-CANDIDATE');
assert.equal(release.playableLevels,32);
assert.equal(release.runtimeStatus,'EXPERIMENTAL_HUMAN_QA_ONLY');
assert.equal(release.acquisitionEngineVersion,ACQUISITION_ENGINE_VERSION);
assert.equal(release.acquisitionStatus,'FROZEN_HUMAN_QA_BASELINE');
assert.equal(release.humanQaCohort,'READY_FOR_P01-P07');
assert.equal(release.freezeGate,'PREVIEW_FREEZE_GATE_V1_PASS');
assert.equal(release.runtimeBaselineCommit,'7fa140e6aaaec0484e1be4911d6d606b46e8ff5f');
assert.ok(appSource.includes("const APP_VERSION='HNK-A1-APP-ALPHA-0.2.0'"));
assert.ok(appSource.includes('Uma fala por envio.'));
assert.ok(appSource.includes('MIXED_RUNTIME'));
assert.ok(appSource.includes('buildCodexCueTray'));
assert.ok(appSource.includes('SPACED_REVIEW_COMPLETE'));
assert.ok(appSource.includes('HELP_BLOCKED_RECALL_REQUIRED'));

let state=createPlayerState({playerId:'PLAYER-QA-TEST',qaSessionId:'SESSION-A'});
assert.equal(state.version,PLAYER_STATE_VERSION);
assert.equal(state.qaSessionStatus,'NEW');
assert.equal(state.currentLevelId,'L01_FIRST_CONTACT');
assert.equal(state.xp,0);
assert.equal(canUseHelp(state,'L01_FIRST_CONTACT'),false);

state=beginQaSession(state,'HNK-A1-APP-ALPHA-0.2.0','2026-09-19T12:00:00.000Z');
assert.equal(state.qaSessionStatus,'ACTIVE');
assert.equal(state.qaSessionStartedAt,'2026-09-19T12:00:00.000Z');
assert.equal(state.qaSessionStartedAppVersion,'HNK-A1-APP-ALPHA-0.2.0');

state.xp=123;
state.completedLevels=['L01_FIRST_CONTACT'];
state.telemetry=[{eventId:'OLD'}];
const next=startNewQaSession(state,'HNK-A1-APP-ALPHA-0.2.0','2026-09-19T12:30:00.000Z');
assert.equal(next.playerId,'PLAYER-QA-TEST');
assert.notEqual(next.qaSessionId,'SESSION-A');
assert.equal(next.qaSessionStatus,'ACTIVE');
assert.equal(next.qaSessionStartedAt,'2026-09-19T12:30:00.000Z');
assert.equal(next.qaSessionStartedAppVersion,'HNK-A1-APP-ALPHA-0.2.0');
assert.equal(next.xp,0);
assert.deepEqual(next.completedLevels,[]);
assert.deepEqual(next.telemetry,[]);
assert.equal(next.currentLevelId,'L01_FIRST_CONTACT');

const completed=markQaSessionComplete(next,'2026-09-19T13:00:00.000Z');
assert.equal(completed.qaSessionStatus,'COMPLETE');
assert.equal(completed.qaSessionCompletedAt,'2026-09-19T13:00:00.000Z');

console.log('PASS HNK-A1-ALPHA-RELEASE');
