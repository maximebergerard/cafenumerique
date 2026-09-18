import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { PageHero, CtaBand } from '../components/ContentBlocks.jsx'
import { ICONS, DOT_COLORS } from '../components/icons.js'
import { ATELIERS } from '../content/ateliers.js'
import { ORGANISER, STRUCTURES } from '../content/site.js'
import styles from '../components/Content.module.css'

export default function OrganiserPage() {
  return (
    <Layout>
      <PageHero
        current="Organiser un atelier"
        badge="Structures et collectivités"
        shapes={3}
        title="Organiser un atelier numérique pour votre public"
        lead="Je viens animer un Café numérique dans vos locaux : 2 heures, jusqu'à 10 participants, un thème choisi ensemble et un contenu adapté à votre public."
      >
        <div className={styles.heroCtas}>
          <Link to="/contact" className={styles.btnDark}>Me contacter</Link>
          <Link to="/ateliers" className={styles.btnOutline}>Voir les ateliers</Link>
        </div>
      </PageHero>

      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.h2}>Pour qui ?</h2>
          <p className={styles.lead}>Toute structure qui accueille des adultes ou des seniors éloignés du numérique.</p>
          <div className={`${styles.grid} ${styles.grid2}`}>
            {STRUCTURES.map((s, i) => {
              const Icon = ICONS[s.icon]
              return (
                <div key={s.titre} className={`${styles.card} reveal`}>
                  <div className={styles.cardIcon} style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}><Icon size={22} strokeWidth={1.75} /></div>
                  <h3 className={styles.cardTitle}>{s.titre}</h3>
                  <p className={styles.cardText}>{s.texte}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.narrow}>
          <h2 className={styles.h2}>Comment ça se passe</h2>
          <p className={styles.lead}>De la première prise de contact à l'après-atelier.</p>
          <ol className={`${styles.steps} reveal`}>
            {ORGANISER.etapes.map((e) => (
              <li key={e.titre}>
                <span className={styles.stepTitle}>{e.titre}</span>
                <span className={styles.stepText}>{e.texte}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.inner} ${styles.split}`}>
          <div>
            <h2 className={styles.h2}>Les thèmes</h2>
            <ul className={styles.checks}>
              {ATELIERS.map((a) => (
                <li key={a.slug}>
                  <Link to={`/ateliers/${a.slug}`}>{a.titre}</Link>
                </li>
              ))}
              <li>Un atelier sur mesure selon vos besoins</li>
            </ul>
          </div>
          <div>
            <h2 className={styles.h2}>Ce qu'il faut prévoir</h2>
            <ul className={styles.checks}>
              {ORGANISER.aPrevoir.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.narrow}>
          <h2 className={styles.h2}>Questions fréquentes</h2>
          <div className={`${styles.faq} reveal`}>
            {ORGANISER.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Parlons de votre projet" text="Décrivez-moi votre structure et votre public : je vous propose un atelier adapté." />
    </Layout>
  )
}
