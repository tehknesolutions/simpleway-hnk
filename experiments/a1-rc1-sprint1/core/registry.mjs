export const LANGUAGE_VERSION = 'HNK-A1-RC1-CANDIDATE';
export const RUNTIME_STATUS = 'EXPERIMENTAL_HUMAN_QA_ONLY';

const A = Object.freeze({
  RECOVERED: 'RECOVERED',
  VALIDATED: 'VALIDATED',
  CANDIDATE: 'CANDIDATE',
  AUTHORED: 'HNK_AUTHORED_CANDIDATE',
  LOCKED: 'LOCKED_FOR_TESTING',
  FROZEN: 'FROZEN',
  WATCH: 'WATCH',
  CANON: 'CANON'
});

export const authorities = A;

export const lexemes = Object.freeze({
  VODEMI: { id:'LEX_VODEMI', form:'VODEMI', function:'GREETING_FORMULA', authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  TUMAVI: { id:'LEX_TUMAVI', form:'TUMAVI', function:'THANKS_FORMULA', authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  PUMEK: { id:'LEX_PUMEK', form:'PUMEK', function:'YES_RESPONSE', authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  MUNASE: { id:'LEX_MUNASE', form:'MUNASE', function:'NO_RESPONSE', authority:[A.AUTHORED,A.LOCKED], a1Enabled:true, notes:['MUNASE is not NE.'] },
  AN: { id:'LEX_AN', form:'AN', function:'SPEAKER_SELF_SCOPED', authority:[A.RECOVERED,A.VALIDATED], a1Enabled:true },
  EN: { id:'LEX_EN', form:'EN', function:'ADDRESSEE_SCOPED', authority:[A.RECOVERED,A.VALIDATED], a1Enabled:true },
  ZAMI: { id:'LEX_ZAMI', form:'ZAMI', function:'LANGUAGE_USE_FRAME_HEAD', authority:[A.RECOVERED,A.VALIDATED], a1Enabled:true },
  HNK: { id:'CONTENT_HNK', form:'HNK', function:'LANGUAGE_CONTENT_HENUVOKODAN', authority:[A.VALIDATED], a1Enabled:true, notes:['HNK is the abbreviation of HENUVOKODAN.'] },
  VALI: { id:'LEX_VALI', form:'VALI', function:'ACTIVITY_LEXEME_SCOPED', authority:[A.FROZEN], a1Enabled:true },
  NE: { id:'LEX_NE', form:'NE', function:'NEGATION_SCOPED', authority:[A.RECOVERED,A.VALIDATED], a1Enabled:true, notes:['Not a universal negator outside licensed constructions.'] },
  PA: { id:'LEX_PA', form:'PA', function:'YESTERDAY_TEMPORAL_SCOPED', authority:[A.RECOVERED,A.VALIDATED], a1Enabled:true },
  KE: { id:'LEX_KE', form:'KE', function:'QUESTION_MARKER_SCOPED', authority:[A.CANDIDATE], a1Enabled:true, notes:['KE is not generalized as a universal interrogative marker.'] }
});

export const constructions = Object.freeze([
  {
    id:'A1_FORMULA_GREETING',
    pattern:['VODEMI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'GREETING',
    generalizes:false
  },
  {
    id:'A1_FORMULA_THANKS',
    pattern:['TUMAVI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'THANKS',
    generalizes:false
  },
  {
    id:'A1_RESPONSE_YES',
    pattern:['PUMEK'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'YES_RESPONSE',
    generalizes:false
  },
  {
    id:'A1_RESPONSE_NO',
    pattern:['MUNASE'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'NO_RESPONSE',
    generalizes:false
  },
  {
    id:'A1_ZAMI_SELF_HNK',
    pattern:['AN','ZAMI','HNK'],
    authority:[A.RECOVERED,A.VALIDATED],
    intent:'STATE_SPEAK_HNK',
    generalizes:false
  },
  {
    id:'A1_VALI_SELF',
    pattern:['AN','VALI'],
    authority:[A.CANDIDATE,A.LOCKED],
    intent:'STATE_WORK_SCOPED',
    generalizes:false
  },
  {
    id:'A1_NEG_VALI_SELF',
    pattern:['AN','NE','VALI'],
    authority:[A.CANDIDATE,A.LOCKED],
    intent:'STATE_NOT_WORK_SCOPED',
    generalizes:false
  },
  {
    id:'A1_NEG_ZAMI_HNK_SELF',
    pattern:['AN','NE','ZAMI','HNK'],
    authority:[A.CANDIDATE,A.LOCKED],
    intent:'STATE_NOT_SPEAK_HNK_SCOPED',
    generalizes:false
  },
  {
    id:'A1_PA_VALI_SELF',
    pattern:['PA','AN','VALI'],
    authority:[A.CANDIDATE,A.LOCKED],
    intent:'STATE_YESTERDAY_WORK_SCOPED',
    generalizes:false
  },
  {
    id:'A1_QUESTION_ZAMI_HNK',
    pattern:['EN','ZAMI','HNK','KE'],
    authority:[A.RECOVERED,A.VALIDATED],
    intent:'ASK_SPEAK_HNK',
    generalizes:false,
    guards:['KE_NOT_GENERALIZED','QUESTION_NOT_DERIVED_FROM_DECLARATIVE']
  }
]);

export function getLexeme(form) {
  return lexemes[form] ?? null;
}

export function getConstructionByPattern(tokens) {
  return constructions.find(c => c.pattern.length === tokens.length && c.pattern.every((t,i)=>t===tokens[i])) ?? null;
}
