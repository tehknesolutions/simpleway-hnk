# HNK Language Decision — Sprint B V1

**Sprint ID:** `SWHNK-LANGUAGE-DECISION-SPRINT-B-V1`  
**State:** `OPEN / DECISION BACKLOG / NO AUTOMATIC CANON MUTATION`  
**Audit baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`  
**Latest main observed:** `SWHNK-C1-PROGRESS-SNAPSHOT-V97`

## Purpose
Convert Sprint A findings into explicit human decisions. Each change to phonology, romanization, morphology, lexicon, grammar, productivity, proposal lifecycle or curriculum-language governance requires its own gate; no approval cascades automatically.

A8 established candidate preservation with targeted repair rather than registry reset. A9 now adds an explicit lifecycle/supersession plan so historical proposals cannot outrank later canonical or audit state.

Main V97 concurrency adds another rule: concurrent productivity/mapping transitions may be audited, affirmed, revised or superseded, but are not retroactively treated as approved by Sprint A.

## Decision backlog

### B1 — Y / G40
Decide whether `G40=/y/` with safe `Y` is intentional and should remain. Preserve the distinction from `G16=/j/` unless a separately governed allophonic rule says otherwise.

### B2 — syllable structure and adjacent vowels
Govern syllable templates/preferences and treatment of vowel sequences. Stable evidence includes FROZEN `SARADAYA` and `TAYOVAN`, which contain three adjacent vowel phonemes under authoritative classification.

### B3 — diphthongs, glide formation and Y-bearing word pronunciation
Decide whether HNK has governed diphthongs and which sequences qualify; decide whether any vowel may become a glide allophonically. Evaluate `DAYI /d a y i/` and re-evaluate authored numeral `HOYU`, whose old generation artifact treated `Y` as consonantal `/j/` and called the form `CVCV`. Do not silently convert G40 `/y/` into G16 `/j/`.

### B4 — lexical stress and word-level pronunciation
Choose a stress strategy: fixed, weight-sensitive, lexically marked, or intentionally unresolved. Only after this may canonical whole-word pronunciations be published for DAYI, SARADAYA, TAYOVAN, VAMATAYA, HOYU and similar unresolved forms.

### B5 — romanization coverage
Decide if/when the 20 currently unmapped G-IDs receive safe Latin representations. Romanization must not redefine phonemes for orthographic convenience.

### B6 — phonotactic profile V2
Replace the orthography-sensitive V1 authoring profile only after B1-B5. V2 must distinguish corpus facts, canonical phonological rules and optional authoring preferences. `HNK_PHONOTACTIC_PROFILE_V1.md` is thereafter historical prior, not current phonological law.

### B7 — `-VAN`
Evaluate narrowly scoped place/location morphology using `VALIVAN`, `TAYOVAN`, `PAROVAN`, counterexamples and productivity limits. State whether AUTH-001 KUVAN may continue to cite -VAN only as a closed candidate rationale or whether a narrowly productive locative formative is actually approved.

### B8 — `PARAZAMO / PARAZAMI`
Decide whether this is merely a lexical pair or evidence for `PARAZAM-` plus a governed final-vowel contrast.

### B9 — final `-I`
Decide whether final I is an action/verbal morpheme, a statistical tendency or neither.

### B10 — semantic families
Evaluate `PAR-`, `VAM-/VAMA-` and `SAR-` without deriving new words until segmentation and semantic function are approved.

### B11 — VALA
Reassess `AUTH-002 VALA = atividade`. FROZEN `KALOVALA = edifício/prédio` is a direct surface counterexample to simple `VALA=activity` segmentation. Choose explicitly among: retain VALA as an independent authored primitive with repaired rationale; revise meaning/rationale under a new candidate version; or retire/supersede the candidate. Do not retain the old back-analysis as recovered morphology.

### B12 — VANI
Prefer historical gloss recovery. If recovery fails, `morar/residir` requires its own authorship gate; morphology alone is insufficient. The experimental residence-valency proposal is an A9 retirement candidate and must not survive as reusable grammar merely because the curriculum needs a residence question.

### B13 — DAYI semantics and syntax
After B1-B4 establish pronunciation foundations, decide DAYI's semantic range (`querer`, `intenção`, planning) and only then separately evaluate complement/modal syntax. Phonological approval must not automatically approve semantics or grammar.

### B14 — person system scope (`AN` / `EN`)
Decide whether `AUTH-016 AN` and `AUTH-017 EN` remain scoped referent mappings or become inputs to a broader authored pronoun/person system. Preserve EN subject-vs-possessive uncertainty outside approved constructions.

### B15 — interrogative architecture (`KU` / `KE` / KUVAN / KUON)
Decide whether `AUTH-018 KU` and `AUTH-019 KE` remain scoped L01/L02 mappings or enter broader productivity tests. `KU` is not one fixed WH word; `KE` is not yet universal for every question type.

Reconcile the closed compounds:
- `AUTH-001 KUVAN`: may survive as closed locative specialization even if `VAN` remains nonproductive.
- `AUTH-003 KUON`: `ON=LEX-026` remains GATE; A9 classifies KUON as `DEPENDENCY_BLOCKED` for broader use.
- `HNK_COMPOSITIONAL_INTERROGATIVE_RULE_V1` explicitly prohibited `KU+ON` while ON was GATE, but KUON was later registered. B15 must issue a superseding decision and define the actual closed-compound inventory/dependency policy.

### B16 — basic clause order
Decide whether S-P-O-compatible order observed in the language-use micro-domain should remain local evidence or be tested as broader HNK word-order design. No universal order is established.

### B17 — `ZAMO`
Decide whether the language/language-domain hypothesis is strong enough for a separately governed authored lexical mapping, or whether `ZAMO` remains source-recovery-only pending stronger evidence.

### B18 — provenance + proposal lifecycle/supersession policy
Adopt or revise the A9 lifecycle model so proposal history cannot be mistaken for current language authority.

Proposed machine-readable states:
- `CURRENT`
- `CURRENT_SCOPED`
- `REVIEW_REQUIRED`
- `DEPENDENCY_BLOCKED`
- `HISTORICAL_PRIOR`
- `SUPERSEDED_BY`
- `RETIRED_PROPOSAL`
- `AUDIT_ONLY`

Also decide whether registry/proposal schemas should carry fields such as `sourceProvenance`, `lifecycleState`, `rationaleState`, `dependencies`, `productivityLevel` and `scope`. No schema mutation occurs before this decision.

### B19 — post-promotion review of the L03 activity utterance
`main` V97 already contains `[ACTIVITY_LEXEME] -> VALI | PARAZAMI` as **scoped productive** for `L03_CONTROLLED_ACTIVITY_CONTEXT_ONLY`, and curriculum mapping eligibility has also been approved for `STRUCTURES_ONLY`. Sprint A did not approve either transition.

B19 therefore becomes a post-promotion/post-eligibility language-audit decision before any exact slot mapping:
- **AFFIRM** the existing scoped productivity and mapping-eligibility boundaries;
- **REVISE** scope/metadata/boundaries;
- or **REVOKE/SUPERSEDE** either transition if the audit shows it is linguistically unjustified.

Regardless of outcome, B19 must keep explicit that the construction does not create universal bare-predicate grammar, zero pronouns, person, tense, aspect, modality, habituality, frequency, negation or interrogative grammar. B19 itself must not map a curriculum slot.

The current main gate `SWHNK-L03-BINAH-MINIMAL-ACTIVITY-UTTERANCE-STRUCTURES-EXACT-SLOT-MAPPING-HUMAN-BATCH-V1` remains separate and must not be consumed by this backlog preparation.

### B20 — four-axis governance model
Decide whether every language/curriculum asset must independently declare: (1) source provenance, (2) language authority, (3) curriculum state and (4) productivity. No axis auto-promotes another.

### B21 — course-driven authorship threshold
Define exactly when an unmet teaching function may open new HNK authorship. A curriculum requirement may justify a design problem, but never counts as evidence that a historical form or grammar already existed.

### B22 — cross-lesson reuse taxonomy
Require every future reuse to be labeled `EXACT_SCOPED_REUSE`, `NEW_SCOPE_EXTENSION`, or `LANGUAGE_PRODUCTIVITY_PROMOTION`. Reuse approval for one lesson must not silently widen language authority.

### B23 — derived-content evidence rule
Require Story, Activation and Review items to identify their upstream validated construction. Repetition increases pedagogical practice/coverage but does not count as independent linguistic evidence for the generating rule.

## A9 registry reconciliation snapshot
- `CURRENT` (9): BIZO, DUVE, KETI, LUSO, MUPI, NURA, PEVU, TOMI, ZOKA.
- `CURRENT_SCOPED` (8): KUVAN, NE, KALA, AN, EN, KU, KE, ZAMI.
- `REVIEW_REQUIRED` (2): VALA, HOYU.
- `DEPENDENCY_BLOCKED` (1): KUON.
- immediate deletion from canonical registry: 0.

These are audit lifecycle dispositions, not authority promotions.

## Recommended dependency order
`B1 -> B2 -> B3 -> B4 -> B5 -> B6 -> B7/B8/B9 -> B10/B11/B12 -> B13 -> B14/B15/B16/B17 -> B18/B20/B21/B22/B23 -> B19 -> CURRENT_MAIN_STR001_MAPPING_GATE`

Rationale: settle phonology, morphology and proposal debt first; then DAYI and broader grammar; formalize lifecycle/provenance and curriculum-language governance; audit the already-applied V97 productivity + mapping eligibility; only then consider exact `STR001` curriculum mapping.

## Effects
- canonical changes by Sprint B preparation: 0
- authored-candidate deletions: 0
- new lexemes: 0
- morpheme promotions: 0
- new phonology rules: 0
- new grammar rules: 0
- productivity promotions by Sprint A/B preparation: 0
- authority promotions: 0
- curriculum slot changes: 0
- V97 transitions attributed to Sprint A: no
- current V97 exact STR001 mapping gate consumed: no
