import { QRCodeSVG } from 'qrcode.react'
import styles from './QrModal.module.css'

// Affiche un QR code en plein écran pointant vers une page du site.
// Conçu pour être projeté (par défaut : le mémo de fin de séance).
export default function QrModal({
  onClose,
  path = '/retenir-cn8',
  label = 'Scannez pour garder le mémo',
  closeLabel = 'Fermer ✕',
  size = 220,
}) {
  const url = `${window.location.origin}${path}`

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.label}>{label}</div>
        <div className={styles.qrWrapper}>
          <QRCodeSVG
            value={url}
            size={size}
            bgColor="#ffffff"
            fgColor="#27173A"
            level="M"
          />
        </div>
        <div className={styles.url}>{url.replace(/^https?:\/\//, '')}</div>
        <button className={styles.closeBtn} onClick={onClose}>
          {closeLabel}
        </button>
      </div>
    </div>
  )
}
