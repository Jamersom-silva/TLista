# Backend

## Instalação

1. `cd backend`
2. `npm install`
3. Copie `.env.example` para `.env` e ajuste as variáveis.
4. `npm run dev` (requer nodemon) ou `npm start`

## Variáveis de ambiente
- `PORT` - Porta do servidor
- `JWT_SECRET` - Chave para assinar tokens
- `DATABASE_FILE` - caminho para o arquivo sqlite (opcional)

## Deploy na Railway
1. Crie um novo projeto Node.js
2. Faça upload do repositório
3. Defina variável de ambiente `JWT_SECRET`
4. Configure volume persistente para `database.sqlite` (Railway Persistent Storage)
