import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './ScoresCn8Page.module.css'

const NB_BINOMES = 6

function defaultScores() {
  return Array.from({ length: NB_BINOMES }, (_, i) => ({ id: i + 1, pts: 0 }))
}

function loadScores() {
  try {
    const raw = localStorage.getItem('cn8_scores_v2')
    return raw ? JSON.parse(raw) : defaultScores()
  } catch {
    return defaultScores()
  }
}

export default function ScoresCn8Page() {
  const [scores, setScores] = useState(loadScores)
  const [showRanking, setShowRanking] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => {
    localStorage.setItem('cn8_scores_v2', JSON.stringify(scores))
  }, [scores])

  function adjust(id, delta) {
    setScores(prev =>
      prev.map(b => b.id === id ? { ...b, pts: Math.max(0, b.pts + delta) } : b)
    )
  }

  function reset() {
    setScores(defaultScores())
    setConfirmReset(false)
  }

  const ranking = [...scores].sort((a, b) => b.pts - a.pts)

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <Link to="/arnaques" className={styles.backBtn}>← Retour</Link>
        <span className={styles.title}>Scores CN8</span>
        <div className={styles.headerActions}>
          {confirmReset ? (
            <>
              <span className={styles.confirmText}>Reset ?</span>
              <button className={styles.btnYes} onClick={reset}>Oui</button>
              <button className={styles.btnNo} onClick={() => setConfirmReset(false)}>Non</button>
            </>
          ) : (
            <button className={styles.btnReset} onClick={() => setConfirmReset(true)}>↺</button>
          )}
        </div>
      </header>

      <main className={styles.main}>

        <div className={styles.grid}>
          {scores.map(({ id, pts }) => (
            <div key={id} className={styles.card}>
              <span className={styles.binomeName}>Binôme {id}</span>
              <div className={styles.stepper}>
                <button className={styles.stepBtn} onClick={() => adjust(id, -1)} disabled={pts === 0}>−</button>
                <span className={styles.pts}>{pts}</span>
                <button className={styles.stepBtn} onClick={() => adjust(id, +1)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.toggleBtn} onClick={() => setShowRanking(v => !v)}>
          {showRanking ? '▲ Masquer le classement' : '▼ Afficher le classement'}
        </button>

        {showRanking && (
          <div className={styles.ranking}>
            {ranking.map(({ id, pts }, idx) => (
              <div key={id} className={`${styles.rankRow} ${idx === 0 && pts > 0 ? styles.rankFirst : ''}`}>
                <span className={styles.rankPos}>
                  {pts > 0 ? ['🥇','🥈','🥉'][idx] ?? `${idx + 1}.` : `${idx + 1}.`}
                </span>
                <span className={styles.rankName}>Binôme {id}</span>
                <span className={styles.rankPts}>{pts} pt{pts !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}
