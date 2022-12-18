# Grocery Shop API

Este projeto é uma API que oferece funcionalidades para gerenciamento através de rotas de um e-commerce simples. Algumas dessas funções são a listagem de produtos, adcionar itens ao carrinho, gerenciamento de estoque e autenticação de usuário.

## Tecnologias utilizadas
- Express.js
- TypeScript
- MongoDB
- JSON Web Token
- Bcrypt


<br>

# Descrição do projeto
O modo de divisão e separação de responsabilidades em cada parte do código é feita basicamente através de Controllers, Services e Models.

O projeto utiliza a biblioteca Express.js para gerenciar as Rotas, os Controllers e os Middlewares, e foi pensado desta maneira para que caso fosse necessário o uso de outra biblioteca diferente do Express.js, não seja necessário modificar o projeto inteiro.

O Sistema de Gerenciamento de Banco de Dados escolhido foi o MongoDB pois considero que, mesmo eu tendo um pouco mais de familiaridade com o MySQL e o PostgreSQL, é bastante simples fazer deploy de um projeto que o utiliza devido a própria empresa disponibilizar uma plataforma pra isso sem requerer algum outro meio/serviço externo. Caso seja necessário apenas a mudança do SGBD, a modificação ocorre apenas nos Models.

Em relação as regras de negócio, todas estão apenas nos Services, então assim como as outras duas partes anteriores, caso seja necessário a mudança apenas de tais regras, as modificações acontecem apenas no Service respectivo para que várias partes não sejam modificadas.

Existe uma boa discussão em torno de onde as regras de negócio devam ficar por questão de nomenclatura ou alguns outros pormenores, porém, para o projeto no estado atual, tentar seguir outas nomenclatura ou sugestões de organização trariam mais complexidade que o realmente necessário.

<br>

# Instalação e execução

1. Após clonar o repositório para sua máquina, execute o seguinte código por linha de comando na pasta em que o projeto se encontra para instalar as dependências necessárias:

```shell
yarn
```

Caso tenha preferência pelo `npm` como gerenciador de pacotes, utilize:

```shell
npm install
```

2. Após a finalização da instalação das dependências necessárias, o seguinte código executa a aplicação:

```shell
yarn dev
```

ou caso tenha preferência pelo `npm` como gerenciador de pacotes:

```shell
npm run dev
```

- Caso a aplicação não abra automaticamente no navegador, abra [http://localhost:5000](http://localhost:5000) no navegador (ou a porta configurada no arquivo .env).

3. Para parar a aplicação, pressione `ctrl+c` no terminal de execução do projeto.

<br>

# Autenticação

Algumas das funções da API são acessadas somente através da autenticação de usuário, assim como se deve esperar de um sistema de e-commerce online.

Nesta API, a autenticação ocorre por meio de JSON Web Token (JWT) que é um dos métodos mais comuns para se autenticar em aplicativos web e APIs.

Ela segue os seguintes passos:
1. a API recebe as credenciais do usuário;
2. Se as credenciais forem válidas, a API retorna o JWT ao usuário que fez a requisição.

Caso o usuário tente acesso a uma rota que necessite estar autenticado, o servidor retorna erro `401: Unauthorized` com a mensagem "`Você precisa fazer login`".

Agora falando do Bcrypt, ele foi utilizado pelos seguintes motivos:
- Salvar as senhas diretamente no banco de dados oferece riscos a segurança caso o sevidor seja invadido, então seria essencial fazer o hash das senhas para salvá-las no banco com um algoritmo de hash, no caso, o escolhido foi bcrypt;
- Ele é projetado para ser resistente a ataques de força bruta;
- Ele usa uma chave de sal única para cada senha hashed, o que aumenta a segurança das senhas;
- Ele é lento para calcular o hash de uma senha, o que torna mais difícil para um atacante descobrir uma senha usando um ataque de força bruta;
- Ele permite que você especifique o nível de "custo" para calcular o hash, o que aumenta a segurança ao aumentar o tempo de processamento necessário para calcular o hash.

<br>

# Endpoints

A API tem algumas rotas disponíveis. São elas as seguintes:

<br>

## Rota de carrinho
```shell
/cart
```

## Rota de produtos
```shell
/products
```
## Rota de estoque
```shell
/inventory
```

## Rota de categorias
```shell
/category
```

## Rotas de autenticação

```shell
/signup
/signin
```

Para saber com detalhes os métodos suportados em cada uma das rotas anteriores, o que cada um deles faz e caso seja necessário o corpo mínimo em cada requisição, acesse [este documento](docs/rotas.md).
