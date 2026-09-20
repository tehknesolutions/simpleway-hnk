from fontTools.ttLib import TTFont
files=['font/dist/HNKVisualCanonV2-Regular.ttf','font/dist/HNKVisualCanonV2-Regular.otf','font/dist/HNKVisualCanonV2-Regular.woff2']
for f in files:
    x=TTFont(f)
    c={k:v for t in x['cmap'].tables for k,v in t.cmap.items() if (0xE100<=k<=0xE127) or (0xE200<=k<=0xE233)}
    assert len(c)==92,(f,len(c))
    assert 'SVG ' in x,f
    print('PASS',f,len(c))
