import assert from 'node:assert/strict';
import {freezeLanguagePack} from '../src/sw-core/contracts/language-pack-v1.mjs';
import {createMediaRegistry} from '../src/sw-core/contracts/media-registry-v1.mjs';
import {defineLearningSurface} from '../src/sw-core/contracts/lesson-runtime-v1.mjs';

const pack=freezeLanguagePack({id:'TEST',language:'HNK',authority:'EVIDENCE_FIRST',lessons:[]});
assert.equal(pack.language,'HNK');

const media=createMediaRegistry([{id:'IMG1',kind:'IMAGE',src:'/x.png',pedagogicalRole:'CONTEXT'}]);
assert.equal(media.has('IMG1'),true);
assert.equal(media.get('IMG1').kind,'IMAGE');

const surface=defineLearningSurface({id:'S1',phase:'CONTEXT_INPUT',acquisitionStage:'EXPOSURE',mediaIds:['IMG1']});
assert.equal(surface.phase,'CONTEXT_INPUT');

console.log('SW_CORE_FUSION_BOOTSTRAP_PASS');
