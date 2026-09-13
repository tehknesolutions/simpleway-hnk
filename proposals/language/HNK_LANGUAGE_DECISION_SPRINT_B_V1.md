# HNK Language Decision — Sprint B V1

**Sprint ID:** `SWHNK-LANGUAGE-DECISION-SPRINT-B-V1`  
**State:** `OPEN / DECISION BACKLOG / NO AUTOMATIC CANON MUTATION`  
**Audit baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`  
**Latest main observed:** `SWHNK-C1-PROGRESS-SNAPSHOT-V95`

## Purpose
Convert Sprint A findings into explicit human decisions. Each change to phonology, romanization, morphology, lexicon, grammar, productivity or curriculum-language governance requires its own gate; no approval cascades automatically.

A8 adds a preservation rule: existing `@hnk/linguas/authored` candidates are not deleted merely because an old rationale becomes stale. Human decisions must distinguish candidate-form retention, rationale repair, dependency resolution, supersession and actual authority/productivity promotion.

## Decision backlog

### B1 — Y / G40
Decide whether `G40=/y/` with safe `Y` is intentional and should remain. Preserve the distinction from `G16=/j/` unless a separately governed allophonic rule says otherwise.

### B2 — syllable structure and adjacent vowels
Govern syllable templates/preferences and treatment of vowel sequences. Stable evidence includes FROZEN `SARADAYA` and `TAYOVAN`, which contain three adjacent vowel phonemes under authoritative classification.

### B3 — diphthongs, glide formation and Y-bearing word pronunciation
Decide whether HNK has governed diphthongs and which sequences qualify; decide whether any vowel may become a glide allophonically. Evaluate `DAYI /d a y i/` as the primary recovered/candidate case and also re-evaluate authored numeral `HOYU`, whose old generation artifact incorrectly treated `Y` as consonantal `/j/` and called the form `CVCV`. Do not silently convert G40 `/y/` into G16 `/j/`.

### B4 — lexical stress and word-level pronunciation
Choose a stress strategy: fixed, weight-sensitive, lexically marked, or intentionally unresolved. Only after this may canonical whole-word pronunciations be published for DAYI, SARADAYA, TAYOVAN, VAMATAYA, HOYU and other unresolved Y-bearing forms.

### B5 — romanization coverage
Decide if/when the 20 currently unmapped G-IDs receive safe Latin representations. Romanization must not redefine phonemes for orthographic convenience.

### B6 — phonotactic profile V2
Replace the current orthography-sensitive authoring profile only after B1-B5. V2 must distinguish corpus facts, canonical phonological rules and optional authoring preferences.

### B7 — `-VAN`
Evaluate narrowly scoped place/location morphology using `VALIVAN`, `TAYOVAN`, `PAROVAN`, counterexamples and productivity limits. Explicitly state whether AUTH-001 KUVAN may continue to cite -VAN only as a closed candidate rationale or whether a narrowly productive locative formative is actually approved.

### B8 — `PARAZAMO / PARAZAMI`
Decide whether this is merely a lexical pair or evidence for `PARAZAM-` plus a governed final-vowel contrast.

### B9 — final `-I`
Decide whether final I is an action/verbal morpheme, a statistical tendency or neither.

### B10 — semantic families
Evaluate `PAR-`, `VAM-/VAMA-` and `SAR-` without deriving new words until segmentation and semantic function are approved.

### B11 — VALA
Reassess authored `AUTH-002 VALA = atividade`. FROZEN `KALOVALA = edifício/prédio` is a direct surface counterexample to simple `VALA=activity` segmentation. Choose explicitly among: retain VALA as an independent newly authored primitive with repaired rationale; revise meaning/rationale under a new candidate version; or retire/supersede the candidate. Do not retain the old back-analysis as recovered morphology.

### B12 — VANI
Prefer historical gloss recovery. If recovery fails, a new semantic interpretation `morar/residir` requires its own authorship gate; morphology alone is insufficient. The experimental residence-valency proposal must not survive as a reusable rule merely because the curriculum needs a residence question.

### B13 — DAYI semantics and syntax
After B1-B4 establish pronunciation foundations, decide DAYI's semantic range (`querer`, `intenção`, planning) and only then separately evaluate complement/modal syntax. Phonological approval must not automatically approve semantics or grammar.

### B14 — person system scope (`AN` / `EN`)
Decide whether `AUTH-016 AN` and `AUTH-017 EN` remain scoped referent mappings or become inputs to a broader authored pronoun/person system. Do not retroactively describe their standalone meanings as historically recovered; preserve EN subject-vs-possessive uncertainty outside approved constructions.

### B15 — interrogative architecture (`KU` / `KE` / KUVAN / KUON)
Decide whether `AUTH-018 KU` and `AUTH-019 KE` remain scoped L01/L02 mappings or enter broader productivity tests. Preserve: KU is not one fixed WH word; KE is not yet universal for every question type.

This gate must also reconcile the closed compounds:
- `AUTH-001 KUVAN`: may survive as a closed locative specialization even if `VAN` remains nonproductive; do not use KUVAN as proof of general KU+domain morphology.
- `AUTH-003 KUON`: ON remains `LEX-026 GATE`; broader use is blocked until the human-referent dependency is resolved.
- historical proposal conflict: `HNK_COMPOSITIONAL_INTERROGATIVE_RULE_V1` explicitly prohibited `KU+ON` in v1 while ON was GATE, but KUON was later registered as a candidate. B15 must supersede that inconsistency explicitly.

### B16 — basic clause order
Decide whether S-P-O-compatible order observed in the language-use micro-domain should remain local evidence or be tested as a broader HNK word-order design. No universal order is currently established.

### B17 — `ZAMO`
Decide whether the language/language-domain hypothesis is strong enough for a separately governed authored lexical mapping, or whether `ZAMO` remains source-recovery-only pending stronger evidence.

### B18 — recovered-vs-authored provenance + proposal supersession policy
Make the distinction machine-readable and pedagogically visible: recovered surface occurrence, distributionally supported interpretation, governed authored candidate semantics, and productive grammar must never collapse into one authority label.

Also define proposal lifecycle metadata so an older artifact can be marked `CURRENT`, `HISTORICAL_PRIOR`, `SUPERSEDED_BY`, `REVIEW_REQUIRED` or `RETIRED_PROPOSAL` without deleting history. A stale proposal rationale must never outrank the current canonical registry or a later audit.

### B19 — L03 activity-utterance route
Re-review the current `[ACTIVITY_LEXEME] -> VALI | PARAZAMI` route before any scoped productivity promotion. `main` has already validated the candidate and approved productivity eligibility, but actual productivity remains false. Decide whether contextual completeness should become a scoped productive L03 construction while explicitly denying universal bare-predicate, zero-pronoun, person, tense, aspect, modality or habituality grammar.

### B20 — four-axis governance model
Decide whether every language/curriculum asset must independently declare: (1) source provenance `RECOVERED|AUTHORED`, (2) language authority, (3) curriculum implementation/validation state, and (4) productivity level. No axis may auto-promote another.

### B21 — course-driven authorship threshold
Define exactly when an unmet teaching function may open new HNK authorship. A curriculum requirement may justify a design problem, but must never count as evidence that a historical form or grammar already exists.

### B22 — cross-lesson reuse taxonomy
Require every future reuse to be labeled as one of: `EXACT_SCOPED_REUSE`, `NEW_SCOPE_EXTENSION`, or `LANGUAGE_PRODUCTIVITY_PROMOTION`. Reuse approval for one lesson must not silently widen language authority.

### B23 — derived-content evidence rule
Require Story, Activation and Review items to identify their upstream validated construction. Repetition in derived lanes increases pedagogical practice/coverage but must not be counted as independent linguistic evidence for the generating rule.

## A8 authored-candidate preservation matrix
Current primary disposition of the 20 canonical authored candidates:
- `KEEP` (9): BIZO, DUVE, KETI, LUSO, MUPI, NURA, PEVU, TOMI, ZOKA.
- `KEEP_SCOPED` (8): KUVAN, NE, KALA, AN, EN, KU, KE, ZAMI.
- `REVIEW` (2): VALA, HOYU.
- `UNRESOLVED_DEPENDENCY` (1): KUON.
- immediate deletion/retirement from canonical registry: 0.

These are Sprint A audit dispositions only, not authority promotions. Sprint B decisions may retain, revise or supersede them through explicit gates.

## Recommended dependency order
`B1 -> B2 -> B3 -> B4 -> B5 -> B6 -> B7/B8/B9 -> B10/B11/B12 -> B13 -> B14/B15/B16/B17/B18 -> B20/B21/B22/B23 -> B19`

Rationale: settle phonology first, including HOYU; then morphology and candidate rationales; then DAYI; then token/grammar scope, KUON dependency and proposal lifecycle; then formalize the curriculum-language governance model; only after those boundaries are explicit should the current L03 productivity decision be consumed.

## Effects
- canonical changes: 0
- authored-candidate deletions: 0
- new lexemes: 0
- morpheme promotions: 0
- new phonology rules: 0
- new grammar rules: 0
- productivity promotions: 0
- authority promotions: 0
- curriculum slot changes: 0
- current L03 productivity gate approved by this sprint: no
