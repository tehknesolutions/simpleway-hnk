# SimpleWay HNK — Inventário Verificado V1

**Data de consolidação:** 2026-09-09  
**Estado:** RECOVERY + GOVERNED COURSE AUTHORING  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V9`  
**Pacote:** `simpleway-hnk@0.10.0`

## 1. Ciclo 1 — contrato estrutural

Árvore reconciliada:

- L01 — Kether
- L02 — Chokhmah
- L03 — Binah
- L04 — Chesed
- L05 — Gevurah
- L06 — Yesod
- L07 — Malkuth

O contrato aprovado fecha o Ciclo 1 em **1.008 elementos pedagógicos**:

- 21 orientações docentes;
- 70 OPI;
- 35 cenas/histórias;
- 28 Q&A;
- 14 cabeçalhos estruturais;
- 35 estruturas;
- 144 entradas de vocabulário;
- 504 Activation;
- 154 revisões;
- 3 selos finais: Verbum → Logos → Dialogos.

A meta 144 é curricular e não equivale automaticamente a 144 formas únicas HNK.

## 2. Lesson 1 — evidência histórica

Há evidência recuperada de uma release HNK Lesson 1 v1 `PUBLICATION-FROZEN` com:

- 10 cards OPI;
- 72 teacher drills;
- campos para pergunta/resposta HNK, glifos e segmentos;
- pontes de Esperanto, Hebraico e Grego Koiné;
- três lexemas WATCH na L01: `SARASALA`, `VAMAVALA`, `VAMAZAMU`;
- produto web com modo Aluno/Professor, teclado HNK e practice engine.

O payload bruto v1.0 ainda não foi recuperado. Por isso os 82 itens históricos são `SOURCE_CONFIRMED_FROZEN`, mas não são contados como `FROZEN` reproduzíveis no repo atual.

## 3. Lesson 1 v1.1 — OPI authorship

Todos os 10 prompts congelados possuem agora um payload HNK governado e reproduzível:

| OPI | HNK v1.1 | Estado |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | AUTHORED · recovered phrase / semantic HOLD |
| 02 | `EN VAMAKALA KE` | AUTHORED · FROZEN lexical core / grammar HOLD |
| 03 | `EN KU SARASALA KE` | AUTHORED · WATCH / contextual age HOLD |
| 04 | `EN SARADAYA KUVAN KE` | AUTHORED · KUVAN CANDIDATE HOLD |
| 05 | `EN VALI KUVAN KE` | AUTHORED · governed VALI rebind + KUVAN HOLD |
| 06 | `EN KU VALA KE` | AUTHORED · VALA CANDIDATE / contextual activity HOLD |
| 07A | `EN VANI KUVAN KE` | AUTHORED · VANI semantic hypothesis + KUVAN HOLD |
| 07B | `EN VANI KUON KE` | AUTHORED · VANI semantic hypothesis + KUON/ON gate dependency HOLD |
| 08 | `EN KU VAMAVALA KE` | AUTHORED · WATCH / inferred KU HOLD |
| 09 | `EN VAME VAMAZAMU KE` | AUTHORED · GATE + WATCH experimental HOLD |
| 10 | context `VAMUSARO` + `EN KU VALA KE` | AUTHORED · approximate contextual equivalent HOLD |

OPI 7 is one pedagogical card represented by two HNK microquestions because the English prompt contains two semantic goals.

Current counts:

- L01 OPI `AUTHORED`: **10/10 = 100%**;
- Cycle 1 OPI `AUTHORED`: **10/70 = 14.2857%**;
- global pedagogical slots `AUTHORED`: **10/1.008 = 0.9921%**;
- `VALIDATED`: **0/1.008**;
- reproducible `FROZEN`: **0/1.008**;
- historical frozen evidence: **82/1.008 = 8.1349%**.

`10/10 AUTHORED` is not a publication claim. It means every OPI slot now has a governed v1.1 payload; semantic/human promotion remains pending.

## 4. OPI 7 — source boundary

Historical SimpleWay material confirms residence as a real Cycle 1 semantic domain: `I live` belongs to Lesson 1 and `She lives` recurs later in Cycle 1.

However, no recovered HNK source found so far proves `VANI = live/reside`.

Therefore:

- `LEX-031 VANI` remains `WATCH` with Master Lexicon meaning `null`;
- `VANI ≈ live/reside` exists only as an explicit semantic hypothesis for the OPI 7 test lane;
- `AUTH-001 KUVAN` remains CANDIDATE;
- `AUTH-003 KUON` remains CANDIDATE and depends on `LEX-026 ON` remaining GATE;
- `KUON` does not retroactively define `KU=WHO` or `ON=person` in recovered canon;
- no lexical equivalent of English `WITH` was invented;
- co-resident meaning is modeled only by an experimental residence-predicate valency;
- no curriculum rebind of VANI was created.

## 5. OPI 10 — source boundary

`VAMUSARO` remains exactly `rest / leisure period`, not `weekend`.

The OPI 10 v1.1 card uses `VAMUSARO` only as a discourse/UI context and asks `EN KU VALA KE`. Semantic fidelity remains `APPROXIMATE_CONTEXTUAL_EQUIVALENT` and HOLD.

## 6. Corpus linguístico

Recovered Master Lexicon:

- 33 forms total;
- 31 unique forms linked to at least one Cycle 1 Lesson;
- 2 unbound recovered forms: `VAMATAYA`, `KALIFORNIA`;
- 7 recovered phrases;
- gate global `HOLD_INCOMPLETE_BINDING`.

Governed authored registry `@hnk/linguas/authored`:

1. `AUTH-001 KUVAN` — locative interrogative specialization — `CANDIDATE`;
2. `AUTH-002 VALA` — generic activity nominal head — `CANDIDATE`;
3. `AUTH-003 KUON` — person-interrogative specialization — `CANDIDATE`, depends on `ON=GATE`.

Coverage proxies:

- recovered: **31/144 = 21.5278%**;
- recovered + authored candidates: **34/144 = 23.6111%**.

These ratios are language-asset proxies only; they are not vocabulary-slot completion.

## 7. Lesson-level language coverage

Recovered/rebound lexical coverage remains:

| Lesson | Recovered/rebound lexemes | Authored candidates | Recovered phrases |
|---|---:|---:|---:|
| L01 | 10 = 9 recovered + 1 governed VALI rebind | 3 | 7 |
| L02 | 11 | 0 | 0 |
| L03 | 8 | 0 | 0 |
| L04 | 9 | 0 | 0 |
| L05 | 0 | 0 | 0 |
| L06 | 0 | 0 | 0 |
| L07 | 0 | 0 | 0 |

`VANI` use in OPI 7 is a semantic test hypothesis and does not increase L01 recovered/rebound lexeme count.

## 8. Lessons 2–7

- L02: recovered lexical work exists; historical pedagogical scaffold remains incomplete compared with L01.
- L03: 8 bindings; mixed FROZEN/WATCH/CANDIDATE; evidence gate remains insufficient.
- L04: 9 bindings; predominantly GATE; promotion blocked pending evidence/human review.
- L05–L07: curriculum structure exists but no recovered HNK lexemes are assigned. Missing values remain null until source recovery or explicit governed authorship.

## 9. HNK40

`@hnk/glyphs` remains the structural owner of G01–G40, IPA and safe transliteration/runtime.

Candidate D visual assets remain `PREPRODUCTION_NOT_OFFICIAL`. G-IDs are structural authority; current drawings are not yet official visual canon.

## 10. SimpleWay English boundary

`hnk-english-app` remains an authorized reference for course methodology, architecture, Student/Teacher flow, UX/UI, drills, vocabulary organization and progression.

Do not add HNK-language corpus files to the English repo.

## 11. Authority model

- `codex-hnk/packages/hnk-linguas` — recovered registry, authored-candidate registry and Cycle 1 language governance;
- `codex-hnk/packages/hnk-glyphs` — HNK40 structural runtime;
- `simpleway-hnk` — course/product/curriculum authoring and validation;
- SimpleWay Cycle 1 canon/contract — pedagogical target architecture;
- recovered Lesson 1 release — historical product evidence.

## 12. Current gate

Current gate:

`SWHNK-L01-OPI-10-OF-10-AUTHORED-REVIEW-V1`

Next objective: review the ten authored cards as a set, define whole-slot validation criteria, and begin moving only the strongest cards from `AUTHORED` toward `VALIDATED` without changing WATCH/CANDIDATE/GATE authorities silently.
