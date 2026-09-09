# SimpleWay HNK — Inventário Verificado V1

**Data de consolidação:** 2026-09-09  
**Estado:** RECOVERY + GOVERNED COURSE AUTHORING  
**Política:** separar estrutura pedagógica, conteúdo linguístico recuperado, autoria nova, rebinds curriculares e cânone visual.

## 1. Ciclo 1 — contrato estrutural

Árvore reconciliada:

- L01 — Kether
- L02 — Chokhmah
- L03 — Binah
- L04 — Chesed
- L05 — Gevurah
- L06 — Yesod
- L07 — Malkuth

O cânone/contrato aprovado fecha o Ciclo 1 em **1.008 elementos pedagógicos**:

- 21 orientações docentes = 3 por Lesson;
- 70 OPI = 10 por Lesson;
- 35 cenas/histórias = 5 por Lesson;
- 28 Q&A = 4 por Lesson;
- 14 cabeçalhos estruturais = 2 por Lesson;
- 35 estruturas = 5 por Lesson;
- 144 entradas de vocabulário no ciclo;
- 504 Activation = 72 por Lesson;
- 154 revisões = 22 por Lesson;
- 3 selos finais: Verbum → Logos → Dialogos.

A meta `144` é curricular. Não significa que cada forma recuperada no Master Lexicon corresponda automaticamente a um slot pedagógico.

## 2. Lesson 1 — estado histórico e reconstrução atual

Há evidência recuperada de uma release HNK Lesson 1 v1 com status `PUBLICATION-FROZEN`.

Elementos historicamente comprovados:

- 10 cards OPI;
- 72 teacher drills;
- modelo contendo pergunta HNK, glifos/segmentos, resposta HNK e answer slot;
- pontes de Esperanto, Hebraico e Grego Koiné com transliteração;
- três lexemas em WATCH: `SARASALA`, `VAMAVALA`, `VAMAZAMU`;
- protótipo/produto web com modo Aluno e Professor;
- teclado HNK 10×4;
- practice engine.

O payload bruto v1.0 ainda não foi recuperado. Por isso os 82 itens históricos são `SOURCE_CONFIRMED_FROZEN`, mas não são contados como `FROZEN` reproduzíveis no repo atual.

### L01 v1.1 — autoria governada atual

Estado atual dos OPI:

| OPI | HNK atual | Origem | Estado |
|---|---|---|---|
| 01 | `KALA YA EN ES KU KE` | `PHR-001` recuperado | AUTHORED · technical pass / semantic HOLD |
| 02 | `EN VAMAKALA KE` | candidato v1.1, núcleo FROZEN | AUTHORED · HOLD |
| 03 | — | construção de idade ainda aberta | MISSING |
| 04 | `EN SARADAYA KU KE` | candidato v1.1, núcleo FROZEN | AUTHORED · HOLD WH |
| 05 | `EN VALI KU KE` | candidato v1.1 + rebind governado de `VALI` | AUTHORED · HOLD WH |
| 06 | — | frame de atividade bloqueado por colisão semântica | MISSING |
| 07 | — | morar/quem/com; recuperação de `VANI` priorizada | MISSING |
| 08 | `EN VAMAVALA KU KE` | candidato v1.1 com WATCH visível | AUTHORED · TEST ONLY / HOLD |
| 09 | — | preferência; `VAME` permanece GATE | MISSING |
| 10 | — | weekend/composto ainda não governado | MISSING |

Portanto, neste momento:

- L01 OPI `AUTHORED`: **5/10 = 50%**;
- Cycle 1 OPI `AUTHORED`: **5/70 = 7,1429%**;
- slots pedagógicos globais `AUTHORED`: **5/1.008 = 0,4960%**;
- `VALIDATED`: **0/1.008**;
- `FROZEN` reproduzível atual: **0/1.008**;
- evidência histórica congelada: **82/1.008 = 8,1349%**.

## 3. Lesson 2

Existe scaffold recuperado `HNK-L02`, versão `0.0.1`, estado histórico `DRAFT-SCAFFOLD`.

- existem 11 bindings lexicais recuperados associados a L02;
- não existe uma Lesson 2 pedagógica congelada equivalente à L01 no artefato recuperado;
- conteúdo não vazio exige fonte curricular aprovada e content freeze versionado.

## 4. Lessons 3 e 4

- L03: 8 bindings; mistura FROZEN, WATCH e CANDIDATE; gate de evidência insuficiente.
- L04: 9 bindings; predominantemente GATE; promoção de runtime bloqueada até evidência/revisão humana.

Esses materiais são evidência de trabalho, não Lessons congeladas completas.

## 5. Lessons 5, 6 e 7

A estrutura curricular existe, mas o corpus atual não contém lexemas HNK recuperados ligados a L05, L06 ou L07.

Regra: valores linguísticos ausentes permanecem `null` até recuperação de fonte ou autoria formal governada. `FAITH`, `PURPOSE` e `PEACE` são alvos curriculares ingleses, não lexemas HNK automaticamente autorizados.

## 6. Corpus linguístico e cobertura

Master Lexicon:

