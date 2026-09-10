# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + L01 VOCABULARY 32/32 AUTHORED-OR-BETTER + FINAL 8 PENDING VALIDATION  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V38`  
**Pacote atual:** `simpleway-hnk@0.41.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

## L01 — núcleo validado

- Teacher Notes: **3/3 VALIDATED**;
- OPI: **10/10 VALIDATED**;
- Stories: **5/5 VALIDATED**;
- Q&A: **4/4 VALIDATED**;
- Structure Headers: **2/2 VALIDATED**;
- Structures: **5/5 VALIDATED**;
- Activation: **72/72 VALIDATED**;
- Vocabulary: **24/32 VALIDATED + 8/32 AUTHORED**.

As validações permanecem escopadas ao curso v1.1 e não promovem automaticamente autoridade linguística histórica.

## L01 Vocabulary — 32/32 implementados

Os oito gaps de Vocabulary passaram pelo fluxo `SEMANTICS_BEFORE_FORM` e pela revisão evidence-first. O mapeamento foi aprovado e aplicado à autoria:

- `VOC-025`: `KALA` → PERSONAL_NAME_DOMAIN → `AUTH-015 CANDIDATE`;
- `VOC-026`: `AN` → FIRST_PERSON_REFERENT → `AUTH-016 CANDIDATE`;
- `VOC-027`: `EN` → SECOND_PERSON_REFERENT → `AUTH-017 CANDIDATE`;
- `VOC-028`: `KU` → CONTENT_SELECTOR → `AUTH-018 CANDIDATE`;
- `VOC-029`: `KE` → QUESTION_OPERATOR → `AUTH-019 CANDIDATE`;
- `VOC-030`: `VANI` → RESIDENCE_LIVE → binding L01 sobre `LEX-031`, mantendo `WATCH` e `meaning=null` no Master Lexicon;
- `VOC-031`: `VAME` → PREFERENCE_LIKE → rebind L01 sobre `LEX-025`, mantendo `GATE`;
- `VOC-032`: `ZAMI` → SPEAK_LANGUAGE_USE → `AUTH-020 CANDIDATE`.

Os seis `AUTH-015..020` são **novas entradas canônicas autoradas**, mas não novas formas de superfície: `KALA/AN/EN/KU/KE/ZAMI` já eram observados em material recuperado. A semântica standalone continua sendo autoria/inferência governada, não recuperação histórica. `VANI` e `VAME` permanecem no Master Lexicon recuperado e não foram duplicados.

Fronteiras preservadas: `VANI=WATCH` com significado master `null`; `VAME=GATE`; `KU` não recebe uma tradução WH universal; `KE` não estabelece sintaxe interrogativa universal; `AN/EN` não criam paradigma pronominal global; nenhuma autoridade linguística foi promovida.

Gate final preparado: `SWHNK-L01-VOCABULARY-025-032-HUMAN-BATCH-V1`, status **AWAITING_EXPLICIT_HUMAN_VALIDATION**.

## Progresso L01

L01 target: **155 slots**.

- total authored-or-better: **133/155 = 85.8065%**;
- total VALIDATED: **125/155 = 80.6452%**;
- Vocabulary authored-or-better: **32/32 = 100%**;
- Vocabulary VALIDATED: **24/32 = 75%**;
- slots realmente não implementados: **22**, todos em Review;
- slots implementados aguardando validação: **8**, todos em Vocabulary.

## Progresso Ciclo 1

Estados exclusivos:

**875 MISSING + 8 AUTHORED + 125 VALIDATED + 0 FROZEN = 1.008**.

Cumulativo authored-or-better: **133/1.008 = 13.1944%**.

Historical evidence: **82/1.008 = 8.1349%**, em eixo independente da implementação atual.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado `@hnk/linguas/authored`: **20 CANDIDATE forms**. Os seis novos registros são `KALA`, `AN`, `EN`, `KU`, `KE` e `ZAMI` (`AUTH-015..020`).

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **51/144 = 35.4167%**. Esses proxies não equivalem à conclusão dos 144 slots curriculares de Vocabulary.

## Fronteiras e CI

`hnk-english-app` permanece referência metodológica/arquitetural, não owner do corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

O workflow remoto está configurado, mas os runs recentes falharam antes de expor qualquer step (`steps=[]`), inclusive após rerun controlado. Portanto o CI não está verde e também não há evidência de que `npm test` tenha sido efetivamente executado pelo runner nesses runs.
