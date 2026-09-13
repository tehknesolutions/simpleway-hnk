# HNK Language Audit — Sprint A V1

**Sprint ID:** `SWHNK-LANGUAGE-AUDIT-SPRINT-A-V1`  
**State:** `ACTIVE / AUDIT_FIRST / NO_CANON_MUTATION`  
**Reconciled baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`  
**Latest main observed:** `SWHNK-C1-PROGRESS-SNAPSHOT-V95`  
**Branch:** `audit/hnk-language-sprint-a-20260913`

## Purpose
Audit the HNK language already present before further language authoring is allowed to depend on unreviewed assumptions. This branch is isolated because concurrent curriculum automation repeatedly advanced `main` while audit commits were being written.

## Governance
- `@hnk/linguas` recovered registry remains historical lexical/phrase authority.
- `@hnk/linguas/authored` is a distinct governed candidate layer and must never be described as historical recovery.
- `@hnk/glyphs G-ID` remains segmental glyph/IPA authority.
- Audit findings do not promote phonemes, morphemes, lexemes, grammar, productivity or curriculum slots.
- `SUPPORTED != PRODUCTIVE` remains invariant.
- `CURRICULUM_VALIDATED != LANGUAGE_CANONICAL != PRODUCTIVE_GRAMMAR` remains invariant.
- A stale proposal rationale creates review/supersession debt; it does not silently mutate or delete a canonical authored candidate.

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

### A5 — recovered phrases + grammar/pattern evidence
Artifact: `HNK_PHRASE_GRAMMAR_EVIDENCE_AUDIT_V1.json`.

Recovered phrase corpus: 7 total; 3 approximate glosses; 4 unrecovered glosses.

Strongest scoped findings:
- `AN`: first-person/referent evidence; governed as `AUTH-016 CANDIDATE` for scoped L01/L02 use, not recovered standalone semantics.
- `EN`: second-person/addressee evidence; `AUTH-017 CANDIDATE`; subject versus possessive analysis remains unresolved outside approved constructions.
- `ZAMI`: repeated language-use predicate evidence; `AUTH-020 CANDIDATE` for scoped communicative use.
- `KE`: strong clause-final interrogative distribution; `AUTH-019 CANDIDATE` for scoped L01/L02 constructions, not universal question grammar.
- `KU`: minimal-contrast support for a pre-nominal/content-selector role; `AUTH-018 CANDIDATE`, explicitly not one fixed WH word.
- `ZAMO`: language/language-domain hypothesis supported by PHR-002 and PHR-006, but no standalone governed lexical mapping yet.
- `S-P-O` order: compatible with the language-use micro-domain, not established as universal HNK basic order.

Critical provenance finding: recovered phrase occurrence and governed authored-candidate semantics must remain distinct.

### A6 — word-level phonology
Artifact: `HNK_WORD_LEVEL_PHONOLOGY_AUDIT_V1.json`.

Key findings:
- no governed source rule recovered for syllabification, lexical stress, hiatus/diphthong assignment, glide formation, vowel coalescence, allophony or connected speech;
- `SARADAYA` and `TAYOVAN` are FROZEN native forms containing three adjacent vowel phonemes once `Y` is correctly classified as G40 `/y/`;
- `DAYI` is segmentally `/d a y i/`, but syllable count, stress and vowel-sequence realization remain unresolved;
- old `HNK_PHONOTACTIC_PROFILE_V1` remains an historical authoring prior with known orthographic bias and must not be treated as recovered phonological law.

### A7 — curriculum × language assumptions
Artifact: `HNK_CURRICULUM_LANGUAGE_ASSUMPTION_AUDIT_V1.json`.

Key findings:
- L01 and L02 prove that a lesson may be completely validated pedagogically while universal language grammar remains deliberately unpromoted;
- a curriculum need may justify opening a governed authorship gate, but the need itself is never language evidence;
- L02 is a strong model of scoped pedagogy: recovered lexicon plus governed candidate functions can support complete curriculum without claiming universal tense, interrogative, negation or word-order grammar;
- L03 has the highest current pressure for language creation: 8 lexical bindings, zero direct recovered L03 pattern payloads, 128 curriculum slots still missing, and a governed-new-authoring route;
- Story/Activation/Review repetition amplifies upstream pedagogical material but does not become independent evidence for the grammar that generated it;
- numerical allocation must not select HNK words or grammar;
- productivity is a separate language axis from candidate validation and curriculum validation.

Recommended governance model: track independently (1) source provenance, (2) language authority, (3) curriculum state and (4) productivity. No value on one axis automatically promotes another.

### A8 — proposal debt / authored-candidate review 20/20
Artifact: `HNK_PROPOSAL_DEBT_AUDIT_V1.json`.

Canonical authored registry reviewed: `@hnk/linguas/authored@1.7.0-candidate`, 20 candidates.

Primary dispositions:
- `KEEP`: 9 — BIZO, DUVE, KETI, LUSO, MUPI, NURA, PEVU, TOMI, ZOKA.
- `KEEP_SCOPED`: 8 — KUVAN, NE, KALA, AN, EN, KU, KE, ZAMI.
- `REVIEW`: 2 — VALA and HOYU.
- `UNRESOLVED_DEPENDENCY`: 1 — KUON.
- immediate deletions: 0.

High-priority debt:
- `VALA`: the form may remain authored, but its corpus-facing activity-noun back-analysis is weakened by FROZEN `KALOVALA`; B11 must decide retain-as-independent-primitive, revise, or retire.
- `KUON`: ON remains `GATE`, and the earlier compositional-interrogative rule explicitly prohibited `KU + ON` in v1 before KUON was later registered; B15 must resolve/supersede this history before broader use.
- `HOYU`: old numeral-generation metadata treated Y as consonantal `/j/` and called HOYU `CVCV`; under G40 `/y/` vowel this phonology metadata is stale. Meaning/value can remain candidate while B1-B4 re-evaluate pronunciation/shape.
- `KUVAN`: survives well as a closed authored specialization, but not as proof that `VAN` is productively locative.
- `AN/EN/KU/KE/ZAMI/KALA`: evidence-mapped candidates remain strong for their current scopes; none becomes globally productive through curriculum repetition.
- `NE`: survives as a deliberately authored scoped primitive; no global negation grammar follows.

Proposal-level supersession debt:
- `HNK_RESIDENCE_VALENCY_RULE_V1.json` is a retirement/supersession candidate because it stacks unresolved VANI semantics, KUON/ON dependency and new valency assumptions.
- `HNK_COMPOSITIONAL_INTERROGATIVE_RULE_V1.json` requires V2 because its KU+ON prohibition conflicts with later KUON registration.
- `HNK_GRAMMAR_CANDIDATE_V1.json` is no longer a current-state authority because later authored mappings changed its unresolved inventory.
- `HNK_PHONOTACTIC_PROFILE_V1.md` remains historical prior only pending B1-B6.
- numeral candidate-generation metadata requires phonology refresh, especially HOYU.

A8 conclusion: the authored registry is not fundamentally broken. The correct strategy is targeted repair + explicit supersession metadata, not reset/deletion.

## Remaining Sprint A blocks
- A9 — authored-registry reconciliation + proposal supersession map: define the exact noncanonical metadata/patch plan that would make A1-A8 findings machine-readable without mutating canon yet.
- A10 — final Sprint A consolidation: freeze audit findings, dependency graph and ordered Sprint B gates.

## Current main-state boundary
The audit branch baseline remains V93. `main` has advanced independently to observed V95. The current L03 activity candidate is validated and productivity-eligible, while actual scoped productivity remains false and `SWHNK-L03-BINAH-MINIMAL-ACTIVITY-UTTERANCE-SCOPED-PRODUCTIVITY-PROMOTION-HUMAN-BATCH-V1` remains pending. Sprint A did not approve or consume that gate and recommends completing the language-audit decision chain before any productivity promotion.
