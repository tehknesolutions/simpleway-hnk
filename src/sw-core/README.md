# SW-APP CORE — Fusion bootstrap

This directory is the language-neutral extraction boundary created by the SWE × SW-HNK fusion.

It does **not** contain HNK canon or English lesson semantics.

Initial contracts:
- `contracts/language-pack-v1.mjs` — language-pack boundary.
- `contracts/media-registry-v1.mjs` — pedagogical media registry.
- `contracts/lesson-runtime-v1.mjs` — shared SimpleWay pedagogical phases + HNK acquisition-stage compatibility.

Next slice: HNK adapter + first visual lesson surface. SWE source transplantation is gated by Golden Source integrity checks because the recovered archive contains damaged/overlapping ZIP entries.
