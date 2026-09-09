# SimpleWay HNK

Curso oficial do idioma HNK (HENUVOKODAN) dentro do ecossistema SimpleWay / Grupo HNK.

## Escopo deste repositório

Este repositório é o produto educacional do idioma HNK. Ele deve conter currículo, Lessons, releases pedagógicos, exercícios, aplicação Aluno/Professor e integrações necessárias ao curso.

### Fronteiras de responsabilidade

- `tehknesolutions/simpleway-hnk` — curso e produto SimpleWay HNK.
- `tehknesolutions/codex-hnk/packages/hnk-linguas` — autoridade do léxico, frases, bindings de Lesson e classes de governança recuperadas.
- `tehknesolutions/codex-hnk/packages/hnk-glyphs` — autoridade estrutural G01–G40, fonemas e runtime de glifos.
- `hnk-english-app` — SimpleWay English; pode servir como referência pedagógica, estrutural e de UX, mas não recebe conteúdo HNK.

## Estado atual

**SimpleWay HNK: RECOVERY + COURSE ASSEMBLY**

O Ciclo 1 possui contrato estrutural aprovado para 7 Lessons, com meta de 144 entradas curriculares de vocabulário e 1.008 elementos pedagógicos no ciclo. A cobertura linguística HNK recuperada ainda está incompleta.

Árvore reconciliada do Ciclo 1:

| Lesson | Esfera | Bindings HNK recuperados | Frases HNK recuperadas | Estado linguístico |
|---|---|---:|---:|---|
| L01 | Kether | 9 | 7 | conteúdo recuperado + release pedagógico existente |
| L02 | Chokhmah | 11 | 0 | léxico recuperado; scaffold pedagógico sem conteúdo congelado |
| L03 | Binah | 8 | 0 | léxico parcial sob governança |
| L04 | Chesed | 9 | 0 | evidência/gate; não promover silenciosamente |
| L05 | Gevurah | 0 | 0 | sem lexemas HNK recuperados |
| L06 | Yesod | 0 | 0 | sem lexemas HNK recuperados |
| L07 | Malkuth | 0 | 0 | sem lexemas HNK recuperados |

Gate atual do corpus: `HOLD_INCOMPLETE_BINDING`.

## Regra de não invenção

Ausência de vocabulário recuperado não autoriza preenchimento automático. Novas formas HNK devem ser recuperadas de fonte histórica ou explicitamente autoradas como candidatas, ligadas a G01–G40, documentadas com significado/proveniência e promovidas pela governança antes de serem tratadas como cânone.

## Organização alvo

```text
simpleway-hnk/
├── apps/
│   └── web/                 # experiência Aluno/Professor
├── curriculum/
│   └── cycle-01/
│       ├── L01-kether/
│       ├── L02-chokhmah/
│       ├── L03-binah/
│       ├── L04-chesed/
│       ├── L05-gevurah/
│       ├── L06-yesod/
│       └── L07-malkuth/
├── docs/
│   ├── SIMPLEWAY_HNK_INVENTORY_V1.md
│   └── SOURCE_BOUNDARIES.md
├── schemas/
├── tests/
└── README.md
```

## Princípio de implementação

O curso consome o cânone linguístico; ele não o reinventa. Conteúdo pedagógico pode evoluir em `simpleway-hnk`, enquanto IDs de glifos, fonemas, lexemas e seus estados de autoridade devem permanecer rastreáveis às fontes canônicas compartilhadas.
