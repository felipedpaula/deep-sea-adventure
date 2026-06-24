# Spec 007 — Simulação de profundidade e câmera

## Objetivo

Implementar a **simulação de profundidade** e o **sistema de câmera** do **Deep Sea Adventure**, fazendo com que o submarino desça progressivamente pelo oceano e a câmera o acompanhe, dando início à noção de profundidade contínua e preparando o terreno para as zonas oceânicas e a variação visual conforme a profundidade. Esta spec **não** introduz cenário, animais, itens nem HUD — apenas a câmera, o conceito de profundidade e o gradiente visual de fundo.

## Contexto

A Spec 006 implementou os controles (setas/WASD + Shift + mouse) e a movimentação livre do submarino pelos eixos X e Y com clamp nas bordas do canvas. A próxima etapa prevista no README é a **simulação de profundidade e câmera** (etapa 7).

Conforme o README, o submarino desce progressivamente pelo oceano e novas zonas são apresentadas conforme a profundidade aumenta, com mudanças na iluminação e nos elementos visuais. Para suportar isso, precisamos de:

1. **Câmera** — uma transformação que acompanha o submarino, permitindo que o mundo seja maior que a viewport.
2. **Profundidade** — uma métrica contínua (em metros) que reflete quão fundo o submarino está.
3. **Mundo vertical** — o submarino deixa de ficar preso ao tamanho da viewport e passa a poder descer indefinidamente (ou até um limite máximo definido).
4. **Gradiente de fundo** — a cor de fundo muda conforme a profundidade, simulando o escurecimento progressivo do oceano.

## Tarefas

1. **Criar o módulo de câmera em `src/game/`**
   - Implementar `src/game/camera.js` com:
     - posição da câmera (`x`, `y`) no mundo;
     - dimensões da viewport (largura/altura do canvas);
     - método `follow(target)` — centraliza a câmera no alvo (submarino), com clamp nos limites do mundo;
     - método `worldToScreen(x, y)` — converte coordenadas de mundo para coordenadas de tela;
     - método `screenToWorld(x, y)` — converte coordenadas de tela para coordenadas de mundo (útil para input via mouse);
     - método `apply(ctx)` — aplica a transformação no contexto (translate) antes de renderizar o mundo.
   - Exportar uma factory `createCamera({ worldWidth, worldHeight, viewportWidth, viewportHeight })`.

2. **Definir o mundo em `src/config/`**
   - Criar `src/config/world.js` com:
     - `width` — largura do mundo correspondente a 300 metros (3000px, considerando 10px/m);
     - `height` — altura do mundo representando a profundidade máxima do oceano (20000px = 2000m);
     - `startDepth` — profundidade inicial em metros (15m);
     - `pixelsPerMeter` — escala de conversão entre pixels e metros (10px = 1m);
     - `maxDepth` — profundidade máxima em metros (2000m);
     - `wallWidth` — largura visual dos paredões laterais (em pixels);
     - `wallColor` — cor dos paredões laterais.
   - Importar essas configurações na câmera e no submarino.

3. **Adaptar o submarino ao sistema de mundo**
   - O submarino passa a operar em **coordenadas de mundo** (não mais coordenadas de tela).
   - O clamp de bordas agora usa as dimensões do mundo (não mais do canvas).
   - Calcular e expor a **profundidade** do submarino (em metros) a partir de `state.y` e `pixelsPerMeter`.
   - A posição inicial do submarino deve ser próximo à superfície (topo do mundo).

4. **Integrar a câmera ao loop do jogo**
   - A câmera deve seguir o submarino a cada quadro (em `update`).
   - A câmera centraliza o submarino em **ambos os eixos X e Y**, mantendo-o no centro da tela sempre que possível.
   - Quando o submarino se aproxima das bordas laterais (paredões) ou das extremidades verticais (superfície/fundo), a câmera faz clamp nos limites do mundo e o submarino aparenta se mover em direção à borda da tela — comportamento idêntico nos dois eixos.
   - No `render`, aplicar a transformação da câmera antes de desenhar as entidades do mundo:
     - `canvas.clear()` — limpa com a cor de fundo atual (gradiente conforme profundidade);
     - `camera.apply(ctx)` — translada o contexto;
     - desenhar paredões laterais (em coordenadas de mundo);
     - desenhar entidades (submarino) em coordenadas de mundo;
     - restaurar o contexto.
   - Entidades que pertencem ao mundo (submarino, futuros animais, itens) são desenhadas após a transformação da câmera.
   - Entidades de interface (HUD, futuras) continuam em coordenadas de tela (sem câmera).

