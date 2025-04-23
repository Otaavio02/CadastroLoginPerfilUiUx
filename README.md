# CadastroLoginPerfil

# Instruções para a inicialização!

1. Baixar o arquivo Zip e extrair;
2. Inicializar o Xamp ou o Laragon;
3. Abrir o MySQL Workbanch e criar uma nova conexao sem senha;
4. Colar esse código no Workbanch;

"drop database appdelivery;

create database appdelivery;

use appdelivery;


CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(255) NOT NULL,
    email_cliente VARCHAR(255) UNIQUE NOT NULL,
    senha_cliente VARCHAR(255) NOT NULL,
    telefone_cliente VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE restaurantes (
    id_restaurante INT AUTO_INCREMENT PRIMARY KEY,
    nome_restaurante VARCHAR(255) NOT NULL,
    telefone_restaurante VARCHAR(20),
    endereco_restaurante VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE pratos (
    id_prato INT AUTO_INCREMENT PRIMARY KEY,
    nome_prato VARCHAR(100),
    preco_prato DECIMAL(10, 2),
    categoria_prato VARCHAR(50),
    restaurante_id INT,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id_restaurante)
);


CREATE TABLE itens_pedido (
    id_item_pedido INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    descricao_item VARCHAR(150)
);

CREATE TABLE pedidos (
    id_pedido INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    foto_pedido BLOB,
    nome_pedido VARCHAR(100),
    preco_pedido DECIMAL(6, 2),
    restaurante_pedido INT,
    status_pedido VARCHAR(60),
    descricao_pedido VARCHAR(200),
    id_cliente INT,
    id_items_pedido INT,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
    FOREIGN KEY (restaurante_pedido) REFERENCES restaurantes(id_restaurante),
    FOREIGN KEY (id_items_pedido) REFERENCES itens_pedido(id_item_pedido)
);


CREATE TABLE avaliacoes (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    restaurante_id INT NOT NULL,
    pedido_id INT NOT NULL,
    nota INT NOT NULL,
    comentario TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id_restaurante),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id_pedido)
);"

5. Rodar o banco de dados;
6. Ir para a pasta extraida e digitar cmd.;
7. Após abrir o prompt de comando, digitar npm start;
8. Após isso, o prompt ira te dizer em qual porta o aplicativo está rodando;
9. Em seu navegador, digitar http://localhost:3000/login;
10. Caso queira acessar o cadastro de restaurantes, apenas digite http://localhost:3000/register_restaurant.html
11. Pronto, você podera executar as funcionalidades do serviço 1.


#Documentação Requisições

Aluno: Otávio Augusto
Serviço de Clientes e Restaurantes

1. Serviço de Cadastro de Cliente
Endpoint: /api/clientes/register
Método: POST
Objetivo: Registrar um novo cliente.

Corpo da Requisição (JSON):

JSON

{
  "nome_cliente": "[Nome Completo do Cliente]",
  "email_cliente": "[Endereço de Email do Cliente]",
  "senha_cliente": "[Senha Desejada]",
  "telefone_cliente": "[Número de Telefone do Cliente] (opcional)"
}
Exemplo de Requisição (usando curl):

Bash

curl -X POST \
  'http://localhost:3000/api/clientes/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "nome_cliente": "Novo Cliente",
    "email_cliente": "novo.cliente@email.com",
    "senha_cliente": "senha123",
    "telefone_cliente": "11911112222"
  }'
Exemplo de Resposta em Caso de Sucesso (JSON):

JSON

{
  "message": "Usuário registrado com sucesso!",
  "user": {
    "id_cliente": "[ID do Cliente Recém-Cadastrado]",
    "nome_cliente": "Novo Cliente",
    "email_cliente": "novo.cliente@email.com"
  }
}
Exemplo de Resposta em Caso de Erro (JSON):

JSON

{
  "error": "Este e-mail já está cadastrado."
}
JSON

{
  "error": "Erro ao registrar usuário."
}
2. Serviço de Cadastro de Restaurante
Endpoint: /api/restaurantes/register
Método: POST
Objetivo: Registrar um novo restaurante.

Corpo da Requisição (JSON):

JSON

