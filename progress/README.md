# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V37`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.40.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **883/1,008 = 87.5992%**
- `AUTHORED`: **0/1,008 = 0%**
- `VALIDATED`: **125/1,008 = 12.4008%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **125/1,008 = 12.4008%**
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
- Vocabulary currently filled: **24/24 VALIDATED**.

All validations remain scoped to SimpleWay HNK v1.1 and do not promote language authority automatically.

## L01 Vocabulary — 24/32 VALIDATED, gap 8

`VOC-001..024` are VALIDATED. `VOC-025..032` remain `MISSING_GOVERNED_ASSET`.

The eight missing semantic targets are now **APPROVED** under `SEMANTICS_BEFORE_FORM`:

1. `PERSONAL_NAME_DOMAIN`
2. `FIRST_PERSON_REFERENT`
3. `SECOND_PERSON_REFERENT`
4. `CONTENT_SELECTOR`
5. `QUESTION_OPERATOR`
6. `RESIDENCE_LIVE`
7. `PREFERENCE_LIKE`
8. `SPEAK_LANGUAGE_USE`

Semantic approval changed **zero Vocabulary slot states** and selected **zero canonical forms**.

## Exact form-mapping review — proposed, not applied

Evidence-first review proposes the following exact mapping:

- `VOC-025`: `KALA` → PERSONAL_NAME_DOMAIN → proposed `AUTH-015 CANDIDATE`;
- `VOC-026`: `AN` → FIRST_PERSON_REFERENT → proposed `AUTH-016 CANDIDATE`;
- `VOC-027`: `EN` → SECOND_PERSON_REFERENT → proposed `AUTH-017 CANDIDATE`;
- `VOC-028`: `KU` → CONTENT_SELECTOR → proposed `AUTH-018 CANDIDATE`;
- `VOC-029`: `KE` → QUESTION_OPERATOR → proposed `AUTH-019 CANDIDATE`;
- `VOC-030`: `VANI` → RESIDENCE_LIVE → scoped semantic binding on recovered `WATCH` asset; Master Lexicon meaning stays `null`;
- `VOC-031`: `VAME` → PREFERENCE_LIKE → L01 curriculum rebind on recovered `GATE` asset;
- `VOC-032`: `ZAMI` → SPEAK_LANGUAGE_USE → proposed `AUTH-020 CANDIDATE`.

This mapping is **not canonical yet**. `KALA/AN/EN/KU/KE/ZAMI` are not claimed as recovered standalone lexemes. `VANI` is not duplicated into the authored registry and its recovered meaning is not rewritten. `VAME` remains GATE. No universal pronoun/interrogative/residence/preference/speech grammar is created.

If the mapping is later approved and applied, the authored registry would move from **14 → 20 CANDIDATE entries** and governed unique language assets from **45 → 51**. The eight Vocabulary gaps would then become eligible for AUTHORED binding, not automatic validation.

Prepared gate:

`SWHNK-L01-VOCABULARY-GAP-8-FORM-MAPPING-HUMAN-BATCH-V1`

## L01 total

L01 target: **155 slots**.

- authored-or-better: **125/155 = 80.6452%**
- validated: **125/155 = 80.6452%**
- remaining missing/unimplemented: **30**

Remaining L01 work: **8 Vocabulary gaps + 22 Review slots**.

## Language assets

Current canonical state, before mapping approval:

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

Projected after exact mapping application: **20 authored candidates** and **51 governed unique assets**. Projection is not current canonical state.

## Historical/source boundary

Historical `SOURCE_CONFIRMED_FROZEN` evidence remains **82 slots = 10 OPI + 72 Activation**. Current validation maturity and historical evidence remain separate axes.

## CI boundary

Run locally/CI with `npm test`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
