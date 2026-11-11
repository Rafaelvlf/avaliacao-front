import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="btn btn-secundario"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    >
      Sair
    </button>
  );
};

export default LogoutButton;
