# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-11  
**Estado:** L01 KETHER 155/155 VALIDATED · L02 CHOKHMAH SOURCE TEACHABILITY 16/16 / PEDAGOGY SOURCE CONTRACT PENDING  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V46`  
**Pacote atual:** `simpleway-hnk@0.49.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

Estados exclusivos atuais:

**853 MISSING + 0 AUTHORED + 155 VALIDATED + 0 FROZEN = 1.008**.

L01 Kether permanece **155/155 VALIDATED = 100%**. O Kether Seal é um marcador operacional de conclusão da Lesson 1 e não consome `Verbum`, `Logos` ou `Dialogos`.

## Corpus linguístico governado

- Master Lexicon recuperado: **33 formas totais**
- formas recuperadas ligadas ao Ciclo 1: **31**
- registry autorado: **20 CANDIDATE forms**
- ativos governados distintos: **51**
- owner autorado atual: **`@hnk/linguas@1.6.0-candidate`**

Fronteiras permanecem: YA/ES semântica standalone não recuperada; VANI `WATCH` com `meaning=null`; VAME `GATE`; SARASALA/VAMAVALA/VAMAZAMU `WATCH`; ON `GATE`; KUVAN/KUON/VALA/NE e `AUTH-015..020` `CANDIDATE`; VAMUSARO não é literal `weekend`; Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

## L02 Chokhmah — Source Lock + teachability completa

Estado de fonte:

- target pedagógico: **139**
- Vocabulary target: **16**
- lexemas recuperados originalmente ligados a L02: **11**
- frases recuperadas: **0**
- semantic teachable assets: **16/16**
- governed source references no escopo L02: **18**
- unresolved source observations preservados: **2** — `VANUVALI`, `VANI`
- student cards: **0**
- teacher drills: **0**
- curriculum slots implementados: **0**
- pedagogy authoring hold: **true**

Os cinco alvos semânticos e respectivos rebinds de candidatos já estão aplicados:

- `AUTH-016 AN` → primeira pessoa
- `AUTH-017 EN` → segunda pessoa
- `AUTH-001 KUVAN` → variável locativa interrogativa
- `AUTH-018 KU` → seletor de conteúdo
- `AUTH-019 KE` → operador de pergunta

Todos continuam `CANDIDATE`; a operação foi apenas extensão de escopo para L02.

## Unresolved Vocabulary — APPROVED + APPLIED

O gate `SWHNK-L02-UNRESOLVED-VOCABULARY-HUMAN-BATCH-V1` foi aprovado e aplicado com duas decisões centrais:

1. preservar `VANUVALI` (`GATE`, `meaning=null`) e `VANI` (`WATCH`, `meaning=null`) como evidência de fonte não ensinável;
2. rebindar dois ativos recuperados `FROZEN` para o escopo curricular de L02:
   - `LEX-003 VALIVAN` — **escritório** — `WORK_PLACE`
   - `LEX-004 PARAZAMO` — **escola / domínio de estudo** — `EDUCATION_PLACE`

Efeito:

- governed source references no escopo L02: **18**
- semantic teachable assets: **16/16**
- remaining teachable gap: **0**
- new surface forms: **0**
- new unique language assets: **0**
- authority promotions: **0**
- curriculum slots implemented: **0**

Os dois rebinds aumentam a cobertura no escopo da lição, mas não o total global de ativos distintos, que permanece em **51**.

## Pedagogy Source Contract — preparado, NÃO aprovado

`SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-V1` lista exatamente os **16 ativos ensináveis** e propõe **10 intents comunicativos OPI** para Chokhmah.

O contrato mantém uma trava explícita:

- HNK sentences authored: **0**
- sentence patterns approved: **0**
- sentence pattern policy: **NOT_AUTHORIZED_YET**
- curriculum slots implemented: **0**

Ele não cria ordem de palavras, cópula, preposição, concordância, sistema de tempo nem gramática interrogativa produtiva. `PA` permanece apenas âncora lexical recuperada de passado (“ontem”), e `PITSA` permanece exemplo concreto controlado.

## Próximo gate

**`SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-HUMAN-BATCH-V1`** — `AWAITING_EXPLICIT_HUMAN_APPROVAL`.

A aprovação futura autoriza apenas:

- o conjunto fonte ensinável de 16 ativos;
- os 10 intents comunicativos;
- preservação explícita das autoridades WATCH/CANDIDATE;
- preparação posterior de um gate separado de padrões de frase OPI.

Não autoriza automaticamente OPI, Story, Q&A, Structure, Vocabulary cards, Activation ou Review.

## Repositórios e ownership

- `tehknesolutions/simpleway-hnk`: currículo, authoring, validação e progresso;
- `tehknesolutions/codex-hnk/packages/hnk-linguas`: owner linguístico;
- `tehknesolutions/codex-hnk/packages/hnk-glyphs`: owner estrutural G01–G40;
- `hnk-english-app`: referência metodológica/UX apenas.

## CI

O pipeline inclui validadores específicos para Source Lock, semantic targets, candidate rebinds, unresolved vocabulary e Pedagogy Source Contract. O estado remoto só será chamado de verde após uma execução real bem-sucedida do runner; falhas sem steps expostos continuam classificadas como problema operacional do Actions, não como prova de regressão de conteúdo.
