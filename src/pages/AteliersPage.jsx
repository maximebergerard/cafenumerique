import { Link } from 'react-router-dom'
import { Clock, Users, UserRound, Repeat, Sparkles } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import { PageHero, CtaBand } from '../components/ContentBlocks.jsx'
import { ICONS, DOT_COLORS } from '../components/icons.js'
import { ATELIERS, FORMAT, SUR_MESURE } from '../content/ateliers.js'
import { METHODE } from '../content/site.js'
import styles from '../components/Content.module.css'

export default function AteliersPage() {
  return (
    <Layout>
      <PageHero
        current="Les ateliers"
        badge="Cafés numériques"
        shapes={0}
        title="Des ateliers numériques pour apprendre en faisant"
        lead="Des ateliers conviviaux de 2 heures, en petit groupe, pour adultes et seniors. Pas de cours magistral : on joue, on manipule, on s'entraide."
      >
        <ul className={styles.heroFacts}>
          <li className={styles.heroFact}><Clock size={15} /> {FORMAT.duree}</li>
          <li className={styles.heroFact}><Users size={15} /> {FORMAT.participants}</li>
          <li className={styles.heroFact}><UserRound size={15} /> Grands débutants bienvenus</li>
          <li className={styles.heroFact}><Repeat size={15} /> {FORMAT.formats}</li>
        </ul>
      </PageHero>

      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.h2}>Les thèmes proposés</h2>
          <p className={styles.lead}>Chaque atelier se concentre sur un sujet du quotidien numérique.</p>
          <div className={`${styles.grid} ${styles.grid2}`}>
            {ATELIERS.map((a, i) => {
              const Icon = ICONS[a.icon]
              return (
                <Link key={a.slug} to={`/ateliers/${a.slug}`} className={`${styles.card} reveal`}>
                  <div className={styles.cardIcon} style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}><Icon size={22} strokeWidth={1.75} /></div>
                  <div className={styles.cardKicker}>{a.nom}</div>
                  <h3 className={styles.cardTitle}>{a.titre}</h3>
                  <p className={styles.cardText}>{a.accroche}</p>
                  <span className={styles.cardMore}>Voir le programme →</span>
                </Link>
              )
            })}
            <Link to="/contact" className={`${styles.card} ${styles.cardDashed}`}>
              <div className={styles.cardIcon} style={{ background: DOT_COLORS[ATELIERS.length % DOT_COLORS.length] }}><Sparkles size={22} strokeWidth={1.75} /></div>
              <div className={styles.cardKicker}>Sur mesure</div>
              <h3 className={styles.cardTitle}>{SUR_MESURE.titre}</h3>
              <p className={styles.cardText}>{SUR_MESURE.texte}</p>
              <span className={styles.cardMore}>En parler →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.inner}>
          <h2 className={styles.h2}>La méthode</h2>
          <p className={styles.lead}>
            On retient bien mieux ce qu'on a vécu que ce qu'on a écouté. Chaque atelier alterne mises en situation, pratique et échanges.
          </p>
          <div className={`${styles.grid} ${styles.grid2}`}>
            {METHODE.map((m, i) => {
              const Icon = ICONS[m.icon]
              return (
                <div key={m.titre} className={`${styles.card} reveal`}>
                  <div className={styles.cardIcon} style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}><Icon size={22} strokeWidth={1.75} /></div>
                  <h3 className={styles.cardTitle}>{m.titre}</h3>
                  <p className={styles.cardText}>{m.texte}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </Layout>
  )
}
