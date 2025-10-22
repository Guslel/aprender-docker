# Exemplo Simples Fastify com Docker

Este projeto demonstra uma aplicação Node.js simples usando Fastify, containerizada com Docker e orquestrada com Docker Compose.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/) (inclui npm)
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/install/) (geralmente incluído no Docker Desktop)

## Rodando o Projeto

Você pode rodar este projeto de três maneiras:

### 1. Localmente com Node.js

* **Instale as dependências:**
    ```bash
    npm install
    ```
* **Execute a aplicação:**
    ```bash
    node index.js
    ```
    A aplicação estará acessível em `http://localhost:3000`.

### 2. Usando Docker diretamente

* **Construa a imagem Docker:**
    ```bash
    docker build -t aprender-docker .
    ```
    *(Substitua `aprender-docker` pelo nome que desejar para a sua imagem)*
* **Execute o container a partir da imagem:**
    ```bash
    docker run -p 3000:3000 aprender-docker
    ```
    *(Use o mesmo nome de imagem que você definiu no passo anterior)*
    A aplicação estará acessível em `http://localhost:3000`.

### 3. Usando Docker Compose

* **Execute o Docker Compose:**
    ```bash
    docker-compose up
    ```
    *Ou, para rodar em segundo plano (detached mode):*
    ```bash
    docker-compose up -d
    ```
    *(Dependendo da sua versão do Docker Compose, o comando pode ser `docker compose up`)*

    O Docker Compose irá construir a imagem (se ainda não existir) e iniciar o container conforme definido no `docker-compose.yml`.
    A aplicação estará acessível em `http://localhost:3000`.

* **Para parar os containers iniciados com Docker Compose:**
    ```bash
    docker-compose down
    ```
    *(Ou `docker compose down`)*

## Explicação dos Arquivos Docker

* **`dockerfile`**:
    * Define as instruções para construir a imagem Docker da aplicação.
    * `FROM node:20`: Usa a imagem oficial do Node.js versão 20 como base.
    * `WORKDIR /app`: Define o diretório de trabalho dentro do container como `/app`.
    * `COPY package*.json ./`: Copia os arquivos `package.json` e `package-lock.json` para o diretório de trabalho.
    * `RUN npm install`: Instala as dependências do projeto dentro do container.
    * `COPY . .`: Copia o restante do código da aplicação para o diretório de trabalho.
    * `EXPOSE 3000`: Informa que o container expõe a porta 3000.
    * `CMD ["node", "index.js"]`: Define o comando padrão para executar quando o container iniciar.

* **`docker-compose.yml`**:
    * Define os serviços que compõem a aplicação (neste caso, apenas um serviço chamado `app`).
    * `version: '3'`: Especifica a versão da sintaxe do Docker Compose.
    * `services:`: Inicia a definição dos serviços.
    * `app:`: Define o serviço da aplicação Node.js.
        * `build: .`: Instrui o Compose a construir a imagem usando o `dockerfile` no diretório atual (`.`).
        * `ports:`: Mapeia as portas entre o host e o container.
            * `- "3000:3000"`: Mapeia a porta 3000 do host para a porta 3000 do container.

* **`.dockerignore`**:
    * Especifica arquivos e diretórios que devem ser ignorados pelo Docker ao construir a imagem.
    * `node_modules`: Ignora a pasta `node_modules` local, pois as dependências serão instaladas dentro do container (`RUN npm install` no `dockerfile`), otimizando o processo de build.

## Acessando a Aplicação

Após iniciar a aplicação usando qualquer um dos métodos acima, acesse o seguinte URL no seu navegador:

[http://localhost:3000](http://localhost:3000)

Você deverá ver a mensagem "hello world".