import { Link } from 'react-router-dom'
import { HeroShapes, BandShapes } from './Shapes.jsx'
import styles from './Content.module.css'

// Fil d'Ariane : Accueil / … / page courante
// crumbs : [{ to, label }] sans la page courante
export function Breadcrumb({ crumbs = [], current, className }) {
  return (
    <nav aria-label="Fil d'Ariane" className={className}>
      <ol className={styles.breadcrumb}>
        <li><Link to="/">Accueil</Link></li>
        {crumbs.map((c) => (
          <li key={c.to}><Link to={c.to}>{c.label}</Link></li>
        ))}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  )
}

// Photo ronde posée sur des aplats (disque moutarde, carré rose)
// eager : true quand la photo est visible dès le chargement (en-tête)
export function Portrait({ src, alt, eager = false, className = '' }) {
  return (
    <div className={`${styles.portrait} ${className}`}>
      <img
        src={src}
        alt={alt}
        width="560"
        height="560"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={styles.portraitImg}
      />
    </div>
  )
}

// En-tête des pages de contenu : fond papier, titre serif, formes à droite.
// crumbs, current : voir Breadcrumb
// shapes : numéro de la composition de formes (0 à 3)
// aside : remplace les formes (ex. <Portrait />)
export function PageHero({ crumbs = [], current, badge, title, lead, shapes = 0, aside, children }) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <Breadcrumb crumbs={crumbs} current={current} className={styles.heroCrumbs} />
          {badge && <p className={styles.badge}>{badge}</p>}
          <h1 className={styles.heroTitle}>{title}</h1>
          {lead && <p className={styles.heroLead}>{lead}</p>}
          {children}
        </div>
        {aside ?? <HeroShapes variant={shapes} className={styles.heroShapes} />}
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
