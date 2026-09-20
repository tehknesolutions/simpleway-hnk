import assert from 'node:assert/strict';
import { inspectP01Export } from '../scripts/validate-a1-p01-intake.mjs';

const APP='HNK-A1-APP-ALPHA-0.2.1';
const LANGUAGE='HNK-A1-RC1-CANDIDATE';

function exportFixture({
  playerId='PLAYER-QA-P01',
  sessionId='SESSION-P01',
  completed=5,
  mixed=false,
  includePartialExport=true,
  appVersion=APP,
  languageVersion=LANGUAGE,
  finalBoss=true
}={}){
  const completedLevels=Array.from({length:completed},(_,i)=>`L${String(i+1).padStart(2,'0')}_X`);
  if(completed===32 && finalBoss) completedLevels[31]='L32_A1_FINAL_BOSS';
  const runtime=mixed?'HNK-A1-APP-ALPHA-0.2.0':APP;
  const events=[
    {
      eventId:'EVT-1',
      sessionId,
      playerId,
      levelId:completedLevels.at(-1)??'L01_FIRST_CONTACT',
      type:'LEVEL_COMPLETE',
      runtimeAppVersion:runtime,
      result:'COMPLETE'
    }
  ];
  if(includePartialExport){
    events.push({
      eventId:'EVT-2',
      sessionId,
      playerId,
      levelId:completedLevels.at(-1)??'L01_FIRST_CONTACT',
      type:'SESSION_EXPORT_REQUESTED',
      runtimeAppVersion:runtime,
      result:'ACTIVE'
    });
  }
  return {
    appVersion,
    languageVersion,
    playerId,
    sessionId,
    exportedAt:'2026-09-20T01:00:00.000Z',
    runtimeIntegrity:{
      status:mixed?'MIXED_RUNTIME':'SINGLE_RUNTIME',
      eligible:!mixed,
      sessionStartedAppVersion:runtime,
      observedRuntimeAppVersions:[runtime],
      missingEventVersionCount:0
    },
    summary:{completedLevels,hintsUsed:{},codexUsed:{},attempts:{}},
    events
  };
}

let r=inspectP01Export(exportFixture());
assert.equal(r.status,'ELIGIBLE');
assert.equal(r.gateEligible,true);
assert.equal(r.partialSession,true);
assert.equal(r.partialExportEvent,true);
assert.equal(r.governance.grammarProblemInferred,false);
assert.equal(r.governance.canonPromotion,false);

r=inspectP01Export(exportFixture({completed:32,includePartialExport:false}));
assert.equal(r.status,'ELIGIBLE');
assert.equal(r.completedCount,32);
assert.equal(r.finalBossComplete,true);
assert.equal(r.partialSession,false);

r=inspectP01Export(exportFixture({mixed:true}));
assert.equal(r.status,'RESEARCH_ONLY');
assert.equal(r.gateEligible,false);
assert.ok(r.reasons.includes('MIXED_RUNTIME'));

r=inspectP01Export(exportFixture({includePartialExport:false}));
assert.equal(r.status,'RESEARCH_ONLY');
assert.ok(r.reasons.includes('PARTIAL_EXPORT_EVENT_MISSING'));

r=inspectP01Export(exportFixture({completed:32,includePartialExport:false,finalBoss:false}));
assert.equal(r.status,'RESEARCH_ONLY');
assert.ok(r.reasons.includes('LEVEL32_NOT_CONFIRMED'));

r=inspectP01Export(exportFixture({playerId:null}));
assert.equal(r.status,'REJECTED');
assert.ok(r.reasons.includes('MISSING_PLAYER_ID'));

r=inspectP01Export(exportFixture({appVersion:'HNK-A1-APP-ALPHA-0.2.0'}));
assert.equal(r.status,'REJECTED');
assert.ok(r.reasons.includes('APP_VERSION_MISMATCH'));

console.log('PASS HNK-A1-P01-ACTIVATION');
