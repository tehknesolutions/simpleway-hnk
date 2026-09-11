# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-11  
**Estado:** L01 KETHER 155/155 VALIDATED · SEALED · L02 CHOKHMAH SOURCE LOCK AUDITED / PEDAGOGY HOLD  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V41`  
**Pacote atual:** `simpleway-hnk@0.43.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

Estados exclusivos atuais do Ciclo 1:

**853 MISSING + 0 AUTHORED + 155 VALIDATED + 0 FROZEN = 1.008**.

Cumulativo authored-or-better e validated-or-better: **155/1.008 = 15.3770%**.

Historical evidence: **82/1.008 = 8.1349%**, em eixo independente da implementação atual.

## L01 Kether — concluída e selada

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

O contrato `@hnk/linguas/src/cycle1.mjs` foi reconciliado para o estado V37+: 20 candidatos autorados, 51 ativos governados, gap proxy governado 93 e ratio 0.3542. O teste de cobertura também passou a fixar explicitamente o estado L02: 11 lexemas, 0 candidatos e 0 frases recuperadas.

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

O registro separado `SWHNK-L01-KETHER-VALIDATED-COMPLETION-V1` fixa L01 em **155/155 VALIDATED** e preserva a mesma fronteira.

## L02 Chokhmah — Source Lock auditado

O gate `L02_CHOKHMAH_SOURCE_LOCK_AUDIT_V1` foi executado e materializado em `curriculum/cycle-01/L02-chokhmah/source-lock/l02-source-lock-audit.v1.json`.

Estado auditado:

- `language_bindings`: **11**
- `recovered_phrases`: **0**
- autoridades: **5 FROZEN + 5 WATCH + 1 GATE**
- formas com significado mestre recuperado: **9**
- formas sem significado mestre recuperado: **2** (`VANUVALI`, `VANI`)
- `authored_candidates` ligados a L02: **0**
- Vocabulary derivado da L02: **16 slots**
- proxy recuperado: **11/16 = 68,75%**
- gap proxy: **5**
- `student_cards`: **0**
- `teacher_drills`: **0**

Lexemas recuperados ligados a L02:

`TAYOVAN`, `KALOVALA`, `PAROVAN`, `PARAZAMI`, `VALI`, `SAROSARI`, `PARI`, `PA`, `VANUVALI`, `VANI`, `PITSA`.

A pedagogia permanece em **HOLD**. O gap de cinco ativos não autoriza criação automática de cinco palavras: primeiro devem ser definidos semanticamente e governados, recuperados de fontes adicionais ou satisfeitos por rebind explicitamente aprovado.

Também fica proibido importar silenciosamente para L02 a leitura `VANI = morar/residir` usada de forma escopada na L01; o Master Lexicon continua com `meaning=null`.

Hebraico Bíblico, Grego Koiné e Esperanto permanecem **camadas de referência e comparação para a engenharia do HNK**, não compromissos de cursos independentes da SimpleWay Academy.

Próximo gate: **`DEFINE_L02_SEMANTIC_CURRICULUM_TARGETS_FROM_RECOVERED_ASSETS_AND_APPROVED_HNK_LANGUAGE_NEEDS`**.

## Repositórios e ownership

- `tehknesolutions/simpleway-hnk`: currículo, authoring, validação e progresso;
- `tehknesolutions/codex-hnk/packages/hnk-linguas`: owner linguístico;
- `tehknesolutions/codex-hnk/packages/hnk-glyphs`: owner estrutural G01–G40;
- `hnk-english-app`: referência metodológica/UX apenas.

## CI

O GitHub Actions remoto ainda não pode ser chamado de verde. Runs recentes continuam concluindo `failure` antes de expor execução normal dos steps do job; portanto o estado remoto não prova execução bem-sucedida de `npm test` nem identifica uma asserção específica como causa.

O workflow já contém gates nomeados para Vocabulary, Reviews, fechamento de Kether e Source Lock de Chokhmah, de modo que assim que a infraestrutura do runner voltar a executar steps teremos diagnóstico granular imediato.
