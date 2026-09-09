# SWHNK-C1-BASELINE-V1

**Date:** 2026-09-09  
**Repository:** `tehknesolutions/simpleway-hnk`  
**State:** `BASELINE_ASSEMBLED / EXTERNAL_CI_STARTUP_BLOCKED / L01_RAW_PAYLOAD_OPEN`

## Baseline assembled

The repository now contains:

- approved Cycle 1 numerical contract;
- governed Cycle 1 manifest;
- seven canonical lesson directories and manifests;
- corrected sphere mapping through `L06=Yesod` and `L07=Malkuth`;
- recovered L01 publication validator;
- recovered L01 web shell;
- recovered L02 scaffold;
- L03/L04 evidence gates represented without silent promotion;
- L05/L06/L07 unknown HNK forms preserved as unknown/null;
- Lesson manifest schema;
- executable Node baseline validator;
- GitHub Actions workflow for the baseline validator;
- tracked P0/P1 operational issues.

## Canonical Cycle 1 tree

1. L01 — Kether
2. L02 — Chokhmah
3. L03 — Binah
4. L04 — Chesed
5. L05 — Gevurah
6. L06 — Yesod
7. L07 — Malkuth

## Quantitative contract

- 7 Lessons
- 70 OPI
- 35 stories
- 28 Q&A
- 35 structures
- 144 vocabulary entries
- 504 Activation drills
- 154 review items
- 3 final seals
- 1,008 total pedagogical elements

## Language recovery boundary

Current shared language registry evidence remains incomplete. Course manifests do not convert curriculum slots into HNK forms by inference.

Special protection:

- `FAITH`, `PURPOSE`, `PEACE` are curriculum semantic targets in L07; HNK forms remain `null` until governed language authority provides them.
- L05 English structure target does not create an HNK equivalent.
- L03/L04 WATCH/CANDIDATE/GATE material is not treated as FROZEN.

## L01 recovery status

Confirmed:

- source version `1.0.0`;
- source status `PUBLICATION-FROZEN`;
- 10 OPI invariant;
- 72 teacher-drill invariant;
- WATCH set `SARASALA`, `VAMAVALA`, `VAMAZAMU`;
- recovered Dart loader/validator;
- recovered product web shell.

Still missing original raw sources:

- `lesson1.release.v1.json`
- `data/lesson1-data.js`
- `hnk-runtime.js`
- `app.js`
- `styles.css`
- `manifest.webmanifest`

No missing frozen item may be reconstructed from memory or plausibility under this baseline.

## CI status

Workflow: `Cycle 1 Baseline`.

The workflow triggers, but GitHub hosted jobs currently terminate before any step starts. Observed jobs contain no executed steps and no runner log. Therefore CI status is classified as `EXTERNAL_CI_STARTUP_BLOCKED`, not as a failed content assertion.

When Actions runner execution is restored, the required command is:

```bash
npm test
```

Expected success marker:

```text
PASS SWHNK-C1-BASELINE-V1
```

## Next gate

### SWHNK-L01-RECOVERY-V1

Priority order:

1. recover original L01 raw payload/files;
2. verify them with the recovered validator;
3. record provenance/checksum;
4. reconcile every HNK form against `@hnk/linguas` and every glyph representation against `@hnk/glyphs`;
5. only then promote L01 from `RECOVERED_PARTIAL_PUBLICATION_SOURCE_CONFIRMED` to `RECOVERED_PUBLICATION_PAYLOAD_VERIFIED`;
6. use the verified L01 as the first data source for the new SimpleWay HNK web product.

If the original payload cannot be recovered, the alternative path is a deliberately authored new release with a new version. It must never impersonate the lost frozen payload.
