export const ACQUISITION_ENGINE_VERSION = 'HNK-A1-ACQUISITION-ENGINE-V1';

export function hashAcquisitionSeed(input='') {
  let hash=0x811c9dc5;
  for (const char of String(input)) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash,0x01000193);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  let value=seed>>>0;
  return () => {
    value += 0x6D2B79F5;
    let t=value;
    t=Math.imul(t ^ (t>>>15), t|1);
    t^=t + Math.imul(t ^ (t>>>7), t|61);
    return ((t ^ (t>>>14))>>>0)/4294967296;
  };
}

export function deterministicShuffle(items=[], seedText='') {
  const result=[...items];
  const rand=mulberry32(hashAcquisitionSeed(seedText));
  for(let i=result.length-1;i>0;i--){
    const j=Math.floor(rand()*(i+1));
    [result[i],result[j]]=[result[j],result[i]];
  }
  return result;
}

export function acquisitionStage(levelOrder=1) {
  if(levelOrder<=8) return 'GUIDED';
  if(levelOrder<=16) return 'SUPPORTED';
  if(levelOrder<=24) return 'FADED';
  return 'RECALL';
}

export function presentationPolicy(levelOrder=1) {
  const stage=acquisitionStage(levelOrder);
  const cueRatio={
    GUIDED:.67,
    SUPPORTED:.55,
    FADED:.45,
    RECALL:.34
  }[stage];
  return Object.freeze({
    stage,
    shuffleChoices:true,
    shuffleTokenTrays:true,
    recallBeforeHelp:true,
    codexCueRatio:cueRatio
  });
}

export function surfaceSeed(state={}, levelId='', surface='SURFACE') {
  return [
    ACQUISITION_ENGINE_VERSION,
    state.qaSessionId ?? 'SESSION',
    levelId,
    surface
  ].join('|');
}

export function shuffleSurface(items=[], state={}, levelId='', surface='SURFACE') {
  return deterministicShuffle(items,surfaceSeed(state,levelId,surface));
}

export function buildCodexCueTray(items=[], state={}, level={id:'LEVEL',order:1}) {
  const unique=[...new Set(items)];
  if(unique.length<=1) return unique;
  const policy=presentationPolicy(level.order);
  const shuffled=shuffleSurface(unique,state,level.id,'CODEX_CUES');
  const count=Math.max(1,Math.min(unique.length-1,Math.ceil(unique.length*policy.codexCueRatio)));
  return shuffled.slice(0,count);
}

export function getRecallAttemptCount(state={},levelId='') {
  return state.acquisition?.recallAttempts?.[levelId] ?? 0;
}

export function canUseHelp(state={},levelId='') {
  return getRecallAttemptCount(state,levelId)>0;
}

export function getDueReviewLevelIds(state={}, levels=[], currentOrder=1, limit=2) {
  const byId=new Map(levels.map(level=>[level.id,level]));
  const completed=Array.isArray(state.completedLevels)?state.completedLevels:[];
  const history=state.acquisition?.reviewHistory ?? {};
  const due=[];

  for(const levelId of completed){
    const level=byId.get(levelId);
    if(!level || level.order>=currentOrder) continue;
    const reviews=Array.isArray(history[levelId])?history[levelId]:[];
    const lastOrder=reviews.at(-1) ?? level.order;
    const interval=reviews.length===0 ? 3 : reviews.length===1 ? 4 : 8;
    if(currentOrder-lastOrder>=interval){
      due.push({
        levelId,
        overdueBy:(currentOrder-lastOrder)-interval,
        lastOrder,
        reviewCount:reviews.length
      });
    }
  }

  return due
    .sort((a,b)=>b.overdueBy-a.overdueBy || a.lastOrder-b.lastOrder)
    .slice(0,limit)
    .map(item=>item.levelId);
}

function intentsForLevel(level={}) {
  return [...new Set([
    level.targetIntent,
    ...(Array.isArray(level.requiredIntents)?level.requiredIntents:[]),
    ...(Array.isArray(level.objectives)?level.objectives.map(o=>o.intent):[])
  ].filter(Boolean))];
}

export function deriveWeakIntents(state={}, levels=[], limit=6) {
  const scored=new Map();
  for(const level of levels){
    const attempt=state.attempts?.[level.id];
    const count=attempt?.count ?? 0;
    const correct=attempt?.correct ?? 0;
    const failures=Math.max(0,count-correct);
    const hints=state.hintsUsed?.[level.id] ?? 0;
    const codex=state.codexUsed?.[level.id] ? 1 : 0;
    const score=failures + (hints*1.5) + codex;
    if(score<=0) continue;
    for(const intent of intentsForLevel(level)){
      scored.set(intent,(scored.get(intent)??0)+score);
    }
  }
  return [...scored.entries()]
    .sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0]))
    .slice(0,limit)
    .map(([intent])=>intent);
}

export function adaptiveBossProfile(state={}, levels=[]) {
  const weakIntents=deriveWeakIntents(state,levels,6);
  const attempted=Object.values(state.attempts??{});
  const total=attempted.reduce((sum,a)=>sum+(a?.count??0),0);
  const correct=attempted.reduce((sum,a)=>sum+(a?.correct??0),0);
  const accuracy=total ? correct/total : 1;
  const objectiveCount=accuracy<.55 ? 4 : accuracy<.8 ? 5 : 6;
  return Object.freeze({
    weakIntents:Object.freeze(weakIntents),
    objectiveCount,
    accuracy
  });
}
