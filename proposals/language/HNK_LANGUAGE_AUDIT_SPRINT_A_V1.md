# HNK Language Audit — Sprint A V1

**Sprint ID:** `SWHNK-LANGUAGE-AUDIT-SPRINT-A-V1`  
**State:** `ACTIVE / AUDIT_FIRST / NO_CANON_MUTATION`  
**Audit baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`  
**Latest main observed:** `SWHNK-C1-PROGRESS-SNAPSHOT-V97`  
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
- Proposal lifecycle and canonical language authority are separate: historical proposal files may remain preserved without continuing to function as current authority.

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
- `VALA`: prior corpus-facing activity-noun rationale weakened by `KALOVALA`.
- `KUON`: dependency on `ON=LEX-026 GATE` plus historical conflict with the earlier compositional rule.
- `HOYU`: old generation metadata treated `Y` as consonantal `/j/` and called the form `CVCV`.
- `KUVAN`: survives as a closed authored specialization, not proof of productive `VAN` morphology.

### A9 — authored registry reconciliation + proposal supersession map
Artifact: `HNK_AUTHORED_REGISTRY_RECONCILIATION_SUPERSESSION_MAP_V1.json`.

A9 converts A1-A8 findings into a non-mutating maintenance plan.

Canonical authored registry reconciliation:
- `CURRENT` 9: BIZO, DUVE, KETI, LUSO, MUPI, NURA, PEVU, TOMI, ZOKA.
- `CURRENT_SCOPED` 8: KUVAN, NE, KALA, AN, EN, KU, KE, ZAMI.
- `REVIEW_REQUIRED` 2: VALA, HOYU.
- `DEPENDENCY_BLOCKED` 1: KUON.
- immediate deletions: 0.
- authority promotions: 0.

Lifecycle model prepared for future approval:
- `CURRENT`
- `CURRENT_SCOPED`
- `REVIEW_REQUIRED`
- `DEPENDENCY_BLOCKED`
- `HISTORICAL_PRIOR`
- `SUPERSEDED_BY`
- `RETIRED_PROPOSAL`
- `AUDIT_ONLY`

High-value supersession decisions prepared:
- `HNK_PHONOTACTIC_PROFILE_V1.md` -> `HISTORICAL_PRIOR`, future V2 only after B1-B6.
- `HNK_GRAMMAR_CANDIDATE_V1.json` -> `HISTORICAL_PRIOR`, superseded as current evidence snapshot by A5 plus later Sprint B decisions.
- `HNK_COMPOSITIONAL_INTERROGATIVE_RULE_V1.json` -> `REVIEW_REQUIRED_SUPERSESSION_PLANNED`, because its KU+ON prohibition conflicts with later canonical KUON registration.
- `HNK_RESIDENCE_VALENCY_RULE_V1.json` -> `RETIRED_PROPOSAL_CANDIDATE`, because it stacks unresolved VANI, KUON/ON and valency assumptions.
- old numeral candidate-generation artifact -> `REVIEW_REQUIRED` for Y-sensitive phonology metadata; numeral semantics remain independent.

A9 patch planning only: no registry schema/type field has been changed. Future fields such as `sourceProvenance`, `lifecycleState`, `rationaleState`, `dependencies`, `productivityLevel` and `scope` require their owning Sprint B governance decisions first.

## Concurrency reconciliation — main V97
While A9 was running, `main` advanced independently to `SWHNK-C1-PROGRESS-SNAPSHOT-V97`.

Observed concurrent state:
- `[ACTIVITY_LEXEME] -> VALI | PARAZAMI` remains `SCOPED_PRODUCTIVE` for `L03_CONTROLLED_ACTIVITY_CONTEXT_ONLY`;
- curriculum mapping eligibility is now approved for `STRUCTURES_ONLY`;
- exact proposed slot is `STR001`;
- actual curriculum mapping remains false;
- curriculum slot assignments remain 0;
- implementation counts remain GLOBAL `703/0/305` and L03 `128/0/11`;
- Sprint A did not create or approve the productivity or mapping-eligibility transitions.

The current `main` gate is `SWHNK-L03-BINAH-MINIMAL-ACTIVITY-UTTERANCE-STRUCTURES-EXACT-SLOT-MAPPING-HUMAN-BATCH-V1`. Sprint A has not consumed it.

See `HNK_LANGUAGE_AUDIT_CONCURRENCY_NOTE_V5.json`.

## Remaining Sprint A block
- **A10 — final Sprint A consolidation:** freeze findings, dependency graph, risk register and ordered Sprint B human-gate plan. A10 must not itself mutate canon or consume the V97 STR001 gate.

## Current boundary
Sprint A has completed A1-A9. It has made **0 canonical mutations, 0 authority promotions, 0 candidate deletions, 0 phonology/grammar promotions and 0 curriculum slot assignments**. The next audit action is A10 final consolidation.
