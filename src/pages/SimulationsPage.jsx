import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package2,
  MessageSquare,
  Monitor,
  ShoppingBag,
  AlertCircle,
  Building2,
  MessageCircle,
  QrCode,
  Lock,
} from "lucide-react";
import Layout from "../components/Layout.jsx";
import QrModal from "../components/QrModal.jsx";
import styles from "./SimulationsPage.module.css";

const ICE_BREAKERS = [
  {
    id: "chiffrement",
    path: "/chiffrement",
    Icon: Lock,
    label: "Le chiffrement de bout en bout",
    description:
      "Démonstration interactive : pourquoi un SMS est une lettre ouverte, et comment WhatsApp chiffre vos messages. Envoyez un message et observez ce que voit un intercepteur.",
    tags: ["Chiffrement", "WhatsApp", "Sécurité"],
    type: "ice-breaker",
  },
  {
    id: "laposte",
    path: "/laposte",
    Icon: Package2,
    label: "Ice-breaker - Faux mail La Poste",
    description:
      "L'animateur joue le rôle de quelqu'un qui reçoit un mail de phishing. Le groupe doit le démasquer. Idéal pour lancer la séance.",
    tags: ["Phishing", "Urgence artificielle", "Faux lien"],
    type: "ice-breaker",
  },
  {
    id: "whatsapp-groupe",
    path: "/whatsapp-groupe",
    Icon: MessageCircle,
    label: "Ice-breaker CN8 - Le groupe famille de l'enfer",
    description:
      "Reconstitution d'un groupe WhatsApp de famille : vocal de 3 minutes à 7h, avalanche de GIFs, 'ok' de la nièce après 3 semaines... Révélation progressive pour l'animateur.",
    tags: ["WhatsApp", "Groupe", "Humour", "CN8"],
    type: "ice-breaker",
  },
];

const SIMULATIONS = [
  {
    id: "sms-laposte",
    path: "/sms-laposte",
    Icon: MessageSquare,
    label: "CAS 1 - SMS La Poste",
    description:
      "Un SMS prétend qu'un colis est bloqué et demande 1,95 € de frais de douane via un lien bit.ly.",
    tags: ["Smishing", "Faux lien", "Urgence"],
    verdict: "arnaque",
  },
  {
    id: "popup-microsoft",
    path: "/popup-microsoft",
    Icon: Monitor,
    label: "CAS 2 - Alerte Microsoft",
    description:
      "Une fenêtre Windows alarmante demande d'appeler un faux support technique.",
    tags: ["Fraude support", "Ingénierie sociale"],
    verdict: "arnaque",
  },
  {
    id: "facebook-arnaque",
    path: "/facebook-arnaque",
    Icon: ShoppingBag,
    label: "CAS 3 - Pub Facebook",
    description:
      "Une publicité Facebook vend un robot de cuisine à -90% sur un site en .xyz.",
    tags: ["Fausse pub", "Site frauduleux"],
    verdict: "arnaque",
  },
  {
    id: "whatsapp-lucas",
    path: "/whatsapp-lucas",
    Icon: AlertCircle,
    label: 'CAS 4 - WhatsApp "Lucas"',
    description:
      "Un numéro inconnu se prétend être le petit-fils Lucas et demande 350 € en urgence.",
    tags: ["Arnaque petits-enfants", "Usurpation identité"],
    verdict: "arnaque",
  },
  {
    id: "sms-banque-postale",
    path: "/sms-banque-postale",
    Icon: Building2,
    label: "CAS 5 - SMS Banque Postale",
    description:
      "Un vrai SMS d'alerte de La Banque Postale signale une connexion inhabituelle.",
    tags: ["Authentique", "Alerte bancaire"],
    verdict: "vrai",
  },
  {
    id: "whatsapp-famille",
    path: "/whatsapp-famille",
    Icon: MessageCircle,
    label: "CAS 6 - WhatsApp Lucas (vrai)",
    description:
      "Lucas (contact enregistré) propose de venir déjeuner dimanche avec sa compagne.",
    tags: ["Authentique", "Message familial"],
    verdict: "vrai",
  },
];

export default function SimulationsPage() {
  const [showQr, setShowQr] = useState(false);

  return (
    <Layout>
      {showQr && <QrModal onClose={() => setShowQr(false)} />}

      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Simulations d'arnaques</h1>
            <p className={styles.desc}>
              Des interfaces réalistes pour apprendre à repérer les signaux
              d'alarme - en binôme ou en groupe. L'animateur peut projeter
              chaque cas et révéler les indices progressivement.
            </p>
            <button className={styles.qrBtn} onClick={() => setShowQr(true)}>
              <QrCode size={16} />
              Générer le QR code mémo participants
            </button>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Ice-breaker - Pour lancer la séance
            </h2>
            <p className={styles.sectionDesc}>
              L'animateur joue un personnage, le groupe joue les détectives.
            </p>
            <div className={styles.grid}>
              {ICE_BREAKERS.map((s) => (
                <Link key={s.id} to={s.path} className={styles.card}>
                  <div
                    className={`${styles.cardIconWrap} ${styles.cardIconBreaker}`}
                  >
                    <s.Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <span className={styles.typeBadge}>Théâtre-forum</span>
                      <span className={styles.cardLabel}>{s.label}</span>
                    </div>
                    <p className={styles.cardDesc}>{s.description}</p>
                    <div className={styles.tags}>
                      {s.tags.map((t) => (
                        <span key={t} className={styles.tag}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.cardArrow}>→</div>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Cas pratiques - En binôme</h2>
            <p className={styles.sectionDesc}>
              Les cas <span className={styles.arnaqueBadge}>Arnaque</span> et{" "}
              <span className={styles.vraiBadge}>Vrai</span> vont par paires -
              comparez SMS 1 avec SMS 5, et WhatsApp 4 avec WhatsApp 6.
            </p>
            <div className={styles.grid}>
              {SIMULATIONS.map((s) => (
                <Link
                  key={s.id}
                  to={s.path}
                  className={`${styles.card} ${s.verdict === "arnaque" ? styles.cardArnaque : styles.cardVrai}`}
                >
                  <div
                    className={`${styles.cardIconWrap} ${s.verdict === "arnaque" ? styles.cardIconArnaque : styles.cardIconVrai}`}
                  >
                    <s.Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTop}>
                      <span
                        className={
                          s.verdict === "arnaque"
                            ? styles.arnaqueBadge
                            : styles.vraiBadge
                        }
                      >
                        {s.verdict === "arnaque" ? "Arnaque" : "Vrai"}
                      </span>
                      <span className={styles.cardLabel}>{s.label}</span>
                    </div>
                    <p className={styles.cardDesc}>{s.description}</p>
                    <div className={styles.tags}>
                      {s.tags.map((t) => (
                        <span key={t} className={styles.tag}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.cardArrow}>→</div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Lien animateur discret */}
        <div className={styles.animatorBar}>
          <Link to="/scores-cn8" className={styles.animatorLink}>
            🎯 Résultats CN8
          </Link>
        </div>

      </div>
    </Layout>
  );
}