5. **Gradiente de fundo conforme a profundidade**
   - Substituir a cor de fundo sólida por um gradiente vertical que varia conforme a profundidade:
     - superfície: tom mais claro/azulado;
     - profundidade média: tom intermediário;
     - profundidade máxima: tom muito escuro/próximo ao preto.
   - Implementar uma função que interpola a cor de fundo com base na profundidade atual da câmera/submarino.
   - Definir as cores de parada do gradiente em `src/config/world.js` ou em `src/config/theme.js`.
   - O gradiente pode ser desenhado cobrindo a viewport (em coordenadas de tela, antes de aplicar a câmera) ou como um gradiente do mundo (cobrindo toda a altura do mundo). Escolher a abordagem mais simples e performática.

6. **Ajustar o input do mouse para coordenadas de mundo**
   - O botão esquerdo do mouse movimenta o submarino na direção do cursor.
   - Como o submarino está em coordenadas de mundo, converter a posição do cursor (coordenadas de tela) para coordenadas de mundo usando `camera.screenToWorld(x, y)` antes de calcular a direção.
   - Garantir que isso aconteça no `update` do submarino, recebendo a câmera (ou a posição convertida) como referência.

7. **Conectar tudo no bootstrap**
   - Em `src/main.js`:
     - criar a câmera com as dimensões do mundo e da viewport;
     - passar a câmera ao `Game`;
     - passar a câmera (ou o mundo) ao submarino para clamp correto.
   - O `Game` recebe a câmera e a usa no `update` (follow) e no `render` (apply).

8. **Atualizar o README do projeto**
   - Marcar a Spec 007 como concluída na seção "Status do projeto".
   - Adicionar a Spec 008 como próxima etapa prevista (cenário oceânico).

9. **Paredões laterais**
   - Renderizar dois paredões verticais nas bordas laterais do mundo (x=0 e x=`worldWidth`), estendendo por toda a altura do mundo (0 a `worldHeight`).
   - Formas geométricas simples (retângulos com cor definida em `src/config/world.js`).
   - Renderizados no `render` do `Game`, após `camera.apply(ctx)`, em coordenadas de mundo.
   - O clamp do submarino já impede a passagem pelas bordas — os paredões são feedback visual que delimita o ambiente de exploração.

## Critérios de aceitação

- [x] Existe um módulo `src/game/camera.js` com `follow`, `worldToScreen`, `screenToWorld` e `apply`.
- [x] O mundo tem dimensões definidas em `src/config/world.js` (largura e altura maiores que a viewport).
- [x] O submarino opera em coordenadas de mundo e faz clamp nas bordas do mundo (não mais da viewport).
- [x] A câmera segue o submarino a cada quadro, mantendo-o visível na tela.
- [x] A profundidade do submarino é calculada em metros a partir de `state.y` e `pixelsPerMeter`.
- [x] O fundo do canvas muda de cor conforme a profundidade (gradiente vertical, mais escuro ao descer).
- [x] O input do mouse funciona corretamente com a câmera (direção do cursor convertida para coordenadas de mundo).
- [x] O submarino pode descer além da altura da viewport (a câmera o acompanha).
- [x] A largura do mundo corresponde a 300 metros (3000px).
- [x] Existem paredões visíveis nas duas bordas laterais do mundo.
- [x] O submarino não atravessa os paredões (clamp nas bordas).
- [x] O submarino permanece centralizado na tela quando está no meio do mundo (eixo X).
- [x] Ao se aproximar dos paredões, o submarino aparenta se mover em direção à borda da tela (câmera faz clamp).
- [x] `npm run dev` abre a página sem erros no console; o submarino se move e a câmera o segue, com o fundo escurecendo ao descer.
- [x] `npm run build` e `npm run lint` executam sem erros.
- [x] O README reflete a Spec 007 como concluída.

## Fora de escopo

- Cenário oceânico detalhado (rochas, corais, fundo do mar) — etapa 8.
- Animais, corais e elementos visuais — etapa 9.
- Itens colecionáveis e conquistas.
- HUD mostrando profundidade (será tratado quando o HUD for implementado).
- Zonas oceânicas nomeadas com transições bruscas (o gradiente contínuo desta spec é a base; zonas definidas podem vir depois).
- Parallax ou camadas de fundo (polimento futuro).
- Textura detalhada dos paredões (rochas, corais) — etapa 8 (cenário).
- Efeitos visuais ao bater nos paredões.
- Limite de oxigênio ou mecânicas de sobrevivência.

## Próxima etapa

A Spec 008 (`008-ocean-scenery.md`) cobrirá a **criação do cenário oceânico**, adicionando elementos visuais ao mundo (rochas, corais, vegetação submarina, fundo do mar) que dão contexto à descida do submarino, utilizando o sistema de câmera e profundidade implementado nesta spec.
