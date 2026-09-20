# HNK Visual Canon V2 — Font 1.0.1 packaging note

The validated 1.0.0 binary set contains 92 mappings: 40 HNK40 roots and 52 MX1 derived glyphs.

- Root transport range: U+E100–U+E127
- MX1 transport range: U+E200–U+E233
- Formats: TTF, OTF, WOFF2

PUA values are implementation/transport identifiers only; they are not Unicode-standard semantic assignments.

Packaging correction from 1.0.0: the local README accidentally serialized newline markers as literal backtick-n text. This documentation file records the corrected line-break form. It does not alter font binaries, cmap, visual canon, hashes, or linguistic authority.
