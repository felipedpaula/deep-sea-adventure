# src/entities

Entidades do jogo: submarino, animais marinhos, corais, itens colecionaveis, etc.

## Padrao de entidade

Cada entidade segue a convencao:

- **estado** — posicao (`x`, `y`) em coordenadas de mundo, dimensoes (`width`, `height`), velocidade e outras propriedades;
- **`update(dt, input, camera)`** — atualiza o estado a cada quadro (recebe o delta time em segundos, o estado de input e a camera);
- **`render(ctx)`** — desenha a entidade no contexto 2D do canvas (em coordenadas de mundo, apos a transformacao da camera).

Entidades sao criadas via factory function (ex.: `createSubmarine(...)`) e conectadas ao loop do `Game` como itens do array de entidades.

- `submarine.js` — submarino controlado pelo jogador (movimentacao por teclado/mouse, aceleracao, suavizacao, inclinacao na direcao do movimento, espelho horizontal conforme a direcao, clamp nas bordas do mundo, calculo de profundidade em metros).
