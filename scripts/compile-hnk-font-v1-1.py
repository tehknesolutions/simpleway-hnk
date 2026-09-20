#!/usr/bin/env python3
import json,re,hashlib,pathlib
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.ttLib import newTable
from fontTools.ttLib.tables.S_V_G_ import SVGDocument
ROOT=pathlib.Path(__file__).resolve().parents[1]; OUT=ROOT/'font'/'dist'; OUT.mkdir(parents=True,exist_ok=True)
cmap=json.loads((ROOT/'font/HNK_FONT_CMAP_V1_1.json').read_text())
src=(ROOT/'src/hnk/hnk40-visual-canon-v2.mjs').read_text()
m=re.search(r'HNK40_SPRITE_SVG\s*=\s*("(?:\\.|[^"\\])*")',src); assert m
sprite=json.loads(m.group(1)); defs=re.search(r'<defs>([\s\S]*?)</defs>',sprite).group(1)
def cp(s): return int(s[2:],16)
def svg_root(g): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs>{defs}</defs><g transform="translate(100 100) scale(8)" fill="none" stroke="black" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><use href="#{g}"/></g></svg>'
slots={'NUCLEUS':(500,500,.62),'PRE1':(250,500,.42),'POST1':(750,500,.42)}; layouts={'ROOT':['NUCLEUS'],'CV':['PRE1','NUCLEUS'],'VC':['NUCLEUS','POST1'],'CVC':['PRE1','NUCLEUS','POST1']}
def svg_mx(x):
 parts=[]
 for gid,role in zip(x['gIds'],layouts[x['profile']]):
  X,Y,S=slots[role]; parts.append(f'<g transform="translate({X} {Y}) scale({S*4}) translate(-50 -50)" fill="none" stroke="black" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><use href="#{gid}"/></g>')
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs>{defs}</defs>{"".join(parts)}</svg>'
docs={}; glyphOrder=['.notdef']; cmapMap={}
for i,x in enumerate(cmap['mappings']):
 name=('root_'+x['id']) if x['kind']=='ROOT' else f'mx1_{x["index"]:02d}'
 glyphOrder.append(name); cmapMap[cp(x['codepoint'])]=name; docs[cp(x['codepoint'])]=svg_root(x['id']) if x['kind']=='ROOT' else svg_mx(x)
def common(fb):
 fb.setupGlyphOrder(glyphOrder); fb.setupCharacterMap(cmapMap); fb.setupHorizontalMetrics({g:(1000,0) for g in glyphOrder}); fb.setupHorizontalHeader(ascent=900,descent=-100); fb.setupNameTable({'familyName':'HNK Visual Canon V2','styleName':'Regular','uniqueFontIdentifier':'HNKVisualCanonV2-1.1.0','fullName':'HNK Visual Canon V2','psName':'HNKVisualCanonV2-Regular','version':'Version 1.1.0'}); fb.setupOS2(sTypoAscender=900,sTypoDescender=-100,usWinAscent=900,usWinDescent=100); fb.setupPost(); fb.setupMaxp()
def addsvg(font):
 t=newTable('SVG ')
 glyphIndex={name:i for i,name in enumerate(glyphOrder)}
 t.docList=[SVGDocument(d,glyphIndex[cmapMap[c]],glyphIndex[cmapMap[c]],False) for c,d in sorted(docs.items())]
 font['SVG ']=t
fb=FontBuilder(1000,isTTF=True); common(fb); fb.setupGlyf({g:TTGlyphPen(None).glyph() for g in glyphOrder}); addsvg(fb.font); ttf=OUT/'HNKVisualCanonV2-Regular.ttf'; fb.save(ttf)
font=fb.font; font.flavor='woff2'; font.save(OUT/'HNKVisualCanonV2-Regular.woff2')
fb2=FontBuilder(1000,isTTF=False); common(fb2); cs={g:T2CharStringPen(1000,None).getCharString() for g in glyphOrder}; fb2.setupCFF('HNKVisualCanonV2-Regular',{'FullName':'HNK Visual Canon V2','FamilyName':'HNK Visual Canon V2','Weight':'Regular'},cs,{}); addsvg(fb2.font); fb2.save(OUT/'HNKVisualCanonV2-Regular.otf')
report={'family':'HNK Visual Canon V2','version':'1.1.0','glyphMappings':len(cmapMap),'files':{}}
for p in OUT.glob('HNKVisualCanonV2-Regular.*'): report['files'][p.name]={'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
(OUT/'HNK_FONT_BUILD_REPORT_V1_1.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
