import {defineLearningSurface} from '../../sw-core/contracts/lesson-runtime-v1.mjs';

const specs=[
 ['ACTIVITY','HNK-L04-CONTEXT-ACTIVITY'],
 ['PLACE','HNK-L04-CONTEXT-PLACE'],
 ['INTENTION','HNK-L04-CONTEXT-INTENTION'],
 ['NEED','HNK-L04-CONTEXT-NEED'],
 ['HABITUAL','HNK-L04-CONTEXT-HABITUAL']
];

export const HNK_CHESED_VISUAL_SURFACES=Object.freeze(specs.map(([concept,mediaId])=>
 defineLearningSurface({
   id:'HNK-L04-'+concept+'-EXPOSURE',
   phase:'CONTEXT_INPUT',
   acquisitionStage:'EXPOSURE',
   mediaIds:Object.freeze([mediaId]),
   semanticPolicy:'CANON_SAFE_MEDIA_REQUIRED'
 })
));
