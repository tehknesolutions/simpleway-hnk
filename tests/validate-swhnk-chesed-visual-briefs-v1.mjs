import assert from 'node:assert/strict';
import {HNK_CHESED_VISUAL_BRIEFS} from '../src/language-packs/hnk/chesed-visual-briefs-v1.mjs';
import {HNK_CHESED_MEDIA_SLOTS} from '../src/language-packs/hnk/chesed-media-v1.mjs';
assert.equal(HNK_CHESED_VISUAL_BRIEFS.length,5);
assert.deepEqual(new Set(HNK_CHESED_VISUAL_BRIEFS.map(x=>x.id)),new Set(HNK_CHESED_MEDIA_SLOTS.map(x=>x.id)));
for(const b of HNK_CHESED_VISUAL_BRIEFS){
 assert.equal(b.status,'BRIEF_READY_HUMAN_SEMANTIC_REVIEW');
 assert.ok(b.surfaceRefs.length>=1);
 assert.ok(b.prohibited.includes('NO_TEXT_GENERATED_HNK'));
}
console.log('SWHNK_CHESED_VISUAL_BRIEFS_PASS');
