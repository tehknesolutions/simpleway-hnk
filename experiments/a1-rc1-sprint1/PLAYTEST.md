# HNK A1 Alpha 0.2.1 — Frozen Human QA Playtest Instructions

## Live Alpha

**Frozen Cohort URL:** https://hnk-a1-alpha-021-freeze-production.up.railway.app

Deployment fingerprint:

- app: `HNK-A1-APP-ALPHA-0.2.1`
- runtime baseline commit: `a0b0e5382a92b817b9afe1250dfa87bbadd2dac6`
- freeze metadata main commit: `8cfa05e2591cba43b2364a0289cb3ce72ddd9728`
- final deployment artifact: `b81004d7716927afe11b100e33cd5ecb703a579f`
- final Railway deployment: `8639272c-cdaf-46ce-b843-5cb7676f8cae` (`SUCCESS`)

The Railway artifact is packaging-only; it does not introduce new HNK grammar or vocabulary.

## Start

1. Open the frozen cohort URL above.
2. Choose **Iniciar sessão QA**.
3. Do not enter your real name, address or other personal information.
4. Play naturally. Use hints or the Codex if needed; the app records that as assistance.

## During the playtest

- Try to understand before using a hint.
- In Open World / Final Boss, type HNK freely, but send **one communicative construction per “Usar fala”**.
- If you reach an UNMAPPED CONSTRUCTION, do not force a translation; try another known strategy.
- Do not refresh to erase a mistake. The session is designed to observe learning behavior.

## Finish

Use **Exportar sessão** whenever the playtest ends, even if the participant stops before Level 32. After Level 32, the final export remains available as well. Return the generated JSON file to the researcher.

## New test session

Use **Nova sessão** only when starting a genuinely new playtest run. It resets XP, progression, attempts and QA telemetry for that round, while keeping the anonymous player identifier.

## Status

- App: HNK-A1-APP-ALPHA-0.2.1
- Language: HNK-A1-RC1-CANDIDATE
- 32/32 playable
- Frozen Human-QA baseline · READY FOR P01–P07
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

Use only the frozen Alpha 0.2.1 cohort URL for P01–P07. Alpha 0.2.1 records the runtime version at session start and on every QA event. If a participant crosses a runtime update, the export is marked `MIXED_RUNTIME` and is automatically excluded from promotion metrics.
