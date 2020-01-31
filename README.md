# TDD API

API em Express.js implementada com prática em TDD e Continuous Integration provido.



## 🔧 Instalação e Uso

### Pre-requisitos

Para funcionar, é necessário que tenha [Node.js](https://nodejs.org/) instalado em sua máquina.

### Instalação

Traga o repositório para sua máquina, podendo ser de duas formas:

- Baixando pelo GitHub (Clicando no botão: "Clone or download").

- Clonando-o com [Git](https://git-scm.com/downloads):

  ```bash
  git clone https://github.com/cleberson-dev/tdd-api.git
  ```

Instale as dependências necessárias:

```bash
npm install
```

Dentro do diretório do repositório, execute o script para:

- Executar testes já definidos:

  ```bash
  npm test
  ```

- Executar o servidor:

  ```bash
  npm run start
  ```

- Executá-lo em modo desenvolvedor (Para reinício da aplicação a cada mudança feita):

  ```bash
  npm run start:dev
  ```



## Sobre a API

É uma API simples, tendo uma array como fonte de dados, e consequentemente, alguns itens escritos no código-fonte.

### Rotas

- GET `/api/cars` - Obtém todos os carros. Retorna uma Array de objetos no formato: `{ make: String, model: String }`.
- POST `/api/cars` - Criar um novo carro. Recebe 2 parâmetros, ambos Strings, sendo eles:
  - `make` representando a marca do carro.
  - `model` sendo o modelo do carro.
- DELETE `/api/cars/:id` - Deletar um carro existente da fonte de dados.



## Ferramentas

- [Express.js](): Framework Web minimalista para Javascript.
- [Jest](): Framework de Testes para Javascript.
- [TravisCI](https://travis-ci.org/): Serviço de Continuous Integration usado para construir e testar projetos hospedados no GitHub.
- [Supertest](https://www.npmjs.com/package/supertest): Biblioteca que oferece uma abstração de alto-nível para testes com HTTP, facilitando asserções.



## ✍️ Contribuidores

- [@cleberson-dev](https://github.com/cleberson-dev/) - Ideia e Trabalho Inicial

