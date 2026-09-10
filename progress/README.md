# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V14`  
**Date:** 2026-09-09  
**Current package:** `simpleway-hnk@0.17.0`

## Progress

Cycle 1 target: **1,008 pedagogical slots**.

- `MISSING`: **998/1,008 = 99.0079%**
- `AUTHORED`: **3/1,008 = 0.2976%**
- `VALIDATED`: **7/1,008 = 0.6944%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **10/1,008 = 0.9921%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI

- authored-or-better: **10/10 = 100%**
- reviewed: **10/10 = 100%**
- validated: **7/10 = 70%**
- frozen: **0/10**

Validated OPI: **2, 4, 5, 6, 8, 9, 10**.

HOLD: **1, 3, 7**.

## Batch 4 — applied

OPI 9 question: `EN VAME VAMAZAMU KE`.

Responses:

- affirmative: `VAME VAMAZAMU`;
- negative: `NE VAME VAMAZAMU`.

Authorities are unchanged: `VAME=GATE`, `VAMAZAMU=WATCH`, `NE=AUTH-004 CANDIDATE`. Predicate negation with `NE` is scoped to this card only; no global yes/no or predicate-negation grammar was granted.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- authored candidates: **4** — `KUVAN`, `VALA`, `KUON`, `NE`
- governed unique language assets: **35/144 = 24.3056% proxy**
- recovered phrases: **7**

These are asset-coverage proxies, not completed vocabulary slots.

## Remaining HOLD triage

1. **OPI 3 — priority 1:** age + number system.
2. **OPI 1 — priority 2:** historical `YA/ES` token alignment.
3. **OPI 7 — priority 3:** `VANI` meaning-null + `KUON/ON=GATE` + co-resident valency.

## Number-system gate

Recovery across connected GitHub, File Library and Google Drive found no historical HNK numeral lexicon or cardinal-composition rule.

Therefore the numeric architecture now separates:

- mathematical numeric value;
- external ASCII digit bridge for UI/data;
- spoken HNK numerals, still unauthored.

`HNK_NUMERIC_LITERAL_BRIDGE_V1` permits display values such as `8`, `18`, `42` without calling Arabic digits HNK glyphs or HNK words.

The recommended spoken strategy is `TEN_PRIMITIVE_DIGIT_NUMERALS`: author one independent CANDIDATE primitive for each value 0–9, then design 10–99 in a later gate. **All ten HNK forms are still `null`; none has been generated.**

This strategy explicitly rejects deriving numeral forms from numerology, G01–G10 ordinals, visual glyph appearance or an assumed base-12 system.

Current gate:

`SWHNK-HNK-SPOKEN-NUMERAL-0-9-AUTHORING-DECISION-V1`

If approved, the next action is candidate generation and collision/HNK40 auditing. This decision alone does not validate OPI 3.

## CI boundary

Run locally/CI with:

```bash
npm test
npm run validate:numbers
```

Remote CI must not be described as green without an observed successful GitHub Actions runner.
