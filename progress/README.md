# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V22`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.25.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **998/1,008 = 99.0079%**
- `AUTHORED`: **0/1,008 = 0%**
- `VALIDATED`: **10/1,008 = 0.9921%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **10/1,008 = 0.9921%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI — validation complete

- authored-or-better: **10/10 = 100%**
- reviewed: **10/10 = 100%**
- validated: **10/10 = 100%**
- frozen: **0/10**

Validated: **1, 2, 3, 4, 5, 6, 7, 8, 9, 10**.  
HOLD: **none**.

Across the 70 OPI in Cycle 1, **10/70 = 14.2857%** are VALIDATED.

Within the full L01 target of 155 slots, the ten validated OPI represent **10/155 = 6.4516%** of the lesson. **145 L01 slots remain outside VALIDATED.**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

No language-authority promotion occurred in the final OPI validation.

## OPI 7 — validated with source boundaries preserved

The final card remains a two-microquestion design:

1. `EN VANI KUVAN KE` — location.
2. `EN VANI KUON KE` — co-resident/person.

It is now VALIDATED for scoped L01 v1.1 course use, while preserving all risk labels:

- `VANI` remains recovered `WATCH` with Master Lexicon meaning **null**;
- `VANI ≈ live/reside` is only the approved L01 OPI 7 course interpretation, not a recovered historical gloss;
- `KUVAN` remains `AUTH-001 CANDIDATE`;
- `KUON` remains `AUTH-003 CANDIDATE`;
- `ON` remains `LEX-026 GATE`;
- no lexical equivalent of English `WITH` was created;
- co-resident valency is scoped to OPI 7 only;
- no global residence/comitative/person-interrogative grammar was granted.

## What 10/10 VALIDATED means

The OPI lane is complete for **scoped SimpleWay HNK L01 v1.1 course use**.

It does **not** mean:

- all historical v1.0 HNK payloads were recovered;
- WATCH/CANDIDATE/GATE items became historical canon;
- Candidate D glyph drawings became official visual canon;
- the ten cards are publication `FROZEN`;
- Lesson 1 as a whole is complete.

## L01 next phase — Activation 72

The historical release proves that L01 had **72 teacher drills**, but the raw v1.0 drill payload remains missing.

Therefore the next pipeline is:

`SWHNK-L01-ACTIVATION-72-PIPELINE-V1`

Rules for this phase:

- preserve all 72 historical slots as `SOURCE_CONFIRMED_FROZEN` evidence;
- do not reconstruct invented drills and label them as recovered;
- author a new v1.1 Activation set from the now-validated 10 OPI, governed language assets and explicit grammar scopes;
- keep historical evidence and new implementation as separate axes;
- target exactly **72 reproducible Activation slots** before validation/freeze work begins.

## CI boundary

Run locally/CI with `npm test`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
