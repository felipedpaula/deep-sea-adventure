# Spec 008 — Ambientes oceânicos por profundidade

## Objetivo

Reestruturar o cenário do **Deep Sea Adventure** em **ambientes oceânicos progressivos por profundidade**, criando uma jornada visual clara do topo ao fundo do oceano. A proposta desta spec é estabelecer uma progressão de jogo baseada em **faixas de profundidade** com identidade visual própria, priorizando legibilidade, atmosfera e sensação de avanço, sem buscar rigor científico absoluto.

Nesta primeira implementação, os ambientes devem ser construídos apenas com **cenário, iluminação, cores, relevo e elementos visuais estáticos**. Ainda **não** haverá animais nem itens colecionáveis.

## Contexto

A Spec 007 implementou a câmera, o mundo vertical, a profundidade, o gradiente da água, os raios de sol e os paredões laterais. A implementação inicial da Spec 008 adicionou apenas terreno básico, mas agora a direção do projeto mudou: em vez de um cenário genérico, o jogo deve apresentar uma **descida em etapas**, onde cada faixa de profundidade introduz um novo ambiente.

Essa divisão existe para:

1. reforçar a sensação de progressão durante a exploração;
2. dar identidade própria a diferentes partes do oceano;
3. preparar o terreno para futuras etapas com fauna, colecionáveis e efeitos especiais;
4. tornar a descida mais interessante visualmente, mesmo antes de haver mecânicas avançadas.

## Ambientes desta spec

Os ambientes do oceano devem ser divididos da seguinte forma:

1. **Recifes tropicais (`0m a 200m`)**
   - Ambiente inicial.
   - Mais claro, colorido e visualmente acolhedor.
   - Combina águas rasas, corais, algas e conchas.
   - Nesta primeira implementação, ainda não haverá animais e colecionáveis.

2. **Zona Crepuscular (`200m a 500m`)**
   - Região de transição.
   - A luz solar começa a desaparecer.
   - Deve transmitir águas mais abertas, redução gradual da iluminação e sensação crescente de profundidade.
   - Nesta primeira implementação, ainda não haverá animais e colecionáveis.

3. **Zona da Meia-noite (`500m a 1000m`)**
   - Ambiente mais escuro, frio e misterioso.
   - Quase sem luz solar.
   - A paisagem deve usar tons mais profundos, maior contraste visual e elementos luminosos sutis simulando bioluminescência.
   - Nesta primeira implementação, ainda não haverá animais e colecionáveis.

4. **Planície Abissal (`1000m a 1500m`)**
   - Região ampla, silenciosa e sedimentar.
   - Deve transmitir relevo mais aberto, rochas isoladas, partículas suspensas e atmosfera de isolamento.
   - Nesta primeira implementação, ainda não haverá animais e colecionáveis.

5. **Fossa Oceânica (`1500m a 2200m`)**
   - Ambiente final desta etapa.
   - Muito profundo, hostil e quase totalmente escuro.
   - A paisagem deve ser mais vertical, opressiva e ameaçadora.
   - Representa o ponto mais profundo da exploração nesta fase do jogo.
   - Nesta primeira implementação, ainda não haverá animais e colecionáveis.

## Tarefas

1. **Ajustar a configuração do mundo em `src/config/world.js`**
   - Atualizar a profundidade máxima do mundo para suportar a nova progressão até **2200m**.
   - Garantir consistência entre:
     - `height` do mundo;
     - `pixelsPerMeter`;
     - `maxDepth`;
     - profundidade inicial do submarino.
   - Adicionar uma configuração explícita das faixas de ambiente, incluindo:
     - nome do ambiente;
     - profundidade mínima;
     - profundidade máxima;
     - cores-base;
     - intensidade de iluminação;
     - elementos visuais permitidos naquela faixa.

2. **Transformar a Spec 008 em um sistema de ambientes**
   - O cenário não deve mais ser tratado como um bloco visual único.
   - Implementar um sistema em que a renderização consulta a profundidade atual e a faixa correspondente para decidir como desenhar o ambiente.
   - O código pode usar um módulo central como `src/scenes/ocean-scenery.js` e submódulos auxiliares, se necessário.

3. **Implementar o ambiente de Recifes tropicais (`0m a 200m`)**
   - Visual mais claro e vibrante que o restante do oceano.
   - Reforçar águas rasas com luz mais presente.
   - Incluir elementos estáticos como:
     - corais;
     - algas;
     - conchas;
     - formações decorativas simples de recife.
   - O objetivo é criar um ambiente convidativo e introdutório.

4. **Implementar o ambiente da Zona Crepuscular (`200m a 500m`)**
   - Reduzir gradualmente a presença da luz.
   - Diminuir a saturação e a densidade visual em relação aos recifes.
   - Criar sensação de transição entre um ambiente vivo e outro mais misterioso.
   - Manter o espaço mais aberto, com menos elementos agrupados.

