# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V8`  
**Date:** 2026-09-09  
**Package:** `simpleway-hnk@0.9.0`

## Progress model

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

Historical evidence and current reproducible implementation are separate. `AUTHORED` does not imply semantic validation or publication readiness.

## Current dashboard

Cycle 1 target: **1,008 pedagogical slots**.

- `AUTHORED`: **9 / 1,008 = 0.8929%**
- `VALIDATED`: **0 / 1,008**
- current reproducible `FROZEN`: **0 / 1,008**
- historical `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**

Language assets:

- recovered Cycle 1 forms: **31 / 144 = 21.5278% proxy**
- governed authored candidates: **2** — `KUVAN`, `VALA`
- governed unique language assets: **33 / 144 = 22.9167% proxy**
- recovered phrases: **7**

These are language-asset proxies, not completed vocabulary slots.

## Lesson 1 OPI

- L01 OPI authorship: **9 / 10 = 90%**
- Cycle 1 OPI authorship: **9 / 70 = 12.8571%**
- L01 total-slot authorship: **9 / 155 = 5.8065%**

| OPI | Current HNK design | State |
|---:|---|---|
| 01 | `KALA YA EN ES KU KE` | AUTHORED · recovered phrase / semantic HOLD |
| 02 | `EN VAMAKALA KE` | AUTHORED · FROZEN core / grammar HOLD |
| 03 | `EN KU SARASALA KE` | AUTHORED · WATCH / contextual age HOLD |
| 04 | `EN SARADAYA KUVAN KE` | AUTHORED · KUVAN CANDIDATE HOLD |
| 05 | `EN VALI KUVAN KE` | AUTHORED · VALI rebind + KUVAN HOLD |
| 06 | `EN KU VALA KE` | AUTHORED · VALA CANDIDATE / contextual activity HOLD |
| 07 | — | **MISSING · residence + WHO + WITH** |
| 08 | `EN KU VAMAVALA KE` | AUTHORED · WATCH / inferred KU HOLD |
| 09 | `EN VAME VAMAZAMU KE` | AUTHORED · GATE + WATCH experimental HOLD |
| 10 | context `VAMUSARO` + `EN KU VALA KE` | AUTHORED · approximate contextual leisure-period HOLD |

No OPI is yet fully `VALIDATED`.

## OPI 10 boundary

The frozen English prompt remains `What do you do on weekends?`.

HNK v1.1 does **not** claim `VAMUSARO = weekend`. Instead:

- `VAMUSARO` retains its recovered FROZEN meaning `rest / leisure period`;
- it is used as a separate discourse/UI context label;
- the question remains `EN KU VALA KE`;
- the semantic reframe is approximately `In your rest/leisure period: what is your activity?`;
- exact HNK `weekend` remains unrecovered/unauthored.

Therefore OPI 10 is `AUTHORED`, but its semantic fidelity remains HOLD.

## The final missing OPI — OPI 07

`Where do you live and who do you live with?`

Three unresolved components remain:

1. `LIVE_RESIDE_OR_EQUIVALENT`
2. `WHO_PERSON_INTERROGATIVE`
3. `COMITATIVE_WITH`

Available evidence is insufficient:

- `KUVAN` can support the locative interrogative dimension, but not the live/reside predicate;
- `VANI` is a recovered WATCH form with exact gloss `null`; it must **not** be assigned `live/reside` by morphological plausibility alone;
- `ON` is a GATE pronoun/referent form and must not be converted into WHO;
- current compositional governance explicitly does not license `KU + ON` as WHO;
- no recovered comitative/WITH relation has been found.

The correct state is therefore one explicit hard gap rather than false 10/10 completion.

## Authored language registry

Canonical owner: `@hnk/linguas/authored`.

- `AUTH-001 KUVAN` — locative interrogative specialization, `CANDIDATE`, not recovered.
- `AUTH-002 VALA` — generic activity nominal head, `CANDIDATE`, not recovered.

The recovered-form count remains 31.

## Historical L01 evidence

Recovered v1.0 proves:

- 10 OPI;
- 72 teacher drills;
- HNK question/answer/glyph/segment fields in the release model.

The raw payload is still missing, so those 82 historical frozen-evidence slots are not counted as current `FROZEN` implementation.

## Commands

```bash
npm run progress
npm run progress:write
npm run validate:progress
npm run validate:l01-opi001
npm run validate:interrogatives
npm test
```

GitHub Actions has previously failed before executing steps, so versioned tests must not be described as remotely green without an observed successful runner execution.

## Rule

No authored form is mislabeled as recovered; no WATCH/CANDIDATE/GATE item is silently promoted; unknown meanings stay unknown until source recovery or explicit governed authorship.
