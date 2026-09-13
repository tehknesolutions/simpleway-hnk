# HNK Language Audit — Sprint A V1

**Sprint ID:** `SWHNK-LANGUAGE-AUDIT-SPRINT-A-V1`  
**State:** `ACTIVE / AUDIT_FIRST / NO_CANON_MUTATION`  
**Audit baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`  
**Latest main observed:** `SWHNK-C1-PROGRESS-SNAPSHOT-V96`  
**Branch:** `audit/hnk-language-sprint-a-20260913`

## Purpose
Audit the HNK language already present before further language authoring is allowed to depend on unreviewed assumptions. The branch is isolated from concurrent curriculum automation on `main`.

## Governance
- `@hnk/linguas` recovered registry remains historical lexical/phrase authority.
- `@hnk/linguas/authored` is a distinct governed candidate layer and must never be described as historical recovery.
- `@hnk/glyphs G-ID` remains segmental glyph/IPA authority.
- Audit findings do not promote phonemes, morphemes, lexemes, grammar, productivity or curriculum slots.
- `SUPPORTED != PRODUCTIVE`.
- `CURRICULUM_VALIDATED != LANGUAGE_CANONICAL != PRODUCTIVE_GRAMMAR`.
- A stale proposal rationale creates review/supersession debt; it does not silently mutate or delete a canonical authored candidate.

## Completed blocks

### A1 — segmental phonology 40/40
Artifact: `HNK40_PHONEME_CLASSIFICATION_AUDIT_V1.json`.

Key finding: `Y -> G40 -> /y/` is a vowel; `G16 -> /j/` is a separate glide. Safe romanization covers 20/40 G-IDs.

### A2 — phonemic shape 33/33
Artifact: `HNK33_PHONEMIC_SHAPE_AUDIT_V1.json`.

Key finding: authoritative IPA classes yield strict `(CV)+(C)?` matching for 26/33 forms rather than the old orthography-sensitive 30/33. FROZEN `SARADAYA` and `TAYOVAN` are Y-bearing exceptions.

### A3 — DAYI
`DAYI = G19 G01 G40 G03 = /d a y i/` segmentally, shape `CVVV`. Full pronunciation remains unresolved because stress, syllabification, adjacent-vowel behavior and allophony are not governed. Meaning remains `querer / intenção`, `CANDIDATE / PARTIAL`; modal/complement syntax remains unresolved.

### A4 — lexicon/morphology 33 forms
Artifact: `HNK_LEXICON_MORPHOLOGY_AUDIT_V1.json`.

Corpus: 10 FROZEN, 10 WATCH, 3 CANDIDATE, 8 GATE, 1 BRIDGE, 1 REFERENCE; 21 RECOVERED, 7 PARTIAL, 5 UNRECOVERED.

Strongest nonproductive hypotheses:
1. `-VAN` place/location.
2. `PARAZAMO ~ PARAZAMI` single-family minimal pair.
3. final `-I` action/verbal correlation.
4. `PAR-` moderate semantic cluster.
5. `VAM-/VAMA-` and `SAR-` weaker clusters.

`VALA=atividade` back-analysis is weakened by FROZEN `KALOVALA=edifício/prédio`. `VANI=morar/residir` remains a test hypothesis dependent on unapproved morphology.

### A5 — recovered phrases + grammar/pattern evidence
Artifact: `HNK_PHRASE_GRAMMAR_EVIDENCE_AUDIT_V1.json`.

Recovered phrase corpus: 7 total; 3 approximate glosses; 4 unrecovered glosses.

Strongest scoped findings:
- `AN`: first-person/referent evidence; authored mapping `AUTH-016`.
- `EN`: second-person/addressee evidence; authored mapping `AUTH-017`; subject vs possessive remains unresolved outside approved constructions.
- `ZAMI`: speak/use-language predicate evidence; authored mapping `AUTH-020`.
- `KE`: strong clause-final question distribution; authored mapping `AUTH-019`, not universal.
- `KU`: content-selector evidence; authored mapping `AUTH-018`, not one fixed WH word.
- `ZAMO`: language/language-domain hypothesis, no standalone governed lexical mapping yet.
- S-P-O-compatible order: language-use micro-domain only, not universal HNK order.

Recovered occurrence and governed authored semantics remain distinct.

### A6 — word-level phonology
Artifact: `HNK_WORD_LEVEL_PHONOLOGY_AUDIT_V1.json`.

No governed rule was recovered for syllabification, lexical stress, hiatus/diphthong assignment, glide formation, coalescence, allophony or connected speech. `DAYI` is segmentally `/d a y i/`, but whole-word pronunciation remains unresolved. `HNK_PHONOTACTIC_PROFILE_V1` is only a historical authoring prior because of orthographic Y bias.

### A7 — curriculum × language assumptions
Artifact: `HNK_CURRICULUM_LANGUAGE_ASSUMPTION_AUDIT_V1.json`.

Key findings:
- a lesson can be fully curriculum-validated while universal grammar remains unpromoted;
- a teaching need may open an authorship gate, but is not historical evidence;
- Story/Activation/Review repetition adds pedagogical coverage, not independent linguistic evidence;
- numerical allocation cannot select HNK forms or grammar;
- source provenance, language authority, curriculum state and productivity should be independent axes.

### A8 — proposal debt / authored-candidate review 20/20
Artifact: `HNK_PROPOSAL_DEBT_AUDIT_V1.json`.

Reviewed canonical authored registry `@hnk/linguas/authored@1.7.0-candidate`.

Primary dispositions:
- `KEEP` 9: BIZO, DUVE, KETI, LUSO, MUPI, NURA, PEVU, TOMI, ZOKA.
- `KEEP_SCOPED` 8: KUVAN, NE, KALA, AN, EN, KU, KE, ZAMI.
- `REVIEW` 2: VALA, HOYU.
- `UNRESOLVED_DEPENDENCY` 1: KUON.
- immediate canonical deletions: 0.

High-priority debt:
- `VALA`: candidate may remain, but prior corpus-facing activity-noun rationale is weakened by `KALOVALA`; B11 must retain-as-primitive, revise or retire/supersede.
- `KUON`: depends on `ON=LEX-026 GATE`, and an earlier compositional rule explicitly prohibited `KU+ON` before KUON was later registered; B15 must supersede/reconcile this history.
- `HOYU`: old generation metadata treated `Y` as consonantal `/j/` and labeled the word `CVCV`; under G40 `/y/` vowel, phonology metadata is stale. Numeral semantics can remain pending B1-B4.
- `KUVAN`: survives as a closed authored specialization, not as proof of productive `VAN` morphology.
- `AN/EN/KU/KE/ZAMI/KALA/NE`: survive in current governed scopes; none becomes globally productive through course repetition.

Proposal-level supersession debt includes the experimental residence-valency rule, compositional interrogative V1, old grammar candidate snapshot, phonotactic profile V1 and old numeral-generation phonology metadata.

A8 conclusion: targeted repair and explicit supersession metadata are preferable to registry reset/deletion.

## Concurrency reconciliation — main V96
While A8 was being finalized, `main` advanced independently from V95 to `SWHNK-C1-PROGRESS-SNAPSHOT-V96`.

Observed concurrent transition:
- `[ACTIVITY_LEXEME] -> VALI | PARAZAMI` became `SCOPED_PRODUCTIVE` only for `L03_CONTROLLED_ACTIVITY_CONTEXT_ONLY`;
- the candidate remains non-universal;
- no new HNK forms were created;
- no curriculum slots were mapped;
- implementation counts remained GLOBAL `703/0/305` and L03 `128/0/11`;
- Sprint A neither created nor approved that productivity promotion.

The current `main` human gate is now `SWHNK-L03-BINAH-MINIMAL-ACTIVITY-UTTERANCE-CURRICULUM-MAPPING-ELIGIBILITY-HUMAN-BATCH-V1`. Sprint A has not consumed it.

Audit policy after V96: do not auto-rollback the concurrent main transition, but do not treat it as an audit endorsement either. A9 must reconcile the already-applied scoped productivity against A1-A8 before any curriculum mapping eligibility decision is consumed.

See `HNK_LANGUAGE_AUDIT_CONCURRENCY_NOTE_V4.json`.

## Remaining Sprint A blocks
- **A9 — authored-registry reconciliation + proposal supersession map:** define exact metadata/patch plan for A1-A8 findings, including V96, without mutating canon yet.
- **A10 — final Sprint A consolidation:** freeze findings, dependency graph and ordered Sprint B human gates.

## Current boundary
Sprint A has completed A1-A8. It has made **0 canonical mutations, 0 authority promotions, 0 candidate deletions, 0 grammar promotions and 0 curriculum slot assignments**. The next audit action is A9, not consumption of the V96 curriculum-mapping gate.
