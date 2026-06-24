# Spec 004 — Criação do loop principal do jogo

## Objetivo

Implementar o **loop principal de execução** do **Deep Sea Adventure**, o coração do runtime que orquestrará todas as atualizações e renderizações futuras. Esta spec cria o ciclo com `requestAnimationFrame`, delta time, separação `update(dt)` / `render(ctx)` e estados básicos de execução (rodando/pausado), integrando-se ao Canvas configurado na Spec 003. Esta spec **não** introduz entidades, mecânicas ou cenário — apenas o ciclo vazio e funcional.

## Contexto

A Spec 003 configurou o Canvas em `src/game/canvas.js` (contexto 2D, HiDPI, redimensionamento responsivo, método `clear()` com cor de fundo). A próxima etapa prevista no README é a **criação do loop principal do jogo** (etapa 4).

Conforme o README, o projeto será construído de forma incremental. O loop principal é a fundação que conectará todas as entidades futuras (submarino, animais, itens) e as cenas oceânicas, separando a lógica de atualização da lógica de renderização.

## Tarefas

1. **Criar o módulo de Game em `src/game/`**
   - Implementar uma classe/módulo `Game` (ex.: `src/game/game.js`) responsável por:
     - receber a instância de Canvas criada na Spec 003;
     - gerenciar o ciclo de vida (iniciar, pausar, retomar, parar);
     - rodar o loop principal.
   - Expor uma função factory (ex.: `createGame(canvas)`) que retorna a instância com métodos `start()`, `pause()`, `resume()` e `stop()`.

2. **Implementar o loop principal**
   - Usar `requestAnimationFrame` para o ciclo de renderização.
   - Calcular o delta time (tempo entre quadros) em segundos a partir de `performance.now()` ou do `DOMHighResTimeStamp` do callback.
   - Aplicar clamp no delta time (ex.: máximo de `0.1s` / 100ms) para evitar saltos grandes ao voltar de aba inativa ou durante engasgos de frame.
   - Separar duas fases por quadro:
     - `update(dt)` — lógica de estado (vazia por enquanto, apenas placeholder).
     - `render(ctx)` — limpa o canvas (`canvas.clear()`) e desenha o estado atual (por enquanto, apenas o fundo).
   - Cancelar o `requestAnimationFrame` ao parar (`cancelAnimationFrame`).

3. **Estados básicos de execução**
   - O jogo inicia no estado `running`.
   - Pausar automaticamente quando a aba perder visibilidade (`document.visibilitychange` → `pause()` quando `hidden`, `resume()` quando `visible`), evitando delta time explosivo.
   - Garantir que ao retomar, o delta time seja recalculado a partir do momento da retomada (não acumular o tempo pausado).
   - Expor métodos `pause()` e `resume()` para uso futuro (menus, telas auxiliares).

4. **Centralizar configurações em `src/config/`**
   - Criar/estender um módulo de configuração de jogo (ex.: `src/config/game.js`) com valores como:
     - clamp máximo de delta time (em segundos);
     - fps alvo (apenas informativo, já que usamos rAF).
   - Importar essas configurações no módulo `Game` em vez de hardcode.

5. **Conectar o Game ao bootstrap**
   - Em `src/main.js`, instanciar o `Game` usando o Canvas já criado e chamar `start()`.
   - Substituir/complementar o log de carga existente por um log indicando que o loop foi iniciado.
   - Garantir que o `main.js` continue sendo um bootstrap mínimo.

6. **Atualizar o README do projeto**
   - Marcar a Spec 004 como concluída na seção "Status do projeto".
   - Adicionar a Spec 005 como próxima etapa prevista (implementação do submarino).

## Critérios de aceitação

- [x] Existe um módulo `Game` em `src/game/` com ciclo de vida (`start`, `pause`, `resume`, `stop`).
- [x] O loop principal roda via `requestAnimationFrame` com delta time em segundos.
- [x] O delta time tem clamp (não ultrapassa o valor máximo configurado).
- [x] Cada quadro executa `update(dt)` seguido de `render(ctx)`, com `render` limpando o canvas e desenhando o fundo.
- [x] Ao trocar de aba e voltar, o jogo pausa/retoma corretamente sem salto de tempo.
- [x] As configurações de loop estão em `src/config/`, sem valores hardcoded no módulo `Game`.
- [x] `src/main.js` instancia o `Game`, chama `start()` e continua sendo apenas bootstrap.
- [x] `npm run dev` abre a página sem erros no console; o loop roda (verificável por log periódico ou FPS opcional).
- [x] `npm run build` e `npm run lint` executam sem erros.
- [x] O README reflete a Spec 004 como concluída.

## Fora de escopo

- Implementação do submarino ou de qualquer entidade — etapa 5.
- Controles de teclado/mouse — etapa 6.
- Câmera, profundidade, zonas oceânicas.
- Cenário, animais, corais, itens ou conquistas.
- HUD, menus ou telas auxiliares com conteúdo real.
- Otimizações avançadas de renderização (camadas, batching, etc.).

## Próxima etapa

A Spec 005 (`005-submarine.md`) cobrirá a **implementação do submarino** como primeira entidade do jogo, com renderização básica e posição no canvas, preparando o terreno para os controles (Spec 006).
