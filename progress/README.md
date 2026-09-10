# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V25`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.28.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **974/1,008 = 96.6270%**
- `AUTHORED`: **12/1,008 = 1.1905%**
- `VALIDATED`: **22/1,008 = 2.1825%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **34/1,008 = 3.3730%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI — complete

All **10/10 OPI are VALIDATED = 100%** for scoped SimpleWay HNK L01 v1.1 course use. Course validation did not silently promote WATCH/CANDIDATE/GATE assets into recovered canon.

## L01 Activation — P01 validated, P02 authored

Historical evidence proves **72 teacher-drill slots**, but the original raw drill payload remains unrecovered. Current v1.1 drills are therefore new governed authorship, never reconstruction claims.

Activation state:

- target: **72**
- `VALIDATED`: **12/72 = 16.6667%** — slots 001–012 (P01)
- `AUTHORED`: **12/72 = 16.6667%** — slots 013–024 (P02)
- `AUTHORED_OR_BETTER`: **24/72 = 33.3333%**
- `FROZEN`: **0/72**
- remaining unimplemented: **48**

### P01 — VALIDATED

Slots **001–012**, sourced from validated OPI 1–2.

Six drill modes per OPI:

`RECOGNIZE_INTENT → REPEAT_FORM → PRODUCE_QUESTION → TRACE_GIDS → PRODUCE_RESPONSE → MICRO_DIALOGUE`

Validation preserves PHR-001 as whole utterance, `YA/ES` unresolved, `NE=CANDIDATE`, G-IDs as structural authority and Candidate D visuals as non-canon.

### P02 — AUTHORED / validation pending

Slots **013–024**, sourced from validated OPI 3–4:

- OPI 3: `EN KU SARASALA KE` with `[CARDINAL_0_99]` response;
- OPI 4: `EN SARADAYA KUVAN KE` with `[PLACE]` response.

P02 creates **zero new HNK lexical forms**. `SARASALA` remains WATCH; numeral primitives and `KUVAN` remain CANDIDATE.

Prepared gate:

`SWHNK-L01-ACTIVATION-P02-VALIDATION-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, Activation reaches **24/72 VALIDATED = 33.3333%**, while global validated slots rise from **22 → 34** with zero language-authority promotions.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **34/155 = 21.9355%**
- validated: **22/155 = 14.1935%**
- remaining unimplemented: **121**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

## Historical/source boundary

The 82 historical frozen-evidence slots remain 10 L01 OPI + 72 L01 Activation. P01/P02 content is new v1.1 authorship unless the missing original payload is actually recovered later.

## CI boundary

Run locally/CI with `npm test` or `npm run validate:activation`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
