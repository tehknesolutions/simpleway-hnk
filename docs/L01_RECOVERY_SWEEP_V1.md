# SWHNK — L01 Recovery Sweep V1

**Date:** 2026-09-09  
**Lesson:** `HNK-L01 / Kether`  
**Historical source version:** `1.0.0 / PUBLICATION-FROZEN`  
**Decision:** `ORIGINAL_RAW_PAYLOAD_NOT_RECOVERED / GOVERNED_V1_1_AUTHORING_OPEN`

## 1. What was recovered

The recovery sweep confirmed:

- recovered Dart release loader/validator;
- recovered HENUVOKODAN Lesson 1 web shell;
- historical status `PUBLICATION-FROZEN`;
- exact invariant of 10 OPI cards;
- exact invariant of 72 teacher drills;
- exact order of the 10 English OPI prompts;
- WATCH set `SARASALA`, `VAMAVALA`, `VAMAZAMU`;
- references proving the historical product expected `data/lesson1-data.js` and `lesson1.release.v1.json`.

## 2. What was not recovered

After filename and content-oriented search, the following original payload files were not recovered:

- `lesson1.release.v1.json`;
- `data/lesson1-data.js`;
- `hnk-runtime.js`;
- `app.js`;
- `styles.css`;
- `manifest.webmanifest`.

The absence of those files does not invalidate the historical v1.0 release. It prevents us from claiming that the original 10 HNK cards and 72 drills have been source-recovered.

## 3. Governance decision

The historical v1.0 remains immutable evidence. We do **not** reconstruct it from memory, plausible translation, numerology or lexical similarity.

A new line is opened instead:

`HNK-L01 / 1.1.0-authoring / AUTHORING_QUEUE`

This line inherits only source-confirmed structure:

- the 10 frozen English OPI prompts and their order;
- the 10-card target;
- the 72-Activation target.

All new HNK language fields begin as `null` / `UNBOUND_AUTHORING`.

## 4. Current L01 language snapshot

Source: `tehknesolutions/codex-hnk/packages/hnk-linguas/src/index.mjs`.

- 9 lexemes bound to L01;
- 5 `FROZEN`;
- 3 `WATCH`;
- 1 `REFERENCE`;
- 7 recovered phrases;
- 3 phrases with approximate recovered gloss;
- 4 phrases whose exact gloss remains `null`.

The snapshot is stored at:

`curriculum/cycle-01/L01-kether/authoring/lexicon.bindings.snapshot.json`

## 5. Authoring queue

The governed queue is stored at:

`curriculum/cycle-01/L01-kether/authoring/lesson.authoring.v1.1.json`

Rules:

1. HNK remains `null` until explicitly bound.
2. WATCH lexemes require explicit WATCH labeling in pedagogical use.
3. `HENUVOKODAN` remains `REFERENCE`, not an ordinary frozen vocabulary item.
4. New HNK forms require language governance before course promotion.
5. Gliffs must be generated from authoritative G-IDs, not copied as visual assumptions.
6. v1.0 history must never be overwritten by v1.1 authorship.

## 6. Next gate

`SWHNK-L01-BINDING-PASS-V1`

Goal: map each of the 10 OPI semantic requirements against recovered lexemes/phrases and classify every required linguistic unit as one of:

- `RECOVERED_FROZEN`;
- `RECOVERED_WATCH`;
- `RECOVERED_REFERENCE`;
- `RECOVERED_PHRASE_APPROXIMATE`;
- `MISSING_AUTHORING_REQUIRED`.

No new lexical form is created during that pass. It is a coverage map, not a word-generation phase.
