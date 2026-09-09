# SimpleWay HNK — Cycle 1 Progress

This directory is the canonical progress-tracking layer for the reconstructed SimpleWay HNK Cycle 1.

## Progress axes

Historical evidence and current reproducible implementation remain separate.

Implementation states:

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

A slot may pass technical checks and remain `AUTHORED` while semantic or human promotion is pending.

## Current state — 2026-09-09

Target: **1,008 pedagogical slots**.

- `AUTHORED`: **5 / 1,008 = 0.4960%**.
- `VALIDATED`: **0 / 1,008**.
- reproducible `FROZEN`: **0 / 1,008**.
- historical `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**.
- scaffolded L01 slots: **82 / 1,008 = 8.1349%**.
- recovered Master Lexicon forms linked to Cycle 1: **31 / 144 = 21.5278% proxy**.
- governed authored candidates linked to Cycle 1: **1** (`KUVAN`).
- governed unique language assets: **32 / 144 = 22.2222% proxy**.
- recovered phrases: **7**.
- L01 teachable recovered/rebound lexemes: **10 = 9 recovered + 1 curriculum rebind (`VALI`)**.
- L01 authored language candidates: **1 = `KUVAN`**.

Neither 31/144 nor 32/144 is vocabulary-slot completion. They are language-asset coverage proxies.

## Current authored OPI

| Slot | HNK | Origin | Gate |
|---|---|---|---|
| `L01-OPI-001` | `KALA YA EN ES KU KE` | recovered `PHR-001` | technical pass / semantic HOLD |
| `L01-OPI-002` | `EN VAMAKALA KE` | v1.1 candidate, FROZEN lexical core | HOLD grammar |
| `L01-OPI-004` | `EN SARADAYA KUVAN KE` | FROZEN core + authored `KUVAN` CANDIDATE | HOLD candidate grammar |
| `L01-OPI-005` | `EN VALI KUVAN KE` | governed `VALI` rebind + authored `KUVAN` CANDIDATE | HOLD candidate grammar |
| `L01-OPI-008` | `EN VAMAVALA KU KE` | WATCH lexical core + unresolved generic `KU` | HOLD WATCH + WH |

Therefore:

- L01 OPI authorship: **5 / 10 = 50%**;
- Cycle 1 OPI authorship: **5 / 70 = 7.1429%**;
- L01 total-slot authorship: **5 / 155 = 3.2258%**.

No OPI is yet counted as fully `VALIDATED`.

## KUVAN promotion

`KUVAN` is now the first entry in the canonical **governed authored-candidate registry** owned by `@hnk/linguas/authored`:

- canonical ID: `AUTH-001`;
- authority: `CANDIDATE`;
- historical recovery claim: **false**;
- derivation: `KU + VAN`;
- intended function: locative content variable / WHERE-like;
- HNK40 IDs: `G23·G05·G31·G01·G12`;
- productivity: `CLOSED_LIST_ONLY`.

This does not retroactively mean `KU = WHERE`, and it does not make `VAN` a globally productive suffix.

The promotion changes language-asset coverage from 31 to 32 unique governed Cycle 1 assets while preserving the recovered-form count at 31.

## Interrogative state

Recovered/inferred layer:

- `KE` — strong candidate for a clause-final interrogative operator;
- `KU` — generic content-question component / variable; exact WHAT/WHERE/WHO/HOW value remains unresolved historically;
- `EN` — inferred second-person referent;
- `SARI`, `LO`, `DA` — unresolved.

Authored layer:

- `KUVAN` specializes locative questions and is used only in OPI 4 and OPI 5 at this stage;
- OPI 8 deliberately retains `KU` because it is not locative;
- unknown `PHR-004`, `PHR-005`, `PHR-006` remain unassigned and their glosses remain null.

This removes the previous OPI 5/OPI 6 identical-form collision. It does **not** by itself solve the activity construction required by OPI 6.

## Historical Lesson 1 evidence

The 82 historical frozen-evidence slots remain:

- L01 OPI: **10**;
- L01 Activation: **72**.

They are not counted as current `FROZEN` because the raw v1.0 HNK payload is still missing.

## Allocation

The recovered canonical target table confirms per Lesson:

- 3 teacher notes;
- 10 OPI;
- 5 stories;
- 4 Q&A;
- 2 structure headers;
- 5 structures;
- 72 Activation;
- 22 review items.

Given those constraints and the canonical lesson totals, tracker vocabulary allocation remains mathematically constrained to:

- L01: 32;
- L02-L06: 16 each;
- L07: 32;
- total: 144.

## Curriculum rebind

`VALI = work / trabalhar` remains historically recovered for L02/L03 in the Master Lexicon. `HNK_CYCLE1_CURRICULUM_REBINDS` permits teaching it in L01 without rewriting that provenance.

## Commands

```bash
npm run progress
npm run progress:write
npm run validate:progress
npm run validate:l01-opi001
npm run validate:interrogatives
npm test
```

## Progress rule

Every percentage increase must correspond to a concrete repo transition. No silent promotion of WATCH/CANDIDATE/GATE material, no authored form mislabeled as recovered, and no historical evidence converted into current implementation without payload recovery or governed authorship.
