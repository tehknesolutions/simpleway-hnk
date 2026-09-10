# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + ACTIVATION AUTHORING  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V23`  
**Pacote atual:** `simpleway-hnk@0.26.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

## L01 OPI — 10/10 VALIDATED

Todos os dez OPI v1.1 possuem payload HNK reproduzível, foram revisados e estão validados para uso escopado no curso.

| OPI | HNK v1.1 | Estado |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | **VALIDATED** · whole-utterance formula |
| 02 | `EN VAMAKALA KE` | **VALIDATED** |
| 03 | `EN KU SARASALA KE` | **VALIDATED** · cardinal 0–99 scoped |
| 04 | `EN SARADAYA KUVAN KE` | **VALIDATED** |
| 05 | `EN VALI KUVAN KE` | **VALIDATED** |
| 06 | `EN KU VALA KE` | **VALIDATED** |
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | **VALIDATED** · scoped residence semantics |
| 08 | `EN KU VAMAVALA KE` | **VALIDATED** |
| 09 | `EN VAME VAMAZAMU KE` | **VALIDATED** |
| 10 | `VAMUSARO` context + `EN KU VALA KE` | **VALIDATED** |

OPI 7 validation did not mutate the recovered lexicon: `VANI` remains `WATCH` with meaning `null`; `KUVAN`/`KUON` remain `CANDIDATE`; `ON` remains `GATE`; no `WITH` lexeme was created.

## L01 Activation — P01 AUTHORED

Historical v1.0 evidence proves that L01 contained **72 teacher drills**, but the raw historical drill payload remains unrecovered.

A v1.1 pipeline was created with exactly 72 slots:

- slots 001–060: six foundation modes for each of the 10 validated OPI;
- slots 061–072: 12 integrative drills.

Foundation modes:

`RECOGNIZE_INTENT`, `REPEAT_FORM`, `PRODUCE_QUESTION`, `TRACE_GIDS`, `PRODUCE_RESPONSE`, `MICRO_DIALOGUE`.

Pack P01 implements slots **001–012**, sourced only from validated OPI 1–2.

Current state:

- Activation target: **72**
- AUTHORED: **12 = 16.6667%**
- VALIDATED: **0**
- FROZEN: **0**
- new HNK lexical forms introduced by P01: **0**

These 12 drills are new v1.1 authorship, not reconstructed historical v1.0 content.

Prepared validation batch:

`SWHNK-L01-ACTIVATION-P01-VALIDATION-V1`

It is waiting for explicit approval before any of the 12 drills move to VALIDATED.

## L01 total progress

L01 target: **155 slots**.

- OPI VALIDATED: **10**
- Activation AUTHORED: **12**
- authored-or-better total: **22/155 = 14.1935%**
- validated total: **10/155 = 6.4516%**
- remaining unimplemented: **133**

## Cycle 1 progress

Exclusive current states:

**986 MISSING + 12 AUTHORED + 10 VALIDATED + 0 FROZEN = 1.008**.

Cumulative authored-or-better: **22/1.008 = 2.1825%**.

Historical evidence remains **82/1.008 = 8.1349%**, comprising 10 OPI + 72 Activation source-confirmed frozen slots.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado governado `@hnk/linguas/authored`: **14 CANDIDATE forms** — `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **45/144 = 31.25%**.

## Fronteiras

`hnk-english-app` permanece referência metodológica/arquitetural, não owner do corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

CI remoto continua não comprovado até existir execução real de runner.
