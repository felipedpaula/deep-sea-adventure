# Spec 003 — Implementação do Canvas

## Objetivo

Configurar a camada de renderização do **Deep Sea Adventure** preparando o `<canvas>` para uso efetivo: obter o contexto 2D, suportar alta densidade de pixels (HiDPI), tornar o canvas responsivo ao tamanho da janela e centralizar o acesso ao contexto em um módulo dedicado. Esta spec **não** implementa o loop principal nem renderiza conteúdo de jogo — apenas prepara o Canvas para ser usado pelas próximas etapas.

## Contexto

A Spec 002 consolidou a estrutura base de HTML, CSS e JavaScript: markup semântico com `#app`, `#hud` e `#menus`, CSS modular com variáveis de tema e módulos de UI (`src/ui/dom.js`) e tema (`src/config/theme.js`). A próxima etapa prevista no README é a **implementação do Canvas** (etapa 3).

Conforme o README, a renderização principal será feita no `<canvas>` via Canvas 2D API. Esta spec ativa essa camada de renderização, deixando-a pronta para o loop principal (Spec 004) e para as entidades futuras (submarino, animais, itens).

## Tarefas

1. **Criar um módulo de Canvas em `src/game/`**
   - Implementar um módulo (ex.: `src/game/canvas.js`) responsável por:
     - receber a referência do elemento `<canvas>`;
     - obter e armazenar o contexto `2d`;
     - expor o contexto para uso por outros módulos.
   - Exportar uma função factory (ex.: `createCanvas(canvasElement)`) que retorna um objeto com `{ element, ctx, resize }` ou similar.

2. **Suporte a alta densidade de pixels (HiDPI)**
   - Ler `window.devicePixelRatio` ao configurar o canvas.
   - Ajustar `canvas.width` e `canvas.height` para `clientWidth * dpr` / `clientHeight * dpr`.
   - Aplicar `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` (ou equivalente) para que as coordenadas de desenho continuem em pixels CSS.
   - Garantir que o desenho seja nítido em telas Retina/HiDPI.

3. **Redimensionamento responsivo**
   - Expor um método `resize()` que recalcula as dimensões e a escala com base no tamanho atual do elemento.
   - Ouvir o evento `resize` de `window` e chamar `resize()` automaticamente.
   - Garantir que o redimensionamento não acumule transformações erradas (resetar antes de aplicar a nova escala).

4. **Conectar o Canvas ao bootstrap**
   - Em `src/main.js` (ou em um módulo de aplicação dedicado), inicializar o Canvas usando a referência obtida via `src/ui/dom.js`.
   - Manter o `main.js` como bootstrap: instanciar o Canvas e mantê-lo disponível para as próximas etapas (sem iniciar loop de jogo ainda).
   - Remover/complementar o log de carga existente com um log indicando que o Canvas foi configurado, incluindo as dimensões iniciais.

5. **Validação visual mínima**
   - Após configurar o canvas, desenhar uma única vez um retângulo/cor de fundo usando a cor de fundo do tema (`src/config/theme.js`) para confirmar que o contexto está funcional.
   - Esse desenho é apenas um sanity check; a renderização contínua fica para o loop principal (Spec 004).

6. **Configurações em `src/config/`**
   - Adicionar (ou estender um módulo em) `src/config/` com valores relevantes ao Canvas, como:
     - cor de fundo inicial;
     - flag/clamp de DPI máximo (opcional, para evitar exaustão de memória em dispositivos com DPR muito alto).
   - Importar essas configurações no módulo de Canvas em vez de hardcode.

7. **Atualizar o README do projeto**
   - Marcar a Spec 003 como concluída na seção "Status do projeto".
   - Adicionar a Spec 004 como próxima etapa prevista (loop principal).

## Critérios de aceitação

- [x] Existe um módulo em `src/game/` que encapsula a configuração do Canvas (contexto 2D, DPI, resize).
- [x] O canvas é desenhado de forma nítida em telas HiDPI (buffer escalado por `devicePixelRatio`).
- [x] Redimensionar a janela atualiza as dimensões do canvas sem distorcer nem acumular transformações.
- [x] As coordenadas de desenho continuam em pixels CSS após o redimensionamento.
- [x] O contexto 2D é exposto de forma reutilizável para módulos futuros.
- [x] Um desenho inicial (cor de fundo) confirma que o contexto está funcional ao carregar a página.
- [x] As configurações de Canvas estão em `src/config/`, sem valores hardcoded no módulo.
- [x] `npm run dev` abre a página sem erros no console.
- [x] `npm run build` e `npm run lint` executam sem erros.
- [x] O README reflete a Spec 003 como concluída.

## Fora de escopo

- Loop principal do jogo (`requestAnimationFrame`, delta time) — etapa 4.
- Renderização contínua ou animações.
- Submarino, controles, câmera, profundidade.
- Cenário, animais, corais, itens ou conquistas.
- HUD, menus ou telas auxiliares com conteúdo real.

## Próxima etapa

A Spec 004 (`004-game-loop.md`) cobrirá a **criação do loop principal do jogo** com `requestAnimationFrame`, delta time e a separação `update(dt)` / `render(ctx)`, usando o Canvas configurado nesta spec.
