# SimpleWay HNK — Inventário Verificado V1

**Data:** 2026-09-10  
**Estado:** RECOVERY + GOVERNED AUTHORING + SCOPED VALIDATION + OPI/ACTIVATION/STRUCTURES/TEACHER NOTES COMPLETE + Q&A AUTHORED  
**Checkpoint:** `SWHNK-C1-PROGRESS-SNAPSHOT-V33`  
**Pacote atual:** `simpleway-hnk@0.36.0`

## Ciclo 1

Árvore reconciliada: L01 Kether, L02 Chokhmah, L03 Binah, L04 Chesed, L05 Gevurah, L06 Yesod, L07 Malkuth.

Contrato pedagógico: **1.008 slots** — 21 orientações docentes, 70 OPI, 35 cenas, 28 Q&A, 14 cabeçalhos estruturais, 35 estruturas, 144 vocabulários, 504 Activation, 154 revisões e 3 selos finais.

## L01 — núcleo validado

- Teacher Notes: **3/3 VALIDATED = 100%**;
- OPI: **10/10 VALIDATED = 100%**;
- Activation: **72/72 VALIDATED = 100%**;
- Structure Headers: **2/2 VALIDATED = 100%**;
- Structures: **5/5 VALIDATED = 100%**.

Teacher Notes permanecem autoria pedagógica governada v1.1, não texto histórico recuperado. Sua validação não cria léxico, gramática ou promoção de autoridade.

## L01 Q&A — 4/4 AUTHORED

Não foi recuperado payload histórico para os quatro Q&A. A fonte confirma apenas a quantidade de quatro slots. Os itens atuais reutilizam perguntas e schemas de resposta já validados:

- `L01-QA-001`: `KALA YA EN ES KU KE` → `[PERSONAL_NAME]`;
- `L01-QA-002`: `EN KU SARASALA KE` → `[CARDINAL_0_99]`;
- `L01-QA-003`: `EN SARADAYA KUVAN KE` → `[PLACE]`;
- `L01-QA-004`: `EN KU VAMAVALA KE` → `[HOBBY_OR_PLEASURE_ACTIVITY]`.

Fronteiras preservadas: `YA/ES` continuam sem glosa histórica token-a-token; `SARASALA` e `VAMAVALA` continuam WATCH; numerais e `KUVAN` continuam CANDIDATE. Zero novas formas HNK e zero regras gramaticais novas.

Gate preparado: `SWHNK-L01-QA-VALIDATION-V1`.

## Progresso L01

L01 target: **155 slots**.

- Teacher Notes VALIDATED: **3**;
- OPI VALIDATED: **10**;
- Q&A AUTHORED: **4**;
- Structure Headers VALIDATED: **2**;
- Structures VALIDATED: **5**;
- Activation VALIDATED: **72**;
- total authored-or-better: **96/155 = 61.9355%**;
- total VALIDATED: **92/155 = 59.3548%**;
- remaining missing/unimplemented: **59**.

Categorias restantes após Q&A: **5 stories, 32 vocabulary e 22 review**.

## Progresso Ciclo 1

Estados exclusivos:

**912 MISSING + 4 AUTHORED + 92 VALIDATED + 0 FROZEN = 1.008**.

Cumulativo authored-or-better: **96/1.008 = 9.5238%**.

Historical evidence: **82/1.008 = 8.1349%**, em eixo separado da implementação atual.

## Corpus linguístico governado

Master Lexicon recuperado: **33 formas totais**, **31 ligadas ao Ciclo 1**, 2 não vinculadas (`VAMATAYA`, `KALIFORNIA`) e 7 frases recuperadas.

Registry autorado `@hnk/linguas/authored`: **14 CANDIDATE forms** — `KUVAN`, `VALA`, `KUON`, `NE`, `BIZO`, `DUVE`, `HOYU`, `KETI`, `LUSO`, `MUPI`, `NURA`, `PEVU`, `TOMI`, `ZOKA`.

Proxy recuperado: **31/144 = 21.5278%**. Proxy de ativos governados: **45/144 = 31.25%**.

## Fronteiras

`hnk-english-app` permanece referência metodológica/arquitetural, não owner do corpus HNK. `@hnk/linguas` é owner linguístico; `@hnk/glyphs` é owner estrutural G01–G40. Candidate D visual continua `PREPRODUCTION_NOT_OFFICIAL`.

CI remoto continua não comprovado até existir execução real de runner.
