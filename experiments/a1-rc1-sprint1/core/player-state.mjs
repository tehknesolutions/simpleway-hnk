export const PLAYER_STATE_VERSION = 1;

export function createPlayerState() {
  return {
    version: PLAYER_STATE_VERSION,
    xp: 0,
    hearts: 5,
    currentLevelId: 'L01_FIRST_CONTACT',
    completedLevels: [],
    perfectLevels: [],
    unlocked: [],
    hintsUsed: {},
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
  return state.hintsUsed[levelId] ?? 0;
}

export function recordHint(state, levelId) {
  const next = structuredClone(state);
  next.hintsUsed[levelId] = (next.hintsUsed[levelId] ?? 0) + 1;
  return next;
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
