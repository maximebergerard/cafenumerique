import { Link } from 'react-router-dom'
import { ChevronRight, Clock } from 'lucide-react'
import Layout from '../../components/Layout.jsx'
import { atelierIa } from '../../content/atelier-ia.js'
import { remplir } from '../texte.js'
import styles from './Defis.module.css'

const { interface: ui, liste } = atelierIa.defis

export default function DefisListePage() {
  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.titrePage}>{ui.titrePage}</h1>
          <p className={styles.intro}>{ui.intro}</p>

          <ol className={styles.cartes}>
            {liste.map((defi, i) => (
              <li key={defi.id}>
                <Link to={`/atelier-ia/defis/${defi.id}`} className={styles.carte}>
                  <span className={styles.numero} aria-hidden="true">{i + 1}</span>
                  <span className={styles.carteTexte}>
                    <span className={styles.carteSurtitre}>{remplir(ui.numero, { n: i + 1 })}</span>
                    <span className={styles.carteTitre}>{defi.titre}</span>
                    <span className={styles.duree}>
                      <Clock size={20} aria-hidden="true" />
                      {defi.duree}
                    </span>
                  </span>
                  <ChevronRight size={30} className={styles.carteFleche} aria-label={ui.voirLeDefi} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  )
}
