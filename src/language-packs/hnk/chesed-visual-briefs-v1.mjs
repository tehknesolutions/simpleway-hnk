import {L04_V2_EXACT_SURFACES} from '../../hnk/l04-v2-runtime-consumer-v1.mjs';

const exact=new Set(L04_V2_EXACT_SURFACES);
const defs=[
 {id:'HNK-L04-CONTEXT-ACTIVITY',family:'STR001',surfaceRefs:['ERU VALI KE','ERU PARAZAMI KE'],concept:'ACTIVITY'},
 {id:'HNK-L04-CONTEXT-PLACE',family:'STR002',surfaceRefs:['ERU RUMI VALIVAN KE','ERU RUMI PARAZAMO KE'],concept:'PLACE'},
 {id:'HNK-L04-CONTEXT-INTENTION',family:'STR003',surfaceRefs:['ERU DAYI KE'],concept:'INTENTION'},
 {id:'HNK-L04-CONTEXT-NEED',family:'STR004',surfaceRefs:['ERU SALI KE'],concept:'NEED'},
 {id:'HNK-L04-CONTEXT-HABITUAL',family:'STR005',surfaceRefs:['SARU ERU VALI KE','SARU ERU PARAZAMI KE'],concept:'HABITUAL'}
];

export const HNK_CHESED_VISUAL_BRIEFS=Object.freeze(defs.map(d=>{
 if(d.surfaceRefs.some(x=>!exact.has(x))) throw new Error('Visual brief references ungoverned surface');
 return Object.freeze({
  ...d,
  authority:'PEDAGOGICAL_FAMILY_LABEL_PLUS_EXACT_RUNTIME_SURFACES',
  semanticScope:'DO_NOT_EXPAND_BEYOND_FAMILY_LABEL',
  artDirection:'SimpleWay contextual learning image; one clear situation; no written HNK inside image; no embedded translation; no mystical symbol used as semantic proof.',
  prohibited:Object.freeze([
   'NO_NEW_LEXICAL_GLOSS',
   'NO_UNIVERSAL_GRAMMAR_CLAIM',
   'NO_TEXT_GENERATED_HNK',
   'NO_SEMANTIC_DETAIL_NOT_LICENSED_BY_REVIEW'
  ]),
  status:'BRIEF_READY_HUMAN_SEMANTIC_REVIEW'
 });
}));
