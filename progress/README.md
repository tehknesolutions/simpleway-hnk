# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V32`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.35.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **916/1,008 = 90.8730%**
- `AUTHORED`: **3/1,008 = 0.2976%**
- `VALIDATED`: **89/1,008 = 8.8294%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **92/1,008 = 9.1270%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 validated core

The following L01 lanes are fully validated for scoped SimpleWay HNK v1.1 course use:

- OPI: **10/10 VALIDATED = 100%**;
- Activation: **72/72 VALIDATED = 100%**;
- Structure headers: **2/2 VALIDATED = 100%**;
- Structures: **5/5 VALIDATED = 100%**.

The structure lane validation does not universalize the five frames as historical HNK grammar. `YA/ES` remain without recovered token glosses; `KUVAN` remains CANDIDATE; `VAME` remains GATE; `VAMAZAMU` remains WATCH; `NE` remains CANDIDATE; `VANI` remains WATCH with recovered meaning null.

## L01 Teacher Notes — 3/3 AUTHORED

The canonical allocation confirms exactly **3 teacher-note slots** for L01, but no historical note text was recovered. The current notes are new governed v1.1 pedagogical authorship.

- `L01-NOTE-001` — Proveniência e autoridade linguística;
- `L01-NOTE-002` — Sequência pedagógica recomendada;
- `L01-NOTE-003` — Correção, resposta e limites de expansão.

The notes create **zero new HNK lexical forms** and **zero new HNK grammar rules**. They instruct the teacher to reuse validated payloads, preserve required contexts, keep WATCH/GATE/CANDIDATE boundaries visible, and avoid invented copulas, prepositions, WITH markers, generic DO, or global yes/no/negation grammar.

Prepared gate:

`SWHNK-L01-TEACHER-NOTES-VALIDATION-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, L01 reaches **92 VALIDATED slots**, with zero language-authority promotions.

## L01 total

L01 target: **155 slots**.

- authored-or-better: **92/155 = 59.3548%**
- validated: **89/155 = 57.4194%**
- remaining missing/unimplemented: **63**

Remaining L01 categories after Teacher Notes: 5 stories, 4 Q&A, 32 vocabulary slots and 22 review slots.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

## Historical/source boundary

Historical `SOURCE_CONFIRMED_FROZEN` evidence remains **82 slots = 10 OPI + 72 Activation**. Current validation maturity and historical evidence remain separate axes.

## CI boundary

Run locally/CI with `npm test`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
