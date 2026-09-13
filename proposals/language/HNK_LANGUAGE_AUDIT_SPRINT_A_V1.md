# HNK Language Audit — Sprint A V1

**Sprint ID:** `SWHNK-LANGUAGE-AUDIT-SPRINT-A-V1`  
**State:** `COMPLETE / FINDINGS_FROZEN / NO_CANON_MUTATION`  
**Audit baseline:** `SWHNK-C1-PROGRESS-SNAPSHOT-V93`  
**Latest main observed at closure:** `SWHNK-C1-PROGRESS-SNAPSHOT-V98`  
**Branch:** `audit/hnk-language-sprint-a-20260913`

## Purpose
Audit the HNK language already present before further language authoring depends on unreviewed assumptions. The branch remained isolated from concurrent curriculum automation on `main`.

## Frozen governance invariants
- `@hnk/linguas` recovered registry remains historical lexical/phrase authority.
- `@hnk/linguas/authored` is a governed candidate layer and is never historical recovery.
- `@hnk/glyphs G-ID` remains segmental glyph/IPA authority.
- `SUPPORTED != PRODUCTIVE`.
- `CURRICULUM_VALIDATED != LANGUAGE_CANONICAL != PRODUCTIVE_GRAMMAR`.
- Recovered surface occurrence, supported interpretation, authored semantics and productive grammar are separate authority states.
- Curriculum need may open an authorship problem but is not evidence that a historical form or grammar existed.
- Historical proposals remain provenance; stale proposal rationale cannot outrank later registry/audit state.
- Reference languages are comparison-only; numerology governs counts/allocation only and does not select forms or grammar.
- One human gate at a time.

## Completed blocks
- **A1 — segmental phonology 40/40:** `HNK40_PHONEME_CLASSIFICATION_AUDIT_V1.json`. Key: `G40=/y/` vowel; `G16=/j/` distinct; safe romanization 20/40.
- **A2 — phonemic shape 33/33:** `HNK33_PHONEMIC_SHAPE_AUDIT_V1.json`. Strict `(CV)+(C)?` fit is 26/33 under authoritative IPA, not the old orthography-sensitive 30/33.
- **A3 — DAYI:** `DAYI = G19 G01 G40 G03 = /d a y i/`, shape `CVVV`; whole-word pronunciation unresolved; meaning remains `querer / intenção`, `CANDIDATE / PARTIAL`.
- **A4 — lexicon/morphology:** `HNK_LEXICON_MORPHOLOGY_AUDIT_V1.json`. Strongest nonproductive hypotheses: `-VAN`, `PARAZAMO~PARAZAMI`, final `-I`; `VALA` rationale weakened; `VANI` remains glossless WATCH/test hypothesis.
- **A5 — phrase/grammar evidence:** `HNK_PHRASE_GRAMMAR_EVIDENCE_AUDIT_V1.json`. Seven recovered phrases; strongest scoped evidence covers AN, EN, KU, KE, ZAMI, KALA; no general productive grammar promoted.
- **A6 — word-level phonology:** `HNK_WORD_LEVEL_PHONOLOGY_AUDIT_V1.json`. No governed syllabification, stress, hiatus/diphthong, glide, allophony or connected-speech rules recovered.
- **A7 — curriculum × language:** `HNK_CURRICULUM_LANGUAGE_ASSUMPTION_AUDIT_V1.json`. Curriculum validation and language authority/productivity are independent; Story/Activation/Review repetition is not independent linguistic evidence.
- **A8 — proposal debt 20/20:** `HNK_PROPOSAL_DEBT_AUDIT_V1.json`. `KEEP` 9; `KEEP_SCOPED` 8; `REVIEW` 2 (VALA, HOYU); `UNRESOLVED_DEPENDENCY` 1 (KUON); immediate deletions 0.
- **A9 — registry reconciliation/supersession:** `HNK_AUTHORED_REGISTRY_RECONCILIATION_SUPERSESSION_MAP_V1.json`. Lifecycle plan prepared; no canonical schema mutation.
- **A10 — final consolidation:** `HNK_LANGUAGE_AUDIT_FINAL_CONSOLIDATION_V1.json`. Findings frozen, dependency graph and risk register established, Sprint B gates ordered.

