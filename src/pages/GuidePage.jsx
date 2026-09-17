import { Link, useParams } from 'react-router-dom'
import { Theater, Coffee } from 'lucide-react'
import { Asterisk } from '../components/Shapes.jsx'
import { DOT_COLORS } from '../components/icons.js'
import Layout from '../components/Layout.jsx'
import { PageHero, CtaBand } from '../components/ContentBlocks.jsx'
import { findGuide } from '../content/guides.js'
import { findAtelier } from '../content/ateliers.js'
import NotFoundPage from './NotFoundPage.jsx'
import styles from '../components/Content.module.css'

const GUIDE_SHAPES = { 'Arnaques en ligne': 0, 'Intelligence artificielle': 2, WhatsApp: 1 }

const ancre = (i) => `partie-${i + 1}`

function Bloc({ bloc }) {
  if (bloc.p) return <p>{bloc.p}</p>
  if (bloc.liste) {
    return <ul className={styles.bullets}>{bloc.liste.map((t) => <li key={t}>{t}</li>)}</ul>
  }
  if (bloc.etapes) {
    return (
      <ol className={`${styles.steps} ${styles.stepsCompact}`}>
        {bloc.etapes.map((t) => <li key={t}>{t}</li>)}
      </ol>
    )
  }
  if (bloc.indices) {
    return (
      <ul className={styles.clues}>
        {bloc.indices.map(([label, texte]) => (
          <li key={label}>
            <span className={styles.clueLabel}>{label}</span>
            <span className={styles.clueText}>{texte}</span>
          </li>
        ))}
      </ul>
    )
  }
  if (bloc.alerte) {
    return <div className={styles.alert}><Asterisk /><span>{bloc.alerte}</span></div>
  }
  return null
}

export default function GuidePage() {
  const { slug } = useParams()
  const guide = findGuide(slug)
  if (!guide) return <NotFoundPage />

  const atelier = findAtelier(guide.atelier)
  const date = new Date(guide.misAJour).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

  return (
    <Layout>
      <PageHero
        crumbs={[{ to: '/guides', label: 'Guides' }]}
        current={guide.theme}
        badge={guide.theme}
        shapes={GUIDE_SHAPES[guide.theme] ?? 3}
        title={guide.titre}
        lead={guide.resume}
      >
        <p className={styles.meta}>
          Par <Link to="/a-propos">Maxime Bergerard</Link> · Mis à jour le <time dateTime={guide.misAJour}>{date}</time>
        </p>
      </PageHero>

      <article className={styles.article}>
        <div className={styles.narrow}>
          <nav className={styles.toc} aria-label="Sommaire">
            <div className={styles.tocTitle}>Sommaire</div>
            <ol>
              {guide.sections.map((s, i) => (
                <li key={s.titre}><a href={`#${ancre(i)}`}>{s.titre}</a></li>
              ))}
            </ol>
          </nav>

          {guide.sections.map((s, i) => (
            <section key={s.titre} id={ancre(i)} className={styles.articleSection}>
              <h2>{s.titre}</h2>
              {s.blocs.map((b, j) => <Bloc key={j} bloc={b} />)}
            </section>
          ))}

          <div className={styles.aside}>
            {guide.simulation && (
              <Link to={guide.simulation.path} className={styles.card}>
                <div className={styles.cardIcon} style={{ background: DOT_COLORS[1] }}><Theater size={22} strokeWidth={1.75} /></div>
                <div className={styles.cardKicker}>S'entraîner</div>
                <span className={styles.cardTitle}>{guide.simulation.label}</span>
                <span className={styles.cardMore}>Ouvrir la simulation →</span>
              </Link>
            )}
            {atelier && (
              <Link to={`/ateliers/${atelier.slug}`} className={styles.card}>
                <div className={styles.cardIcon} style={{ background: DOT_COLORS[2] }}><Coffee size={22} strokeWidth={1.75} /></div>
                <div className={styles.cardKicker}>L'atelier</div>
                <span className={styles.cardTitle}>{atelier.titre}</span>
                <span className={styles.cardMore}>Voir le programme →</span>
              </Link>
            )}
          </div>
        </div>
      </article>

      <CtaBand
        title="Ce sujet intéresse votre public ?"
        text="J'anime des ateliers en petit groupe sur ce thème, pour les médiathèques, mairies, résidences et associations."
      />
    </Layout>
  )
}
