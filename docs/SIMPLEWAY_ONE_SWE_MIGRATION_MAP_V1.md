# SimpleWay One — SWE Migration Map V1

Status: SOURCE-BASED ARCHITECTURAL MIGRATION PLAN
Source reference: `tehknesolutions/SW-ENGLISH` main
Target reference: `tehknesolutions/simpleway-hnk` branch `fusion/swe-swhnk-v1`

## Objective
Do not clone SWE blindly. Extract its mature product capabilities, separate English-specific content from language-neutral mechanics, combine them with SW-HNK governance, and converge on SimpleWay One.

Decision vocabulary:
- **KEEP/EXTRACT** — mature concept worth moving into universal CORE after neutralization.
- **LANGUAGE PACK: EN** — English realization/content; never universalize it.
- **REWRITE/GENERALIZE** — useful implementation whose current API encodes English or legacy assumptions.
- **LAB** — experimentation/research concern.
- **DISCARD/ARCHIVE** — legacy duplication or version lineage that should not become the new architecture.

## Migration matrix

| SWE source/capability | Evidence observed | Decision | SimpleWay One destination | Reason / required transformation |
|---|---|---|---|---|
| `app/theme/simpleway_design_tokens.dart` | centralized visual tokens | KEEP/EXTRACT | `packages/ui` | preserve SimpleWay identity; remove course-specific assumptions |
| `app/layout/simpleway_responsive.dart` | reusable responsive breakpoints/layout | KEEP/EXTRACT | `packages/ui` | universal shell concern |
| `app/ui/simpleway_workspace_shell*` | workspace/navigation shell lineage | REWRITE/GENERALIZE | `apps/simpleway` + `packages/ui` | select best current UX; remove English branding/content wiring |
| `learning/internal/official_lesson_session.dart` | persistent lesson state/progress | KEEP/EXTRACT | `packages/core` / lesson runtime | maps strongly to neutral runtime contract |
| `learning/internal/continue_learning_resolver.dart` | resume/continue behavior | KEEP/EXTRACT | `packages/core` | language-neutral learner navigation |
| `learning/internal/lesson_access_policy.dart` + cycle access | unlock/access rules | KEEP/EXTRACT | `packages/core` | mechanics universal; curriculum prerequisites supplied by packs |
| `learning/internal/cycle_registry.dart` | cycle registration | REWRITE/GENERALIZE | `packages/language-sdk` | registry must support arbitrary proficiency/curriculum structures |
| `learning/models/cycle_manifest_models.dart` | cycle/lesson manifest structures | REWRITE/GENERALIZE | `packages/language-sdk` | remove English/Cycle-1 assumptions and align with SW capability IDs |
| `content/repositories/official_content_repository.dart` | content repository abstraction | KEEP/EXTRACT | `packages/language-sdk` | useful content boundary; implementation must become pack-agnostic |
| `content/models/official_content_models.dart` | English lesson content schema | LANGUAGE PACK: EN + partial generalization | `languages/english` + generic content contracts | story/QA/vocabulary concepts may generalize; EN/PT fields do not |
| `content/manifests/cycle1_manifest.dart` | official English Cycle 1 manifest | LANGUAGE PACK: EN | `languages/english` | English curriculum realization |
| `learning/answer_evaluator.dart` | answer normalization/evaluation | REWRITE/GENERALIZE | `packages/core` evaluation interface + pack evaluators | normalization rules cannot assume Latin/English answers |
| `features/practice/practice_card_model.dart` | generic practice-card shape | KEEP/EXTRACT | `packages/pedagogy` | useful neutral interaction primitive after language fields are abstracted |
| `features/practice/practice_card_generator.dart` | generates cards from SWE content | REWRITE/GENERALIZE | `packages/pedagogy` + Language Pack adapters | generator mechanics reusable; mappings belong to each pack |
| `features/practice/practice_session_controller.dart` | practice session orchestration | KEEP/EXTRACT | `packages/core` / practice runtime | language-neutral state machine candidate |
| `features/practice/practice_scoring_engine.dart` | scoring/XP logic | KEEP/EXTRACT with policy injection | `packages/gamification` | mechanics reusable; weights/configuration must not be hardcoded per English activity |
| `progress/internal/course_progress_store.dart` | progress persistence | KEEP/EXTRACT | `packages/core` / progress | universal persistence contract |
| `progress/internal/gamification_summary.dart` | gamification summary | KEEP/EXTRACT | `packages/gamification` | universal learner feedback |
| `features/progress/*` | lesson progress surfaces/services | KEEP/EXTRACT | `packages/core` + `packages/ui` | split storage/domain from presentation |
| `learning/ui/simpleway_lesson_media_registry.dart` | lesson media lookup | KEEP/EXTRACT/UNIFY | `packages/media` | merge conceptually with SW-HNK `media-registry-v1.mjs` |
| `observability/simpleway_lesson_media_contract.dart` | media observability/contract | KEEP/EXTRACT/UNIFY | `packages/media` + `packages/telemetry` | combine media contract + runtime evidence |
| `features/lesson/services/simpleway_audio_service.dart` | audio playback/service | KEEP/EXTRACT | `packages/media` / `packages/voice` | transport is universal; voice/language configuration belongs to pack |
| `features/voice/*` | voice functionality | REWRITE/GENERALIZE | `packages/voice` | remove English locale/content assumptions |
| `features/neurovoice/*` | conversation/voice domain + UI | REWRITE/GENERALIZE | `packages/voice` + `packages/ai` | valuable product capability; language behavior supplied by pack |
| `ai/chat_tutor_service.dart` | tutor service | REWRITE/GENERALIZE | `packages/ai` | prompts, correction rules and linguistic authority must be pack-controlled |
| `features/vocabulary_lab/*` | personal vocabulary lab | KEEP/EXTRACT + pack semantics | `packages/pedagogy` + `packages/ui` | personal vocabulary mechanics universal; lexical truth belongs to pack |
| `learning/internal/generic_cycle_quality_gate_service.dart` | curriculum quality gate | KEEP/EXTRACT/EXPAND | `packages/language-sdk` + CI validators | strong fit with HNK evidence-first governance |
| `observability/*` | runtime observability | KEEP/EXTRACT | `packages/telemetry` | foundation for HNK Lab experiments and product QA |
| `features/methodology/*` | methodology presentation/content | SPLIT | `methodology/simpleway` + `packages/ui` | distinguish methodology doctrine/data from its presentation |
| `learning/ui/official_lesson_runtime_screen_v7.dart` | mature workspace-first lesson UI, 7-step English flow, media, OPI, story, QA, structure, vocabulary, Activation, review | REWRITE/GENERALIZE | `apps/simpleway` + `packages/ui` + runtime stage renderer | preserve UX patterns, not the fixed English 7-step semantic sequence |
| `official_lesson_runtime_screen_v8+` version wrappers | accumulated runtime lineage | DISCARD/ARCHIVE after extracting behavior | git history / migration notes | version-per-file lineage must not become SimpleWay One architecture |
| `features/lesson/screens/official_lesson_game_mode_screen.dart` | XP, hearts, progress, multimodal deck | REWRITE/GENERALIZE | `packages/gamification` + `packages/pedagogy` + UI | excellent interaction source; current modes and EN/PT directions are English-specific |
| game-mode `_isAcceptable` word-overlap heuristic | Latin normalization + 72% word overlap | DISCARD AS UNIVERSAL RULE | Language Pack evaluator / research candidate | unsafe across morphology, scripts and HNK governed semantics |
| game-mode hardcoded `en-US` | English audio locale | LANGUAGE PACK: EN | `languages/english` | pack must declare voice/pronunciation settings |
| game-mode `Drill 72 · PT → EN`, EN→PT review | English/Portuguese pedagogy | LANGUAGE PACK: EN / methodology candidate | English pack + Lab | translation direction cannot define universal acquisition |
| fixed lesson labels `Fala Inicial`, `Historia Guiada`, `Q&A`, `Estrutura`, `Vocabulario`, `Activation 72`, `Revisao` | current SWE pedagogical realization | LAB / methodology candidate | `methodology/simpleway` | test capability/stage abstraction before CORE promotion |

