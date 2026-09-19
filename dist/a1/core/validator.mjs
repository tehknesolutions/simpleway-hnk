import { getConstructionByPattern, getLexeme } from './registry.mjs';

export function normalizeInput(input='') {
  return String(input)
    .toUpperCase()
    .replace(/[?!.,;:]+/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

export function tokenize(input='') {
  const normalized = normalizeInput(input);
  return normalized ? normalized.split(' ') : [];
}

export function validateUtterance(input) {
  const tokens = tokenize(input);
  if (!tokens.length) return { status:'EMPTY', tokens, construction:null, unknown:[] };

  const unknown = tokens.filter(t => !getLexeme(t));
  if (unknown.length) return { status:'UNKNOWN_LEXEME', tokens, construction:null, unknown };

  const construction = getConstructionByPattern(tokens);
  if (!construction) {
    return {
      status:'UNMAPPED_CONSTRUCTION',
      tokens,
      construction:null,
      unknown:[],
      communicativeSuccess:false
    };
  }

  return {
    status:'VALID',
    tokens,
    construction,
    unknown:[],
    communicativeSuccess:true
  };
}

export function validateAgainstIntents(input, acceptedIntents=[]) {
  const result = validateUtterance(input);
  if (result.status !== 'VALID') return result;
  return {
    ...result,
    intentMatched: acceptedIntents.length === 0 || acceptedIntents.includes(result.construction.intent),
    status: acceptedIntents.length === 0 || acceptedIntents.includes(result.construction.intent)
      ? 'VALID'
      : 'VALID_WRONG_INTENT'
  };
}

export function validateDialogue(utterances, requiredIntents) {
  const results = utterances.map(u => validateUtterance(u));
  const intents = results.filter(r=>r.status==='VALID').map(r=>r.construction.intent);
  const missing = requiredIntents.filter(i=>!intents.includes(i));
  const orderValid = missing.length === 0
    && requiredIntents.every((intent,index)=>intents[index]===intent);
  return {
    status: missing.length
      ? 'COMMUNICATIVE_PARTIAL'
      : orderValid
        ? 'VALID'
        : 'INVALID_INTENT_ORDER',
    results,
    intents,
    missing,
    expectedOrder:[...requiredIntents],
    orderValid,
    communicativeSuccess: missing.length === 0 && orderValid
  };
}


export function evaluateMission(utterances=[], objectives=[]) {
  const results = utterances.map((utterance,index)=>({
    index,
    utterance,
    ...validateUtterance(utterance)
  }));

  const validIntents = results
    .filter(r=>r.status==='VALID')
    .map(r=>r.construction.intent);

  const required = objectives.filter(o=>o.required!==false);
  const optional = objectives.filter(o=>o.required===false);

  const achieved = required.filter(o=>validIntents.includes(o.intent)).map(o=>o.id);
  const missing = required.filter(o=>!validIntents.includes(o.intent)).map(o=>o.id);
  const optionalAchieved = optional.filter(o=>validIntents.includes(o.intent)).map(o=>o.id);

  const unmapped = results.filter(r=>r.status==='UNMAPPED_CONSTRUCTION');
  const unknown = results.filter(r=>r.status==='UNKNOWN_LEXEME');

  const requiredCount = required.length;
  const score = requiredCount === 0 ? 1 : achieved.length / requiredCount;

  let status='MISSION_INCOMPLETE';
  if (missing.length===0) status='MISSION_COMPLETE';
  else if (achieved.length>0) status='MISSION_PARTIAL';

  return {
    status,
    communicativeSuccess: missing.length===0,
    score,
    achieved,
    missing,
    optionalAchieved,
    validIntents,
    results,
    unmapped,
    unknown
  };
}
