# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + NUMERIC INFRASTRUCTURE  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V20`  
**Pacote atual:** `simpleway-hnk@0.23.0`

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
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | AUTHORED · **FINAL HOLD** |
| 08 | `EN KU VAMAVALA KE` | **VALIDATED** |
| 09 | `EN VAME VAMAZAMU KE` | **VALIDATED** |
| 10 | `VAMUSARO` context + `EN KU VALA KE` | **VALIDATED** |

Estados exclusivos no Ciclo 1: **998 MISSING + 1 AUTHORED + 9 VALIDATED + 0 FROZEN = 1.008**.

Maturidade: **10/1.008 authored-or-better = 0.9921%**; **9/1.008 validated = 0.8929%**. Nos 70 OPI do Ciclo 1, **9/70 = 12.8571%** estão validados.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado governado `@hnk/linguas/authored`: **14 CANDIDATE forms** — `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **45/144 = 31.25%**.

## OPI 1 — validação por fórmula inteira

`KALA YA EN ES KU KE` é uma frase HNK realmente recuperada (`PHR-001`) com glosa aproximada da frase inteira: `What is your name?`.

A arqueologia não recuperou alinhamento token-a-token. Por isso a validação foi deliberadamente feita na unidade da **frase inteira**, não dos tokens individuais.

Fronteiras preservadas:

- `YA` continua sem significado recuperado;
- `ES` continua sem significado recuperado;
- `KALA`, `EN`, `KU` e `KE` mantêm apenas análises inferenciais;
- `PHR-001` continua com certeza `APPROXIMATE`;
- nenhuma autoridade lexical foi promovida;
- nenhum lexema novo foi criado;
- a resposta aceita é o valor nu `[PERSONAL_NAME]`.

Os registros antigos de technical/semantic HOLD permanecem como evidência histórica do estado anterior. A aprovação humana posterior é registrada separadamente no batch e na transição.

## Sistema numérico 0–99

Os numerais 0–9 são autoria nova governada e continuam `CANDIDATE`:

0 `BIZO`, 1 `DUVE`, 2 `HOYU`, 3 `KETI`, 4 `LUSO`, 5 `MUPI`, 6 `NURA`, 7 `PEVU`, 8 `TOMI`, 9 `ZOKA`.

A regra v1.1 de 10–99 está aprovada somente no contexto numérico/cardinal do OPI 3:

`DIGIT_TENS DIGIT_UNITS` → `10 × value(first) + value(second)`.

Exemplos: 10 `DUVE BIZO`, 18 `DUVE TOMI`, 42 `LUSO HOYU`, 99 `ZOKA ZOKA`.

Ela não define 100+, ordinais, frações, aritmética ou palavra para dez, e não é apresentada como gramática histórica recuperada.

## OPI 7 — único HOLD restante

Pergunta congelada: `Where do you live and who do you live with?`

Design atual:

1. `EN VANI KUVAN KE` — teste para `Where do you live?`
2. `EN VANI KUON KE` — teste para `Who do you live with?`

Esse é o último e mais arriscado gate da L01 porque:

- `VANI` é recuperado, mas seu significado no Master Lexicon continua `null`;
- a leitura `VANI ≈ live/reside` é uma hipótese semântica autoral, não recuperação;
- `KUVAN` continua `AUTH-001 CANDIDATE`;
- `KUON` continua `AUTH-003 CANDIDATE`;
- `KUON` depende de `LEX-026 ON`, que continua `GATE`;
- a valência de co-residente é autoria experimental;
- nenhuma partícula equivalente a inglês `WITH` foi inventada.

O próximo gate deve, portanto, ser mais rigoroso do que os anteriores: qualquer validação do OPI 7 precisa aprovar explicitamente essas hipóteses **somente para uso escopado no card**, mantendo `VANI.meaning=null`, `ON=GATE`, `KUVAN/KUON=CANDIDATE` e nenhum claim de gramática histórica.

## Próximo gate

`SWHNK-L01-OPI-007-FINAL-HOLD-REVIEW-V1`

## Fronteiras

`hnk-english-app` permanece referência metodológica/arquitetural, não owner do corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

CI remoto continua não comprovado até existir execução real de runner.
