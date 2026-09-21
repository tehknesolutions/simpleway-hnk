import { loadL04V2Bridge } from './l04-v2-pedagogical-bridge.mjs';

export const L04_V2_STUDENT_FLOW_ROUTER_ID='SWHNK-L04-CHESED-V2-STUDENT-FLOW-ROUTER-V1';
export const L04_V2_BRIDGE_ENTRY_AFTER='L16_MY_MOTHER_WORKS';
export const L04_V2_BRIDGE_EXIT_TO='L17_NE_TRAP';

export function deriveL04V2BridgeProgress(state={}){
 const completed=new Set(state.completedLevels??[]);
 const stored=state.l04V2Bridge??{};
 if(!completed.has(L04_V2_BRIDGE_ENTRY_AFTER)) return {status:'LOCKED',completedMissionIds:[],completedAt:null};
 const ids=Array.isArray(stored.completedMissionIds)?stored.completedMissionIds:[];
 if(stored.status==='COMPLETED') return {status:'COMPLETED',completedMissionIds:ids,completedAt:stored.completedAt??null};
 return {status:ids.length?'IN_PROGRESS':'AVAILABLE',completedMissionIds:ids,completedAt:null};
}

export function routeAfterCampaignLevel(state,levelId){
 if(levelId!==L04_V2_BRIDGE_ENTRY_AFTER) return {kind:'CAMPAIGN_NEXT'};
 const bridge=deriveL04V2BridgeProgress(state);
 return bridge.status==='COMPLETED'?{kind:'CAMPAIGN_LEVEL',levelId:L04_V2_BRIDGE_EXIT_TO}:{kind:'L04_V2_BRIDGE',missions:loadL04V2Bridge({enabled:true})};
}

export function completeL04V2BridgeMission(state,missionId,timestamp=new Date().toISOString()){
 const missions=loadL04V2Bridge({enabled:true});
 if(!missions.some(m=>m.id===missionId)) throw new Error('Unknown L04 V2 bridge mission');
 const next=structuredClone(state);
 const progress=deriveL04V2BridgeProgress(next);
 const ids=[...new Set([...progress.completedMissionIds,missionId])];
 next.l04V2Bridge={status:ids.length===missions.length?'COMPLETED':'IN_PROGRESS',completedMissionIds:ids,completedAt:ids.length===missions.length?timestamp:null};
 return next;
}
