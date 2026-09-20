import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  EXPECTED_APP,
  EXPECTED_LANGUAGE,
  TOTAL_LEVELS,
  FINAL_BOSS_LEVEL,
  inspectRuntimeIntegrity
} from './analyze-a1-qa.mjs';

export function inspectP01Export(session={}){
  const reasons=[];
  const completedLevels=Array.isArray(session?.summary?.completedLevels)
    ? session.summary.completedLevels
    : [];
  const completedCount=completedLevels.length;
  const events=Array.isArray(session?.events)?session.events:[];

  if(!session?.playerId) reasons.push('MISSING_PLAYER_ID');
  if(!session?.sessionId) reasons.push('MISSING_SESSION_ID');
  if(session?.appVersion!==EXPECTED_APP) reasons.push('APP_VERSION_MISMATCH');
  if(session?.languageVersion!==EXPECTED_LANGUAGE) reasons.push('LANGUAGE_VERSION_MISMATCH');
  if(completedCount<0 || completedCount>TOTAL_LEVELS) reasons.push('INVALID_COMPLETED_COUNT');

  const structuralReject=reasons.length>0;
  const runtime=inspectRuntimeIntegrity(session);
  const partial=completedCount<TOTAL_LEVELS;
  const finalBossComplete=completedLevels.includes(FINAL_BOSS_LEVEL);
  const partialExportEvent=events.some(e=>e?.type==='SESSION_EXPORT_REQUESTED');

  if(!structuralReject && !runtime.eligible) reasons.push('MIXED_RUNTIME');
  if(!structuralReject && completedCount===TOTAL_LEVELS && !finalBossComplete){
    reasons.push('LEVEL32_NOT_CONFIRMED');
  }
  if(!structuralReject && partial && !partialExportEvent){
    reasons.push('PARTIAL_EXPORT_EVENT_MISSING');
  }

  const rejected=reasons.some(r=>[
    'MISSING_PLAYER_ID',
    'MISSING_SESSION_ID',
    'APP_VERSION_MISMATCH',
    'LANGUAGE_VERSION_MISMATCH',
    'INVALID_COMPLETED_COUNT'
  ].includes(r));

  const researchOnly=!rejected && reasons.length>0;
  const status=rejected?'REJECTED':researchOnly?'RESEARCH_ONLY':'ELIGIBLE';

  return {
    schema:'HNK-A1-P01-INTAKE-V1',
    status,
    gateEligible:status==='ELIGIBLE',
    appVersion:session?.appVersion??null,
    languageVersion:session?.languageVersion??null,
    playerId:session?.playerId??null,
    sessionId:session?.sessionId??null,
    completedCount,
    finalBossComplete,
    partialSession:partial,
    partialExportEvent,
    runtimeIntegrity:runtime,
    reasons,
    governance:{
      humanGrammarClassificationRequired:true,
      grammarProblemInferred:false,
      canonPromotion:false
    }
  };
}

async function main(){
  const path=process.argv[2];
  if(!path){
    process.stderr.write('Usage: npm run qa:a1:p01-intake -- <qa-export.json>\n');
    process.exitCode=2;
    return;
  }
  const raw=JSON.parse(await readFile(resolve(path),'utf8'));
  const result=inspectP01Export(raw);
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
  if(result.status==='REJECTED') process.exitCode=2;
  else if(result.status==='RESEARCH_ONLY') process.exitCode=1;
}

if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  await main();
}
