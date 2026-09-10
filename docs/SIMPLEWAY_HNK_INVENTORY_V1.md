# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + NUMERIC INFRASTRUCTURE  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V22`  
**Pacote atual:** `simpleway-hnk@0.25.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

## L01 — estado pedagógico

A release histórica `PUBLICATION-FROZEN` comprova **10 OPI + 72 teacher drills = 82 itens**, mas o payload bruto v1.0 permanece não recuperado. Esses 82 são evidência histórica, não `FROZEN` reproduzível atual.

Todos os 10 OPI v1.1 estão autorados, revisados e agora **10/10 estão VALIDATED = 100%**.

| OPI | HNK v1.1 | Estado |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | **VALIDATED** · whole-utterance recovered formula |
| 02 | `EN VAMAKALA KE` | **VALIDATED** |
| 03 | `EN KU SARASALA KE` | **VALIDATED** · age/cardinal 0–99 scoped |
| 04 | `EN SARADAYA KUVAN KE` | **VALIDATED** |
| 05 | `EN VALI KUVAN KE` | **VALIDATED** |
| 06 | `EN KU VALA KE` | **VALIDATED** |
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | **VALIDATED** · scoped residence/co-resident semantics |
| 08 | `EN KU VAMAVALA KE` | **VALIDATED** |
| 09 | `EN VAME VAMAZAMU KE` | **VALIDATED** |
| 10 | `VAMUSARO` context + `EN KU VALA KE` | **VALIDATED** |

Estados exclusivos no Ciclo 1: **998 MISSING + 0 AUTHORED + 10 VALIDATED + 0 FROZEN = 1.008**.

Maturidade global: **10/1.008 validated = 0.9921%**. Nos 70 OPI do Ciclo 1, **10/70 = 14.2857%** estão validados. Dentro da L01 inteira, **10/155 = 6.4516%** dos slots estão validados.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado governado `@hnk/linguas/authored`: **14 CANDIDATE forms** — `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **45/144 = 31.25%**.

## OPI 7 — validado sem mutação do Master Lexicon

Pergunta congelada: `Where do you live and who do you live with?`

Design validado:

1. `EN VANI KUVAN KE`
2. `EN VANI KUON KE`

A validação é estritamente escopada ao SimpleWay HNK L01 OPI 7. Continuam válidas todas as fronteiras:

- `VANI` permanece `WATCH` com Master Lexicon meaning `null`;
- `VANI ≈ live/reside` é interpretação de curso, não recuperação histórica;
- `KUVAN` e `KUON` permanecem `CANDIDATE`;
- `ON` permanece `GATE`;
- a valência de co-residente vale apenas nesse card;
- nenhum lexema `WITH` foi criado;
- zero promoção de autoridade linguística e zero mutação do Master Lexicon.

## Sistema numérico 0–99

Os numerais 0–9 continuam autoria nova `CANDIDATE`: 0 `BIZO`, 1 `DUVE`, 2 `HOYU`, 3 `KETI`, 4 `LUSO`, 5 `MUPI`, 6 `NURA`, 7 `PEVU`, 8 `TOMI`, 9 `ZOKA`.

A regra `DIGIT_TENS DIGIT_UNITS` está aprovada somente no contexto cardinal do OPI 3 e não cria 100+, ordinais, frações, aritmética ou palavra para ano/anos.

## Fase OPI — conclusão

`10/10 VALIDATED` significa que todos os OPI da Lesson 1 possuem payload HNK v1.1 reproduzível e aprovado para uso escopado no curso.

Isso não significa publicação `FROZEN`, recuperação integral da release histórica, promoção automática de WATCH/CANDIDATE/GATE ou conclusão da Lesson 1 inteira.

## Próxima fase — Activation 72

A L01 ainda possui **145 slots não validados**. O próximo bloco recomendado é Activation porque a fonte histórica comprova exatamente **72 teacher drills**, embora o conteúdo bruto desses drills ainda não tenha sido recuperado.

Novo gate:

`SWHNK-L01-ACTIVATION-72-PIPELINE-V1`

Estratégia:

- manter os 72 slots históricos como evidência `SOURCE_CONFIRMED_FROZEN`;
- não inventar conteúdo e rotulá-lo como histórico;
- autorar um novo conjunto v1.1 de 72 drills a partir dos 10 OPI validados e dos ativos linguísticos governados;
- depois passar `AUTHORED -> VALIDATED -> FROZEN` como fase separada.

## Fronteiras

`hnk-english-app` permanece referência metodológica/arquitetural, não owner do corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

CI remoto continua não comprovado até existir execução real de runner.
