# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V11`  
**Date:** 2026-09-09  
**Package:** `simpleway-hnk@0.13.0`

## Progress model

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

Implementation states are exclusive. Maturity is cumulative: a `VALIDATED` slot also counts as `AUTHORED_OR_BETTER`.

## Current dashboard

Cycle 1 target: **1,008 pedagogical slots**.

Exclusive current states:

- `MISSING`: **998 / 1,008 = 99.0079%**
- `AUTHORED`: **6 / 1,008 = 0.5952%**
- `VALIDATED`: **4 / 1,008 = 0.3968%**
- reproducible `FROZEN`: **0 / 1,008**

Cumulative maturity:

- `AUTHORED_OR_BETTER`: **10 / 1,008 = 0.9921%**
- `VALIDATED_OR_BETTER`: **4 / 1,008 = 0.3968%**
- `FROZEN`: **0 / 1,008**

Historical evidence remains separate:

- `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**
- breakdown: 10 historical L01 OPI + 72 historical L01 Activation drills
- raw v1.0 payload remains unrecovered, so these 82 are not current reproducible `FROZEN` slots.

## Lesson 1 OPI

All 10 cards are authored and individually reviewed.

- `AUTHORED_OR_BETTER`: **10/10 = 100%**
- `VALIDATED_OR_BETTER`: **4/10 = 40%**
- `FROZEN`: **0/10**

| OPI | HNK v1.1 | Current state |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | AUTHORED · reviewed HOLD |
| 02 | `EN VAMAKALA KE` | AUTHORED · reviewed HOLD |
| 03 | `EN KU SARASALA KE` | AUTHORED · reviewed HOLD |
| 04 | `EN SARADAYA KUVAN KE` | **VALIDATED** — scoped L01 v1.1 use |
| 05 | `EN VALI KUVAN KE` | **VALIDATED** — scoped L01 v1.1 use |
| 06 | `EN KU VALA KE` | **VALIDATED** — scoped content frame with work/school context |
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | AUTHORED · reviewed HOLD |
| 08 | `EN KU VAMAVALA KE` | **VALIDATED** — scoped content frame; WATCH remains visible |
| 09 | `EN VAME VAMAZAMU KE` | AUTHORED · reviewed HOLD |
| 10 | context `VAMUSARO` + `EN KU VALA KE` | AUTHORED · reviewed HOLD |

## Applied validation batches

### Batch 1 — locative questions

Validated OPI 4 and 5 by approving only for those course slots:

- `KUVAN` as the locative interrogative variable;
- `EN ... KE` as the beginner second-person interrogative frame;
- `[PLACE]` as the minimal answer pattern.

`KUVAN` remains `CANDIDATE`; no historical-recovery or FROZEN claim was created.

### Batch 2 — content questions

Validated OPI 6 and 8 by approving only for those course slots:

- `EN KU X KE` as a scoped v1.1 content-question frame;
- `VALA` as the OPI 6 activity head while remaining `CANDIDATE`;
- `VAMAVALA` for OPI 8 course use while remaining `WATCH`;
- explicit card context to supply the work/school domain in OPI 6;
- bare `[ACTIVITY_DESCRIPTION]` and `[HOBBY_OR_PLEASURE_ACTIVITY]` response slots without invented function words.

This does **not** define historical `KU = WHAT/WHICH`, does not universalize the frame, and changes no language authority.

## Cycle 1 OPI progress

Across the 70 OPI target:

- `AUTHORED_OR_BETTER`: **10/70 = 14.2857%**
- `VALIDATED_OR_BETTER`: **4/70 = 5.7143%**
- `FROZEN`: **0/70**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- authored candidates: **3** — `KUVAN`, `VALA`, `KUON`
- governed unique language assets: **34/144 = 23.6111% proxy**
- recovered phrases: **7**

These are language-asset coverage proxies, not completed vocabulary-slot percentages.

## Remaining HOLD cards

- OPI 1: approximate historical gloss; `YA` and `ES` unresolved.
- OPI 2: possession/HAVE relation and negative no-nickname response unresolved.
- OPI 3: `SARASALA` WATCH plus number/age system open.
- OPI 7: `VANI` meaning null, `KUON` CANDIDATE, `ON=GATE`, experimental co-resident valency.
- OPI 9: `VAME` GATE, `VAMAZAMU` WATCH, yes/no answer strategy open.
- OPI 10: the question frame is now stronger because `EN KU VALA KE` passed OPI 6 validation, but `VAMUSARO = rest/leisure period` is still broader than exact `weekend`.

## Next validation selection

Recommended next candidates:

1. **OPI 10** — now structurally inherits a validated content-question frame; the remaining decision is chiefly whether the broader `VAMUSARO` leisure-period context is acceptable as a clearly labeled contextual equivalent of “weekends”, or whether an exact weekend system must be authored first.
2. **OPI 2** — strong FROZEN nickname core, but it needs a governed possession/existential interpretation and a negative-answer policy.

High-risk cards remain OPI 3, 7 and 9.

## Commands

```bash
npm run progress
npm run progress:write
npm run validate:progress
npm run validate:l01-opi001
npm run validate:interrogatives
npm run validate:opi-matrix
npm test
```

## CI boundary

Versioned tests have been synchronized to the V11 state, but remote CI must not be called green until an actual GitHub Actions runner executes successfully.

## Rule

Course validation does not rewrite historical recovery or language authority. No authored form is mislabeled as recovered; no WATCH/CANDIDATE/GATE item is silently promoted; unknown historical meanings stay unknown until source recovery or explicit governed promotion.
