export const QA_SCHEMA_VERSION = 1;

export function sanitizeQaTokens(tokens=[], isKnown=()=>false) {
  return tokens.filter(token=>isKnown(token));
}

export function createQaEvent({
  eventId,
  sessionId,
  playerId,
  levelId,
  type,
  timestamp,
  seed=null,
  inputTokens=[],
  result=null,
  achieved=[],
  missing=[],
  hintsUsed=0,
  codexUsed=false,
  hearts=null
}) {
  return {
    schemaVersion:QA_SCHEMA_VERSION,
    eventId,
    sessionId,
    playerId,
    levelId,
    type,
    timestamp,
    seed,
    inputTokens:[...inputTokens],
    result,
    achieved:[...achieved],
    missing:[...missing],
    hintsUsed,
    codexUsed:Boolean(codexUsed),
    hearts
  };
}

export function appendQaEvent(state,event) {
  const next=structuredClone(state);
  next.telemetry ??= [];
  next.telemetry.push(event);
  return next;
}

export function buildQaExport(state,{
  appVersion='HNK-A1-APP-ALPHA-0.1',
  languageVersion='HNK-A1-RC1-CANDIDATE',
  campaignVersion='HNK-A1-CAMPAIGN-V1',
  bossVersion='HNK-A1-FINAL-BOSS-V1'
}={}) {
  return {
    schemaVersion:QA_SCHEMA_VERSION,
    appVersion,
    languageVersion,
    campaignVersion,
    bossVersion,
    playerId:state.playerId,
    sessionId:state.qaSessionId,
    exportedAt:new Date().toISOString(),
    summary:{
      xp:state.xp,
      hearts:state.hearts,
      completedLevels:[...(state.completedLevels??[])],
      completedCount:(state.completedLevels??[]).length,
      hintsUsed:{...(state.hintsUsed??{})},
      codexUsed:{...(state.codexUsed??{})},
      attempts:structuredClone(state.attempts??{})
    },
    events:structuredClone(state.telemetry??[])
  };
}
