import { Wrench } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import styles from './AteliersPage.module.css'

export default function AteliersPage() {
  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>

          <div className={styles.placeholder}>
            <div className={styles.placeholderIconWrap}>
              <Wrench size={32} strokeWidth={1.5} />
            </div>
            <h1 className={styles.title}>Les ateliers</h1>
            <p className={styles.desc}>
              Cette page est en cours de construction. Le contenu de présentation des ateliers arrivera bientôt.
            </p>
            <p className={styles.subdesc}>
              En attendant, vous pouvez contacter Maxime directement pour en savoir plus.
            </p>
            <a href="mailto:maxime.bergerard@gmail.com" className={styles.contactBtn}>
              Me contacter
            </a>
          </div>

        </div>
      </div>
    </Layout>
  )
}
