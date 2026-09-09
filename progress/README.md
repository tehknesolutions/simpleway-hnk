# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V10`  
**Date:** 2026-09-09  
**Package:** `simpleway-hnk@0.12.0`

## Progress model

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

Implementation states are exclusive. Maturity is cumulative: a `VALIDATED` slot is also counted as `AUTHORED_OR_BETTER`.

## Current dashboard

Cycle 1 target: **1,008 pedagogical slots**.

Exclusive current states:

- `MISSING`: **998 / 1,008 = 99.0079%**
- `AUTHORED`: **8 / 1,008 = 0.7937%**
- `VALIDATED`: **2 / 1,008 = 0.1984%**
- reproducible `FROZEN`: **0 / 1,008**

Cumulative maturity:

- `AUTHORED_OR_BETTER`: **10 / 1,008 = 0.9921%**
- `VALIDATED_OR_BETTER`: **2 / 1,008 = 0.1984%**
- `FROZEN`: **0 / 1,008**

Historical evidence remains separate:

- `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**
- breakdown: 10 historical L01 OPI + 72 historical L01 Activation drills
- raw v1.0 payload remains unrecovered, so these 82 are not current reproducible `FROZEN` slots.

## Lesson 1 OPI

All 10 cards have been authored and individually reviewed.

- `AUTHORED_OR_BETTER`: **10/10 = 100%**
- `VALIDATED_OR_BETTER`: **2/10 = 20%**
- `FROZEN`: **0/10**

| OPI | HNK v1.1 | Current state |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | AUTHORED · reviewed HOLD |
| 02 | `EN VAMAKALA KE` | AUTHORED · reviewed HOLD |
| 03 | `EN KU SARASALA KE` | AUTHORED · reviewed HOLD |
| 04 | `EN SARADAYA KUVAN KE` | **VALIDATED** for scoped L01 v1.1 use |
| 05 | `EN VALI KUVAN KE` | **VALIDATED** for scoped L01 v1.1 use |
| 06 | `EN KU VALA KE` | AUTHORED · reviewed HOLD |
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | AUTHORED · reviewed HOLD |
| 08 | `EN KU VAMAVALA KE` | AUTHORED · reviewed HOLD |
| 09 | `EN VAME VAMAZAMU KE` | AUTHORED · reviewed HOLD |
| 10 | context `VAMUSARO` + `EN KU VALA KE` | AUTHORED · reviewed HOLD |

The first validation batch covered OPI 4 and 5. It explicitly approved, only for this course scope:

- `KUVAN` as the L01 locative interrogative variable;
- `EN ... KE` as the beginner second-person question frame for these two cards;
- bare `[PLACE]` as the answer pattern.

This validation does **not** promote `KUVAN` from `CANDIDATE`, does not claim historical recovery, and does not freeze the cards.

## Cycle 1 OPI progress

Across the 70 OPI target:

- `AUTHORED_OR_BETTER`: **10/70 = 14.2857%**
- `VALIDATED_OR_BETTER`: **2/70 = 2.8571%**
- `FROZEN`: **0/70**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- authored candidates: **3** — `KUVAN`, `VALA`, `KUON`
- governed unique language assets: **34/144 = 23.6111% proxy**
- recovered phrases: **7**

These are language-asset proxies, not completed vocabulary-slot percentages.

## Review results

All 10 OPI have review records. The eight current HOLD cards are blocked for different reasons:

- OPI 1: approximate historical gloss; `YA` and `ES` unresolved;
- OPI 2: possession/HAVE and negative-response path unresolved;
- OPI 3: `SARASALA` WATCH plus number/age system open;
- OPI 6: `VALA` CANDIDATE plus contextual work/school equivalence and response inventory;
- OPI 7: `VANI` meaning null, `KUON` CANDIDATE, `ON=GATE`, experimental co-resident valency;
- OPI 8: `VAMAVALA` WATCH plus inferred content-question grammar;
- OPI 9: `VAME` GATE, `VAMAZAMU` WATCH, yes/no strategy open;
- OPI 10: leisure-period context is broader than exact weekend semantics.

## Next validation batch

Recommended next candidates:

1. `L01-OPI-006` — activity question;
2. `L01-OPI-008` — hobbies question.

They share the emerging `EN KU X KE` content-question family, so a single tightly scoped human decision may validate both while keeping `VALA` CANDIDATE and `VAMAVALA` WATCH unless separately promoted.

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

`npm run progress` now reports both exclusive implementation states and cumulative maturity metrics.

## CI boundary

GitHub Actions has previously failed before executing steps and recent commits have shown no remote checks/runs. Versioned tests must not be described as remotely green until an actual runner execution succeeds.

## Rule

Course validation does not rewrite historical recovery or language authority. No authored form is mislabeled as recovered; no WATCH/CANDIDATE/GATE item is silently promoted; unknown historical meanings stay unknown until source recovery or explicit governed promotion.
