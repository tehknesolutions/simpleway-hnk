import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  COHORT_SLOTS,
  assignCohortSlots,
  seedAnnotationRows,
  buildCohortDashboard
} from '../scripts/build-a1-cohort-dashboard.mjs';
import { CRITICAL_SKILLS } from '../scripts/analyze-a1-qa.mjs';

const manifest=JSON.parse(await readFile(new URL('../experiments/a1-rc1-sprint1/HUMAN-QA-COHORT-V1.json',import.meta.url),'utf8'));
const template=JSON.parse(await readFile(new URL('../experiments/a1-rc1-sprint1/HUMAN-QA-ANNOTATIONS.P01-P07.template.json',import.meta.url),'utf8'));
const protocol=await readFile(new URL('../experiments/a1-rc1-sprint1/HUMAN-QA-COHORT-V1.md',import.meta.url),'utf8');

assert.equal(manifest.schema,'HNK-A1-HUMAN-QA-COHORT-V1');
assert.equal(manifest.status,'OPEN_FOR_P01-P07');
assert.equal(manifest.appVersion,'HNK-A1-APP-ALPHA-0.2.1');
assert.equal(manifest.languageVersion,'HNK-A1-RC1-CANDIDATE');
assert.equal(manifest.runtimeBaselineCommit,'a0b0e5382a92b817b9afe1250dfa87bbadd2dac6');
assert.equal(manifest.finalArtifactCommit,'b81004d7716927afe11b100e33cd5ecb703a579f');
assert.equal(manifest.finalDeploymentId,'8639272c-cdaf-46ce-b843-5cb7676f8cae');
assert.equal(manifest.healthcheck,'PASS');
assert.equal(manifest.participantEvidence.captured,0);
assert.equal(manifest.participantEvidence.target,7);
assert.equal(manifest.runtimeBlobParity.differences,0);
assert.equal(manifest.slots.length,7);
assert.deepEqual(manifest.slots.map(s=>s.slot),COHORT_SLOTS);
assert.ok(manifest.slots.every(s=>s.status==='READY_TO_ASSIGN' && s.playerId===null && s.sessionId===null));
assert.ok(manifest.slots.every(s=>Object.keys(s).sort().join(',')==='playerId,sessionId,slot,status'));

assert.equal(template.annotations.length,49);
assert.ok(template.annotations.every(a=>a.classification==='PENDING' && a.playerId===null));
for(const slot of COHORT_SLOTS){
  const rows=template.annotations.filter(a=>a.slot===slot);
  assert.equal(rows.length,7);
  assert.deepEqual(rows.map(a=>a.skill),CRITICAL_SKILLS);
}

assert.ok(protocol.includes('Exportar sessão before closing the page'));
assert.ok(protocol.includes('do **not** teach, translate, paraphrase or coach HNK'));
assert.ok(protocol.includes('Actual QA exports and completed annotation files remain local'));

function session(i,{completed=32,boss=true,exportedAt=null}={}){
  const completedLevels=Array.from({length:completed},(_,n)=>`L${String(n+1).padStart(2,'0')}_X`);
  if(boss && completed>0) completedLevels[completedLevels.length-1]='L32_A1_FINAL_BOSS';
  return {
    schemaVersion:1,
    appVersion:'HNK-A1-APP-ALPHA-0.2.1',
    languageVersion:'HNK-A1-RC1-CANDIDATE',
    playerId:`PLAYER-QA-${i}`,
    sessionId:`SESSION-${i}`,
    exportedAt:exportedAt??`2026-09-20T0${i}:00:00.000Z`,
    runtimeIntegrity:{
      status:'SINGLE_RUNTIME',
      eligible:true,
      sessionStartedAppVersion:'HNK-A1-APP-ALPHA-0.2.1',
      observedRuntimeAppVersions:['HNK-A1-APP-ALPHA-0.2.1'],
      missingEventVersionCount:0
    },
    summary:{completedLevels,hintsUsed:{},codexUsed:{},attempts:{}},
    events:[{runtimeAppVersion:'HNK-A1-APP-ALPHA-0.2.1',result:'COMPLETE'}]
  };
}

const completeSeven=Array.from({length:7},(_,i)=>session(i+1));
const assignments=assignCohortSlots(completeSeven);
assert.equal(assignments.length,7);
assert.ok(assignments.every(x=>x.status==='CAPTURED'));
assert.deepEqual(assignments.map(x=>x.slot),COHORT_SLOTS);
assert.equal(assignments[0].playerId,'PLAYER-QA-1');

const seeded=seedAnnotationRows(assignments);
assert.equal(seeded.length,49);
assert.ok(seeded.every(r=>r.classification==='PENDING'));
assert.equal(new Set(seeded.map(r=>`${r.playerId}|${r.skill}`)).size,49);

let dashboard=buildCohortDashboard([],[],manifest);
assert.equal(dashboard.capturedSlots,0);
assert.equal(dashboard.openSlots,7);
assert.equal(dashboard.annotationCoverage.reviewedPairs,0);
assert.equal(dashboard.promotionReviewReady,false);
assert.equal(dashboard.promotionGatePass,false);

dashboard=buildCohortDashboard(completeSeven,[],manifest);
assert.equal(dashboard.capturedSlots,7);
assert.equal(dashboard.uniqueEligiblePlayers,7);
assert.equal(dashboard.metrics.averageUnassistedCompletionRate,100);
assert.equal(dashboard.metrics.finalBossDefeatRate,100);
assert.equal(dashboard.annotationCoverage.reviewedPairs,0);
assert.equal(dashboard.promotionReviewReady,false);

const annotations=seeded.map(r=>({...r,classification:'PASS'}));
dashboard=buildCohortDashboard(completeSeven,annotations,manifest);
assert.equal(dashboard.annotationCoverage.reviewedPairs,49);
assert.equal(dashboard.annotationCoverage.complete,true);
assert.equal(dashboard.gates.criticalGrammar.ready,true);
assert.equal(dashboard.promotionReviewReady,true);
assert.equal(dashboard.promotionGatePass,true);

// Early-stop evidence must remain visible and count in the denominator.
const early=session(1,{completed:5,boss:false,exportedAt:'2026-09-20T00:30:00.000Z'});
const withEarly=[early,...completeSeven.slice(1)];
dashboard=buildCohortDashboard(withEarly,[],manifest);
assert.equal(dashboard.capturedSlots,7);
assert.equal(dashboard.slots[0].playerId,'PLAYER-QA-1');
assert.equal(dashboard.metrics.finalBossDefeatRate,85.7);
assert.ok(dashboard.metrics.averageUnassistedCompletionRate<100);

console.log('PASS HNK-A1-P01-P07-COHORT-LAUNCH');
