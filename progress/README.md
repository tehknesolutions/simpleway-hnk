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

- `AUTHORED`: **5 / 1,008 = 0.4960%**.
- `VALIDATED`: **0 / 1,008**.
- Current reproducible `FROZEN`: **0 / 1,008**.
- Historical `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**.
- Scaffolded in the reconstructed L01 lane: **82 / 1,008 = 8.1349%**.
- Master Lexicon unique forms linked to Cycle 1: **31**.
- Lexical proxy: **31 / 144 = 21.5278%**.
- Recovered phrases: **7**.
- L01 total teachable language bindings: **10 = 9 recovered + 1 governed curriculum rebind (`VALI`)**.

### Current authored OPI

| Slot | HNK | Origin | Gate |
|---|---|---|---|
| `L01-OPI-001` | `KALA YA EN ES KU KE` | recovered `PHR-001` | technical pass / semantic HOLD |
| `L01-OPI-002` | `EN VAMAKALA KE` | v1.1 candidate, FROZEN lexical core | HOLD grammar |
| `L01-OPI-004` | `EN SARADAYA KU KE` | v1.1 candidate, FROZEN lexical core | HOLD WH semantics |
| `L01-OPI-005` | `EN VALI KU KE` | v1.1 candidate + governed `VALI` rebind | HOLD WH semantics |
| `L01-OPI-008` | `EN VAMAVALA KU KE` | v1.1 test candidate, WATCH lexical core | HOLD WATCH + WH |

Therefore:

- L01 OPI authorship: **5 / 10 = 50%**;
- Cycle 1 OPI authorship: **5 / 70 = 7.1429%**;
- L01 total-slot authorship: **5 / 155 = 3.2258%**.

None of these five is yet counted as a fully `VALIDATED` OPI.

### OPI 1 technical validation

`L01-OPI-001` / `L01-OPI-01`:

- English: `What's your name?`
- recovered HNK: `KALA YA EN ES KU KE`
- source phrase: `PHR-001`
- source certainty: `APPROXIMATE`
- HNK40 structural sequence: **14 G-IDs, 0 unresolved transliteration units**
- question technical validation: `PASS`
- whole-slot validation: `HOLD`
- answer design: candidate bare proper-name slot `[PERSONAL_NAME]`, adding no invented HNK function words.

Candidate D glyph visuals remain preproduction; only G-IDs are treated as structural authority here.

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

That vocabulary distribution remains a source-constrained mathematical derivation until an authoritative source explicitly enumerates all 144 vocabulary slots per Lesson.

## Interrogative recovery state

Current conservative recovery analysis supports:

- `KE` — strong candidate for a clause-final interrogative operator;
- `KU` — candidate **content-question component/interrogative variable**, without assigning it specifically to WHAT, WHERE, WHO or HOW;
- `EN` — inferred second-person referent;
- `SARI`, `LO`, `DA` — unresolved.

Unknown recovered phrases `PHR-004`, `PHR-005` and `PHR-006` remain unassigned to specific OPI prompts. They are not mapped by curriculum order or visual similarity.

A critical consequence is that `EN VALI KU KE` cannot safely be reused for both OPI 5 (`Where do you work?`) and OPI 6 (`What do you do at work/school?`). Until the content-question system distinguishes these intents, identical-form semantic collisions are blocked.

## Curriculum rebinds

`VALI = work / trabalhar` remains recovered in the Master Lexicon with source lessons L02/L03. The Cycle 1 language layer now explicitly allows it in L01 through `HNK_CYCLE1_CURRICULUM_REBINDS`.

This:

- does **not** change the form;
- does **not** change its FROZEN authority;
- does **not** rewrite recovered provenance;
- does **not** increase the number of unique Cycle 1 forms beyond 31;
- increases L01 teachable binding coverage from 9 to 10.

## Commands

```bash
npm run progress
npm run progress:write
npm run validate:progress
npm run validate:l01-opi001
npm test
```

## Lexical proxy warning

`31 / 144` is **not** vocabulary-slot completion.

The numerator is the number of unique recovered Master Lexicon forms associated with at least one Cycle 1 Lesson. Governed curriculum rebinds may improve per-Lesson coverage without increasing this number.

## Progress rule

Every future percentage increase must be explainable by a concrete transition in the repo:

```text
MISSING -> AUTHORED -> VALIDATED -> FROZEN
```

No manual percentage inflation, no silent promotion of WATCH/CANDIDATE/GATE material, and no conversion of historical evidence into current implementation without payload recovery or governed new authorship.
