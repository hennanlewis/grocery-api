# Rota de carrinho
Para acessar carrinho de compras, utilize a seguinte rota:

```shell
/cart
```

Métodos disponíveis: `GET`, `PUT` e `DELETE`.

Este método `GET` retorna o carrinho atual do usuario (o usuário precisa estar autenticado).

Este método `PUT` insere um produto no carrinho. É necessário enviar o ID do produto e a quantidade que deseja adicionar ao carrinho no corpo da requisição (o usuário precisa estar autenticado).
```shell
// exemplo de corpo da requisição para este método PUT
{
	"productId": "1234",
	"quantity": 10
}
```


Este método `DELETE` remove todos os itens do carrinho do usuário (o usuário precisa estar autenticado).

```shell
/cart/:productId
```

Métodos disponíveis: `DELETE`.

Este método `DELETE` remove do carrinho o produto com o ID igual o parâmetro (o usuário precisa estar autenticado), ou seja, ao acessar `/cart/1234`, remove o produto com o ID "1234".

<br>

# Rotas de categorias
Para acessar os dados das categorias dos produtos, utilize a seguinte rota:

```shell
/category
```

Métodos disponíveis: `GET` e `POST`.

Este método `GET` retorna todas as categorias dos produtos.

Este método `POST` insere uma categoria de produto. É necessário enviar o nome no corpo da requisição (o usuário precisa estar autenticado).
```shell
// exemplo de corpo da requisição para este método POST
{
	"name":"nome da categoria do produto",
}
```

Para acessar os dados das categorias dos produtos por ID, utilize a seguinte rota:

```shell
/category/:id
```

Métodos disponíveis: `PUT` e `DELETE`.

Este método `PUT` altera uma categoria de produto. É necessário enviar o nome no corpo da requisição (o usuário precisa estar autenticado).
```shell
// exemplo de corpo da requisição para este método POST
{
	"name":"nome da categoria do produto",
}
```

Este método `DELETE` remove a categoria com o ID do parâmetro (o usuário precisa estar autenticado), ou seja, ao acessar `/category/1234`, remove a categoria com o ID "1234".

<br>

# Rotas de produtos
Para acessar os dados dos produtos, utilize a seguinte rota:

```shell
/products
```

Métodos disponíveis: `GET` e `POST`.

Este método `GET` retorna todos os produtos.

Este método `POST` insere um produto no estoque. É necessário enviar o código de barras, o nome, os detalhes de tamanho (ex.: 1kg, 500g, 10ml, 1l), a categoria, um array de imagens e a descrição no corpo da requisição (o usuário precisa estar autenticado).
```shell
// exemplo de corpo da requisição para este método POST
{
	"barcode":"1234",
	"name":"nome do produto",
	"sizeDetail": "1kg",
	"category": "bebidas",
	"image": ["http://linkdaimagem"],
	"description": "descrição do produto"
}
```

Para acessar os dados dos produtos por ID, utilize a seguinte rota:

```shell
/products/:id
```

Métodos disponíveis: `GET`, `PUT` e `DELETE`.

Este método `GET` retorna o produto com o ID igual o parâmetro, ou seja, ao acessar `/products/1234`, retorna os dados do produto com o ID "1234".

Este método `PUT` atualiza um produto. É necessário enviar o código de barras, o nome, os detalhes de tamanho (ex.: 1kg, 500g, 10ml, 1l), a categoria, um array de imagens e a descrição no corpo da requisição (o usuário precisa estar autenticado).
```shell
// exemplo de corpo da requisição para este método PUT
{
	"barcode":"1234",
	"name":"nome do produto",
	"sizeDetail": "1kg",
	"category": "bebidas",
	"image": ["http://linkdaimagem"],
	"description": "descrição do produto"
}
```

Este método `DELETE` remove o produto com o ID igual o parâmetro (o usuário precisa estar autenticado), ou seja, ao acessar `/products/1234`, remove o produto com o ID "1234".

<br>

# Rotas de estoque
Para acessar os produtos em estoque, utilize a seguinte rota:

```shell
/inventory
```

Métodos disponíveis: `GET` e `POST`.

Este método `GET` retorna todos os produtos em estoque.

Este método `POST` insere um produto no estoque. É necessário enviar o ID do produto, a quantidade, o preço de compra (em centavos) e o preço final do produto (em centavos) no corpo da requisição (o usuário precisa estar autenticado).
```shell
// exemplo de corpo da requisição para este método POST
{
	"productId":"1234",
	"quantity": 5,
	"purchasePrice": 1000,
	"price": 1300
}
```

Para acessar os dados dos produtos por ID, utilize a seguinte rota:

```shell
/inventory/:id
```

Métodos disponíveis: `DELETE`.

Este método `DELETE` remove o estoque com ID igual o parâmetro (o usuário precisa estar autenticado), ou seja, ao acessar `/inventory/1234`, remove o estoque com o ID "1234".

Para acessar os dados de estoque por ID do produto, utilize a seguinte rota:

```shell
/inventory/product/:productID
```

Métodos disponíveis: `GET`.

Este método `GET` retorna do estoque o produto com o ID do parâmetro, ou seja, ao acessar `/inventory/product/1234`, retorna do estoque o produto com o ID "1234".

<br>

# Rotas de autenticação
Para cadastrar um usuário, utilize a seguinte rota:

```shell
/signup
```

Métodos disponíveis: `POST`.

Este método `POST` cadastra um novo usuário. É necessário enviar o nome do usuário, o email, a senha e a confirmação da senha no corpo da requisição.
```shell
// exemplo de corpo da requisição para este método POST
{
	"name": "nome do usuário",
	"email": "user@email.com",
	"password": "1234",
	"confirmPassword": "1234"
}
```

Para fazer login, utilize a seguinte rota:

```shell
/signin
```

Métodos disponíveis: `POST`.

Este método `POST` cadastra um novo usuário. É necessário enviar o email e a senha do usuário no corpo da requisição.
```shell
// exemplo de corpo da requisição para este método POST
{
	"email": "user@email.com",
	"password": "1234",
}
```

<br>

# Observações
Nem todas as rotas possuem todos os métodos planejados, então ainda falta terminar alguns detalhes.