import { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import Layout from '../components/Layout.jsx'
import styles from './PlanSallePage.module.css'

// Page privée (hors menus, non indexée) : plan des tables, un plan par lieu.
// Les noms sont enregistrés sur l'appareil, rien n'est envoyé nulle part.
const CLE_LIEU = 'plan_salle_lieu'

// `cote` sert au placement de la place autour de la table et à l'inclinaison de l'étiquette.
// Les `id` des places servent de clés dans le stockage : ne pas les renommer.
const SALLES = [
  {
    id: 'chatelet',
    nom: 'Châtelet-en-Brie',
    cle: 'plan_salle_chatelet',
    intro: 'Deux îlots de 5 personnes : un duo d’un côté, un trio de l’autre (la personne en bout de table rejoint le trio).',
    // Disposition réelle non mesurée : tables droites, une équipe de chaque côté.
    tables: [
      {
        id: 'table-1',
        nom: 'Îlot de gauche',
        inclinaison: 0,
        places: [
          { id: 'cg-duo', cote: 'gauche', libelle: 'Duo · 2 personnes' },
          { id: 'cg-trio', cote: 'droite', libelle: 'Trio · 3 personnes' },
        ],
      },
      {
        id: 'table-2',
        nom: 'Îlot de droite',
        inclinaison: 0,
        places: [
          { id: 'cd-duo', cote: 'gauche', libelle: 'Duo · 2 personnes' },
          { id: 'cd-trio', cote: 'droite', libelle: 'Trio · 3 personnes' },
        ],
      },
    ],
  },
  {
    id: 'nandy',
    nom: 'Nandy',
    cle: 'plan_salle_nandy',
    intro: 'Deux tables inclinées, trois équipes autour de chacune (le côté vers l’écran reste libre).',
    tables: [
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
    ],
  },
]

const idsDe = (salle) => salle.tables.flatMap((t) => t.places.map((p) => p.id))
const videDe = (salle) => Object.fromEntries(idsDe(salle).map((id) => [id, '']))

function lireLieu() {
  try {
    const id = localStorage.getItem(CLE_LIEU)
    return SALLES.some((s) => s.id === id) ? id : SALLES[0].id
  } catch {
    return SALLES[0].id
  }
}

function lire(salle) {
  const vide = videDe(salle)
  try {
    const brut = localStorage.getItem(salle.cle)
    return brut ? { ...vide, ...JSON.parse(brut) } : vide
  } catch {
    return vide
  }
}

function ecrire(cle, valeur) {
  try { localStorage.setItem(cle, valeur) } catch { /* stockage indisponible */ }
}

function Salle({ salle }) {
  const [noms, setNoms] = useState(() => lire(salle))
  const total = idsDe(salle).length

  function changer(id, valeur) {
    setNoms((n) => {
      const suivant = { ...n, [id]: valeur }
      ecrire(salle.cle, JSON.stringify(suivant))
      return suivant
    })
  }

  const remplies = Object.values(noms).filter((n) => n.trim()).length

  function effacer() {
    if (window.confirm('Effacer tous les noms d’équipes ?')) {
      const vide = videDe(salle)
      setNoms(vide)
      ecrire(salle.cle, JSON.stringify(vide))
    }
  }

  return (
    <>
      <header className={styles.entete}>
        <h1 className={styles.titre}>Plan de salle — {salle.nom}</h1>
        <p className={styles.intro}>
          {salle.intro} Notez le nom de chaque équipe à sa place. Tout est enregistré sur cet
          appareil, vous pouvez fermer la page et revenir.
        </p>
      </header>

      <div className={styles.salle}>
        {salle.tables.map((table) => (
          <section
            key={table.id}
            className={`${styles.bloc} ${table.places.length === 2 ? styles.blocDeux : ''}`}
            aria-label={table.nom}
          >
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
        <span className={styles.compteur}>{remplies} équipe{remplies > 1 ? 's' : ''} sur {total}</span>
        <button type="button" className={styles.effacer} onClick={effacer}>
          <RotateCcw size={16} />
          Tout effacer
        </button>
      </div>
    </>
  )
}

export default function PlanSallePage() {
  // Page chargée à la demande, jamais pré-rendue : on peut lire le stockage
  // dès le premier rendu, sans risque côté serveur.
  const [lieu, setLieu] = useState(lireLieu)
  const salle = SALLES.find((s) => s.id === lieu)

  function choisir(id) {
    setLieu(id)
    ecrire(CLE_LIEU, id)
  }

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.inner}>
          <div className={styles.lieux} role="group" aria-label="Lieu de l’atelier">
            {SALLES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`${styles.lieu} ${s.id === lieu ? styles.lieuActif : ''}`}
                aria-pressed={s.id === lieu}
                onClick={() => choisir(s.id)}
              >
                {s.nom}
              </button>
            ))}
          </div>

          {/* key : chaque lieu repart avec ses propres noms */}
          <Salle key={salle.id} salle={salle} />
        </div>
      </div>
    </Layout>
  )
}
