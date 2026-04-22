import SimulationLayout from '../../components/SimulationLayout.jsx'
import PhoneFrame, { SmsBubble } from '../../components/PhoneFrame.jsx'
import Clue from '../../components/Clue.jsx'
import styles from './SmsLaposte.module.css'

const CLUES = [
  {
    label: 'Le numéro expéditeur',
    detail: "Un numéro mobile (+33 7). La Poste envoie toujours depuis un numéro court comme '38 999'.",
  },
  {
    label: 'Le lien raccourci bit.ly',
    detail: "On ne peut pas savoir où il mène. Un lien officiel va directement sur laposte.fr.",
  },
  {
    label: "L'urgence artificielle",
    detail: '"Avant ce soir" est conçu pour court-circuiter la réflexion. Les vraies notifications ne sont pas urgentes.',
  },
  {
    label: 'Le petit montant',
    detail: "1,95 € semble anodin, mais le vrai objectif est de récupérer votre numéro de carte bancaire.",
  },
]

const CONCLUSION = {
  title: "C'est une arnaque !",
  body: 'Ce type de SMS s\'appelle le "smishing". La Poste ne demande jamais de paiement par SMS. Ces messages sont envoyés en masse, et même si vous n\'attendez pas de colis, certains mordent à l\'hameçon.',
  reflex:
    "Le bon réflexe : supprimer le SMS. Si vous avez un doute sur un vrai colis, allez directement sur laposte.fr depuis votre navigateur (jamais depuis un lien reçu).",
}

const ACTION_MODALS = {
  lien: {
    title: 'Vous venez de cliquer !',
    body: "En situation réelle, vous seriez redirigé vers un faux site de paiement qui copie exactement la charte de La Poste. Vos coordonnées bancaires seraient volées en 30 secondes.",
    icon: '💳',
  },
}

export default function SmsLaposte() {
  return (
    <SimulationLayout
      title="CAS 1 - SMS La Poste"
      verdict="arnaque"
      clues={CLUES}
      conclusion={CONCLUSION}
      actionModals={ACTION_MODALS}
    >
      {({ activeIndex, onAction }) => (
        <PhoneFrame
          contactName="La Poste"
          contactSub={
            <Clue index={0} activeIndex={activeIndex} type="danger" as="span">
              +33 7 55 12 34 56
            </Clue>
          }
        >
          <SmsBubble
            time="09:41"
            sent={false}
            text={null}
          >
            <div className={styles.msgContent}>
              <p className={styles.msgText}>
                La Poste : votre colis n°FR8823 est en attente. Frais de douane :{' '}
                <Clue index={3} activeIndex={activeIndex} type="danger" as="span">
                  1,95€
                </Clue>{' '}
                à régler{' '}
                <Clue index={2} activeIndex={activeIndex} type="danger" as="span">
                  avant ce soir
                </Clue>{' '}
                →{' '}
                <Clue index={1} activeIndex={activeIndex} type="danger" as="span">
                  <button
                    className={styles.linkBtn}
                    onClick={() => onAction('lien')}
                  >
                    bit.ly/poste-fr-livraison
                  </button>
                </Clue>
              </p>
              <span className={styles.msgTime}>09:41</span>
            </div>
          </SmsBubble>
        </PhoneFrame>
      )}
    </SimulationLayout>
  )
}
