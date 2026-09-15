import { useEffect, useState } from 'react'
import { ExternalLink, Heart, Target, CheckCircle2, Lightbulb } from 'lucide-react'
import Layout from '../../components/Layout.jsx'
import { atelierIa } from '../../content/atelier-ia.js'
import { remplir } from '../texte.js'
import styles from './ApresPage.module.css'

const { interface: ui, defiDeLaSemaine, outils, recap, quiz, messagesVisite } = atelierIa.apres

const CLE_DERNIERE_VISITE = 'atelier_ia_derniere_visite'

function lireDerniereVisite() {
  try {
    const brut = localStorage.getItem(CLE_DERNIERE_VISITE)
    return brut ? new Date(brut) : null
  } catch { return null }
}

// Nombre de jours calendaires entre deux dates
function joursEntre(avant, apres) {
  const debut = new Date(avant.getFullYear(), avant.getMonth(), avant.getDate())
  const fin = new Date(apres.getFullYear(), apres.getMonth(), apres.getDate())
  return Math.round((fin - debut) / 86_400_000)
}

function choisirMessage(derniereVisite) {
  if (!derniereVisite) return messagesVisite.premiereVisite
  const jours = joursEntre(derniereVisite, new Date())
  const atteints = messagesVisite.retours.filter(m => jours >= m.apresJours)
  if (atteints.length === 0) return null
  return atteints.reduce((a, b) => (b.apresJours > a.apresJours ? b : a)).texte
}

export default function ApresPage() {
  // Lu une seule fois à l'arrivée, avant d'enregistrer la visite du jour
  const [message] = useState(() => choisirMessage(lireDerniereVisite()))

  useEffect(() => {
    try { localStorage.setItem(CLE_DERNIERE_VISITE, new Date().toISOString()) } catch { /* stockage indisponible */ }
  }, [])

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>

          {message && (
            <p className={styles.messageVisite}>
              <Heart size={26} aria-hidden="true" />
              <span>{message}</span>
            </p>
          )}

          <header>
            <h1 className={styles.titrePage}>{ui.titrePage}</h1>
            <p className={styles.intro}>{ui.intro}</p>
          </header>

          <section className={styles.defiSemaine}>
            <div className={styles.defiSemaineSurtitre}>
              <Target size={24} aria-hidden="true" />
              {ui.defiDeLaSemaine}
            </div>
            <h2 className={styles.defiSemaineTitre}>{defiDeLaSemaine.titre}</h2>
            <p>{defiDeLaSemaine.texte}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.titreSection}>{ui.outils}</h2>
            <ul className={styles.outils}>
              {outils.map(outil => (
                <li key={outil.id}>
                  <a href={outil.url} target="_blank" rel="noopener noreferrer" className={styles.outil}>
                    <span className={styles.outilTexte}>
                      <span className={styles.outilNom}>{remplir(ui.ouvrir, { nom: outil.nom })}</span>
                      <span className={styles.outilDescription}>{outil.description}</span>
                    </span>
                    <ExternalLink size={26} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.titreSection}>{ui.recap}</h2>
            <ul className={styles.recap}>
              {recap.map((point, i) => (
                <li key={i}>
                  <CheckCircle2 size={26} className={styles.recapIcone} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.titreSection}>{ui.quiz}</h2>
            <Quiz />
          </section>

        </div>
      </div>
    </Layout>
  )
}

function Quiz() {
  // null = pas commencé ; questions.length = terminé
  const [position, setPosition] = useState(null)
  const [choixFait, setChoixFait] = useState(null)

  const total = quiz.questions.length

  if (position === null) {
    return (
      <div className={styles.quizCarte}>
        <p>{quiz.intro}</p>
        <button className={styles.boutonPrincipal} onClick={() => setPosition(0)}>
          {ui.commencerQuiz}
        </button>
      </div>
    )
  }

  if (position >= total) {
    return (
      <div className={styles.quizCarte}>
        <p className={styles.quizConclusion}>{quiz.conclusion}</p>
        <button className={styles.boutonSecondaire} onClick={() => { setPosition(0); setChoixFait(null) }}>
          {ui.recommencerQuiz}
        </button>
      </div>
    )
  }

  const question = quiz.questions[position]
  const choisi = choixFait !== null ? question.choix[choixFait] : null
  const bonChoix = question.choix.find(c => c.correct)

  function suivante() {
    setChoixFait(null)
    setPosition(p => p + 1)
  }

  return (
    <div className={styles.quizCarte}>
      <div className={styles.quizProgression}>
        {remplir(ui.progressionQuiz, { n: position + 1, total })}
      </div>
      <p className={styles.quizQuestion}>{question.question}</p>

      <div className={styles.choix} role="group" aria-label={question.question}>
        {question.choix.map((c, i) => {
          const etat = choisi === null
            ? ''
            : c.correct ? styles.choixBon : i === choixFait ? styles.choixAutre : styles.choixInactif
          return (
            <button
              key={i}
              className={`${styles.choixBouton} ${etat}`}
              onClick={() => setChoixFait(i)}
              disabled={choisi !== null}
              aria-pressed={i === choixFait}
            >
              {c.texte}
            </button>
          )
        })}
      </div>

      {choisi && (
        <div className={`${styles.feedback} ${choisi.correct ? styles.feedbackBon : styles.feedbackAutre}`} aria-live="polite">
          <div className={styles.feedbackTitre}>
            <Lightbulb size={24} aria-hidden="true" />
            {choisi.correct ? ui.bonneReponse : ui.pasToutAFait}
          </div>
          <p>{choisi.feedback}</p>
          {!choisi.correct && bonChoix && (
            <div className={styles.feedbackBonneReponse}>
              <p><strong>{ui.laBonneReponse}</strong> {bonChoix.texte}</p>
              <p>{bonChoix.feedback}</p>
            </div>
          )}
          <button className={styles.boutonPrincipal} onClick={suivante}>
            {position < total - 1 ? ui.questionSuivante : ui.terminerQuiz}
          </button>
        </div>
      )}
    </div>
  )
}
