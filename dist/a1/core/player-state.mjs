export const PLAYER_STATE_VERSION = 3;

export function createAnonymousId(prefix='PLAYER-QA') {
  const uuid=globalThis.crypto?.randomUUID?.();
  if(uuid) return `${prefix}-${uuid.slice(0,8).toUpperCase()}`;
  return `${prefix}-${Math.random().toString(36).slice(2,10).toUpperCase()}`;
}

export function createPlayerState({
  playerId=createAnonymousId('PLAYER-QA'),
  qaSessionId=createAnonymousId('SESSION')
}={}) {
  return {
    version: PLAYER_STATE_VERSION,
    playerId,
    qaSessionId,
    telemetry:[],
    qaSessionStatus:'NEW',
    qaSessionStartedAt:null,
    qaSessionStartedAppVersion:null,
    qaSessionCompletedAt:null,
    xp: 0,
    hearts: 5,
    currentLevelId: 'L01_FIRST_CONTACT',
    completedLevels: [],
    perfectLevels: [],
    unlocked: [],
    hintsUsed: {},
    codexUsed: {},
    attempts: {},
    achievements: []
  };
}

export function awardLevel(state, level, {perfect=false,hintsUsed=0,firstTry=false}={}) {
  const next = structuredClone(state);
  if (!next.completedLevels.includes(level.id)) {
    let gain = level.xp ?? 10;
    if (perfect) gain += 5;
    if (hintsUsed === 0) gain += 5;
    if (firstTry) gain += 5;
    next.xp += gain;
    next.completedLevels.push(level.id);
    for (const unlock of level.unlocks ?? []) {
      if (!next.unlocked.includes(unlock)) next.unlocked.push(unlock);
    }
  }
  return next;
}

export function recordAttempt(state, levelId, correct) {
  const next = structuredClone(state);
  next.attempts[levelId] ??= {count:0,correct:0};
  next.attempts[levelId].count += 1;
  if (correct) next.attempts[levelId].correct += 1;
  return next;
}

export function getHintCount(state, levelId) {
  return state.hintsUsed?.[levelId] ?? 0;
}

export function recordHint(state, levelId) {
  const next = structuredClone(state);
  next.hintsUsed ??= {};
  next.hintsUsed[levelId] = (next.hintsUsed[levelId] ?? 0) + 1;
  return next;
}

export function hasUsedCodex(state, levelId) {
  return Boolean(state.codexUsed?.[levelId]);
}

export function recordCodexUse(state, levelId) {
  const next = structuredClone(state);
  next.codexUsed ??= {};
  next.codexUsed[levelId] = true;
  return next;
}

export function getAssistanceCount(state, levelId) {
  return getHintCount(state, levelId) + (hasUsedCodex(state, levelId) ? 1 : 0);
}

export function penalizeHeart(state, amount=1) {
  const next = structuredClone(state);
  next.hearts = Math.max(0, next.hearts - amount);
  return next;
}

export function nextLevelId(world, currentId) {
  const idx = world.levels.findIndex(l=>l.id===currentId);
  return idx >= 0 && idx < world.levels.length - 1 ? world.levels[idx+1].id : currentId;
}


export function hydratePlayerState(raw={}) {
  const base=createPlayerState({
    playerId:raw.playerId || createAnonymousId('PLAYER-QA'),
    qaSessionId:raw.qaSessionId || createAnonymousId('SESSION')
  });
  return {
    ...base,
    ...raw,
    version:PLAYER_STATE_VERSION,
    playerId:raw.playerId || base.playerId,
    qaSessionId:raw.qaSessionId || base.qaSessionId,
    telemetry:Array.isArray(raw.telemetry)?raw.telemetry:[],
    completedLevels:Array.isArray(raw.completedLevels)?raw.completedLevels:[],
    perfectLevels:Array.isArray(raw.perfectLevels)?raw.perfectLevels:[],
    unlocked:Array.isArray(raw.unlocked)?raw.unlocked:[],
    achievements:Array.isArray(raw.achievements)?raw.achievements:[],
    hintsUsed:raw.hintsUsed && typeof raw.hintsUsed==='object'?raw.hintsUsed:{},
    codexUsed:raw.codexUsed && typeof raw.codexUsed==='object'?raw.codexUsed:{},
    attempts:raw.attempts && typeof raw.attempts==='object'?raw.attempts:{},
    qaSessionStatus:raw.qaSessionStatus || (raw.completedLevels?.length ? 'ACTIVE' : 'NEW'),
    qaSessionStartedAt:raw.qaSessionStartedAt ?? null,
    qaSessionStartedAppVersion:raw.qaSessionStartedAppVersion ?? null,
    qaSessionCompletedAt:raw.qaSessionCompletedAt ?? null
  };
}

export function beginQaSession(state, appVersion, timestamp=new Date().toISOString()) {
  const next=structuredClone(state);
  next.qaSessionStatus='ACTIVE';
  next.qaSessionStartedAt=next.qaSessionStartedAt || timestamp;
  next.qaSessionStartedAppVersion=next.qaSessionStartedAppVersion || appVersion || null;
  next.qaSessionCompletedAt=null;
  return next;
}

export function startNewQaSession(state, appVersion, timestamp=new Date().toISOString()) {
  const playerId=state?.playerId || createAnonymousId('PLAYER-QA');
  const next=createPlayerState({
    playerId,
    qaSessionId:createAnonymousId('SESSION')
  });
  next.qaSessionStatus='ACTIVE';
  next.qaSessionStartedAt=timestamp;
  next.qaSessionStartedAppVersion=appVersion || null;
  return next;
}

export function markQaSessionComplete(state, timestamp=new Date().toISOString()) {
  const next=structuredClone(state);
  next.qaSessionStatus='COMPLETE';
  next.qaSessionCompletedAt=timestamp;
  return next;
}
