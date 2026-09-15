import { useEffect, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { atelierIa } from '../../content/atelier-ia.js'
import { remplir } from '../texte.js'
import styles from './Minuteur.module.css'

const { interface: ui, dureesMinuteur } = atelierIa.animateur

function formater(ms) {
  const totalSecondes = Math.ceil(ms / 1000)
  const minutes = Math.floor(totalSecondes / 60)
  const secondes = totalSecondes % 60
  return `${String(minutes).padStart(2, '0')}:${String(secondes).padStart(2, '0')}`
}

// Basé sur une heure de fin plutôt qu'un décompte : reste juste même si l'onglet passe en arrière-plan
export default function Minuteur() {
  const [duree, setDuree] = useState(dureesMinuteur[0] * 60_000)
  const [fin, setFin] = useState(null)          // heure de fin si en marche
  const [restantEnPause, setRestantEnPause] = useState(duree)
  const [maintenant, setMaintenant] = useState(() => Date.now())
  const [saisie, setSaisie] = useState('')

  const enMarche = fin !== null
  const restant = enMarche ? Math.max(0, fin - maintenant) : restantEnPause
  const termine = enMarche && restant === 0

  useEffect(() => {
    if (!enMarche) return
    const id = setInterval(() => setMaintenant(Date.now()), 250)
    return () => clearInterval(id)
  }, [enMarche])

  function choisir(minutes) {
    const ms = minutes * 60_000
    setDuree(ms)
    setFin(null)
    setRestantEnPause(ms)
  }

  function demarrer() {
    const now = Date.now()
    setMaintenant(now)
    setFin(now + restantEnPause)
  }

  function pause() {
    setRestantEnPause(restant)
    setFin(null)
  }

  function reinitialiser() {
    setFin(null)
    setRestantEnPause(duree)
  }

  function validerSaisie(e) {
    e.preventDefault()
    const minutes = Number(saisie.replace(',', '.'))
    if (minutes > 0) choisir(minutes)
  }

  const libelleDemarrer = restantEnPause < duree ? ui.reprendre : ui.demarrer

  return (
    <div className={styles.minuteur}>
      <div className={`${styles.affichage} ${termine ? styles.termine : ''}`} aria-live="polite">
        {termine ? ui.tempsEcoule : formater(restant)}
      </div>

      <div className={styles.actions}>
        {enMarche && !termine ? (
          <button className={styles.boutonPrincipal} onClick={pause}>
            <Pause size={22} aria-hidden="true" /> {ui.pause}
          </button>
        ) : !termine && (
          <button className={styles.boutonPrincipal} onClick={demarrer} disabled={restantEnPause === 0}>
            <Play size={22} aria-hidden="true" /> {libelleDemarrer}
          </button>
        )}
        <button className={styles.boutonSecondaire} onClick={reinitialiser}>
          <RotateCcw size={20} aria-hidden="true" /> {ui.reinitialiser}
        </button>
      </div>

      <div className={styles.durees}>
        {dureesMinuteur.map(minutes => (
          <button
            key={minutes}
            className={`${styles.duree} ${duree === minutes * 60_000 ? styles.dureeActive : ''}`}
            onClick={() => choisir(minutes)}
          >
            {remplir(ui.minutes, { n: minutes })}
          </button>
        ))}
      </div>

      <form className={styles.perso} onSubmit={validerSaisie}>
        <label className={styles.persoLabel} htmlFor="minuteur-perso">{ui.dureePerso}</label>
        <div className={styles.persoLigne}>
          <input
            id="minuteur-perso"
            className={styles.persoChamp}
            type="number"
            inputMode="decimal"
            min="0.5"
            step="0.5"
            value={saisie}
            onChange={e => setSaisie(e.target.value)}
          />
          <button type="submit" className={styles.boutonSecondaire}>{ui.valider}</button>
        </div>
      </form>
    </div>
  )
}
