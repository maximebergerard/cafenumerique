import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './ScoresCn8Page.module.css'

const NB_BINOMES = 6

function defaultScores() {
  return Array.from({ length: NB_BINOMES }, (_, i) => ({ id: i + 1, pts: 0 }))
}
function defaultNames() {
  return Array.from({ length: NB_BINOMES }, (_, i) => `Binôme ${i + 1}`)
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback()
  } catch { return fallback() }
}

export default function ScoresCn8Page() {
  const [scores, setScores]       = useState(() => load('cn8_scores_v2', defaultScores))
  const [names, setNames]         = useState(() => load('cn8_names', defaultNames))
  const [showRanking, setShowRanking] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft]         = useState('')
  const inputRef = useRef(null)

  useEffect(() => { localStorage.setItem('cn8_scores_v2', JSON.stringify(scores)) }, [scores])
  useEffect(() => { localStorage.setItem('cn8_names', JSON.stringify(names)) }, [names])

  // Focus l'input quand on commence à éditer
  useEffect(() => { if (editingId !== null) inputRef.current?.select() }, [editingId])

  function adjust(id, delta) {
    setScores(prev => prev.map(b => b.id === id ? { ...b, pts: Math.max(0, b.pts + delta) } : b))
  }

  function startEdit(id, currentName) {
    setEditingId(id)
    setDraft(currentName)
  }

  function commitEdit() {
    if (editingId === null) return
    setNames(prev => prev.map((n, i) => i === editingId - 1 ? (draft.trim() || n) : n))
    setEditingId(null)
  }

  function reset() {
    setScores(defaultScores())
    setConfirmReset(false)
  }

  const nameOf = (id) => names[id - 1] ?? `Binôme ${id}`

  const ranking = [...scores]
    .map(s => ({ ...s, name: nameOf(s.id) }))
    .sort((a, b) => b.pts - a.pts)

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

        <p className={styles.hint}>Appuyez sur un nom pour le modifier</p>

        <div className={styles.grid}>
          {scores.map(({ id, pts }) => (
            <div key={id} className={styles.card}>

              {editingId === id ? (
                <input
                  ref={inputRef}
                  className={styles.nameInput}
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') commitEdit() }}
                  maxLength={20}
                />
              ) : (
                <button className={styles.nameBtn} onClick={() => startEdit(id, nameOf(id))}>
                  {nameOf(id)} ✏️
                </button>
              )}

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
            {ranking.map(({ id, pts, name }, idx) => (
              <div key={id} className={`${styles.rankRow} ${idx === 0 && pts > 0 ? styles.rankFirst : ''}`}>
                <span className={styles.rankPos}>
                  {pts > 0 ? (['🥇','🥈','🥉'][idx] ?? `${idx + 1}.`) : `${idx + 1}.`}
                </span>
                <span className={styles.rankName}>{name}</span>
                <span className={styles.rankPts}>{pts} pt{pts !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}
