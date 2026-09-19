import { readFile, readdir, stat } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const EXPECTED_APP='HNK-A1-APP-ALPHA-0.2.0';
export const EXPECTED_LANGUAGE='HNK-A1-RC1-CANDIDATE';
export const TOTAL_LEVELS=32;
export const FINAL_BOSS_LEVEL='L32_A1_FINAL_BOSS';
export const CRITICAL_SKILLS=[
  'PERSON','NE','VEMI','NUMBER_NOUN','RUMI','HAVORI','COMMUNICATION_REPAIR'
];
export const PROBLEM_CLASSES=[
  'LEARNING_PROBLEM','VOCABULARY_PROBLEM','GRAMMAR_PROBLEM',
  'UX_PROBLEM','CONTENT_PROBLEM','UNMAPPED_CONSTRUCTION'
];

function pct(n,d){return d?Number(((n/d)*100).toFixed(1)):0;}

export function normalizeSessions(exportsList=[]){
  const bySession=new Map();
  for(const item of exportsList){
    if(!item?.sessionId) continue;
    const previous=bySession.get(item.sessionId);
    if(!previous || String(item.exportedAt??'')>String(previous.exportedAt??'')){
      bySession.set(item.sessionId,item);
    }
  }
  return [...bySession.values()];
}

export function inspectRuntimeIntegrity(session){
  const events=Array.isArray(session?.events)?session.events:[];
  const eventVersions=[...new Set(events.map(e=>e?.runtimeAppVersion).filter(Boolean))];
  const missingEventVersionCount=events.filter(e=>!e?.runtimeAppVersion).length;
  const started=session?.runtimeIntegrity?.sessionStartedAppVersion ?? null;
  const declaredStatus=session?.runtimeIntegrity?.status ?? null;
  const singleRuntime=
    session?.appVersion===EXPECTED_APP &&
    session?.languageVersion===EXPECTED_LANGUAGE &&
    started===EXPECTED_APP &&
    eventVersions.length===1 &&
    eventVersions[0]===EXPECTED_APP &&
    missingEventVersionCount===0 &&
    declaredStatus==='SINGLE_RUNTIME';
  return {
    status:singleRuntime?'SINGLE_RUNTIME':'MIXED_RUNTIME',
    eligible:singleRuntime,
    sessionStartedAppVersion:started,
    observedRuntimeAppVersions:eventVersions,
    missingEventVersionCount
  };
}

