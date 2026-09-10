# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V29`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.32.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **926/1,008 = 91.8651%**
- `AUTHORED`: **12/1,008 = 1.1905%**
- `VALIDATED`: **70/1,008 = 6.9444%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **82/1,008 = 8.1349%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

The identical current/historical count of 82 is coincidental: current implementation maturity and historical evidence are separate axes.

## L01 OPI — complete

All **10/10 OPI are VALIDATED = 100%** for scoped SimpleWay HNK L01 v1.1 course use.

## L01 Activation — 72/72 implemented

Historical evidence proves **72 teacher-drill slots**, but the original raw drill payload remains unrecovered. Current v1.1 drills are new governed authorship, not historical reconstruction.

Activation state:

- target: **72**
- foundation `VALIDATED`: **60/60 = 100%**
- integrative `AUTHORED`: **12/12 = 100%**
- total `VALIDATED`: **60/72 = 83.3333%**
- total `AUTHORED`: **12/72 = 16.6667%**
- total `AUTHORED_OR_BETTER`: **72/72 = 100%**
- `FROZEN`: **0/72**
- remaining unimplemented: **0**

### P01–P05 — VALIDATED

Slots 001–060 are validated. P05 preserves `VAME=GATE`, `VAMAZAMU=WATCH`, `NE/VALA=CANDIDATE` and `VAMUSARO=rest/leisure period`, not `weekend`.

### P06 — integrative AUTHORED / validation pending

Slots 061–072 integrate all ten validated OPI without creating new HNK sentence grammar. The pack includes paired interviews, ordered half-interviews, intent discrimination, response routing, G-ID relay, adaptive interview and a full ten-OPI capstone.

Critical rule: integrative drills may **sequence** validated questions and response schemas but may not fuse them into new HNK sentences or introduce conjunctions, copulas, prepositions, polarity particles or lexical forms.

P06 metrics:

- 12/12 AUTHORED;
- zero new HNK lexical forms;
- zero new HNK grammar rules;
- all ten OPI represented;
- Candidate D remains non-canonical visual preproduction.

Prepared gate:

`SWHNK-L01-ACTIVATION-P06-INTEGRATIVE-VALIDATION-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, Activation reaches **72/72 VALIDATED = 100%**, and current globally validated slots become **82** with zero language-authority promotions.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **82/155 = 52.9032%**
- validated: **70/155 = 45.1613%**
- remaining unimplemented outside OPI/Activation: **73**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

## Historical/source boundary

The 82 historical frozen-evidence slots remain 10 L01 OPI + 72 L01 Activation. P01–P06 are new v1.1 authorship unless the missing original payload is actually recovered later.

## CI boundary

Run locally/CI with `npm test` or `npm run validate:activation`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
