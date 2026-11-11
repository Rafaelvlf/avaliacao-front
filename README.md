# Front – Avaliações

React + Vite + Auth0. Lista e cadastra registros na API (o formulário só aparece para ADMIN).

## Rodar local

```bash
npm install
npm run dev
```

Abre em http://localhost:5173. Chamadas para `/api/...` vão para `http://localhost:8080` (ver `vite.config.js`).

## O que trocar

- `src/config.js` → dados do Auth0, nome do recurso (`RECURSO`), campos do formulário (`CAMPOS_FORM`) e colunas da tabela (`COLUNAS`).
- `vercel.json` → `SEU_IP_AWS` pelo IP da máquina onde o back está rodando.
