# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V45`  
**Date:** 2026-09-11  
**Current package:** `simpleway-hnk@0.47.0`

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

## L02 Chokhmah — exact rebinds APPLIED / pedagogy HOLD

Source Lock remains authoritative:

- L02 target: **139 slots**
- Vocabulary target: **16**
- recovered lexemes: **11**
- recovered phrases: **0**
- authority mix: **5 FROZEN + 5 WATCH + 1 GATE**
- recovered master meanings: **9**
- unresolved master meanings: **2** — `VANUVALI`, `VANI`
- student cards: **0**
- teacher drills: **0**
- L02 curriculum slots implemented: **0**
- pedagogy authoring hold: **true**

The five semantic targets were approved first. The following existing authored candidates have now received a scoped L02 lesson binding in `@hnk/linguas@1.6.0-candidate`:

- `AUTH-016 AN` → `FIRST_PERSON_REFERENT`
- `AUTH-017 EN` → `SECOND_PERSON_REFERENT`
- `AUTH-001 KUVAN` → `LOCATION_INTERROGATIVE`
- `AUTH-018 KU` → `CONTENT_SELECTOR`
- `AUTH-019 KE` → `QUESTION_OPERATOR`

This was a **LESSON_SCOPE_EXTENSION_ONLY** operation. It created **0 new HNK surface forms**, **0 new language assets**, **0 historical recovery claims**, and **0 authority promotions**. All five remain `CANDIDATE`.

L02 therefore has **16 governed language assets** at source/governance level: 11 recovered lexemes + 5 scoped authored candidates. Of these, **14 are currently semantically teachable**. `VANUVALI` remains `GATE` with `meaning=null`; `VANI` remains `WATCH` with `meaning=null`. The scoped L01 residence interpretation of VANI is not generalized.

Crucially, **scope binding is not pedagogy validation**. No OPI, Story, Q&A, Structure, Vocabulary card, Activation or Review slot of L02 was implemented by this rebind.

## Next gate

`SWHNK-L02-UNRESOLVED-VOCABULARY-HUMAN-BATCH-V1`

Status: **AWAITING_EXPLICIT_HUMAN_APPROVAL**.

That gate addresses the two-source-slot teachability gap while preserving `VANI` and `VANUVALI` unresolved. It is not approved by the rebind decision above.

## Historical/source boundary

Historical `SOURCE_CONFIRMED_FROZEN` evidence remains **82 slots = 10 OPI + 72 Activation**. Current scoped curriculum validation and historical evidence remain separate axes.

## CI boundary

Remote GitHub Actions must not be described as green without an observed successful runner execution. Recent runs have failed before exposing normal job steps, so this remains an operational CI issue rather than proven test-suite failure or success.
