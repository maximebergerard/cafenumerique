import { Link } from 'react-router-dom'
import { VideoCamera } from '../icons/index.jsx'
import Layout from '../components/Layout.jsx'
import styles from './AteliersPage.module.css'

export default function VideosPage() {
  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>

          <div className={styles.placeholder}>
            <div className={styles.placeholderIconWrap}>
              <VideoCamera size={32} />
            </div>
            <h1 className={styles.title}>Vidéos</h1>
            <p className={styles.desc}>
              Des tutoriels vidéo pour retrouver les gestes du quotidien : réglages du téléphone, applications, astuces de sécurité...
            </p>
            <p className={styles.subdesc}>
              Cette section est en cours de construction. Les premières vidéos arrivent bientôt.
            </p>
            <Link to="/contact" className={styles.contactBtn}>
              Me contacter
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  )
}
