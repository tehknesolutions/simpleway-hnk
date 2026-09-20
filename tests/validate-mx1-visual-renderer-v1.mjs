import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import{compositionPlan,renderPlaceholderSvg,LAYOUT}from'../src/hnk/mx1-visual-renderer-v1.mjs';
const m=JSON.parse(await readFile(new URL('../experiments/a1-rc1-sprint1/HNK-MX1-VISUAL-MANIFEST-V1.json',import.meta.url),'utf8'));
assert.equal(m.items.length,52);assert.equal(m.visualCanon,false);assert.equal(m.items.every(x=>x.rootArtStatus==='PLACEHOLDER_NONCANON'),true);
assert.deepEqual(LAYOUT.CV,['PRE1','NUCLEUS']);assert.deepEqual(LAYOUT.VC,['NUCLEUS','POST1']);assert.deepEqual(LAYOUT.CVC,['PRE1','NUCLEUS','POST1']);
for(const x of m.items){const p=compositionPlan(x);assert.equal(p.length,x.gIds.length);assert.equal(p.every(y=>y.rotation===0&&!y.mirrored),true);const svg=renderPlaceholderSvg(x);assert.match(svg,/NONCANON/);assert.match(svg,/PREPRODUCTION/);}
console.log('PASS HNK-MX1-VISUAL-RENDERER-V1 52/52');