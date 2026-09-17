import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Maximize, Play, X } from 'lucide-react'
import ZoneIndice from '../components/ZoneIndice.jsx'
import { atelierIa } from '../../content/atelier-ia.js'
import { remplir } from '../texte.js'
import styles from './IaOuPasPage.module.css'

const { interface: ui, reponses, visuels } = atelierIa.iaOuPas

// Déroulé d'un visuel, étape par étape :
//   0            → visuel seul (vote avec les cartons)
//   1            → réponse révélée
//   2 … n+1      → indices révélés un par un
//   n+2          → phrase de débrief (si renseignée)
function derniereEtape(visuel) {
  return 1 + visuel.indices.length + (visuel.phraseDeDebrief ? 1 : 0)
}

export default function IaOuPasPage() {
  const [{ v, etape }, setPosition] = useState({ v: 0, etape: 0 })
  const [pleinEcran, setPleinEcran] = useState(false)

  const visuel = visuels[v]
  const nbIndices = visuel.indices.length
  const reponseVisible = etape >= 1
  const indicesVisibles = Math.min(Math.max(etape - 1, 0), nbIndices)
  const debriefVisible = Boolean(visuel.phraseDeDebrief) && etape === derniereEtape(visuel)
  const indiceActif = debriefVisible ? -1 : indicesVisibles - 1
  const typeZone = visuel.reponse === 'authentique' ? 'ok' : 'danger'

  const suivant = useCallback(() => {
    setPosition(({ v, etape }) => {
      if (etape < derniereEtape(visuels[v])) return { v, etape: etape + 1 }
      if (v < visuels.length - 1) return { v: v + 1, etape: 0 }
      return { v, etape }
    })
  }, [])

  const precedent = useCallback(() => {
    setPosition(({ v, etape }) => {
      if (etape > 0) return { v, etape: etape - 1 }
      if (v > 0) return { v: v - 1, etape: derniereEtape(visuels[v - 1]) }
      return { v, etape }
    })
  }, [])

  const basculerPleinEcran = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }, [])

  // Pilotage au clavier (et télécommandes de présentation : PageUp / PageDown)
  useEffect(() => {
    function onKey(e) {
      if (e.target.closest?.('input, textarea')) return
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); suivant() }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); precedent() }
      else if (e.key === 'f' || e.key === 'F') basculerPleinEcran()
      // Échap : sortie du plein écran gérée nativement par le navigateur
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [suivant, precedent, basculerPleinEcran])

  useEffect(() => {
    const onChange = () => setPleinEcran(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  // Évite qu'un bouton cliqué garde le focus et réagisse à la barre espace
  const clic = action => e => { e.currentTarget.blur(); action() }

  return (
    <div className={styles.page}>
      <div className={`${styles.scene} ${reponseVisible ? styles.sceneAvecPanneau : ''}`}>
        <div className={styles.zoneMedia}>
          <div className={styles.cadreMedia}>
            <Media key={visuel.id} visuel={visuel} />
            {visuel.indices.slice(0, indicesVisibles).map((indice, i) =>
              indice.zone ? (
                <ZoneIndice key={i} zone={indice.zone} index={i} actif={i === indiceActif} type={typeZone} />
              ) : null
            )}
          </div>
        </div>

        {reponseVisible && (
          <aside className={styles.panneau}>
            <div className={`${styles.reponse} ${styles[`reponse_${visuel.reponse}`]}`}>
              {reponses[visuel.reponse]}
            </div>

            {indicesVisibles > 0 && (
              <div className={styles.indices}>
                <h2 className={styles.indicesTitre}>{ui.indices}</h2>
                <ol className={styles.listeIndices}>
                  {visuel.indices.slice(0, indicesVisibles).map((indice, i) => (
                    <li
                      key={i}
                      className={`${styles.indice} ${i === indiceActif ? styles.indiceActif : ''} ${styles[`indice_${typeZone}`]}`}
                    >
                      <span className={styles.indiceNumero}>{i + 1}</span>
                      <div>
                        <div className={styles.indiceTitre}>{indice.titre}</div>
                        <div className={styles.indiceDetail}>{indice.detail}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {debriefVisible && (
              <div className={styles.debrief}>
                <div className={styles.debriefTitre}>{ui.debrief}</div>
                <p>{visuel.phraseDeDebrief}</p>
              </div>
            )}
          </aside>
        )}
      </div>

      <div className={styles.compteur}>
        {remplir(ui.compteur, { n: v + 1, total: visuels.length })}
      </div>

      <div className={styles.commandes}>
        <Link to="/atelier-ia/animateur" className={styles.commande} title={ui.quitter} aria-label={ui.quitter}>
          <X size={22} />
        </Link>
        {!pleinEcran && (
          <button className={styles.commande} onClick={clic(basculerPleinEcran)} title={ui.pleinEcran} aria-label={ui.pleinEcran}>
            <Maximize size={22} />
          </button>
        )}
        <button className={styles.commande} onClick={clic(precedent)} title={ui.precedent} aria-label={ui.precedent}>
          <ChevronLeft size={26} />
        </button>
        <button className={styles.commande} onClick={clic(suivant)} title={ui.suivant} aria-label={ui.suivant}>
          <ChevronRight size={26} />
        </button>
      </div>
    </div>
  )
}

function Media({ visuel }) {
  const [erreur, setErreur] = useState(false)
  const [enLecture, setEnLecture] = useState(false)
  const videoRef = useRef(null)

  if (erreur) {
    return <div className={styles.mediaManquant}>{remplir(ui.mediaManquant, { src: visuel.src })}</div>
  }

  if (visuel.type === 'video') {
    const basculerLecture = () => {
      const video = videoRef.current
      if (!video) return
      if (video.paused) video.play()
      else video.pause()
    }
    return (
      <>
        <video
          ref={videoRef}
          className={styles.media}
          src={visuel.src}
          aria-label={visuel.alt}
          playsInline
          loop
          preload="auto"
          onClick={basculerLecture}
          onPlay={() => setEnLecture(true)}
          onPause={() => setEnLecture(false)}
          onError={() => setErreur(true)}
        />
        {!enLecture && (
          <button className={styles.lancerVideo} onClick={e => { e.currentTarget.blur(); basculerLecture() }}>
            <Play size={48} aria-hidden="true" />
            <span>{ui.lancerVideo}</span>
          </button>
        )}
      </>
    )
  }

  return (
    <img
      className={styles.media}
      src={visuel.src}
      alt={visuel.alt}
      draggable={false}
      onError={() => setErreur(true)}
    />
  )
}