## SW-HNK assets already pointing toward the target

The current fusion branch already contains three useful neutral contracts:
- `src/sw-core/contracts/language-pack-v1.mjs`
- `src/sw-core/contracts/lesson-runtime-v1.mjs`
- `src/sw-core/contracts/media-registry-v1.mjs`

HNK already supplies a concrete pack/vertical slice through:
- `src/language-packs/hnk/chesed-v1.mjs`
- `src/language-packs/hnk/chesed-learning-surfaces-v1.mjs`
- `src/language-packs/hnk/chesed-media-v1.mjs`
- `experiments/sw-hnk-v2/`

These should not be replaced by SWE wholesale. They are the target boundary into which mature SWE capabilities should be extracted.

## What SWE clearly contributes
1. Mature responsive application shell and visual identity.
2. Real lesson workspace patterns instead of prototype-only cards.
3. Persistent lesson sessions and continue-learning behavior.
4. Practice orchestration and scoring mechanics.
5. XP/hearts/progress game feedback.
6. Audio, speaking and conversation foundations.
7. Vocabulary Lab.
8. Content repository/manifests and quality gates.
9. Media contracts/registry and observability.
10. Teacher/student-facing product patterns that SW-HNK should not rebuild from zero.

## What SW-HNK clearly contributes
1. Explicit Language Pack boundary.
2. Evidence-first linguistic governance.
3. Canon/candidate/validated separation.
4. Safe media semantics: image is pedagogical context, not linguistic evidence.
5. HNK-specific authority and source locks.
6. Research-lab role for testing acquisition methodology.
7. Pressure-testing of supposedly universal abstractions against a non-English language built under governance.

