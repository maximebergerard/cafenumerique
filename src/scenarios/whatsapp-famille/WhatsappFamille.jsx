import { useState } from 'react'
import SimulationLayout from '../../components/SimulationLayout.jsx'
import WhatsappFrame, { WaBubble } from '../../components/WhatsappFrame.jsx'
import Clue from '../../components/Clue.jsx'
import styles from './WhatsappFamille.module.css'

const CLUES = [
  {
    label: 'Contact enregistré : "Lucas 🧑"',
    detail: "Son nom s'affiche au lieu d'un numéro. Il est dans vos contacts. Si c'était une arnaque, vous verriez un numéro inconnu.",
  },
  {
    label: 'Photo de profil présente',
    detail: "Lucas a une photo de profil que vous reconnaissez. Les faux comptes ont souvent une image générique ou rien du tout.",
  },
  {
    label: "Aucune urgence, aucune demande d'argent",
    detail: "Comparez avec le CAS 4 : ici, pas de 'j'ai besoin de X€ de toute urgence'. Les messages sont détendus, sans pression.",
  },
  {
    label: 'Messages cohérents et personnels',
    detail: "Il propose de venir vous voir et d'apporter un dessert - c'est naturel et personnel. Les arnaques sont des scripts génériques envoyés en masse.",
  },
]

const CONCLUSION = {
  title: 'C\'est un vrai message ✓',
  body: "Lucas vous envoie un message tout à fait ordinaire. Comparez-le avec l'arnaque du CAS 4 : la différence est dans le numéro (connu vs inconnu), l'urgence (nulle vs forte), et la demande (une visite vs de l'argent).",
  reflex:
    "À retenir : la présence dans les contacts, l'absence d'urgence et l'absence de demande d'argent sont les trois signaux positifs d'un message légitime.",
}

export default function WhatsappFamille() {
  const [replied, setReplied] = useState(false)

  return (
    <SimulationLayout
      title="CAS 6 - WhatsApp Lucas (vrai)"
      verdict="vrai"
      clues={CLUES}
      conclusion={CONCLUSION}
    >
      {({ activeIndex }) => (
        <div className={styles.container}>
          <WhatsappFrame
            contactName={
              <Clue index={0} activeIndex={activeIndex} type="ok" as="span">
                Lucas 🧑
              </Clue>
            }
            contactAvatar={
              <Clue index={1} activeIndex={activeIndex} type="ok" as="span">
                L
              </Clue>
            }
            isUnknown={false}
          >
            {/* Message 1 */}
            <WaBubble time="10:15" sent={false}>
              <p className={styles.waMsg}>
                Mamie ! Ça va ? 😊{' '}
                <Clue index={2} activeIndex={activeIndex} type="ok" as="span">
                  On serait dispo dimanche pour venir vous voir avec Léa ?
                </Clue>
              </p>
              <div className={styles.waMeta}><span className={styles.waTime}>10:15</span></div>
            </WaBubble>

            {/* Message 2 */}
            <WaBubble time="10:16" sent={false}>
              <p className={styles.waMsg}>
                <Clue index={3} activeIndex={activeIndex} type="ok" as="span">
                  On pourrait rester manger si c'est pas trop d'embêtement, j'apporterai un dessert !
                </Clue>
              </p>
              <div className={styles.waMeta}><span className={styles.waTime}>10:16</span></div>
            </WaBubble>

            {/* Message 3 */}
            <WaBubble time="10:17" sent={false}>
              <p className={styles.waMsg}>Tu as besoin de rien ? ❤️</p>
              <div className={styles.waMeta}><span className={styles.waTime}>10:17</span></div>
            </WaBubble>

            {/* Reply */}
            {replied && (
              <WaBubble time="10:18" sent={true} read={true}>
                <p className={styles.waMsgSent}>Dimanche c'est parfait ! On vous attend avec plaisir 😊</p>
                <div className={styles.waMeta}>
                  <span className={styles.waTime}>10:18</span>
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="#53bdeb" style={{ marginLeft: 3 }}>
                    <path d="M11.07.37l-5.5 8.4-3-3.57-.78.66 3.78 4.5 6.28-9.6z" />
                    <path d="M14.57.37l-5.5 8.4-.6-.72-.78.66 1.38 1.65 6.28-9.6z" />
                  </svg>
                </div>
              </WaBubble>
            )}
          </WhatsappFrame>

          {/* Reply button */}
          {!replied && (
            <div className={styles.actionRow}>
              <button
                className={styles.btnRepondre}
                onClick={() => setReplied(true)}
              >
                💬 Répondre à Lucas
              </button>
            </div>
          )}

          {replied && (
            <div className={styles.replySuccess}>
              ✅ Dimanche en famille, c'est noté ! Les vrais messages méritent une vraie réponse.
            </div>
          )}
        </div>
      )}
    </SimulationLayout>
  )
}
