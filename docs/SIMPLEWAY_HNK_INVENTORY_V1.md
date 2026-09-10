# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-09  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V14`  
**Pacote atual:** `simpleway-hnk@0.17.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

## L01 — evidência histórica

A release histórica `PUBLICATION-FROZEN` comprova **10 OPI + 72 teacher drills = 82 itens**, mas o payload bruto v1.0 permanece não recuperado. Esses 82 são evidência histórica, não `FROZEN` reproduzível atual.

## L01 — OPI v1.1

Todos os 10 OPI estão autorados e revisados. **7/10 estão VALIDATED = 70%**.

| OPI | HNK v1.1 | Estado |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | AUTHORED · HOLD |
| 02 | `EN VAMAKALA KE` | **VALIDATED** |
| 03 | `EN KU SARASALA KE` | AUTHORED · HOLD |
| 04 | `EN SARADAYA KUVAN KE` | **VALIDATED** |
| 05 | `EN VALI KUVAN KE` | **VALIDATED** |
| 06 | `EN KU VALA KE` | **VALIDATED** |
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | AUTHORED · HOLD |
| 08 | `EN KU VAMAVALA KE` | **VALIDATED** |
| 09 | `EN VAME VAMAZAMU KE` | **VALIDATED** |
| 10 | `VAMUSARO` context + `EN KU VALA KE` | **VALIDATED** |

Estados exclusivos no Ciclo 1: **998 MISSING + 3 AUTHORED + 7 VALIDATED + 0 FROZEN = 1.008**.

Maturidade: **10/1.008 authored-or-better = 0.9921%**; **7/1.008 validated = 0.6944%**. Nos 70 OPI do Ciclo 1, **7/70 = 10%** estão validados.

## Batch 4 — OPI 9

Pergunta validada para uso escopado: `EN VAME VAMAZAMU KE`.

Respostas: `VAME VAMAZAMU` e `NE VAME VAMAZAMU`.

Fronteiras preservadas:

- `LEX-025 VAME` continua **GATE**;
- `LEX-008 VAMAZAMU` continua **WATCH**;
- `AUTH-004 NE` continua **CANDIDATE**;
- a negação de predicado com `NE` vale apenas no escopo aprovado do OPI 9;
- não existe regra universal yes/no ou de negação decorrente dessa validação;
- nenhuma forma nova foi criada pelo Batch 4;
- OPI 9 não foi promovido a FROZEN.

## Corpus linguístico

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado governado:

1. `AUTH-001 KUVAN` — CANDIDATE;
2. `AUTH-002 VALA` — CANDIDATE;
3. `AUTH-003 KUON` — CANDIDATE, dependente de `ON=GATE`;
4. `AUTH-004 NE` — CANDIDATE, negação/ausência de autoria nova.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **35/144 = 24.3056%**. Nenhum desses percentuais equivale a conclusão dos 144 slots curriculares.

## Três HOLD restantes

### OPI 3 — prioridade 1

`EN KU SARASALA KE` — precisa de construção de idade e sistema numérico HNK. `SARASALA` continua WATCH.

A varredura de recuperação em GitHub, File Library e Google Drive não encontrou um sistema numeral HNK histórico. O arquivo `number-system-recovery.v1.json` registra explicitamente esse limite.

Foi criada a arquitetura `HNK_NUMERIC_LITERAL_BRIDGE_V1`: valores ASCII como `8`, `18` e `42` podem ser usados como notação externa em UI/dados, sem serem chamados de glifos ou palavras HNK.

Os numerais falados 0–9 permanecem **todos com forma `null`**.

A estratégia recomendada para fala é `TEN_PRIMITIVE_DIGIT_NUMERALS`: dez primitivas de autoria nova, uma para cada valor 0–9, entrando inicialmente como `CANDIDATE`. A estratégia ainda não autoriza geração de formas.

### OPI 1 — prioridade 2

`KALA YA EN ES KU KE` é uma frase histórica com glosa aproximada. `YA` e `ES` continuam sem alinhamento semântico recuperado. Preferir recuperação de fonte ou interpretação v1.1 explicitamente governada, não reescrita retroativa do histórico.

### OPI 7 — prioridade 3

`VANI` permanece WATCH com significado recuperado `null`; `KUON` permanece CANDIDATE dependente de `ON=GATE`; a valência de co-residente é autoria experimental. É o card de maior risco semântico da L01.

## Gate corrente

`SWHNK-HNK-SPOKEN-NUMERAL-0-9-HUMAN-BATCH-V1`

Esse batch aguarda aprovação específica para **gerar** dez candidatos falados 0–9. Se aprovado:

- cada forma será `PRIMITIVE_AUTHORED`;
- autoridade inicial obrigatória `CANDIDATE`;
- sem alegação de recuperação histórica;
- apenas unidades de transliteração HNK40 seguras ou G-IDs explicitamente governados;
- collision/confusion review obrigatório;
- numerologia e aparência visual não poderão escolher as formas;
- base interna e regra para 10–99 continuarão abertas em gate posterior;
- o OPI 3 continuará HOLD até existir uma resposta falada de idade suficiente.

## Fronteiras

`hnk-english-app` permanece referência metodológica e arquitetural, não owner de conteúdo HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.
