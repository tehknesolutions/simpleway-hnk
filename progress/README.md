# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V19`  
**Date:** 2026-09-10  
**Current package:** `simpleway-hnk@0.22.0`

Cycle 1 target: **1,008 pedagogical slots**.

Current exclusive implementation states:

- `MISSING`: **998/1,008 = 99.0079%**
- `AUTHORED`: **2/1,008 = 0.1984%**
- `VALIDATED`: **8/1,008 = 0.7937%**
- reproducible `FROZEN`: **0/1,008**
- `AUTHORED_OR_BETTER`: **10/1,008 = 0.9921%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82/1,008 = 8.1349%**

## L01 OPI

- authored-or-better: **10/10 = 100%**
- reviewed: **10/10 = 100%**
- validated: **8/10 = 80%**
- frozen: **0/10**

Validated: **2, 3, 4, 5, 6, 8, 9, 10**.  
HOLD: **1, 7**.

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- canonical authored candidates: **14**
- governed unique language assets: **45/144 = 31.25% proxy**

Authored candidates: `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

The numeral primitives remain `CANDIDATE`; none is historical recovery or FROZEN.

## OPI 3 — validated

Question: `EN KU SARASALA KE`.

`SARASALA` remains `WATCH`. Bare `[CARDINAL_0_99]` answers are approved for this card, e.g. `TOMI` = 8, `DUVE TOMI` = 18, `LUSO HOYU` = 42.

The 10–99 rule `DIGIT_TENS DIGIT_UNITS` is approved only in the L01 OPI 3 numeric/cardinal context. It grants no global HNK number grammar, 100+, ordinals or year/years lexeme.

## OPI 1 — next gate prepared

Historical phrase: `KALA YA EN ES KU KE`.

Source: recovered `PHR-001`, approximate whole-sentence meaning `What is your name?`.

The safe validation strategy is **whole-utterance formula validation**: accept the recovered phrase as an indivisible beginner formula without assigning invented meanings to `YA`, `ES`, `KALA`, `EN`, `KU` or `KE`.

`YA` and `ES` remain unresolved. Bare `[PERSONAL_NAME]` is the proposed answer pattern.

Prepared batch:

`SWHNK-L01-OPI-001-WHOLE-UTTERANCE-HUMAN-BATCH-V1`

It is **not applied yet**. If approved, L01 moves from **8/10 → 9/10 VALIDATED = 90%**, with zero new lexical forms and zero token-gloss promotions.

## OPI 7

Remains the final highest-risk HOLD: `VANI` is recovered but meaning `null`; `live/reside` is hypothesis-only; `KUON` remains CANDIDATE dependent on `ON=GATE`; co-resident valency is authored/test-only.

## CI boundary

Run locally/CI with `npm test`. Remote CI must not be described as green without an observed successful GitHub Actions runner.
