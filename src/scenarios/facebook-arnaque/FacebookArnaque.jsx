import SimulationLayout from '../../components/SimulationLayout.jsx'
import Clue from '../../components/Clue.jsx'
import styles from './FacebookArnaque.module.css'

const CLUES = [
  {
    label: 'Pas de badge de vérification',
    detail: "Les vraies marques ont un badge bleu ✓ sur Facebook. 'Super Promos FR' n'en a pas - n'importe qui peut créer cette page.",
  },
  {
    label: 'La remise de -90%',
    detail: "Aucun revendeur sérieux ne vend à -90%. Ce prix est délibérément attractif pour vous faire agir sans vérifier.",
  },
  {
    label: "L'URL .xyz suspecte",
    detail: "super-promo-cuisine-fr.xyz n'est pas un site français officiel. Les .xyz sont ultra-bon marché et souvent utilisés pour des arnaques.",
  },
  {
    label: 'Aucune vérification possible',
    detail: "Pas d'avis clients, pas de SIRET, pas de mentions légales. Astuce : chercher 'super promo cuisine fr arnaque' sur Google avant tout achat.",
  },
]

const CONCLUSION = {
  title: "C'est une arnaque !",
  body: "Ces fausses publicités Facebook sont créées en masse, souvent depuis l'étranger. Soit vous ne recevez rien, soit vous recevez un produit contrefait de mauvaise qualité. Vos données bancaires sont compromises.",
  reflex:
    "Le bon réflexe : avant tout achat sur pub Facebook, chercher le nom du site + 'arnaque' sur Google. Vérifier les mentions légales du site. Ne jamais acheter sur un site en .xyz ou .shop inconnu.",
}

const ACTION_MODALS = {
  acheter: {
    title: 'Vous allez sur le site de paiement',
    body: "Le site ressemble à un vrai site marchand. Il demande votre carte bancaire. Une fois le paiement validé : vous ne recevrez jamais le produit, et votre carte sera utilisée pour d'autres achats frauduleux.",
    icon: '🛒',
  },
}

export default function FacebookArnaque() {
  return (
    <SimulationLayout
      title="CAS 3 - Fausse pub Facebook"
      verdict="arnaque"
      clues={CLUES}
      conclusion={CONCLUSION}
      actionModals={ACTION_MODALS}
    >
      {({ activeIndex, onAction }) => (
        <div className={styles.fbWrapper}>
          {/* Facebook nav bar */}
          <div className={styles.fbNav}>
            <div className={styles.fbLogo}>
              <span className={styles.fbF}>f</span>
            </div>
            <div className={styles.fbSearch}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#606770">
                <circle cx="6" cy="6" r="4.5" stroke="#606770" strokeWidth="1.5" fill="none" />
                <path d="M10 10l3 3" stroke="#606770" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>Rechercher</span>
            </div>
            <div className={styles.fbNavIcons}>
              <div className={styles.fbNavIcon}>🏠</div>
              <div className={styles.fbNavIcon}>👥</div>
              <div className={styles.fbNavIcon}>🔔</div>
              <div className={styles.fbNavIconActive}>⊞</div>
            </div>
          </div>

          {/* Feed */}
          <div className={styles.fbFeed}>
            {/* Post */}
            <div className={styles.fbPost}>
              {/* Post header */}
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}>SP</div>
                <div className={styles.postMeta}>
                  <div className={styles.postNameRow}>
                    <Clue index={0} activeIndex={activeIndex} type="danger" as="span">
                      <span className={styles.postName}>Super Promos FR</span>
                    </Clue>
                    {/* No verification badge - intentionally absent */}
                  </div>
                  <div className={styles.postSub}>
                    <span className={styles.sponsored}>Sponsorisé</span>
                    <span className={styles.dot}>·</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="#606770">
                      <circle cx="6" cy="6" r="5.5" stroke="#606770" strokeWidth="1" fill="none" />
                      <circle cx="6" cy="5" r="1.2" fill="#606770" />
                      <path d="M6 7v2.5" stroke="#606770" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <button className={styles.postMore}>•••</button>
              </div>

              {/* Post text */}
              <p className={styles.postText}>
                🔥 VENTE FLASH - 48H SEULEMENT ! Robot Cuisine Pro à prix CASSÉ. Livraison offerte, stock limité !
              </p>

              {/* Product image */}
              <div className={styles.productImage}>
                <div className={styles.productEmoji}>🤖</div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>Robot Cuisine Pro 3000</div>
                  <div className={styles.productPriceRow}>
                    <span className={styles.priceOld}>299 €</span>
                    <span className={styles.priceNew}>29 €</span>
                    <Clue index={1} activeIndex={activeIndex} type="danger" as="span">
                      <span className={styles.discountBadge}>-90%</span>
                    </Clue>
                  </div>
                  <Clue index={2} activeIndex={activeIndex} type="danger" as="span">
                    <span className={styles.productUrl}>super-promo-cuisine-fr.xyz</span>
                  </Clue>
                </div>
              </div>

              {/* CTA */}
              <div className={styles.ctaRow}>
                <Clue index={3} activeIndex={activeIndex} type="danger" as="div">
                  <button
                    className={styles.btnAcheter}
                    onClick={() => onAction('acheter')}
                  >
                    Acheter maintenant
                  </button>
                </Clue>
              </div>

              {/* Reaction bar */}
              <div className={styles.reactionBar}>
                <div className={styles.reactionIcons}>
                  <span>👍</span>
                  <span>❤️</span>
                  <span>😮</span>
                  <span className={styles.reactionCount}>2,4 k</span>
                </div>
                <div className={styles.reactionStats}>
                  <span>187 commentaires · 94 partages</span>
                </div>
              </div>

              <div className={styles.actionBar}>
                <button className={styles.actionBtn}>
                  <span>👍</span> J'aime
                </button>
                <button className={styles.actionBtn}>
                  <span>💬</span> Commenter
                </button>
                <button className={styles.actionBtn}>
                  <span>↗</span> Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SimulationLayout>
  )
}
