# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + COMMUNICATIVE CORE COMPLETE + VOCABULARY 24/32 VALIDATED + GAP-8 SEMANTICS APPROVED + FORM MAPPING PROPOSED  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V37`  
**Pacote atual:** `simpleway-hnk@0.40.0`

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
- Vocabulary atualmente preenchido: **24/24 VALIDATED**.

As validações permanecem escopadas ao curso v1.1 e não promovem automaticamente autoridade linguística histórica.

## L01 Vocabulary — 24/32 VALIDATED

`VOC-001..024` estão VALIDATED. `VOC-025..032` permanecem `MISSING_GOVERNED_ASSET`.

Os oito alvos semânticos faltantes foram agora **aprovados** sob a regra `SEMANTICS_BEFORE_FORM`: PERSONAL_NAME_DOMAIN, FIRST_PERSON_REFERENT, SECOND_PERSON_REFERENT, CONTENT_SELECTOR, QUESTION_OPERATOR, RESIDENCE_LIVE, PREFERENCE_LIKE e SPEAK_LANGUAGE_USE.

A aprovação semântica não selecionou formas nem alterou os oito slots.

## Gap 8 — revisão evidence-first de formas

O mapping review propõe, mas ainda não aplica:

- `KALA` → PERSONAL_NAME_DOMAIN → novo `AUTH-015 CANDIDATE`;
- `AN` → FIRST_PERSON_REFERENT → novo `AUTH-016 CANDIDATE`;
- `EN` → SECOND_PERSON_REFERENT → novo `AUTH-017 CANDIDATE`;
- `KU` → CONTENT_SELECTOR → novo `AUTH-018 CANDIDATE`;
- `KE` → QUESTION_OPERATOR → novo `AUTH-019 CANDIDATE`;
- `VANI` → RESIDENCE_LIVE → binding semântico escopado sobre `LEX-031`, mantendo `WATCH` e `meaning=null` no Master Lexicon;
- `VAME` → PREFERENCE_LIKE → rebind curricular L01 sobre `LEX-025`, mantendo `GATE`;
- `ZAMI` → SPEAK_LANGUAGE_USE → novo `AUTH-020 CANDIDATE`.

A evidência vem das frases recuperadas, dos OPI já validados e das entradas recuperadas existentes. Para `KALA/AN/EN/KU/KE/ZAMI`, a semântica standalone proposta continua sendo **autoria/inferência governada**, não recuperação histórica. `VANI` e `VAME` não serão duplicados no authored registry.

Gate preparado: `SWHNK-L01-VOCABULARY-GAP-8-FORM-MAPPING-HUMAN-BATCH-V1`.

Se aprovado e aplicado posteriormente, o registry autorado projetado sobe de **14 → 20 CANDIDATEs** e o inventário de ativos governados distintos de **45 → 51**. Essa projeção não é o estado canônico atual.

## Progresso L01

L01 target: **155 slots**.

- total authored-or-better: **125/155 = 80.6452%**;
- total VALIDATED: **125/155 = 80.6452%**;
- Vocabulary VALIDATED: **24/32**;
- Vocabulary MISSING: **8/32**;
- remaining missing/unimplemented total: **30**.

Restam **8 Vocabulary + 22 Review**.

## Progresso Ciclo 1

Estados exclusivos:

**883 MISSING + 0 AUTHORED + 125 VALIDATED + 0 FROZEN = 1.008**.

Cumulativo authored-or-better: **125/1.008 = 12.4008%**.

Historical evidence: **82/1.008 = 8.1349%**, em eixo independente da implementação atual.

## Corpus linguístico governado

Estado canônico atual, antes do mapping gap-8:

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado `@hnk/linguas/authored`: **14 CANDIDATE forms** — `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **45/144 = 31.25%**. Esses proxies não equivalem à conclusão dos 144 slots curriculares de Vocabulary.

## Fronteiras

`hnk-english-app` permanece referência metodológica/arquitetural, não owner do corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

CI remoto continua não comprovado até existir execução real de runner.
