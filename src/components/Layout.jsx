import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Coffee, Menu, X } from 'lucide-react'
import { useLargeFont } from '../hooks/useLargeFont.js'
import styles from './Layout.module.css'
import { ATELIERS } from '../content/ateliers.js'
import { GUIDES } from '../content/guides.js'

const NAV_LINKS = [
  { to: '/ateliers', label: 'Les ateliers' },
  { to: '/guides', label: 'Guides' },
  { to: '/arnaques', label: 'Simulations' },
  // also : les fiches (/retenir, /retenir-cn9…) ne sont pas sous /recaps
  { to: '/recaps', label: 'Récaps', also: '/retenir' },
  { to: '/a-propos', label: 'À propos' },
]

const FOOTER_COLUMNS = [
  {
    title: 'Les ateliers',
    links: [
      ...ATELIERS.map((a) => ({ to: `/ateliers/${a.slug}`, label: a.nom })),
      { to: '/organiser-un-atelier', label: 'Organiser un atelier' },
    ],
  },
  {
    title: 'Guides',
    links: GUIDES.map((g) => ({ to: `/guides/${g.slug}`, label: g.seoTitre })),
  },
  {
    title: 'Ressources',
    links: [
      { to: '/arnaques', label: "Simulations d'arnaques" },
      { to: '/recaps', label: 'Récaps des séances' },
      { to: '/a-propos', label: 'À propos' },
      { to: '/contact', label: 'Contact' },
    ],
  },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [large, toggleFont] = useLargeFont()
  const { pathname } = useLocation()
  const actif = (isActive, also) => isActive || (also && pathname.startsWith(also))

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
            <Coffee size={22} strokeWidth={2.2} className={styles.logoIcon} />
            <span className={styles.logoText}>Cafés numériques</span>
          </Link>

          <nav className={styles.nav}>
            {NAV_LINKS.map(({ to, label, end, also }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${styles.navLink} ${actif(isActive, also) ? styles.navLinkActive : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
            <button className="font-toggle-btn" style={{ color: 'var(--c-text)' }} onClick={toggleFont} title="Taille du texte">
              {large ? 'A−' : 'A+'}
            </button>
            <Link to="/organiser-un-atelier" className={styles.contactBtn}>
              Organiser un atelier
            </Link>
          </nav>

          <button
            className={styles.burger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map(({ to, label, end, also }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${actif(isActive, also) ? styles.mobileNavLinkActive : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/organiser-un-atelier"
              className={styles.mobileContactBtn}
              onClick={() => setMenuOpen(false)}
            >
              Organiser un atelier
            </Link>
          </nav>
        )}
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div>
            <Link to="/" className={styles.footerBrand}>
              <Coffee size={14} />
              Cafés numériques
            </Link>
            <p className={styles.footerTagline}>
              Ateliers numériques conviviaux pour adultes et seniors, animés par Maxime Bergerard.
            </p>
            <Link to="/contact" className={styles.footerMail}>
              Me contacter
            </Link>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <div className={styles.footerTitle}>{col.title}</div>
              <ul className={styles.footerLinks}>
                {col.links.map((l) => (
                  <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </footer>
    </div>
  )
}
