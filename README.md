# Murabei Library Project

Este projeto é uma aplicação web que simula uma biblioteca, permitindo aos usuários criar, visualizar e gerenciar livros e autores. A aplicação foi desenvolvida usando Django para o backend e React para o frontend. 

A aplicação suporta as seguintes funcionalidades:

- Criação e gestão de livros.
- Criação e gestão de autores.
- Visualização de assuntos (subjects).

## Requisitos

- Docker
- Docker Compose

## Configuração e Uso Local

Para executar este projeto localmente, siga as etapas a seguir:

1. Clone este repositório em sua máquina local.

2. Navegue até o diretório do projeto.

3. Construa e inicie os contêineres usando Docker Compose.



Agora, a aplicação React deve estar disponível em `http://localhost:3000` e a API Django em `http://localhost:8000`.

Para interromper e remover os contêineres, redes e volumes definidos em `docker-compose.yml`, use o seguinte comando:




## Arquitetura do Projeto

O projeto é dividido em duas partes principais:

- `backend/murabeiapi`: Este diretório contém a aplicação Django que serve a API REST para a nossa biblioteca. Aqui, você encontrará os modelos, views, serializers e as configurações do projeto Django.

- `frontend/murabei-front`: Este diretório contém a aplicação React que fornece a interface do usuário para a nossa biblioteca. Aqui, você encontrará os componentes React, arquivos de estilo e a configuração do projeto React.

## Contribuindo

Este é um projeto de código aberto e todas as contribuições são muito bem-vindas!

Para contribuir, siga estas etapas:

1. Faça um fork deste repositório.
2. Crie um branch com as suas alterações: `git checkout -b nome-do-seu-branch`.
3. Commit suas alterações: `git commit -m 'Adicionei alguma funcionalidade!'`.
4. Push para o branch: `git push origin nome-do-seu-branch`.
5. Abra um Pull Request.

Obrigado pela sua contribuição!
