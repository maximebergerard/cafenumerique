import { useParams } from 'react-router-dom'
import { Clock, LifeBuoy, Sparkles, Star } from 'lucide-react'
import Layout from '../../components/Layout.jsx'
import BoutonRetourDefis from '../components/BoutonRetourDefis.jsx'
import Depliable from '../components/Depliable.jsx'
import { atelierIa } from '../../content/atelier-ia.js'
import { remplir } from '../texte.js'
import styles from './Defis.module.css'

const { interface: ui, liste } = atelierIa.defis

export default function DefiPage() {
  const { id } = useParams()
  const index = liste.findIndex(d => d.id === id)
  const defi = liste[index]

  if (!defi) {
    return (
      <Layout>
        <div className={styles.page}>
          <div className={styles.inner}>
            <p className={styles.intro}>{ui.defiIntrouvable}</p>
          </div>
        </div>
        <BoutonRetourDefis />
      </Layout>
    )
  }

  return (
    <Layout>
      <div className={`${styles.page} ${styles.pageDefi}`}>
        <article className={styles.inner}>

          <header className={styles.enTete}>
            <span className={styles.carteSurtitre}>{remplir(ui.numero, { n: index + 1 })}</span>
            <h1 className={styles.titrePage}>{defi.titre}</h1>
            <span className={styles.duree}>
              <Clock size={22} aria-hidden="true" />
              {defi.duree}
            </span>
          </header>

          <aside className={styles.rappel}>
            <span className={styles.rappelTitre}>{ui.rappelTitre}</span>
            <ul className={styles.rappelListe}>
              {ui.rappel.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </aside>

          <section className={styles.mission}>
            <h2 className={styles.missionTitre}>{ui.mission}</h2>
            <p>{defi.mission}</p>
          </section>

          <section className={styles.bloc}>
            <h2 className={styles.titreBloc}>{ui.etapes}</h2>
            <ol className={styles.etapes}>
              {defi.etapes.map((etape, i) => (
                <li key={i} className={styles.etape}>
                  <span className={styles.etapeNumero} aria-hidden="true">{i + 1}</span>
                  <span>{etape}</span>
                </li>
              ))}
            </ol>
          </section>

          {defi.siVousBloquez.length > 0 && (
            <Depliable titre={ui.siVousBloquez} icone={<LifeBuoy size={26} />} variante="aide">
              <ul className={styles.puces}>
                {defi.siVousBloquez.map((aide, i) => <li key={i}>{aide}</li>)}
              </ul>
            </Depliable>
          )}

          {/* Niveau 1 : l'essentiel, toujours visible */}
          <section className={styles.socle}>
            <h2 className={styles.socleTitre}>
              <Star size={26} aria-hidden="true" />
              {ui.socle}
            </h2>
            <ul className={styles.puces}>
              {defi.socle.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </section>

          {/* Niveau 2 : pour aller plus loin, replié et en retrait */}
          {defi.bonus.length > 0 && (
            <Depliable titre={ui.bonus} icone={<Sparkles size={24} />} variante="bonus">
              <ul className={styles.puces}>
                {defi.bonus.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </Depliable>
          )}

        </article>
      </div>
      <BoutonRetourDefis />
    </Layout>
  )
}
