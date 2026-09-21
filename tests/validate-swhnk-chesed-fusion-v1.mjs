import assert from 'node:assert/strict';
import {HNK_CHESed_PACK} from '../src/language-packs/hnk/chesed-v1.mjs';
import {HNK_CHESED_MEDIA,unresolvedRequiredMedia} from '../src/language-packs/hnk/chesed-media-v1.mjs';
import {HNK_CHESED_VISUAL_SURFACES} from '../src/language-packs/hnk/chesed-learning-surfaces-v1.mjs';

assert.equal(HNK_CHESed_PACK.language,'HNK');
assert.equal(HNK_CHESed_PACK.lessons[0].governedSurfaces.length,8);
assert.equal(HNK_CHESED_VISUAL_SURFACES.length,5);
for(const surface of HNK_CHESED_VISUAL_SURFACES){
 assert.equal(surface.semanticPolicy,'CANON_SAFE_MEDIA_REQUIRED');
 for(const mediaId of surface.mediaIds) assert.equal(HNK_CHESED_MEDIA.has(mediaId),true);
}
// Deliberately fail the visual release gate until reviewed assets replace every unresolved slot.
assert.equal(unresolvedRequiredMedia().length,5);
console.log('SWHNK_CHESED_FUSION_CONTRACT_PASS_WITH_5_VISUAL_ASSETS_PENDING');
