import { useState } from 'react'
import SimulationLayout from '../../components/SimulationLayout.jsx'
import PhoneFrame, { SmsBubble } from '../../components/PhoneFrame.jsx'
import Clue from '../../components/Clue.jsx'
import styles from './SmsBanquePostale.module.css'

const CLUES = [
  {
    label: 'Expéditeur officiel, pas un numéro mobile',
    detail: '"Banque Postale" est un identifiant d\'expéditeur officiel. Les arnaques utilisent des numéros mobiles (+33 7...).',
  },
  {
    label: 'Aucun lien dans le message',
    detail: "Les vraies banques ne vous demandent jamais de cliquer sur un lien par SMS. Aucun 'bit.ly' ou URL ici.",
  },
  {
    label: "Mise en garde explicite contre l'arnaque",
    detail: '"Ne communiquez jamais votre code" - une vraie banque vous rappelle activement de vous méfier. Une arnaque ne le ferait pas.',
  },
  {
    label: 'Numéro court officiel (3639)',
    detail: "Le 3639 est le numéro officiel de La Banque Postale, gratuit et disponible 24h/24. Vérifiable sur le site officiel.",
  },
]

const CONCLUSION = {
  title: 'C\'est un message légitime ✓',
  body: "Ce SMS présente tous les signes d'authenticité : expéditeur officiel, aucun lien, mise en garde, numéro court. Comparez-le avec les arnaques : la différence est nette.",
  reflex:
    "À retenir : une vraie banque ne vous demandera jamais votre code PIN, jamais de cliquer sur un lien. En cas de doute, appelez le numéro au dos de votre carte.",
}

export default function SmsBanquePostale() {
  const [appelSuccess, setAppelSuccess] = useState(false)

  return (
    <SimulationLayout
      title="CAS 5 - SMS La Banque Postale"
      verdict="vrai"
      clues={CLUES}
      conclusion={CONCLUSION}
    >
      {({ activeIndex }) => (
        <div className={styles.container}>
          <PhoneFrame
            contactName={
              <Clue index={0} activeIndex={activeIndex} type="ok" as="span">
                Banque Postale
              </Clue>
            }
            contactSub={
              <Clue index={0} activeIndex={activeIndex} type="ok" as="span">
                Expéditeur officiel
              </Clue>
            }
          >
            <SmsBubble time="09:41" sent={false}>
              <div className={styles.msgContent}>
                <p className={styles.msgText}>
                  LA BANQUE POSTALE : Tentative de connexion inhabituelle détectée sur votre espace client (le 20/03 à 09:38). Si vous n'êtes pas à l'origine de cette action, appelez le{' '}
                  <Clue index={3} activeIndex={activeIndex} type="ok" as="span">
                    <strong>3639</strong> (appel gratuit, 24h/24)
                  </Clue>
                  .{' '}
                  <Clue index={2} activeIndex={activeIndex} type="ok" as="span">
                    Ne communiquez jamais votre code secret à personne.
                  </Clue>
                </p>
                <span className={styles.msgTime}>09:41</span>

                {/* Clue 1: no link - we add a visual note for the clue panel */}
                <Clue index={1} activeIndex={activeIndex} type="ok" as="div">
                  <div className={styles.noLinkNote}>
                    ✅ Aucun lien dans ce message
                  </div>
                </Clue>
              </div>
            </SmsBubble>
          </PhoneFrame>

          {/* Call button */}
          <div className={styles.callAction}>
            <button
              className={styles.btnAppeler}
              onClick={() => setAppelSuccess(true)}
            >
              📞 Appeler le 3639
            </button>
            {appelSuccess && (
              <div className={styles.successMsg}>
                ✅ Vous avez bien fait d'appeler ! Le conseiller confirme la tentative de connexion et sécurise votre compte.
              </div>
            )}
          </div>
        </div>
      )}
    </SimulationLayout>
  )
}
