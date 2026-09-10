# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V38`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.41.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **875/1,008 = 86.8056%**
- `AUTHORED`: **8/1,008 = 0.7937%**
- `VALIDATED`: **125/1,008 = 12.4008%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **133/1,008 = 13.1944%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 validated core

Fully validated lanes:

- Teacher Notes: **3/3**;
- OPI: **10/10**;
- Stories: **5/5**;
- Q&A: **4/4**;
- Structure Headers: **2/2**;
- Structures: **5/5**;
- Activation: **72/72**;
- Vocabulary: **24/32 VALIDATED**, with the final **8/32 AUTHORED**.

All validations remain scoped to SimpleWay HNK v1.1 and do not promote language authority automatically.

## L01 Vocabulary — 32/32 authored-or-better

The semantic-first and evidence-first gap-8 pipeline is now applied to **authoring**, not yet to final course validation.

`VOC-025..032` are:

- `KALA` → PERSONAL_NAME_DOMAIN → `AUTH-015 CANDIDATE`;
- `AN` → FIRST_PERSON_REFERENT → `AUTH-016 CANDIDATE`;
- `EN` → SECOND_PERSON_REFERENT → `AUTH-017 CANDIDATE`;
- `KU` → CONTENT_SELECTOR → `AUTH-018 CANDIDATE`;
- `KE` → QUESTION_OPERATOR → `AUTH-019 CANDIDATE`;
- `VANI` → RESIDENCE_LIVE → scoped L01 binding on recovered `LEX-031`, retaining `WATCH` and Master Lexicon `meaning=null`;
- `VAME` → PREFERENCE_LIKE → scoped L01 curriculum rebind on recovered `LEX-025`, retaining `GATE`;
- `ZAMI` → SPEAK_LANGUAGE_USE → `AUTH-020 CANDIDATE`.

This application created **6 new canonical authored candidate entries**, but **0 new surface forms**: all six forms were already observed in recovered phrase evidence. `VANI` and `VAME` were not duplicated in the authored registry. Language-authority promotions: **0**.

The canonical authored registry is now **20 CANDIDATE entries** and the governed-language-asset inventory is **51 unique assets**. Historical standalone gloss recovery is still **not claimed** for `KALA/AN/EN/KU/KE/ZAMI`.

Prepared final Vocabulary validation gate:

`SWHNK-L01-VOCABULARY-025-032-HUMAN-BATCH-V1`

It remains **AWAITING_EXPLICIT_HUMAN_VALIDATION**. If approved, the eight slots move `AUTHORED → VALIDATED`; Vocabulary becomes **32/32 VALIDATED** and global/L01 validated slots rise **125 → 133**, with no authority promotion.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **133/155 = 85.8065%**
- validated: **125/155 = 80.6452%**
- unimplemented: **22**
- pending validation: **8**

The only unimplemented L01 category is now **Review: 22 slots**.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **20**
- governed unique language assets: **51/144 = 35.4167% proxy**

Vocabulary slot completion remains distinct from these language-asset proxies.

## Historical/source boundary

Historical `SOURCE_CONFIRMED_FROZEN` evidence remains **82 slots = 10 OPI + 72 Activation**. Current validation maturity and historical evidence remain separate axes.

## CI boundary

The GitHub Actions workflow is configured as checkout → Node 22 → `npm test`. Recent runs have failed before exposing any job step (`steps=[]`), including a controlled rerun, so the remote CI is currently **failing at/pre runner initialization** rather than providing evidence of a test-suite failure or success. Do not describe CI as green until a runner completes the steps successfully.
