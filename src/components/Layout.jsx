import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Layout.module.css'

const NAV_LINKS = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/ateliers', label: 'Les ateliers' },
  { to: '/arnaques', label: 'Simulations' },
  { to: '/recaps', label: 'Récaps' },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
            <span className={styles.logoIcon}>☕</span>
            <span className={styles.logoText}>Cafés numériques</span>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav}>
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
            <a href="mailto:maxime.bergerard@gmail.com" className={styles.contactBtn}>
              Me contacter
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            className={styles.burger}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <a
              href="mailto:maxime.bergerard@gmail.com"
              className={styles.mobileContactBtn}
              onClick={() => setMenuOpen(false)}
            >
              Me contacter
            </a>
          </nav>
        )}
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>☕ Cafés numériques</span>
          <a href="mailto:maxime.bergerard@gmail.com" className={styles.footerMail}>
            maxime.bergerard@gmail.com
          </a>
        </div>
      </footer>
    </div>
  )
}
