# SWE × SW-HNK Fusion Charter V1

Status: ACTIVE MIGRATION CHARTER
Branch: `fusion/swe-swhnk-v1`
Goal: fuse the recovered SimpleWay English product/runtime maturity with the SimpleWay HNK evidence-first language laboratory without weakening either side.

## Non-negotiable invariants

1. HNK linguistic authority remains evidence-first. UI/runtime migration MUST NOT promote candidates, infer grammar, or bypass source locks.
2. The current HNK Alpha remains a reproducible legacy/reference runtime until the fused runtime passes equivalent or stronger gates.
3. SWE contributes product/runtime capabilities, not English semantics. English vocabulary, grammar and lesson-specific media remain language-pack content.
4. SW-HNK contributes acquisition experiments, authority boundaries, deterministic validation, telemetry and Human-QA capabilities to the future shared core.
5. Shared capabilities MUST move toward a language-neutral SW-APP CORE rather than creating permanent SWE/HNK forks.

## Fusion decisions

### KEEP from SWE / promote toward Core
- App shell and responsive layout
- SimpleWay design tokens/system
- lesson runtime and learning surfaces
- visual/media registry and media contracts
- vocabulary visual cards
- audio/TTS/STT/recording infrastructure
- progress dashboards and gamification presentation
- authentication/persistence/storage adapters
- teacher/admin surfaces, after student runtime parity
- visual, responsive and pedagogical contract tests

### KEEP from SW-HNK / promote toward Core
- SOURCE -> EVIDENCE -> CANDIDATE -> VALIDATION -> SCOPED APPROVAL pipeline
- source locks and non-invention rule
- intent/utterance validation
- UNKNOWN_LEXEME and UNMAPPED_CONSTRUCTION boundaries
- recall-before-help
- progressive hints/Codex assistance
- spaced review
- deterministic surface shuffling
- XP/hearts/mission progression where pedagogically justified
- adaptive/final mission patterns
- anonymous QA telemetry, session integrity, export and cohort gates
- HNK glyph/font/runtime validation

### MERGE
- SWE SimpleWay Loop with SW-HNK acquisition stages
- SWE visual vocabulary with HNK authority-aware lexeme registry
- SWE progress UX with HNK experimental telemetry
- SWE lesson runtime with HNK governed surfaces
- SWE game presentation with HNK mission/boss mechanics
- SWE media contracts with HNK semantic/source boundaries

### DROP / quarantine
- generated build/cache artifacts
- duplicate historical SWE implementations after Golden Source reconciliation
- English-specific content from shared Core
- HNK Alpha presentation as the target UI (retain as reference/tests)
- learner-facing research/debug/session internals; move behind Research Mode
- unsupported scientific/neurological claims as mandatory product behavior

## Target architecture

```text
SW-APP CORE
├── design/
├── lesson-runtime/
├── pedagogy/
├── acquisition/
├── media/
├── audio-voice/
├── game-ux/
├── progress/
├── telemetry/
├── persistence/
└── research-mode/
     │
     ├── SW-ENGLISH language pack
     └── SW-HNK language pack + language lab
          └── HNK authority/evidence adapters
```

## First fusion slice

The first fused vertical slice is intentionally learner-visible:

`Shell + Design System + Lesson Runtime + Media Registry + Visual Learning + Progress/XP`

It MUST consume governed HNK content through adapters. It MUST NOT duplicate HNK canon inside UI code.

### Acceptance gate
- Desktop and mobile render
- contextual images actually load
- visual vocabulary coverage has an automated contract
- no ungoverned HNK surface is introduced
- progression survives reload
- learner UI hides research internals
- Research Mode preserves QA telemetry
- current HNK validators remain green
- fused runtime gets dedicated visual/pedagogical tests

## Migration sequence

1. Golden Source reconciliation of recovered SWE 18.5.
2. Extract language-neutral contracts/components.
3. Create HNK adapters instead of copying English content.
4. Implement first fused vertical slice.
5. Run code + linguistic + pedagogical + visual + Human QA gates.
6. Promote validated shared improvements to SW-APP CORE.
7. Rebuild SW-ENGLISH on the same Core.
8. Continue SW-HNK as the experimental language/method laboratory.

## Release rule

`RELEASE READY = CODE PASS + LINGUISTIC PASS + PEDAGOGICAL PASS + VISUAL PASS + HUMAN UX PASS`

A validator pass alone never implies learner-experience readiness.
