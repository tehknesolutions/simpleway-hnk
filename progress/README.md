# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V18`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.21.0`

## Progress

Cycle 1 target: **1,008 pedagogical slots**.

- `MISSING`: **998/1,008 = 99.0079%**
- `AUTHORED`: **2/1,008 = 0.1984%**
- `VALIDATED`: **8/1,008 = 0.7937%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **10/1,008 = 0.9921%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI

- authored-or-better: **10/10 = 100%**
- reviewed: **10/10 = 100%**
- validated: **8/10 = 80%**
- frozen: **0/10**

Validated: **2, 3, 4, 5, 6, 8, 9, 10**.  
HOLD: **1, 7**.

## Language assets

Recovered Cycle 1 forms remain **31/144 = 21.5278% proxy**.

Canonical authored candidates: **14** — `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

Governed unique language assets: **45/144 = 31.25% proxy**.

The ten numerals are newly authored `CANDIDATE` primitives; none is historical recovery or FROZEN.

## OPI 3 — validated age/cardinal lane

Question:

`EN KU SARASALA KE`

`SARASALA` remains `WATCH = time/duration`.

Approved scoped answer design:

- 8 → `TOMI`
- 18 → `DUVE TOMI`
- 42 → `LUSO HOYU`

For 10–99, the scoped v1.1 rule is:

`DIGIT_TENS DIGIT_UNITS`

Interpretation in numeric/cardinal context:

`10 × value(first) + value(second)`

Examples: `DUVE BIZO` = 10, `DUVE TOMI` = 18, `LUSO HOYU` = 42, `ZOKA ZOKA` = 99.

This rule is approved **only for the L01 OPI 3 numeric/cardinal context**. It does not create a TEN morpheme, year/years lexeme, 100+ grammar, ordinals or historical-number-system claim. Numeral primitives remain `CANDIDATE`; `SARASALA` remains `WATCH`.

## Remaining HOLD triage

### OPI 1

`KALA YA EN ES KU KE` is an actually recovered phrase with approximate whole-sentence gloss `What is your name?`. `YA` and `ES` still have no recovered token-level meanings. The promising next route is **whole-utterance validation**: approve the recovered phrase as an indivisible beginner formula without assigning invented meanings to its unresolved tokens.

### OPI 7

`EN VANI KUVAN KE` + `EN VANI KUON KE` remains the highest-risk card. `VANI` is recovered but its meaning is still `null`; `live/reside` is only a semantic hypothesis. `KUON` remains CANDIDATE and depends on `ON=GATE`; co-resident valency is authored/test-only.

## Next gate

`SWHNK-L01-OPI-001-AND-007-HOLD-TRIAGE-V1`

Recommended first target: OPI 1 whole-utterance validation, because it preserves the historical recovered phrase exactly and can avoid inventing token meanings.

## CI boundary

Run locally/CI with:

```bash
npm test
npm run validate:numbers
npm run validate:numeral-candidates
npm run validate:cardinals
```

Remote CI must not be described as green without an observed successful GitHub Actions runner.
