import {freezeLanguagePack} from '../../sw-core/contracts/language-pack-v1.mjs';
import {L04_V2_EXACT_SURFACES,getL04V2RuntimeSurface} from '../../hnk/l04-v2-runtime-consumer-v1.mjs';

export const HNK_CHESed_PACK_ID='SW-HNK-L04-CHESED-PACK-V1';

const governedSurfaces=L04_V2_EXACT_SURFACES.map(surface=>{
 const governed=getL04V2RuntimeSurface(surface);
 if(!governed) throw new Error('Ungoverned HNK surface blocked: '+surface);
 return Object.freeze({...governed});
});

export const HNK_CHESed_PACK=freezeLanguagePack({
 id:HNK_CHESed_PACK_ID,
 language:'HNK',
 authority:'EVIDENCE_FIRST_ALLOWLIST_ONLY',
 lessons:[Object.freeze({
   id:'L04-CHESED',
   title:'Chesed',
   governedSurfaces:Object.freeze(governedSurfaces)
 })]
});
