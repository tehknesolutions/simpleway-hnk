# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V9`  
**Date:** 2026-09-09  
**Package:** `simpleway-hnk@0.10.0`

## Progress model

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

Historical evidence and current reproducible implementation remain separate. `AUTHORED` means a governed HNK payload exists in the repository; it does **not** mean semantic validation or publication readiness.

## Current dashboard

Cycle 1 target: **1,008 pedagogical slots**.

- `AUTHORED`: **10 / 1,008 = 0.9921%**
- `VALIDATED`: **0 / 1,008**
- current reproducible `FROZEN`: **0 / 1,008**
- historical `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**
- scaffolded reconstructed L01 lane: **82 / 1,008 = 8.1349%**

Language assets:

- recovered Cycle 1 forms: **31 / 144 = 21.5278% proxy**
- governed authored candidates: **3** — `KUVAN`, `VALA`, `KUON`
- governed unique language assets: **34 / 144 = 23.6111% proxy**
- recovered phrases: **7**

These are language-asset coverage proxies, not completed curricular vocabulary slots.

## Lesson 1 OPI — authorship complete

- L01 OPI authorship: **10 / 10 = 100%**
- Cycle 1 OPI authorship: **10 / 70 = 14.2857%**
- L01 total-slot authorship: **10 / 155 = 6.4516%**

| OPI | Current HNK design | State |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | AUTHORED · recovered phrase / semantic HOLD |
| 02 | `EN VAMAKALA KE` | AUTHORED · FROZEN core / grammar HOLD |
| 03 | `EN KU SARASALA KE` | AUTHORED · WATCH / contextual age HOLD |
| 04 | `EN SARADAYA KUVAN KE` | AUTHORED · KUVAN CANDIDATE HOLD |
| 05 | `EN VALI KUVAN KE` | AUTHORED · VALI rebind + KUVAN HOLD |
| 06 | `EN KU VALA KE` | AUTHORED · VALA CANDIDATE / contextual activity HOLD |
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | AUTHORED · VANI semantic hypothesis + KUON CANDIDATE / HOLD |
| 08 | `EN KU VAMAVALA KE` | AUTHORED · WATCH / inferred KU HOLD |
| 09 | `EN VAME VAMAZAMU KE` | AUTHORED · GATE + WATCH experimental HOLD |
| 10 | context `VAMUSARO` + `EN KU VALA KE` | AUTHORED · approximate contextual leisure-period HOLD |

**No OPI is yet fully `VALIDATED`.** Authorship completion and validation completion are deliberately separate gates.

## OPI 07 boundary

Frozen English prompt: `Where do you live and who do you live with?`

The HNK v1.1 design uses two microquestions because the English card contains two semantic goals:

1. `EN VANI KUVAN KE` — test reading: `Where do you live?`
2. `EN VANI KUON KE` — test reading: `Who do you live with?`

Governance:

- `VANI` remains recovered `LEX-031`, authority `WATCH`, Master Lexicon meaning **null**;
- `VANI ≈ live/reside` exists only as a semantic hypothesis for this test lane;
- `KUVAN` remains `AUTH-001 CANDIDATE`;
- `KUON` is `AUTH-003 CANDIDATE`, derived from `KU + ON` with an explicit dependency on `ON` remaining `GATE`;
- `KUON` does not retroactively make `KU = WHO` or `ON = person` in recovered canon;
- no HNK equivalent of English `WITH` was invented;
- co-resident meaning is modeled only through an experimental valency of the residence predicate;
- human linguistic/pedagogical validation remains mandatory.

Historical SimpleWay material confirms that `I live` belongs to Lesson 1 and `She lives` recurs in Cycle 1, but no recovered source found so far assigns that meaning to `VANI`.

## OPI 10 boundary

The frozen English prompt remains `What do you do on weekends?`.

HNK v1.1 does **not** claim `VAMUSARO = weekend`. Instead:

- `VAMUSARO` retains its recovered FROZEN meaning `rest / leisure period`;
- it is used as a separate discourse/UI context label;
- the question remains `EN KU VALA KE`;
- semantic fidelity remains approximate and HOLD.

## Authored language registry

Canonical owner: `@hnk/linguas/authored`.

- `AUTH-001 KUVAN` — locative interrogative specialization, `CANDIDATE`, not recovered.
- `AUTH-002 VALA` — generic activity nominal head, `CANDIDATE`, not recovered.
- `AUTH-003 KUON` — person-interrogative specialization, `CANDIDATE`, depends on `ON=GATE`, not recovered.

Recovered-form count remains **31**. Adding authored candidates does not rewrite historical recovery metrics.

## Historical L01 evidence

Recovered v1.0 proves:

- 10 OPI;
- 72 teacher drills;
- HNK question/answer/glyph/segment fields existed in the release model.

The raw v1.0 payload is still missing, so those 82 historical frozen-evidence slots are not counted as current `FROZEN` implementation.

## What 10/10 means

`10/10 AUTHORED` means every frozen English OPI slot now has a reproducible governed HNK v1.1 design.

It does **not** mean:

- 10/10 historical HNK translations were recovered;
- 10/10 are linguistically validated;
- WATCH or GATE material was promoted;
- Candidate D glyph visuals became official visual canon;
- Lesson 1 as a whole is complete — Activation, vocabulary, stories, Q&A, structures and review remain separate tracker categories.

## Commands

```bash
npm run progress
npm run progress:write
npm run validate:progress
npm run validate:l01-opi001
npm run validate:interrogatives
npm test
```

GitHub Actions has previously failed before executing steps, so versioned tests must not be described as remotely green without an observed successful runner execution.

## Rule

No authored form is mislabeled as recovered; no WATCH/CANDIDATE/GATE item is silently promoted; unknown historical meanings stay unknown until source recovery or an explicit governed promotion decision.
