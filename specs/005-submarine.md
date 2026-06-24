# Spec 005 — Implementação do submarino

## Objetivo

Implementar o **submarino** como a primeira entidade do **Deep Sea Adventure**: o veículo controlado pelo jogador no ambiente oceânico vertical. Esta spec cria a entidade com posição, tamanho, representação visual básica e integração ao loop do jogo. A movimentação por teclado/mouse fica fora de escopo e será tratada na Spec 006 (controles).

## Contexto

A Spec 004 criou o loop principal com `requestAnimationFrame`, delta time e a separação `update(dt)` / `render(ctx)`. A próxima etapa prevista no README é a **implementação do submarino** (etapa 5).

Conforme o README, o jogador controla um submarino em um ambiente oceânico vertical e o faz descer progressivamente pelo oceano. O submarino poderá navegar livremente pela tela nos eixos X e Y, embora o curso natural da jornada seja uma descida. O submarino é a entidade central do jogo — todas as outras mecânicas (profundidade, cenário, itens, conquistas) se relacionam com ele.

Esta spec estabelece também o padrão de arquitetura de entidades que será reutilizado futuramente (animais, corais, itens colecionáveis).

## Tarefas

1. **Definir o padrão de entidade**
   - Estabelecer uma convenção de entidade em `src/entities/` com:
     - estado (posição `x`/`y`, dimensões `width`/`height`, velocidade);
     - método `update(dt)`;
     - método `render(ctx)`.
   - Pode ser um objeto literal, factory function ou classe — escolher a abordagem mais simples e consistente com o código existente.
   - Documentar a convenção no README interno de `src/entities/`.

2. **Criar a entidade do submarino em `src/entities/`**
   - Implementar `src/entities/submarine.js` com:
     - posição inicial (ex.: centro horizontal, topo vertical do canvas);
     - dimensões (largura/altura) razoáveis para o veículo;
     - propriedades de velocidade (para uso futuro pelos controles);
     - método `update(dt)` — por enquanto vazio ou apenas mantendo estado (sem movimento autônomo).
     - método `render(ctx)` — desenha o submarino no canvas.
   - Exportar uma factory (ex.: `createSubmarine(canvas)` ou `createSubmarine({ width, height })`) que inicializa a entidade com base nas dimensões do canvas.

3. **Representação visual básica**
   - Como ainda não há assets visuais reais (sprites/imagens), desenhar o submarino com formas geométricas via Canvas 2D API, em um estilo moderno (não o formato "convencional" de charuto + torre):
     - casco em formato de cápsula/teardrop (oval horizontal, arredondado à frente, afilado à retaguarda);
     - cabina bubble (canopy arredondado no topo à frente, estilo submersível moderno de exploração);
     - hidrofólios (asas laterais) em vez de torre tradicional;
     - hélice pequena à retaguarda.
   - Usar cores do tema definido em `src/config/theme.js` (ex.: `accent` para o casco).
   - A representação é um placeholder visual; assets reais virão em etapas posteriores (polimento visual).

4. **Integrar o submarino ao loop do jogo**
   - Instanciar o submarino em `src/main.js` (ou em um módulo de aplicação dedicado).
   - Conectar `submarine.update(dt)` e `submarine.render(ctx)` ao loop do `Game`:
     - `update(dt)` do Game chama `submarine.update(dt)`.
     - `render()` do Game chama `canvas.clear()` e em seguida `submarine.render(ctx)`.
   - Garantir que o submarino seja desenhado a cada quadro sobre o fundo oceânico.

5. **Configurações em `src/config/`**
   - Criar `src/config/submarine.js` com valores como:
     - largura e altura do submarino (em pixels CSS);
     - velocidade base (para uso futuro pelos controles);
     - cores do casco, cabina, hidrofólios e hélice (ou referência ao tema).
   - Importar essas configurações em `src/entities/submarine.js` em vez de hardcode.

6. **Atualizar o README do projeto**
   - Marcar a Spec 005 como concluída na seção "Status do projeto".
   - Adicionar a Spec 006 como próxima etapa prevista (controles).

## Critérios de aceitação

- [x] Existe um padrão de entidade documentado em `src/entities/` com `update(dt)` e `render(ctx)`.
- [x] `src/entities/submarine.js` implementa o submarino com posição, dimensões, velocidade e métodos `update`/`render`.
- [x] O submarino é desenhado no canvas com formas geométricas (estilo moderno) usando cores do tema.
- [x] O submarino aparece inicialmente em uma posição sensata (ex.: centro horizontal, topo vertical).
- [x] O submarino é atualizado e renderizado a cada quadro pelo loop do `Game`.
- [x] As configurações do submarino estão em `src/config/submarine.js`, sem valores hardcoded na entidade.
- [x] `npm run dev` abre a página sem erros no console e mostra o submarino sobre o fundo oceânico.
- [x] `npm run build` e `npm run lint` executam sem erros.
- [x] O README reflete a Spec 005 como concluída.

## Fora de escopo

- Controles de teclado/mouse (setas/WASD, Shift, botões do mouse) — etapa 6.
- Movimentação autônoma do submarino.
- Câmera, profundidade e zonas oceânicas — etapa 7.
- Animações de hélice em movimento.
- Sprites ou assets visuais reais — etapa de polimento.
- Colisões com outras entidades (animais, itens).
- HUD mostrando informações do submarino.

## Próxima etapa

A Spec 006 (`006-controls.md`) cobrirá a **implementação dos controles** por teclado e mouse definidos no README (setas/WASD movimentam, Shift acelera, botão esquerdo movimenta, botão direito acelera), conectando o input do jogador à entidade submarino criada nesta spec. O submarino poderá navegar livremente pelos eixos X e Y, com o curso natural da jornada sendo uma descida progressiva.