export function analyzeSessions(exportsList=[],annotations=[]){
  const sessions=normalizeSessions(exportsList);
  const versionMismatches=sessions.filter(s=>
    s.appVersion!==EXPECTED_APP || s.languageVersion!==EXPECTED_LANGUAGE
  ).map(s=>s.sessionId);
  const runtimeIntegrityBySession=Object.fromEntries(
    sessions.map(s=>[s.sessionId,inspectRuntimeIntegrity(s)])
  );
  const mixedRuntimeSessions=sessions
    .filter(s=>runtimeIntegrityBySession[s.sessionId]?.status==='MIXED_RUNTIME')
    .map(s=>s.sessionId);
  const eligibleSessions=sessions.filter(s=>
    s.playerId && runtimeIntegrityBySession[s.sessionId]?.eligible
  );
  const players=new Set(eligibleSessions.map(s=>s.playerId));
  const firstSessionByPlayer=new Map();
  for(const s of [...eligibleSessions].sort((a,b)=>String(a.exportedAt??'').localeCompare(String(b.exportedAt??'')))){
    if(!firstSessionByPlayer.has(s.playerId)) firstSessionByPlayer.set(s.playerId,s);
  }
  const gateSessionIds=new Set([...firstSessionByPlayer.values()].map(s=>s.sessionId));

  const perSession=sessions.map(s=>{
    const completed=new Set(s.summary?.completedLevels??[]);
    const hints=s.summary?.hintsUsed??{};
    const codex=s.summary?.codexUsed??{};
    const assisted=[...completed].filter(id=>(hints[id]??0)>0 || Boolean(codex[id]));
    const unassistedCompleted=Math.max(0,completed.size-assisted.length);
    const events=Array.isArray(s.events)?s.events:[];
    return {
      sessionId:s.sessionId,
      playerId:s.playerId,
      completedCount:completed.size,
      unassistedCompleted,
      completionRate:pct(completed.size,TOTAL_LEVELS),
      unassistedCompletionRate:pct(unassistedCompleted,TOTAL_LEVELS),
      bossDefeated:completed.has(FINAL_BOSS_LEVEL),
      assistedLevels:assisted.length,
      unmappedEvents:events.filter(e=>e.result==='UNMAPPED_CONSTRUCTION').length,
      unknownLexemeEvents:events.filter(e=>e.result==='UNKNOWN_LEXEME').length,
      runtimeIntegrity:runtimeIntegrityBySession[s.sessionId]?.status??'MIXED_RUNTIME'
    };
  });

  const gateSessions=perSession.filter(s=>gateSessionIds.has(s.sessionId));
  const avgUnassisted=gateSessions.length
    ? Number((gateSessions.reduce((a,s)=>a+s.unassistedCompletionRate,0)/gateSessions.length).toFixed(1))
    : 0;
  const bosses=gateSessions.filter(s=>s.bossDefeated).length;
  const bossRate=pct(bosses,gateSessions.length);

  const reviewed=annotations.filter(a=>
    a?.playerId && a?.skill && (a.classification==='PASS'||PROBLEM_CLASSES.includes(a.classification))
  );
  const skillReview={};
  for(const skill of CRITICAL_SKILLS){
    const rows=reviewed.filter(a=>a.skill===skill);
    const reviewedPlayers=new Set(rows.map(r=>r.playerId));
    const grammarPlayers=new Set(rows.filter(r=>r.classification==='GRAMMAR_PROBLEM').map(r=>r.playerId));
    skillReview[skill]={
      reviewedPlayers:reviewedPlayers.size,
      grammarProblemPlayers:grammarPlayers.size,
      grammarProblemRate:pct(grammarPlayers.size,reviewedPlayers.size),
      coverageComplete:players.size>=7 && reviewedPlayers.size>=players.size
    };
  }
  const grammarGateReady=CRITICAL_SKILLS.every(skill=>skillReview[skill].coverageComplete);
  const grammarGatePass=grammarGateReady && CRITICAL_SKILLS.every(
    skill=>skillReview[skill].grammarProblemRate<30
  );

  const gates={
    minimumSevenPlayers:{pass:players.size>=7,value:players.size,target:'>=7 unique eligible players'},
    averageUnassistedCompletion:{pass:avgUnassisted>=80,value:avgUnassisted,target:'>=80%'},
    finalBossDefeat:{pass:bossRate>=70,value:bossRate,target:'>=70%'},
    criticalGrammar:{
      pass:grammarGatePass,
      ready:grammarGateReady,
      target:'<30% GRAMMAR_PROBLEM for every critical skill with complete review coverage'
    }
  };

  return {
    schema:'HNK-A1-HUMAN-QA-REPORT-V1',
    appVersion:EXPECTED_APP,
    languageVersion:EXPECTED_LANGUAGE,
    uniquePlayers:players.size,
    sessions:sessions.length,
    eligibleSessions:eligibleSessions.length,
    gateSessions:gateSessions.length,
    versionMismatches,
    mixedRuntimeSessions,
    runtimeIntegrityBySession,
    gateSessionIds:[...gateSessionIds],
    perSession,
    totals:{
      unmappedEvents:perSession.reduce((a,s)=>a+s.unmappedEvents,0),
      unknownLexemeEvents:perSession.reduce((a,s)=>a+s.unknownLexemeEvents,0)
    },
    metrics:{averageUnassistedCompletionRate:avgUnassisted,finalBossDefeatRate:bossRate},
    skillReview,
    gates,
    automatedGatePass:
      gates.minimumSevenPlayers.pass &&
      gates.averageUnassistedCompletion.pass &&
      gates.finalBossDefeat.pass,
    promotionGatePass:
      gates.minimumSevenPlayers.pass &&
      gates.averageUnassistedCompletion.pass &&
      gates.finalBossDefeat.pass &&
      gates.criticalGrammar.pass
  };
}

async function collectJson(path){
  const abs=resolve(path);
  const info=await stat(abs);
  if(info.isFile()) return [JSON.parse(await readFile(abs,'utf8'))];
  const names=await readdir(abs);
  const out=[];
  for(const name of names){
    if(extname(name)!=='.json') continue;
    try{out.push(JSON.parse(await readFile(resolve(abs,name),'utf8')));}catch{}
  }
  return out;
}

async function main(){
  const args=process.argv.slice(2);
  const input=args.find(a=>!a.startsWith('--'));
  if(!input){
    console.error('Usage: node scripts/analyze-a1-qa.mjs <export-file-or-directory> [--annotations=path.json]');
    process.exitCode=2; return;
  }
  const annArg=args.find(a=>a.startsWith('--annotations='));
  const exportsList=await collectJson(input);
  let annotations=[];
  if(annArg){
    const raw=JSON.parse(await readFile(resolve(annArg.slice('--annotations='.length)),'utf8'));
    annotations=Array.isArray(raw)?raw:(raw.annotations??[]);
  }
  console.log(JSON.stringify(analyzeSessions(exportsList,annotations),null,2));
}

if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  await main();
}
