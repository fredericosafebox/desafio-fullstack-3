# Desafio III - Full Stack

Dev: Frederico Barros Costa

Esse projeto simula um cadastro de clientes. Clientes cadastrados possuem liberdade para cadastrar novos contatos, editá-los, e apagá-los, bem como alterar as informações de sua própria conta ou deletá-la. Aproveitei esse desafio para me desafiar a desenvolver com tecnologias novas, que nunca utilizei anteriormente, e por conta disso algumas funcionalidades ainda estão em fase inicial.

## Tecnologias

### Frontend

O frontend foi construído com `Next Js`, `TypeScript` e `Redux`. Utilizei `React Hook Forms` junto ao `Yup` para possibilitar formulários responsivos. Nos estilos utilizei `Styled-Components`, `React-Icons` e `Framer-Motion`, e para controlar os estados da aplicação utilizei o `Redux`.

### Backend

O backend foi projetado com `Next API`, responsável pelo roteamento da aplicação, e `Prisma`, ORM escolhido para manipular dados e migrações. Foi seguido o padrão de arquitetura `MVC`, com adição de `middlewares de autenticação` e validação para rotas protegidas. Foi aplicado também o `padrão Singleton` para garantir a instanciação única do prisma em todo o ambiente de desenvolvimento, e práticas de segurança foram adotadas para melhorar a robustez da API (criptografia de senha e autenticação com `JWT`).

## Instalação

1- Execute `yarn install` ou `npm install` para instalar as dependências do projeto
2- Crie um arquivo `.env` seguindo o padrão indicado no arquivo `.env.example`
3- Crie um banco de dados com o `Postgres`
4- No `.env` insira uma `DatabaseURL` com o seguinte padrão:
`postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA`
5- Um `exemplo` de Database URL: `postgresql://frederico:12345@localhost:3000/bd_desafio_s3?schema=public`
6- Rode as migrations com o comando `npx prisma generate`
7- Execute o comando `yarn dev `para lançar a aplicação no ambiente de desenvolvimento
8- A `API` está disponível no endpoint `/api`, e conta com os seguintes endpoints:
`/users` - GET e POST
`/profile` - GET, PATCH, DELETE
`/login` - POST
`/contacts` - GET, POST
`/contacts/:id` - GET, PATCH, DELETE
9- O frontend conta com uma homepage e o endpoint `/dashboard`

Extras:

- Você poderá verificar o banco de dados com mais detalhes usando o comando `npx prisma studio`
- É possível criar uma conta com privilégios de admin através do email `admin@admin.com`, mas ainda não existem funcionalidades exclusivas
- Após realizar o login, você notará um switch que controla visibilidade do usuário. Caso ativado, outros usuários poderão te encontrar através da rota `GET /users`, mas a feature ainda não foi implementada.

## Stack

##### Next Js

##### React Js

##### TypeScript

##### Redux Toolkit

##### Axios

##### Yup

##### React-Toastify

##### React-Icons

##### Prisma

##### Next API

##### Prettier

##### ESlint

## Metodologias

#### GitFlow

#### BEM

#### MVC

#### Singleton Pattern
