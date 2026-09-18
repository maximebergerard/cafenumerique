import { useLocation } from 'react-router-dom'
import styles from './PageTransition.module.css'

// Changement de page : un trait coloré balaie le haut de l'écran et le contenu
// arrive en fondu. `key` sur l'adresse suffit à rejouer les animations CSS.
// Tout est désactivé si le système demande de réduire les animations.
export default function PageTransition({ children }) {
  const { pathname } = useLocation()

  return (
    <div key={pathname} className={styles.page}>
      <div className={styles.sweep} aria-hidden="true">
        <span /><span /><span />
      </div>
      {children}
    </div>
  )
}
