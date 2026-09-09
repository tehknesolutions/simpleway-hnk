# SimpleWay HNK — Cycle 1 Progress

**Current checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V7`  
**Date:** 2026-09-09  
**Package:** `simpleway-hnk@0.8.0`

## Progress model

Historical evidence and current reproducible implementation are separate.

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

A slot may be `AUTHORED` while remaining below `VALIDATED` because WATCH/CANDIDATE/GATE material, inferred grammar, answer strategies or human review are still open.

## Current Cycle 1 dashboard

Target: **1,008 pedagogical slots**.

- `AUTHORED`: **8 / 1,008 = 0.7937%**
- `VALIDATED`: **0 / 1,008**
- current reproducible `FROZEN`: **0 / 1,008**
- historical `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**
- scaffolded L01 slots: **82 / 1,008 = 8.1349%**

Language-asset proxies:

- recovered Cycle 1 forms: **31 / 144 = 21.5278%**
- governed authored candidates: **2** — `KUVAN`, `VALA`
- governed unique language assets: **33 / 144 = 22.9167%**
- recovered phrases: **7**

These are asset-coverage proxies, **not vocabulary-slot completion**.

## Lesson 1 — OPI

L01 OPI authorship: **8 / 10 = 80%**.  
Cycle 1 OPI authorship: **8 / 70 = 11.4286%**.  
L01 total-slot authorship: **8 / 155 = 5.1613%**.

| OPI | HNK | Main authority/gate |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | recovered PHR-001 · semantic HOLD |
| 02 | `EN VAMAKALA KE` | FROZEN core · grammar HOLD |
| 03 | `EN KU SARASALA KE` | SARASALA WATCH · contextual age HOLD |
| 04 | `EN SARADAYA KUVAN KE` | FROZEN core + KUVAN CANDIDATE |
| 05 | `EN VALI KUVAN KE` | FROZEN VALI rebind + KUVAN CANDIDATE |
| 06 | `EN KU VALA KE` | VALA CANDIDATE · contextual activity HOLD |
| 07 | — | **MISSING** · residence + WHO + WITH |
| 08 | `EN KU VAMAVALA KE` | VAMAVALA WATCH · inferred KU frame |
| 09 | `EN VAME VAMAZAMU KE` | VAME GATE + VAMAZAMU WATCH · experimental |
| 10 | — | **MISSING** · weekend/temporal-leisure relation |

No OPI is yet fully `VALIDATED`.

## Recovered vs authored language

### Recovered layer

The recovered Master Lexicon remains **33 forms total**, with **31 unique forms linked to Cycle 1**. New authorship does not change that historical count.

`VALI = work / trabalhar` remains historically recovered for L02/L03. The Cycle 1 layer permits teaching it in L01 through an explicit curriculum rebind; provenance is not rewritten.

### Governed authored layer

`@hnk/linguas/authored` currently contains:

1. `AUTH-001 KUVAN` — locative interrogative specialization, `CANDIDATE`, not recovered.
2. `AUTH-002 VALA` — generic activity nominal head, `CANDIDATE`, authored by corpus-facing back-analysis, not recovered.

Recovered forms, curriculum rebinds and authored candidates remain separate metrics.

## Interrogative recovery

Current evidence supports only a non-canonical analysis:

- `KE` — strong candidate clause-final interrogative operator;
- `EN` — inferred second-person referent;
- `KU` — inferred pre-nominal interrogative content selector/determiner;
- `ZAMO` — inferred language/language-domain noun;
- `SARI`, `LO`, `DA` — unresolved.

The contrast:

- `EN ZAMI HENUVOKODAN KE`
- `EN ZAMI KU ZAMO KE`

supports the structural reading of `KU ZAMO` as a content phrase compatible with “what/which language”, but does **not** recover a fixed English gloss for `KU`.

`KU` must therefore not be labeled historically as WHAT, WHICH, WHERE, WHO or HOW.

## Historical Lesson 1 evidence

The recovered release proves a `PUBLICATION-FROZEN` L01 v1 with:

- 10 OPI;
- 72 teacher drills;
- HNK question/answer/glyph/segment fields in the data model.

The raw `lesson1.release.v1.json` / `lesson1-data.js` payload is still missing, so the historical 82 frozen-evidence slots are not counted as current reproducible `FROZEN` implementation.

## Remaining OPI gates

### OPI 07

`Where do you live and who do you live with?`

Open requirements:

- live/reside predicate or equivalent construction;
- WHO/person interrogative;
- comitative WITH relation.

`VANI` is a recovered WATCH form with `meaning = null`. Morphology makes it a high-value recovery target, but **it must not be assigned “live/reside” without evidence**.

### OPI 10

`What do you do on weekends?`

Relevant assets:

- `VAMUSARO` — FROZEN rest/leisure period;
- `SARASALA` — WATCH time/duration;
- `VALA` — authored CANDIDATE activity noun;
- `KU` — inferred content selector.

No recovered source currently says `VAMUSARO = weekend`, and no governed temporal relation yet licenses a standalone weekend phrase. OPI 10 remains MISSING rather than forcing an unsupported compound.

## Commands

```bash
npm run progress
npm run progress:write
npm run validate:progress
npm run validate:l01-opi001
npm run validate:interrogatives
npm test
```

GitHub Actions has previously failed before executing test steps, so versioned tests must not be described as remotely green unless an actual runner execution is observed.

## Progress rule

Every percentage increase must correspond to a concrete repo transition. No authored form is mislabeled as recovered; no WATCH/CANDIDATE/GATE material is silently promoted; unknown glosses stay unknown until source recovery or explicit governed authorship.
