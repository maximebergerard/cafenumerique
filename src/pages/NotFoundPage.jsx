import { Link } from 'react-router-dom'
import { Compass } from '../icons/index.jsx'
import Layout from '../components/Layout.jsx'
import styles from './AteliersPage.module.css'

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.placeholder}>
            <div className={styles.placeholderIconWrap}>
              <Compass size={32} />
            </div>
            <h1 className={styles.title}>Page introuvable</h1>
            <p className={styles.desc}>
              Cette adresse n'existe pas (ou plus). Vérifiez le lien, ou revenez à l'accueil.
            </p>
            <p className={styles.subdesc}>Erreur 404</p>
            <Link to="/" className={styles.contactBtn}>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
