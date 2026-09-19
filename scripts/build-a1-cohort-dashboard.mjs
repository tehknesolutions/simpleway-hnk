import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  analyzeSessions,
  normalizeSessions,
  CRITICAL_SKILLS,
  PROBLEM_CLASSES
} from './analyze-a1-qa.mjs';

export const COHORT_SLOTS=Array.from({length:7},(_,i)=>`P${String(i+1).padStart(2,'0')}`);
export const FINAL_CLASSIFICATIONS=['PASS',...PROBLEM_CLASSES];

function pct(n,d){return d?Number(((n/d)*100).toFixed(1)):0;}

export function assignCohortSlots(exportsList=[]){
  const report=analyzeSessions(exportsList,[]);
  const gateIds=new Set(report.gateSessionIds);
  const sessions=normalizeSessions(exportsList)
    .filter(s=>gateIds.has(s.sessionId))
    .sort((a,b)=>String(a.exportedAt??'').localeCompare(String(b.exportedAt??'')));

  return COHORT_SLOTS.map((slot,index)=>{
    const s=sessions[index];
    if(!s) return {slot,status:'OPEN',playerId:null,sessionId:null,exportedAt:null};
    return {
      slot,
      status:'CAPTURED',
      playerId:s.playerId,
      sessionId:s.sessionId,
      exportedAt:s.exportedAt??null
    };
  });
}

export function seedAnnotationRows(assignments=[]){
  const rows=[];
  for(const assignment of assignments){
    if(assignment.status!=='CAPTURED' || !assignment.playerId) continue;
    for(const skill of CRITICAL_SKILLS){
      rows.push({
        slot:assignment.slot,
        playerId:assignment.playerId,
        skill,
        classification:'PENDING',
        note:''
      });
    }
  }
  return rows;
}

export function buildCohortDashboard(exportsList=[],annotations=[],manifest={}){
  const report=analyzeSessions(exportsList,annotations);
  const assignments=assignCohortSlots(exportsList);
  const assignedPlayers=new Set(assignments.filter(x=>x.playerId).map(x=>x.playerId));
  const finalRows=annotations.filter(a=>
    assignedPlayers.has(a?.playerId) &&
    CRITICAL_SKILLS.includes(a?.skill) &&
    FINAL_CLASSIFICATIONS.includes(a?.classification)
  );
  const uniqueReviewedPairs=new Set(finalRows.map(a=>`${a.playerId}|${a.skill}`));

  const annotationCoverage={
    reviewedPairs:uniqueReviewedPairs.size,
    targetPairs:49,
    percentage:pct(uniqueReviewedPairs.size,49),
    complete:assignedPlayers.size>=7 && uniqueReviewedPairs.size>=49
  };

  return {
    schema:'HNK-A1-HUMAN-QA-COHORT-DASHBOARD-V1',
    generatedAt:new Date().toISOString(),
    manifestStatus:manifest?.status??'UNKNOWN',
    appVersion:report.appVersion,
    languageVersion:report.languageVersion,
    slots:assignments,
    capturedSlots:assignments.filter(x=>x.status==='CAPTURED').length,
    openSlots:assignments.filter(x=>x.status==='OPEN').length,
    uniqueEligiblePlayers:report.uniquePlayers,
    eligibleSessions:report.eligibleSessions,
    gateSessions:report.gateSessions,
    mixedRuntimeSessions:report.mixedRuntimeSessions,
    metrics:report.metrics,
    gates:report.gates,
    annotationCoverage,
    totals:report.totals,
    automatedGatePass:report.automatedGatePass,
    promotionGatePass:report.promotionGatePass,
    promotionReviewReady:
      assignments.every(x=>x.status==='CAPTURED') &&
      annotationCoverage.complete &&
      report.gates.criticalGrammar.ready
  };
}

