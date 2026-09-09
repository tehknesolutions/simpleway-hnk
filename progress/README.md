# SimpleWay HNK — Cycle 1 Progress

This directory is the canonical progress-tracking layer for the reconstructed SimpleWay HNK Cycle 1.

## Why there are two progress axes

Historical evidence and current reproducible implementation are deliberately separate.

A historical Lesson may be proven to have been publication-frozen while its raw payload is currently missing. In that case:

- `evidence_state = SOURCE_CONFIRMED_FROZEN`;
- `implementation_state = MISSING` until the HNK payload is actually recovered or re-authored and governed in the current repository.

This prevents recovery evidence from being mistaken for current implementation.

## Implementation states

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

- **MISSING** — target slot exists, HNK payload is not reproducibly implemented.
- **AUTHORED** — HNK content exists in the current repo.
- **VALIDATED** — authored content passed its declared gate.
- **FROZEN** — current payload is versioned, validated and publication-frozen.

## Current baseline — 2026-09-09

Target: **1,008 pedagogical slots**.

- Current reproducible `FROZEN`: **0 / 1,008**.
- Historical `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**.
- Scaffolded in the reconstructed L01 lane: **82 / 1,008 = 8.1349%**.
- Master Lexicon forms linked to Cycle 1: **31**.
- Lexical proxy: **31 / 144 = 21.5278%**.
- Recovered phrases: **7**.

The 82 historical frozen-evidence slots are:

- L01 OPI: **10**;
- L01 Activation: **72**.

They are **not** counted as current `FROZEN` because the raw v1.0 HNK payload is still missing.

## Allocation

`cycle1-allocation.v1.json` expands the Cycle 1 contract into deterministic tracker quotas. The contract itself explicitly fixes 10 OPI, 5 stories, 4 Q&A, 5 structures, 72 Activation and 22 review items per Lesson.

For tracker determinism, V1 derives an even allocation of:

- 3 teacher notes per Lesson (`21 = 3 x 7`);
- 2 structure headers per Lesson (`14 = 2 x 7`).

This produces the following vocabulary allocation while preserving the exact lesson totals:

- L01: 32 vocabulary slots;
- L02-L06: 16 each;
- L07: 32;
- total: 144.

This is labeled `DERIVED_ALLOCATION_NOT_CURRICULUM_CANON` and must be revised if an authoritative source proves a different per-Lesson distribution.

## Commands

```bash
npm run progress
npm run progress:write
npm run validate:progress
npm test
```

`npm run progress` prints the current computed summary.

`npm run progress:write` generates:

- `progress/generated/cycle1-slots.v1.json` — all 1,008 tracker slots;
- `progress/generated/cycle1-progress.snapshot.v1.json` — computed dashboard snapshot.

## Lexical proxy warning

`31 / 144` is **not** vocabulary-slot completion.

The numerator is the number of unique recovered Master Lexicon forms associated with at least one Cycle 1 Lesson. A governed mapping between those forms and the 144 curriculum vocabulary slots has not yet been completed.

Therefore the tracker reports lexical asset coverage separately from pedagogical slot implementation.

## Progress rule

Every future percentage increase must be explainable by a concrete transition in the repo:

```text
MISSING -> AUTHORED -> VALIDATED -> FROZEN
```

No manual percentage inflation, no silent promotion of WATCH/CANDIDATE/GATE material, and no conversion of historical evidence into current implementation without payload recovery or governed new authorship.
