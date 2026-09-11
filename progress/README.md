# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V46`  
**Date:** 2026-09-11  
**Current package:** `simpleway-hnk@0.49.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **853/1,008 = 84.6230%**
- `AUTHORED`: **0/1,008 = 0%**
- `VALIDATED`: **155/1,008 = 15.3770%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **155/1,008 = 15.3770%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 Kether — 155/155 VALIDATED

L01 remains **100% curriculum-validated**: Teacher Notes 3/3, OPI 10/10, Stories 5/5, Q&A 4/4, Structure Headers 2/2, Structures 5/5, Vocabulary 32/32, Activation 72/72 and Review 22/22.

`SWHNK-L01-KETHER-SEAL-V1` remains an operational lesson-completion marker only; it does not consume the Cycle 1 final seals `Verbum`, `Logos` or `Dialogos`.

## L02 Chokhmah — source teachability complete / pedagogy-source review pending

Source Lock remains authoritative:

- L02 target: **139 slots**
- Vocabulary target: **16**
- recovered source lexemes originally bound to L02: **11**
- recovered curriculum rebinds: **2** — `VALIVAN`, `PARAZAMO`
- scoped authored candidates: **5** — `AN`, `EN`, `KUVAN`, `KU`, `KE`
- governed source references in L02 scope: **18**
- semantic teachable assets: **16/16**
- unresolved source observations preserved: **2** — `VANUVALI`, `VANI`
- recovered phrases: **0**
- student cards: **0**
- teacher drills: **0**
- L02 curriculum slots implemented: **0**
- pedagogy authoring hold: **true**

The exact candidate rebind gate remains applied only as language-scope extension. `AN`, `EN`, `KUVAN`, `KU` and `KE` remain `CANDIDATE`; no universal pronoun or interrogative grammar is inferred.

The unresolved-vocabulary gate is now **APPROVED_AND_APPLIED_TO_LANGUAGE_SCOPE**. `VANUVALI` remains `GATE` with `meaning=null` and `VANI` remains `WATCH` with `meaning=null`; the scoped L01 residence interpretation of VANI is not generalized. Instead, recovered `FROZEN` assets `VALIVAN` (escritório) and `PARAZAMO` (escola / domínio de estudo) were rebound to L02. This closes the semantic-teachability gap **14/16 → 16/16** without creating any new HNK form or authority promotion.

Crucially, **source teachability is not curriculum validation**. L02 remains **139/139 MISSING** in the pedagogical slot ledger.

## Pedagogy Source Contract — prepared, not approved

`SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-V1` defines the 16-item teachable source set and drafts **10 communicative OPI intents**, but explicitly authorizes **0 HNK sentences** and **0 sentence patterns**. Its sentence-pattern policy remains `NOT_AUTHORIZED_YET`.

The next human gate is:

`SWHNK-L02-PEDAGOGY-SOURCE-CONTRACT-HUMAN-BATCH-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

If approved, it authorizes only the pedagogical source set and the ten communicative intents. It still does **not** implement OPI, Story, Q&A, Structure, Vocabulary, Activation or Review slots; the next stage would be a separate evidence-first OPI sentence-pattern review.

## Historical/source boundary

Historical `SOURCE_CONFIRMED_FROZEN` evidence remains **82 slots = 10 OPI + 72 Activation**. Current scoped curriculum validation and historical evidence remain separate axes.

## CI boundary

Remote GitHub Actions must not be described as green without an observed successful runner execution. Recent runs have failed before exposing normal job steps, so this remains an operational CI issue rather than proven test-suite failure or success.
