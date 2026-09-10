# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V36`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.39.0`

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

`VOC-001..024` are now **VALIDATED** curriculum selections over 24 distinct already governed assets. `VOC-025..032` remain **MISSING_GOVERNED_ASSET**.

The 24 validated slots comprise 10 recovered/reference/rebind assets plus 14 canonical authored candidates. The validation created **zero new HNK lexical forms**, promoted **zero language authorities**, and did not convert unresolved phrase tokens into historical lexical entries.

The eight missing slots are governed by a semantic-first pipeline. Proposed semantic targets, still awaiting explicit approval and with **no forms selected**, are:

1. `PERSONAL_NAME_DOMAIN`
2. `FIRST_PERSON_REFERENT`
3. `SECOND_PERSON_REFERENT`
4. `CONTENT_SELECTOR`
5. `QUESTION_OPERATOR`
6. `RESIDENCE_LIVE`
7. `PREFERENCE_LIKE`
8. `SPEAK_LANGUAGE_USE`

Observed forms `KALA`, `AN`, `EN`, `KU`, `KE`, `VANI`, `VAME` and `ZAMI` are only investigation candidates at this stage. No standalone historical gloss is assigned to them by the semantic-target proposal.

Prepared gate:

`SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-TARGETS-HUMAN-BATCH-V1`

If approved, only the **eight meanings/functions** are approved. `VOC-025..032` stay MISSING until a separate form-mapping and canonical-governance gate.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **125/155 = 80.6452%**
- validated: **125/155 = 80.6452%**
- remaining missing/unimplemented: **30**

Remaining L01 work: **8 Vocabulary gaps + 22 Review slots**.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

Vocabulary slot completion remains distinct from these language-asset proxies.

## Historical/source boundary

Historical `SOURCE_CONFIRMED_FROZEN` evidence remains **82 slots = 10 OPI + 72 Activation**. Current validation maturity and historical evidence remain separate axes.

## CI boundary

Run locally/CI with `npm test`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
