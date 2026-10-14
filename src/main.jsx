import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// Polices hébergées avec le site (aucune requête vers Google Fonts)
import '@fontsource/montserrat/latin-600.css'
import '@fontsource/montserrat/latin-700.css'
import '@fontsource/montserrat/latin-800.css'
import '@fontsource/dm-sans/latin-300.css'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/dm-sans/latin-700.css'
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
