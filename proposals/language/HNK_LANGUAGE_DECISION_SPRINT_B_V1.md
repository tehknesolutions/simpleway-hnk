# HNK Language Decision — Sprint B V1

**Sprint ID:** `SWHNK-LANGUAGE-DECISION-SPRINT-B-V1`  
**State:** `READY_TO_BEGIN / ORDERED_HUMAN_GATES / NO_AUTOMATIC_CANON_MUTATION`  
**Audit baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`  
**Latest main observed at Sprint A closure:** `SWHNK-C1-PROGRESS-SNAPSHOT-V98`

## Purpose
Convert frozen Sprint A findings into explicit human decisions. Every phonology, romanization, morphology, lexicon, grammar, productivity, proposal-lifecycle or curriculum-language change requires its own gate. One approval never cascades to the next gate.

Sprint A final authority for the handoff is `HNK_LANGUAGE_AUDIT_FINAL_CONSOLIDATION_V1.json`.

## Human-gate sequence
### B1 — Y / G40 segmental identity
Decide whether to affirm current `G40=/y/` (vowel) as distinct from `G16=/j/`. This gate does not decide syllables, stress, diphthongs, allophony, romanization redesign, DAYI semantics, HOYU semantics or curriculum.

Current gate: **`SWHNK-HNK-B1-G40-Y-SEGMENTAL-IDENTITY-HUMAN-GATE-V1`**.

### B2 — syllable structure and adjacent vowels
After B1, govern syllable templates/preferences and treatment of adjacent vowels. FROZEN SARADAYA and TAYOVAN are mandatory evidence constraints.

### B3 — diphthongs, glide formation and Y-bearing word pronunciation
After B1-B2, decide whether any sequences form diphthongs/glides. Evaluate DAYI and repair HOYU metadata without silently changing G40 to G16.

### B4 — lexical stress and whole-word pronunciation
After B1-B3, govern stress strategy. Only then may canonical whole-word pronunciations be published for DAYI, SARADAYA, TAYOVAN, VAMATAYA, HOYU and similar forms.

### B5 — romanization coverage
Decide a strategy for the 20 G-IDs without safe Latin mappings. Romanization cannot redefine phonemes for convenience.

### B6 — phonotactic profile V2
Supersede the orthography-sensitive V1 only after B1-B5. V2 must distinguish corpus facts, canonical rules and optional authoring preferences.

### B7 — `-VAN`
Decide whether `-VAN` remains a strong distributional hypothesis or becomes a narrowly scoped place/location formative. KUVAN may remain a closed candidate without proving global VAN productivity.

### B8 — `PARAZAMO / PARAZAMI`
Decide whether the pair is lexical only or supports `PARAZAM-` plus a governed final-vowel contrast.

### B9 — final `-I`
Decide whether final I is an action/verbal morpheme, a statistical tendency, or neither. B8 provides important context.

### B10 — semantic families
Evaluate PAR-, VAM-/VAMA- and SAR- only after B7-B9. No derived vocabulary is authorized merely by family resemblance.

### B11 — VALA
Choose explicitly among: retain VALA as an independent authored primitive with repaired rationale; revise its candidate semantics/rationale; or retire/supersede. Do not preserve simple `VALA=activity` as recovered morphology.

### B12 — VANI
Prefer source recovery. If recovery fails, any `morar/residir` interpretation requires explicit new semantic authorship. The old residence-valency proposal is not reusable grammar by default.

### B13 — DAYI semantics and syntax
After B1-B4, decide DAYI's semantic range (`querer`, `intenção`, planning) and only then separately evaluate modal/complement syntax.

### B14 — AN / EN person-system scope
Decide whether AN/EN remain scoped referent mappings or become inputs to a broader person/pronoun system. EN subject-vs-possessive behavior remains unresolved outside approved constructions.

### B15 — interrogative architecture
Reconcile KU, KE, KUVAN and KUON. KU remains a scoped content selector; KE is not yet universal; KUVAN may remain closed; KUON is dependency-blocked because ON remains GATE. B15 must supersede the historical contradiction in which an earlier rule prohibited KU+ON but KUON was later registered.

### B16 — basic clause order
Decide whether S-P-O-compatible language-use evidence remains local or enters broader word-order design testing.

### B17 — ZAMO
Decide whether ZAMO receives a governed language/domain lexical mapping or remains recovery-only pending stronger evidence.

### B18 — provenance + proposal lifecycle/supersession
Adopt or revise lifecycle states such as `CURRENT`, `CURRENT_SCOPED`, `REVIEW_REQUIRED`, `DEPENDENCY_BLOCKED`, `HISTORICAL_PRIOR`, `SUPERSEDED_BY`, `RETIRED_PROPOSAL`, `AUDIT_ONLY`. Decide whether registry/proposal schemas gain machine-readable provenance/dependency/rationale/productivity/scope fields.

### B20 — four-axis governance
After B18, decide whether every language/curriculum asset independently declares source provenance, language authority, curriculum state and productivity.

### B21 — course-driven authorship threshold
After B20, define when a teaching gap may open new HNK authorship. Curriculum need is never historical language evidence.

### B22 — cross-lesson reuse taxonomy
After B20, require `EXACT_SCOPED_REUSE`, `NEW_SCOPE_EXTENSION`, or `LANGUAGE_PRODUCTIVITY_PROMOTION` labels for reuse.

### B23 — derived-content evidence rule
After B20, require Story/Activation/Review to cite upstream constructions; repetition increases practice, not independent language evidence.

### B19 — post-promotion/post-mapping L03 activity-utterance review
B19 comes last among governance decisions because `main` advanced externally during Sprint A.

At V98, `[ACTIVITY_LEXEME] -> VALI | PARAZAMI` is already:
- validated candidate;
- scoped productive only for `L03_CONTROLLED_ACTIVITY_CONTEXT_ONLY`;
- mapping-eligible for `STRUCTURES_ONLY`;
- mapped to `STR001`;
- **not authored** in STR001;
- **not validated** in STR001.

Sprint A did not approve productivity, mapping eligibility or exact mapping.

B19 must choose among:
- **AFFIRM** existing scoped productivity + STR001 mapping boundaries;
- **REVISE** scope/metadata/mapping boundaries;
- **REVOKE/SUPERSEDE** productivity and/or mapping if audit-governed policy shows they are unjustified.

B19 does not itself author or validate STR001. Only after B19 may the audit pathway consider the then-current main STR001 authoring-design gate.

## A9/A10 registry lifecycle snapshot
- `CURRENT` 9: BIZO, DUVE, KETI, LUSO, MUPI, NURA, PEVU, TOMI, ZOKA.
- `CURRENT_SCOPED` 8: KUVAN, NE, KALA, AN, EN, KU, KE, ZAMI.
- `REVIEW_REQUIRED` 2: VALA, HOYU.
- `DEPENDENCY_BLOCKED` 1: KUON.
- immediate canonical deletion: 0.

## Frozen order
`B1 -> B2 -> B3 -> B4 -> B5 -> B6 -> B7 -> B8 -> B9 -> B10 -> B11 -> B12 -> B13 -> B14 -> B15 -> B16 -> B17 -> B18 -> B20 -> B21 -> B22 -> B23 -> B19 -> then re-evaluate the current main STR001 authoring gate`

No gate consumes the next gate's authority.

## Main V98 boundary
Current observed `main` gate at Sprint A closure:
**`SWHNK-L03-BINAH-STR001-AUTHORING-DESIGN-HUMAN-BATCH-V1`**.

This gate is **not** the next audit gate. The next audit gate is B1. The main gate remains unconsumed by Sprint A/B preparation.

## Effects of preparation
- canonical changes: 0
- authored-candidate deletions: 0
- new lexemes: 0
- morpheme promotions: 0
- new phonology rules: 0
- new grammar rules: 0
- productivity promotions by audit preparation: 0
- authority promotions: 0
- curriculum slot assignments by audit preparation: 0
- V98 transitions attributed to Sprint A: no
