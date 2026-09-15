import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { atelierIa } from '../../content/atelier-ia.js'
import styles from './BoutonRetourDefis.module.css'

export default function BoutonRetourDefis() {
  return (
    <Link to="/atelier-ia/defis" className={styles.bouton}>
      <ArrowLeft size={24} aria-hidden="true" />
      {atelierIa.defis.interface.retourDefis}
    </Link>
  )
}
