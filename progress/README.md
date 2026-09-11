# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V40`  
**Date:** 2026-09-11  
**Current package:** `simpleway-hnk@0.42.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **853/1,008 = 84.6230%**
- `AUTHORED`: **22/1,008 = 2.1825%**
- `VALIDATED`: **133/1,008 = 13.1944%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **155/1,008 = 15.3770%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 Kether — 155/155 implemented

L01 target: **155 slots**.

Fully validated lanes:

- Teacher Notes: **3/3**
- OPI: **10/10**
- Stories: **5/5**
- Q&A: **4/4**
- Structure Headers: **2/2**
- Structures: **5/5**
- Vocabulary: **32/32**
- Activation: **72/72**

Review is fully authored but not yet validated:

- Review: **22/22 AUTHORED, 0/22 VALIDATED**

Therefore L01 is **155/155 authored-or-better = 100% implemented**, with **133/155 VALIDATED = 85.8065%** and **22 slots awaiting the final Review validation gate**.

## Vocabulary — complete

`VOC-001..032` are now **VALIDATED** for scoped SimpleWay HNK L01 v1.1 course use.

The final eight mappings remain governed exactly as approved:

- `KALA` → `AUTH-015 CANDIDATE`
- `AN` → `AUTH-016 CANDIDATE`
- `EN` → `AUTH-017 CANDIDATE`
- `KU` → `AUTH-018 CANDIDATE`
- `KE` → `AUTH-019 CANDIDATE`
- `VANI` → scoped L01 binding on recovered `LEX-031`, retaining `WATCH` and Master Lexicon `meaning=null`
- `VAME` → scoped L01 rebind on recovered `LEX-025`, retaining `GATE`
- `ZAMI` → `AUTH-020 CANDIDATE`

Vocabulary validation promoted **zero language authorities** and created **zero new surface forms**.

## Review lane — final L01 gate

`REV-001..022` are authored as **new v1.1 pedagogy**, not recovered historical Review payload.

The reconciled model is:

- `REV-001..020`: **two Review activities for each validated OPI 001..010** — one question recall and one response recall;
- `REV-021..022`: **two integrative interviews** composed only from already validated OPI payloads and response contracts.

A source mismatch from the first draft was removed: Review no longer treats `EN ZAMI HENUVOKODAN KE` as if it were `L01-OPI-003`. OPI 003 remains the validated age card `EN KU SARASALA KE`.

Boundaries remain explicit: YA/ES unresolved in the recovered whole utterance; VANI remains WATCH with Master meaning null; VAME remains GATE; SARASALA/VAMAVALA/VAMAZAMU remain WATCH; ON remains GATE; KUVAN/KUON/VALA/NE and AUTH-015..020 remain CANDIDATE. `VAMUSARO` remains rest/leisure period, not a literal weekend lexeme.

Prepared gate:

`SWHNK-L01-REVIEW-22-HUMAN-BATCH-V1`

Status: **AWAITING_EXPLICIT_HUMAN_VALIDATION**.

If approved, Review moves **22 AUTHORED → 22 VALIDATED**, L01 becomes **155/155 VALIDATED**, and global Cycle 1 becomes **155 VALIDATED + 853 MISSING**, with zero language-authority promotions.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **20**
- governed unique language assets: **51/144 = 35.4167% proxy**

Vocabulary slot completion remains distinct from these language-asset proxies.

## Historical/source boundary

Historical `SOURCE_CONFIRMED_FROZEN` evidence remains **82 slots = 10 OPI + 72 Activation**. Current validation maturity and historical evidence remain separate axes.

## CI boundary

The GitHub Actions workflow is configured, but recent runs have failed before exposing normal job steps. Do not describe remote CI as green until a runner completes the validation steps successfully.
