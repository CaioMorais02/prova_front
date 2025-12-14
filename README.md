# ?? Gerenciamento de Funcionários (Angular 20)

Este projeto é uma solução para o desafio técnico de Front-End. Trata-se de um CRUD completo de funcionários utilizando o Angular 20.

## Tecnologias e Padrões Utilizados

* **Framework:** Angular 20
* **Gerenciamento de Estado:** Signals (WritableSignal)
* **Arquitetura:** Standalone Components (Sem NgModules)
* **Controle de Fluxo:** sintaxe (`@if`, `@for`)
* **Formulários:** Reactive Forms Typed & Validations
* **Estilização:** SCSS
* **Testes E2E:** Cypress (com Mock de API)
* **Mock API:** JSON Server

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:
* Node.js (v18 ou superior recomendado)
* NPM

## Instalação

1. Clone o repositório:
   git clone [https://github.com/CaioMorais02/prova_front.git](https://github.com/CaioMorais02/prova_front.git)
   cd prova_front

2. Instale as dependências:
    npm install

## Executar o projeto

Para o projeto funcionar corretamente, precisamos rodar o Back-end simulado (Mock API) e o Front-end simultaneamente.

1. Iniciar a API Mock
    npm run mock:api

A API ficará disponível em: http://localhost:3000/employees

2. Iniciar a Aplicação Angular
    ng serve

Acesse a aplicação em: http://localhost:4200

## Executando os Testes (E2E)

O projeto possui cobertura de testes End-to-End utilizando Cypress. Os testes são isolados e utilizam intercept para mockar as respostas da API, garantindo estabilidade.

Para rodar os testes:

1. Certifique-se de que a aplicação está rodando (ng serve).

2. Execute o comando:
    npx cypress open

3. Selecione E2E Testing > Chrome > Start.

4. Clique no arquivo crud.cy.ts para assistir aos testes.

## Funcionalidades Implementadas

[x] Listagem de funcionários.

[x] Busca dinâmica por texto (Nome ou Email).

[x] Cadastro de novo funcionário.

[x] Edição de funcionário existente.

[x] Exclusão com confirmação.

[x] Tratamento de erros de API (Mensagens amigáveis).

[x] Validação de formulários (Campos obrigatórios e formato de email)