# SimpleWay HNK — Cycle 1 Progress

**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V14`  
**Date:** 2026-09-09  
**Package:** `simpleway-hnk@0.16.0`

## Progress model

`MISSING -> AUTHORED -> VALIDATED -> FROZEN`

States are exclusive; maturity is cumulative.

## Current dashboard

Cycle 1 target: **1,008 pedagogical slots**.

- `MISSING`: **998 / 1,008 = 99.0079%**
- `AUTHORED`: **3 / 1,008 = 0.2976%**
- `VALIDATED`: **7 / 1,008 = 0.6944%**
- reproducible `FROZEN`: **0 / 1,008**
- `AUTHORED_OR_BETTER`: **10 / 1,008 = 0.9921%**
- historical `SOURCE_CONFIRMED_FROZEN`: **82 / 1,008 = 8.1349%**

## Lesson 1 OPI

- reviewed: **10/10 = 100%**
- authored-or-better: **10/10 = 100%**
- validated: **7/10 = 70%**
- frozen: **0/10**

Validated: **OPI 2, 4, 5, 6, 8, 9, 10**.

Remaining HOLD:

- OPI 1 — historical phrase is approximate; `YA` and `ES` remain unresolved.
- OPI 3 — `SARASALA` remains WATCH; age construction and HNK number system are open.
- OPI 7 — `VANI` remains WATCH with recovered meaning `null`; `KUON` is CANDIDATE dependent on `ON=GATE`; co-resident valency is authored/test-only.

## Batch 4 — applied

OPI 9: `EN VAME VAMAZAMU KE`.

Validated scoped answers:

- affirmative: `VAME VAMAZAMU`;
- negative: `NE VAME VAMAZAMU`.

Boundaries remain unchanged:

- `VAME` = `GATE`;
- `VAMAZAMU` = `WATCH`;
- `NE` = `AUTH-004 CANDIDATE`;
- predicate negation with `NE` is approved only for this card;
- no global yes/no grammar or predicate-negation productivity is granted;
- no historical v1.0 sentence-recovery claim;
- OPI 9 is not FROZEN.

## Cycle 1 OPI progress

- authored-or-better: **10/70 = 14.2857%**
- validated: **7/70 = 10.0%**
- frozen: **0/70**

## Language assets

- recovered Cycle 1 forms: **31/144 = 21.5278% proxy**
- authored candidates: **4** — `KUVAN`, `VALA`, `KUON`, `NE`
- governed unique language assets: **35/144 = 24.3056% proxy**
- recovered phrases: **7**

These are language-asset proxies, not completed vocabulary-slot percentages.

## Remaining-hold triage

Priority order:

1. **OPI 3** — number-system recovery/design. This is the most reusable and governable blocker.
2. **OPI 1** — preserve historical sentence and seek token alignment for `YA/ES` before reinterpretation.
3. **OPI 7** — last/highest risk because it stacks a meaning-null historical form, `KUON/ON=GATE` and authored co-resident valency.

Initial recovery for the HNK number system found no historical numeral system in connected GitHub, File Library or Google Drive. The next design step therefore must be explicitly v1.1 authorship, not historical recovery.

Current gate:

`SWHNK-HNK-NUMBER-SYSTEM-RECOVERY-AND-DESIGN-V1`

## CI boundary

Versioned tests have been updated to the 7/10 validation state. Remote CI must not be called green unless an actual GitHub Actions runner executes successfully.
