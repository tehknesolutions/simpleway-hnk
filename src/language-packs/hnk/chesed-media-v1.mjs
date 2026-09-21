import {createMediaRegistry} from '../../sw-core/contracts/media-registry-v1.mjs';

/**
 * Semantic HNK images are intentionally not invented here.
 * These slots are contracts for assets that must be canon-safe and human-reviewed.
 */
export const HNK_CHESED_MEDIA_SLOTS=Object.freeze([
 {id:'HNK-L04-CONTEXT-ACTIVITY',kind:'IMAGE',src:'PENDING_CANON_SAFE_ASSET',pedagogicalRole:'CONTEXT_ACTIVITY',status:'REQUIRED_UNRESOLVED'},
 {id:'HNK-L04-CONTEXT-PLACE',kind:'IMAGE',src:'PENDING_CANON_SAFE_ASSET',pedagogicalRole:'CONTEXT_PLACE',status:'REQUIRED_UNRESOLVED'},
 {id:'HNK-L04-CONTEXT-INTENTION',kind:'IMAGE',src:'PENDING_CANON_SAFE_ASSET',pedagogicalRole:'CONTEXT_INTENTION',status:'REQUIRED_UNRESOLVED'},
 {id:'HNK-L04-CONTEXT-NEED',kind:'IMAGE',src:'PENDING_CANON_SAFE_ASSET',pedagogicalRole:'CONTEXT_NEED',status:'REQUIRED_UNRESOLVED'},
 {id:'HNK-L04-CONTEXT-HABITUAL',kind:'IMAGE',src:'PENDING_CANON_SAFE_ASSET',pedagogicalRole:'CONTEXT_HABITUAL',status:'REQUIRED_UNRESOLVED'}
]);

export const HNK_CHESED_MEDIA=createMediaRegistry(HNK_CHESED_MEDIA_SLOTS);
export function unresolvedRequiredMedia(){
 return HNK_CHESED_MEDIA.list().filter(x=>x.status==='REQUIRED_UNRESOLVED');
}
