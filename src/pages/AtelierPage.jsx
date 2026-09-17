import { Link, useParams } from 'react-router-dom'
import { Clock, Users, UserRound } from 'lucide-react'
import { Asterisk } from '../components/Shapes.jsx'
import Layout from '../components/Layout.jsx'
import { PageHero, CtaBand } from '../components/ContentBlocks.jsx'
import { findAtelier, FORMAT } from '../content/ateliers.js'
import { findGuide } from '../content/guides.js'
import NotFoundPage from './NotFoundPage.jsx'
import styles from '../components/Content.module.css'

const ATELIER_SHAPES = { 'intelligence-artificielle': 2, 'arnaques-en-ligne': 0, whatsapp: 1 }

export default function AtelierPage() {
  const { slug } = useParams()
  const atelier = findAtelier(slug)
  if (!atelier) return <NotFoundPage />

  const guides = atelier.guides.map(findGuide).filter(Boolean)

  return (
    <Layout>
      <PageHero
        crumbs={[{ to: '/ateliers', label: 'Les ateliers' }]}
        current={atelier.nom}
        badge={`Atelier · ${atelier.nom}`}
        shapes={ATELIER_SHAPES[atelier.slug] ?? 0}
        title={atelier.titre}
        lead={atelier.accroche}
      >
        <ul className={styles.heroFacts}>
          <li className={styles.heroFact}><Clock size={15} /> {FORMAT.duree}</li>
          <li className={styles.heroFact}><Users size={15} /> {FORMAT.participants}</li>
          <li className={styles.heroFact}><UserRound size={15} /> {FORMAT.public}</li>
        </ul>
        <div className={styles.heroCtas}>
          <Link to="/contact" className={styles.btnDark}>Organiser cet atelier</Link>
        </div>
      </PageHero>

      <section className={styles.section}>
        <div className={`${styles.narrow} ${styles.prose}`}>
          {atelier.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.inner} ${styles.split}`}>
          <div>
            <h2 className={styles.h2}>Objectif</h2>
            <div className={styles.alert}>
              <Asterisk />
              <span>{atelier.objectifGlobal}</span>
            </div>
          </div>
          <div>
            <h2 className={styles.h2}>À la fin de l'atelier, les participants savent…</h2>
            <ul className={styles.checks}>
              {atelier.objectifs.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.narrow}>
          <h2 className={styles.h2}>Le déroulé</h2>
          <p className={styles.lead}>Deux heures rythmées, qui s'adaptent au groupe.</p>
          <ol className={styles.steps}>
            {atelier.deroule.map((d) => (
              <li key={d.titre}>
                <span className={styles.stepTitle}>{d.titre}</span>
                <span className={styles.stepText}>{d.texte}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={`${styles.inner} ${styles.split}`}>
          <div>
            <h2 className={styles.h2}>Ce qu'il faut prévoir</h2>
            <ul className={styles.checks}>
              {atelier.materiel.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.h2}>Pour aller plus loin</h2>
            <div className={styles.stack}>
              {guides.map((g) => (
                <Link key={g.slug} to={`/guides/${g.slug}`} className={styles.card}>
                  <span className={styles.cardKicker}>Guide</span>
                  <span className={styles.cardTitle}>{g.titre}</span>
                </Link>
              ))}
              {atelier.simulations && (
                <Link to={atelier.simulations} className={styles.card}>
                  <span className={styles.cardKicker}>S'entraîner</span>
                  <span className={styles.cardTitle}>Les simulations d'arnaques</span>
                </Link>
              )}
              {atelier.recap && (
                <Link to={atelier.recap} className={styles.card}>
                  <span className={styles.cardKicker}>Exemple de fiche récap</span>
                  <span className={styles.cardTitle}>Ce que les participants ont retenu</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Organiser cet atelier"
        text="Le programme s'ajuste à votre public après un premier échange. Écrivez-moi pour en discuter."
      />
    </Layout>
  )
}