## Fusion rule
The target is neither SWE copied into HNK nor HNK replacing SWE.

`SWE mature product capability + SW-HNK governance/language isolation → SimpleWay One universal capability`

## Recommended implementation order

### Wave 1 — Universal shell
Extract design tokens, responsive layout and workspace shell into neutral SimpleWay UI contracts. Render both English and HNK identity through configuration.

### Wave 2 — Runtime/session
Unify `OfficialLessonSession` concepts with `lesson-runtime-v1`. Define neutral stage/session/progress contracts without encoding the seven SWE step meanings.

### Wave 3 — Media
Unify SWE media registry/observability with SW-HNK media registry. Finish Chesed's real assets and require zero unresolved required media before visual release.

### Wave 4 — Practice + gamification
Extract practice session, scoring, XP, hearts and progress. Replace hardcoded activity names and score weights with activity contracts/policies.

### Wave 5 — English Pack V1
Move official English Cycle 1 content, EN/PT mappings, English audio locale and English answer rules behind the Language Pack boundary.

### Wave 6 — HNK Pack V1
Adapt the existing governed HNK surfaces to the same runtime/practice contracts without weakening source-lock or inventing missing grammar.

### Wave 7 — Voice + AI
Generalize audio, speaking, NeuroVoice and tutor capabilities. Pack owns locale, pronunciation targets, valid utterances and correction authority.

### Wave 8 — Lab + telemetry
Connect observability to HNK Lab. Compare acquisition-stage variants and promote only evidence-supported improvements through the documented promotion pipeline.

## Definition of success for the first fusion milestone
A single SimpleWay shell can load either `english` or `hnk`; the same generic runtime renders both; the same progress/practice/media infrastructure works for both; all linguistic semantics remain inside the selected pack; and no CORE code needs an HNK- or English-specific semantic branch.

## Immediate next implementation slice
Build **SimpleWay One Shell V1** using the strongest SWE shell/responsive/design patterns while retaining the current HNK Language Pack contracts. The first acceptance test should switch between an English fixture and the Chesed HNK fixture through the same shell/runtime.