{
  "nome_restaurante": "[Nome do Restaurante]",
  "telefone_restaurante": "[Telefone do Restaurante]",
  "endereco_restaurante": "[Endereço Completo do Restaurante]"
}
Exemplo de Requisição (usando curl):

Bash

curl -X POST \
  'http://localhost:3000/api/restaurantes/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "nome_restaurante": "Novo Restaurante",
    "telefone_restaurante": "1122223333",
    "endereco_restaurante": "Rua dos Restaurantes, 123"
  }'
Exemplo de Resposta em Caso de Sucesso (JSON):

JSON

{
  "message": "Restaurante registrado com sucesso!",
  "restaurant": {
    "id_restaurante": "[ID do Restaurante Recém-Cadastrado]",
    "nome_restaurante": "Novo Restaurante",
    "telefone_restaurante": "1122223333",
    "endereco_restaurante": "Rua dos Restaurantes, 123"
  }
}
Exemplo de Resposta em Caso de Erro (JSON):

JSON

{
  "error": "Erro ao registrar restaurante."
}
3. Serviço de Login
Endpoint: /api/login
Método: POST
Objetivo: Autenticar um cliente e obter um token de acesso.

Corpo da Requisição (JSON):

JSON

{
  "email": "[Endereço de Email do Cliente]",
  "password": "[Senha do Cliente]"
}
Exemplo de Requisição (usando curl):

Bash

curl -X POST \
  'http://localhost:3000/api/login' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "novo.cliente@email.com",
    "password": "senha123"
  }'
Exemplo de Resposta em Caso de Sucesso (JSON):

JSON

{
  "message": "Login realizado com sucesso!",
  "token": "[TOKEN DE ACESSO JWT]"
}
Exemplo de Resposta em Caso de Erro (JSON):

JSON

{
  "message": "Credenciais inválidas."
}
JSON

{
  "error": "Erro ao realizar login."
}
4. Serviço de Obter Cliente por ID
Endpoint: /api/clientes/:id_do_cliente
Método: GET
Objetivo: Buscar os detalhes de um cliente específico. Requer autenticação.

Headers da Requisição:

Authorization: Bearer [TOKEN DE ACESSO JWT]
Exemplo de Requisição (usando curl):

Bash

curl -X GET \
  'http://localhost:3000/api/clientes/123' \
  -H 'Authorization: Bearer [SEU_TOKEN_DE_ACESSO]'
Exemplo de Resposta em Caso de Sucesso (JSON):

JSON

{
  "id_cliente": "[ID_DO_CLIENTE]",
  "nome_cliente": "[Nome do Cliente]",
  "email_cliente": "[Email do Cliente]"
}
Exemplo de Resposta em Caso de Erro (JSON):

JSON

{
  "message": "Token não fornecido."
}
JSON

{
  "message": "Token inválido."
}
JSON

{
  "message": "Usuário não encontrado."
}
5. Serviço de Perfil do Usuário Autenticado
Endpoint: /api/profile
Método: GET
Objetivo: Buscar os detalhes do perfil do usuário autenticado (cliente). Requer autenticação.

Headers da Requisição:

Authorization: Bearer [TOKEN DE ACESSO JWT]
Exemplo de Requisição (usando curl):

Bash

curl -X GET \
  'http://localhost:3000/api/profile' \
  -H 'Authorization: Bearer [TOKEN DE ACESSO DO CLIENTE]'
Exemplo de Resposta em Caso de Sucesso (JSON) - Cliente:

JSON

{
  "id_cliente": "[ID_DO_CLIENTE]",
  "nome_cliente": "[Nome do Cliente]",
  "email_cliente": "[Email do Cliente]"
}
Exemplo de Resposta em Caso de Erro (JSON):

JSON

{
  "message": "Token não fornecido."
}
JSON

{
  "message": "Token inválido."
}
JSON

{
  "message": "Usuário não encontrado."
}
JSON

{
  "error": "Erro ao buscar perfil."
}
Rotas de Frontend:

O servidor serve as seguintes páginas estáticas:

/login: Exibe o formulário de login para usuários.
/register/user: Exibe o formulário de cadastro para novos clientes.
/register/restaurant: Exibe o formulário de cadastro para novos restaurantes.
/profile: Exibe a página de perfil do usuário autenticado.

