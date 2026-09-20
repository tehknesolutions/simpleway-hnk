import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base=new URL('../experiments/a1-rc1-sprint1/',import.meta.url);
const spec=await readFile(new URL('HNK-A1-IMMERSIVE-GLYPH-LEARNING-V1.md',base),'utf8');
const matrix=JSON.parse(await readFile(new URL('HNK-A1-IMMERSIVE-32-MATRIX-V1.json',base),'utf8'));
const glyph=JSON.parse(await readFile(new URL('HNK-A1-GLYPH-PHONOLOGY-MATRIX-V1.json',base),'utf8'));

assert.equal(matrix.levels.length,32);
assert.equal(matrix.narrativeMinimum.beforeChars,72);
assert.equal(matrix.narrativeMinimum.afterChars,72);
assert.equal(matrix.narrativeMinimum.perLevelChars,144);
assert.equal(matrix.narrativeMinimum.campaignFloorChars,4608);

const counts=Object.fromEntries([...new Set(matrix.levels.map(x=>x.world))].map(w=>[w,matrix.levels.filter(x=>x.world===w).length]));
assert.deepEqual(counts,{
  THE_AWAKENING:8,
  CONSTRUCTION_FORGE:8,
  GRAMMAR_DUNGEON:8,
  OPEN_WORLD:7,
  FINAL_BOSS:1
});

assert.ok(matrix.levels.every(x=>x.glyphLearning.status==='SOURCE_LOCKED'));
assert.ok(matrix.levels.every(x=>x.status==='AUTHORING_REQUIRED'));
assert.ok(matrix.levels.every(x=>x.narrativeBefore===null && x.narrativeAfter===null));

assert.equal(glyph.glyphInventoryTarget,40);
assert.equal(glyph.status,'HNK40_STRUCTURAL_PHONEME_REGISTRY_IMPORTED__MIX_RULES_SOURCE_LOCKED');
assert.equal(glyph.glyphs.length,40);
assert.equal(glyph.phoneticUnits.length,40);
assert.deepEqual(glyph.glyphs.map(x=>x.glyphId),Array.from({length:40},(_,i)=>`G${String(i+1).padStart(2,'0')}`));
assert.equal(glyph.glyphs.find(x=>x.glyphId==='G01').phonemeIpa,'/a/');
assert.equal(glyph.glyphs.find(x=>x.glyphId==='G30').phonemeIpa,'/ts/');
assert.equal(glyph.glyphs.find(x=>x.glyphId==='G40').phonemeIpa,'/y/');
assert.ok(glyph.glyphs.every(x=>x.visualAuthority==='PREPRODUCTION_NOT_OFFICIAL_VISUAL_CANON'));
assert.equal(glyph.compositionRules.length,0);
assert.ok(glyph.unresolved.length>=6);
assert.equal(glyph.confirmedConstraints[0].id,'PITSA_TS_G30');
assert.equal(glyph.confirmedConstraints[0].productivePhonologyLicensed,false);
assert.equal(glyph.confirmedConstraints[0].mixGlyphRuleLicensed,false);

assert.ok(spec.includes('NARRATIVE → IMAGE → GLYPH/WRITING → TEACHING → SRS → CHALLENGE → CONSEQUENCE'));
assert.ok(spec.includes('CANONICAL_GLYPH'));
assert.ok(spec.includes('DERIVED_MIX_GLYPH'));
assert.ok(spec.includes('HNK ≠ HENUVOKODAN'));
assert.ok(spec.includes('EN ZAMI HNK KE'));
assert.ok(spec.includes('TS = G30'));
assert.ok(spec.includes('No segmentation, phoneme-to-glyph correspondence, rotation, mirroring, stacking, overlap, ligature or reduction rule may be invented'));

console.log('PASS HNK-A1-IMMERSIVE-GLYPH-LEARNING-V1');
