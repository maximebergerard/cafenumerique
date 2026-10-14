import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { PageHero } from '../components/ContentBlocks.jsx'
import { LEGAL } from '../content/site.js'
import styles from '../components/Content.module.css'

export default function MentionsLegalesPage() {
  const { editeur, hebergeur } = LEGAL
  return (
    <Layout>
      <PageHero
        current="Mentions légales"
        title="Mentions légales et confidentialité"
        lead={`Dernière mise à jour : ${LEGAL.misAJour}.`}
      />

      <section className={styles.section}>
        <div className={`${styles.narrow} ${styles.prose}`}>
          <h2 className={styles.h2}>Éditeur du site</h2>
          <p>
            Ce site est édité par {editeur.nom}, qui en assure aussi la direction de la publication.
          </p>
          <ul>
            {editeur.statut && <li>Statut : {editeur.statut}</li>}
            {editeur.siret && <li>SIRET : {editeur.siret}</li>}
            {editeur.adresse && <li>Adresse : {editeur.adresse}</li>}
            <li>
              Contact : <a href={`mailto:${editeur.email}`}>{editeur.email}</a> ou
              le <Link to="/contact">formulaire de contact</Link>
            </li>
          </ul>

          <h2 className={styles.h2}>Hébergement</h2>
          <p>
            Le site est hébergé par {hebergeur.nom}, {hebergeur.adresse} (
            <a href={hebergeur.site} target="_blank" rel="noopener noreferrer">netlify.com</a>).
          </p>

          <h2 className={styles.h2}>Données personnelles</h2>
          <p>
            Le seul endroit où le site recueille des données est le formulaire de contact : votre nom,
            votre adresse mail, le nom de votre structure (facultatif), le sujet et votre message.
            Elles servent uniquement à répondre à votre demande. Elles ne sont ni revendues ni
            utilisées pour de la prospection.
          </p>
          <p>
            Le message arrive dans la boîte mail de {editeur.nom} et reste consultable sur le
            service de formulaires de Netlify, qui héberge le site. Les données ne sont gardées que le
            temps nécessaire pour traiter votre demande.
          </p>
          <p>
            Vous pouvez demander à tout moment l'accès à vos données, leur correction ou leur
            suppression, en écrivant à <a href={`mailto:${editeur.email}`}>{editeur.email}</a>. Si
            vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la{' '}
            <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">CNIL</a>.
          </p>

          <h2 className={styles.h2}>Cookies</h2>
          <p>
            Le site ne dépose aucun cookie publicitaire ou de mesure d'audience et n'utilise aucun
            outil de suivi. C'est pour cette raison qu'il n'affiche pas de bandeau à valider.
          </p>
          <p>
            Il retient seulement, dans votre navigateur et sans rien envoyer, vos préférences
            d'affichage (taille du texte) et, sur les pages réservées à l'animation, quelques
            réglages comme le nom des équipes.
          </p>

          <h2 className={styles.h2}>Simulations et marques citées</h2>
          <p>
            Les simulations d'arnaques (faux mails, faux SMS, fausses pages de paiement) sont
            entièrement fictives et servent à s'entraîner en atelier. Elles imitent l'apparence
            d'organismes réels comme La Poste, La Banque Postale, Microsoft, Facebook ou WhatsApp,
            sans aucun lien avec eux. Ne saisissez jamais de vraies informations dans ces pages.
          </p>

          <h2 className={styles.h2}>Contenus</h2>
          <p>
            Les textes, fiches, guides et simulations de ce site sont l'œuvre de {editeur.nom}.
            Pour les reprendre ou les projeter dans un autre cadre que votre atelier, écrivez-moi
            d'abord.
          </p>
        </div>
      </section>
    </Layout>
  )
}
