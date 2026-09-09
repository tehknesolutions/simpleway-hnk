# HNK Phonotactic Profile V1 — Observed, Not Canon

**Profile ID:** `SWHNK-HNK-PHONOTACTIC-PROFILE-V1`  
**State:** `OBSERVED_PROFILE / NOT_CANON`  
**Corpus:** current 33-form recovered Master Lexicon snapshot

## 1. Purpose

This profile records distributional facts from the recovered lexicon so newly authored candidates can avoid sounding unrelated to the existing language. It does **not** retroactively impose a phonotactic law on historical forms.

## 2. Primary observation

Using the current safe transliteration tokenization (`TS` treated as one consonantal unit):

- total registry forms observed: **33**;
- forms matching a strict alternating pattern `(CV)+(C)?`: **30**;
- exceptions: **3**.

The three exceptions are not ordinary stable native evidence:

| Form | Pattern | Authority context |
|---|---|---|
| `KALIFORNIA` | non-alternating | `BRIDGE` proper-name adaptation |
| `ON` | `VC` | `GATE` |
| `BANKA` | `CVCCV` | `GATE` |

This makes CV alternation a strong **design prior** for new native candidates, while not proving it is an absolute canonical rule.

## 3. Observed shape distribution

Across the 33 forms, safe-token patterns include:

- `CVCVCVCV`: 12 forms;
- `CVCV`: 10 forms;
- `CVCVCVC`: 4 forms;
- `CV`: 2 ordinary occurrences plus one `VC` exception;
- longer alternating forms also occur;
- final consonants occur in recovered forms such as `VALIVAN`, `PAROVAN`, `SAROSAL` and `HENUVOKODAN`.

Observed token lengths are concentrated at:

- 4 tokens: 10 forms;
- 8 tokens: 12 forms;
- 7 tokens: 4 forms;
- other lengths are less frequent.

## 4. Provisional authoring recommendation

For **new CANDIDATE native lexemes**, until a stronger phonotactic source is recovered or explicitly approved:

1. prefer syllable-like `CV` sequencing;
2. permit an optional final consonant only when it improves distinction or aligns with an approved morphological rationale;
3. avoid initial vowel forms as the default;
4. avoid internal consonant clusters as the default;
5. avoid vowel hiatus as the default;
6. treat `TS` as one consonantal phoneme when used;
7. treat BRIDGE/loan forms separately from native candidate formation;
8. do not use GATE exceptions as templates for new stable vocabulary.

This recommendation is an authoring prior, **not yet a language law**.

## 5. Transliteration boundary

The authoritative HNK40 runtime contains 40 phoneme IDs, but the current safe transliteration map exposes only explicitly mapped units. Therefore:

- a candidate may be composed in authoritative `G01–G40` IDs;
- if every G-ID has an approved safe transliteration unit, a text transliteration may be generated and round-tripped;
- if any selected G-ID lacks a governed romanization, the candidate's transliteration remains `null` until that mapping is separately approved;
- never invent Latin letters for unmapped G-IDs.

## 6. Candidate quality checks

Before any candidate proceeds to human review:

- shape must be compared against this observed profile;
- exact and near-form collisions must be checked against the Master Lexicon;
- confusion risk with WATCH/GATE forms must be recorded;
- IPA must come from authoritative G-IDs;
- semantic rationale must be independent of sound symbolism unless such symbolism is explicitly authored as a rule.

## 7. Next research layer

The lexicon also shows recurring families such as `VAMA-`, `PARA-`, `VALI-` and `SAR-`. Those repetitions may encode morphology or may be historical lexical clustering. They must be analyzed as **morphological hypotheses** before any new word is derived from them.
