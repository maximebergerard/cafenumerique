import Layout from '../components/Layout.jsx'
import { PageHero, CtaBand } from '../components/ContentBlocks.jsx'
import { ICONS, DOT_COLORS } from '../components/icons.js'
import { INTERVENANT, METHODE } from '../content/site.js'
import styles from '../components/Content.module.css'

export default function AProposPage() {
  return (
    <Layout>
      <PageHero
        current="À propos"
        badge="L'intervenant"
        shapes={1}
        title={INTERVENANT.nom}
        lead={INTERVENANT.role}
      />

      <section className={styles.section}>
        <div className={`${styles.narrow} ${styles.prose}`}>
          <h2 className={styles.h2}>Pourquoi les Cafés numériques</h2>
          {INTERVENANT.bio.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.inner}>
          <h2 className={styles.h2}>Ma façon d'animer</h2>
          <p className={styles.lead}>Apprendre en faisant, pas en écoutant.</p>
          <div className={`${styles.grid} ${styles.grid2}`}>
            {METHODE.map((m, i) => {
              const Icon = ICONS[m.icon]
              return (
                <div key={m.titre} className={styles.card}>
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
