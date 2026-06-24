# Spec 001 — Configuração inicial do projeto

## Objetivo

Estabelecer a base técnica do projeto **Deep Sea Adventure**, criando a estrutura mínima necessária para que o desenvolvimento das próximas etapas possa evoluir de forma organizada. Esta spec **não** implementa mecânicas de jogo — apenas prepara o ambiente, o empacotador, a estrutura de pastas e os arquivos de configuração básicos.

## Contexto

Conforme o README, o projeto será construído de forma incremental, por etapas. A primeira etapa prevista é justamente a **Configuração inicial do projeto**. A stack definida é:

- HTML5
- CSS3
- JavaScript (sem framework)
- Canvas 2D API
- Vite
- LocalStorage
- Módulos JavaScript (ES Modules) ou JSON para dados do jogo

A renderização do jogo será feita em um elemento `<canvas>`, enquanto a interface (menus, HUD, telas auxiliares) será estruturada com HTML e CSS.

## Tarefas

1. **Inicializar o projeto com Vite**
   - Criar o projeto usando o template vanilla JavaScript do Vite.
   - Garantir que o comando `npm run dev` suba um servidor de desenvolvimento funcional.
   - Garantir que o comando `npm run build` gere um build de produção em `dist/`.
   - Garantir que o comando `npm run preview` sirva o build de produção localmente.

2. **Definir a estrutura de pastas base**
   - Organizar o código-fonte dentro de `src/`.
   - Criar diretórios que refletirão a separação de responsabilidades do jogo (mesmo que ainda vazios ou com arquivos placeholder):
     - `src/` — raiz do código-fonte
     - `src/game/` — lógica principal do jogo (loop, estados, etc.)
     - `src/entities/` — entidades do jogo (submarino, animais, itens, etc.)
     - `src/scenes/` — cenas e cenários oceânicos
     - `src/assets/` — recursos visuais (imagens, sprites) e dados
     - `src/config/` — configurações e dados do jogo (JSON ou módulos JS)
     - `src/ui/` — componentes de interface (HUD, menus, telas auxiliares)
     - `src/utils/` — utilitários e funções auxiliares
     - `src/styles/` — folhas de estilo CSS

3. **Criar o ponto de entrada HTML**
   - Arquivo `index.html` na raiz do projeto, referenciando o módulo principal `src/main.js`.
   - Deve conter um `<canvas id="game-canvas">` (inicialmente sem uso, apenas estrutural).
   - Definir o `<title>` como "Deep Sea Adventure" e o idioma como `pt-BR`.
   - Incluir metadados básicos (charset, viewport).

4. **Criar o ponto de entrada JavaScript**
   - Arquivo `src/main.js` que inicializa a aplicação.
   - Por enquanto, apenas um log simples indicando que o projeto foi carregado com sucesso e uma referência ao canvas (sem lógica de jogo).

5. **Criar a folha de estilos base**
   - Arquivo `src/styles/main.css` com estilos mínimos: reset básico, fonte, fundo escuro (compatível com tema oceânico) e canvas ocupando a viewport.
   - Importar o CSS a partir de `src/main.js` ou via `index.html`.

6. **Adicionar documentação de scripts**
   - Garantir que o `package.json` contenha os scripts padrão do Vite (`dev`, `build`, `preview`) com nomes legíveis.

7. **Configurar controle de qualidade (opcional, recomendado)**
   - Adicionar um linter (ESLint) com configuração mínima para manter o código consistente.
   - Adicionar o arquivo `.gitignore` ignorando `node_modules/`, `dist/` e arquivos de ambiente.

## Critérios de aceitação

- [x] O projeto pode ser inicializado com `npm install` seguido de `npm run dev`.
- [x] O servidor de desenvolvimento abre uma página em branco (ou com fundo oceânico) sem erros no console.
- [x] O `<canvas>` está presente no DOM com o id `game-canvas`.
- [x] A estrutura de pastas definida existe e está consistente com a separação de responsabilidades do jogo.
- [x] `npm run build` gera uma pasta `dist/` sem erros.
- [x] O `package.json` contém os scripts `dev`, `build` e `preview`.
- [x] O `.gitignore` está presente e ignora `node_modules/` e `dist/`.
- [x] O `README.md` continua refletindo o status do projeto (fase inicial de estruturação).

## Fora de escopo

- Implementação do loop principal do jogo.
- Renderização no canvas.
- Lógica do submarino, controles ou profundidade.
- Quaisquer mecânicas de jogo, animais, itens ou conquistas.
- Estilos avançados ou assets visuais reais.

## Próxima etapa

A próxima spec (`002-...`) cobrirá a **crição da estrutura base com HTML, CSS e JavaScript** e a implementação do Canvas, dando início à renderização e ao loop principal do jogo.
