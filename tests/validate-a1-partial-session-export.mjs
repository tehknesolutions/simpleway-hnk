import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createPlayerState, beginQaSession } from '../experiments/a1-rc1-sprint1/core/player-state.mjs';
import { createQaEvent, appendQaEvent, buildQaExport } from '../experiments/a1-rc1-sprint1/core/telemetry.mjs';

const APP='HNK-A1-APP-ALPHA-0.2.1';
const appSource=await readFile(new URL('../experiments/a1-rc1-sprint1/web/app.mjs',import.meta.url),'utf8');

assert.ok(appSource.includes('id="exportQaBtn"'));
assert.ok(appSource.includes('SESSION_EXPORT_REQUESTED'));
assert.ok(appSource.includes('downloadQaExport()'));
assert.ok(appSource.includes('Exportar sessão'));

let state=createPlayerState({playerId:'PLAYER-QA-PARTIAL',qaSessionId:'SESSION-PARTIAL'});
state=beginQaSession(state,APP,'2026-09-19T20:00:00.000Z');
state.completedLevels=['L01_FIRST_CONTACT','L02_THE_GIFT','L03_TWO_DOORS','L04_THE_SPEAKER','L05_THE_SHADOW'];

state=appendQaEvent(state,createQaEvent({
  eventId:'EVT-PARTIAL-1',
  sessionId:state.qaSessionId,
  playerId:state.playerId,
  levelId:'L05_THE_SHADOW',
  type:'SESSION_EXPORT_REQUESTED',
  timestamp:'2026-09-19T20:10:00.000Z',
  runtimeAppVersion:APP,
  result:'ACTIVE',
  inputTokens:[]
}));

const exported=buildQaExport(state,{appVersion:APP});
assert.equal(state.qaSessionStatus,'ACTIVE');
assert.equal(exported.appVersion,APP);
assert.equal(exported.summary.completedCount,5);
assert.equal(exported.summary.completedLevels.includes('L32_A1_FINAL_BOSS'),false);
assert.equal(exported.runtimeIntegrity.status,'SINGLE_RUNTIME');
assert.equal(exported.runtimeIntegrity.eligible,true);
assert.equal(exported.events.at(-1).type,'SESSION_EXPORT_REQUESTED');

console.log('PASS HNK-A1-PARTIAL-SESSION-EXPORT');
