import assert from 'node:assert/strict';
import { analyzeSessions, CRITICAL_SKILLS } from '../scripts/analyze-a1-qa.mjs';

function session(i,{completed=32,assisted=[],boss=true}={}){
  const levels=Array.from({length:completed},(_,n)=>
    n===31 && boss?'L32_A1_FINAL_BOSS':`L${String(n+1).padStart(2,'0')}_X`
  );
  if(boss && !levels.includes('L32_A1_FINAL_BOSS') && completed>0) levels[levels.length-1]='L32_A1_FINAL_BOSS';
  const hints=Object.fromEntries(assisted.map(id=>[id,1]));
  return {
    schemaVersion:1,
    appVersion:'HNK-A1-APP-ALPHA-0.1',
    languageVersion:'HNK-A1-RC1-CANDIDATE',
    playerId:`PLAYER-${i}`,
    sessionId:`SESSION-${i}`,
    exportedAt:`2026-09-19T1${i}:00:00.000Z`,
    summary:{completedLevels:levels,hintsUsed:hints,codexUsed:{},attempts:{}},
    events:[]
  };
}

const exportsList=Array.from({length:7},(_,i)=>session(i+1));
const annotations=[];
for(let i=1;i<=7;i++){
  for(const skill of CRITICAL_SKILLS){
    annotations.push({playerId:`PLAYER-${i}`,skill,classification:'PASS'});
  }
}
let report=analyzeSessions(exportsList,annotations);
assert.equal(report.uniquePlayers,7);
assert.equal(report.sessions,7);
assert.equal(report.metrics.finalBossDefeatRate,100);
assert.equal(report.metrics.averageUnassistedCompletionRate,100);
assert.equal(report.gates.criticalGrammar.ready,true);
assert.equal(report.promotionGatePass,true);

const duplicate={...exportsList[0],exportedAt:'2026-09-19T23:00:00.000Z'};
report=analyzeSessions([...exportsList,duplicate],annotations);
assert.equal(report.sessions,7);

// A second QA session from the same player is research data, not an eighth gate player.
const repeatSession={
  ...session(1,{completed:1,boss:false}),
  sessionId:'SESSION-1-REPEAT',
  exportedAt:'2026-09-20T10:00:00.000Z'
};
report=analyzeSessions([...exportsList,repeatSession],annotations);
assert.equal(report.uniquePlayers,7);
assert.equal(report.sessions,8);
assert.equal(report.gateSessions,7);
assert.equal(report.metrics.finalBossDefeatRate,100);

// Wrong-version exports are visible as mismatches but excluded from the eligible gate cohort.
const stale={
  ...session(99),
  appVersion:'HNK-A1-APP-ALPHA-OLD',
  sessionId:'SESSION-OLD',
  playerId:'PLAYER-OLD'
};
report=analyzeSessions([...exportsList,stale],annotations);
assert.equal(report.uniquePlayers,7);
assert.equal(report.eligibleSessions,7);
assert.deepEqual(report.versionMismatches,['SESSION-OLD']);

const assisted=Array.from({length:7},(_,i)=>session(i+1,{assisted:['L01_X','L02_X','L03_X','L04_X','L05_X','L06_X','L07_X']}));
report=analyzeSessions(assisted,annotations);
assert.ok(report.metrics.averageUnassistedCompletionRate<80);
assert.equal(report.promotionGatePass,false);

const grammar=[...annotations];
grammar[0]={...grammar[0],classification:'GRAMMAR_PROBLEM'};
grammar[7]={...grammar[7],classification:'GRAMMAR_PROBLEM'};
grammar[14]={...grammar[14],classification:'GRAMMAR_PROBLEM'};
report=analyzeSessions(exportsList,grammar);
assert.equal(report.skillReview.PERSON.grammarProblemRate,42.9);
assert.equal(report.gates.criticalGrammar.pass,false);
assert.equal(report.promotionGatePass,false);

report=analyzeSessions(exportsList,[]);
assert.equal(report.gates.criticalGrammar.ready,false);
assert.equal(report.gates.criticalGrammar.pass,false);

console.log('PASS HNK-A1-HUMAN-QA-ANALYSIS');
