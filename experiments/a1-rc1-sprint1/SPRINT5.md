# Sprint 5 — The A1 Final Boss

Status: **EXPERIMENTAL / HUMAN-QA READY CANDIDATE**

Level 32 closes the 32-level campaign with a deterministic, reproducible scenario composed only from already-licensed RC1 intents.

## Final Boss

- deterministic seed: `HNK-A1-FINAL-BOSS-V1|PLAYER_QA_ID|SESSION_ID`
- 4–6 required communicative objectives
- objective order is free
- no answer-model is shown
- Codex is optional assistance
- no new grammar is authored during the Boss

## Human QA telemetry

The browser stores anonymous local QA events:

- level / event type
- recognized HNK input tokens only
- validation result
- achieved / missing objectives
- hints / Codex use
- heart state
- reproducible Boss seed hash

Unknown/free-text tokens are excluded from telemetry.

After Level 32, the player can export:

`hnk-a1-qa-SESSION_ID.json`

The export contains no requested real name, address, precise location, audio or unrestricted free-text field.

## Release target

When merged, the runtime reaches:

- 32/32 playable
- HNK A1 RC1 candidate
- HNK-A1-APP-ALPHA-0.1
- ready for the planned 7-person initial Human QA gate

Gameplay success remains research evidence only. It does not promote candidate language material to CANON.
