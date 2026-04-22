import { Routes, Route } from 'react-router-dom'

// Pages publiques
import HomePage from './pages/HomePage.jsx'
import AteliersPage from './pages/AteliersPage.jsx'
import SimulationsPage from './pages/SimulationsPage.jsx'
import RecapsPage from './pages/RecapsPage.jsx'
import RetenirPage from './pages/RetenirPage.jsx'

// Scénarios (plein écran, sans nav)
import LaPosteScenario from './scenarios/laposte/LaPosteScenario.jsx'
import LaPostePayment from './scenarios/laposte/LaPostePayment.jsx'
import SmsLaposte from './scenarios/sms-laposte/SmsLaposte.jsx'
import PopupMicrosoft from './scenarios/popup-microsoft/PopupMicrosoft.jsx'
import FacebookArnaque from './scenarios/facebook-arnaque/FacebookArnaque.jsx'
import WhatsappLucas from './scenarios/whatsapp-lucas/WhatsappLucas.jsx'
import SmsBanquePostale from './scenarios/sms-banque-postale/SmsBanquePostale.jsx'
import WhatsappFamille from './scenarios/whatsapp-famille/WhatsappFamille.jsx'

export default function App() {
  return (
    <Routes>
      {/* Pages publiques avec nav */}
      <Route path="/" element={<HomePage />} />
      <Route path="/ateliers" element={<AteliersPage />} />
      <Route path="/arnaques" element={<SimulationsPage />} />
      <Route path="/recaps" element={<RecapsPage />} />
      <Route path="/retenir" element={<RetenirPage />} />

      {/* Simulations plein écran (sans nav) */}
      <Route path="/laposte" element={<LaPosteScenario />} />
      <Route path="/laposte/paiement" element={<LaPostePayment />} />
      <Route path="/sms-laposte" element={<SmsLaposte />} />
      <Route path="/popup-microsoft" element={<PopupMicrosoft />} />
      <Route path="/facebook-arnaque" element={<FacebookArnaque />} />
      <Route path="/whatsapp-lucas" element={<WhatsappLucas />} />
      <Route path="/sms-banque-postale" element={<SmsBanquePostale />} />
      <Route path="/whatsapp-famille" element={<WhatsappFamille />} />
    </Routes>
  )
}
