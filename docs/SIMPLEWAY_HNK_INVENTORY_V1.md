# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-11  
**Estado:** L01 KETHER 155/155 VALIDATED · L02 CHOKHMAH SEMANTIC TARGETS APPROVED / EXACT REBIND REVIEW PENDING  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V44`  
**Pacote atual:** `simpleway-hnk@0.46.0`

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

Fronteiras permanecem: YA/ES semântica standalone não recuperada; VANI `WATCH` com `meaning=null`; VAME `GATE`; SARASALA/VAMAVALA/VAMAZAMU `WATCH`; ON `GATE`; KUVAN/KUON/VALA/NE e `AUTH-015..020` `CANDIDATE`; VAMUSARO não é literal `weekend`; Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

## L02 Chokhmah — Source Lock

Estado recuperado:

- target pedagógico: **139**
- Vocabulary target: **16**
- lexemas recuperados: **11**
- frases recuperadas: **0**
- autoridades: **5 FROZEN + 5 WATCH + 1 GATE**
- com significado master recuperado: **9**
- sem significado master: **2** — `VANUVALI`, `VANI`
- student cards: **0**
- teacher drills: **0**
- pedagogy authoring hold: **true**

Lexemas ligados a L02:

`TAYOVAN`, `KALOVALA`, `PAROVAN`, `PARAZAMI`, `VALI`, `SAROSARI`, `PARI`, `PA`, `VANUVALI`, `VANI`, `PITSA`.

## Cinco alvos semânticos — APPROVED

O gate `SWHNK-L02-SEMANTIC-TARGETS-HUMAN-BATCH-V1` foi aprovado apenas no eixo semântico:

1. `FIRST_PERSON_REFERENT`
2. `SECOND_PERSON_REFERENT`
3. `LOCATION_INTERROGATIVE`
4. `CONTENT_SELECTOR`
5. `QUESTION_OPERATOR`

Efeitos aplicados:

- semantic targets approved: **5/5**
- forms selected: **0**
- rebinds applied: **0**
- new surface forms: **0**
- new language assets: **0**
- authority promotions: **0**
- L02 curriculum slots implemented: **0**

A regra permanece **SEMANTICS_BEFORE_FORM_AND_REUSE_BEFORE_INVENTION**.

## Exact rebind review — preparado, NÃO aplicado

A revisão evidence-first consulta o owner linguístico `@hnk/linguas` e propõe somente extensão de escopo curricular:

- `AUTH-016 AN` → primeira pessoa
- `AUTH-017 EN` → segunda pessoa
- `AUTH-001 KUVAN` → variável locativa interrogativa
- `AUTH-018 KU` → seletor de conteúdo
- `AUTH-019 KE` → operador de pergunta

No registry observado (`1.5.0-candidate`), todos continuam `CANDIDATE` e com `lessons:[L01]`. Nenhuma mudança foi aplicada ao `codex-hnk` nesta etapa.

O antigo avanço concorrente que havia marcado esses rebinds como aplicados e criado um Vocabulary source map foi removido por exceder a aprovação humana disponível. Também foram removidas propostas downstream que dependiam desse avanço não autorizado.

`VANI` e `VANUVALI` continuam semanticamente não resolvidos em L02. A leitura escopada `VANI = morar/residir` da L01 não é generalizada.

## Próximo gate

**`SWHNK-L02-EXACT-REBIND-MAPPING-HUMAN-BATCH-V1`** — `AWAITING_EXPLICIT_HUMAN_APPROVAL`.

A aprovação, se ocorrer, autorizará somente a extensão de escopo dos cinco candidatos existentes para L02. Não autorizará automaticamente OPI, Story, Q&A, Structure, Vocabulary, Activation ou Review.

## Repositórios e ownership

- `tehknesolutions/simpleway-hnk`: currículo, authoring, validação e progresso;
- `tehknesolutions/codex-hnk/packages/hnk-linguas`: owner linguístico;
- `tehknesolutions/codex-hnk/packages/hnk-glyphs`: owner estrutural G01–G40;
- `hnk-english-app`: referência metodológica/UX apenas.

## CI

O GitHub Actions remoto ainda não pode ser chamado de verde sem uma execução real bem-sucedida do runner e dos validadores. O pipeline agora trava explicitamente a fronteira entre semantic approval e exact rebind approval.
