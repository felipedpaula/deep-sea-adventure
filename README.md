# Deep Sea Adventure

Jogo Interativo de Exploração Oceânica

Este projeto consiste em uma página web interativa e gamificada que simula uma experiência de exploração submarina. O usuário controla um submarino que desce progressivamente pelo oceano, explorando diferentes profundidades, paisagens, animais marinhos, corais, microorganismos e itens colecionáveis.

A proposta é criar uma experiência simples, visual e educativa, onde o jogador avance cada vez mais fundo no ambiente oceânico, encontrando novos elementos conforme a profundidade aumenta. Durante a exploração, o jogador poderá coletar itens, desbloqueando conquistas e acompanhar seu progresso ao longo da jornada.

## Objetivo do projeto

O objetivo principal é desenvolver um jogo leve, acessível diretamente pelo navegador, utilizando tecnologias simples da web. O projeto também será construído de forma gradual, por etapas, para garantir uma boa organização da arquitetura e permitir melhor compreensão da engenharia por trás da aplicação.

A primeira versão terá foco em:

* controle básico do submarino;
* movimentação em ambiente 2D;
* simulação de descida no oceano;
* variação visual conforme a profundidade;
* surgimento de animais, corais e elementos marinhos;
* coleta de itens colecionáveis;
* sistema inicial de conquistas;
* salvamento local do progresso do jogador.

## Mecânica geral

O jogador controla um submarino em um ambiente oceânico vertical. Conforme o submarino desce, novas zonas do oceano são apresentadas, com mudanças na iluminação, nos elementos visuais, nos animais encontrados e nos itens disponíveis para coleta.

A movimentação será feita por teclado e mouse:

* Setas do teclado ou WASD: movimentam o submarino.
* Shift: acelera o movimento.
* Botão esquerdo do mouse: movimenta o submarino.
* Botão direito do mouse: acelera o movimento.

O submarino poderá navegar livremente pela tela nos eixos X e Y, embora o curso natural da jornada seja uma descida progressiva pelo oceano.

## Stack utilizada

O projeto será desenvolvido com tecnologias simples da web, priorizando leveza, compatibilidade com navegadores e facilidade de manutenção.

* HTML5
* CSS3
* JavaScript
* Canvas 2D API
* Vite
* LocalStorage
* JSON ou módulos JavaScript para configuração dos dados do jogo

A renderização principal do jogo será feita com o elemento Canvas do navegador. A interface, menus, HUD, telas auxiliares e informações de progresso serão estruturadas com HTML e CSS.

## Como executar localmente

### Pré-requisitos

* [Node.js](https://nodejs.org/) versão 18 ou superior (recomendado 20+)
* npm (instalado junto com o Node.js)

### Instalação

Após clonar o repositório, instale as dependências:

```bash
npm install
```

### Ambiente de desenvolvimento

Para subir o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
```

O Vite imprimirá no terminal a URL local (por padrão `http://localhost:5173/`). Abra esse endereço no navegador. Alterações em arquivos dentro de `src/` recarregam a página automaticamente. Para encerrar o servidor, use `Ctrl + C` no terminal.

### Build de produção

Para gerar a versão otimizada de produção na pasta `dist/`:

```bash
npm run build
```

### Pré-visualização do build

Para servir localmente o conteúdo já buildado em `dist/`:

```bash
npm run preview
```

O Vite servirá o build em uma URL local (por padrão `http://localhost:4173/`).

### Lint

Para verificar a qualidade do código com o ESLint:

```bash
npm run lint
```

### Estrutura de pastas

```text
deep-sea-adventure/
├── index.html            # Ponto de entrada HTML (canvas + módulo principal)
├── package.json          # Scripts e dependências
├── eslint.config.js      # Configuração do ESLint (flat config)
├── specs/                # Especificações por etapa (specs/001-..., 002-...)
└── src/
    ├── main.js           # Ponto de entrada JavaScript (bootstrap)
    ├── styles/           # Folhas de estilo CSS (base, layout, hud, menus)
    ├── game/             # Lógica principal do jogo (canvas, loop, input, câmera)
    ├── entities/         # Entidades (submarino, animais, itens)
    ├── scenes/           # Cenas e cenários oceânicos
    ├── assets/           # Recursos visuais e dados estáticos
    ├── config/           # Configurações e dados do jogo (tema, canvas, game loop, submarino, mundo)
    ├── ui/               # Interface (referências DOM, HUD, menus, telas auxiliares)
    └── utils/            # Utilitários e funções auxiliares
```

## Estratégia de desenvolvimento

O projeto será desenvolvido por etapas, evitando implementar tudo de uma vez. A ideia é construir primeiro a base técnica e, em seguida, adicionar as funcionalidades principais de forma incremental.

Etapas previstas:

1. Configuração inicial do projeto.
2. Criação da estrutura base com HTML, CSS e JavaScript.
3. Implementação do Canvas.
4. Criação do loop principal do jogo.
5. Implementação do submarino.
6. Implementação dos controles.
7. Simulação de profundidade e câmera.
8. Criação do cenário oceânico.
9. Adição de animais, corais e elementos visuais.
10. Implementação dos itens colecionáveis.
11. Implementação das conquistas.
12. Salvamento de progresso com LocalStorage.
13. Polimento visual e melhorias de experiência.

## Status do projeto

O projeto está em desenvolvimento incremental, por etapas. A etapa atual e as próximas planejadas estão descritas em arquivos dentro da pasta `specs/`.

* [x] Spec 001 — Configuração inicial do projeto (Vite, estrutura de pastas, lint, entry points)
* [x] Spec 002 — Estrutura base com HTML, CSS e JavaScript (markup semântico, CSS modular com tema, módulos de UI)
* [x] Spec 003 — Implementação do Canvas (contexto 2D, DPI, redimensionamento responsivo)
* [x] Spec 004 — Criação do loop principal do jogo (requestAnimationFrame, delta time, update/render)
* [x] Spec 005 — Implementação do submarino (primeira entidade, renderização com formas geométricas)
* [x] Spec 006 — Implementação dos controles (teclado: setas/WASD + Shift; mouse: botão esquerdo + direito)
* [x] Spec 007 — Simulação de profundidade e câmera (câmera que segue o submarino, mundo vertical, gradiente de fundo conforme profundidade)
* [x] Spec 008 — Criação do cenário oceânico
* [ ] Spec 009 — Adição de animais e elementos visuais complementares
* [ ] Demais etapas (itens, conquistas, persistência)

A prioridade neste momento é construir uma base simples, bem organizada e fácil de evoluir, antes de adicionar mecânicas mais avançadas ou elementos visuais complexos.
