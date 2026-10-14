import styles from './ZoneIndice.module.css'

// Surbrillance d'une zone d'un visuel, même logique que <Clue> :
// l'indice en cours clignote, les indices déjà vus restent marqués.
// zone = { x, y, largeur, hauteur } en % du visuel.
export default function ZoneIndice({ zone, index, actif, type = 'danger' }) {
  const style = {
    left: `${zone.x}%`,
    top: `${zone.y}%`,
    width: `${zone.largeur}%`,
    height: `${zone.hauteur}%`,
  }

  const cls = [
    styles.zone,
    actif ? styles.actif : styles.vu,
    type === 'ok' ? styles.ok : styles.danger,
  ].join(' ')

  return (
    <div className={cls} style={style} aria-hidden="true">
      <span className={styles.badge}>{index + 1}</span>
    </div>
  )
}
