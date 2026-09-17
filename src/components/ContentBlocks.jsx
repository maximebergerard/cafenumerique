import { Link } from 'react-router-dom'
import { HeroShapes, BandShapes } from './Shapes.jsx'
import styles from './Content.module.css'

// En-tête des pages de contenu : fond papier, titre serif, formes à droite.
// crumbs : [{ to, label }] sans la page courante
// shapes : numéro de la composition de formes (0 à 3)
export function PageHero({ crumbs = [], current, badge, title, lead, shapes = 0, children }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <nav aria-label="Fil d'Ariane">
            <ol className={styles.breadcrumb}>
              <li><Link to="/">Accueil</Link></li>
              {crumbs.map((c) => (
                <li key={c.to}><Link to={c.to}>{c.label}</Link></li>
              ))}
              <li aria-current="page">{current}</li>
            </ol>
          </nav>
          {badge && <p className={styles.badge}>{badge}</p>}
          <h1 className={styles.heroTitle}>{title}</h1>
          {lead && <p className={styles.heroLead}>{lead}</p>}
          {children}
        </div>
        <HeroShapes variant={shapes} className={styles.heroShapes} />
      </div>
    </header>
  )
}

// Bandeau final "organiser un atelier"
export function CtaBand({
  title = 'Envie d’un atelier pour votre public ?',
  text = 'Médiathèque, mairie, résidence, association : parlons de vos besoins, le programme s’adapte à votre public.',
}) {
  return (
    <section className={styles.cta}>
      <BandShapes className={styles.ctaShapes} />
      <div className={styles.ctaInner}>
        <h2 className={styles.ctaTitle}>{title}</h2>
        <p className={styles.ctaText}>{text}</p>
        <div className={styles.ctaButtons}>
          <Link to="/contact" className={styles.btnMustard}>Me contacter</Link>
          <Link to="/organiser-un-atelier" className={styles.btnOutlineLight}>Comment ça se passe</Link>
        </div>
      </div>
    </section>
  )
}
