# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-11  
**Estado:** L01 KETHER 155/155 VALIDATED · CURRICULUM COMPLETE · L02 CHOKHMAH SOURCE LOCK NEXT  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V41`  
**Pacote atual:** `simpleway-hnk@0.43.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

Estados exclusivos atuais do Ciclo 1:

**853 MISSING + 0 AUTHORED + 155 VALIDATED + 0 FROZEN = 1.008**.

Cumulativo authored-or-better e validated-or-better: **155/1.008 = 15.3770%**.

Historical evidence: **82/1.008 = 8.1349%**, em eixo independente da implementação atual.

## L01 Kether — concluída

- Teacher Notes: **3/3 VALIDATED**
- OPI: **10/10 VALIDATED**
- Stories: **5/5 VALIDATED**
- Q&A: **4/4 VALIDATED**
- Structure Headers: **2/2 VALIDATED**
- Structures: **5/5 VALIDATED**
- Vocabulary: **32/32 VALIDATED**
- Activation: **72/72 VALIDATED**
- Review: **22/22 VALIDATED**

Resultado: **155/155 VALIDATED = 100%**.

Não há slots `MISSING` nem `AUTHORED` pendentes em L01.

## Review — 22/22 VALIDATED

A lane reconciliada usa apenas material já validado da L01:

- `REV-001..020`: dois Review para cada OPI 001..010 — `QUESTION_RECALL` + `RESPONSE_RECALL`;
- `REV-021..022`: dois `INTEGRATIVE_INTERVIEW`, compostos somente de perguntas e contratos de resposta previamente validados.

A validação dos Review não criou palavras, ativos linguísticos, gramática universal, claims históricos nem promoções de autoridade.

O mismatch da primeira versão continua corrigido: `EN ZAMI HENUVOKODAN KE` não é tratado como OPI 003. O OPI 003 permanece `EN KU SARASALA KE`, no contexto de idade.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado `@hnk/linguas/authored`: **20 CANDIDATE forms**.

Ativos governados distintos: **51**. Proxy de ativos governados: **51/144 = 35.4167%**. Proxy recuperado: **31/144 = 21.5278%**. Esses proxies não equivalem à conclusão dos 144 slots curriculares de Vocabulary.

Fronteiras preservadas:

- YA e ES: semântica standalone ainda não recuperada;
- VANI: `WATCH`, Master Lexicon `meaning=null`;
- VAME: `GATE`;
- SARASALA, VAMAVALA, VAMAZAMU: `WATCH`;
- ON: `GATE`;
- KUVAN, KUON, VALA, NE e `AUTH-015..020`: `CANDIDATE`;
- VAMUSARO: “descanso / período de lazer”, nunca tradução literal automática de “weekend”;
- nenhum `DO`, `WITH` ou WH universal foi criado;
- Candidate D visual permanece `PREPRODUCTION_NOT_OFFICIAL`.

## Kether Seal — classificação correta

`SWHNK-L01-KETHER-SEAL-V1` é um **marcador operacional de conclusão curricular da Lesson 1**.

Ele não é um dos três selos finais do Ciclo 1 e não consome seus slots. Permanecem reservados:

- `Verbum`
- `Logos`
- `Dialogos`

O registro separado `SWHNK-L01-KETHER-VALIDATED-COMPLETION-V1` também fixa essa fronteira.

## L02 Chokhmah — próxima entrada

A entrada de L02 é `SOURCE_LOCK_FIRST`.

Estado atual conhecido pelo manifest:

- `status`: `LEXICON_RECOVERED_PEDAGOGY_SCAFFOLD`
- `language_bindings`: **11**
- `recovered_phrases`: **0**
- `student_cards`: **0**
- `teacher_drills`: **0**
- conteúdo pedagógico congelado: **false**

Próximo gate: **`L02_CHOKHMAH_SOURCE_LOCK_AUDIT_V1`**.

A regra é auditar primeiro os 11 bindings recuperados e a proveniência das fontes antes de qualquer autoria de OPI, Vocabulary, Activation ou Review para Chokhmah.

## Repositórios e ownership

- `tehknesolutions/simpleway-hnk`: currículo, authoring, validação e progresso;
- `tehknesolutions/codex-hnk/packages/hnk-linguas`: owner linguístico;
- `tehknesolutions/codex-hnk/packages/hnk-glyphs`: owner estrutural G01–G40;
- `hnk-english-app`: referência metodológica/UX apenas.

## CI

O GitHub Actions remoto ainda não pode ser chamado de verde. Runs recentes têm falhado antes de expor steps normais do job; portanto não há evidência remota suficiente para dizer que `npm test` executou com sucesso ou que uma asserção específica falhou.
