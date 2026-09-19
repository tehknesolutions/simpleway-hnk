# HNK A1 RC1 — Playable Core Sprint 1

Status: **EXPERIMENTAL / HUMAN-QA ONLY**

This directory is intentionally isolated from the governed Cycle 1 curriculum and active Binah source-review gates.

## What this is

A playable learning-runtime experiment for the user-approved **HNK A1 RC1 candidate**. The directory name originated in Sprint 1; it now hosts the evolving isolated A1 Lab runtime:

- World 1: The Awakening
- World 2: The Construction Forge
- World 3: The Grammar Dungeon
- World 4: The Open World
- Levels 01–31
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
npm run a1:sprint4
```

Then open the local URL printed by the server.

## Validate

```
npm run validate:a1-sprint1
npm run validate:a1-sprint2
npm run validate:a1-sprint3
npm run validate:a1-sprint4
```

The test suite explicitly checks the two most important guards for this sprint:

1. `MUNASE !== NE`
2. `KE` remains scoped and non-generalized.

## Version boundaries

- Repository package: governed separately by the root package version.
- Language runtime: `HNK-A1-RC1-CANDIDATE`
- Runtime status: `EXPERIMENTAL_HUMAN_QA_ONLY`

A future promotion requires explicit linguistic review; gameplay success alone is not canonical evidence.
