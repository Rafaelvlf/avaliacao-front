import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Avaliacoes from "./Avaliacoes";
import { ROLES_CLAIM, TITULO } from "./config";

function App() {
  const { user, isAuthenticated, isLoading, error, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [roles, setRoles] = useState([]);
  const [mostrarToken, setMostrarToken] = useState(false);

  // Mesmo esquema do front do professor: pega o token e le as roles do payload
  useEffect(() => {
    const buscarToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);

        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        setRoles(payload[ROLES_CLAIM] || []);
      } catch (e) {
        console.error("Erro ao buscar token:", e);
      }
    };

    if (isAuthenticated) {
      buscarToken();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const isAdmin = roles.includes("ADMIN");

  if (isLoading) {
    return <div className="container"><p>Carregando...</p></div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="erro">Erro no login: {error.message}</div>
        <LoginButton />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container centro">
        <h1>{TITULO}</h1>
        <p>Faça login para continuar.</p>
        <LoginButton />
      </div>
    );
  }

  return (
    <div className="container">
      <header className="card cabecalho">
        <div>
          <strong>{user.name}</strong>
          <div className="cinza">{user.email}</div>
          <span className={isAdmin ? "badge badge-admin" : "badge"}>
            {isAdmin ? "ADMIN" : "USER"}
          </span>
        </div>
        <div className="acoes">
          <button className="btn btn-secundario" onClick={() => setMostrarToken(!mostrarToken)}>
            {mostrarToken ? "Esconder token" : "Ver token"}
          </button>
          <LogoutButton />
        </div>
      </header>

      {/* Util para copiar o token e testar o back no Postman */}
      {mostrarToken && (
        <div className="card">
          <p className="cinza">Access token (use no Postman: Authorization → Bearer Token)</p>
          <code className="token">{token || "Carregando..."}</code>
          {token && (
            <pre className="token">
              {JSON.stringify(JSON.parse(atob(token.split(".")[1])), null, 2)}
            </pre>
          )}
        </div>
      )}

      {token && <Avaliacoes token={token} isAdmin={isAdmin} />}
    </div>
  );
}

export default App;
