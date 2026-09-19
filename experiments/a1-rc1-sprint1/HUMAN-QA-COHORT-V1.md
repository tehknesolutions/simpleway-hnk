# HNK A1 — P01–P07 Human QA Cohort V1

Status: **OPEN_FOR_P01-P07 — frozen Alpha 0.2.1 final deployment verified**

## Frozen cohort runtime

- URL: `https://hnk-a1-alpha-021-freeze-production.up.railway.app`
- app: `HNK-A1-APP-ALPHA-0.2.1`
- runtime baseline: `a0b0e5382a92b817b9afe1250dfa87bbadd2dac6`
- final artifact: `b81004d7716927afe11b100e33cd5ecb703a579f`
- final Railway deployment: `8639272c-cdaf-46ce-b843-5cb7676f8cae`
- state: `FROZEN_HUMAN_QA_BASELINE / SINGLE_RUNTIME / READY_FOR_P01-P07`

Human evidence at cohort opening: **0/7 captured**.

## Purpose

Collect the first seven independent beginner playtests for `HNK-A1-RC1-CANDIDATE` without turning gameplay success into automatic linguistic authority.

The cohort evaluates learnability, communication success, UX and recurring problems. It does **not** promote vocabulary, G-IDs, constructions or grammar to CANON by itself.

## Participants

- Seven gate slots: `P01` through `P07`.
- Prefer beginners who did not participate in authoring HNK.
- A participant receives a slot label only. Do not commit or record real names in the research repository.
- The anonymous `PLAYER-QA-...` and `SESSION-...` identifiers come from the exported JSON.
- Only the first eligible `SINGLE_RUNTIME` session for each anonymous player contributes to promotion metrics.

## Facilitator boundary

Before play begins, the facilitator may explain only interface mechanics: how to click, type, use built-in hints/Codex and export the session.

After the QA session begins, do **not** teach, translate, paraphrase or coach HNK vocabulary, constructions or grammar. Built-in hints and Codex are allowed because their use is recorded by the runtime.

If a participant asks what an HNK item means, the facilitator should redirect them to the app's own affordances rather than supply the answer.

## Session procedure

1. Open the frozen Alpha 0.2.1 cohort URL.
2. Confirm the screen identifies `HNK-A1-APP-ALPHA-0.2.1`.
3. Select **Iniciar sessão QA**.
4. Let the participant play naturally.
5. Do not erase mistakes or restart merely to improve a score.
6. If the participant finishes Level 32, export the final Human QA JSON.
7. If the participant stops **for any reason before Level 32**, use **Exportar sessão before closing the page**. Incomplete sessions are required evidence and must not disappear from the denominator.
8. Save the generated `hnk-a1-qa-*.json` locally in the research collection directory.
9. Complete the researcher form using the slot label, anonymous IDs and factual observations only.
10. Human-review all seven critical skill families before any RC2 decision.

## Early-stop categories

Use one factual category when a session ends early:

- `PARTICIPANT_CHOSE_STOP`
- `UX_BLOCKER`
- `TECHNICAL_INTERRUPTION`
- `TIME_LIMIT`
- `OTHER_NON_SENSITIVE`

Do not convert an early stop automatically into a grammar diagnosis.

## Seven critical skill families

Human annotation is required for:

- `PERSON`
- `NE`
- `VEMI`
- `NUMBER_NOUN`
- `RUMI`
- `HAVORI`
- `COMMUNICATION_REPAIR`

Allowed final classifications are `PASS`, `LEARNING_PROBLEM`, `VOCABULARY_PROBLEM`, `GRAMMAR_PROBLEM`, `UX_PROBLEM`, `CONTENT_PROBLEM`, and `UNMAPPED_CONSTRUCTION`.

`GRAMMAR_PROBLEM` is always a human-review conclusion. The automated analyzer must never invent it from learner behavior.

## Privacy

Do not collect real names, email addresses, phone numbers, home addresses, precise locations, health information or unrestricted personal narratives.

Actual QA exports and completed annotation files remain local and are ignored by Git. Commit only protocols, empty templates and aggregate/non-identifying reports.

If a participant is a minor, obtain appropriate guardian permission outside this repository and do not add identifying child information to the QA artifacts.

## Runtime stop rule

The cohort uses one frozen `SINGLE_RUNTIME` baseline.

If application/core runtime code changes, app version changes, or a blocking runtime defect is discovered after P01 begins:

```
PAUSE P01–P07
DO NOT SILENT-HOTFIX
CREATE A NEW VERSIONED BASELINE
RE-EVALUATE SESSION ELIGIBILITY
```

Documentation-only changes do not invalidate already exported `SINGLE_RUNTIME` sessions.

## Analysis

Local workflow:

```bash
npm run qa:a1:cohort-dashboard -- --exports=./qa-exports
npm run qa:a1:cohort-dashboard -- --exports=./qa-exports --annotations=./qa-annotations.json
```

For raw analyzer output:

```bash
npm run qa:a1:analyze -- ./qa-exports --annotations=./qa-annotations.json
```

Promotion remains governed by `HUMAN-QA-GATE.md`.
