# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V33`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.36.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **912/1,008 = 90.4762%**
- `AUTHORED`: **4/1,008 = 0.3968%**
- `VALIDATED`: **92/1,008 = 9.1270%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **96/1,008 = 9.5238%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 validated core

The following L01 lanes are fully validated for scoped SimpleWay HNK v1.1 course use:

- Teacher Notes: **3/3 VALIDATED = 100%**;
- OPI: **10/10 VALIDATED = 100%**;
- Activation: **72/72 VALIDATED = 100%**;
- Structure headers: **2/2 VALIDATED = 100%**;
- Structures: **5/5 VALIDATED = 100%**.

Teacher Notes remain new governed v1.1 pedagogical authorship, not recovered historical text. Their validation does not create HNK lexicon or grammar and does not promote language authority.

## L01 Q&A — 4/4 AUTHORED

The canonical allocation confirms exactly **4 Q&A slots** for L01, but no historical Q&A payload was recovered. Current v1.1 items reuse only validated L01 questions and response schemas:

- `L01-QA-001` — `KALA YA EN ES KU KE` → `[PERSONAL_NAME]`;
- `L01-QA-002` — `EN KU SARASALA KE` → `[CARDINAL_0_99]`;
- `L01-QA-003` — `EN SARADAYA KUVAN KE` → `[PLACE]`;
- `L01-QA-004` — `EN KU VAMAVALA KE` → `[HOBBY_OR_PLEASURE_ACTIVITY]`.

Authority boundaries remain unchanged: `YA/ES` have no assigned recovered token glosses; `SARASALA` and `VAMAVALA` remain WATCH; numeral primitives and `KUVAN` remain CANDIDATE. Q&A creates **zero new HNK lexical forms** and **zero new HNK grammar rules**.

Prepared gate:

`SWHNK-L01-QA-VALIDATION-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, L01 reaches **96 VALIDATED slots** with zero language-authority promotions.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **96/155 = 61.9355%**
- validated: **92/155 = 59.3548%**
- remaining missing/unimplemented: **59**

Remaining L01 categories after Q&A authorship: **5 stories, 32 vocabulary slots and 22 review slots**.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

## Historical/source boundary

Historical `SOURCE_CONFIRMED_FROZEN` evidence remains **82 slots = 10 OPI + 72 Activation**. Current validation maturity and historical evidence remain separate axes.

## CI boundary

Run locally/CI with `npm test`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
