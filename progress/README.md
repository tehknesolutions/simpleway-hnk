# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V20`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.23.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **998/1,008 = 99.0079%**
- `AUTHORED`: **1/1,008 = 0.0992%**
- `VALIDATED`: **9/1,008 = 0.8929%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **10/1,008 = 0.9921%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI

- authored-or-better: **10/10 = 100%**
- reviewed: **10/10 = 100%**
- validated: **9/10 = 90%**
- frozen: **0/10**

Validated: **1, 2, 3, 4, 5, 6, 8, 9, 10**.  
HOLD: **7 only**.

Across the 70 OPI in Cycle 1, **9/70 = 12.8571%** are currently VALIDATED.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

Authored candidates remain: `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

No language-authority promotion occurred when OPI 1 was validated.

## OPI 1 — validated as whole utterance

Historical phrase:

`KALA YA EN ES KU KE`

Recovered source: `PHR-001`, certainty **APPROXIMATE**.

The card is now `VALIDATED` for **L01 v1.1 course use as an indivisible recovered whole-utterance formula**.

This validation intentionally does **not** assign token-by-token meanings:

- `YA` remains semantically unresolved;
- `ES` remains semantically unresolved;
- `KALA`, `EN`, `KU` and `KE` retain only inferential analyses;
- `PHR-001` certainty remains APPROXIMATE;
- no recovered lexical canon was changed.

Answer pattern: `[PERSONAL_NAME]`.

The earlier technical/semantic review records remain historically intact as evidence of the pre-approval HOLD. The later human batch and transition record the scoped course decision rather than rewriting those records.

## OPI 3 — validated

Question: `EN KU SARASALA KE`.

`SARASALA` remains `WATCH`. Bare `[CARDINAL_0_99]` answers are approved for this card, e.g. `TOMI` = 8, `DUVE TOMI` = 18, `LUSO HOYU` = 42.

The 10–99 rule `DIGIT_TENS DIGIT_UNITS` is approved only in the L01 OPI 3 numeric/cardinal context. It grants no global HNK number grammar, 100+, ordinals or year/years lexeme.

## OPI 7 — final HOLD

`EN VANI KUVAN KE`  
`EN VANI KUON KE`

This is the only remaining L01 OPI HOLD and remains the highest-risk card because:

- `VANI` is a genuinely recovered form but its Master Lexicon meaning is still `null`;
- `VANI ≈ live/reside` is an authored semantic hypothesis only;
- `KUVAN` remains `AUTH-001 CANDIDATE`;
- `KUON` remains `AUTH-003 CANDIDATE` and depends on `ON=GATE`;
- co-resident valency is authored/test-only;
- no HNK equivalent of English `WITH` was invented.

The next task is to prepare an explicit final human gate that can approve these relationships **for OPI 7 course use only** while preserving all of those authority/provenance boundaries.

## CI boundary

Run locally/CI with `npm test`.

Remote CI must not be described as green without an observed successful GitHub Actions runner.
