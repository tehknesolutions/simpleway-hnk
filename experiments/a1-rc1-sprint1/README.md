# HNK A1 RC1 — Playable Core Sprint 1

Status: **EXPERIMENTAL / HUMAN-QA ONLY**

This directory is intentionally isolated from the governed Cycle 1 curriculum and active Binah source-review gates.

## What this is

A playable learning-runtime experiment for the user-approved **HNK A1 RC1 candidate**. The directory name originated in Sprint 1; it now hosts the evolving isolated A1 Lab runtime:

- World 1: The Awakening
- World 2: The Construction Forge
- World 3: The Grammar Dungeon
- World 4: The Open World
- Final Boss: Level 32
- Levels 01–32
- scoped linguistic registry
- deterministic construction validator
- local player state
- XP, hearts and three-level hints
- Mini Boss dialogue
- mobile-first static web UI
- zero runtime dependencies

## What this is not

It does **not**:

- promote authored candidates to CANON;
- change Cycle 1 validation counts;
- generalize KE;
- equate MUNASE with NE;
- authorize question-to-declarative derivation;
- modify L03 Binah source-review gates;
- activate the governed curriculum runtime.

## Run

From repository root:

```
npm run a1:sprint5
```

Then open the local URL printed by the server.

## Validate

```
npm run validate:a1-sprint1
npm run validate:a1-sprint2
npm run validate:a1-sprint3
npm run validate:a1-sprint4
npm run validate:a1-sprint5
```

The test suite explicitly checks the two most important guards for this sprint:

1. `MUNASE !== NE`
2. `KE` remains scoped and non-generalized.

## Version boundaries

- Repository package: governed separately by the root package version.
- Language runtime: `HNK-A1-RC1-CANDIDATE`
- Runtime status: `EXPERIMENTAL_HUMAN_QA_ONLY`

A future promotion requires explicit linguistic review; gameplay success alone is not canonical evidence.


## Alpha 0.1 Human QA

After Level 32, use **Exportar Human QA** to download the anonymous session JSON.

Target release:
- app: HNK-A1-APP-ALPHA-0.1
- language: HNK-A1-RC1-CANDIDATE
- campaign: HNK-A1-CAMPAIGN-V1
- boss: HNK-A1-FINAL-BOSS-V1

This is a Human-QA candidate, not CANON and not external CEFR certification.


## Alpha 0.2.0 — Acquisition Engine

The next Human-QA baseline adds learning mechanics without changing HNK linguistic authority:

- deterministic option and token-tray shuffling;
- progressive support stages: GUIDED → SUPPORTED → FADED → RECALL;
- recall-before-help for hints and Codex;
- partial Codex cues instead of answer trays;
- spaced review of already-completed challenges;
- adaptive Final Boss selection based on pre-Boss learning evidence;
- acquisition telemetry in the anonymous QA export.

P01–P07 starts only after this runtime is frozen as **HNK-A1-APP-ALPHA-0.2.0 / SINGLE_RUNTIME**.
