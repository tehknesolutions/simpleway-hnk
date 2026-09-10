# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V26`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.29.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **962/1,008 = 95.4365%**
- `AUTHORED`: **12/1,008 = 1.1905%**
- `VALIDATED`: **34/1,008 = 3.3730%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **46/1,008 = 4.5635%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI — complete

All **10/10 OPI are VALIDATED = 100%** for scoped SimpleWay HNK L01 v1.1 course use.

## L01 Activation — P01/P02 validated, P03 authored

Historical evidence proves **72 teacher-drill slots**, but the original raw drill payload remains unrecovered. Current v1.1 drills are new governed authorship, not historical reconstruction.

Activation state:

- target: **72**
- `VALIDATED`: **24/72 = 33.3333%** — slots 001–024 (P01–P02)
- `AUTHORED`: **12/72 = 16.6667%** — slots 025–036 (P03)
- `AUTHORED_OR_BETTER`: **36/72 = 50%**
- `FROZEN`: **0/72**
- remaining unimplemented: **36**

Foundation modes remain:

`RECOGNIZE_INTENT → REPEAT_FORM → PRODUCE_QUESTION → TRACE_GIDS → PRODUCE_RESPONSE → MICRO_DIALOGUE`

### P01 — VALIDATED

Slots 001–012, sourced from OPI 1–2.

### P02 — VALIDATED

Slots 013–024, sourced from OPI 3–4. Validation preserves `SARASALA=WATCH`, numeral primitives=`CANDIDATE`, `KUVAN=CANDIDATE`, no year lexeme and no historical reconstruction claim.

### P03 — AUTHORED / validation pending

Slots 025–036, sourced from validated OPI 5–6:

- OPI 5: `EN VALI KUVAN KE` + `[PLACE]`;
- OPI 6: `EN KU VALA KE` + `[ACTIVITY_DESCRIPTION]` in explicit work/school context.

P03 creates **zero new HNK lexical forms**. `VALI` keeps its recovered L02/L03 provenance with explicit L01 curriculum rebind; `KUVAN` and `VALA` remain CANDIDATE; no generic HNK `DO` verb is introduced.

Prepared gate:

`SWHNK-L01-ACTIVATION-P03-VALIDATION-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, Activation reaches **36/72 VALIDATED = 50%**, while global validated slots rise from **34 → 46** with zero language-authority promotions.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **46/155 = 29.6774%**
- validated: **34/155 = 21.9355%**
- remaining unimplemented: **109**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

## Historical/source boundary

The 82 historical frozen-evidence slots remain 10 L01 OPI + 72 L01 Activation. P01–P03 content is new v1.1 authorship unless the missing original payload is actually recovered later.

## CI boundary

Run locally/CI with `npm test` or `npm run validate:activation`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
