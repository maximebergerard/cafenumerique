import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";

// Pages publiques
import HomePage from "./pages/HomePage.jsx";
import AteliersPage from "./pages/AteliersPage.jsx";
import SimulationsPage from "./pages/SimulationsPage.jsx";
import RecapsPage from "./pages/RecapsPage.jsx";
import RetenirPage from "./pages/RetenirPage.jsx";
import ChiffrementPage from "./pages/ChiffrementPage.jsx";
import VideosPage from "./pages/VideosPage.jsx";
import RetenirPage8 from "./pages/RetenirPage8.jsx";
import ScoresCn8Page from "./pages/ScoresCn8Page.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Scénarios (plein écran, sans nav)
import LaPosteScenario from "./scenarios/laposte/LaPosteScenario.jsx";
import LaPostePayment from "./scenarios/laposte/LaPostePayment.jsx";
import SmsLaposte from "./scenarios/sms-laposte/SmsLaposte.jsx";
import PopupMicrosoft from "./scenarios/popup-microsoft/PopupMicrosoft.jsx";
import FacebookArnaque from "./scenarios/facebook-arnaque/FacebookArnaque.jsx";
import WhatsappLucas from "./scenarios/whatsapp-lucas/WhatsappLucas.jsx";
import SmsBanquePostale from "./scenarios/sms-banque-postale/SmsBanquePostale.jsx";
import WhatsappFamille from "./scenarios/whatsapp-famille/WhatsappFamille.jsx";
import WhatsappGroupe from "./scenarios/whatsapp-groupe/WhatsappGroupe.jsx";

// Atelier IA
import DefisListePage from "./atelier-ia/pages/DefisListePage.jsx";
import DefiPage from "./atelier-ia/pages/DefiPage.jsx";
import IaOuPasPage from "./atelier-ia/pages/IaOuPasPage.jsx";
import ApresPage from "./atelier-ia/pages/ApresPage.jsx";
import AnimateurPage from "./atelier-ia/pages/AnimateurPage.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Pages publiques avec nav */}
        <Route path="/" element={<HomePage />} />
        <Route path="/ateliers" element={<AteliersPage />} />
        <Route path="/arnaques" element={<SimulationsPage />} />
        <Route path="/recaps" element={<RecapsPage />} />
        <Route path="/retenir" element={<RetenirPage />} />
        <Route path="/retenir-cn8" element={<RetenirPage8 />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Simulations plein écran (sans nav) */}
        <Route path="/laposte" element={<LaPosteScenario />} />
        <Route path="/laposte/paiement" element={<LaPostePayment />} />
        <Route path="/sms-laposte" element={<SmsLaposte />} />
        <Route path="/popup-microsoft" element={<PopupMicrosoft />} />
        <Route path="/facebook-arnaque" element={<FacebookArnaque />} />
        <Route path="/whatsapp-lucas" element={<WhatsappLucas />} />
        <Route path="/sms-banque-postale" element={<SmsBanquePostale />} />
        <Route path="/whatsapp-famille" element={<WhatsappFamille />} />
        <Route path="/whatsapp-groupe" element={<WhatsappGroupe />} />
        <Route path="/chiffrement" element={<ChiffrementPage />} />
        <Route path="/scores-cn8" element={<ScoresCn8Page key="cn8" />} />

        {/* Atelier IA */}
        <Route path="/atelier-ia/defis" element={<DefisListePage />} />
        <Route path="/atelier-ia/defis/:id" element={<DefiPage />} />
        <Route path="/atelier-ia/ia-ou-pas" element={<IaOuPasPage />} />
        <Route
          path="/atelier-ia/scores"
          element={<ScoresCn8Page key="atelier-ia" storageKey="atelier_ia_scores" title="Scores Atelier IA" backTo="/atelier-ia/animateur" />}
        />
        <Route path="/atelier-ia/apres" element={<ApresPage />} />
        <Route path="/atelier-ia/animateur" element={<AnimateurPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
