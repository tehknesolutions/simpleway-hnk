# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-11  
**Estado:** L01 KETHER 155/155 VALIDATED · L02 CHOKHMAH EXACT REBINDS APPLIED / UNRESOLVED VOCABULARY GATE PENDING  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V45`  
**Pacote atual:** `simpleway-hnk@0.48.0`

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

## L02 Chokhmah — Source Lock e reuso governado

Estado recuperado:

- target pedagógico: **139**
- Vocabulary target: **16**
- lexemas recuperados originalmente ligados a L02: **11**
- frases recuperadas: **0**
- autoridades recuperadas: **5 FROZEN + 5 WATCH + 1 GATE**
- com significado master recuperado entre os 11: **9**
- sem significado master: **2** — `VANUVALI`, `VANI`
- student cards: **0**
- teacher drills: **0**
- pedagogy authoring hold: **true**

Lexemas recuperados ligados a L02:

`TAYOVAN`, `KALOVALA`, `PAROVAN`, `PARAZAMI`, `VALI`, `SAROSARI`, `PARI`, `PA`, `VANUVALI`, `VANI`, `PITSA`.

## Cinco alvos semânticos — APPROVED + MAPPED

O gate semântico aprovou:

1. `FIRST_PERSON_REFERENT`
2. `SECOND_PERSON_REFERENT`
3. `LOCATION_INTERROGATIVE`
4. `CONTENT_SELECTOR`
5. `QUESTION_OPERATOR`

O Exact Rebind Mapping foi aprovado e aplicado apenas como extensão de escopo curricular:

- `AUTH-016 AN` → L01 + L02
- `AUTH-017 EN` → L01 + L02
- `AUTH-001 KUVAN` → L01 + L02
- `AUTH-018 KU` → L01 + L02
- `AUTH-019 KE` → L01 + L02

Efeitos:

- forms selected: **5/5**
- scoped rebinds applied: **5**
- novos surface forms: **0**
- novos language assets: **0**
- authority promotions: **0**
- historical recovery claims: **0**
- L02 curriculum slots implemented: **0**

O `@hnk/linguas` agora reporta **11 recovered lexemes + 5 scoped authored candidates = 16 governed L02 language assets**.

A regra permanece **SEMANTICS_BEFORE_FORM_AND_REUSE_BEFORE_INVENTION**.

## Teachability gap — 14/16

Os 16 ativos governados não equivalem automaticamente a 16 Vocabulary ensináveis.

`VANUVALI` (`GATE`) e `VANI` (`WATCH`) continuam com `meaning=null`. Portanto, o conjunto atual possui:

- governed assets: **16**
- semantic teachable assets: **14**
- unresolved source assets: **2**
- remaining teachable gap: **2**

A leitura escopada `VANI = morar/residir` usada em L01 não é promovida para significado histórico/master de L02.

## Unresolved Vocabulary Review — recomendação preparada, NÃO aplicada

O gate `SWHNK-L02-UNRESOLVED-VOCABULARY-HUMAN-BATCH-V1` recomenda preservar `VANUVALI` e `VANI` como evidência de fonte não ensinável e completar o conjunto curricular de L02 com dois rebinds recuperados e de maior autoridade:

- `LEX-003 VALIVAN` — **escritório** — `FROZEN` — função `WORK_PLACE`
- `LEX-004 PARAZAMO` — **escola / domínio de estudo** — `FROZEN` — função `EDUCATION_PLACE`

Esses dois são preferidos a `SARU`/`TA` neste gate porque já são recuperados, FROZEN, se encaixam diretamente no centro semântico urbano/estudo/trabalho de Chokhmah e exigem menos microgramática nova.

Se aprovados, o efeito projetado será:

- semantic teachable assets: **16/16**
- unresolved source forms preservados: **2**
- new surface forms: **0**
- new language assets: **0**
- authority promotions: **0**
- curriculum slots implemented: **0**

Ou seja: **16/16 source-teachable não significa 16/16 curricular VALIDATED**. A pedagogia continua separada.

## Próximo gate

**`SWHNK-L02-UNRESOLVED-VOCABULARY-HUMAN-BATCH-V1`** — `AWAITING_EXPLICIT_HUMAN_APPROVAL`.

A aprovação autorizará somente:

- preservar `VANUVALI` e `VANI` unresolved;
- rebind curricular de `VALIVAN` e `PARAZAMO` para L02;
- preparar o próximo `L02 PEDAGOGY SOURCE CONTRACT`.

Não autorizará automaticamente OPI, Story, Q&A, Structure, Vocabulary cards, Activation ou Review.

## Repositórios e ownership

- `tehknesolutions/simpleway-hnk`: currículo, authoring, validação e progresso;
- `tehknesolutions/codex-hnk/packages/hnk-linguas`: owner linguístico;
- `tehknesolutions/codex-hnk/packages/hnk-glyphs`: owner estrutural G01–G40;
- `hnk-english-app`: referência metodológica/UX apenas.

## CI

O workflow foi reconciliado para chamar os scripts reais `validate:l02-rebind-review` e `validate:l02-unresolved-vocabulary`. O run remoto mais recente ainda termina em `failure` sem steps expostos pelo backend do Actions, então esse estado remoto continua sem evidência de uma asserção específica quebrando; não é chamado de verde até existir execução normal bem-sucedida.
