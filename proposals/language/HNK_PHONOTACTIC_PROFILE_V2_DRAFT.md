# HNK Phonotactic Profile V2 — Draft for B6

**Profile ID:** `SWHNK-HNK-PHONOTACTIC-PROFILE-V2-DRAFT`  
**State:** `DRAFT_AWAITING_B6_HUMAN_APPROVAL`  
**Provenance:** Sprint A audit + approved Sprint B gates B1–B5  
**Scope:** phonotactic/authoring profile only; does not create semantics, morphology, grammar or curriculum authority.

## 1. Purpose

V2 replaces the orthography-sensitive assumptions of V1 with a layered model that distinguishes:

1. **CORPUS FACTS** — what stable/recovered material actually shows;
2. **GOVERNED PHONOLOGICAL RULES** — decisions explicitly approved in B1–B5;
3. **AUTHORING PREFERENCES** — optional style priors for future candidates, never historical laws.

`SUPPORTED != PRODUCTIVE`, and an authoring preference is not a phonological prohibition.

## 2. Segmental authority

The authoritative segmental system is the 40 G-IDs plus IPA values in `@hnk/glyphs`.

Critical B1 distinction:

- `G40 = /y/`, class `VOWEL`, safe romanization `Y`;
- `G16 = /j/`, glide/consonantal approximant, human-facing safe romanization unresolved;
- `G40 /y/ != G16 /j/`.

No word-level rule may silently reinterpret `Y` as `/j/`.

## 3. Corpus facts from the 33-form audited lexicon

When classified by authoritative phoneme classes rather than orthographic token shape:

- total audited forms: **33**;
- strict `(CV)+(C)?` matches: **26/33**;
- strict-profile exceptions: **7/33**.

Audited exceptions:

- `SARADAYA` — `CVCVCVVV` — FROZEN;
- `TAYOVAN` — `CVVVCVC` — FROZEN;
- `DAYI` — `CVVV` — CANDIDATE;
- `VAMATAYA` — `CVCVCVVV` — CANDIDATE;
- `KALIFORNIA` — non-simple native shape — BRIDGE;
- `ON` — `VC` — GATE;
- `BANKA` — `CVCCV` — GATE.

Stable FROZEN evidence therefore proves that native HNK material may contain adjacent vowel phonemes, including `VVV` sequences.

`TS` remains one atomic consonantal phoneme (`G30 /ts/`).

Final consonants are attested in recovered forms and are not prohibited.

## 4. Governed word-level phonology from B1–B4

### B1 — segment identity

`G40 /y/` is a vowel and remains distinct from `G16 /j/`.

### B2 — adjacent vowels

HNK lexical forms may contain adjacent vowel phonemes, including `VVV` sequences.

A blanket ban on hiatus/adjacent vowels is not a canonical rule.

### B3 — careful pronunciation default

For careful pronunciation planning, adjacent vowel phonemes remain distinct vowel nuclei by default unless a later explicit sequence-specific or word-specific rule licenses another realization.

There is no automatic `G40 /y/ -> G16 /j/` glide formation.

No general productive diphthong inventory has been approved.

Fast-speech smoothing, coalescence and other allophony remain unresolved.

### B4 — stress architecture

HNK has no universal default stress rule at this stage.

Lexical stress is explicitly word-level when governed.

Forms without an approved stress value may use broad unstressed/syllabic notation, but must not be presented as having a complete canonical stressed pronunciation.

Example: `DAYI` may be represented broadly as `/da.y.i/`; its lexical stress remains unresolved.

## 5. Romanization architecture from B5

- human-facing governed safe romanization: **20/40**;
- lossless G-ID coverage: **40/40**;
- existing 20 mappings remain unchanged;
- unmapped G-IDs remain represented by G-ID until a separate orthography/extended-romanization gate approves a human-facing form;
- romanization is subordinate to G-ID + IPA authority and must not redefine phonemes.

## 6. V2 authoring preferences — not language laws

For new native `CANDIDATE` forms, the following are optional conservative priors rather than prohibitions:

1. prefer relatively simple, learnable segment sequences when semantic and collision constraints allow;
2. `CV`-rich shapes remain a useful statistical family because 26/33 audited forms fit strict `(CV)+(C)?`, but new forms are **not required** to obey it;
3. final consonants are allowed;
4. adjacent vowels, including `VVV`, are allowed and must not be rejected merely for being hiatus-like;
5. initial-vowel and internal-cluster shapes should be evaluated case-by-case rather than categorically banned;
6. `TS` counts as atomic `G30`, not as a two-consonant cluster;
7. BRIDGE/loan forms remain analytically separate from native candidate design;
8. GATE forms must not become productive templates merely because they exist;
9. every candidate must use G-ID/IPA authority first, with human-facing romanization only where governed;
10. exact and near-form collision checks remain mandatory.

## 7. Explicit non-rules

V2 does **not** establish:

- mandatory CV alternation;
- a ban on vowel hiatus;
- a productive diphthong inventory;
- automatic glide formation;
- a universal stress position;
- a complete syllable-template grammar;
- automatic allophony or connected-speech rules;
- productive morphology;
- semantic sound symbolism;
- universal grammar or word order.

## 8. Relationship to V1

Upon B6 approval:

- `HNK_PHONOTACTIC_PROFILE_V1.md` becomes `HISTORICAL_PRIOR`;
- V1's `30/33` value is retained only as an orthography-sensitive historical calculation;
- V2's authoritative audit-facing value is `26/33` strict `(CV)+(C)?` matches under G-ID/IPA phoneme classes;
- V1's recommendation to avoid vowel hiatus is superseded;
- V1's useful collision, G-ID-first, TS-atomic and bridge-separation principles are retained where compatible with B1–B5.

## 9. Governance boundary

B6 approval of this profile would govern the **profile itself**. It would not:

- assign stress to individual words;
- assign any of the 20 unresolved romanization units;
- alter G-ID/IPA values;
- promote morphology;
- change DAYI semantics;
- alter grammar/productivity;
- change L03 curriculum state.