export function renderDashboardMarkdown(d){
  const slotRows=d.slots.map(s=>`| ${s.slot} | ${s.status} | ${s.playerId??'—'} | ${s.sessionId??'—'} |`).join('\n');
  const grammar=d.gates?.criticalGrammar??{};
  return `# HNK A1 — P01–P07 Cohort Dashboard

Generated: ${d.generatedAt}

Runtime: **${d.appVersion}**  
Language: **${d.languageVersion}**  
Manifest: **${d.manifestStatus}**

## Capture

| Slot | Status | Anonymous player | Session |
|---|---|---|---|
${slotRows}

- Captured: **${d.capturedSlots}/7**
- Eligible unique players: **${d.uniqueEligiblePlayers}/7**
- Mixed-runtime sessions excluded: **${d.mixedRuntimeSessions.length}**

## Automated metrics

- Average unassisted completion: **${d.metrics.averageUnassistedCompletionRate}%** (target ≥80%)
- Final Boss defeat: **${d.metrics.finalBossDefeatRate}%** (target ≥70%)
- Automated gate: **${d.automatedGatePass?'PASS':'PENDING/FAIL'}**

## Human review

- Critical annotation coverage: **${d.annotationCoverage.reviewedPairs}/49** (${d.annotationCoverage.percentage}%)
- Critical grammar gate ready: **${grammar.ready?'YES':'NO'}**
- Critical grammar gate: **${grammar.pass?'PASS':'PENDING/FAIL'}**

## Decision boundary

- Promotion review ready: **${d.promotionReviewReady?'YES':'NO'}**
- RC2 promotion gate: **${d.promotionGatePass?'PASS':'NOT PASSED'}**

A dashboard value never promotes HNK content to CANON automatically. GRAMMAR_PROBLEM requires explicit human annotation.
`;
}

async function collectJson(path){
  if(!path) return [];
  const abs=resolve(path);
  let info;
  try{info=await stat(abs);}catch{return [];}
  if(info.isFile()){
    const parsed=JSON.parse(await readFile(abs,'utf8'));
    return Array.isArray(parsed)?parsed:(parsed.annotations??[parsed]);
  }
  const out=[];
  for(const name of await readdir(abs)){
    if(extname(name)!=='.json') continue;
    try{
      const parsed=JSON.parse(await readFile(resolve(abs,name),'utf8'));
      if(Array.isArray(parsed)) out.push(...parsed);
      else out.push(parsed);
    }catch{}
  }
  return out;
}

async function readManifest(path){
  try{return JSON.parse(await readFile(resolve(path),'utf8'));}catch{return {};}
}

function argValue(args,name){
  const hit=args.find(a=>a.startsWith(`--${name}=`));
  return hit?hit.slice(name.length+3):null;
}

async function main(){
  const args=process.argv.slice(2);
  const exportsPath=argValue(args,'exports');
  const annotationsPath=argValue(args,'annotations');
  const manifestPath=argValue(args,'manifest')??'experiments/a1-rc1-sprint1/HUMAN-QA-COHORT-V1.json';
  const outPath=argValue(args,'out');
  const seedPath=argValue(args,'seed-annotations');

  const exportsList=await collectJson(exportsPath);
  let annotations=[];
  if(annotationsPath){
    const raw=JSON.parse(await readFile(resolve(annotationsPath),'utf8'));
    annotations=Array.isArray(raw)?raw:(raw.annotations??[]);
  }
  const manifest=await readManifest(manifestPath);
  const dashboard=buildCohortDashboard(exportsList,annotations,manifest);
  const md=renderDashboardMarkdown(dashboard);

  if(seedPath){
    const seeded={
      schema:'HNK-A1-HUMAN-QA-ANNOTATIONS-P01-P07-V1',
      appVersion:dashboard.appVersion,
      languageVersion:dashboard.languageVersion,
      status:'LOCAL_REVIEW_DRAFT',
      annotations:seedAnnotationRows(dashboard.slots),
      allowedSkills:CRITICAL_SKILLS,
      draftClassification:'PENDING',
      allowedFinalClassifications:FINAL_CLASSIFICATIONS
    };
    await writeFile(resolve(seedPath),JSON.stringify(seeded,null,2)+'\n');
  }

  if(outPath) await writeFile(resolve(outPath),md);
  else process.stdout.write(md);
}

if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  await main();
}
