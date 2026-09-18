import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { PageHero, CtaBand } from '../components/ContentBlocks.jsx'
import { GUIDES } from '../content/guides.js'
import styles from '../components/Content.module.css'

export default function GuidesPage() {
  return (
    <Layout>
      <PageHero
        current="Guides"
        badge="Ressources gratuites"
        shapes={2}
        title="Les guides pratiques du numérique"
        lead="Des fiches claires, sans jargon, pour déjouer les arnaques et comprendre les nouveaux outils. Tirées de ce qu'on voit ensemble en atelier."
      />

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.grid}>
            {GUIDES.map((g) => (
              <Link key={g.slug} to={`/guides/${g.slug}`} className={`${styles.card} reveal`}>
                <div className={styles.cardKicker}>{g.theme}</div>
                <h2 className={styles.cardTitle}>{g.titre}</h2>
                <p className={styles.cardText}>{g.resume}</p>
                <span className={styles.cardMore}>Lire le guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Et si on en parlait en vrai ?"
        text="Ces guides sont tirés des Cafés numériques. En atelier, on s'entraîne sur des situations réalistes, en petit groupe."
      />
    </Layout>
  )
}
