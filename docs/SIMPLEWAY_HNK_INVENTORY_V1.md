# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-11  
**Estado:** L01 KETHER 155/155 VALIDATED · L02 CHOKHMAH SOURCE LOCK AUDITED / PEDAGOGY HOLD  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V42`  
**Pacote atual:** `simpleway-hnk@0.44.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

Estados exclusivos atuais:

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

Resultado: **155/155 VALIDATED = 100%**. Não há slots `MISSING` nem `AUTHORED` pendentes em L01.

A lane Review reconciliada contém 20 atividades ligadas diretamente aos OPI 001–010 e 2 entrevistas integrativas, todas compostas apenas de material já validado. O antigo mismatch que ligava `EN ZAMI HENUVOKODAN KE` ao OPI 003 foi removido; OPI 003 permanece o cartão de idade `EN KU SARASALA KE`.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado `@hnk/linguas/authored`: **20 CANDIDATE forms**.

Ativos governados distintos: **51**. Proxy governado: **51/144 = 35.4167%**. Proxy recuperado: **31/144 = 21.5278%**. Esses proxies não equivalem à conclusão dos 144 slots curriculares de Vocabulary.

Fronteiras preservadas:

- YA e ES: semântica standalone não recuperada;
- VANI: `WATCH`, Master Lexicon `meaning=null`;
- VAME: `GATE`;
- SARASALA, VAMAVALA, VAMAZAMU: `WATCH`;
- ON: `GATE`;
- KUVAN, KUON, VALA, NE e `AUTH-015..020`: `CANDIDATE`;
- VAMUSARO: “descanso / período de lazer”, não tradução literal automática de “weekend”;
- nenhum `DO`, `WITH` ou WH universal criado;
- Candidate D visual: `PREPRODUCTION_NOT_OFFICIAL`.

## Kether Seal — fronteira canônica

`SWHNK-L01-KETHER-SEAL-V1` é `LESSON_OPERATIONAL_CURRICULUM_COMPLETION_MARKER`.

Ele **não é** um dos três selos finais do Ciclo 1 e não consome seus slots. Permanecem reservados:

- `Verbum`
- `Logos`
- `Dialogos`

O registro `SWHNK-L01-KETHER-VALIDATED-COMPLETION-V1` fixa a mesma fronteira.

## L02 Chokhmah — Source Lock auditado

Audit: `SWHNK-L02-CHOKHMAH-SOURCE-LOCK-AUDIT-V1`.

Estado atual:

- target pedagógico L02: **139**
- Vocabulary target: **16**
- lexemas recuperados: **11**
- frases recuperadas: **0**
- candidatos autorados ligados a L02: **0**
- autoridades: **5 FROZEN + 5 WATCH + 1 GATE**
- com significado master recuperado: **9**
- sem significado master: **2** — `VANUVALI`, `VANI`
- proxy recuperado: **11/16 = 68,75%**
- gap proxy: **5**
- student cards: **0**
- teacher drills: **0**
- authoring hold: **true**
- source canon: **UNDEFINED — must be approved before content production**

Lexemas ligados a L02:

`TAYOVAN`, `KALOVALA`, `PAROVAN`, `PARAZAMI`, `VALI`, `SAROSARI`, `PARI`, `PA`, `VANUVALI`, `VANI`, `PITSA`.

A pedagogia continua em **HOLD**. O gap de cinco não autoriza “inventar cinco palavras”. Antes de qualquer forma ou exercício, o curso precisa decidir semanticamente quais funções/conceitos L02 realmente requer.

Também fica proibido importar silenciosamente para L02 a leitura escopada `VANI = morar/residir` da L01; o Master Lexicon continua com `meaning=null`.

Hebraico Bíblico, Grego Koiné e Esperanto permanecem camadas de referência e comparação para a engenharia do HNK, não compromissos de cursos independentes.

## Próximo gate

**`DEFINE_L02_SEMANTIC_CURRICULUM_TARGETS_FROM_RECOVERED_ASSETS_AND_APPROVED_HNK_LANGUAGE_NEEDS`**

Regra: `SEMANTICS_BEFORE_FORM_AND_PEDAGOGY`.

Nenhum OPI, Story, Q&A, Structure, Vocabulary-gap form, Activation ou Review de L02 deve ser autorado antes desse gate.

## Repositórios e ownership

- `tehknesolutions/simpleway-hnk`: currículo, authoring, validação e progresso;
- `tehknesolutions/codex-hnk/packages/hnk-linguas`: owner linguístico;
- `tehknesolutions/codex-hnk/packages/hnk-glyphs`: owner estrutural G01–G40;
- `hnk-english-app`: referência metodológica/UX apenas.

## CI

O GitHub Actions remoto ainda não pode ser chamado de verde sem uma execução real bem-sucedida do runner e dos validadores. Runs recentes têm falhado antes de expor steps normais do job, portanto o estado remoto ainda não prova sucesso nem identifica uma asserção específica como causa.
