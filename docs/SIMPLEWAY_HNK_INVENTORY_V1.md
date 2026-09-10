# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + NUMERIC INFRASTRUCTURE  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V21`  
**Pacote atual:** `simpleway-hnk@0.24.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

## L01 — estado pedagógico

A release histórica `PUBLICATION-FROZEN` comprova **10 OPI + 72 teacher drills = 82 itens**, mas o payload bruto v1.0 permanece não recuperado. Esses 82 são evidência histórica, não `FROZEN` reproduzível atual.

Todos os 10 OPI v1.1 estão autorados e revisados. **9/10 estão VALIDATED = 90%**.

| OPI | HNK v1.1 | Estado |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | **VALIDATED** · whole-utterance recovered formula |
| 02 | `EN VAMAKALA KE` | **VALIDATED** |
| 03 | `EN KU SARASALA KE` | **VALIDATED** · age/cardinal 0–99 scoped |
| 04 | `EN SARADAYA KUVAN KE` | **VALIDATED** |
| 05 | `EN VALI KUVAN KE` | **VALIDATED** |
| 06 | `EN KU VALA KE` | **VALIDATED** |
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | AUTHORED · **FINAL HOLD / BATCH PREPARED** |
| 08 | `EN KU VAMAVALA KE` | **VALIDATED** |
| 09 | `EN VAME VAMAZAMU KE` | **VALIDATED** |
| 10 | `VAMUSARO` context + `EN KU VALA KE` | **VALIDATED** |

Estados exclusivos no Ciclo 1: **998 MISSING + 1 AUTHORED + 9 VALIDATED + 0 FROZEN = 1.008**.

Maturidade: **10/1.008 authored-or-better = 0.9921%**; **9/1.008 validated = 0.8929%**. Nos 70 OPI do Ciclo 1, **9/70 = 12.8571%** estão validados.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado governado `@hnk/linguas/authored`: **14 CANDIDATE forms** — `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **45/144 = 31.25%**.

## OPI 1 — validado sem glossário inventado

`KALA YA EN ES KU KE` foi validado como fórmula recuperada inteira (`PHR-001`) para uso escopado no OPI 1. `PHR-001` continua `APPROXIMATE`; `YA` e `ES` permanecem semanticamente não resolvidos; os papéis de `KALA`, `EN`, `KU` e `KE` continuam inferenciais. A resposta validada é `[PERSONAL_NAME]`.

## Sistema numérico 0–99

Os numerais 0–9 continuam autoria nova `CANDIDATE`: 0 `BIZO`, 1 `DUVE`, 2 `HOYU`, 3 `KETI`, 4 `LUSO`, 5 `MUPI`, 6 `NURA`, 7 `PEVU`, 8 `TOMI`, 9 `ZOKA`.

A regra `DIGIT_TENS DIGIT_UNITS` está aprovada somente no contexto cardinal do OPI 3 e não cria 100+, ordinais, frações, aritmética ou palavra para ano/anos.

## OPI 7 — último gate

Pergunta congelada: `Where do you live and who do you live with?`

Design atual:

1. `EN VANI KUVAN KE`
2. `EN VANI KUON KE`

O batch `SWHNK-L01-OPI-007-FINAL-HUMAN-BATCH-V1` está **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

Ele pode levar a L01 a **10/10 VALIDATED = 100%**, mas somente se forem aprovadas cinco decisões escopadas, preservando simultaneamente:

- `VANI` como `WATCH` com Master Lexicon meaning `null`;
- `VANI ≈ live/reside` apenas como interpretação de curso, não recuperação histórica;
- `KUVAN` e `KUON` como `CANDIDATE`;
- `ON` como `GATE`;
- valência de co-residente apenas no OPI 7;
- nenhum lexema equivalente a `WITH`;
- zero promoção de autoridade e zero mutação do Master Lexicon.

## Próximo gate

`SWHNK-L01-OPI-007-FINAL-HUMAN-BATCH-V1`

## Fronteiras

`hnk-english-app` permanece referência metodológica/arquitetural, não owner do corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

CI remoto continua não comprovado até existir execução real de runner.
