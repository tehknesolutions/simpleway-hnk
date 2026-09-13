# HNK Language Decision — Sprint B V1

**Sprint ID:** `SWHNK-LANGUAGE-DECISION-SPRINT-B-V1`  
**State:** `OPEN / DECISION BACKLOG / NO AUTOMATIC CANON MUTATION`  
**Baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`

## Purpose
Convert Sprint A findings into explicit human decisions. Each change to phonology, romanization, morphology, lexicon or grammar requires its own gate; no approval cascades automatically.

## Decision backlog

### B1 — Y / G40
Decide whether `G40=/y/` with safe `Y` is intentional and should remain. Do not simultaneously decide stress or syllabification.

### B2 — syllable structure and adjacent vowels
Govern syllable templates/preferences and treatment of vowel sequences, including Y-bearing forms.

### B3 — lexical stress and word-level pronunciation
Establish or explicitly leave unresolved stress, allophony and connected-speech rules.

### B4 — romanization coverage
Decide if/when the 20 currently unmapped G-IDs receive safe Latin representations.

### B5 — phonotactic profile V2
After B1-B4, rebuild the profile using phonemic classes and separate corpus facts from authoring preferences and true canonical rules.

### B6 — `-VAN`
Evaluate narrowly scoped place/location morphology using `VALIVAN`, `TAYOVAN`, `PAROVAN`, counterexamples and productivity limits.

### B7 — `PARAZAMO / PARAZAMI`
Decide whether this is merely a lexical pair or evidence for `PARAZAM-` plus a governed final-vowel contrast.

### B8 — final `-I`
Decide whether final I is an action/verbal morpheme, a statistical tendency or neither. Avoid circular POS inference from bilingual glosses.

### B9 — semantic families
Evaluate `PAR-`, `VAM-/VAMA-` and `SAR-` without deriving new words until segmentation and semantic function are approved.

### B10 — VALA
Reassess authored `VALA = atividade` because FROZEN `KALOVALA = edifício/prédio` is a direct surface counterexample to simple `VALA=activity` segmentation. Distinguish retaining VALA as an authored primitive/candidate from claiming it as recovered morphology.

### B11 — VANI
Prefer historical gloss recovery. If recovery fails, a new semantic interpretation `morar/residir` requires its own authorship gate; morphology alone is insufficient.

### B12 — DAYI
After pronunciation foundations, decide its semantic range and only then separately evaluate modal/complement syntax.

### B13 — L03 V93 candidate route
Review the existing `[ACTIVITY_LEXEME]` candidate (`VALI` / `PARAZAMI`) against completed audit findings before validation/productivity decisions. Sprint A finds it structurally compatible with non-invention boundaries because it excludes person, tense, aspect, modality and zero-pronoun inference, but contextual completeness remains a separate scoped validation question.

### B14 — person system scope (`AN` / `EN`)
Decide whether `AUTH-016 AN` and `AUTH-017 EN` remain scoped referent mappings or become inputs to a broader authored pronoun/person system. Do not retroactively describe their standalone meanings as historically recovered.

### B15 — interrogative architecture (`KU` / `KE`)
Decide whether `AUTH-018 KU` and `AUTH-019 KE` remain scoped L01/L02 mappings or enter broader productivity tests. Preserve the distinction: `KU` is not one fixed WH word; `KE` is not yet universal for every question type.

### B16 — basic clause order
Decide whether S-P-O-compatible order observed in the language-use micro-domain should remain local evidence or be tested as a broader HNK word-order design. No universal order is currently established.

### B17 — `ZAMO`
Decide whether the language/language-domain hypothesis is strong enough for a separately governed authored lexical mapping, or whether `ZAMO` remains source-recovery-only pending stronger historical evidence.

### B18 — recovered-vs-authored provenance policy
Make the distinction machine-readable and pedagogically visible: recovered surface occurrence, distributionally supported interpretation, governed authored candidate semantics, and productive grammar must never collapse into one authority label.

## Recommended dependency order
`B1 -> B2 -> B3 -> B4 -> B5 -> B6/B7/B8 -> B9/B10/B11 -> B12 -> B14/B15/B16/B17/B18 -> B13`

Rationale: review phonology and morphology first; then resolve token/grammar scope; only after that revisit the V93 L03 candidate with all upstream assumptions explicit.

## Effects
- canonical changes: 0
- new lexemes: 0
- morpheme promotions: 0
- new grammar rules: 0
- authority promotions: 0
- curriculum slot changes: 0
- V93 candidate validation approved by this sprint: no
