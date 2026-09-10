# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V35`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.38.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **883/1,008 = 87.5992%**
- `AUTHORED`: **24/1,008 = 2.3810%**
- `VALIDATED`: **101/1,008 = 10.0198%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **125/1,008 = 12.4008%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 validated communicative core

Fully validated lanes:

- Teacher Notes: **3/3**;
- OPI: **10/10**;
- Stories: **5/5**;
- Q&A: **4/4**;
- Structure Headers: **2/2**;
- Structures: **5/5**;
- Activation: **72/72**.

Story validation remains scoped to SimpleWay HNK v1.1. Narrative framing is pedagogical Portuguese, not HNK grammar, and all WATCH/GATE/CANDIDATE boundaries remain unchanged.

## L01 Vocabulary — 24/32 AUTHORED

The L01 allocation contains **32 Vocabulary slots**, but no historical table enumerating their payload has been recovered. The current v1.1 pass applies a one-distinct-governed-asset-per-filled-slot policy.

Current state:

- `VOC-001..024`: **AUTHORED** from 24 distinct already governed L01 assets;
- `VOC-025..032`: **MISSING_GOVERNED_ASSET**;
- new HNK lexical forms created by this pass: **0**;
- language-authority promotions: **0**.

The 24 filled slots comprise 10 recovered/reference/rebind assets plus 14 canonical authored candidates. Phrase-only unresolved tokens such as `YA`, `ES`, `KU`, `EN`, `KE`, `KALA`, `AN`, `ZAMI`, `ZAMO`, `SARI`, `LO` and `DA` are not promoted to standalone Vocabulary simply to satisfy the target count.

Prepared validation gate:

`SWHNK-L01-VOCABULARY-24-OF-32-VALIDATION-V1`

If approved, `VOC-001..024` become VALIDATED while `VOC-025..032` remain MISSING. A separate semantic-first plan governs the eight missing assets:

`SWHNK-L01-VOCABULARY-GAP-8-SEMANTIC-AUTHORING-PLAN-V1`

No forms have been selected for that gap.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **125/155 = 80.6452%**
- validated: **101/155 = 65.1613%**
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
