import { useState } from 'react'
import SimulationLayout from '../../components/SimulationLayout.jsx'
import WhatsappFrame, { WaBubble } from '../../components/WhatsappFrame.jsx'
import Clue from '../../components/Clue.jsx'
import styles from './WhatsappLucas.module.css'

const CLUES = [
  {
    label: 'Numéro inconnu, pas dans les contacts',
    detail: "Lucas a un numéro enregistré. Si c'est vraiment lui, son nom apparaîtrait. Un inconnu qui se prétend un proche = signal d'alarme.",
  },
  {
    label: '"C\'est le téléphone d\'un ami"',
    detail: "C'est la phrase-clé de cette arnaque. Les escrocs connaissent le prénom 'Lucas' via Facebook ou Instagram de la famille.",
  },
  {
    label: "Demande d'argent en urgence",
    detail: "Toute demande d'argent urgente par message est suspecte, même si le prénom est connu. Le virement est souvent irréversible.",
  },
  {
    label: '"N\'appelle pas papa et maman"',
    detail: "C'est le signal le plus fort. Isoler la victime empêche toute vérification. Un vrai proche n'interdirait jamais d'appeler la famille.",
  },
]

const CONCLUSION = {
  title: "C'est une arnaque !",
  body: "L'arnaque aux petits-enfants est l'une des plus répandues chez les seniors. Les escrocs récupèrent des prénoms sur les réseaux sociaux de la famille et envoient ce script à des centaines de numéros.",
  reflex:
    "Le bon réflexe : raccrocher et appeler directement Lucas sur son vrai numéro. En 30 secondes, tout est éclairci. Ne jamais virer d'argent sans avoir parlé de vive voix à la personne.",
}

const ACTION_MODALS = {
  envoyer: {
    title: 'Vous envoyez 350 €',
    body: "En situation réelle, l'argent est immédiatement récupéré via un réseau de mules. Un virement Instantané est définitif : impossible de récupérer les fonds. Les escrocs demanderont souvent plus d'argent ensuite.",
    icon: '💸',
  },
}

export default function WhatsappLucas() {
  const [appelResult, setAppelResult] = useState(false)

  return (
    <SimulationLayout
      title="CAS 4 - WhatsApp 'Lucas'"
      verdict="arnaque"
      clues={CLUES}
      conclusion={CONCLUSION}
      actionModals={ACTION_MODALS}
    >
      {({ activeIndex, onAction }) => (
        <div className={styles.container}>
          <WhatsappFrame
            contactName={
              <Clue index={0} activeIndex={activeIndex} type="danger" as="span">
                +33 7 51 33 28 91
              </Clue>
            }
            contactAvatar="?"
            isUnknown={true}
          >
            {/* Message 1 */}
            <WaBubble time="14:32" sent={false}>
              <p className={styles.waMsg}>
                Mamie c'est moi Lucas, j'ai eu un accident, mon téléphone est cassé{' '}
                <Clue index={1} activeIndex={activeIndex} type="danger" as="span">
                  c'est le tel d'un ami
                </Clue>{' '}
                😢
              </p>
              <div className={styles.waMeta}><span className={styles.waTime}>14:32</span></div>
            </WaBubble>

            {/* Message 2 */}
            <WaBubble time="14:33" sent={false}>
              <p className={styles.waMsg}>
                <Clue index={2} activeIndex={activeIndex} type="danger" as="span">
                  J'ai besoin de 350€ en urgence pour payer la réparation, tu peux m'envoyer ça vite ?
                </Clue>
              </p>
              <div className={styles.waMeta}><span className={styles.waTime}>14:33</span></div>
            </WaBubble>

            {/* Message 3 */}
            <WaBubble time="14:34" sent={false}>
              <p className={styles.waMsg}>
                <Clue index={3} activeIndex={activeIndex} type="danger" as="span">
                  Surtout n'appelle pas papa et maman ils sont au travail, ils vont s'inquiéter pour rien
                </Clue>
              </p>
              <div className={styles.waMeta}><span className={styles.waTime}>14:34</span></div>
            </WaBubble>

            {/* Good outcome: Lucas replied */}
            {appelResult && (
              <>
                <div className={styles.callSeparator}>📞 Vous avez appelé Lucas</div>
                <WaBubble time="14:35" sent={false}>
                  <p className={styles.waMsg}>Mamie ? Tout va bien ! Je suis au travail 😊 Tu vas bien toi ?</p>
                  <div className={styles.waMeta}><span className={styles.waTime}>14:35</span></div>
                </WaBubble>
                <div className={styles.successNote}>
                  ✅ Lucas va bien. Vous avez évité l'arnaque.
                </div>
              </>
            )}
          </WhatsappFrame>

          {/* Action buttons */}
          {!appelResult && (
            <div className={styles.actionButtons}>
              <button
                className={styles.btnDanger}
                onClick={() => onAction('envoyer')}
              >
                💸 Envoyer l'argent
              </button>
              <button
                className={styles.btnSuccess}
                onClick={() => setAppelResult(true)}
              >
                📞 Appeler Lucas
              </button>
            </div>
          )}

          {appelResult && (
            <div className={styles.actionButtons}>
              <span className={styles.avoidedNote}>Arnaque déjouée ! Lucas va bien.</span>
            </div>
          )}
        </div>
      )}
    </SimulationLayout>
  )
}
