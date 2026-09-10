# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V23`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.26.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **986/1,008 = 97.8175%**
- `AUTHORED`: **12/1,008 = 1.1905%**
- `VALIDATED`: **10/1,008 = 0.9921%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **22/1,008 = 2.1825%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI — complete

- authored-or-better: **10/10 = 100%**
- reviewed: **10/10 = 100%**
- validated: **10/10 = 100%**
- frozen: **0/10**

All ten OPI are validated for scoped SimpleWay HNK L01 v1.1 course use. Language-authority boundaries remain unchanged: WATCH/CANDIDATE/GATE items did not become historical canon merely because the course cards were validated.

## L01 Activation — authoring started

Historical evidence proves **72 teacher-drill slots**, but the original raw drill payload remains unrecovered.

The v1.1 Activation pipeline therefore authors new drills without claiming historical reconstruction.

Current Activation state:

- target: **72**
- AUTHORED: **12/72 = 16.6667%**
- VALIDATED: **0/72**
- FROZEN: **0/72**
- remaining unimplemented: **60**

Pack P01 covers slots **001–012**, based on validated OPI 1 and 2. Each OPI receives six modes:

`RECOGNIZE_INTENT → REPEAT_FORM → PRODUCE_QUESTION → TRACE_GIDS → PRODUCE_RESPONSE → MICRO_DIALOGUE`

The pack creates **zero new HNK lexical forms**.

Prepared validation gate:

`SWHNK-L01-ACTIVATION-P01-VALIDATION-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, the 12 P01 drills move `AUTHORED → VALIDATED`; no historical-recovery claim, language-authority promotion or visual-canon promotion occurs.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **22/155 = 14.1935%**
- validated: **10/155 = 6.4516%**
- remaining unimplemented: **133**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

## Historical/source boundary

The 82 historical frozen-evidence slots remain:

- 10 L01 OPI;
- 72 L01 Activation.

Current v1.1 implementation is tracked independently. P01 being AUTHORED does not turn its content into recovered v1.0 material.

## CI boundary

Run locally/CI with `npm test` or `npm run validate:activation`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
