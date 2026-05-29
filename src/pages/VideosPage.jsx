import { Video } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import styles from './AteliersPage.module.css'

export default function VideosPage() {
  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>

          <div className={styles.placeholder}>
            <div className={styles.placeholderIconWrap}>
              <Video size={32} strokeWidth={1.5} />
            </div>
            <h1 className={styles.title}>Vidéos</h1>
            <p className={styles.desc}>
              Des tutoriels vidéo pour retrouver les gestes du quotidien : réglages du téléphone, applications, astuces de sécurité...
            </p>
            <p className={styles.subdesc}>
              Cette section est en cours de construction. Les premières vidéos arrivent bientôt.
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
