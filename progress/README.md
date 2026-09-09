# SimpleWay HNK — Cycle 1 Progress

This directory is the canonical progress-tracking layer for the reconstructed SimpleWay HNK Cycle 1.

## Why there are two progress axes

Historical evidence and current reproducible implementation are deliberately separate.

A historical Lesson may be proven to have been publication-frozen while its raw payload is currently missing. In that case:

- `evidence_state = SOURCE_CONFIRMED_FROZEN`;
- current implementation remains independent until the HNK payload is recovered or re-authored and governed in this repository.

This prevents recovery evidence from being mistaken for current implementation.

## Implementation states

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

- **MISSING** — target slot exists, HNK payload is not reproducibly implemented.
- **AUTHORED** — HNK content exists in the current repo.
- **VALIDATED** — authored content passed its declared whole-slot gate.
- **FROZEN** — current payload is versioned, validated and publication-frozen.

Technical subchecks may pass while a slot remains `AUTHORED` if semantic/human promotion is still pending.

## Current state — 2026-09-09

Target: **1,008 pedagogical slots**.

- `AUTHORED`: **1 / 1,008 = 0.0992%**.
- `VALIDATED`: **0 / 1,008**.
- Current reproducible `FROZEN`: **0 / 1,008**.
- Historical `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**.
- Scaffolded in the reconstructed L01 lane: **82 / 1,008 = 8.1349%**.
- Master Lexicon forms linked to Cycle 1: **31**.
- Lexical proxy: **31 / 144 = 21.5278%**.
- Recovered phrases: **7**.

### First current AUTHORED slot

`L01-OPI-001` / `L01-OPI-01`:

- English: `What's your name?`
- recovered HNK: `KALA YA EN ES KU KE`
- source phrase: `PHR-001`
- source certainty: `APPROXIMATE`
- current state: `AUTHORED`
- question technical validation: `PASS`
- whole-slot validation: `HOLD`
- HNK40 structural sequence: **14 G-IDs, 0 unresolved transliteration units**
- answer design: candidate bare proper-name slot `[PERSONAL_NAME]`, adding no invented HNK function words.

It remains intentionally below `VALIDATED` because the recovered phrase gloss is approximate and the v1.1 answer strategy still requires human linguistic promotion. Candidate D glyph visuals remain preproduction; only G-IDs are treated as structural authority here.

## Historical Lesson 1 evidence

The 82 historical frozen-evidence slots are:

- L01 OPI: **10**;
- L01 Activation: **72**.

They are **not** counted as current `FROZEN` because the raw v1.0 HNK payload is still missing.

## Allocation

`cycle1-allocation.v1.json` expands the Cycle 1 contract/canon into deterministic tracker quotas.

The recovered canonical target table explicitly states:

- 21 teacher notes = `7 x 3` → **3 per Lesson**;
- 70 OPI = `7 x 10` → **10 per Lesson**;
- 35 stories = `7 x 5` → **5 per Lesson**;
- 28 Q&A = `7 x 4` → **4 per Lesson**;
- 14 structure headers = `7 x 2` → **2 per Lesson**;
- 35 structures = `7 x 5` → **5 per Lesson**;
- 504 Activation = `7 x 72` → **72 per Lesson**;
- 154 review = `7 x 22` → **22 per Lesson**.

Therefore **3 teacher notes and 2 structure headers per Lesson are source-confirmed, not tracker assumptions**.

Given those confirmed allocations plus canonical lesson totals, the remaining vocabulary allocation is mathematically constrained to:

- L01: 32 vocabulary slots;
- L02-L06: 16 each;
- L07: 32;
- total: 144.

That vocabulary distribution remains labeled as a source-constrained mathematical derivation until an authoritative source explicitly enumerates all 144 vocabulary slots per Lesson.

## Interrogative recovery state

Current conservative recovery analysis supports:

- `KE` — strong candidate for a clause-final interrogative operator;
- `KU` — candidate **content-question component/interrogative variable**, without assigning it specifically to WHAT, WHERE, WHO or HOW;
- `EN` — inferred second-person referent;
- `SARI`, `LO`, `DA` — unresolved.

Unknown recovered phrases `PHR-004`, `PHR-005` and `PHR-006` remain unassigned to specific OPI prompts. They are not mapped by curriculum order or visual similarity.

## Commands

```bash
npm run progress
npm run progress:write
npm run validate:progress
npm run validate:l01-opi001
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
