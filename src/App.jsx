import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";
import Seo from "./components/Seo.jsx";
import PageTransition from "./components/PageTransition.jsx";

// Pages publiques
import HomePage from "./pages/HomePage.jsx";
import AteliersPage from "./pages/AteliersPage.jsx";
import AtelierPage from "./pages/AtelierPage.jsx";
import OrganiserPage from "./pages/OrganiserPage.jsx";
import AProposPage from "./pages/AProposPage.jsx";
import GuidesPage from "./pages/GuidesPage.jsx";
import GuidePage from "./pages/GuidePage.jsx";
import SimulationsPage from "./pages/SimulationsPage.jsx";
import RecapsPage from "./pages/RecapsPage.jsx";
import RetenirPage from "./pages/RetenirPage.jsx";
const ChiffrementPage = lazy(() => import("./pages/ChiffrementPage.jsx"));
import VideosPage from "./pages/VideosPage.jsx";
import RetenirPage8 from "./pages/RetenirPage8.jsx";
import RetenirPage9 from "./pages/RetenirPage9.jsx";
const ScoresCn8Page = lazy(() => import("./pages/ScoresCn8Page.jsx"));
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Scénarios (plein écran, sans nav)
const LaPosteScenario = lazy(() => import("./scenarios/laposte/LaPosteScenario.jsx"));
const LaPostePayment = lazy(() => import("./scenarios/laposte/LaPostePayment.jsx"));
const SmsLaposte = lazy(() => import("./scenarios/sms-laposte/SmsLaposte.jsx"));
const PopupMicrosoft = lazy(() => import("./scenarios/popup-microsoft/PopupMicrosoft.jsx"));
const FacebookArnaque = lazy(() => import("./scenarios/facebook-arnaque/FacebookArnaque.jsx"));
const WhatsappLucas = lazy(() => import("./scenarios/whatsapp-lucas/WhatsappLucas.jsx"));
const SmsBanquePostale = lazy(() => import("./scenarios/sms-banque-postale/SmsBanquePostale.jsx"));
const WhatsappFamille = lazy(() => import("./scenarios/whatsapp-famille/WhatsappFamille.jsx"));
const WhatsappGroupe = lazy(() => import("./scenarios/whatsapp-groupe/WhatsappGroupe.jsx"));

// Atelier IA
const DefisListePage = lazy(() => import("./atelier-ia/pages/DefisListePage.jsx"));
const DefiPage = lazy(() => import("./atelier-ia/pages/DefiPage.jsx"));
const IaOuPasPage = lazy(() => import("./atelier-ia/pages/IaOuPasPage.jsx"));
const ApresPage = lazy(() => import("./atelier-ia/pages/ApresPage.jsx"));
const AnimateurPage = lazy(() => import("./atelier-ia/pages/AnimateurPage.jsx"));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Seo />
      {/* Les pages publiques sont dans le paquet principal (elles sont pré-rendues
          et hydratées) ; les simulations et supports d'animation se chargent
          seulement quand on ouvre leur adresse. */}
      <Suspense fallback={null}>
      <PageTransition>
      <Routes>
        {/* Pages publiques avec nav */}
        <Route path="/" element={<HomePage />} />
        <Route path="/ateliers" element={<AteliersPage />} />
        <Route path="/ateliers/:slug" element={<AtelierPage />} />
        <Route path="/organiser-un-atelier" element={<OrganiserPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:slug" element={<GuidePage />} />
        <Route path="/a-propos" element={<AProposPage />} />
        <Route path="/arnaques" element={<SimulationsPage />} />
        <Route path="/recaps" element={<RecapsPage />} />
        <Route path="/retenir" element={<RetenirPage />} />
        <Route path="/retenir-cn8" element={<RetenirPage8 />} />
        <Route path="/retenir-cn9" element={<RetenirPage9 />} />
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
      </PageTransition>
      </Suspense>
    </>
  );
}
