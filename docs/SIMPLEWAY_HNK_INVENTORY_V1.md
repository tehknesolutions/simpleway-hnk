# SimpleWay HNK — Inventário Verificado V1

**Data de consolidação:** 2026-09-09  
**Estado:** RECOVERY + GOVERNED COURSE AUTHORING + SCOPED VALIDATION  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V13`  
**Pacote:** `simpleway-hnk@0.15.0`

## 1. Ciclo 1 — contrato estrutural

Árvore reconciliada:

- L01 — Kether
- L02 — Chokhmah
- L03 — Binah
- L04 — Chesed
- L05 — Gevurah
- L06 — Yesod
- L07 — Malkuth

O contrato aprovado fecha o Ciclo 1 em **1.008 elementos pedagógicos**: 21 orientações docentes, 70 OPI, 35 cenas/histórias, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 entradas de vocabulário, 504 Activation, 154 revisões e 3 selos finais.

## 2. Lesson 1 — evidência histórica

A release histórica L01 v1 `PUBLICATION-FROZEN` prova 10 OPI e 72 teacher drills, além dos campos HNK de pergunta/resposta/glifos/segmentos. O payload bruto v1.0 continua não recuperado.

Portanto existem **82 slots `SOURCE_CONFIRMED_FROZEN`**, mas eles não são contados como `FROZEN` reproduzíveis na implementação atual.

## 3. Lesson 1 v1.1 — autoria, revisão e validação

Todos os 10 OPI têm payload HNK reproduzível e todos os 10 foram individualmente revisados.

| OPI | HNK v1.1 | Estado atual |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | AUTHORED · REVIEWED HOLD |
| 02 | `EN VAMAKALA KE` | **VALIDATED**; `[NICKNAME]` / `NE VAMAKALA` |
| 03 | `EN KU SARASALA KE` | AUTHORED · REVIEWED HOLD |
| 04 | `EN SARADAYA KUVAN KE` | **VALIDATED** para uso escopado L01 v1.1 |
| 05 | `EN VALI KUVAN KE` | **VALIDATED** para uso escopado L01 v1.1 |
| 06 | `EN KU VALA KE` | **VALIDATED** para uso escopado com contexto trabalho/escola |
| 07A | `EN VANI KUVAN KE` | AUTHORED · REVIEWED HOLD |
| 07B | `EN VANI KUON KE` | AUTHORED · REVIEWED HOLD |
| 08 | `EN KU VAMAVALA KE` | **VALIDATED** para uso escopado; WATCH permanece visível |
| 09 | `EN VAME VAMAZAMU KE` | AUTHORED · REVIEWED HOLD · Batch 4 preparado |
| 10 | contexto `VAMUSARO` + `EN KU VALA KE` | **VALIDATED** como equivalente contextual aproximado |

OPI 7 continua sendo um único card pedagógico com duas microperguntas HNK.

### Métricas atuais

Estados exclusivos no Ciclo 1:

- `MISSING`: **998/1.008**;
- `AUTHORED`: **4/1.008 = 0.3968%**;
- `VALIDATED`: **6/1.008 = 0.5952%**;
- `FROZEN`: **0/1.008**.

Maturidade acumulada:

- `AUTHORED_OR_BETTER`: **10/1.008 = 0.9921%**;
- `VALIDATED_OR_BETTER`: **6/1.008 = 0.5952%**;
- histórico `SOURCE_CONFIRMED_FROZEN`: **82/1.008 = 8.1349%**.

Na L01 OPI:

- revisados: **10/10 = 100%**;
- `AUTHORED_OR_BETTER`: **10/10 = 100%**;
- `VALIDATED_OR_BETTER`: **6/10 = 60%**;
- `FROZEN`: **0/10**.

No Ciclo 1 OPI:

- `AUTHORED_OR_BETTER`: **10/70 = 14.2857%**;
- `VALIDATED_OR_BETTER`: **6/70 = 8.5714%**.

## 4. Batches aplicados

### Batch 1 — OPI 4 e 5
`KUVAN`, `EN ... KE` e `[PLACE]` foram aceitos apenas nos escopos aprovados. `KUVAN` permanece `CANDIDATE`.

### Batch 2 — OPI 6 e 8
`EN KU X KE` foi aceito escopadamente; `VALA` permanece `CANDIDATE` e `VAMAVALA` permanece `WATCH`.

### Batch 3 — OPI 10
Validado como equivalente contextual aproximado. `VAMUSARO` permanece `FROZEN = descanso / período de lazer`, nunca `weekend`.

### Batch 3B — OPI 2
Validado sem verbo `HAVE`:

- pergunta: `EN VAMAKALA KE`;
- afirmativa: `[NICKNAME]`;
- negativa: `NE VAMAKALA`;
- `VAMAKALA` permanece `FROZEN`;
- `AUTH-004 NE` é autoria nova `CANDIDATE`, não recuperação;
- G-IDs de `NE`: `G12 · G02`;
- sem produtividade global de negação;
- posse histórica e função subject-vs-possessive de `EN` continuam não recuperadas.

## 5. OPI que permanecem HOLD

- OPI 1: frase histórica aproximada; `YA/ES` continuam sem alinhamento recuperado.
- OPI 3: `SARASALA` continua WATCH; construção de idade e sistema numérico permanecem abertos.
- OPI 7: `VANI` permanece WATCH com meaning `null`; `KUON` é CANDIDATE dependente de `ON=GATE`; valência de co-residente é experimental.
- OPI 9: `VAME` permanece GATE e `VAMAZAMU` WATCH; o Batch 4 está preparado para decidir seu uso sem alterar essas autoridades.

## 6. Corpus linguístico

Recovered Master Lexicon:

- 33 formas totais;
- 31 formas únicas vinculadas ao Ciclo 1;
- 2 formas recuperadas não vinculadas: `VAMATAYA`, `KALIFORNIA`;
- 7 frases recuperadas;
- gate global `HOLD_INCOMPLETE_BINDING`.

Registry de autoria governada `@hnk/linguas/authored`:

1. `AUTH-001 KUVAN` — `CANDIDATE`;
2. `AUTH-002 VALA` — `CANDIDATE`;
3. `AUTH-003 KUON` — `CANDIDATE`, dependente de `ON=GATE`;
4. `AUTH-004 NE` — `CANDIDATE`, operador de negação/ausência de autoria nova.

Cobertura-proxy:

- recuperada: **31/144 = 21.5278%**;
- ativos governados: **35/144 = 24.3056%**.

Esses percentuais são proxies de ativos linguísticos, não conclusão dos 144 slots de vocabulário.

## 7. Cobertura por Lesson

| Lesson | Lexemas recuperados/rebindados | Candidatos autorados | Frases recuperadas |
|---|---:|---:|---:|
| L01 | 10 = 9 recuperados + 1 rebind `VALI` | 4 | 7 |
| L02 | 11 | 0 | 0 |
| L03 | 8 | 0 | 0 |
| L04 | 9 | 0 | 0 |
| L05 | 0 | 0 | 0 |
| L06 | 0 | 0 | 0 |
| L07 | 0 | 0 | 0 |

## 8. HNK40 e fronteira visual

`@hnk/glyphs` continua owner estrutural de G01–G40, IPA e safe transliteration/runtime. Candidate D permanece `PREPRODUCTION_NOT_OFFICIAL`; G-IDs são autoridade estrutural, não os desenhos atuais como cânone visual final.

## 9. SimpleWay English boundary

`hnk-english-app` permanece referência autorizada para metodologia, arquitetura, Student/Teacher flow, UX/UI, drills, vocabulário e progressão. Conteúdo HNK não deve ser adicionado ao repo de inglês.

## 10. Batch 4 preparado

Seleção: **OPI 9 — `Do you like to sing?`**.

Pergunta atual:

`EN VAME VAMAZAMU KE`

Respostas propostas:

- positiva: `VAME VAMAZAMU`;
- negativa: `NE VAME VAMAZAMU`.

A proposta não cria novos lexemas. Ela pede apenas aprovação escopada para:

- usar `VAME` nesse card mantendo `GATE`;
- usar `VAMAZAMU` mantendo `WATCH`;
- estender `AUTH-004 NE` à negação de uma frase de predicado somente nesse card, mantendo `CANDIDATE` e sem produtividade global;
- aceitar respostas-fragmento no contexto do diálogo, sem inventar partícula histórica de yes/no e sem exigir `AN`.

Se aprovado futuramente, o progresso projetado é **7/10 OPI VALIDATED = 70%**. Nenhuma autoridade linguística precisa mudar.

Gate corrente:

`SWHNK-L01-OPI-009-PREFERENCE-NEGATION-HUMAN-BATCH-V1`
