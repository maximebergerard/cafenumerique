import { useState } from 'react'
import SimulationLayout from '../../components/SimulationLayout.jsx'
import Clue from '../../components/Clue.jsx'
import styles from './PopupMicrosoft.module.css'

const CLUES = [
  {
    label: 'Le numéro de téléphone à appeler',
    detail: "Microsoft n'affiche jamais de numéro à appeler dans une alerte Windows. Ce sont des escrocs qui attendent votre appel.",
  },
  {
    label: "Le titre alarmant 'ALERTE SÉCURITÉ'",
    detail: "Windows n'utilise pas ce type de langage. Les vraies alertes système sont sobres et techniques.",
  },
  {
    label: "L'alarme visuelle clignotante",
    detail: "Conçue pour provoquer la panique et vous faire agir sans réfléchir. C'est une technique classique d'ingénierie sociale.",
  },
  {
    label: "Le bouton 'Appeler maintenant'",
    detail: "Aucun système d'exploitation légitime n'a de bouton pour appeler un support. C'est toujours une arnaque.",
  },
]

const CONCLUSION = {
  title: "C'est une arnaque !",
  body: 'Cette technique s\'appelle la "fraude au support technique". Les victimes appellent un faux technicien qui demande l\'accès à distance à l\'ordinateur, puis installe des logiciels malveillants ou demande de l\'argent.',
  reflex:
    "Le bon réflexe : Alt+F4 pour fermer la fenêtre, ou éteindre directement l'ordinateur. Ne jamais appeler le numéro affiché.",
}

const ACTION_MODALS = {
  appeler: {
    title: 'Vous appelez le faux support !',
    body: "En situation réelle, un 'technicien' répondrait. Il vous demanderait d'installer un logiciel d'accès à distance (AnyDesk, TeamViewer). Une fois connecté, il pourrait tout voir et tout voler sur votre ordinateur.",
    icon: '📞',
  },
}

export default function PopupMicrosoft() {
  const [fermerSuccess, setFermerSuccess] = useState(false)

  return (
    <SimulationLayout
      title="CAS 2 - Fausse alerte Microsoft"
      verdict="arnaque"
      clues={CLUES}
      conclusion={CONCLUSION}
      actionModals={ACTION_MODALS}
    >
      {({ activeIndex, onAction }) => (
        <div className={styles.desktop}>
          {/* Windows wallpaper background */}
          <div className={styles.wallpaper}>
            {/* Taskbar */}
            <div className={styles.taskbar}>
              <div className={styles.taskbarLeft}>
                <button className={styles.winBtn} aria-label="Menu démarrer">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
                    <rect x="0" y="0" width="8" height="8" />
                    <rect x="10" y="0" width="8" height="8" />
                    <rect x="0" y="10" width="8" height="8" />
                    <rect x="10" y="10" width="8" height="8" rx="1" fill="#00adef" />
                  </svg>
                </button>
                <button className={styles.searchBar}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="#999">
                    <circle cx="6" cy="6" r="4.5" stroke="#999" strokeWidth="1.5" fill="none" />
                    <path d="M10 10l3 3" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span>Rechercher</span>
                </button>
              </div>
              <div className={styles.taskbarRight}>
                <span className={styles.taskbarClock}>
                  <span>09:41</span>
                  <span>20/03/2026</span>
                </span>
              </div>
            </div>

            {/* Security dialog */}
            <div className={styles.dialogWrapper}>
              <Clue index={2} activeIndex={activeIndex} type="danger" as="div">
                <div className={styles.dialog}>
                  {/* Title bar */}
                  <div className={styles.titleBar}>
                    <div className={styles.titleBarLeft}>
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="white" style={{ flexShrink: 0 }}>
                        <rect x="0" y="0" width="8" height="8" />
                        <rect x="10" y="0" width="8" height="8" />
                        <rect x="0" y="10" width="8" height="8" />
                        <rect x="10" y="10" width="8" height="8" rx="1" fill="#00adef" />
                      </svg>
                      <Clue index={1} activeIndex={activeIndex} type="danger" as="span">
                        <span className={styles.titleBarText}>
                          Windows Sécurité - Microsoft Support
                        </span>
                      </Clue>
                    </div>
                    <button className={styles.titleBarClose}>✕</button>
                  </div>

                  {/* Body */}
                  <div className={styles.dialogBody}>
                    <div className={styles.dialogIcon}>⚠️</div>
                    <div className={styles.dialogContent}>
                      <Clue index={1} activeIndex={activeIndex} type="danger" as="div">
                        <h2 className={styles.dialogTitle}>
                          🚨 ALERTE SÉCURITÉ - ACCÈS NON AUTORISÉ DÉTECTÉ
                        </h2>
                      </Clue>
                      <p className={styles.dialogText}>
                        Votre ordinateur a été bloqué pour votre sécurité. Une activité suspecte a été détectée. Vos données personnelles, vos mots de passe et vos informations bancaires sont en danger.
                      </p>
                      <p className={styles.dialogText}>
                        <strong>Appelez immédiatement le support Microsoft :</strong>
                      </p>
                      <Clue index={0} activeIndex={activeIndex} type="danger" as="div">
                        <div className={styles.phoneNumber}>
                          📞 0800 123 456
                        </div>
                      </Clue>
                      <p className={styles.dialogSubtext}>
                        Appel gratuit · Disponible 24h/24 · Ne fermez pas cette fenêtre
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className={styles.dialogButtons}>
                    <Clue index={3} activeIndex={activeIndex} type="danger" as="div">
                      <button
                        className={styles.btnCall}
                        onClick={() => onAction('appeler')}
                      >
                        APPELER MAINTENANT
                      </button>
                    </Clue>
                    <button
                      className={styles.btnClose}
                      onClick={() => setFermerSuccess(true)}
                    >
                      Fermer la fenêtre
                    </button>
                  </div>
                </div>
              </Clue>
            </div>
          </div>

          {/* Success toast for closing */}
          {fermerSuccess && (
            <div className={styles.successToast}>
              <span className={styles.successIcon}>✅</span>
              <div>
                <strong>Bravo ! Bon réflexe.</strong>
                <p>Fermer la fenêtre est exactement ce qu'il faut faire. Alt+F4 ou le gestionnaire des tâches si la fenêtre refuse de se fermer.</p>
              </div>
              <button className={styles.toastClose} onClick={() => setFermerSuccess(false)}>✕</button>
            </div>
          )}
        </div>
      )}
    </SimulationLayout>
  )
}
