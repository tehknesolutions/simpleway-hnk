# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + NUMERIC INFRASTRUCTURE  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V17`  
**Pacote atual:** `simpleway-hnk@0.20.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

## L01 — estado pedagógico

A release histórica `PUBLICATION-FROZEN` comprova **10 OPI + 72 teacher drills = 82 itens**, mas o payload bruto v1.0 permanece não recuperado. Esses 82 são evidência histórica, não `FROZEN` reproduzível atual.

Todos os 10 OPI v1.1 estão autorados e revisados. **7/10 estão VALIDATED = 70%**.

| OPI | HNK v1.1 | Estado |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | AUTHORED · HOLD |
| 02 | `EN VAMAKALA KE` | **VALIDATED** |
| 03 | `EN KU SARASALA KE` | AUTHORED · HOLD · age/cardinal batch prepared |
| 04 | `EN SARADAYA KUVAN KE` | **VALIDATED** |
| 05 | `EN VALI KUVAN KE` | **VALIDATED** |
| 06 | `EN KU VALA KE` | **VALIDATED** |
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | AUTHORED · HOLD |
| 08 | `EN KU VAMAVALA KE` | **VALIDATED** |
| 09 | `EN VAME VAMAZAMU KE` | **VALIDATED** |
| 10 | `VAMUSARO` context + `EN KU VALA KE` | **VALIDATED** |

Estados exclusivos no Ciclo 1: **998 MISSING + 3 AUTHORED + 7 VALIDATED + 0 FROZEN = 1.008**.

Maturidade: **10/1.008 authored-or-better = 0.9921%**; **7/1.008 validated = 0.6944%**. Nos 70 OPI do Ciclo 1, **7/70 = 10%** estão validados.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado governado `@hnk/linguas/authored` agora contém **14 CANDIDATE forms**:

1. `AUTH-001 KUVAN`
2. `AUTH-002 VALA`
3. `AUTH-003 KUON`
4. `AUTH-004 NE`
5. `AUTH-005 BIZO` = 0
6. `AUTH-006 DUVE` = 1
7. `AUTH-007 HOYU` = 2
8. `AUTH-008 KETI` = 3
9. `AUTH-009 LUSO` = 4
10. `AUTH-010 MUPI` = 5
11. `AUTH-011 NURA` = 6
12. `AUTH-012 PEVU` = 7
13. `AUTH-013 TOMI` = 8
14. `AUTH-014 ZOKA` = 9

Os dez numerais são `PRIMITIVE_AUTHORED`, `historicalRecoveryClaim=false` e continuam `CANDIDATE`. Nenhum foi promovido a FROZEN.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **45/144 = 31.25%**.

## Sistema numérico 0–9

A recuperação em GitHub, File Library e Google Drive não encontrou um sistema numeral HNK histórico. A estratégia de dez primitivas foi aprovada e o conjunto auditado foi registrado:

| Valor | HNK | G-IDs |
|---:|---|---|
| 0 | `BIZO` | `G18·G03·G32·G04` |
| 1 | `DUVE` | `G19·G05·G31·G02` |
| 2 | `HOYU` | `G07·G04·G40·G05` |
| 3 | `KETI` | `G23·G02·G22·G03` |
| 4 | `LUSO` | `G14·G05·G26·G04` |
| 5 | `MUPI` | `G11·G05·G21·G03` |
| 6 | `NURA` | `G12·G05·G15·G01` |
| 7 | `PEVU` | `G21·G02·G31·G05` |
| 8 | `TOMI` | `G22·G04·G11·G03` |
| 9 | `ZOKA` | `G32·G04·G23·G01` |

A auditoria de geração preserva distância de edição mínima 3 em relação às formas existentes e também entre os próprios numerais. A escolha não usou numerologia nem aparência dos glifos para atribuir significado.

## Proposta 10–99

Foi criada a proposta `HNK-CARDINAL-10-99-POSITIONAL-COMPOSITION-V1`, ainda **não canônica**.

Regra proposta em contexto cardinal numérico:

`DIGIT_TENS DIGIT_UNITS`

Interpretação:

`10 × value(first) + value(second)`

Exemplos:

- 10 = `DUVE BIZO`
- 11 = `DUVE DUVE`
- 18 = `DUVE TOMI`
- 20 = `HOYU BIZO`
- 42 = `LUSO HOYU`
- 70 = `PEVU BIZO`
- 99 = `ZOKA ZOKA`

Essa regra não cria palavra para dez, não define 100+, ordinais, frações ou aritmética e não é apresentada como gramática histórica recuperada.

## OPI 3 — batch preparado

Pergunta atual:

`EN KU SARASALA KE`

`SARASALA` permanece `WATCH = tempo/duração`.

Batch preparado:

`SWHNK-L01-OPI-003-AGE-CARDINAL-HUMAN-BATCH-V1`

Ele pede aprovação escopada para:

- usar os numerais 0–9 já registrados no contexto iniciante;
- aceitar a composição decimal posicional 10–99;
- aceitar `EN KU SARASALA KE` como construção contextual de idade apenas no OPI 3;
- aceitar cardinal nu como resposta de idade, sem inventar palavra HNK para ano/anos.

Exemplos de resposta se aprovado:

- 8 → `TOMI`
- 18 → `DUVE TOMI`
- 42 → `LUSO HOYU`

Se aprovado, OPI 3 poderá subir de AUTHORED-HOLD para VALIDATED, levando a L01 a **8/10 = 80% dos OPI validados**, sem promoção de autoridade linguística e sem novo lexema.

## Dois HOLD estruturalmente mais difíceis depois do OPI 3

### OPI 1

`KALA YA EN ES KU KE` é uma frase histórica com glosa aproximada. `YA` e `ES` continuam sem alinhamento histórico recuperado.

### OPI 7

`VANI` permanece WATCH com significado recuperado `null`; `KUON` permanece CANDIDATE dependente de `ON=GATE`; a valência de co-residente é autoria experimental.

## Fronteiras

`hnk-english-app` permanece referência metodológica/arquitetural e não recebe corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

CI remoto continua não comprovado até existir execução real de runner.
