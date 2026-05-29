import { QRCodeSVG } from 'qrcode.react'
import styles from './QrModal.module.css'

// Affiche un QR code en plein écran pointant vers la page mémo.
// Conçu pour être projeté en fin de séance.
export default function QrModal({ onClose }) {
  const url = `${window.location.origin}/retenir-cn8`

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.label}>Scannez pour garder le mémo</div>
        <div className={styles.qrWrapper}>
          <QRCodeSVG
            value={url}
            size={220}
            bgColor="#ffffff"
            fgColor="#27173A"
            level="M"
          />
        </div>
        <div className={styles.url}>{url.replace('https://', '')}</div>
        <button className={styles.closeBtn} onClick={onClose}>
          Fermer ✕
        </button>
      </div>
    </div>
  )
}
