import { useState } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { ChevronRight, Maximize2 } from 'lucide-react'
import QrModal from '../../components/QrModal.jsx'
import Minuteur from '../components/Minuteur.jsx'
import { atelierIa } from '../../content/atelier-ia.js'
import styles from './AnimateurPage.module.css'

const { interface: ui, liens } = atelierIa.animateur
const CHEMIN_DEFIS = '/atelier-ia/defis'

// Page privée : absente des menus et non indexée par les moteurs de recherche
export default function AnimateurPage() {
  const [qrEnGrand, setQrEnGrand] = useState(false)
  const tailleQrGrand = Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.6)

  return (
    <div className={styles.page}>
      <meta name="robots" content="noindex, nofollow" />
      <title>{ui.titrePage}</title>

      <div className={styles.inner}>
        <h1 className={styles.titrePage}>{ui.titrePage}</h1>

        <div className={styles.grille}>
          <section className={styles.carte}>
            <h2 className={styles.titreCarte}>{ui.modules}</h2>
            <ul className={styles.liens}>
              {liens.map(lien => (
                <li key={lien.to}>
                  <Link to={lien.to} className={styles.lien}>
                    <span className={styles.lienTexte}>
                      <span className={styles.lienTitre}>{lien.titre}</span>
                      <span className={styles.lienDescription}>{lien.description}</span>
                    </span>
                    <ChevronRight size={24} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${styles.carte} ${styles.carteQr}`}>
            <h2 className={styles.titreCarte}>{ui.qrTitre}</h2>
            <div className={styles.qr}>
              <QRCodeSVG value={`${window.location.origin}${CHEMIN_DEFIS}`} size={180} fgColor="#27173A" level="M" />
            </div>
            <button className={styles.boutonPrincipal} onClick={() => setQrEnGrand(true)}>
              <Maximize2 size={20} aria-hidden="true" />
              {ui.qrAfficher}
            </button>
          </section>

          <section className={`${styles.carte} ${styles.carteMinuteur}`}>
            <h2 className={styles.titreCarte}>{ui.minuteur}</h2>
            <Minuteur />
          </section>
        </div>
      </div>

      {qrEnGrand && (
        <QrModal
          onClose={() => setQrEnGrand(false)}
          path={CHEMIN_DEFIS}
          label={ui.qrLegende}
          closeLabel={ui.qrFermer}
          size={tailleQrGrand}
        />
      )}
    </div>
  )
}
