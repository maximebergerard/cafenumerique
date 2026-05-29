import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './ScoresCn8Page.module.css'

const STORAGE_KEY = 'cn8_teams'

function defaultTeams() {
  return {
    nextId: 7,
    list: Array.from({ length: 6 }, (_, i) => ({ id: i + 1, name: `Binôme ${i + 1}`, pts: 0 })),
  }
}

function loadTeams() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : defaultTeams()
  } catch { return defaultTeams() }
}

export default function ScoresCn8Page() {
  const [{ nextId, list }, setState] = useState(loadTeams)
  const [showRanking, setShowRanking]   = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [editingId, setEditingId]       = useState(null)
  const [draft, setDraft]               = useState('')
  const inputRef = useRef(null)
  const newCardRef = useRef(null)

  // Persistance
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ nextId, list }))
  }, [nextId, list])

  // Focus sur l'input quand on édite
  useEffect(() => {
    if (editingId !== null) inputRef.current?.select()
  }, [editingId])

  function update(fn) { setState(prev => ({ ...prev, list: fn(prev.list) })) }

  function adjustPts(id, delta) {
    update(l => l.map(t => t.id === id ? { ...t, pts: Math.max(0, t.pts + delta) } : t))
  }

  function startEdit(id, name) { setEditingId(id); setDraft(name) }

  function commitEdit() {
    if (editingId === null) return
    update(l => l.map(t => t.id === editingId ? { ...t, name: draft.trim() || t.name } : t))
    setEditingId(null)
  }

  function addTeam() {
    const newId = nextId
    setState(prev => ({
      nextId: prev.nextId + 1,
      list: [...prev.list, { id: newId, name: `Équipe ${newId}`, pts: 0 }],
    }))
    // Démarre directement en mode édition du nouveau nom
    setTimeout(() => setEditingId(newId), 0)
    setTimeout(() => newCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }

  function removeTeam(id) {
    if (list.length <= 1) return
    update(l => l.filter(t => t.id !== id))
    if (editingId === id) setEditingId(null)
  }

  function reset() {
    update(l => l.map(t => ({ ...t, pts: 0 })))
    setConfirmReset(false)
  }

  const ranking = [...list].sort((a, b) => b.pts - a.pts)

  return (
    <div className={styles.page}>

      <header className={styles.header}>
        <Link to="/arnaques" className={styles.backBtn}>← Retour</Link>
        <span className={styles.title}>Scores CN8</span>
        <div className={styles.headerActions}>
          {confirmReset ? (
            <>
              <span className={styles.confirmText}>Reset pts ?</span>
              <button className={styles.btnYes} onClick={reset}>Oui</button>
              <button className={styles.btnNo} onClick={() => setConfirmReset(false)}>Non</button>
            </>
          ) : (
            <button className={styles.btnReset} onClick={() => setConfirmReset(true)}>↺</button>
          )}
        </div>
      </header>

      <main className={styles.main}>

        <p className={styles.hint}>Touchez un nom pour le modifier</p>

        <div className={styles.grid}>
          {list.map(({ id, name, pts }, idx) => (
            <div
              key={id}
              className={styles.card}
              ref={idx === list.length - 1 ? newCardRef : null}
            >
              {/* Bouton supprimer */}
              {list.length > 1 && (
                <button
                  className={styles.removeBtn}
                  onClick={() => removeTeam(id)}
                  title="Supprimer cette équipe"
                >×</button>
              )}

              {/* Nom éditable */}
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
                <button className={styles.nameBtn} onClick={() => startEdit(id, name)}>
                  {name} ✏️
                </button>
              )}

              {/* Stepper points */}
              <div className={styles.stepper}>
                <button className={styles.stepBtn} onClick={() => adjustPts(id, -1)} disabled={pts === 0}>−</button>
                <span className={styles.pts}>{pts}</span>
                <button className={styles.stepBtn} onClick={() => adjustPts(id, +1)}>+</button>
              </div>
            </div>
          ))}

          {/* Bouton ajouter une équipe */}
          <button className={styles.addCard} onClick={addTeam}>
            <span className={styles.addIcon}>+</span>
            <span className={styles.addLabel}>Ajouter une équipe</span>
          </button>
        </div>

        <button className={styles.toggleBtn} onClick={() => setShowRanking(v => !v)}>
          {showRanking ? '▲ Masquer le classement' : '▼ Afficher le classement'}
        </button>

        {showRanking && (
          <div className={styles.ranking}>
            {ranking.map(({ id, name, pts }, idx) => (
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
