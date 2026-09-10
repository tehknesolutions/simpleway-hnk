# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V12`  
**Date:** 2026-09-09  
**Package:** `simpleway-hnk@0.14.0`

## Progress model

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

Implementation states are exclusive. Maturity is cumulative: a `VALIDATED` slot also counts as `AUTHORED_OR_BETTER`.

## Current dashboard

Cycle 1 target: **1,008 pedagogical slots**.

Exclusive current states:

- `MISSING`: **998 / 1,008 = 99.0079%**
- `AUTHORED`: **5 / 1,008 = 0.4960%**
- `VALIDATED`: **5 / 1,008 = 0.4960%**
- reproducible `FROZEN`: **0 / 1,008**

Cumulative maturity:

- `AUTHORED_OR_BETTER`: **10 / 1,008 = 0.9921%**
- `VALIDATED_OR_BETTER`: **5 / 1,008 = 0.4960%**
- `FROZEN`: **0 / 1,008**

Historical evidence remains separate:

- `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**
- breakdown: 10 historical L01 OPI + 72 historical L01 Activation drills
- raw v1.0 payload remains unrecovered, so these 82 are not current reproducible `FROZEN` slots.

## Lesson 1 OPI

All 10 cards are authored and individually reviewed.

- `AUTHORED_OR_BETTER`: **10/10 = 100%**
- `VALIDATED_OR_BETTER`: **5/10 = 50%**
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
| 10 | context `VAMUSARO` + `EN KU VALA KE` | **VALIDATED** — approximate contextual equivalent |

## Applied validation batches

### Batch 1 — locative questions

Validated OPI 4 and 5. `KUVAN` remains `CANDIDATE`; no historical-recovery or FROZEN claim was created.

### Batch 2 — content questions

Validated OPI 6 and 8. `VALA` remains `CANDIDATE`, `VAMAVALA` remains `WATCH`, and `KU` retains no exact recovered WH gloss.

### Batch 3 — contextual weekend equivalence

Validated OPI 10 only for the scoped L01 v1.1 pedagogical use:

- `VAMUSARO` remains FROZEN with the unchanged meaning **rest / leisure period**;
- `VAMUSARO` is **not** translated or redefined as `weekend`;
- `EN KU VALA KE` reuses the already validated activity-question precedent from OPI 6;
- semantic fidelity remains explicitly `APPROXIMATE_CONTEXTUAL_EQUIVALENT`;
- `VALA` remains `CANDIDATE`;
- no weekend lexeme was created.

## Cycle 1 OPI progress

Across the 70 OPI target:

- `AUTHORED_OR_BETTER`: **10/70 = 14.2857%**
- `VALIDATED_OR_BETTER`: **5/70 = 7.1429%**
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

## Next gate

`SWHNK-L01-OPI-002-POSSESSION-NEGATION-DESIGN-V1`

The next objective is to solve OPI 2 without inventing an English-calque HAVE verb. Preferred route: determine whether the beginner card can use a nominal/existential strategy plus an explicit governed no-nickname response. Only after that should OPI 2 enter another human validation batch.

High-risk cards after OPI 2 remain OPI 3, 7 and 9.

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

Versioned tests are synchronized to the V12 state, but remote CI must not be called green until an actual GitHub Actions runner executes successfully.

## Rule

Course validation does not rewrite historical recovery or language authority. No authored form is mislabeled as recovered; no WATCH/CANDIDATE/GATE item is silently promoted; unknown historical meanings stay unknown until source recovery or explicit governed promotion.
