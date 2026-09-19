# HNK A1 Alpha 0.2.1 — Preview Freeze Gate V2

Status: **PASS — FROZEN_HUMAN_QA_BASELINE / READY_FOR_P01-P07**

## Why V2 exists

Alpha 0.2.0 could export Human QA only after Level 32. That created a collection bias: participants who stopped or failed early might never produce an export, contaminating completion and Final Boss metrics.

Alpha 0.2.1 fixes only QA instrumentation by adding persistent partial-session export.

## Runtime identity

- app: `HNK-A1-APP-ALPHA-0.2.1`
- language: `HNK-A1-RC1-CANDIDATE`
- acquisition engine: `HNK-A1-ACQUISITION-ENGINE-V1`
- runtime baseline commit: `a0b0e5382a92b817b9afe1250dfa87bbadd2dac6`
- preview packaging commit: `807ddba0426a8655c11ac5f9fb7321776f420080`
- Railway preview deployment: `e1c6e58c-7bfa-459a-ac04-dea729cd6599`
- preview URL: `https://hnk-a1-alpha-021-preview-production.up.railway.app`

## Evidence

- A1 validator lane: **7/7 PASS**
- partial-session export contract: **8/8 PASS**
- source headless DOM interaction smoke: **23/23 PASS**
- published `dist/a1` interaction smoke: **23/23 PASS**
- Railway deployment: **SUCCESS**
- exact deployment healthcheck: **PASS**
- actual deployed container release/app markers: **PASS**
- persistent partial-session export: **PASS**
- partial export remains `ACTIVE` + `SINGLE_RUNTIME`: **PASS**
- HNK lexeme/G-ID/grammar/construction/CANON changes: **0**

## Visual-browser limitation

A full external Chromium visual inspection is still not claimed as PASS because the authorized Desktop Commander device is offline and the available external browser/fetch lanes reject the Railway domain. This is recorded as a presentation-QA limitation, not hidden.

## Governance boundary

This freeze changes no HNK linguistic authority. Any runtime-code change after this point pauses P01–P07 and requires a new app-version baseline.

## Decision

```
HNK-A1-APP-ALPHA-0.2.1
HNK-A1-RC1-CANDIDATE
FROZEN_HUMAN_QA_BASELINE
SINGLE_RUNTIME
READY_FOR_P01-P07
CANON_PROMOTION = FALSE
```


## Final cohort publication fingerprint

- freeze metadata main commit: `8cfa05e2591cba43b2364a0289cb3ce72ddd9728`;
- final packaging commit: `b81004d7716927afe11b100e33cd5ecb703a579f`;
- final Railway deployment: `8639272c-cdaf-46ce-b843-5cb7676f8cae`;
- final cohort URL: `https://hnk-a1-alpha-021-freeze-production.up.railway.app`;
- exact deployment status: **SUCCESS**;
- healthcheck: **PASS**;
- served `release.json`: **FROZEN_HUMAN_QA_BASELINE / READY_FOR_P01-P07**;
- preview → final runtime parity: **10 app/core/style blobs checked, 0 differences**.

Railway labels the exact-SHA deployment branch as `main` in deployment metadata despite the service source configuration. This is recorded as a provider metadata quirk. The accepted fingerprint is the exact final artifact SHA + deployment ID + verified served container contents.
