# Sprint 2 — The Construction Forge

Status: **EXPERIMENTAL / HNK-A1-RC1-CANDIDATE**

World 2 adds Levels 09–16 to the isolated A1 Lab runtime.

## Skills exercised

- GAVURI + object
- quantity + countable object
- MORAKU + object
- scoped NE with MORAKU
- KORUME + VEMI + LOKANI
- TAMURI + NEMA + VALI
- VOMA + PELUKI
- AN + LENU + MAVERA as a scoped complex subject NP

## Governance guards

Every Sprint 2 lexeme and construction is marked:

- HNK_AUTHORED_CANDIDATE
- LOCKED_FOR_TESTING

No Sprint 2 construction is marked as generalizable.

Specific blocked extrapolations are regression-tested, including:

- quantity with SAVETA without a container
- KORUME + LOKANI without VEMI
- free temporal reordering
- free plural-person transfer
- free possessive NP ordering

Run:

```
npm run validate:a1-sprint2
npm run a1:sprint2
```
