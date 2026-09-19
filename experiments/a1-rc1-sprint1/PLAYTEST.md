# HNK A1 Alpha 0.1 — Playtest Instructions

## Live Alpha

**Playtest URL:** https://hnk-a1-alpha-static-production.up.railway.app

Deployment fingerprint:

- app: `HNK-A1-APP-ALPHA-0.1.2`
- release source: `5f4527b1918437a7b6373eff8578f40efdd2d05d`
- Railway deploy artifact: `99e6c3e59fe507d8a6cf6d1169dc9990597ba468`
- deployment: `f6014fa4-36f4-4aea-90d8-19e227dd54b2` (`SUCCESS`)

The Railway artifact is packaging-only; it does not introduce new HNK grammar or vocabulary.

## Start

1. Open the Alpha URL above.
2. Choose **Iniciar sessão QA**.
3. Do not enter your real name, address or other personal information.
4. Play naturally. Use hints or the Codex if needed; the app records that as assistance.

## During the playtest

- Try to understand before using a hint.
- In Open World / Final Boss, type HNK freely.
- If you reach an UNMAPPED CONSTRUCTION, do not force a translation; try another known strategy.
- Do not refresh to erase a mistake. The session is designed to observe learning behavior.

## Finish

After Level 32, click **Exportar Human QA** and return the generated JSON file to the researcher.

## New test session

Use **Nova sessão** only when starting a genuinely new playtest run. It resets XP, progression, attempts and QA telemetry for that round, while keeping the anonymous player identifier.

## Status

- App: HNK-A1-APP-ALPHA-0.1.2
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
