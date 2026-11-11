// =====================================================================
//  TUDO QUE VOCE PRECISA MUDAR NA PROVA ESTA NESTE ARQUIVO
// =====================================================================

// ---------- Auth0 ----------
// domain e clientId: Applications -> (sua SPA) -> Settings
// audience: Applications -> APIs -> "API Audience"
export const AUTH0_DOMAIN = "dev-5hln6oazovanzovo.us.auth0.com";
export const AUTH0_CLIENT_ID = "wiKiMNfOwHOuKy6hOUx6SzMxt8JRLm7W";
export const AUTH0_AUDIENCE = "https://dev-5hln6oazovanzovo.us.auth0.com/api/v2/";

// Mesmo namespace usado na Action de post-login do Auth0
export const ROLES_CLAIM = "https://social-insper.com/roles";

// ---------- API ----------
// O front chama /api/... e o vite.config.js (local) ou vercel.json (Vercel)
// redireciona para o back-end. Nao precisa colocar o IP aqui.
export const API_URL = "/api";
export const RECURSO = "avaliacoes"; // vira /api/avaliacoes

// ---------- Textos da tela ----------
export const TITULO = "Avaliações";
export const TITULO_FORM = "Nova avaliação";

// ---------- Campos do formulario de cadastro ----------
// tipo: "text" | "email" | "number" | "textarea" | "date" | "datetime-local" | "select"
// Para "select", informe opcoes: [{ valor: "X", label: "X" }, ...]
export const CAMPOS_FORM = [
  { nome: "emailAvaliado", label: "Email do avaliado", tipo: "email", obrigatorio: true },
  { nome: "nota", label: "Nota (0 a 10)", tipo: "number", min: 0, max: 10, step: 0.5, obrigatorio: true },
  { nome: "comentarios", label: "Comentários", tipo: "textarea" },
];

// ---------- Colunas da tabela de listagem ----------
// tipo "data" formata datas no padrao brasileiro
export const COLUNAS = [
  { nome: "id", label: "ID" },
  { nome: "emailAvaliador", label: "Avaliador" },
  { nome: "emailAvaliado", label: "Avaliado" },
  { nome: "nota", label: "Nota" },
  { nome: "comentarios", label: "Comentários" },
  { nome: "dataAvaliacao", label: "Data", tipo: "data" },
];