5. **Implementar o ambiente da Zona da Meia-noite (`500m a 1000m`)**
   - Reduzir drasticamente a iluminação ambiente.
   - Introduzir elementos luminosos sutis no cenário, sugerindo bioluminescência.
   - Usar paleta mais fria e profunda.
   - Preservar a leitura do submarino laranja mesmo em contraste alto.

6. **Implementar o ambiente da Planície Abissal (`1000m a 1500m`)**
   - Dar maior ênfase ao fundo oceânico e ao relevo horizontal mais aberto.
   - Usar rochas isoladas, terreno sedimentar e partículas suspensas.
   - Reduzir elementos exuberantes e reforçar o vazio visual.

7. **Implementar o ambiente da Fossa Oceânica (`1500m a 2200m`)**
   - Criar o ambiente mais escuro e opressivo desta etapa.
   - Tornar os paredões e o relevo mais verticais e ameaçadores.
   - Reforçar a sensação de profundidade extrema e pressão.
   - A chegada a essa faixa deve parecer um marco claro de progressão.

8. **Criar transições graduais entre os ambientes**
   - As mudanças entre faixas não devem ser bruscas.
   - Interpolar gradualmente:
     - cores da água;
     - intensidade da luz;
     - densidade de elementos;
     - contraste do relevo;
     - presença de efeitos visuais.
   - O jogador deve perceber que entrou em uma nova zona sem sentir um corte seco entre elas.

9. **Manter geração determinística e performance adequada**
   - Os elementos do cenário devem continuar sendo gerados de forma determinística.
   - Não regenerar elementos a cada frame.
   - Aplicar culling por viewport para limitar o custo de renderização.
   - Garantir que a nova complexidade visual continue compatível com o loop atual do jogo.

10. **Preservar legibilidade e progressão visual**
    - O submarino deve continuar sempre legível sobre o fundo.
    - Cada ambiente precisa ser visualmente distinto dos demais.
    - A progressão de `0m` até `2200m` deve passar a sensação de descida contínua e avanço no jogo.

11. **Exibir o nome do ambiente ao entrar em uma nova zona**
    - Implementar uma função de interface que detecta quando o submarino entra em um novo ambiente de profundidade.
    - Ao entrar em uma nova zona, mostrar no **topo da tela** apenas o **nome do ambiente** atual.
    - O texto deve:
      - ser **branco**;
      - ter **tamanho médio**;
      - usar uma **fonte divertida**;
      - aparecer sozinho, sem moldura, ícone, subtítulo ou informações extras.
    - A animação deve ser suave:
      - o texto aparece de forma gradual;
      - permanece visível por um curto intervalo;
      - desaparece de forma gradual.
    - A exibição deve acontecer apenas quando houver transição de ambiente, não de forma permanente.

12. **Atualizar documentação do projeto**
    - Manter a descrição da Spec 008 coerente com o novo escopo por ambientes.
    - Garantir que README e specs seguintes não contradigam essa divisão por profundidade.

## Critérios de aceitação

- [x] O mundo suporta progressão até `2200m` de profundidade.
- [x] Existe configuração explícita para os cinco ambientes por faixa de profundidade.
- [x] O cenário é renderizado com base na profundidade atual e na faixa correspondente.
- [x] O ambiente de **Recifes tropicais** é visualmente claro, colorido e introdutório.
- [x] O ambiente de **Zona Crepuscular** transmite transição e redução gradual de luz.
- [x] O ambiente de **Zona da Meia-noite** é visivelmente mais escuro e inclui sinais sutis de bioluminescência.
- [x] O ambiente de **Planície Abissal** transmite silêncio, vazio e relevo sedimentar mais aberto.
- [x] O ambiente de **Fossa Oceânica** parece o ponto mais profundo, hostil e opressivo da exploração.
- [x] As transições entre os ambientes acontecem de forma gradual, sem cortes bruscos.
- [x] O submarino continua claramente legível em todas as faixas de profundidade.
- [x] Ao entrar em um novo ambiente, o nome da zona aparece no topo da tela com fade in e fade out.
- [x] O texto do nome do ambiente aparece sozinho, em branco, com tamanho médio e fonte divertida.
- [x] Nesta primeira implementação não existem animais nem itens colecionáveis nesses ambientes.
- [x] A geração visual continua determinística.
- [x] Há culling por viewport para preservar performance.
- [ ] `npm run dev` abre a página sem erros no console e permite percorrer visualmente os ambientes.
- [x] `npm run build` e `npm run lint` executam sem erros.

## Fora de escopo

- Animais marinhos.
- Itens colecionáveis.
- Conquistas.
- Salvamento com LocalStorage.
- Mecânicas de pressão, dano ou sobrevivência.
- HUD específico por bioma/zona.
- Efeitos sonoros e trilha por ambiente.
- Cartões, banners ou overlays complexos para anunciar as zonas.
- Rigor científico absoluto sobre classificação oceânica.
- Interações físicas detalhadas com corais, conchas, rochas ou relevo.

## Próxima etapa

A Spec 009 poderá usar essa base de ambientes para introduzir **animais, elementos visuais complementares e vida marinha contextual por profundidade**, aproveitando a progressão visual já estabelecida nesta etapa.
