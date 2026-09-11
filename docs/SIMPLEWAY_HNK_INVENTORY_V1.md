# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-11  
**Estado:** L01 KETHER 155/155 VALIDATED · L02 CHOKHMAH PEDAGOGY SOURCE APPROVED / OPI PATTERN REVIEW PENDING  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V47`  
**Pacote atual:** `simpleway-hnk@0.50.0`

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

Estado de fonte/governança:

- target pedagógico: **139**
- Vocabulary target: **16**
- lexemas recuperados originalmente ligados a L02: **11**
- recovered curriculum rebinds: **2** — `VALIVAN`, `PARAZAMO`
- scoped authored candidates: **5** — `AN`, `EN`, `KUVAN`, `KU`, `KE`
- governed source references no escopo L02: **18**
- semantic teachable assets: **16/16**
- unresolved source observations: **2** — `VANUVALI`, `VANI`
- frases recuperadas: **0**
- curriculum slots implementados: **0**
- pedagogy authoring hold: **true**

`VANUVALI` permanece `GATE + meaning=null`; `VANI` permanece `WATCH + meaning=null`. A leitura escopada `VANI = morar/residir` usada em L01 não foi generalizada para L02.

## Pedagogy Source Contract — APPROVED

O gate `SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-HUMAN-BATCH-V1` aprovou:

- o conjunto de **16 assets ensináveis**;
- **10 intents comunicativos OPI**;
- reutilização escopada de `AN`, `EN`, `KUVAN`, `KU` e `KE` sem expandir gramática universal;
- `PA` apenas como âncora lexical recuperada de “ontem”;
- `PITSA` apenas como exemplo concreto controlado;
- preservação explícita dos metadados `WATCH` e `CANDIDATE`.

Efeitos aplicados:

- HNK sentences authored: **0**
- sentence patterns approved: **0**
- curriculum slots implemented: **0**
- new surface forms: **0**
- authority promotions: **0**

Portanto, aprovação de intent **não cria gramática de sentença**.

## OPI Pattern Review — preparado, NÃO aprovado

`SWHNK-L02-OPI-PATTERN-REVIEW-V1` contém 10 padrões candidatos evidence-first. Eles são apenas `COURSE_PATTERN_CANDIDATE_ONLY`, não gramática histórica ou universal.

Distribuição de evidência:

- 1 reutilização direta de frame já VALIDATED;
- 4 analogias fortes;
- 2 analogias ordinárias;
- 2 hipóteses escopadas novas;
- 1 composição integrada.

Entre os exemplos estão `EN VALI KUVAN KE` como reutilização direta e `PA EN PARI KALOVALA KE` como hipótese de risco `VERY_HIGH`. Nenhum dos 10 padrões está aprovado atualmente.

A política de glifos também permanece travada: G-ID expansion só pode ocorrer **depois** da aprovação humana do pattern gate e **antes** de qualquer OPI L02 virar AUTHORED. Candidate D visual continua sem autoridade canônica.

## Próximo gate

**`SWHNK-L02-OPI-PATTERN-REVIEW-HUMAN-BATCH-V1`** — `AWAITING_EXPLICIT_HUMAN_APPROVAL`.

Esse gate futuro decidirá sobre os 10 padrões escopados. Mesmo se aprovado, ele não cria automaticamente gramática universal nem marca OPI como VALIDATED; primeiro será necessária expansão estrutural por G-IDs e um batch de authoring curricular separado.

## Repositórios e ownership

- `tehknesolutions/simpleway-hnk`: currículo, authoring, validação e progresso;
- `tehknesolutions/codex-hnk/packages/hnk-linguas`: owner linguístico;
- `tehknesolutions/codex-hnk/packages/hnk-glyphs`: owner estrutural G01–G40;
- `hnk-english-app`: referência metodológica/UX apenas.

## CI

O pipeline inclui validadores específicos para Source Lock, semantic targets, rebinds, unresolved vocabulary, Pedagogy Source Contract e OPI Pattern Review. O remoto só será chamado de verde após execução real bem-sucedida do runner; falhas sem steps expostos continuam classificadas como problema operacional do Actions, não como prova de regressão de conteúdo.