## A10 frozen conclusions
### Segmental/phonology
- Current authority distinguishes `G40=/y/` (vowel) from `G16=/j/` (glide/consonantal approximant).
- DAYI is segmentally `/d a y i/`; its syllables/stress remain unresolved.
- FROZEN SARADAYA and TAYOVAN demonstrate that Y-bearing adjacent-vowel sequences already occur in stable material.
- HOYU retains numeral semantics as a candidate, but old `/hoju/`/`CVCV` metadata is review debt.

### Lexicon/morphology
- `-VAN` is the strongest current morphology hypothesis but is not productive canon.
- `PARAZAMO/PARAZAMI` is the strongest minimal pair for a possible final-vowel contrast.
- Final `-I` is a strong correlation, not an approved verbal morpheme.
- `VALA=atividade` must not continue to cite simple recovered morphology because FROZEN `KALOVALA=edifício/prédio` is a counterexample.
- `VANI=morar/residir` remains unapproved test semantics.

### Grammar
- AN/EN/KU/KE/ZAMI/KALA survive as scoped governed candidate mappings, not universal grammar.
- S-P-O compatibility is supported only in the recovered language-use micro-domain.
- ZAMO remains a language/domain hypothesis without standalone governed mapping.
- Sprint A approved **0 general productive grammar rules**.

### Authored registry lifecycle snapshot
- `CURRENT` 9: BIZO, DUVE, KETI, LUSO, MUPI, NURA, PEVU, TOMI, ZOKA.
- `CURRENT_SCOPED` 8: KUVAN, NE, KALA, AN, EN, KU, KE, ZAMI.
- `REVIEW_REQUIRED` 2: VALA, HOYU.
- `DEPENDENCY_BLOCKED` 1: KUON.
- Immediate deletions: 0.

## Main V98 concurrency boundary
At Sprint A closure, `main` had advanced independently to `SWHNK-C1-PROGRESS-SNAPSHOT-V98`:
- `[ACTIVITY_LEXEME] -> VALI | PARAZAMI` is scoped productive for `L03_CONTROLLED_ACTIVITY_CONTEXT_ONLY`;
- mapping eligibility is approved for `STRUCTURES_ONLY`;
- `STR001` is already mapped;
- `STR001` remains unauthored and unvalidated;
- OPI/QA remain locked;
- implementation counts remain GLOBAL `703 MISSING / 0 AUTHORED / 305 VALIDATED`, L03 `128 MISSING / 0 AUTHORED / 11 VALIDATED`.

Sprint A did **not** create or approve the productivity, mapping eligibility or exact STR001 mapping transitions. See `HNK_LANGUAGE_AUDIT_CONCURRENCY_NOTE_V6.json`.

Current `main` gate observed at closure: `SWHNK-L03-BINAH-STR001-AUTHORING-DESIGN-HUMAN-BATCH-V1`. Sprint A did not consume it.

## Sprint A effects
- canonical mutations: **0**
- authored-registry mutations: **0**
- candidate deletions: **0**
- authority promotions: **0**
- new lexemes: **0**
- new phonology rules: **0**
- new morphology rules: **0**
- new grammar rules: **0**
- productivity promotions by Sprint A: **0**
- curriculum slot assignments by Sprint A: **0**

## Handoff to Sprint B
The ordered human-decision plan is frozen in `HNK_LANGUAGE_AUDIT_FINAL_CONSOLIDATION_V1.json` and maintained in `HNK_LANGUAGE_DECISION_SPRINT_B_V1.md`.

The first explicit human gate is:

**`SWHNK-HNK-B1-G40-Y-SEGMENTAL-IDENTITY-HUMAN-GATE-V1`**

B1 decides only whether the current segmental distinction `G40=/y/` vs `G16=/j/` is affirmed. It does not decide syllabification, stress, diphthongs, romanization, DAYI semantics, HOYU semantics or L03 curriculum.
