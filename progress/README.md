# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V15`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.18.0`

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

## Language assets

Canonical/governed now:

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **4** — `KUVAN`, `VALA`, `KUON`, `NE`
- canonical governed unique language assets: **35/144 = 24.3056% proxy**

Proposal-only numeral forms are tracked separately and do **not** increase the 35 governed assets until explicit promotion.

## Number system — candidate generation complete

Recovery across GitHub, File Library and Google Drive found no historical HNK numeral lexicon or cardinal-composition rule.

The approved authoring strategy is `TEN_PRIMITIVE_DIGIT_NUMERALS`: one independently authored primitive for each value 0–9, each starting as a CANDIDATE and never as historical recovery.

The first collision-audited candidate set is:

| Value | HNK candidate | G-IDs | State |
|---:|---|---|---|
| 0 | `BIZO` | `G18·G03·G32·G04` | PROPOSAL ONLY |
| 1 | `DUVE` | `G19·G05·G31·G02` | PROPOSAL ONLY |
| 2 | `HOYU` | `G07·G04·G40·G05` | PROPOSAL ONLY |
| 3 | `KETI` | `G23·G02·G22·G03` | PROPOSAL ONLY |
| 4 | `LUSO` | `G14·G05·G26·G04` | PROPOSAL ONLY |
| 5 | `MUPI` | `G11·G05·G21·G03` | PROPOSAL ONLY |
| 6 | `NURA` | `G12·G05·G15·G01` | PROPOSAL ONLY |
| 7 | `PEVU` | `G21·G02·G31·G05` | PROPOSAL ONLY |
| 8 | `TOMI` | `G22·G04·G11·G03` | PROPOSAL ONLY |
| 9 | `ZOKA` | `G32·G04·G23·G01` | PROPOSAL ONLY |

Audit constraints satisfied by this set:

- CVCV forms using safe HNK40 transliteration only;
- 10 distinct initial consonants;
- minimum Levenshtein/edit distance **3** from every current recovered or authored form;
- minimum edit distance **3** between numeral candidates;
- no exact collision;
- no numerology used to map number→form;
- no glyph visual symbolism used to assign meaning.

The mapping was made semantically neutral: concept order `NUM-0..NUM-9` was fixed first, the collision-safe form set was then alphabetically ordered and assigned sequentially. This is an authoring convention, not recovered history.

## Promotion boundary

The concrete candidate mapping has **not** been registered in `@hnk/linguas/authored`.

Current canonical authored candidates remain only:

`KUVAN`, `VALA`, `KUON`, `NE`.

The prepared promotion batch proposes future IDs:

`AUTH-005 BIZO` through `AUTH-014 ZOKA`.

If explicitly approved, governed unique language assets would move from **35 → 45**, while recovered Cycle 1 forms remain **31** and all ten numeral forms remain `CANDIDATE`.

Even that promotion would **not** validate OPI 3 automatically. We would still need to govern:

1. how cardinals above 9 are composed;
2. how age values are spoken;
3. whether a year/age unit is needed;
4. the final semantic acceptance of `EN KU SARASALA KE`.

Current gate:

`SWHNK-HNK-SPOKEN-NUMERAL-0-9-CANDIDATE-PROMOTION-BATCH-V1`

## Remaining HOLD triage

1. **OPI 3 — priority 1:** numeral candidate promotion + age construction.
2. **OPI 1 — priority 2:** historical `YA/ES` token alignment.
3. **OPI 7 — priority 3:** `VANI` meaning-null + `KUON/ON=GATE` + co-resident valency.

## CI boundary

Run locally/CI with:

```bash
npm test
npm run validate:numbers
npm run validate:numeral-candidates
```

Remote CI must not be described as green without an observed successful GitHub Actions runner.
