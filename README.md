# ACMA

Aplicação web da ACMA, construída com React. Inclui páginas de apresentação, cursos, serviços, inscrição, consulta de certificados e sala online.

## Desenvolvimento

```bash
npm install
npm start
```

## API Django local

Por padrão, a aplicação usa `http://127.0.0.1:8000/api` no mesmo dispositivo. Quando o frontend é aberto por outro dispositivo na rede local, o endereço loopback é substituído automaticamente pelo hostname da página. Se o backend estiver noutro computador, configure `REACT_APP_API_URL` no `.env` com o IP desse computador e reinicie o React.

O cliente usa estas rotas do Django REST Framework:

- `POST /login/` (também aceita a rota alternativa `POST /auth/login/` no backend)
- `GET/POST /utentes/` e `PATCH/DELETE /utentes/{id}/`
- `GET /administradores/`
- `GET/POST /certificados/` e `PATCH/DELETE /certificados/{id}/`
- `GET/POST /utente-certificados/` (associação enviada com `utente_id` e `certificado_id`)

O login envia `username` e `password`. A resposta deve identificar o perfil como `admin` ou `utente` (por exemplo, em `role`, `tipo`, `user_type` ou `tipo_usuario`). Tokens `access`/`access_token` são enviados como `Bearer`; `token`/`key` são enviados como `Token`. A inscrição envia `nome`, `apelido`, `nuit`, `email`, `telefone` e `endereco` para `/utentes/`.

No modo de desenvolvimento, o servidor React encaminha pedidos `/api` e ficheiros do Django para `127.0.0.1:8000`.

## Acesso por outro dispositivo na rede local

No computador que executa o backend, mantenha o Django a correr na porta local `8000`:

```powershell
cd AcmaBackend
.\venv\Scripts\python.exe manage.py runserver 127.0.0.1:8000
```

Inicie o React em `Acma` com estas linhas no PowerShell:

```powershell
cd Acma
$env:HOST='0.0.0.0'
npm start
```

No computador, execute `ipconfig` e encontre o endereço IPv4 da rede Wi-Fi. No telemóvel ou noutro computador ligado à mesma rede, abra `http://IP_DO_COMPUTADOR:3000`. A API é encaminhada pelo React ao Django local, portanto só a porta `3000` precisa estar acessível na rede privada.

## Produção

```bash
npm run build
```
