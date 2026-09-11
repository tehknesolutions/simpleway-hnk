# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-11  
**Estado:** L01 KETHER 155/155 VALIDATED · L02 CHOKHMAH PATTERNS APPROVED / G-ID EXPANSION COMPLETE / OPI AUTHORING PENDING  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V48`  
**Pacote atual:** `simpleway-hnk@0.51.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots**.

Estados exclusivos atuais:

**853 MISSING + 0 AUTHORED + 155 VALIDATED + 0 FROZEN = 1.008**.

L01 Kether permanece **155/155 VALIDATED = 100%**. O Kether Seal é um marcador operacional de conclusão da Lesson 1 e não consome `Verbum`, `Logos` ou `Dialogos`.

## Corpus linguístico governado

- Master Lexicon recuperado: **33 formas totais**
- formas recuperadas ligadas ao Ciclo 1: **31**
- registry autorado: **20 CANDIDATE forms**
- ativos governados distintos: **51**
- owner autorado atual: **`@hnk/linguas@1.6.0-candidate`**

Fronteiras permanecem: `VANI` `WATCH + meaning=null`; `VANUVALI` `GATE + meaning=null`; `VAME` `GATE`; `PARAZAMI`, `SAROSARI`, `PARI`, `PA` continuam com suas autoridades recuperadas; Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

## L02 Chokhmah — Source Lock + teachability + pattern governance

Estado atual:

- target pedagógico: **139**
- Vocabulary target: **16**
- governed source references no escopo L02: **18**
- semantic teachable assets: **16/16**
- unresolved source observations: **2** — `VANUVALI`, `VANI`
- frases recuperadas: **0**
- communicative OPI intents approved: **10**
- scoped OPI patterns approved: **10**
- structural G-ID expansions complete: **10/10**
- unresolved transliteration units: **0**
- curriculum OPI AUTHORED: **0/10**
- curriculum OPI VALIDATED: **0/10**
- curriculum slots implementados: **0/139**

## OPI Pattern Review — APPROVED

`SWHNK-L02-OPI-PATTERN-REVIEW-HUMAN-BATCH-V1` aprovou os 10 padrões apenas como **course-scoped pattern candidates**.

A distribuição de evidência permanece visível:

- 1 reutilização direta de frame VALIDATED;
- 4 analogias fortes;
- 2 analogias ordinárias;
- 2 hipóteses escopadas novas;
- 1 composição integrada.

`EN VALI KUVAN KE` é reutilização direta de L01. `EN SAROSARI KE` permanece `HIGH`. `PA EN PARI KALOVALA KE` permanece `VERY_HIGH` e não cria sistema de passado, morfologia temporal ou regra universal de posição para `PA`.

Nenhuma autoridade linguística foi promovida e nenhuma gramática universal foi criada.

## G-ID expansion — COMPLETE STRUCTURAL ONLY

O artefato canônico `authoring/l02-opi-pattern-gid-expansion.v1.json` converteu os 10 padrões aprovados pela tabela segura do `@hnk/glyphs`.

- G-ID é autoridade estrutural;
- Candidate D visual não é autoridade;
- `TS` em `PITSA` permanece unidade atômica `G30`;
- 0 unidades de transliteração ficaram unresolved;
- a expansão G-ID por si só não cria OPI AUTHORED ou VALIDATED.

## Próximo gate

**`SWHNK-L02-OPI-AUTHORING-HUMAN-BATCH-V1`** — `AWAITING_EXPLICIT_HUMAN_APPROVAL`.

Se aprovado, o efeito projetado é:

- L02 OPI AUTHORED: **10**
- L02 OPI VALIDATED: **0**
- L02 slots implementados: **10**
- new surface forms: **0**
- authority promotions: **0**

Depois disso ainda será obrigatório um gate humano separado para validação dos OPI.

## Repositórios e ownership

- `tehknesolutions/simpleway-hnk`: currículo, authoring, validação e progresso;
- `tehknesolutions/codex-hnk/packages/hnk-linguas`: owner linguístico;
- `tehknesolutions/codex-hnk/packages/hnk-glyphs`: owner estrutural G01–G40;
- `hnk-english-app`: referência metodológica/UX apenas.

## CI

O pipeline inclui validadores específicos para Source Lock, semantic targets, rebinds, unresolved vocabulary, Pedagogy Source Contract, OPI Pattern Review e OPI Authoring Gate. O remoto só será chamado de verde após execução real bem-sucedida do runner; falhas sem steps expostos continuam classificadas como problema operacional do Actions, não como prova de regressão de conteúdo.
