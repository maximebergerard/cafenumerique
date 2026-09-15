import { ChevronDown } from 'lucide-react'
import styles from './Depliable.module.css'

// Bloc repliable (fermé par défaut), basé sur <details> pour rester accessible.
// variante : "aide" (encadré rassurant) | "bonus" (visuellement en retrait)
export default function Depliable({ titre, icone, variante = 'aide', children }) {
  return (
    <details className={`${styles.depliable} ${styles[variante]}`}>
      <summary className={styles.resume}>
        {icone && <span className={styles.icone} aria-hidden="true">{icone}</span>}
        <span className={styles.titre}>{titre}</span>
        <ChevronDown className={styles.chevron} size={26} aria-hidden="true" />
      </summary>
      <div className={styles.contenu}>{children}</div>
    </details>
  )
}
