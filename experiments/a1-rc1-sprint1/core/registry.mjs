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
  HNK: { id:'CONTENT_HNK', form:'HNK', function:'LANGUAGE_CONTENT_HNK', authority:[A.VALIDATED], a1Enabled:true, notes:['HNK is HNK. HENUVOKODAN is a distinct term; no synonymy, expansion or equivalence is licensed here.'] },
  VALI: { id:'LEX_VALI', form:'VALI', function:'ACTIVITY_LEXEME_SCOPED', authority:[A.FROZEN], a1Enabled:true },
  NE: { id:'LEX_NE', form:'NE', function:'NEGATION_SCOPED', authority:[A.RECOVERED,A.VALIDATED], a1Enabled:true, notes:['Not a universal negator outside licensed constructions.'] },
  PA: { id:'LEX_PA', form:'PA', function:'YESTERDAY_TEMPORAL_SCOPED', authority:[A.RECOVERED,A.VALIDATED], a1Enabled:true },
  KE: { id:'LEX_KE', form:'KE', function:'QUESTION_MARKER_SCOPED', authority:[A.CANDIDATE], a1Enabled:true, notes:['KE is not generalized as a universal interrogative marker.'] },
  GAVURI: { id:'LEX_GAVURI', form:'GAVURI', function:'POSSESSION_PREDICATE_SCOPED', gIds:['G20','G01','G31','G05','G15','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  KAVESO: { id:'LEX_KAVESO', form:'KAVESO', function:'BOOK_OBJECT', gIds:['G23','G01','G31','G02','G26','G04'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  HIZEP: { id:'LEX_HIZEP', form:'HIZEP', function:'CARDINAL_TWO', gIds:['G07','G03','G32','G02','G21'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  MORAKU: { id:'LEX_MORAKU', form:'MORAKU', function:'WANT_PREDICATE_SCOPED', gIds:['G11','G04','G15','G01','G23','G05'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  SAVETA: { id:'LEX_SAVETA', form:'SAVETA', function:'WATER_MASS_CONTENT', gIds:['G26','G01','G31','G02','G22','G01'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  KORUME: { id:'LEX_KORUME', form:'KORUME', function:'NEED_PREDICATE_SCOPED', gIds:['G23','G04','G15','G05','G11','G02'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  VEMI: { id:'LEX_VEMI', form:'VEMI', function:'ACTION_COMPLEMENT_LINKER_SCOPED', gIds:['G31','G02','G11','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  LOKANI: { id:'LEX_LOKANI', form:'LOKANI', function:'GO_PREDICATE_SCOPED', gIds:['G14','G04','G23','G01','G12','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  DOMERA: { id:'LEX_DOMERA', form:'DOMERA', function:'HOME_PLACE', gIds:['G19','G04','G11','G02','G15','G01'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  TAMURI: { id:'LEX_TAMURI', form:'TAMURI', function:'TOMORROW_TEMPORAL_SCOPED', gIds:['G22','G01','G11','G05','G15','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  NEMA: { id:'LEX_NEMA', form:'NEMA', function:'FIRST_PERSON_PLURAL_CANDIDATE', gIds:['G12','G02','G11','G01'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  VOMA: { id:'LEX_VOMA', form:'VOMA', function:'THIRD_PERSON_PLURAL_CANDIDATE', gIds:['G31','G04','G11','G01'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  PELUKI: { id:'LEX_PELUKI', form:'PELUKI', function:'STUDY_PREDICATE_SCOPED', gIds:['G21','G02','G14','G05','G23','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  LENU: { id:'LEX_LENU', form:'LENU', function:'POSSESSIVE_LINKER_SCOPED', gIds:['G14','G02','G12','G05'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  MAVERA: { id:'LEX_MAVERA', form:'MAVERA', function:'MOTHER_KINSHIP', gIds:['G11','G01','G31','G02','G15','G01'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  ERU: { id:'LEX_ERU', form:'ERU', function:'THIRD_PERSON_SINGULAR_CONTEXTUAL', gIds:['G02','G15','G05'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  RUMI: { id:'LEX_RUMI', form:'RUMI', function:'GENERAL_LOCATIVE_RELATION_SCOPED', gIds:['G15','G05','G11','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  HAVORI: { id:'LEX_HAVORI', form:'HAVORI', function:'EXISTENCE_FRAME_HEAD', gIds:['G07','G01','G31','G04','G15','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  TUMERA: { id:'LEX_TUMERA', form:'TUMERA', function:'BATHROOM_PLACE', gIds:['G22','G05','G11','G02','G15','G01'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  HAVENU: { id:'LEX_HAVENU', form:'HAVENU', function:'HOTEL_PLACE', gIds:['G07','G01','G31','G02','G12','G05'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  MISERO: { id:'LEX_MISERO', form:'MISERO', function:'SMALL_DESCRIPTOR', gIds:['G11','G03','G26','G02','G15','G04'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  LIKADO: { id:'LEX_LIKADO', form:'LIKADO', function:'LIKE_PREDICATE_SCOPED', gIds:['G14','G03','G23','G01','G19','G04'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  SEVAI: { id:'LEX_SEVAI', form:'SEVAI', function:'PROXIMAL_DEICTIC_FRAME', gIds:['G26','G02','G31','G01','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  KOPERA: { id:'LEX_KOPERA', form:'KOPERA', function:'CONTAINER_BOTTLE_SCOPED', gIds:['G23','G04','G21','G02','G15','G01'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  DARUVI: { id:'LEX_DARUVI', form:'DARUVI', function:'REQUEST_ROUTE_FORMULA_SCOPED', gIds:['G19','G01','G15','G05','G31','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  KODERA: { id:'LEX_KODERA', form:'KODERA', function:'STATION_PLACE', gIds:['G23','G04','G19','G02','G15','G01'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  KURAVI: { id:'LEX_KURAVI', form:'KURAVI', function:'UNDERSTAND_PREDICATE_SCOPED', gIds:['G23','G05','G15','G01','G31','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  LURAVO: { id:'LEX_LURAVO', form:'LURAVO', function:'POLITENESS_FORMULA', gIds:['G14','G05','G15','G01','G31','G04'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  REVATI: { id:'LEX_REVATI', form:'REVATI', function:'REQUEST_REPEAT_FORMULA', gIds:['G15','G02','G31','G01','G22','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true },
  KUVAN: { id:'LEX_KUVAN', form:'KUVAN', function:'WHERE_SCOPED', gIds:['G23','G05','G31','G01','G12'], authority:[A.RECOVERED,A.VALIDATED], a1Enabled:true },
  KADURI: { id:'LEX_KADURI', form:'KADURI', function:'REQUEST_PRICE_FORMULA', gIds:['G23','G01','G19','G05','G15','G03'], authority:[A.AUTHORED,A.LOCKED], a1Enabled:true }
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
  },
  {
    id:'A1_HAVE_BOOK',
    pattern:['AN','GAVURI','KAVESO'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_HAVE_BOOK',
    generalizes:false
  },
  {
    id:'A1_HAVE_TWO_BOOKS',
    pattern:['AN','GAVURI','HIZEP','KAVESO'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_HAVE_TWO_BOOKS',
    generalizes:false,
    guards:['COUNTABLE_OBJECT_FRAME_ONLY']
  },
  {
    id:'A1_WANT_WATER',
    pattern:['AN','MORAKU','SAVETA'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_WANT_WATER',
    generalizes:false
  },
  {
    id:'A1_NOT_WANT_WATER',
    pattern:['AN','NE','MORAKU','SAVETA'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_NOT_WANT_WATER',
    generalizes:false,
    guards:['NE_SCOPED_TO_LICENSED_FRAME']
  },
  {
    id:'A1_NEED_GO_HOME',
    pattern:['AN','KORUME','VEMI','LOKANI','DOMERA'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_NEED_GO_HOME',
    generalizes:false,
    guards:['VEMI_CONTROLLED_ACTION_COMPLEMENT']
  },
  {
    id:'A1_TOMORROW_WE_WORK',
    pattern:['TAMURI','NEMA','VALI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_TOMORROW_WE_WORK',
    generalizes:false,
    guards:['TEMPORAL_PERSON_PREDICATE_SCOPED']
  },
  {
    id:'A1_WE_WORK',
    pattern:['NEMA','VALI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_WE_WORK',
    generalizes:false,
    guards:['PERSON_PREDICATE_EXACT_FRAME_ONLY']
  },
  {
    id:'A1_THEY_WORK',
    pattern:['VOMA','VALI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_THEY_WORK',
    generalizes:false,
    guards:['PERSON_PREDICATE_EXACT_FRAME_ONLY']
  },
  {
    id:'A1_THEY_NOT_WORK',
    pattern:['VOMA','NE','VALI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_THEY_NOT_WORK',
    generalizes:false,
    guards:['PERSON_NEGATION_PREDICATE_EXACT_FRAME_ONLY']
  },
  {
    id:'A1_THEY_STUDY',
    pattern:['VOMA','PELUKI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_THEY_STUDY',
    generalizes:false
  },
  {
    id:'A1_MY_MOTHER_WORKS',
    pattern:['AN','LENU','MAVERA','VALI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_MY_MOTHER_WORKS',
    generalizes:false,
    guards:['COMPLEX_POSSESSIVE_NP_SUBJECT_SCOPED']
  },
  {
    id:'A1_NEGATED_LOCATION_THIRD_PERSON_HOME',
    pattern:['ERU','NE','RUMI','DOMERA'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_THIRD_PERSON_NOT_AT_HOME',
    generalizes:false,
    guards:['NEGATED_LOCATION_PATCH_SCOPED']
  },
  {
    id:'A1_NEGATED_EXISTENCE_BATHROOM_HOTEL',
    pattern:['NE','HAVORI','TUMERA','RUMI','HAVENU'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_NO_BATHROOM_AT_HOTEL',
    generalizes:false,
    guards:['NEGATED_EXISTENCE_PATCH_SCOPED']
  },
  {
    id:'A1_BOOK_SMALL_DESCRIPTION',
    pattern:['KAVESO','MISERO'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'DESCRIBE_BOOK_SMALL',
    generalizes:false,
    guards:['PREDICATIVE_DESCRIPTION_ONLY','ATTRIBUTIVE_NP_NOT_LICENSED']
  },
  {
    id:'A1_WANT_TWO_BOTTLES_WATER',
    pattern:['AN','MORAKU','HIZEP','KOPERA','SAVETA'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_WANT_TWO_BOTTLES_WATER',
    generalizes:false,
    guards:['CONTAINER_MASS_CONTENT_SCOPED','MASS_NOUN_NOT_DIRECTLY_COUNTED']
  },
  {
    id:'A1_ROUTE_TO_STATION',
    pattern:['DARUVI','KODERA'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'REQUEST_ROUTE_STATION',
    generalizes:false,
    guards:['DARUVI_PLACE_FORMULA_SCOPED']
  },
  {
    id:'A1_NOT_UNDERSTAND_SELF',
    pattern:['AN','NE','KURAVI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'SIGNAL_NONUNDERSTANDING',
    generalizes:false
  },
  {
    id:'A1_POLITENESS_FORMULA',
    pattern:['LURAVO'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'POLITENESS',
    generalizes:false
  },
  {
    id:'A1_REQUEST_REPEAT',
    pattern:['REVATI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'REQUEST_REPEAT',
    generalizes:false
  },
  {
    id:'A1_TOMORROW_NEED_GO_STATION',
    pattern:['TAMURI','AN','KORUME','VEMI','LOKANI','KODERA'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_TOMORROW_NEED_GO_STATION',
    generalizes:false,
    guards:['TEMPORAL_ACTION_CHAIN_EXACT_FRAME']
  },
  {
    id:'A1_LOCATE_MY_BOOK',
    pattern:['AN','LENU','KAVESO','RUMI','KUVAN','KE'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'REQUEST_LOCATION_MY_BOOK',
    generalizes:false,
    guards:['POSSESSIVE_NP_LOCATION_WH_SCOPED','KE_NOT_GENERALIZED']
  },
  {
    id:'A1_DEICTIC_BOOK',
    pattern:['SEVAI','KAVESO'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'IDENTIFY_THIS_BOOK',
    generalizes:false,
    guards:['DEICTIC_NP_SCOPED']
  },
  {
    id:'A1_WANT_TWO_BOOKS',
    pattern:['AN','MORAKU','HIZEP','KAVESO'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'STATE_WANT_TWO_BOOKS',
    generalizes:false,
    guards:['WANT_COUNTED_OBJECT_SCOPED']
  },
  {
    id:'A1_REQUEST_PRICE',
    pattern:['KADURI'],
    authority:[A.AUTHORED,A.LOCKED],
    intent:'REQUEST_PRICE',
    generalizes:false
  }
]);

export function getLexeme(form) {
  return lexemes[form] ?? null;
}

export function getConstructionByPattern(tokens) {
  return constructions.find(c => c.pattern.length === tokens.length && c.pattern.every((t,i)=>t===tokens[i])) ?? null;
}
