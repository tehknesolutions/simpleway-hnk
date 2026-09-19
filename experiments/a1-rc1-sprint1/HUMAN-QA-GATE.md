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

- Only exports matching `HNK-A1-APP-ALPHA-0.1.1` + `HNK-A1-RC1-CANDIDATE` are gate-eligible.
- A player is identified only by the anonymous `PLAYER-QA-...` identifier.
- If the same player starts several QA sessions, only that player's **first eligible session** contributes to the promotion percentages.
- Later sessions remain research evidence but cannot inflate the seven-player sample, completion rate, or Final Boss defeat rate.
