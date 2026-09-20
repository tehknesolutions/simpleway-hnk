from fontTools.ttLib import TTFont
files=['font/dist/HNKVisualCanonV2-Regular.ttf','font/dist/HNKVisualCanonV2-Regular.otf','font/dist/HNKVisualCanonV2-Regular.woff2']
for f in files:
 x=TTFont(f); c={k:v for t in x['cmap'].tables for k,v in t.cmap.items() if (0xE100<=k<=0xE127) or (0xE200<=k<=0xE23A)}
 assert len(c)==99,(f,len(c)); assert 'SVG ' in x,f; assert all(k in c for k in range(0xE234,0xE23B)); print('PASS',f,len(c),'40 roots + 59 MX1')
