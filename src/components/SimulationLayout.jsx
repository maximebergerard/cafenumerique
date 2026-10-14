import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLargeFont } from '../hooks/useLargeFont.js'
import { ArrowCounterClockwise, ArrowLeft, ArrowRight, Lightbulb, MagnifyingGlass } from '../icons/index.jsx'
import styles from './SimulationLayout.module.css'

export default function SimulationLayout({
  title,
  verdict,
  clues,
  conclusion,
  actionModals = {},
  children,
}) {
  const navigate = useNavigate()
  const [large, toggleFont] = useLargeFont()
  const [phase, setPhase] = useState('discovery')
  const [activeIndex, setActiveIndex] = useState(-1)
  const [actionModal, setActionModal] = useState(null)

  function handleReveal() {
    setPhase('clues')
    setActiveIndex(0)
  }

  function handleNext() {
    if (activeIndex < clues.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      setPhase('conclusion')
      setActiveIndex(-1)
    }
  }

  function handleRestart() {
    setPhase('discovery')
    setActiveIndex(-1)
  }

  function onAction(key) {
    if (phase === 'discovery' && actionModals[key]) {
      setActionModal(key)
    }
  }

  function closeActionModal() {
    setActionModal(null)
  }

  const currentClue = phase === 'clues' && activeIndex >= 0 ? clues[activeIndex] : null
  const verdictLabel = verdict === 'arnaque' ? 'Arnaque' : 'Vrai'
  const verdictClass = verdict === 'arnaque' ? styles.verdictDanger : styles.verdictOk

  return (
    <div className={styles.layout}>
      {/* Top bar */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate('/arnaques')}>
          <ArrowLeft size={16} /> Retour
        </button>
        <h1 className={styles.topTitle}>{title}</h1>
        <span className={`${styles.verdictBadge} ${verdictClass}`}>{verdictLabel}</span>
        <button className="font-toggle-btn" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={toggleFont} title="Taille du texte">
          {large ? 'A−' : 'A+'}
        </button>
      </div>

      {/* Scene area */}
      <div className={styles.scene}>
        {children({
          activeIndex: phase === 'clues' ? activeIndex : -1,
          onAction,
        })}
      </div>

      {/* Clue panel (slides up from bottom when phase=clues) */}
      {phase === 'clues' && currentClue && (
        <div className={styles.cluePanel}>
          <div className={styles.cluePanelInner}>
            <div className={styles.cluePanelHeader}>
              <span className={styles.clueProgress}>
                Indice {activeIndex + 1}/{clues.length}
              </span>
              <span className={styles.cluePanelLabel}>{currentClue.label}</span>
            </div>
            <p className={styles.cluePanelDetail}>{currentClue.detail}</p>
            <div className={styles.cluePanelActions}>
              {activeIndex > 0 && (
                <button
                  className={styles.btnSecondary}
                  onClick={() => setActiveIndex(activeIndex - 1)}
                >
                  <ArrowLeft size={16} /> Précédent
                </button>
              )}
              <button className={styles.btnPrimary} onClick={handleNext}>
                {activeIndex < clues.length - 1 ? 'Suivant' : 'Voir la conclusion'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom control panel */}
      <div className={styles.bottomBar}>
        {phase === 'discovery' && (
          <button className={styles.btnReveal} onClick={handleReveal}>
            <MagnifyingGlass size={18} /> Révéler les indices
          </button>
        )}
        {phase === 'clues' && (
          <div className={styles.bottomClueControls}>
            <span className={styles.bottomProgress}>
              {activeIndex + 1} / {clues.length} indices révélés
            </span>
          </div>
        )}
        {phase === 'conclusion' && (
          <button className={styles.btnRestart} onClick={handleRestart}>
            <ArrowCounterClockwise size={16} /> Recommencer
          </button>
        )}
      </div>

      {/* Conclusion overlay */}
      {phase === 'conclusion' && (
        <div className={styles.conclusionOverlay}>
          <div className={styles.conclusionCard}>
            <div className={`${styles.conclusionVerdict} ${verdictClass}`}>
              {verdictLabel}
            </div>
            <h2 className={styles.conclusionTitle}>{conclusion.title}</h2>
            <p className={styles.conclusionBody}>{conclusion.body}</p>
            <div className={styles.conclusionReflex}>
              <span className={styles.conclusionReflexIcon}><Lightbulb size={22} /></span>
              <p>{conclusion.reflex}</p>
            </div>
            <button className={styles.btnRestart} onClick={handleRestart}>
              <ArrowCounterClockwise size={16} /> Recommencer
            </button>
          </div>
        </div>
      )}

      {/* Action modal */}
      {actionModal && actionModals[actionModal] && (
        <div className={styles.actionModalBackdrop} onClick={closeActionModal}>
          <div className={styles.actionModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.actionModalIcon}>
              {(() => {
                const Icon = actionModals[actionModal].icon
                return <Icon size={44} />
              })()}
            </div>
            <h3 className={styles.actionModalTitle}>{actionModals[actionModal].title}</h3>
            <p className={styles.actionModalBody}>{actionModals[actionModal].body}</p>
            <button className={styles.btnPrimary} onClick={closeActionModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