- 33 formas no registro;
- 31 formas únicas vinculadas a pelo menos uma Lesson do Ciclo 1;
- 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`);
- 7 frases recuperadas, todas atualmente associadas à L01;
- gate global `HOLD_INCOMPLETE_BINDING`.

### Proveniência recuperada vs rebind curricular

`VALI = trabalho / trabalhar` é `FROZEN` e foi recuperado originalmente em L02/L03. O layer canônico de Cycle 1 agora possui um **rebind curricular explícito** que também permite ensiná-lo em L01.

Esse rebind:

- não altera a forma `VALI`;
- não altera o significado;
- não altera a autoridade FROZEN;
- não reescreve a proveniência histórica;
- não aumenta o número de formas únicas do ciclo;
- aumenta a cobertura ensinável da L01 de 9 para 10 bindings.

Cobertura atual:

| Lesson | Bindings recuperados | Rebinds governados | Total ensinável | Frases recuperadas |
|---|---:|---:|---:|---:|
| L01 | 9 | 1 | **10** | 7 |
| L02 | 11 | 0 | 11 | 0 |
| L03 | 8 | 0 | 8 | 0 |
| L04 | 9 | 0 | 9 | 0 |
| L05 | 0 | 0 | 0 | 0 |
| L06 | 0 | 0 | 0 | 0 |
| L07 | 0 | 0 | 0 | 0 |

A proxy lexical continua **31/144 = 21,5278%**, pois reuso curricular não cria uma nova forma única.

## 7. Interrogativos — estado de recuperação/autoria

A análise distribucional atual sustenta, sem promoção canônica:

- `KE` — forte candidato a operador interrogativo final;
- `KU` — componente/variável de pergunta de conteúdo; significado WH específico ainda `null`;
- `EN` — referente de segunda pessoa inferido;
- `SARI`, `LO`, `DA` — não resolvidos.

Não há fonte atual que autorize `KU = WHAT`, `WHERE`, `WHO` ou `HOW` especificamente.

A comparação de `PHR-003` e `PHR-006` aumenta o valor de `KU` como variável de conteúdo, mas não recupera sua glosa exata. Os três frames sem glosa continuam não atribuídos a OPI específicos.

### Proposta composicional `KUVAN`

Há uma proposta nova, claramente marcada como **autoria e não recuperação**, para:

`KU + VAN → KUVAN`

Função proposta: variável interrogativa locativa / equivalente funcional aproximado de “onde”.

Base:

- `KU`: hipótese de variável de conteúdo;
- `VAN`: hipótese morfológica locativa apoiada por `VALIVAN`, `TAYOVAN` e `PAROVAN`;
- forma `KUVAN`: padrão fonotático CVCVC;
- G-IDs: `G23·G05·G31·G01·G12`;
- nenhuma colisão exata encontrada no Master Lexicon atual.

`KUVAN` **não está no cânone** e não foi aplicado aos OPI. A regra composicional permanece `CLOSED_LIST_ONLY` e exige promoção humana antes de qualquer mudança no Master Lexicon.

## 8. OPI 6 — gate de atividade

O OPI `What do you do at work/school?` permanece `MISSING` deliberadamente.

`EN VALI KU KE` foi rejeitado para o OPI 6 porque essa mesma forma já é o candidato do OPI 5. Sem distinguir pergunta locativa de pergunta de atividade, reutilizá-la criaria ambiguidade não governada.

Também permanecem em HOLD, não bindados ao OPI 6:

- `EN VALIVAN KU KE`;
- `EN PARAZAMO KU KE`;
- `EN PARAZAMI KU KE`.

Não é necessário criar automaticamente um lexema equivalente ao inglês auxiliar/light `do`. O problema é estrutural/semântico antes de ser lexical.

## 9. Escrita HNK / HNK40

No `codex-hnk`, `@hnk/glyphs` mantém:

- G01–G40 como IDs estruturais autoritativos;
- IPA/fonemas e parser de transliteração;
- Candidate D Freeze Pass 1 congelado 40/40;
- PUA candidato apenas para transporte;
- regra de não adivinhar unidades não resolvidas;
- `TS` como unidade atômica G30.

O estado visual permanece `PREPRODUCTION_NOT_OFFICIAL`. Promoção humana ainda é necessária antes de `VISUAL-CANON-V2`.

## 10. Relação com SimpleWay English

`hnk-english-app` continua sendo referência autorizada para metodologia, arquitetura, fluxo Aluno/Professor, UX/UI, exercícios e progressão. Não adicionar conteúdo HNK ao repositório de inglês.

## 11. Fontes de autoridade

1. `codex-hnk/packages/hnk-linguas` — registry linguístico e layer de cobertura/rebinds.
2. `codex-hnk/packages/hnk-glyphs` — runtime estrutural HNK40.
3. `HNK_CYCLE_1_NUMEROLOGICAL_CANON_V1` / contract — arquitetura pedagógica do Ciclo 1.
4. release recuperada HNK Lesson 1 — evidência histórica do produto L01.
5. `simpleway-hnk/proposals/language` — autoria e hipóteses explícitas, nunca confundidas com recuperação.

## 12. Gate corrente

A esteira atual está em:

`SWHNK-HNK-COMPOSITIONAL-INTERROGATIVE-RULE-V1`

Próxima decisão linguística relevante: promover/rejeitar a regra composicional e `KUVAN` como `CANDIDATE`, ou recuperar evidência adicional que resolva o sistema WH sem autoria nova.
