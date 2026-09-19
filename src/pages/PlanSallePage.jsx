import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import styles from './PlanSallePage.module.css'

// Page privée (hors menus, non indexée) : plan des tables de la médiathèque de
// Nandy. Les noms sont enregistrés sur l'appareil, rien n'est envoyé nulle part.
const CLE = 'plan_salle_nandy'

// Deux tables inclinées, trois équipes autour de chacune (le côté vers l'écran
// reste libre). `cote` sert au placement et à l'inclinaison de l'étiquette.
const TABLES = [
  {
    id: 'table-1',
    nom: 'Table de gauche',
    inclinaison: -7,
    places: [
      { id: 'g-haut', cote: 'haut', libelle: 'Côté fenêtres' },
      { id: 'g-gauche', cote: 'gauche', libelle: 'Côté mur' },
      { id: 'g-droite', cote: 'droite', libelle: 'Côté allée' },
    ],
  },
  {
    id: 'table-2',
    nom: 'Table de droite',
    inclinaison: 7,
    places: [
      { id: 'd-haut', cote: 'haut', libelle: 'Côté fenêtres' },
      { id: 'd-gauche', cote: 'gauche', libelle: 'Côté allée' },
      { id: 'd-droite', cote: 'droite', libelle: 'Côté mur' },
    ],
  },
]

const VIDE = Object.fromEntries(TABLES.flatMap((t) => t.places.map((p) => [p.id, ''])))

function lire() {
  try {
    const brut = localStorage.getItem(CLE)
    return brut ? { ...VIDE, ...JSON.parse(brut) } : VIDE
  } catch {
    return VIDE
  }
}

function ecrire(noms) {
  try { localStorage.setItem(CLE, JSON.stringify(noms)) } catch { /* stockage indisponible */ }
}

export default function PlanSallePage() {
  // Page chargée à la demande, jamais pré-rendue : on peut lire le stockage
  // dès le premier rendu, sans risque côté serveur.
  const [noms, setNoms] = useState(lire)

  function changer(id, valeur) {
    setNoms((n) => {
      const suivant = { ...n, [id]: valeur }
      ecrire(suivant)
      return suivant
    })
  }

  const remplies = Object.values(noms).filter((n) => n.trim()).length

  function effacer() {
    if (window.confirm('Effacer tous les noms d’équipes ?')) {
      setNoms(VIDE)
      ecrire(VIDE)
    }
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>
          <header className={styles.entete}>
            <h1 className={styles.titre}>Plan de salle — Nandy</h1>
            <p className={styles.intro}>
              Notez le nom de chaque équipe à sa place. Tout est enregistré sur cet appareil,
              vous pouvez fermer la page et revenir.
            </p>
          </header>

          <div className={styles.salle}>
            {TABLES.map((table) => (
              <section key={table.id} className={styles.bloc} aria-label={table.nom}>
                {table.places.map((place) => (
                  <label key={place.id} className={`${styles.place} ${styles[place.cote]}`}>
                    <span className={styles.placeLibelle}>{place.libelle}</span>
                    <input
                      className={styles.champ}
                      type="text"
                      value={noms[place.id]}
                      placeholder="équipe"
                      autoComplete="off"
                      onChange={(e) => changer(place.id, e.target.value)}
                    />
                  </label>
                ))}
                <div className={styles.zone} style={{ '--inclinaison': `${table.inclinaison}deg` }}>
                  <div className={styles.table} aria-hidden="true" />
                </div>
                <div className={styles.nomTable}>{table.nom}</div>
              </section>
            ))}
          </div>

          <div className={styles.ecran}>Écran / animateur de ce côté</div>

          <div className={styles.barre}>
            <span className={styles.compteur}>{remplies} équipe{remplies > 1 ? 's' : ''} sur 6</span>
            <button type="button" className={styles.effacer} onClick={effacer}>
              <RotateCcw size={16} />
              Tout effacer
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
