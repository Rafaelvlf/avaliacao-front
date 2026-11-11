import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import './index.css'
import App from './App.jsx'
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE } from './config.js'

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={AUTH0_DOMAIN}
    clientId={AUTH0_CLIENT_ID}
    authorizationParams={{
      audience: AUTH0_AUDIENCE,
      redirect_uri: window.location.origin,
    }}
    // Guarda o token no navegador: o usuario continua logado ao dar F5
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>,
)
