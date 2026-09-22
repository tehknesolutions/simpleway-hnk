# SimpleWay One — Domain Boundary Matrix V1

Status: ARCHITECTURAL CANDIDATE / IMPLEMENTATION GUIDE

This matrix answers the governing question for the fusion: **does a capability belong to universal CORE, a Language Pack, or Research Lab?**

| Concern | CORE | Language Pack | Research Lab |
|---|---|---|---|
| navigation / shell | owns | configures labels/theme only | observes |
| learner profile | owns | may extend language progress | studies |
| XP / streak / hearts | owns mechanics | may configure pedagogical values | experiments with variants |
| lesson runtime | owns neutral state machine | supplies lesson content/contracts | tests alternative flows |
| acquisition stages | owns only promoted stages/contracts | maps language material to stages | proposes/tests sequences |
| SRS / retention engine | owns generic scheduling | supplies reviewable language units | tests parameters |
| media registry | owns media contract | supplies approved media mappings | evaluates media effectiveness |
| audio / voice transport | owns infrastructure | supplies pronunciation/voice rules | tests modalities |
| speaking UI | owns interaction framework | defines valid language behavior | measures outcomes |
| lexicon | must not own | owns | may propose candidates |
| grammar | must not own | owns | may test teaching approaches |
| phonology | must not own | owns | may test acquisition methods |
| orthography / script | must not own | owns | may test presentation methods |
| semantic authority | enforces contract only | owns language-specific authority | may produce evidence, never silently promote |
| CEFR capability target | owns neutral capability IDs after validation | implements realization | researches mapping gaps |
| assessment engine | owns neutral mechanics | owns valid answers/language constraints | validates instruments |
| Codex UI | owns generic surface | supplies language knowledge | may expose evidence views |
| teacher tools | owns generic workflow | supplies language-specific curriculum data | evaluates pedagogy |
| course builder | owns authoring infrastructure | creates/edits packs | tests new authoring methods |
| telemetry | owns collection contracts | supplies language dimensions | analyzes experiments |
| A/B experimentation | provides safe infrastructure | never changes canon implicitly | owns experiment definitions |

## Promotion rule
Nothing moves from Lab to CORE merely because it is novel or successful in one HNK session. Promotion requires explicit evidence, pedagogical review and dual-language validation against at least English and HNK.

Nothing moves from SWE to CORE merely because SWE already implements it. Mature SWE code is a strong source candidate, not automatic proof of language neutrality.

## Anti-patterns
- CORE contains `if (language === "hnk")` for linguistic semantics.
- CORE contains English tense/category assumptions as universal fields.
- HNK Pack reimplements navigation, XP, generic SRS or generic media infrastructure.
- English Pack owns reusable application shell components.
- Lab experiments silently alter canonical Language Pack content.
- UI copy or generated images become linguistic evidence.

## Migration heuristic
For every SWE or SW-HNK module considered during fusion, classify it before copying:
1. Is it independent of the language's grammar/lexicon/phonology? → CORE candidate.
2. Does it describe how a particular language realizes communication? → Language Pack.
3. Does it exist to test, compare, measure or discover a better method? → Research Lab.
4. Does it combine two or more categories? → split the module before promotion.

## Immediate use
Apply this matrix to the current Chesed vertical slice and then to the SWE feature inventory. The next architectural deliverable should be a component-by-component migration map: `SWE source → KEEP / EXTRACT / REWRITE / DISCARD → SimpleWay One destination`.