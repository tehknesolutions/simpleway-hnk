# HNK A1 Alpha 0.2.0 — Playtest Instructions

## Live Alpha

**Playtest URL:** https://hnk-a1-alpha-static-production.up.railway.app

Deployment fingerprint:

- app: `HNK-A1-APP-ALPHA-0.2.0`
- main release commit: `386325b6f9c8ff8e77356577e01c097c2acd16fb`
- Railway deploy artifact: `7a1e13aebae494fef9178e1ff00a3e986b6835cc`
- deployment: `bb1c31ae-9364-40b6-8df7-4ab6c383fad0` (`SUCCESS`)

The Railway artifact is packaging-only; it does not introduce new HNK grammar or vocabulary.

## Start

1. Open the Alpha URL above.
2. Choose **Iniciar sessão QA**.
3. Do not enter your real name, address or other personal information.
4. Play naturally. Use hints or the Codex if needed; the app records that as assistance.

## During the playtest

- Try to understand before using a hint.
- In Open World / Final Boss, type HNK freely, but send **one communicative construction per “Usar fala”**.
- If you reach an UNMAPPED CONSTRUCTION, do not force a translation; try another known strategy.
- Do not refresh to erase a mistake. The session is designed to observe learning behavior.

## Finish

After Level 32, click **Exportar Human QA** and return the generated JSON file to the researcher.

## New test session

Use **Nova sessão** only when starting a genuinely new playtest run. It resets XP, progression, attempts and QA telemetry for that round, while keeping the anonymous player identifier.

## Status

- App: HNK-A1-APP-ALPHA-0.2.0
- Language: HNK-A1-RC1-CANDIDATE
- 32/32 playable
- Human-QA candidate only
- Not CANON
- Not external CEFR certification


## Analyze returned QA exports

Place the exported `hnk-a1-qa-*.json` files in one directory and run:

```
npm run qa:a1:analyze -- ./qa-exports
```

For the manual grammar gate, copy `HUMAN-QA-ANNOTATIONS.example.json`, review each critical skill for each player, and run:

```
npm run qa:a1:analyze -- ./qa-exports --annotations=./qa-annotations.json
```

The analyzer computes automated metrics but never infers `GRAMMAR_PROBLEM` from learner behavior on its own.


## Runtime integrity

Do not begin the P01–P07 cohort on a version that may be hotfixed mid-session. Alpha 0.2.0 records the runtime version at session start and on every QA event. If a participant crosses a runtime update, the export is marked `MIXED_RUNTIME` and is automatically excluded from promotion metrics.
