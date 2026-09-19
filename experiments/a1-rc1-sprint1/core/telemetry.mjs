export const QA_SCHEMA_VERSION = 3;

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
  runtimeAppVersion=null,
  seed=null,
  inputTokens=[],
  result=null,
  achieved=[],
  missing=[],
  hintsUsed=0,
  codexUsed=false,
  hearts=null,
  acquisition=null
}) {
  return {
    schemaVersion:QA_SCHEMA_VERSION,
    eventId,
    sessionId,
    playerId,
    levelId,
    type,
    timestamp,
    runtimeAppVersion,
    seed,
    inputTokens:[...inputTokens],
    result,
    achieved:[...achieved],
    missing:[...missing],
    hintsUsed,
    codexUsed:Boolean(codexUsed),
    hearts,
    acquisition:acquisition ? structuredClone(acquisition) : null
  };
}

export function appendQaEvent(state,event) {
  const next=structuredClone(state);
  next.telemetry ??= [];
  next.telemetry.push(event);
  return next;
}

export function assessRuntimeIntegrity(state, appVersion) {
  const events=Array.isArray(state.telemetry)?state.telemetry:[];
  const eventVersions=[...new Set(events.map(e=>e?.runtimeAppVersion).filter(Boolean))];
  const missingEventVersionCount=events.filter(e=>!e?.runtimeAppVersion).length;
  const started=state.qaSessionStartedAppVersion ?? null;
  const versionSet=new Set([started,...eventVersions].filter(Boolean));
  const mixedRuntime=
    !started ||
    started!==appVersion ||
    missingEventVersionCount>0 ||
    eventVersions.some(v=>v!==appVersion) ||
    versionSet.size>1;
  return {
    status:mixedRuntime?'MIXED_RUNTIME':'SINGLE_RUNTIME',
    eligible:!mixedRuntime,
    sessionStartedAppVersion:started,
    observedRuntimeAppVersions:eventVersions,
    missingEventVersionCount
  };
}

export function buildQaExport(state,{
  appVersion='HNK-A1-APP-ALPHA-0.2.0',
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
    runtimeIntegrity:assessRuntimeIntegrity(state,appVersion),
    summary:{
      xp:state.xp,
      hearts:state.hearts,
      completedLevels:[...(state.completedLevels??[])],
      completedCount:(state.completedLevels??[]).length,
      hintsUsed:{...(state.hintsUsed??{})},
      codexUsed:{...(state.codexUsed??{})},
      attempts:structuredClone(state.attempts??{}),
      acquisition:structuredClone(state.acquisition??{})
    },
    events:structuredClone(state.telemetry??[])
  };
}
