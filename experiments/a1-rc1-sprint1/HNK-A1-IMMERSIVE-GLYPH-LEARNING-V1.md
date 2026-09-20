# HNK A1 — Immersive World + Glyph Learning System V1

Status: **DESIGN CONTRACT — SOURCE-LOCKED**

This package redesigns the learning experience around a continuous game world while keeping the frozen linguistic authority intact.

## Core loop

Every playable phase must implement:

```
NARRATIVE → IMAGE → GLYPH/WRITING → TEACHING → SRS → CHALLENGE → CONSEQUENCE
```

A phase is not complete merely because it contains a question.

## Narrative contract

Each of the 32 phases receives two narrative cells:

- `narrativeBefore`: minimum **72 Unicode characters**;
- `narrativeAfter`: minimum **72 Unicode characters**.

Therefore the authored narrative floor is **144 characters per phase** and **4,608 characters across 32 phases**.

These are minimums, not targets. Text must advance the situation, character/world state or communicative intention; padding solely to meet the character count fails review.

## World progression

The existing pedagogical regions become a continuous story:

1. **The Awakening — L01–L08**  
   Arrival, first contact and first communicative success.
2. **Construction Forge — L09–L16**  
   The player learns to assemble increasingly useful meanings and actions.
3. **Grammar Dungeon — L17–L24**  
   The world presents misleading generalizations and contrastive traps. The player learns what the evidence does and does not license.
4. **Open World — L25–L31**  
   School-like framing recedes. Communication is used to solve situated problems.
5. **Final Boss — L32**  
   The adaptive assessment becomes an in-world crisis assembled from pre-Boss evidence.

Names and lore created for this layer are **PEDAGOGICAL_WORLD_CANDIDATE**, not linguistic CANON.

## Visual contract

Every phase must specify:

- environment;
- recurring character(s) or explicit reason for absence;
- hero scene;
- semantic visual cues;
- character/world reaction after the challenge;
- continuity hook.

Images are instructional evidence. A visual must not silently teach a linguistic meaning or rule that the language contract does not license.

## Teaching contract

A phase declares one or more acquisition operations:

`EXPOSURE → COMPREHENSION → NOTICE → RETRIEVAL → PRODUCTION → TRANSFER`

The existing support stages remain orthogonal:

`GUIDED → SUPPORTED → FADED → RECALL`

Thus *what cognitive operation is being trained* and *how much support is visible* are separate dimensions.

## Narrative SRS

The existing review intervals remain a technical baseline. Reviews should be reintroduced as story callbacks where possible:

- a recurring character returns;
- a location is revisited;
- an object reappears;
- an earlier communicative need occurs in a new context.

The player should experience recall as world continuity rather than as a detached flashcard whenever the linguistic contract permits it.

## Glyph learning

The immersive layer includes the **Glifos-40** and a future deterministic **Mix-Glifo** renderer.

Authority is strictly separated:

```
CANONICAL_GLYPH
DERIVED_MIX_GLYPH
PEDAGOGICAL_VISUAL
UNRESOLVED
```

A Mix-Glifo is not automatically a new canonical glyph.

### Required learning associations

The system may train only mappings supported by approved evidence:

- sound ↔ canonical glyph;
- approved phonetic unit ↔ glyph sequence/composition;
- derived Mix-Glifo ↔ approved phonetic unit;
- word ↔ approved written representation;
- scene/intention ↔ approved utterance.

Unsupported mappings remain `UNRESOLVED`.

### Mix-Glifo generation pipeline

```
approved phonetic segmentation
→ canonical glyph lookup
→ composition-rule lookup
→ deterministic composition
→ legibility validation
→ DERIVED_MIX_GLYPH
```

No segmentation, phoneme-to-glyph correspondence, rotation, mirroring, stacking, overlap, ligature or reduction rule may be invented by the renderer.

## Progressive literacy

The UI may progressively reduce scaffolding:

1. scene + sound/transliteration + glyph;
2. scene + transliteration + glyph;
3. scene + glyph with optional support;
4. glyph-led retrieval;
5. Mix-Glifo recognition where licensed;
6. situated production/decoding.

This progression must never hide information before the learner has received sufficient licensed exposure.

## Governance boundary

This design package changes **no** lexeme, G-ID, construction authority, grammar authority or CANON status.

The existing HNK ≠ HENUVOKODAN distinction remains mandatory.

The canonical course utterance `EN ZAMI HNK KE` remains untouched.

The known atomic `TS = G30` inside `PITSA` remains structural evidence only; it must not be generalized into a complete phonological/glyph composition system without source support.
