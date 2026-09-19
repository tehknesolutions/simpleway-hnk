# HNK A1 Alpha 0.2.0 — Preview Freeze Gate V1

Status: **PASS — FROZEN_HUMAN_QA_BASELINE / READY_FOR_P01-P07**

This gate freezes the runtime used by the initial Human QA cohort. It does not promote HNK linguistic content to CANON and does not constitute external CEFR certification.

## Runtime identity

- app: `HNK-A1-APP-ALPHA-0.2.0`
- language: `HNK-A1-RC1-CANDIDATE`
- acquisition engine: `HNK-A1-ACQUISITION-ENGINE-V1`
- runtime baseline commit: `7fa140e6aaaec0484e1be4911d6d606b46e8ff5f`
- freeze-validation packaging commit: `9946b2b98c85b482b9e24b39f7c50c64eb8fc3b3`
- Railway validation deployment: `3e1c8590-4780-45cd-951b-89f59693435b`
- validation URL: `https://hnk-a1-alpha-020-freeze-production.up.railway.app`

## Evidence

### Repository validator lane

Executed against the exact runtime baseline:

- Sprint 1 playable core — PASS
- Sprint 2 construction forge — PASS
- Sprint 3 grammar dungeon — PASS
- Sprint 4 open world — PASS
- Sprint 5 final boss — PASS
- Acquisition Engine — PASS
- Human QA analyzer — PASS

Result: **7/7 PASS**.

### Release/build contract

A separate release/build invariant pass completed **15/15 PASS**, covering app/language/acquisition versions, 32 playable levels, acquisition wiring, session runtime lock/reset, build output and static deployment contract.

### Published deployment

Railway deployment `3e1c8590-4780-45cd-951b-89f59693435b` settled as **SUCCESS** on packaging commit `9946b2b98c85b482b9e24b39f7c50c64eb8fc3b3`.

Healthcheck `GET /` succeeded.

Container inspection confirmed the actual deployed artifact contains:

- `/app/dist/a1/release.json`;
- `/app/dist/a1/index.html`;
- `/app/dist/a1/web/app.mjs`;
- `/app/dist/a1/web/styles.css`;
- all eight approved World 1 WebP assets.

The deployed application source contains the required Alpha 0.2.0 markers: `buildCodexCueTray`, `HELP_BLOCKED_RECALL_REQUIRED`, `SPACED_REVIEW_COMPLETE`, and `adaptiveBossProfile`.

### Interaction smoke

The actual published `app.mjs` and matching runtime modules were executed through a headless DOM/localStorage/event harness.

Result: **24/24 PASS**, including:

- Human QA start and session-version lock;
- anonymous telemetry event creation;
- recall-before-help;
- deterministic choice presentation;
- hint unlock after recall;
- Level 01 completion;
- spaced-review scheduling, entry and return;
- no XP duplication during review;
- Codex blocked before recall;
- partial Codex cues after recall;
- adaptive Final Boss;
- Level 32 completion;
- Human QA JSON export;
- `SINGLE_RUNTIME` eligibility;
- acquisition data in exported telemetry;
- 32/32 completion in export.

## Visual-browser limitation

A separate full Chromium visual inspection could not be executed because the authorized Desktop Commander device was offline and the available external fetch/browser lanes reject the Railway service domain. This limitation was not hidden or treated as a visual PASS.

The freeze decision is based on executable runtime validators, the deployed container, successful Railway healthcheck, and the 24/24 interaction-level DOM smoke. A later visual QA can still identify presentation defects; any blocking runtime-code defect requires a new app-version baseline.

## Governance boundary

This freeze changes **zero** HNK lexemes, G-IDs, grammatical constructions, linguistic authorities, or CANON status.

From this gate forward, a runtime-code change pauses P01–P07 and requires a new versioned baseline. Documentation-only changes do not invalidate already generated `SINGLE_RUNTIME` sessions.

## Decision

```
HNK-A1-APP-ALPHA-0.2.0
HNK-A1-RC1-CANDIDATE
FROZEN_HUMAN_QA_BASELINE
SINGLE_RUNTIME
READY_FOR_P01-P07
CANON_PROMOTION = FALSE
```


## Final publication fingerprint

After the freeze metadata was merged, the frozen baseline was repackaged without runtime-code changes and published again.

- freeze metadata main commit: `b0a137941bf46b1790ff664860242cac65a4584e`;
- final deployment artifact: `2449c6078da5153a29d619cbaa1fc920a873288f`;
- final Railway deployment: `5eaa7e95-8ddd-4531-8972-d9269f027391`;
- final URL: `https://hnk-a1-alpha-020-freeze-production.up.railway.app`;
- deployment status: **SUCCESS**;
- healthcheck: **PASS**;
- served release manifest: **FROZEN_HUMAN_QA_BASELINE / READY_FOR_P01-P07**;
- runtime baseline remains `7fa140e6aaaec0484e1be4911d6d606b46e8ff5f`.

This publication step changed packaging/freeze metadata only; the validated application/core runtime remains the frozen runtime baseline.
