# HNK A1 — P01 Activation Gate V1

Status: **READY_FOR_FIRST_HUMAN**

## Frozen runtime

- Cohort URL: `https://hnk-a1-alpha-021-freeze-production.up.railway.app`
- App: `HNK-A1-APP-ALPHA-0.2.1`
- Language: `HNK-A1-RC1-CANDIDATE`
- Runtime baseline: `a0b0e5382a92b817b9afe1250dfa87bbadd2dac6`
- Final artifact: `b81004d7716927afe11b100e33cd5ecb703a579f`
- Final deployment: `8639272c-cdaf-46ce-b843-5cb7676f8cae`
- Cohort launch commit: `98f387efc1d17a178872acb378a24d8bfe6ec349`

The Railway service still reports the exact frozen deployment as current and successful. External generic web-fetch access to the Railway domain is unavailable from the research environment, so P01 activation relies on the exact deployment fingerprint + container verification already recorded in Freeze Gate V2. This is a tooling limitation, not a claimed browser PASS.

## Before P01

The participant should be a genuine beginner who did not author HNK.

Do not record a real name in the repository. P01 is a **slot**, not an identity.

Before clicking **Iniciar sessão QA**, the facilitator may explain only interface mechanics. Once the session starts, do not teach, translate, paraphrase, suggest HNK forms or tell the participant which answer is correct.

Built-in hints and Codex are allowed because the runtime records their use.

## During P01

Observe behavior, not private life details.

Allowed factual notes include:

- interface hesitation;
- inability to find a control;
- technical interruption;
- whether the participant voluntarily stopped;
- last level reached;
- whether built-in help was used.

Do not diagnose a grammar problem during play. Low score, retries, hints, stopping early and UNMAPPED_CONSTRUCTION are not by themselves evidence of GRAMMAR_PROBLEM.

## End of P01

If Level 32 is completed, use the final Human QA export.

If the participant stops before Level 32, click **Exportar sessão before closing the page**. Early-stop evidence must remain in the denominator.

The generated JSON remains local under `qa-exports/` and must not be committed.

Run:

```bash
npm run qa:a1:p01-intake -- ./qa-exports/hnk-a1-qa-SESSION-....json
```

Possible intake results:

- `ELIGIBLE` — valid first-human gate evidence for P01;
- `RESEARCH_ONLY` — useful evidence but excluded from promotion metrics;
- `REJECTED` — malformed or incompatible export.

Only after an actual export returns `ELIGIBLE` may the P01 slot be considered captured.

## Human authority boundary

P01 intake never assigns GRAMMAR_PROBLEM and never promotes HNK content to CANON.

After P01 is captured, the next action is:

1. seed the seven critical-skill rows for that anonymous player;
2. perform human review;
3. update the local cohort dashboard;
4. continue to P02 without changing the frozen runtime.
