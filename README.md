# ACMA

Aplicação web da ACMA, construída com React. Inclui páginas de apresentação, cursos, serviços, inscrição, consulta de certificados e sala online.

## Desenvolvimento

```bash
npm install
npm start
```

## API Django local

Por padrão, a aplicação usa `http://127.0.0.1:8000/api`. Para apontar para outro endereço, copie `.env.example` para `.env` e altere `REACT_APP_API_URL`; reinicie o servidor React depois de mudar a variável.

O cliente usa estas rotas do Django REST Framework:

- `POST /login/` (também aceita a rota alternativa `POST /auth/login/` no backend)
- `GET/POST /utentes/` e `PATCH/DELETE /utentes/{id}/`
- `GET /administradores/`
- `GET/POST /certificados/` e `PATCH/DELETE /certificados/{id}/`
- `GET/POST /utente-certificados/` (associação enviada com `utente` e `certificado`)

O login envia `username` e `password`. A resposta deve identificar o perfil como `admin` ou `utente` (por exemplo, em `role`, `tipo`, `user_type` ou `tipo_usuario`). Tokens `access`/`access_token` são enviados como `Bearer`; `token`/`key` são enviados como `Token`. A inscrição envia `nome`, `apelido`, `nuit`, `email`, `telefone` e `endereco` para `/utentes/`.

Se o frontend e Django estiverem em origens diferentes, permita no CORS a origem local do React (`http://localhost:3000` ou `http://127.0.0.1:3000`).

## Produção

```bash
npm run build
```
