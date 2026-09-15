# HNK Phonotactic Profile V1 — Historical Prior

**Profile ID:** `SWHNK-HNK-PHONOTACTIC-PROFILE-V1`  
**State:** `HISTORICAL_PRIOR / SUPERSEDED_BY_V2`  
**Superseded by:** `SWHNK-HNK-PHONOTACTIC-PROFILE-V2` via approved gate `SWHNK-HNK-B6-PHONOTACTIC-PROFILE-V2-HUMAN-GATE-V1`  
**Corpus:** current 33-form recovered Master Lexicon snapshot  
**Historical note:** retained for provenance; not current phonotactic authority.

## 1. Purpose

This profile records the earlier distributional analysis used before B1–B6. It is preserved as historical provenance and must not override the current governed V2 profile.

## 2. Historical primary observation

Using the then-current safe transliteration tokenization (`TS` treated as one consonantal unit):

- total registry forms observed: **33**;
- forms calculated as matching a strict alternating pattern `(CV)+(C)?`: **30**;
- exceptions under that orthography-sensitive calculation: **3**.

The three exceptions listed at the time were:

| Form | Pattern | Authority context |
|---|---|---|
| `KALIFORNIA` | non-alternating | `BRIDGE` proper-name adaptation |
| `ON` | `VC` | `GATE` |
| `BANKA` | `CVCCV` | `GATE` |

This calculation is now known to have been orthography-sensitive because it treated romanized `Y` as consonant-like. Under authoritative G-ID/IPA classes, current V2 uses **26/33** strict `(CV)+(C)?` matches and recognizes FROZEN Y-bearing vowel-sequence exceptions.

## 3. Historical shape distribution

Across the 33 forms, safe-token patterns included:

- `CVCVCVCV`: 12 forms;
- `CVCV`: 10 forms;
- `CVCVCVC`: 4 forms;
- `CV`: 2 ordinary occurrences plus one `VC` exception;
- longer alternating forms also occur;
- final consonants occur in recovered forms such as `VALIVAN`, `PAROVAN`, `SAROSAL` and `HENUVOKODAN`.

Observed token lengths were concentrated at:

- 4 tokens: 10 forms;
- 8 tokens: 12 forms;
- 7 tokens: 4 forms;
- other lengths are less frequent.

## 4. Historical authoring recommendation

The earlier profile recommended for new native candidates:

1. prefer syllable-like `CV` sequencing;
2. permit an optional final consonant only when it improves distinction or aligns with an approved morphological rationale;
3. avoid initial vowel forms as the default;
4. avoid internal consonant clusters as the default;
5. avoid vowel hiatus as the default;
6. treat `TS` as one consonantal phoneme when used;
7. treat BRIDGE/loan forms separately from native candidate formation;
8. do not use GATE exceptions as templates for new stable vocabulary.

These are no longer current rules. V2 supersedes the avoid-hiatus recommendation, treats `CV` only as a statistical authoring preference, and evaluates initial-vowel/internal-cluster shapes case-by-case.

## 5. Transliteration boundary retained historically

The authoritative HNK40 runtime contains 40 phoneme IDs, but the safe transliteration map exposes only explicitly mapped units. Therefore:

- a candidate may be composed in authoritative `G01–G40` IDs;
- if every G-ID has an approved safe transliteration unit, a text transliteration may be generated and round-tripped;
- if any selected G-ID lacks a governed romanization, the candidate's transliteration remains unresolved until that mapping is separately approved;
- never invent Latin letters for unmapped G-IDs.

B5 later formalized this as **20/40 governed human mappings + 40/40 lossless G-ID fallback**.

## 6. Candidate quality checks retained where compatible

The following remain useful under V2:

- exact and near-form collision checks;
- confusion-risk review with WATCH/GATE forms;
- IPA from authoritative G-IDs;
- semantic rationale independent of sound symbolism unless separately governed;
- TS/G30 atomic treatment;
- BRIDGE/loan separation.

## 7. Historical morphology note

The lexicon shows recurring families such as `VAMA-`, `PARA-`, `VALI-` and `SAR-`. Those repetitions remain morphological hypotheses only until separately governed. B6 did not promote any morphology.
