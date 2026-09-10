# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V27`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.30.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **950/1,008 = 94.2460%**
- `AUTHORED`: **12/1,008 = 1.1905%**
- `VALIDATED`: **46/1,008 = 4.5635%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **58/1,008 = 5.7540%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI — complete

All **10/10 OPI are VALIDATED = 100%** for scoped SimpleWay HNK L01 v1.1 course use.

## L01 Activation — P01/P02/P03 validated, P04 authored

Historical evidence proves **72 teacher-drill slots**, but the original raw drill payload remains unrecovered. Current v1.1 drills are new governed authorship, not historical reconstruction.

Activation state:

- target: **72**
- `VALIDATED`: **36/72 = 50%** — slots 001–036 (P01–P03)
- `AUTHORED`: **12/72 = 16.6667%** — slots 037–048 (P04)
- `AUTHORED_OR_BETTER`: **48/72 = 66.6667%**
- `FROZEN`: **0/72**
- remaining unimplemented: **24**

Foundation modes remain:

`RECOGNIZE_INTENT → REPEAT_FORM → PRODUCE_QUESTION → TRACE_GIDS → PRODUCE_RESPONSE → MICRO_DIALOGUE`

### P01 — VALIDATED

Slots 001–012, sourced from OPI 1–2.

### P02 — VALIDATED

Slots 013–024, sourced from OPI 3–4. `SARASALA` remains WATCH; numerals and `KUVAN` remain CANDIDATE.

### P03 — VALIDATED

Slots 025–036, sourced from OPI 5–6. `VALI` keeps its historical L02/L03 provenance plus explicit L01 rebind; `KUVAN` and `VALA` remain CANDIDATE; no generic HNK `DO` verb was created.

### P04 — AUTHORED / validation pending

Slots 037–048, sourced from validated OPI 7–8:

- OPI 7: `EN VANI KUVAN KE` + `EN VANI KUON KE`, with `[PLACE]` and `[PERSON_OR_PEOPLE]` responses;
- OPI 8: `EN KU VAMAVALA KE` + `[HOBBY_OR_PLEASURE_ACTIVITY]` response.

P04 creates **zero new HNK lexical forms**. `VANI` remains WATCH with recovered meaning `null`; `KUVAN`/`KUON` remain CANDIDATE; `ON` remains GATE; `VAMAVALA` remains WATCH; no `WITH` lexeme or global comitative grammar is introduced.

Prepared gate:

`SWHNK-L01-ACTIVATION-P04-VALIDATION-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, Activation reaches **48/72 VALIDATED = 66.6667%**, while global validated slots rise from **46 → 58** with zero language-authority promotions.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **58/155 = 37.4194%**
- validated: **46/155 = 29.6774%**
- remaining unimplemented: **97**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

## Historical/source boundary

The 82 historical frozen-evidence slots remain 10 L01 OPI + 72 L01 Activation. P01–P04 content is new v1.1 authorship unless the missing original payload is actually recovered later.

## CI boundary

Run locally/CI with `npm test` or `npm run validate:activation`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
