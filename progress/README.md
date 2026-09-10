# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V34`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.37.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **907/1,008 = 89.9802%**
- `AUTHORED`: **5/1,008 = 0.4960%**
- `VALIDATED`: **96/1,008 = 9.5238%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **101/1,008 = 10.0198%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 validated core

Fully validated lanes:

- Teacher Notes: **3/3**;
- OPI: **10/10**;
- Q&A: **4/4**;
- Structure Headers: **2/2**;
- Structures: **5/5**;
- Activation: **72/72**.

Q&A validation preserves all language-authority boundaries. `YA/ES` remain without token-level historical glosses; `SARASALA` and `VAMAVALA` remain WATCH; numeral primitives and `KUVAN` remain CANDIDATE. The Q&A payload remains governed v1.1 authorship, not recovered historical content.

## L01 Stories — 5/5 AUTHORED

The source confirms exactly five Story slots for L01, but no historical story payload was recovered. The current scenes are new SimpleWay HNK v1.1 pedagogical authorship and use only already validated HNK question/response payloads.

- `L01-STORY-001` — nome e apelido;
- `L01-STORY-002` — idade e origem;
- `L01-STORY-003` — trabalho/escola, lugar e atividade;
- `L01-STORY-004` — residência, co-residente e hobbies;
- `L01-STORY-005` — preferência por canto e contexto de descanso/lazer.

Narrative framing is Portuguese pedagogy, not HNK grammar. The stories create **zero new HNK lexical forms** and **zero new HNK grammar rules**. They preserve `WORK_OR_SCHOOL`, `VAMUSARO`, the two-microquestion OPI 7 design, and all WATCH/GATE/CANDIDATE boundaries.

Prepared gate:

`SWHNK-L01-STORY-VALIDATION-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, all five Story slots become VALIDATED and global/L01 validated slots rise from **96 → 101** with zero language-authority promotions.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **101/155 = 65.1613%**
- validated: **96/155 = 61.9355%**
- remaining missing/unimplemented: **54**

After Story authorship, the only unimplemented L01 categories are **32 vocabulary slots + 22 review slots**.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

Vocabulary slot completion remains distinct from these language-asset proxies.

## Historical/source boundary

Historical `SOURCE_CONFIRMED_FROZEN` evidence remains **82 slots = 10 OPI + 72 Activation**. Current validation maturity and historical evidence remain separate axes.

## CI boundary

Run locally/CI with `npm test`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
