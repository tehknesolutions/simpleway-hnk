# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V28`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.31.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **938/1,008 = 93.0556%**
- `AUTHORED`: **12/1,008 = 1.1905%**
- `VALIDATED`: **58/1,008 = 5.7540%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **70/1,008 = 6.9444%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI — complete

All **10/10 OPI are VALIDATED = 100%** for scoped SimpleWay HNK L01 v1.1 course use.

## L01 Activation — foundation 60/60 implemented

Historical evidence proves **72 teacher-drill slots**, but the original raw drill payload remains unrecovered. Current v1.1 drills are new governed authorship, not historical reconstruction.

Activation state:

- target: **72**
- `VALIDATED`: **48/72 = 66.6667%** — slots 001–048 (P01–P04)
- `AUTHORED`: **12/72 = 16.6667%** — slots 049–060 (P05)
- `AUTHORED_OR_BETTER`: **60/72 = 83.3333%**
- foundation authored-or-better: **60/60 = 100%**
- foundation validated: **48/60 = 80%**
- `FROZEN`: **0/72**
- remaining unimplemented: **12 integrative slots (061–072)**

Foundation modes remain:

`RECOGNIZE_INTENT → REPEAT_FORM → PRODUCE_QUESTION → TRACE_GIDS → PRODUCE_RESPONSE → MICRO_DIALOGUE`

### P01–P04 — VALIDATED

Slots 001–048 are validated. Their scoped validation preserves all WATCH/CANDIDATE/GATE boundaries and makes no historical reconstruction claim.

### P05 — AUTHORED / validation pending

Slots 049–060, sourced from validated OPI 9–10:

- OPI 9: `EN VAME VAMAZAMU KE`, with positive `VAME VAMAZAMU` and negative `NE VAME VAMAZAMU`;
- OPI 10: context `VAMUSARO` + `EN KU VALA KE` with `[ACTIVITY_DESCRIPTION]`;
- `VAME` remains GATE;
- `VAMAZAMU` remains WATCH;
- `NE` and `VALA` remain CANDIDATE;
- `VAMUSARO` remains `rest / leisure period`, not `weekend`;
- zero new HNK lexical forms.

Prepared gate:

`SWHNK-L01-ACTIVATION-P05-VALIDATION-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, Activation reaches **60/72 VALIDATED = 83.3333%** and the entire **60/60 foundation lane becomes VALIDATED = 100%**. Global validated slots rise from **58 → 70**, with zero language-authority promotions.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **70/155 = 45.1613%**
- validated: **58/155 = 37.4194%**
- remaining unimplemented: **85**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

## Historical/source boundary

The 82 historical frozen-evidence slots remain 10 L01 OPI + 72 L01 Activation. P01–P05 content is new v1.1 authorship unless the missing original payload is actually recovered later.

## CI boundary

Run locally/CI with `npm test` or `npm run validate:activation`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
