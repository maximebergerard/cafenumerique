import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Clock, MapPin } from '../icons/index.jsx'
import Layout from '../components/Layout.jsx'
import { LIEUX, RECAPS } from '../content/recaps.js'
import styles from './RecapsPage.module.css'

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

          <nav className={styles.lieuxNav} aria-labelledby="recaps-nav-titre">
            <p id="recaps-nav-titre" className={styles.lieuxNavTitre}>
              Choisissez votre lieu d'atelier
            </p>
            <ul className={styles.lieuxNavListe}>
              {LIEUX.map((lieu) => {
                const n = RECAPS.filter((r) => r.lieu === lieu.id).length
                return (
                  <li key={lieu.id}>
                    <a
                      href={`#${lieu.id}`}
                      className={styles.lieuxNavLien}
                      onClick={(e) => {
                        // Le défilement natif de l'ancre remet le focus à zéro : on gère le
                        // saut nous-mêmes pour que clavier et lecteur d'écran continuent
                        // depuis le titre du lieu.
                        const titre = document.getElementById(`${lieu.id}-titre`)
                        if (!titre) return
                        e.preventDefault()
                        window.history.pushState(null, '', `#${lieu.id}`)
                        document.getElementById(lieu.id)?.scrollIntoView()
                        titre.focus({ preventScroll: true })
                      }}
                    >
                      <MapPin size={24} aria-hidden="true" />
                      <span className={styles.lieuxNavNom}>{lieu.nom}</span>
                      <span className={styles.lieuxNavNb}>
                        {n} {n > 1 ? 'fiches' : 'fiche'}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {LIEUX.map((lieu) => {
            const recaps = RECAPS.filter((r) => r.lieu === lieu.id)
            return (
              <section key={lieu.id} id={lieu.id} className={styles.lieu} aria-labelledby={`${lieu.id}-titre`}>
                <h2 id={`${lieu.id}-titre`} className={styles.lieuTitle} tabIndex={-1}>
                  <MapPin size={20} aria-hidden="true" />
                  {lieu.nom}
                  <span className={styles.lieuCount}>
                    {recaps.length} {recaps.length > 1 ? 'séances' : 'séance'}
                  </span>
                </h2>
                <div className={styles.list}>
                  {recaps.map((r) => (
                    <Link key={r.id} to={r.path} className={styles.card}>
                      <div className={styles.cardIconWrap}>
                        <FileText size={22} />
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
                      <div className={styles.cardArrow}><ArrowRight size={20} /></div>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}

          {/* Entrées futures */}
          <div className={styles.cardFuture}>
            <div className={styles.futureIconWrap}>
              <Clock size={20} />
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
