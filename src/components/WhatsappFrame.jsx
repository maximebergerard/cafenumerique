import styles from './WhatsappFrame.module.css'

export function WaBubble({ text, time, sent = false, read = false, children }) {
  return (
    <div className={`${styles.waBubble} ${sent ? styles.waBubbleSent : styles.waBubbleReceived}`}>
      {children || <p className={styles.waText}>{text}</p>}
      <div className={styles.waMeta}>
        <span className={styles.waTime}>{time}</span>
        {sent && (
          <span className={styles.waRead}>
            {read ? (
              <svg width="16" height="11" viewBox="0 0 16 11" fill="#53bdeb">
                <path d="M11.07.37l-5.5 8.4-3-3.57-.78.66 3.78 4.5 6.28-9.6z" />
                <path d="M14.57.37l-5.5 8.4-.6-.72-.78.66 1.38 1.65 6.28-9.6z" />
              </svg>
            ) : (
              <svg width="16" height="11" viewBox="0 0 16 11" fill="#8e8e93">
                <path d="M11.07.37l-5.5 8.4-3-3.57-.78.66 3.78 4.5 6.28-9.6z" />
              </svg>
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export function SmsBubble({ text, time, sent = false }) {
  return (
    <div className={`${styles.waBubble} ${sent ? styles.waBubbleSent : styles.waBubbleReceived}`}>
      <p className={styles.waText}>{text}</p>
      <div className={styles.waMeta}>
        <span className={styles.waTime}>{time}</span>
      </div>
    </div>
  )
}

export default function WhatsappFrame({ contactName, contactAvatar, isUnknown = false, contactStatus, children }) {
  return (
    <div className={styles.waShell}>
      {/* Header */}
      <div className={styles.waHeader}>
        <button className={styles.waBack} aria-label="Retour">
          <svg width="12" height="20" viewBox="0 0 12 20" fill="white">
            <path d="M10 1L1 10l9 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </button>
        <div className={styles.waAvatar}>
          {contactAvatar || (typeof contactName === 'string' ? contactName.charAt(0) : '?')}
        </div>
        <div className={styles.waContactInfo}>
          <div className={styles.waContactName}>{contactName}</div>
          <div className={styles.waContactStatus}>
            {contactStatus ?? (isUnknown ? 'Numéro inconnu' : 'En ligne')}
          </div>
        </div>
        <div className={styles.waHeaderIcons}>
          <button className={styles.waIconBtn} aria-label="Appel vidéo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
          </button>
          <button className={styles.waIconBtn} aria-label="Appel">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
          </button>
          <button className={styles.waIconBtn} aria-label="Plus">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Unknown number bar */}
      {isUnknown && (
        <div className={styles.waUnknownBar}>
          <span className={styles.waUnknownText}>Numéro non enregistré · </span>
          <button className={styles.waUnknownBtn}>Ajouter aux contacts</button>
          <button className={styles.waUnknownBtn} style={{ color: '#e74c3c' }}>Signaler</button>
        </div>
      )}

      {/* Messages area */}
      <div className={styles.waMessages}>
        {children}
      </div>

      {/* Compose bar */}
      <div className={styles.waCompose}>
        <button className={styles.waComposeEmoji} aria-label="Emoji">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#8e8e93">
            <circle cx="12" cy="12" r="10" stroke="#8e8e93" strokeWidth="1.5" fill="none" />
            <circle cx="9" cy="10" r="1.2" fill="#8e8e93" />
            <circle cx="15" cy="10" r="1.2" fill="#8e8e93" />
            <path d="M8 15s1.5 2 4 2 4-2 4-2" stroke="#8e8e93" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </button>
        <div className={styles.waInput}>
          <span className={styles.waInputPlaceholder}>Message</span>
        </div>
        <button className={styles.waAttach} aria-label="Pièce jointe">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#8e8e93">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" stroke="#8e8e93" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </button>
        <button className={styles.waSendBtn} aria-label="Envoyer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
