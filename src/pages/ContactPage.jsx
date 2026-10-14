import { useState } from 'react'
import { Envelope, PaperPlaneTilt, CheckCircle, WarningCircle } from '../icons/index.jsx'
import Layout from '../components/Layout.jsx'
import styles from './ContactPage.module.css'

const SUJETS = ['Organiser un atelier', 'Une question', 'Autre']

// Netlify attend un corps encodé en x-www-form-urlencoded, avec le nom du formulaire
function encode(data) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

export default function ContactPage() {
  const [values, setValues] = useState({
    nom: '',
    email: '',
    structure: '',
    sujet: SUJETS[0],
    message: '',
    'bot-field': '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function handleChange(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...values }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <Layout>
        <div className={styles.page}>
          <div className={styles.inner}>
            <div className={styles.success}>
              <CheckCircle size={40} />
              <h1 className={styles.successTitle}>Message envoyé !</h1>
              <p className={styles.successDesc}>
                Merci {values.nom.trim().split(' ')[0]}. Je vous réponds sous quelques jours,
                à l'adresse <strong>{values.email}</strong>.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <div className={styles.iconWrap}>
              <Envelope size={28} />
            </div>
            <h1 className={styles.title}>Me contacter</h1>
            <p className={styles.desc}>
              Une envie d'organiser un atelier, une question sur le format, ou simplement
              l'envie d'échanger ? Écrivez-moi, je réponds à tout le monde.
            </p>
          </div>

          <form
            className={styles.form}
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />

            {/* Piège à robots - invisible pour les humains */}
            <p className={styles.honeypot} aria-hidden="true">
              <label>
                Ne remplissez pas ce champ
                <input
                  name="bot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values['bot-field']}
                  onChange={handleChange}
                />
              </label>
            </p>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="nom">
                  Votre nom <span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.input}
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  autoComplete="name"
                  value={values.nom}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  Votre email <span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.input}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="structure">
                Structure <span className={styles.optional}>(facultatif)</span>
              </label>
              <input
                className={styles.input}
                id="structure"
                name="structure"
                type="text"
                placeholder="Association, mairie, bibliothèque…"
                value={values.structure}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="sujet">
                Sujet
              </label>
              <select
                className={styles.select}
                id="sujet"
                name="sujet"
                value={values.sujet}
                onChange={handleChange}
              >
                {SUJETS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">
                Votre message <span className={styles.required}>*</span>
              </label>
              <textarea
                className={styles.textarea}
                id="message"
                name="message"
                rows={6}
                required
                placeholder="Dites-moi en quelques lignes ce dont vous avez besoin."
                value={values.message}
                onChange={handleChange}
              />
            </div>

            {status === 'error' && (
              <p className={styles.error} role="alert">
                <WarningCircle size={16} />
                L'envoi a échoué. Réessayez, ou écrivez directement à
                {' '}
                <a href="mailto:maxime.bergerard@gmail.com">maxime.bergerard@gmail.com</a>.
              </p>
            )}

            <button className={styles.submit} type="submit" disabled={status === 'sending'}>
              <PaperPlaneTilt size={16} />
              {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
            </button>

            <p className={styles.privacy}>
              Vos coordonnées servent uniquement à vous répondre. Elles ne sont ni revendues,
              ni utilisées pour autre chose.
            </p>
          </form>
        </div>
      </div>
    </Layout>
  )
}
