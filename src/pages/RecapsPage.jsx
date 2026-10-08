import { Link } from 'react-router-dom'
import { FileText, Clock, MapPin } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import styles from './RecapsPage.module.css'

// Chaque lieu a sa propre numérotation de séances.
// L'ordre ici est l'ordre d'affichage des sections.
const LIEUX = [
  { id: 'chatelet-en-brie', nom: 'Châtelet-en-Brie' },
  { id: 'nandy', nom: 'Nandy' },
]

// Ajouter une entrée ici à chaque nouvelle séance (la plus récente en premier)
const RECAPS = [
  {
    id: 'ceb1',
    lieu: 'chatelet-en-brie',
    path: '/retenir-ceb1',
    date: 'Octobre 2026',
    title: 'Séance #1',
    themes: ['Intelligence artificielle', 'Images générées', 'Deepfakes'],
    desc: 'Bien écrire à une IA, ce qu\'il ne faut jamais lui confier, repérer une image ou une vidéo créée par IA et déjouer les arnaques aux deepfakes.',
  },
  {
    id: 'cn9',
    lieu: 'nandy',
    path: '/retenir-cn9',
    date: 'Septembre 2026',
    title: 'Séance #9',
    themes: ['Intelligence artificielle', 'Images générées', 'Deepfakes'],
    desc: 'Bien écrire à une IA, ce qu\'il ne faut jamais lui confier, repérer une image ou une vidéo créée par IA et déjouer les arnaques aux deepfakes.',
  },
  {
    id: 'cn8',
    lieu: 'nandy',
    path: '/retenir-cn8',
    date: 'Mai 2026',
    title: 'Séance #8',
    themes: ['WhatsApp', 'Intelligence artificielle', 'Deepfakes'],
    desc: 'Arnaques sur WhatsApp, protéger son compte, la formule du prompt IA et les deepfakes vocaux.',
  },
  {
    id: 'cn7',
    lieu: 'nandy',
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
              Après chaque atelier, une fiche "ce qu'il faut retenir" est disponible ici. Scannez le QR code en fin de séance pour y accéder directement sur votre téléphone. Les fiches sont rangées par lieu d'atelier.
            </p>
          </div>

          {LIEUX.map((lieu) => {
            const recaps = RECAPS.filter((r) => r.lieu === lieu.id)
            return (
              <section key={lieu.id} id={lieu.id} className={styles.lieu}>
                <h2 className={styles.lieuTitle}>
                  <MapPin size={20} strokeWidth={2} aria-hidden="true" />
                  {lieu.nom}
                  <span className={styles.lieuCount}>
                    {recaps.length} {recaps.length > 1 ? 'séances' : 'séance'}
                  </span>
                </h2>
                <div className={styles.list}>
                  {recaps.map((r) => (
                    <Link key={r.id} to={r.path} className={styles.card}>
                      <div className={styles.cardIconWrap}>
                        <FileText size={22} strokeWidth={1.75} />
                      </div>
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
                </div>
              </section>
            )
          })}

          {/* Entrées futures */}
          <div className={styles.cardFuture}>
            <div className={styles.futureIconWrap}>
              <Clock size={20} strokeWidth={1.75} />
            </div>
            <div>
              <div className={styles.futureTitle}>Prochaines séances</div>
              <div className={styles.futureDesc}>Les récaps des prochains ateliers apparaîtront ici au fil des séances.</div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
