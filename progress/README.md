# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V21`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.24.0`

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

Across the 70 OPI in Cycle 1, **9/70 = 12.8571%** are VALIDATED.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

No language-authority promotion occurred in the OPI 1 validation.

## OPI 1 — validated as recovered whole utterance

`KALA YA EN ES KU KE` is now VALIDATED for L01 v1.1 course use as the recovered phrase `PHR-001` taken as one governed formula.

Boundaries remain explicit: `PHR-001` certainty stays APPROXIMATE; `YA` and `ES` remain semantically unresolved; `KALA`, `EN`, `KU` and `KE` token-level roles remain inferential; bare `[PERSONAL_NAME]` is the accepted beginner answer pattern.

## OPI 7 — final batch prepared

Current HNK design:

1. `EN VANI KUVAN KE` — location microquestion.
2. `EN VANI KUON KE` — co-resident/person microquestion.

Final batch: `SWHNK-L01-OPI-007-FINAL-HUMAN-BATCH-V1`.

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

The batch is intentionally strict. If approved, it validates these interpretations only for L01 OPI 7 while preserving:

- `VANI` = recovered `WATCH`, Master Lexicon meaning still `null`;
- `VANI ≈ live/reside` = scoped course semantic interpretation, not historical gloss recovery;
- `KUVAN` = `CANDIDATE`;
- `KUON` = `CANDIDATE`;
- `ON` = `GATE`;
- no lexical equivalent of English `WITH`;
- no global residence/comitative/person-interrogative grammar;
- no language-authority promotion.

If all five decisions are approved, L01 reaches **10/10 VALIDATED = 100%** without adding a lexical form or changing the recovered Master Lexicon.

## CI boundary

Run locally/CI with `npm test`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
