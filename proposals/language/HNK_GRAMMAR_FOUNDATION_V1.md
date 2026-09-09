# HNK Grammar Foundation V1 — Proposal

**Proposal ID:** `SWHNK-HNK-GRAMMAR-FOUNDATION-V1`  
**State:** `DESIGN_PROPOSAL / NOT_CANON`  
**Purpose:** establish the minimum grammatical architecture required to complete SimpleWay HNK Lesson 1 without pretending that unrecovered grammar is historical canon.

## 1. Authority boundary

This document is a course-driven language-design proposal. It does not replace `@hnk/linguas` and does not alter recovered phrases.

Known evidence:

- 33 recovered lexical forms in the current Master Lexicon;
- 7 recovered L01 phrases;
- `PHR-001`, `PHR-002`, `PHR-003` have `APPROXIMATE` recovered glosses;
- `PHR-004`–`PHR-007` have unrecovered exact glosses;
- no source-backed token-level grammatical analysis for those phrases is currently recovered;
- HNK40 provides authoritative G01–G40 phoneme IDs;
- the safe transliteration parser currently exposes only explicitly mapped text units;
- Rosetta 1.1 supplies structural nodes for roots, modifiers, joins, sequences, syllables, words and sigils, but does not assign lexical semantics to glyph roots.

Therefore this proposal separates **evidence** from **new authorship**.

## 2. Design principles

1. **Meaning before form.** Define grammatical function before assigning any HNK form.
2. **Analytic-first for Cycle 1.** Prefer independently teachable words/particles in the beginner course unless a recovered or explicitly approved morphological rule justifies fusion.
3. **One function, one initial teaching target.** Avoid unnecessary synonymy in Cycle 1.
4. **No hidden irregularity.** New v1.1 grammar should be deterministic and explainable.
5. **Recovered phrases remain evidence, not token dictionaries.** Do not reverse-engineer a token meaning only because it occurs in an approximate translation.
6. **G-ID first.** New forms are defined by authoritative glyph IDs; transliteration is secondary and must round-trip safely.
7. **Candidate first.** Newly authored grammatical forms begin as `CANDIDATE`, never `FROZEN`.
8. **Pedagogy does not override language governance.** A course need can open a requirement, not manufacture canon silently.

## 3. Minimum grammar needed by Lesson 1

### 3.1 Person system

Required teaching functions:

| Function | State | Form |
|---|---|---|
| first-person singular | evidence exists in recovered phrases, token analysis unresolved | `null` |
| second-person singular | evidence exists in recovered phrases, token analysis unresolved | `null` |
| third-person | not required for core L01 OPI | `null` |

Decision: do not assign `AN` or `EN` as pronouns canonically until a token-level source or explicit new-version grammar decision is approved.

### 3.2 Interrogative system

Required functions:

- yes/no question;
- WHAT / content question;
- WHERE;
- WHO-person;
- AGE construction;
- NAME construction.

Current evidence:

- `PHR-001` approximates a name question;
- `PHR-003` approximates a yes/no language-use question;
- there is no recovered token-level analysis sufficient to declare any individual token a general interrogative marker.

Design requirement: choose one deterministic interrogative architecture before authoring individual question words.

### 3.3 Predication and copula

L01 needs to express:

- identity/name;
- age/state;
- location/origin;
- activity/work/study;
- preference;
- habitual/leisure activity.

Open design decision: determine whether HNK uses an overt copula, zero copula, or construction-specific predication in beginner statements. No value is assumed here.

### 3.4 Generic action / light verb

L01 OPI 6 and 10 require English `do` semantics. Before authoring a lexical equivalent, decide whether HNK realizes this as:

1. a normal lexical verb;
2. a light verb used with activity nouns;
3. zero/light construction;
4. another explicitly governed strategy.

`VALI` means work/to work and is not automatically a generic DO verb.

### 3.5 Possession

L01 requires possession in at least:

- nickname;
- hobbies;
- potentially name/identity answer patterns.

Open design decision: possessive relation may be particle, pronoun form, juxtaposition, affix, or another governed construction. No form is assigned yet.

### 3.6 Comitative

L01 OPI 7 requires `with whom` / companionship.

Open design decision: choose whether comitative is:

- free particle;
- adposition;
- affix/case-like marker;
- serial/relational construction.

The lexical requirement `COMITATIVE_WITH` remains form-null until this is decided.

### 3.7 Temporal expression

L01 requires weekend/habitual framing. Existing support:

- `SARASALA` WATCH = time/duration;
- `VAMUSARO` FROZEN = rest/leisure period.

`WEEKEND` may later become a compound only if an approved compositional rule supports it. Similarity to existing words is not sufficient evidence.

## 4. Proposed beginner typology for new authorship

The following are **design defaults for evaluation**, not canon:

- default clause order: `UNDECIDED`;
- question marker position: `UNDECIDED`;
- negation position: `UNDECIDED`;
- copula: `UNDECIDED`;
- possession strategy: `UNDECIDED`;
- comitative strategy: `UNDECIDED`;
- tense marking: `UNDECIDED`;
- aspect marking: `UNDECIDED`;
- number marking: `UNDECIDED`;
- adjective/noun ordering: `UNDECIDED`.

No downstream form may depend on one of these values until it is explicitly decided in a versioned grammar decision.

## 5. Lesson 1 authoring order

To minimize rework, author in this order:

1. resolve the person system;
2. resolve basic clause/predication strategy;
3. resolve interrogative architecture;
4. resolve possession;
5. resolve generic action/light verb;
6. resolve comitative;
7. author semantic primitives `AGE` and `LIVE_RESIDE`;
8. decide `WEEKEND` formation;
9. build the ten OPI question patterns;
10. build personal answer patterns;
11. generate the 72 Activation drills from approved structures;
12. bind glyph IDs and derive IPA/transliteration through authoritative runtimes.

## 6. Promotion gate

This proposal becomes eligible for canonical language implementation only when:

- every grammatical choice used by L01 has an explicit decision record;
- no token meaning is inferred solely from approximate legacy phrases;
- newly authored forms follow `HNK-LEXEME-AUTHORING-CONTRACT-V1`;
- proposed cross-lesson rebindings are separately reviewed;
- all candidate forms pass collision and phonological validation;
- a human approval explicitly promotes the selected design.

Until then the state remains `DESIGN_PROPOSAL / NOT_CANON`.
