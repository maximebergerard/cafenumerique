import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

try {
  if (localStorage.getItem('largeFont') === 'true') {
    document.documentElement.classList.add('large-fonts')
  }
} catch {
  // stockage indisponible
}

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Pages publiques : HTML déjà pré-rendu au build → on l'hydrate.
// Simulations et supports d'animation : pas de pré-rendu → rendu classique.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
