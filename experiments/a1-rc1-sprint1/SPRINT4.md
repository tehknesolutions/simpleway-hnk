# Sprint 4 — The Open World

Status: **EXPERIMENTAL / HNK-A1-RC1-CANDIDATE**

World 4 adds Levels 25–31 and changes the interaction model from answer-matching to objective-based communication.

## Core change

The player types HNK freely. The runtime evaluates a sequence of utterances against mission objectives:

- MISSION_COMPLETE
- MISSION_PARTIAL
- MISSION_INCOMPLETE

UNMAPPED_CONSTRUCTION and UNKNOWN_LEXEME remain visible research states and do not automatically cost hearts.

## Levels

25. Route to station
26. Communication repair
27. Two bottles of water
28. Tomorrow + need + go + station
29. Locate my book
30. Negative existence at hotel
31. Market survival

## Codex assistance

The optional token Codex is hidden by default. Opening it is permitted and persisted as assistance for XP scoring. It never blocks mission completion.

## Governance

All new authored frames remain HNK_AUTHORED_CANDIDATE + LOCKED_FOR_TESTING and generalizes=false.

The Open World evaluates communicative objectives; it does not promote a successful player utterance into grammar authority.
