# SIMPLEWAY ONE — SW-A1 Universal Blueprint V1

Status: ARCHITECTURAL NORTH STAR / V1 CANDIDATE FOR DUAL-LANGUAGE VALIDATION

## Thesis
SimpleWay is evolving from separate language applications into one universal language-acquisition system.

English is the mature product/reference implementation. HNK is the language and methodology laboratory. SW-APP CORE contains only capabilities proven to be language-neutral.

## Prime rule
Universalize communicative capability, acquisition, assessment and learner experience. Do NOT universalize the grammar of one language.

`A1 capability != English grammar template`

Every Language Pack owns its lexicon, grammar, phonology, orthography, writing system, semantic constraints, cultural/contextual realization and evidence/authority rules.

## System model
CEFR / proficiency target
→ SW Capability Graph
→ SW Acquisition Graph
→ SW Assessment Contract
→ SW Lesson Runtime
→ Language SDK
→ Language Pack
→ learner experience
→ telemetry / research
→ methodology review
→ validated CORE improvement

## SW-A1 Capability Graph
The universal layer describes what a learner can accomplish, not which grammatical construction must be used.

Initial domains:
1. identity and basic self-expression
2. people and relationships
3. everyday objects and basic reference
4. places and environmental context
5. everyday actions and activities
6. routine and recurrence
7. basic time orientation
8. quantity and simple comparison where language-appropriate
9. wants, needs and intentions
10. questions and responses
11. basic social interaction
12. comprehension and production of short contextualized utterances

These domains require later CEFR/source reconciliation before being declared a complete A1 standard.

## Acquisition Graph
Candidate reusable learning loop:
CONTEXT INPUT → EXPOSURE → COMPREHENSION → NOTICE → RETRIEVAL → TRANSFER → RETENTION → CHECKPOINT

This sequence is a methodology candidate, not a universal psycholinguistic law. HNK Lab may test variants. Promotion to CORE requires evidence and review.

## Assessment Contract
Assessment should measure capability independently from a specific language implementation whenever possible:
- contextual comprehension
- recognition
- controlled retrieval
- short production
- interaction
- transfer to a new context
- delayed retention

Language Packs define valid language-specific answers and constraints.

## Language Pack boundary
A Language Pack may provide:
- identity and metadata
- curriculum mapping
- lexicon
- grammar and constructions
- phonology/pronunciation
- orthography/writing system
- governed utterances
- media mappings
- audio/voice requirements
- exercises and answer contracts
- assessments
- Codex/reference material
- authority/evidence metadata

The CORE must not infer missing grammar or lexical meaning.

## Dual validation rule
A supposedly universal CORE abstraction is not accepted merely because it works for English.

V1 validation requires at minimum:
- English Pack can implement the abstraction naturally;
- HNK Pack can implement it without being forced into English grammar;
- differences remain inside Language Packs rather than being hidden as CORE exceptions.

If either language requires semantic distortion, the abstraction returns to candidate status.

## Product architecture
SIMPLEWAY ONE
├── Student Experience
│   ├── Learn
│   ├── Practice
│   ├── Missions
│   ├── Speak
│   ├── Codex
│   └── Progress
├── Teacher
├── Creator / Course Builder
├── Language SDK
└── Research Lab
    └── HNK as primary P&D environment

## Repository direction
Target architecture:
- apps/simpleway
- packages/core
- packages/ui
- packages/pedagogy
- packages/acquisition
- packages/gamification
- packages/media
- packages/voice
- packages/ai
- packages/srs
- packages/telemetry
- packages/research
- packages/language-sdk
- languages/english
- languages/hnk
- methodology/simpleway
- research/hnk-lab

This is a target model, not authorization for an immediate destructive repository migration.

## Chesed vertical slice
The existing SW-HNK Chesed fusion remains valuable. It becomes the first concrete vertical slice used to test:
- Language Pack isolation;
- governed media;
- universal learner shell;
- acquisition stages;
- assessment boundaries;
- evidence-safe UI behavior.

Do not discard the Chesed work. Reclassify it as the first SimpleWay One laboratory implementation.

## Promotion pipeline
EXPERIMENT → HNK LAB → EVIDENCE → PEDAGOGICAL REVIEW → METHOD CANDIDATE → DUAL-LANGUAGE VALIDATION → CORE

A feature discovered in HNK can benefit English only after promotion. A mature SWE feature can enter CORE only after proving it is language-neutral.

## North Star
ONE APP · ONE CORE · MANY LANGUAGES · ONE EVOLVING METHOD

SimpleWay should be capable of transforming a language into a structured acquisition journey without forcing that language to imitate English.