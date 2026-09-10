# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V17`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.20.0`

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

Validated: **2, 4, 5, 6, 8, 9, 10**.  
HOLD: **1, 3, 7**.

## Language assets

Recovered Cycle 1 forms remain **31/144 = 21.5278% proxy**.

Canonical authored candidates are now **14**:

`KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

Governed unique language assets: **45/144 = 31.25% proxy**.

The ten numerals are newly authored `CANDIDATE` primitives; none is historical recovery or FROZEN.

## Spoken HNK numerals 0–9

| Value | HNK | Registry |
|---:|---|---|
| 0 | `BIZO` | AUTH-005 |
| 1 | `DUVE` | AUTH-006 |
| 2 | `HOYU` | AUTH-007 |
| 3 | `KETI` | AUTH-008 |
| 4 | `LUSO` | AUTH-009 |
| 5 | `MUPI` | AUTH-010 |
| 6 | `NURA` | AUTH-011 |
| 7 | `PEVU` | AUTH-012 |
| 8 | `TOMI` | AUTH-013 |
| 9 | `ZOKA` | AUTH-014 |

All remain `CANDIDATE`. Registration did not validate OPI 3.

## Cardinal 10–99 proposal

Prepared rule, **not yet canonically approved**:

`DIGIT_TENS DIGIT_UNITS`

Interpretation in numeric/cardinal context:

`10 × value(first) + value(second)`

Examples:

- 10 → `DUVE BIZO`
- 18 → `DUVE TOMI`
- 42 → `LUSO HOYU`
- 99 → `ZOKA ZOKA`

This creates no new lexical forms, no TEN morpheme, no 100+ rule and no claim of historical number grammar.

## OPI 3 — next gate

Current question:

`EN KU SARASALA KE`

`SARASALA` remains `WATCH` with recovered meaning time/duration.

Prepared answer design:

- 8 → `TOMI`
- 18 → `DUVE TOMI`
- 42 → `LUSO HOYU`

No word for year/years is introduced; the proposal uses a bare cardinal because the OPI context already supplies the age domain.

Prepared human gate:

`SWHNK-L01-OPI-003-AGE-CARDINAL-HUMAN-BATCH-V1`

If all scoped decisions are approved, OPI 3 can move to `VALIDATED`, taking L01 to **8/10 = 80%** without any language-authority promotion.

## Remaining HOLD after that projected transition

- OPI 1 — historical `YA/ES` token alignment unresolved.
- OPI 7 — `VANI` meaning null + `KUON/ON=GATE` + co-resident valency.

## CI boundary

Run locally/CI with:

```bash
npm test
npm run validate:numbers
npm run validate:numeral-candidates
npm run validate:cardinals
```

Remote CI must not be described as green without an observed successful GitHub Actions runner.
