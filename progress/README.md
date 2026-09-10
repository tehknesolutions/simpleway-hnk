# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V13`  
**Date:** 2026-09-09  
**Package:** `simpleway-hnk@0.15.0`

## Progress model

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

Implementation states are exclusive. Maturity is cumulative: a `VALIDATED` slot also counts as `AUTHORED_OR_BETTER`.

## Current dashboard

Cycle 1 target: **1,008 pedagogical slots**.

Exclusive current states:

- `MISSING`: **998 / 1,008 = 99.0079%**
- `AUTHORED`: **4 / 1,008 = 0.3968%**
- `VALIDATED`: **6 / 1,008 = 0.5952%**
- reproducible `FROZEN`: **0 / 1,008**

Cumulative maturity:

- `AUTHORED_OR_BETTER`: **10 / 1,008 = 0.9921%**
- `VALIDATED_OR_BETTER`: **6 / 1,008 = 0.5952%**
- `FROZEN`: **0 / 1,008**

Historical evidence remains separate:

- `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**
- breakdown: 10 historical L01 OPI + 72 historical L01 Activation drills
- raw v1.0 payload remains unrecovered, so these 82 are not current reproducible `FROZEN` slots.

## Lesson 1 OPI

All 10 cards are authored and individually reviewed.

- `AUTHORED_OR_BETTER`: **10/10 = 100%**
- `VALIDATED_OR_BETTER`: **6/10 = 60%**
- `FROZEN`: **0/10**

| OPI | HNK v1.1 | Current state |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | AUTHORED · reviewed HOLD |
| 02 | `EN VAMAKALA KE` | **VALIDATED** — `[NICKNAME]` / `NE VAMAKALA` |
| 03 | `EN KU SARASALA KE` | AUTHORED · reviewed HOLD |
| 04 | `EN SARADAYA KUVAN KE` | **VALIDATED** — scoped L01 v1.1 use |
| 05 | `EN VALI KUVAN KE` | **VALIDATED** — scoped L01 v1.1 use |
| 06 | `EN KU VALA KE` | **VALIDATED** — scoped content frame with work/school context |
| 07 | `EN VANI KUVAN KE` + `EN VANI KUON KE` | AUTHORED · reviewed HOLD |
| 08 | `EN KU VAMAVALA KE` | **VALIDATED** — scoped content frame; WATCH remains visible |
| 09 | `EN VAME VAMAZAMU KE` | AUTHORED · reviewed HOLD; Batch 4 prepared |
| 10 | context `VAMUSARO` + `EN KU VALA KE` | **VALIDATED** — approximate contextual equivalent |

## Applied validation batches

- Batch 1: OPI 4 + 5 — locative questions.
- Batch 2: OPI 6 + 8 — content questions.
- Batch 3: OPI 10 — contextual leisure/weekend equivalence.
- Batch 3B: OPI 2 — nickname nominal interview + scoped authored negation/absence.

None of these course validations rewrites recovered history or automatically promotes language authority.

## OPI 2 / AUTH-004 NE

OPI 2 was validated without creating an English-calque HAVE verb:

- question: `EN VAMAKALA KE`;
- affirmative: `[NICKNAME]`;
- negative: `NE VAMAKALA`;
- `VAMAKALA` remains recovered `FROZEN`;
- `NE` is `AUTH-004`, authored `CANDIDATE`, G-IDs `G12 · G02`;
- `NE` is not claimed as recovered historical HNK;
- global negation productivity is not granted;
- historical possession and EN subject-vs-possessive analysis remain unresolved.

## Cycle 1 OPI progress

Across the 70 OPI target:

- `AUTHORED_OR_BETTER`: **10/70 = 14.2857%**
- `VALIDATED_OR_BETTER`: **6/70 = 8.5714%**
- `FROZEN`: **0/70**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- authored candidates: **4** — `KUVAN`, `VALA`, `KUON`, `NE`
- governed unique language assets: **35/144 = 24.3056% proxy**
- recovered phrases: **7**

These are language-asset coverage proxies, not completed vocabulary-slot percentages.

## Remaining HOLD cards

- OPI 1: approximate historical gloss; `YA` and `ES` unresolved.
- OPI 3: `SARASALA` WATCH plus number/age system open.
- OPI 7: `VANI` meaning null, `KUON` CANDIDATE, `ON=GATE`, experimental co-resident valency.
- OPI 9: `VAME` GATE and `VAMAZAMU` WATCH.

## Batch 4 — prepared, not applied

Selected next card: **L01-OPI-009**.

Question:

`EN VAME VAMAZAMU KE`

Proposed dialogue-fragment responses:

- affirmative: `VAME VAMAZAMU`;
- negative: `NE VAME VAMAZAMU`.

The prepared human batch requires four scoped decisions: allow `VAME` in this card while retaining `GATE`; allow `VAMAZAMU` while retaining `WATCH`; extend `NE` to predicate-phrase negation only in this card while retaining `CANDIDATE`; and accept the question/echo-response system as a functional beginner preference exchange.

No new lexical form is required. No authority promotion is projected. If later approved, OPI validation would move **6/10 -> 7/10 = 70%**. Until then, current progress remains 60%.

Current gate:

`SWHNK-L01-OPI-009-PREFERENCE-NEGATION-HUMAN-BATCH-V1`

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

Versioned tests are synchronized to the V13/Batched-4-prepared state, but remote CI must not be called green until an actual GitHub Actions runner executes successfully.

## Rule

Course validation does not rewrite historical recovery or language authority. No authored form is mislabeled as recovered; no WATCH/CANDIDATE/GATE item is silently promoted; unknown historical meanings stay unknown until source recovery or explicit governed promotion.
