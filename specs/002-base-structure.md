# Spec 002 — Estrutura base com HTML, CSS e JavaScript

## Objetivo

Consolidar a **estrutura base** do **Deep Sea Adventure** em HTML, CSS e JavaScript, criando a fundação de interface e organização de módulos que sustentará o Canvas, o loop principal e todas as funcionalidades futuras. Esta spec **não** implementa o Canvas nem o loop do jogo — apenas prepara o markup semântico, o layout de interface, o CSS organizado e os módulos JavaScript base.

## Contexto

A Spec 001 configurou o projeto (Vite, pastas, `index.html` com `<canvas id="game-canvas">`, `src/main.js`, CSS base e lint). A etapa 2 prevista no README é a **criação da estrutura base com HTML, CSS e JavaScript**.

Conforme o README, a renderização principal será feita no `<canvas>` via Canvas 2D API, enquanto HTML/CSS cuidam da interface (menus, HUD, telas auxiliares e informações de progresso). Esta spec prepara esse canal de interface e a organização modular do JavaScript para que as próximas etapas (Canvas e loop) possam ser conectadas sem reestruturação.

## Tarefas

1. **Reestruturar o `index.html`**
   - Manter o `<canvas id="game-canvas">`.
   - Adicionar markup semântico para a interface do jogo:
     - `<div id="app">` como container raiz da aplicação.
     - `<section id="hud">` placeholder para o HUD (profundidade, pontuação, etc. — sem conteúdo real ainda).
     - `<aside id="menus">` placeholder para menus/telas auxiliares (pausa, conquistas, etc. — sem conteúdo real ainda).
   - Garantir metadados já definidos (charset, viewport, `lang="pt-BR"`, title).
   - Referenciar `/src/main.js` como módulo.

2. **Organizar o CSS**
   - Manter `src/styles/main.css` como folha de entrada/reset.
   - Criar folhas separadas para responsabilidades distintas (importadas a partir de `main.css` ou de `main.js`):
     - `src/styles/base.css` — reset, tipografia, variáveis globais (cores oceânicas, espaçamentos).
     - `src/styles/layout.css` — layout do `#app`, canvas fullscreen, posicionamento de HUD/menus.
     - `src/styles/hud.css` — estilos do placeholder do HUD.
     - `src/styles/menus.css` — estilos do placeholder de menus.
   - Usar CSS custom properties (variáveis) para o tema oceânico (cor de fundo, cor de texto, destaque).
   - Garantir que o canvas continue ocupando a viewport e que a interface se sobreponha a ele sem removê-lo do fluxo.

3. **Reorganizar o ponto de entrada JavaScript**
   - Manter `src/main.js` como bootstrap mínimo: importar os estilos e inicializar a estrutura da aplicação.
   - Criar um módulo em `src/ui/` responsável por referenciar os elementos de interface do DOM (canvas, hud, menus) e expor referências para uso futuro.
   - Remover o `console.info` provisório da Spec 001 ou substituí-lo por um log mais contextual.

4. **Criar módulos base de aplicação**
   - `src/ui/dom.js` (ou similar) — centraliza as referências aos elementos do DOM.
   - `src/config/theme.js` (ou similar) — define valores de tema (cores, variáveis) reutilizáveis entre CSS e JS, se aplicável.
   - Garantir que os módulos estejam vazios/placeholder por ora, apenas com a estrutura e exports básicos.

5. **Manter a separação de responsabilidades**
   - Confirmar que as pastas criadas na Spec 001 (`src/game`, `src/entities`, `src/scenes`, `src/assets`, `src/config`, `src/ui`, `src/utils`, `src/styles`) estão coerentes com a nova estrutura.
   - Atualizar os `README.md` internos das pastas se a descrição de responsabilidade mudar.

6. **Atualizar o README do projeto**
   - Marcar a Spec 002 como concluída na seção "Status do projeto".
   - Adicionar a Spec 003 como próxima etapa prevista (Canvas).

## Critérios de aceitação

- [x] `index.html` contém `<canvas id="game-canvas">`, `#app`, `#hud` e `#menus` com markup semântico.
- [x] O CSS está dividido em folhas por responsabilidade (`base.css`, `layout.css`, `hud.css`, `menus.css`) com variáveis de tema oceânico.
- [x] O canvas continua ocupando a viewport; HUD e menus aparecem como camadas sobrepostas (invisíveis/placeholder por enquanto).
- [x] `src/main.js` faz apenas bootstrap e delega para os módulos de UI.
- [x] Existem módulos base em `src/ui/` e `src/config/` com exports utilizáveis.
- [x] `npm run dev` abre a página sem erros no console.
- [x] `npm run build` e `npm run lint` executam sem erros.
- [x] O README reflete a Spec 002 como concluída.

## Fora de escopo

- Implementação do Canvas (renderização 2D, contexto, DPI) — etapa 3.
- Loop principal do jogo (`requestAnimationFrame`, delta time) — etapa 4.
- Mergulhador, controles, câmera, profundidade.
- Cenário, animais, corais, itens ou conquistas.
- Conteúdo real de HUD ou menus (apenas placeholders estruturais).

## Próxima etapa

A Spec 003 (`003-canvas-implementation.md`) cobrirá a **implementação do Canvas** (configuração do contexto 2D, suporte a DPI, redimensionamento responsivo), dando início à camada de renderização que será usada pelo loop principal na Spec 004.
