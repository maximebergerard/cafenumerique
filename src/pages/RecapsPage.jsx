import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import styles from './RecapsPage.module.css'

// Ajouter une entrée ici à chaque nouvelle séance
const RECAPS = [
  {
    id: 7,
    path: '/retenir',
    date: 'Avril 2026',
    title: 'Séance #7',
    themes: ['Arnaques en ligne', 'Intelligence artificielle', 'Réseaux sociaux'],
    desc: 'Les signaux d\'alarme des arnaques, les outils IA gratuits, et le lexique des réseaux sociaux.',
  },
]

export default function RecapsPage() {
  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>

          <div className={styles.intro}>
            <h1 className={styles.title}>Récaps des séances</h1>
            <p className={styles.desc}>
              Après chaque atelier, une fiche "ce qu'il faut retenir" est disponible ici. Scannez le QR code en fin de séance pour y accéder directement sur votre téléphone.
            </p>
          </div>

          <div className={styles.list}>
            {RECAPS.map((r) => (
              <Link key={r.id} to={r.path} className={styles.card}>
                <div className={styles.cardLeft}>
                  <div className={styles.cardDate}>{r.date}</div>
                  <div className={styles.cardTitle}>{r.title}</div>
                  <div className={styles.cardDesc}>{r.desc}</div>
                  <div className={styles.themes}>
                    {r.themes.map((t) => (
                      <span key={t} className={styles.theme}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.cardArrow}>→</div>
              </Link>
            ))}

            {/* Entrées futures */}
            <div className={styles.cardFuture}>
              <div className={styles.futureIcon}>📋</div>
              <div>
                <div className={styles.futureTitle}>Prochaines séances</div>
                <div className={styles.futureDesc}>Les récaps des prochains ateliers apparaîtront ici au fil des séances.</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
