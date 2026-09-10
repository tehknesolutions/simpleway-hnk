# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + ACTIVATION PIPELINE  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V26`  
**Pacote atual:** `simpleway-hnk@0.29.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

## L01 OPI — 10/10 VALIDATED

Todos os dez OPI v1.1 possuem payload HNK reproduzível, foram revisados e estão validados para uso escopado no curso. A validação do curso não altera por si só autoridade lexical histórica.

## L01 Activation — 36/72 authored-or-better

A release histórica comprova **72 teacher-drill slots**, mas o conteúdo bruto desses 72 drills não foi recuperado. O pipeline v1.1 cria drills novos derivados dos OPI validados e mantém essa proveniência explícita.

Estrutura da fase:

- 001–060: 6 foundation drills para cada um dos 10 OPI;
- 061–072: 12 integrative drills.

Foundation modes:

`RECOGNIZE_INTENT`, `REPEAT_FORM`, `PRODUCE_QUESTION`, `TRACE_GIDS`, `PRODUCE_RESPONSE`, `MICRO_DIALOGUE`.

### P01 — slots 001–012 — VALIDATED

Fonte: OPI 1–2. Zero novas formas HNK; PHR-001 continua fórmula inteira e `NE` continua CANDIDATE.

### P02 — slots 013–024 — VALIDATED

Fonte: OPI 3–4. Preserva `SARASALA=WATCH`, numerais e `KUVAN=CANDIDATE`, sem palavra para ano/anos e sem reconstrução histórica.

### P03 — slots 025–036 — AUTHORED

Fonte: OPI 5–6.

- OPI 5 pratica `EN VALI KUVAN KE` + `[PLACE]`;
- OPI 6 pratica `EN KU VALA KE` + `[ACTIVITY_DESCRIPTION]` em contexto explícito trabalho/escola;
- `VALI` mantém proveniência recuperada L02/L03 e rebind curricular explícito para L01;
- `KUVAN` e `VALA` permanecem CANDIDATE;
- nenhum verbo HNK genérico equivalente a `DO` foi criado;
- zero novas formas HNK.

Gate preparado: `SWHNK-L01-ACTIVATION-P03-VALIDATION-V1`.

Se aprovado, Activation sobe para **36/72 VALIDATED = 50%**.

## Progresso L01

L01 target: **155 slots**.

- OPI VALIDATED: **10**
- Activation VALIDATED: **24**
- Activation AUTHORED: **12**
- authored-or-better total: **46/155 = 29.6774%**
- validated total: **34/155 = 21.9355%**
- remaining unimplemented: **109**

## Progresso Ciclo 1

Estados exclusivos:

**962 MISSING + 12 AUTHORED + 34 VALIDATED + 0 FROZEN = 1.008**.

Cumulativo authored-or-better: **46/1.008 = 4.5635%**.

Historical evidence permanece **82/1.008 = 8.1349%**, referente a 10 OPI + 72 Activation comprovados como estrutura/publicação histórica, não payload atual reproduzível.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado `@hnk/linguas/authored`: **14 CANDIDATE forms** — `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **45/144 = 31.25%**.

## Fronteiras

`hnk-english-app` permanece referência metodológica/arquitetural, não owner do corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

CI remoto continua não comprovado até existir execução real de runner.
