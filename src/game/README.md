# src/game

Logica principal do jogo: loop, estados, orquestracao de cenas e sistemas.

- `canvas.js` — configuracao do Canvas (contexto 2d, suporte a HiDPI, redimensionamento responsivo, gradiente de fundo conforme profundidade).
- `game.js` — loop principal (requestAnimationFrame, delta time, estados running/paused/stopped, update/render, integracao com camera).
- `input.js` — sistema de input (teclado: setas/WASD + Shift; mouse: botoes + posicao do cursor).
- `camera.js` — camera que segue o submarino pelo mundo (follow, worldToScreen, screenToWorld, apply).
