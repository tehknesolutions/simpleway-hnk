# HNK A1 — Initial Human QA Gate

Target group: **minimum 7 beginner players**, preferably people who did not participate in authoring HNK.

## Promotion gate

A future promotion to:

**HNK-A1-RC2 — HUMAN-PLAYTEST-VALIDATED-CANDIDATE**

requires all of the following:

- average challenge completion >= 80% without external help;
- >= 70% of players defeat Level 32 communicatively;
- no critical construction reaches >= 30% GRAMMAR_PROBLEM rate;
- no systematic failure in PERSON, NE, VEMI, NUMBER + NOUN, RUMI, HAVORI or communication repair;
- UX and content ambiguity are reviewed separately from linguistic failure.

## Evidence classes

Classify observed failures as:

- LEARNING_PROBLEM
- VOCABULARY_PROBLEM
- GRAMMAR_PROBLEM
- UX_PROBLEM
- CONTENT_PROBLEM
- UNMAPPED_CONSTRUCTION

Repeated UNMAPPED constructions are research candidates only. They are not automatically accepted into grammar.

## Privacy

Use exported anonymous QA sessions. Do not request real names, addresses, precise locations, health information or unrestricted personal text for this gate.

## Promotion boundary

Passing this gate does not make the language CANON and does not constitute external CEFR certification.


## Automated vs human-reviewed gates

The QA analyzer may calculate directly:

- unique player count;
- per-session completion;
- completion without hints/Codex;
- Final Boss defeat rate;
- UNMAPPED and UNKNOWN_LEXEME event counts.

It must **not** infer `GRAMMAR_PROBLEM`. The critical-grammar gate remains pending until all seven critical skill families have explicit reviewer annotations for the participating players.

Critical skill families:

- PERSON
- NE
- VEMI
- NUMBER_NOUN
- RUMI
- HAVORI
- COMMUNICATION_REPAIR

A repeated learner failure can be a learning, vocabulary, UX, content, or grammar problem; promotion requires preserving that distinction.


## Cohort rule

Promotion metrics are player-based, not raw-session-based.

- Only exports matching `HNK-A1-APP-ALPHA-0.2.1` + `HNK-A1-RC1-CANDIDATE` are gate-eligible.
- A player is identified only by the anonymous `PLAYER-QA-...` identifier.
- If the same player starts several QA sessions, only that player's **first eligible session** contributes to the promotion percentages.
- Later sessions remain research evidence but cannot inflate the seven-player sample, completion rate, or Final Boss defeat rate.


## Runtime integrity rule

A gate-eligible session must be **SINGLE_RUNTIME** from start to export.

- `qaSessionStartedAppVersion` must equal `HNK-A1-APP-ALPHA-0.2.1`.
- Every telemetry event must include `runtimeAppVersion = HNK-A1-APP-ALPHA-0.2.1`.
- Any missing runtime version, older/newer event version, or mixed version set marks the session `MIXED_RUNTIME`.
- `MIXED_RUNTIME` sessions remain useful for smoke/debug research but contribute nothing to P01–P07 promotion metrics.


## Alpha 0.2.0 frozen Human-QA baseline

Alpha 0.2.0 passed the Preview Freeze Gate and is **READY FOR P01–P07** as the frozen Human-QA baseline.

Freeze evidence completed:

- deterministic option/tray shuffling validated;
- Codex exposes partial cues rather than a complete answer tray;
- first hint/Codex access requires one recall attempt;
- spaced-review state survives hydration and returns to the active mission;
- Final Boss adaptation uses only pre-Boss evidence and remains stable during Level 32;
- acquisition telemetry is exported with the anonymous QA envelope;
- no HNK lexeme, G-ID, construction, grammar authority or CANON status changes.

After the 0.2.0 freeze, any blocking runtime bug pauses the cohort and requires a new baseline. No silent hotfix is gate-eligible.


### Freeze record

- runtime baseline commit: `7fa140e6aaaec0484e1be4911d6d606b46e8ff5f`;
- deployment validation artifact: `9946b2b98c85b482b9e24b39f7c50c64eb8fc3b3`;
- Railway validation deployment: `3e1c8590-4780-45cd-951b-89f59693435b`;
- deployment healthcheck: PASS;
- repository-loaded A1 validator lane: 7/7 PASS;
- Alpha Release/build contract: 15/15 PASS;
- headless DOM interaction smoke: 24/24 PASS;
- deployed container content markers: PASS;
- HNK linguistic authority changes: 0.

Any runtime-code change after this freeze pauses P01–P07 and requires a new app-version baseline. Documentation-only changes do not invalidate already exported SINGLE_RUNTIME sessions.


## Alpha 0.2.1 refreeze requirement

The cohort-launch audit found that Alpha 0.2.0 exposed Human QA export only after Level 32. That would exclude early-stop/failure sessions from ordinary collection and bias the gate metrics.

Alpha 0.2.1 adds persistent partial-session export. The exact 0.2.1 runtime has now passed Preview Freeze Gate V2 and is **READY FOR P01–P07**.

This is a QA instrumentation/runtime change only. It does not alter HNK linguistic authority.


### Alpha 0.2.1 Freeze record

- runtime baseline commit: `a0b0e5382a92b817b9afe1250dfa87bbadd2dac6`;
- preview packaging commit: `807ddba0426a8655c11ac5f9fb7321776f420080`;
- Railway preview deployment: `e1c6e58c-7bfa-459a-ac04-dea729cd6599`;
- preview URL: `https://hnk-a1-alpha-021-preview-production.up.railway.app`;
- deployment healthcheck: PASS;
- repository-loaded A1 validator lane: 7/7 PASS;
- partial-session export contract: 8/8 PASS;
- source interaction smoke: 23/23 PASS;
- published `dist/a1` interaction smoke: 23/23 PASS;
- deployed container content markers: PASS;
- HNK linguistic authority changes: 0.

Gate state: `FROZEN_HUMAN_QA_BASELINE / SINGLE_RUNTIME / READY_FOR_P01-P07`.
