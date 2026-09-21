import { resolveL04V2A1Surface } from './l04-v2-adapter.mjs';

export const L04_V2_BRIDGE_ID='SWHNK-L04-CHESED-V2-PEDAGOGICAL-BRIDGE-V1';
export const L04_V2_BRIDGE_PLACEMENT='AFTER_WORLD_2_BEFORE_WORLD_3';

const raw=Object.freeze([
 {id:'L04B01_ACTIVITY',family:'STR001',surfaces:['ERU VALI KE','ERU PARAZAMI KE'],forbidden:'ERU VALI'},
 {id:'L04B02_PLACE',family:'STR002',surfaces:['ERU RUMI VALIVAN KE','ERU RUMI PARAZAMO KE'],forbidden:'ERU RUMI KE'},
 {id:'L04B03_INTENTION',family:'STR003',surfaces:['ERU DAYI KE'],forbidden:'ERU DAYI VEMI LOKANI KE'},
 {id:'L04B04_NEED',family:'STR004',surfaces:['ERU SALI KE'],forbidden:'ERU SALI SAVETA KE'},
 {id:'L04B05_HABITUAL',family:'STR005',surfaces:['SARU ERU VALI KE','SARU ERU PARAZAMI KE'],forbidden:'SARU ERU DAYI KE'}
]);

export const L04_V2_BRIDGE_MISSIONS=Object.freeze(raw.map(m=>Object.freeze({...m,
 stages:Object.freeze(['EXPOSURE','COMPREHENSION','NOTICE','RETRIEVAL','TRANSFER_BOUNDARY'])
})));

export function loadL04V2Bridge({enabled=false}={}){
 if(!enabled) return Object.freeze([]);
 return Object.freeze(L04_V2_BRIDGE_MISSIONS.map(m=>{
   const resolved=m.surfaces.map(s=>resolveL04V2A1Surface(s,{enabled:true}));
   if(resolved.some(x=>!x)) throw new Error('L04 V2 bridge contains a non-governed surface');
   if(resolveL04V2A1Surface(m.forbidden,{enabled:true})) throw new Error('L04 V2 bridge forbidden probe became licensed');
   return Object.freeze({...m,resolved:Object.freeze(resolved)});
 }));
}
