# Atividade 3 – Acesso ao BD

Aplicação web para cadastro, listagem e exclusão de usuários.

## Tecnologias

- Node.js + Express
- PostgreSQL
- HTML, CSS e JavaScript (fetch)

## Como rodar

1. Clone o repositório e instale as dependências:
```bash
git clone https://github.com/portug4lucas/atividade3.git
cd atividade3
npm install
```

2. Crie o arquivo `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
PORT=3000
```

3. Rode o servidor:
```bash
node server.js
```

4. Acesse em (https://atividade3-4.onrender.com)

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/users` | Lista usuários |
| POST | `/users` | Cadastra usuário |
| DELETE | `/users/:id` | Remove usuário |
