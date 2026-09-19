# HNK A1 Alpha 0.2.1 — Execution Gate V2

Status: **CODE_GREEN / PREVIEW_BLOCKED / P01–P07 HOLD**

This checkpoint exists because the P01–P07 launch audit found a methodological blocker in Alpha 0.2.0: Human QA export was reachable only after Level 32. A participant who stopped or failed before the Final Boss could not return an export, biasing completion and Boss-defeat metrics toward successful finishers.

## Scope of the fix

Alpha 0.2.1 changes the QA shell only:

- adds a persistent **Exportar sessão** action during every active level;
- exports the current anonymous session without marking it complete;
- records `SESSION_EXPORT_REQUESTED`;
- preserves `SINGLE_RUNTIME` integrity for partial exports;
- keeps the automatic Level 32 export;
- changes no HNK lexeme, G-ID, construction, grammar authority or CANON status.

## Validation

Repository-loaded A1 validator lane:

- Sprint 1 playable core — PASS
- Sprint 2 construction forge — PASS
- Sprint 3 grammar dungeon — PASS
- Sprint 4 open world — PASS
- Sprint 5 final boss — PASS
- Acquisition Engine — PASS
- Human QA analyzer — PASS

Result: **7/7 PASS**.

Partial-session export contract:

- 0.2.1 release version — PASS
- cohort remains HOLD before refreeze — PASS
- persistent export action present — PASS
- export event present — PASS
- incomplete progress preserved — PASS
- active session remains active — PASS
- partial export remains SINGLE_RUNTIME — PASS
- analyzer expects 0.2.1 — PASS

Result: **8/8 PASS**.

Headless DOM interaction smoke:

- QA start/version lock;
- persistent export visible;
- export before completing Level 1;
- partial JSON generated;
- session remains ACTIVE;
- SINGLE_RUNTIME eligibility;
- SESSION_EXPORT_REQUESTED included;
- expected export filename;
- recall-before-help;
- Level 1 completion;
- spaced-review enter/return/no duplicated XP;
- Codex block/unlock/partial cues;
- adaptive Final Boss;
- Level 32 completion;
- final 32/32 export.

Result: **23/23 PASS**.

The first harness run showed 22/23 because the test observer attached to the anchor's `download` property after the application had already assigned it. The harness was corrected and the full matrix reran as 23/23. No application change was required for that harness-only failure.

## Gate decision

Alpha 0.2.1 is code-green but **not yet the Human-QA baseline**.

Before P01–P07 starts:

1. merge the 0.2.1 partial-export fix;
2. build/deploy the exact merged candidate;
3. verify deployment health and served release/app markers;
4. rerun the published-runtime interaction smoke;
5. freeze the exact runtime as a new SINGLE_RUNTIME baseline;
6. publish the P01–P07 cohort protocol and dashboard tooling.

Until then:

```
P01–P07 = HOLD
CANON_PROMOTION = FALSE
```
