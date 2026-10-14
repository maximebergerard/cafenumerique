import { useNavigate } from "react-router-dom";
import AnimatorPanel from "../../components/AnimatorPanel.jsx";
import styles from "./LaPosteScenario.module.css";
import { Archive, ArrowBendUpLeft, ArrowRight, Envelope, Package, PaperPlaneTilt, Star, Trash, Tray } from '../../icons/index.jsx'

// -- Utilitaires horaires -----------------------------------------------------

// Heure actuelle - 2 min, format "HH:MM" (ex: "09:43")
function getMailTime() {
  const d = new Date(Date.now() - 2 * 60 * 1000);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

// Heure actuelle + 2h, arrondie à la demi-heure la plus proche, format "Hh[MM]" (ex: "11h30" ou "12h")
function getDeadlineTime() {
  const d = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const roundedMin = Math.round(d.getMinutes() / 30) * 30;
  const h = roundedMin === 60 ? (d.getHours() + 1) % 24 : d.getHours();
  const m = roundedMin === 60 ? 0 : roundedMin;
  return `${h}h${m === 0 ? "" : String(m).padStart(2, "0")}`;
}

// -- Données du scénario ------------------------------------------------------
// Tout ce qui est "suspect" dans le scénario est centralisé ici pour faciliter
// la maintenance et la discussion avec le groupe.

const INDICES = [
  {
    label: "L'adresse mail de l'expéditeur",
    detail:
      "laposte.livraison@notifications-poste.com et non @laposte.fr. La Poste écrit toujours depuis @laposte.fr",
  },
  {
    label: "L'URL du bouton CTA",
    detail:
      "laposte-paiement-rapide.xyz n'a rien d'officiel. Le vrai site c'est laposte.fr, point.",
  },
  {
    label: "L'URL dans la barre du navigateur",
    detail:
      "laposte-espace-client.net en haut de page. Pas .fr, pas laposte.fr. Subtil mais faux.",
  },
  {
    label: "L'urgence artificielle",
    detail:
      '"Avant telle heure", "retourné", "frais supplémentaires". Tout est fait pour paniquer et court-circuiter la réflexion.',
  },
  {
    label: "Le montant dérisoire",
    detail:
      "2,49 € semble sans risque. En réalité, ils récupèrent le numéro de carte bancaire.",
  },
];

// -- Composant ----------------------------------------------------------------

export default function LaPosteScenario() {
  const navigate = useNavigate();
  const mailTime = getMailTime();
  const deadline = getDeadlineTime();

  function handleCtaClick() {
    navigate("/laposte/paiement");
  }

  return (
    <div className={styles.page}>
      {/* Barre navigateur simulée */}
      <div className={styles.browserBar}>
        <div className={styles.browserDots}>
          <div className={`${styles.dot} ${styles.dotR}`} />
          <div className={`${styles.dot} ${styles.dotY}`} />
          <div className={`${styles.dot} ${styles.dotG}`} />
        </div>
        {/* URL suspecte : laposte-espace-client.net au lieu de laposte.fr */}
        <div className={styles.browserUrl}>
          🔒 <span className={styles.urlText}>https://</span>
          <span className={styles.urlHighlight}>laposte-espace-client.net</span>
          <span className={styles.urlText}>/mail</span>
        </div>
      </div>

      {/* App mail */}
      <div className={styles.mailApp}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarLogo}><Envelope size={18} /> MonMail</div>
          <div className={`${styles.sidebarItem} ${styles.active}`}>
            <Tray size={16} /> Boîte de réception <span className={styles.badge}>1</span>
          </div>
          <div className={styles.sidebarItem}><Star size={16} /> Favoris</div>
          <div className={styles.sidebarItem}><PaperPlaneTilt size={16} /> Envoyés</div>
          <div className={styles.sidebarItem}><Archive size={16} /> Archives</div>
          <div className={styles.sidebarItem}><Trash size={16} /> Corbeille</div>
        </div>

        {/* Liste des mails */}
        <div className={styles.mailList}>
          <div className={styles.mailListHeader}>
            Boîte de réception (1 non lu)
          </div>

          {/* Mail arnaque - non lu, actif */}
          <div
            className={`${styles.mailItem} ${styles.unread} ${styles.activeItem}`}
          >
            <div className={styles.mailSender}>
              <div className={styles.senderWithDot}>
                <div className={styles.unreadDot} />
                La Poste - Service Client
              </div>
              <span className={styles.mailDateSmall}>
                Aujourd'hui, {mailTime}
              </span>
            </div>
            <div className={styles.mailSubjectSmall}>
              ⚠️ Action requise : votre colis en attente
            </div>
            <div className={styles.mailPreview}>
              Bonjour, votre colis n°FR882341 est en attente de livraison...
            </div>
          </div>

          {/* Mails lus (décor) */}
          <div className={styles.mailItem}>
            <div className={styles.mailSender}>
              Mairie de Nandy
              <span className={styles.mailDateSmall}>Hier</span>
            </div>
            <div className={styles.mailSubjectSmall}>
              Bulletin municipal - Mars 2026
            </div>
            <div className={styles.mailPreview}>
              Retrouvez les actualités de votre commune...
            </div>
          </div>

          <div className={styles.mailItem}>
            <div className={styles.mailSender}>
              Caisse Retraite
              <span className={styles.mailDateSmall}>Lun.</span>
            </div>
            <div className={styles.mailSubjectSmall}>
              Votre relevé trimestriel
            </div>
            <div className={styles.mailPreview}>
              Madame, Monsieur, veuillez trouver ci-joint...
            </div>
          </div>
        </div>

        {/* Corps du mail */}
        <div className={styles.mailContent}>
          <div className={styles.mailToolbar}>
            <button className={styles.toolbarBtn}><ArrowBendUpLeft size={16} /> Répondre</button>
            <button className={styles.toolbarBtn}><ArrowRight size={16} /> Transférer</button>
            <button className={styles.toolbarBtn}><Trash size={16} /> Supprimer</button>
          </div>

          <div className={styles.mailBody}>
            <div className={styles.mailSubject}>
              ⚠️ Action requise : votre colis en attente de livraison
              <span className={styles.urgentTag}>Urgent</span>
            </div>

            <div className={styles.mailMeta}>
              <div className={styles.senderAvatar}><Package size={22} /></div>
              <div className={styles.senderInfo}>
                <div className={styles.senderName}>
                  La Poste - Service Livraison
                </div>
                {/* Adresse suspecte : laposte.livraison@notifications-poste.com */}
                <div className={styles.senderEmail}>
                  laposte.livraison@notifications-poste.com
                </div>
              </div>
              <div className={styles.mailDate}>Aujourd'hui à {mailTime}</div>
            </div>

            {/* Le mail en lui-même */}
            <div className={styles.emailContainer}>
              <div className={styles.emailHeaderBand}>
                {/* Logo La Poste approximatif - couleur jaune/or légèrement différente */}
                <div className={styles.laposteLogo}>La Poste</div>
                <div className={styles.laposteTagline}>
                  Le service qui vous rapproche
                </div>
              </div>

              <div className={styles.emailBody}>
                <div className={styles.emailAlertBox}>
                  <strong>
                    ⚠️ Votre colis est en attente - Action requise avant{" "}
                    {deadline}
                  </strong>
                  Un problème a été détecté lors de la livraison de votre colis.
                  Un règlement de <strong>2,49 €</strong> est nécessaire pour
                  finaliser la livraison.
                </div>

                <p>Bonjour,</p>

                <p>
                  Nous vous informons que votre colis portant le numéro de suivi{" "}
                  <span className={styles.highlight}>FR882341XP</span> n'a pas
                  pu être livré à votre adresse en raison de{" "}
                  <strong>frais de douane impayés</strong>.
                </p>

                <p>
                  Afin d'éviter le renvoi de votre colis à l'expéditeur, nous
                  vous invitons à régler la somme de{" "}
                  <span className={styles.highlight}>2,49 €</span> avant ce soir
                  à {deadline}.
                </p>

                <p>
                  Passé ce délai, votre colis sera automatiquement retourné et
                  des frais supplémentaires pourront être appliqués.
                </p>

                <div className={styles.ctaSection}>
                  <button className={styles.ctaBtn} onClick={handleCtaClick}>
                    Régler mes frais de livraison →
                  </button>
                  {/* URL sous le bouton - très suspecte si on la lit */}
                  <span className={styles.ctaUrl}>
                    →
                    http://laposte-paiement-rapide.xyz/fr/checkout?ref=FR882341XP
                  </span>
                </div>

                <p className={styles.signoff}>
                  Cordialement,
                  <br />
                  <strong>Le Service Clientèle La Poste</strong>
                  <br />
                  Numéro de dossier : #LPF-2026-882341
                </p>
              </div>

              <div className={styles.emailFooter}>
                Ce message a été envoyé automatiquement par notre système de
                notification. Merci de ne pas répondre directement à cet e-mail.
                <br />
                La Poste SA - 9 rue du Colonel Pierre Avia, 75015 Paris -{" "}
                <em>laposte.fr</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panneau animateur */}
      <AnimatorPanel title="Les 5 indices à faire trouver" indices={INDICES} />
    </div>
  );
}
