# HNK Language Audit — Sprint A V1

**Sprint ID:** `SWHNK-LANGUAGE-AUDIT-SPRINT-A-V1`  
**State:** `ACTIVE / AUDIT_FIRST / NO_CANON_MUTATION`  
**Reconciled baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`  
**Branch:** `audit/hnk-language-sprint-a-20260913`

## Purpose
Audit the HNK language already present before further language authoring is allowed to depend on unreviewed assumptions. This branch is isolated because concurrent curriculum automation repeatedly advanced `main` while audit commits were being written.

## Governance
- `@hnk/linguas` recovered registry remains historical lexical/phrase authority.
- `@hnk/linguas/authored` is a distinct governed candidate layer and must never be described as historical recovery.
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

### A5 — recovered phrases + grammar/pattern evidence
Artifact: `HNK_PHRASE_GRAMMAR_EVIDENCE_AUDIT_V1.json`.

Recovered phrase corpus: 7 total; 3 approximate glosses; 4 unrecovered glosses.

Strongest scoped findings:
- `AN`: first-person/referent evidence; now governed as `AUTH-016 CANDIDATE` for scoped L01/L02 use, not recovered standalone semantics.
- `EN`: second-person/addressee evidence; now `AUTH-017 CANDIDATE`; subject versus possessive analysis remains unresolved outside approved constructions.
- `ZAMI`: repeated language-use predicate evidence; now `AUTH-020 CANDIDATE` for scoped communicative use.
- `KE`: strong clause-final interrogative distribution; now `AUTH-019 CANDIDATE` for scoped L01/L02 constructions, not universal question grammar.
- `KU`: minimal-contrast support for a pre-nominal/content-selector role; now `AUTH-018 CANDIDATE`, explicitly not one fixed WH word.
- `ZAMO`: language/language-domain hypothesis supported by PHR-002 and PHR-006, but no standalone governed lexical mapping yet.
- `S-P-O` order: compatible with the language-use micro-domain, not established as universal HNK basic order.

Critical provenance finding: the recovered phrase layer and the governed authored-candidate layer must remain distinct. A recovered token occurrence does not mean its later standalone semantic mapping was historically recovered.

Current authored specializations `KUVAN`, `KUON` and `NE` are closed/scoped candidates. They do not make `VAN`, `ON`, `KU`, `KE` or negation globally productive.

The V93 L03 candidate `[ACTIVITY_LEXEME] -> VALI | PARAZAMI` is structurally compatible with the audit boundaries because it explicitly creates no person, tense, aspect, modality, zero-pronoun or universal bare-predicate rule. Its claim of contextual completeness remains a separate scoped validation question; Sprint A does not validate it.

### A6 — word-level phonology
Artifact: `HNK_WORD_LEVEL_PHONOLOGY_AUDIT_V1.json`.

Key findings:
- no governed source rule was recovered for syllabification, lexical stress, hiatus/diphthong assignment, glide formation, vowel coalescence, allophony or connected speech;
- `SARADAYA` and `TAYOVAN` are FROZEN native forms containing three adjacent vowel phonemes once `Y` is correctly classified as G40 `/y/`;
- `DAYI` is segmentally `/d a y i/`, but its syllable count, stress and vowel-sequence realization remain unresolved;
- the old `HNK_PHONOTACTIC_PROFILE_V1` remains useful as an historical authoring prior, but its `30/33` CV count and default anti-hiatus recommendation have known orthographic bias and must not be treated as recovered phonological law;
- a V2 phonotactic profile must be built only after explicit decisions on G40/Y, syllabification, diphthongs/glides and stress.

## Remaining Sprint A blocks
- curriculum-vs-language assumption audit across L01-L03;
- proposal-debt review for older candidates depending on unresolved morphology, phonology or token semantics;
- reconcile authored registry candidates against all completed audit findings;
- consolidate all required human choices into Sprint B and order decision gates.

## Current main-state boundary
Baseline used by this audit branch is V93 with one newly authored L03 candidate `[ACTIVITY_LEXEME]`, realizations `VALI`/`PARAZAMI`, awaiting validation. Sprint A neither created nor validates that candidate. Any later `main` advance must be reconciled separately before merge or gate consumption.
