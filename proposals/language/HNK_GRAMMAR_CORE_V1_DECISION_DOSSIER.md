# HNK Grammar Core V1 — Decision Dossier

**Dossier ID:** `SWHNK-HNK-GRAMMAR-CORE-V1-DECISION-DOSSIER`  
**Date:** 2026-09-15  
**Status:** `READY_FOR_HUMAN_DECISION / NOT_CANON / NO_LANGUAGE_PROMOTION`  
**Workstream:** HNK Language Architecture & Canon Decision Room

## 1. Purpose

Consolidate the minimum reusable grammatical layer needed by Cycle 1 without making each Lesson rediscover HNK grammar independently. This dossier changes project architecture, not linguistic authority: `@hnk/linguas` remains the language owner, `@hnk/glyphs` remains structural G-ID authority, and `simpleway-hnk` remains the course/product consumer.

The immediate trigger is L03 Binah: its bounded `CONTROLLED_L03_DIRECT_QUESTION` contract is ready, but exact surface selection is blocked because direct L03 evidence for interrogative grammar is absent. Rather than selecting a Lesson-local surface by analogy, this dossier evaluates a transversal Grammar Core V1 from already governed evidence.

## 2. Non-negotiable boundaries

- No item in this dossier becomes canon merely by appearing here.
- Core-component eligibility is not automatic binding to every Lesson or construction.
- Newly authored or inferred components remain `CANDIDATE` until separate owner-side materialization/promotion.
- Course validation never upgrades language authority by itself.
- Reference languages and numerology may constrain comparison but cannot select HNK forms.
- G-ID is structural authority; visual HNK40 remains preproduction until separate visual-canon promotion.
- No question-to-declarative derivation by deleting `KE`, reordering tokens, or analogy.
- `SARU` is not equated to “usually”; the L03 HNK realization of “I usually…” remains unresolved/null.
- `PA` remains lexical “yesterday” in its governed evidence and is not generic past tense.
- Existing scoped `NE` behavior is not silently promoted to universal negation.

## 3. Evidence already present in the project

### 3.1 Interrogative operator candidate — `KE`

Existing governed sources include `AUTH-019` / `YES_NO_QUESTION_OPERATOR` and the grammar candidate record. Evidence supports clause-final `KE` in scoped L01/L02 questions, while the L03 recovery sweep found zero direct L03 interrogative hits. The safe interpretation is therefore: strong reusable component candidate, but not inherited L03 canon and not universal interrogative grammar.

**Recommended Core V1 classification:** `REUSABLE_COMPONENT_CANDIDATE / YES_NO_QUESTION_OPERATOR / CLAUSE_FINAL_CANDIDATE`.

### 3.2 First-person component — `AN`

`AN` has scoped first-person evidence in recovered/authoring material and is registered as a candidate core component. Evidence does not establish a complete HNK person/number paradigm.

**Recommended Core V1 classification:** `REUSABLE_COMPONENT_CANDIDATE / FIRST_PERSON_REFERENT`.

### 3.3 Second-person component — `EN`

`EN` has scoped second-person evidence, but subject-versus-possessive behavior remains unresolved outside governed constructions.

**Recommended Core V1 classification:** `REUSABLE_COMPONENT_CANDIDATE / SECOND_PERSON_REFERENT`, with `SUBJECT_VS_POSSESSIVE_UNRESOLVED` preserved.

### 3.4 Content-interrogative component — `KU`

The current authored registry exposes `KU` as `CONTENT_INTERROGATIVE_CORE`, while the compositional proposal explicitly forbids retroactively assigning it one fixed historical WH meaning.

**Recommended Core V1 classification:** `REUSABLE_COMPONENT_CANDIDATE / CONTENT_INTERROGATIVE_SELECTOR`, explicitly not synonymous with WHAT/WHERE/WHO as a universal lexical rule.

### 3.5 Locative content interrogative — `KUVAN`

The project already contains the closed-list proposal `KU + DOMAIN_FORMATIVE -> KU{DOMAIN}` with `KUVAN` as its first allowed locative application. That proposal is non-canonical and non-automatically productive.

**Recommended Core V1 classification:** `REUSABLE_SCOPED_COMPONENT_CANDIDATE / LOCATIVE_CONTENT_INTERROGATIVE`, with no global `VAN` productivity and no arbitrary `KU+X` generation.

## 4. Structural principles recommended for Core V1

### Predication

Keep predication **construction-specific** during Cycle 1. STR001 and STR002 already prove that controlled complete utterances/labels can exist without licensing a universal zero-subject, zero-copula, or bare-predicate grammar. Do not choose an overt universal copula or universal zero-copula yet.

### Negation

Keep `NE` limited to already governed scopes. L02 validates a scoped `PA + AN + NE + PREDICATE` frame, but explicitly states that the extension is STR005-only. Core V1 should record this as available governed evidence, not promote a universal negation system.

### Temporal expression

Prefer lexical/scoped temporal anchoring in Core V1. `PA` remains “yesterday” and does not create generic past tense or tense morphology. Tense/aspect architecture remains unresolved until evidence or a separate design decision justifies it.

## 5. Recommended package for the next human gate

| Component | Recommended decision | Authority effect if approved |
|---|---|---|
| `KE` | reusable yes/no interrogative component candidate, clause-final candidate position | no canon/promotion; owner materialization still required |
| `AN` | reusable first-person referent candidate | no full pronoun paradigm |
| `EN` | reusable second-person referent candidate | subject/possessive unresolved |
| `KU` | reusable content-interrogative selector candidate | no fixed universal WH gloss |
| `KUVAN` | reusable scoped locative interrogative candidate | closed-list only; no productive `KU+X` rule |
| Predication | construction-specific | no universal copula or zero-copula |
| `NE` | remain scoped to governed uses | no global negation promotion |
| Temporal | lexical/scoped first | `PA ≠ generic past`; no tense morphology |

## 6. Relationship to L03 Binah

The Lesson-local exact-surface-selection gate must be paused while this Core decision is unresolved. Pausing is not rejection and does not fill any of its four surface fields. After a Core V1 decision and separate owner materialization, Binah may resume and bind only the components explicitly licensed for its bounded `CONTROLLED_L03_DIRECT_QUESTION` construction.

No Core decision automatically authors or validates OPI, unlocks QA, changes STR003–STR005, or activates runtime.

## 7. Relationship to HNK3000

The merged HNK3000 workstream is a **parallel lexical/semantic expansion lane**. Its large candidate inventory must not be mistaken for Cycle 1 grammar or automatic curriculum binding. Grammar Core V1 governs reusable grammatical components; HNK3000 expands lexical candidate coverage. Cross-use requires explicit reviewed binding.

The separately pending parent-lexeme integration gate for `DARUNO` / `NELARA` is likewise independent. This dossier neither approves nor consumes that gate.

## 8. Recommended governance simplification

For future high-value language decisions, prefer:

1. Evidence/Design Dossier;
2. Human Decision Gate;
3. Candidate Materialization in the owning registry;
4. Validation/Promotion Gate.

Split into additional gates only where evidence conflict, authority risk, or destructive technical integration warrants it.

## 9. Current decision boundary

The strategy pivot itself has been approved by the creator. The linguistic package above has **not** been approved by that same action. It now requires a fresh explicit human decision in `SWHNK-HNK-GRAMMAR-CORE-V1-HUMAN-BATCH-V1`.

Until then:

- `KE/AN/EN/KU/KUVAN` receive no new authority;
- no new surface form is created;
- no Cycle 1 binding changes;
- L03 exact surface selection remains unfilled;
- all existing curriculum counts remain unchanged.
