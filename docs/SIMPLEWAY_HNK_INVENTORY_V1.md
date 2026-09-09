# SimpleWay HNK — Inventário Verificado V1

**Data de consolidação:** 2026-09-09  
**Estado:** RECOVERY + COURSE ASSEMBLY  
**Política:** separar estrutura pedagógica, conteúdo linguístico recuperado e cânone visual.

## 1. O que existe de curso

### Ciclo 1 — contrato estrutural

O Ciclo 1 possui 7 Lessons e árvore reconciliada:

- L01 — Kether
- L02 — Chokhmah
- L03 — Binah
- L04 — Chesed
- L05 — Gevurah
- L06 — Yesod
- L07 — Malkuth

O contrato numerológico aprovado define, por Lesson:

- 10 OPI
- 5 cenas/histórias
- 4 Q&A
- 5 estruturas
- 72 Activation drills
- 22 revisões

No ciclo inteiro:

- 70 OPI
- 35 histórias
- 28 Q&A
- 35 estruturas
- 144 entradas de vocabulário
- 504 Activation drills
- 154 revisões
- 3 selos finais: Verbum, Logos, Dialogos
- 1.008 elementos pedagógicos

A meta `144` é curricular. Não significa que cada forma recuperada no Master Lexicon corresponda automaticamente a um slot pedagógico.

## 2. Lesson 1 — material mais maduro

Há evidência recuperada de uma release HNK Lesson 1 v1 com status `PUBLICATION-FROZEN`.

Elementos comprovados:

- 10 cards OPI;
- 72 teacher drills;
- perguntas HNK, glifos/segmentos e respostas HNK no modelo da release;
- pontes de Esperanto, Hebraico e Grego Koiné com transliteração;
- validação de três lexemas em WATCH: `SARASALA`, `VAMAVALA`, `VAMAZAMU`;
- protótipo/produto web com modo Aluno e Professor;
- teclado HNK 10×4;
- practice engine;
- progresso local e apresentação da Lesson 1.

A L01 deve ser tratada como fonte pedagógica de alta prioridade para migração, mas todo dado lexical deve ser reconciliado com o Master Lexicon atual antes da publicação de um novo build.

## 3. Lesson 2

Existe scaffold recuperado `HNK-L02`, versão `0.0.1`, estado `DRAFT-SCAFFOLD`.

O scaffold atual possui arrays pedagógicos vazios e registra explicitamente que o conteúdo semântico não deve ser inventado dentro da plataforma. Portanto:

- existem bindings lexicais recuperados associados a L02 no Master Lexicon;
- não existe, neste artefato, uma Lesson 2 pedagógica congelada equivalente à L01;
- a próxima versão exige fonte curricular aprovada e content freeze versionado.

## 4. Lessons 3 e 4

O Master Lexicon contém bindings recuperados para L03 e L04, mas as classes de autoridade impedem tratá-los como camada totalmente congelada.

- L03: mistura FROZEN, WATCH e CANDIDATE.
- L04: predominantemente GATE, com validação humana necessária.

Há snapshots de gates/pilotos recuperados para L03 e L04 com decisão de evidência insuficiente e promoção de runtime bloqueada.

## 5. Lessons 5, 6 e 7

A estrutura curricular das Lessons existe, porém o Master Lexicon atual não contém lexemas HNK recuperados vinculados a L05, L06 ou L07.

Regra vigente: manter valores linguísticos ausentes como `null`/não atribuídos até recuperação de fonte ou autoria formal governada.

## 6. Corpus linguístico recuperado

Master Lexicon atual:

- 33 formas no registro;
- 31 formas vinculadas a pelo menos uma Lesson do Ciclo 1;
- 2 formas ainda não vinculadas ao Ciclo 1 (`VAMATAYA`, `KALIFORNIA`);
- 7 frases recuperadas, atualmente associadas à L01;
- 144 slots de vocabulário como meta curricular;
- gate `HOLD_INCOMPLETE_BINDING`.

Cobertura por Lesson:

| Lesson | Lexemas vinculados | Frases |
|---|---:|---:|
| L01 | 9 | 7 |
| L02 | 11 | 0 |
| L03 | 8 | 0 |
| L04 | 9 | 0 |
| L05 | 0 | 0 |
| L06 | 0 | 0 |
| L07 | 0 | 0 |

## 7. Escrita HNK / HNK40

No `codex-hnk`, `@hnk/glyphs` mantém:

- G01–G40 como IDs estruturais autoritativos;
- IPA/fonemas e parser de transliteração;
- Candidate D Freeze Pass 1 congelado 40/40;
- PUA candidato apenas para transporte;
- regra de não adivinhar unidades não resolvidas;
- `TS` como unidade atômica G30.

O estado visual permanece `PREPRODUCTION_NOT_OFFICIAL`. Promoção humana ainda é necessária antes de `VISUAL-CANON-V2`.

## 8. Relação com SimpleWay English

`hnk-english-app` pode ser estudado e reutilizado como referência de:

- metodologia SimpleWay;
- arquitetura de Lessons;
- fluxo Aluno/Professor;
- UX/UI;
- exercícios e progressão;
- padrões de app e publicação.

Não adicionar conteúdo HNK ao repositório de inglês.

## 9. Fontes de autoridade para esta montagem

1. `codex-hnk/packages/hnk-linguas` — registry linguístico recuperado.
2. `codex-hnk/packages/hnk-glyphs` — runtime estrutural HNK40.
3. `HNK_CYCLE_1_NUMEROLOGICAL_CANON_V1` / contract — estrutura pedagógica do Ciclo 1.
4. release recuperada da HNK Lesson 1 — fonte de reconstrução do produto L01.
5. scaffolds e gate snapshots recuperados — evidência de trabalho, não promoção automática a cânone.

## 10. Próximo gate recomendado

`SWHNK-C1-BASELINE-V1`

Critérios:

1. importar para este repo apenas os artefatos pedagógicos HNK confirmados;
2. reconstruir L01 a partir da release congelada e reconciliá-la contra `@hnk/linguas` + `@hnk/glyphs`;
3. criar manifests vazios/governados de L02–L07 sem inventar formas;
4. adaptar a arquitetura do SimpleWay English para o produto HNK sem alterar o repo de inglês;
5. adicionar testes que bloqueiem drift de 7 Lessons, 10 OPI, 72 Activation e bindings linguísticos não aprovados.
