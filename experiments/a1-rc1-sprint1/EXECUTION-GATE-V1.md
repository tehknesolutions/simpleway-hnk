# HNK A1 Alpha 0.2.0 — Execution Gate V1

Status: **CODE_GREEN / PREVIEW_BLOCKED / P01–P07 HOLD**

This checkpoint validates the merged Alpha 0.2.0 Acquisition Engine without changing HNK linguistic authority.

## Baseline

- app: `HNK-A1-APP-ALPHA-0.2.0`
- language: `HNK-A1-RC1-CANDIDATE`
- acquisition: `HNK-A1-ACQUISITION-ENGINE-V1`
- campaign: 32/32 playable
- CANON promotion: none

## Executed validation

The A1 validators were loaded from the repository and executed against the current runtime modules.

Result after validator alignment hotfix:

- Sprint 1 playable core: PASS
- Sprint 2 construction forge: PASS
- Sprint 3 grammar dungeon: PASS
- Sprint 4 open world: PASS
- Sprint 5 final boss: PASS
- Acquisition Engine: PASS
- Human QA analyzer: PASS

A separate Alpha Release/build invariant pass completed **15/15** checks, including:

- app/language/acquisition version coherence;
- 32 playable levels;
- recall-before-help wiring;
- partial Codex cue wiring;
- spaced-review wiring;
- new-session runtime lock/reset behavior;
- build output contract `dist/a1`;
- Vercel build command `npm run build:a1-alpha`.

## Validator regression fixed

Older sprint validators still asserted historical campaign sizes:

- Sprint 2: 16 levels
- Sprint 3: 3 worlds / 24 levels
- Sprint 4: 4 worlds / 31 levels

The final runtime legitimately contains 5 worlds and 32 levels. Tests were updated to validate their sprint-specific invariants inside the final campaign without relaxing linguistic assertions.

The Final Boss validator was also aligned from the old Alpha 0.1.3 runtime-integrity fixture to Alpha 0.2.0.

## External execution blockers

GitHub Actions jobs terminated before any workflow step executed (`steps=[]`), so those failures are infrastructure failures rather than validator results.

The Vercel Git integration reported:

`api-deployments-free-per-day` — more than 100 deployments in the current daily window.

The currently connected Vercel credential does not have access to the `tw-da-vincis-projects` scope used by the `simpleway-hnk` project.

The authorized Desktop Commander device was offline during this gate.

## Gate decision

Alpha 0.2.0 is **code-green** for the A1 validator lane but is **not yet frozen as the Human-QA baseline** because a real Preview deployment + browser smoke from the exact candidate commit has not been completed.

Therefore:

`P01–P07 = HOLD`

## Final freeze requirements

Before changing the gate to `READY_FOR_P01-P07`:

1. merge this execution-gate hotfix;
2. build/deploy the exact resulting commit to a Preview or equivalent static host;
3. smoke-test session start, shuffled choice/tray, recall-before-help, partial Codex, spaced-review return flow, Level 32 adaptive Boss, and QA export;
4. record deployment URL + exact commit SHA;
5. verify no blocking runtime issue;
6. freeze Alpha 0.2.0 as `SINGLE_RUNTIME`.

No vocabulary, G-ID, grammar, construction authority, or CANON status is changed by this checkpoint.
