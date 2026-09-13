# HNK Language Audit — Sprint A V1

**Sprint ID:** `SWHNK-LANGUAGE-AUDIT-SPRINT-A-V1`  
**State:** `ACTIVE / AUDIT_FIRST / NO_CANON_MUTATION`  
**Reconciled baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`  
**Branch:** `audit/hnk-language-sprint-a-20260913`

## Purpose
Audit the HNK language already present before further language authoring is allowed to depend on unreviewed assumptions. This branch is isolated because concurrent curriculum automation repeatedly advanced `main` while audit commits were being written.

## Governance
- `@hnk/linguas` remains lexical authority.
- `@hnk/glyphs G-ID` remains segmental glyph/IPA authority.
- Audit findings do not promote phonemes, morphemes, lexemes, grammar or curriculum slots.
- The V93 L03 candidate-validation gate is not approved by this sprint.
- `SUPPORTED != PRODUCTIVE` remains invariant.

## Completed blocks

### A1 — segmental phonology 40/40
Artifact: `HNK40_PHONEME_CLASSIFICATION_AUDIT_V1.json`.

Key finding: `Y -> G40 -> /y/` is a vowel; `G16 -> /j/` is a separate glide. Safe romanization covers 20/40 G-IDs.

### A2 — phonemic shape 33/33
Artifact: `HNK33_PHONEMIC_SHAPE_AUDIT_V1.json`.

Key finding: when authoritative IPA classes are used, strict `(CV)+(C)?` matching is 26/33 rather than the previous orthography-sensitive 30/33. `SARADAYA` and `TAYOVAN` are FROZEN Y-bearing exceptions.

### A3 — DAYI
`DAYI = G19 G01 G40 G03 = /d a y i/` segmentally, shape `CVVV`. Full pronunciation remains unresolved because stress, syllabification, adjacent-vowel behavior and allophony are not governed. Meaning remains `querer / intenção`, `CANDIDATE / PARTIAL`; modal/complement syntax remains unresolved.

### A4 — lexicon/morphology 33 forms
Artifact: `HNK_LEXICON_MORPHOLOGY_AUDIT_V1.json`.

Corpus status: 10 FROZEN, 10 WATCH, 3 CANDIDATE, 8 GATE, 1 BRIDGE, 1 REFERENCE; 21 RECOVERED, 7 PARTIAL, 5 UNRECOVERED.

Current evidence ranking, none productive:
1. `-VAN` place/location formative — strongest distributional hypothesis.
2. `PARAZAMO ~ PARAZAMI` — high-value single-family minimal pair.
3. final `-I` — strong action/verbal correlation but no governed POS morphology.
4. `PAR-` — moderate learning/knowledge/perception cluster.
5. `VAM-/VAMA-`, `SAR-` — broader, weaker semantic clusters.

Counterfinding: authored `VALA = atividade` back-analysis is weakened by FROZEN `KALOVALA = edifício/prédio`, which also ends in `VALA`. `VANI = morar/residir` remains a test hypothesis only because its historical gloss is unrecovered and its rationale depends on unapproved `VAN + I` morphology.

## Remaining Sprint A blocks
- word-level phonology: syllabification, stress, hiatus/diphthong, glide formation, allophony, connected speech;
- phrase/grammar evidence inventory;
- curriculum-vs-language assumption audit;
- proposal-debt review for older candidates depending on unresolved morphology;
- consolidate all required human choices into Sprint B.

## Current main-state boundary
`main` is at V93 with one newly authored L03 candidate `[ACTIVITY_LEXEME]`, realizations `VALI`/`PARAZAMI`, awaiting validation. Sprint A neither created nor validates that candidate.
