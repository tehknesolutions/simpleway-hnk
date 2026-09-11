# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-11  
**Estado:** L01 KETHER 155/155 IMPLEMENTED · 133 VALIDATED · REVIEW 22 AUTHORED PENDING VALIDATION  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V40`  
**Pacote atual:** `simpleway-hnk@0.42.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

## L01 Kether

- Teacher Notes: **3/3 VALIDATED**
- OPI: **10/10 VALIDATED**
- Stories: **5/5 VALIDATED**
- Q&A: **4/4 VALIDATED**
- Structure Headers: **2/2 VALIDATED**
- Structures: **5/5 VALIDATED**
- Vocabulary: **32/32 VALIDATED**
- Activation: **72/72 VALIDATED**
- Review: **22/22 AUTHORED, 0/22 VALIDATED**

L01 está **155/155 authored-or-better = 100% implementada**. O estado atual é **133 VALIDATED + 22 AUTHORED**; o único gate restante da implementação da Lesson 1 é a validação dos 22 Review.

## Vocabulary — 32/32 VALIDATED

O gap-8 passou por semântica antes de forma, mapping evidence-first, aplicação à autoria e validação curricular explícita.

Os oito slots finais são:

- `KALA` → `AUTH-015 CANDIDATE`
- `AN` → `AUTH-016 CANDIDATE`
- `EN` → `AUTH-017 CANDIDATE`
- `KU` → `AUTH-018 CANDIDATE`
- `KE` → `AUTH-019 CANDIDATE`
- `VANI` → binding L01 sobre `LEX-031`, mantendo `WATCH` e Master Lexicon `meaning=null`
- `VAME` → rebind L01 sobre `LEX-025`, mantendo `GATE`
- `ZAMI` → `AUTH-020 CANDIDATE`

Os seis `AUTH-015..020` são novas entradas canônicas autoradas, mas não novas formas de superfície. A validação curricular não cria recuperação histórica standalone nem promove autoridade linguística.

## Review — 22/22 AUTHORED

A lane reconciliada usa apenas payloads já validados da L01:

- `REV-001..020`: dois Review para cada OPI validado 001..010 — `QUESTION_RECALL` + `RESPONSE_RECALL`;
- `REV-021..022`: dois `INTEGRATIVE_INTERVIEW`, compostos somente por perguntas e contratos de resposta já validados.

Foi corrigido um mismatch da primeira versão do Review: `EN ZAMI HENUVOKODAN KE` não é mais tratado como `L01-OPI-003`. O OPI 003 canônico permanece `EN KU SARASALA KE`, no contexto de idade.

Fronteiras preservadas:

- YA e ES permanecem semanticamente não resolvidos dentro da fórmula recuperada do OPI 001;
- VANI permanece `WATCH`, com `meaning=null` no Master Lexicon;
- VAME permanece `GATE`;
- SARASALA, VAMAVALA e VAMAZAMU permanecem `WATCH`;
- ON permanece `GATE`;
- KUVAN, KUON, VALA, NE e AUTH-015..020 permanecem `CANDIDATE`;
- `VAMUSARO` permanece “descanso / período de lazer”, nunca é promovido a tradução literal de “weekend”;
- nenhum `DO`, `WITH` ou WH universal é criado.

Gate preparado: `SWHNK-L01-REVIEW-22-HUMAN-BATCH-V1` — **AWAITING_EXPLICIT_HUMAN_VALIDATION**.

Se aprovado, L01 chega a **155/155 VALIDATED**.

## Progresso Ciclo 1

Estados exclusivos:

**853 MISSING + 22 AUTHORED + 133 VALIDATED + 0 FROZEN = 1.008**.

Cumulativo authored-or-better: **155/1.008 = 15.3770%**.

Historical evidence: **82/1.008 = 8.1349%**, em eixo independente da implementação atual.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado `@hnk/linguas/authored`: **20 CANDIDATE forms**.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **51/144 = 35.4167%**. Esses proxies não equivalem à conclusão dos 144 slots curriculares de Vocabulary.

## Fronteiras e CI

`hnk-english-app` permanece referência metodológica/arquitetural, não owner do corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

O CI remoto não deve ser descrito como verde sem uma execução real bem-sucedida do runner e dos validadores.
