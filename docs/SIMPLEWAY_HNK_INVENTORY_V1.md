# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + NUMERAL CANDIDATE DESIGN  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V15`  
**Pacote atual:** `simpleway-hnk@0.18.0`

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

## Corpus linguístico canônico/governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado governado atual:

1. `AUTH-001 KUVAN` — CANDIDATE;
2. `AUTH-002 VALA` — CANDIDATE;
3. `AUTH-003 KUON` — CANDIDATE, dependente de `ON=GATE`;
4. `AUTH-004 NE` — CANDIDATE, negação/ausência de autoria nova.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados canônicos: **35/144 = 24.3056%**.

Os numerais gerados nesta fase continuam **proposal-only** e portanto não aumentam esse 35.

## OPI 3 — sistema numérico

`EN KU SARASALA KE` continua HOLD. `SARASALA` permanece WATCH e a construção de idade ainda depende da infraestrutura numérica.

A recuperação em GitHub, File Library e Google Drive não encontrou um sistema numeral HNK histórico. O projeto agora separa:

- valor matemático;
- dígitos ASCII como ponte externa para UI/dados;
- numerais falados HNK.

A estratégia `TEN_PRIMITIVE_DIGIT_NUMERALS` foi explicitamente aprovada para **geração de candidatos**, sem autorizar ainda sua entrada no registry canônico.

## Candidatos falados 0–9 gerados

Primeiro conjunto auditado:

| Valor | Forma candidata | G-IDs | IPA |
|---:|---|---|---|
| 0 | `BIZO` | `G18·G03·G32·G04` | `/bizo/` |
| 1 | `DUVE` | `G19·G05·G31·G02` | `/duve/` |
| 2 | `HOYU` | `G07·G04·G40·G05` | `/hoju/` |
| 3 | `KETI` | `G23·G02·G22·G03` | `/keti/` |
| 4 | `LUSO` | `G14·G05·G26·G04` | `/luso/` |
| 5 | `MUPI` | `G11·G05·G21·G03` | `/mupi/` |
| 6 | `NURA` | `G12·G05·G15·G01` | `/nura/` |
| 7 | `PEVU` | `G21·G02·G31·G05` | `/pevu/` |
| 8 | `TOMI` | `G22·G04·G11·G03` | `/tomi/` |
| 9 | `ZOKA` | `G32·G04·G23·G01` | `/zoka/` |

Status de todas: **`CANDIDATE_PROPOSED`**, ainda fora de `@hnk/linguas/authored`.

### Auditoria do conjunto

- 10 formas CVCV;
- apenas unidades de transliteração HNK40 seguras;
- 10 consoantes iniciais distintas;
- distância mínima de edição **3** contra todas as formas recuperadas e autoradas atuais;
- distância mínima de edição **3** entre os próprios numerais;
- nenhuma colisão exata;
- nenhuma forma escolhida por numerologia;
- nenhuma semântica derivada da aparência dos glifos;
- atribuição 0→9 feita sobre fila semântica previamente fixa e conjunto fonológico ordenado, sem simbolismo numérico.

## Gate de promoção dos numerais

Preparado:

`SWHNK-HNK-SPOKEN-NUMERAL-0-9-CANDIDATE-PROMOTION-BATCH-V1`

Se o conjunto concreto for aprovado, a proposta é registrar:

- `AUTH-005 BIZO` = 0
- `AUTH-006 DUVE` = 1
- `AUTH-007 HOYU` = 2
- `AUTH-008 KETI` = 3
- `AUTH-009 LUSO` = 4
- `AUTH-010 MUPI` = 5
- `AUTH-011 NURA` = 6
- `AUTH-012 PEVU` = 7
- `AUTH-013 TOMI` = 8
- `AUTH-014 ZOKA` = 9

Todos entrariam somente como **CANDIDATE** e `historicalRecoveryClaim=false`.

Efeito projetado: formas recuperadas continuam **31**; candidatos autorados canônicos passam **4 → 14**; ativos governados passam **35 → 45 = 31.25% da referência 144**.

A promoção dos dígitos falados, sozinha, ainda não valida OPI 3. Continuam separados os gates de composição 10+, resposta de idade e eventual unidade de ano.

## Três HOLD restantes

1. **OPI 3 — prioridade 1:** promoção dos numerais + construção de idade.
2. **OPI 1 — prioridade 2:** `YA/ES` ainda sem alinhamento histórico recuperado.
3. **OPI 7 — prioridade 3:** `VANI` meaning-null + `KUON/ON=GATE` + valência de co-residente.

## Fronteiras

`hnk-english-app` permanece referência metodológica e arquitetural, não owner de conteúdo HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

CI remoto continua não comprovado até existir execução real de runner.
