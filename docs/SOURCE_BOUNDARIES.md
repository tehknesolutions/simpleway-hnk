# SimpleWay HNK — Source Boundaries

## Regra central

`simpleway-hnk` é o repositório do curso e do produto educacional. Ele consome autoridades linguísticas compartilhadas sem reescrevê-las silenciosamente.

| Fonte | Pode ler/reutilizar? | Pode escrever conteúdo HNK nela a partir deste projeto? | Papel |
|---|---|---|---|
| `tehknesolutions/simpleway-hnk` | Sim | Sim | curso, app, releases, currículo e exercícios HNK |
| `codex-hnk/packages/hnk-linguas` | Sim | somente por mudança canônica deliberada no projeto proprietário | léxico/frases/bindings/governança |
| `codex-hnk/packages/hnk-glyphs` | Sim | somente por mudança canônica deliberada no projeto proprietário | G01–G40, fonemas, runtime visual/encoding |
| `hnk-english-app` | Sim, como referência | Não | SimpleWay English; referência pedagógica/UX/arquitetural |

## Classes de material

### CANON / FROZEN
Pode entrar em releases publicáveis conforme sua versão e escopo.

### WATCH / CANDIDATE / GATE
Pode aparecer em ambientes de teste, auditoria ou conteúdo explicitamente rotulado, mas não deve ser promovido silenciosamente.

### RECOVERED LEGACY
Serve como evidência arqueológica. Precisa ser reconciliado contra o registry atual antes de voltar para produção.

### CURRICULUM STRUCTURE
Pode ser reutilizado como arquitetura pedagógica sem implicar que exista uma tradução/forma HNK aprovada para cada slot.

### UNKNOWN / NULL
Deve permanecer desconhecido. Nunca preencher por plausibilidade sonora, associação visual, numerologia ou tradução automática.

## Regra de dependência

Sempre que possível, o app deve referenciar IDs estáveis (`LEX-*`, `PHR-*`, `G01–G40`) e armazenar no conteúdo pedagógico apenas o que é próprio da Lesson. Isso reduz duplicação e permite auditar drift entre curso e linguagem.
