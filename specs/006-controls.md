# Spec 006 — Implementação dos controles

## Objetivo

Implementar os **controles** que conectam o input do jogador à entidade **submarino** criada na Spec 005, permitindo movimentação livre pelos eixos X e Y da tela via teclado e mouse, com mecanismo de aceleração. Esta spec **não** introduz câmera, profundidade, cenário, colisões nem HUD — apenas o sistema de input e a movimentação do submarino.

## Contexto

A Spec 005 criou o submarino como primeira entidade, com posição, dimensões, velocidade e métodos `update(dt)` / `render(ctx)`. O `update` está vazio (sem movimento autônomo). A próxima etapa prevista no README é a **implementação dos controles** (etapa 6).

Conforme o README, a movimentação será feita por teclado e mouse:

* Setas do teclado ou WASD: movimentam o submarino.
* Shift: acelera o movimento.
* Botão esquerdo do mouse: movimenta o submarino.
* Botão direito do mouse: acelera o movimento.

O submarino poderá navegar livremente pela tela nos eixos X e Y, embora o curso natural da jornada seja uma descida progressiva pelo oceano (a profundidade/câmera ficam para a Spec 007).

## Tarefas

1. **Criar um módulo de input em `src/game/`**
   - Implementar um módulo (ex.: `src/game/input.js`) responsável por:
     - rastrear o estado das teclas (setas/WASD + Shift);
     - rastrear o estado dos botões do mouse (esquerdo = movimentação, direito = aceleração);
     - rastrear a posição do cursor no canvas (para direção via mouse);
     - expor um snapshot read-only do estado a cada quadro.
   - Exportar uma factory (ex.: `createInput(canvas)`) que registra os listeners e retorna `{ getState(), destroy() }`.
   - Remover os listeners ao destruir para evitar vazamentos.

2. **Mapear teclado**
   - Ouvir `keydown` e `keyup` em `window` para:
     - `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` — direção de movimentação;
     - `KeyW`, `KeyS`, `KeyA`, `KeyD` — direção de movimentação (alternativa às setas, evita ghosting do teclado);
     - `ShiftLeft`/`ShiftRight` — aceleração.
   - Ignorar repetição automática (`e.repeat`) para evitar acúmulo.
   - Prevenir o comportamento padrão da página (scroll) para essas teclas.

3. **Mapear mouse**
   - Ouvir `mousedown`, `mouseup` e `mousemove` no canvas para:
     - botão esquerdo (`button === 0`) — movimentação (na direção do cursor relativo ao submarino);
     - botão direito (`button === 2`) — aceleração.
   - Ouvir `contextmenu` no canvas e prevenir o menu padrão do navegador.
   - Converter as coordenadas do evento para pixels CSS do canvas (considerando `getBoundingClientRect`).

4. **Combinar inputs**
   - Definir a direção de movimento resultante:
     - se houver setas/WASD pressionados, usar o vetor resultante;
     - caso contrário, se o botão esquerdo estiver pressionado, usar o vetor do cursor → submarino (normalizado);
     - ambos podem operar de forma complementar, mas definir uma precedência clara quando houver conflito.
   - Definir o estado de aceleração:
     - acelera se `Shift` OU botão direito estiverem pressionados.

5. **Aplicar a movimentação ao submarino**
   - Atualizar `src/entities/submarine.js` para consumir o estado de input no `update(dt)`:
     - calcular velocidade a partir de `state.speed` e do multiplicador de aceleração;
     - atualizar `state.x` / `state.y` com base na direção e na velocidade, escalada por `dt`;
     - suavizar a mudança de direção/velocidade (opcional, ex.: interpolação simples) para deixar o movimento natural.
   - Adicionar um multiplicador de aceleração em `src/config/submarine.js` (ex.: `boostMultiplier: 2`).

6. **Limitar à área da tela**
   - Garantir que o submarino não saia dos limites do canvas (clamp em `x`/`y` considerando suas dimensões).
   - Reavudir o clamp a cada `update` pois o canvas pode ser redimensionado.

7. **Conectar o input ao loop do jogo**
   - Instanciar o input em `src/main.js` passando o canvas.
   - Passar o estado de input ao `submarine.update(dt)` (ex.: injetar via factory ou via parâmetro).
   - Garantir que o `Game` chame `submarine.update(dt, inputState)` a cada quadro.
   - Pausar/frear o input quando o jogo estiver pausado (o loop já para de chamar `update`).

8. **Configurações em `src/config/`**
   - Estender `src/config/submarine.js` com:
     - multiplicador de aceleração;
     - suavização/interpolação (opcional).
   - Manter valores em config, sem hardcode na entidade.

9. **Atualizar o README do projeto**
   - Marcar a Spec 006 como concluída na seção "Status do projeto".
   - Adicionar a Spec 007 como próxima etapa prevista (profundidade e câmera).

## Critérios de aceitação

- [x] Existe um módulo `src/game/input.js` que rastreia teclado (setas/WASD + Shift) e mouse (botões + posição).
- [x] As setas (ou WASD) movimentam o submarino nos eixos X e Y.
- [x] O Shift acelera o movimento (multiplicador de velocidade).
- [x] O botão esquerdo do mouse movimenta o submarino na direção do cursor.
- [x] O botão direito do mouse acelera o movimento.
- [x] O menu de contexto do navegador não aparece ao clicar com o botão direito no canvas.
- [x] O submarino não sai dos limites do canvas (clamp nas bordas).
- [x] O movimento é suave e baseado em delta time (independente de frame rate).
- [x] O input é limpo ao destruir (sem listeners pendurados).
- [x] As configurações de aceleração estão em `src/config/submarine.js`.
- [x] `npm run dev` abre a página sem erros no console e o submarino responde aos controles.
- [x] `npm run build` e `npm run lint` executam sem erros.
- [x] O README reflete a Spec 006 como concluída.

## Fora de escopo

- Câmera, profundidade e zonas oceânicas — etapa 7.
- Cenário, animais, corais, itens ou conquistas.
- Colisões com outras entidades.
- HUD mostrando velocidade, profundidade ou outras informações.
- Animações de hélice em movimento (girando).
- Suporte a gamepad/touch (foco em teclado + mouse por enquanto).
- Inércia/física avançada (a menos que a suavização opcional seja implementada).

## Próxima etapa

A Spec 007 (`007-depth-and-camera.md`) cobrirá a **simulação de profundidade e câmera**, fazendo com que o submarino desça progressivamente pelo oceano e a câmera o acompanhe, dando início às zonas oceânicas e à variação visual conforme a profundidade.
