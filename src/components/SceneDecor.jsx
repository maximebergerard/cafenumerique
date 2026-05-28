import { useId } from 'react'
import styles from './SceneDecor.module.css'

export default function SceneDecor({ className = '' }) {
  const uid = useId()
  const r1 = `${uid}-r1`
  const r2 = `${uid}-r2`
  const r3 = `${uid}-r3`

  return (
    <div className={`${styles.wrap} ${className}`} aria-hidden="true">
      {/* Dot grid */}
      <div className={styles.dotGrid} />

      {/* Sphere orbs - simulated 3D highlight */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      {/* SVG: anneaux perspectifs + nuage de points */}
      <svg
        className={styles.svg}
        viewBox="0 0 900 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Dégradés pour les anneaux */}
          <linearGradient id={r1} x1="0%" y1="0%" x2="100%" y2="60%">
            <stop offset="0%"   stopColor="#A78BFA" stopOpacity="0.8" />
            <stop offset="55%"  stopColor="#60A5FA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={r2} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#93C5FD" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={r3} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#C4B5FD" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Anneau principal - ellipse perspective ── */}
        <ellipse
          cx="730" cy="185"
          rx="228" ry="80"
          stroke={`url(#${r1})`} strokeWidth="1.5"
          transform="rotate(-18 730 185)"
        />

        {/* ── Anneau intérieur pointillé ── */}
        <ellipse
          cx="730" cy="185"
          rx="140" ry="49"
          stroke={`url(#${r2})`} strokeWidth="1"
          strokeDasharray="6 14"
          transform="rotate(-18 730 185)"
        />

        {/* ── Second anneau, bas-gauche ── */}
        <ellipse
          cx="90" cy="370"
          rx="100" ry="36"
          stroke={`url(#${r3})`} strokeWidth="1"
          strokeDasharray="4 9"
          transform="rotate(12 90 370)"
        />

        {/* ── Nuage de points ── */}
        {/* Cluster haut-droite */}
        <circle cx="630" cy="68"  r="3.5" fill="#A78BFA" fillOpacity="0.72" />
        <circle cx="820" cy="95"  r="6"   fill="#7C3AED" fillOpacity="0.28" />
        <circle cx="770" cy="295" r="3"   fill="#C4B5FD" fillOpacity="0.6" />
        <circle cx="655" cy="350" r="4.5" fill="#93C5FD" fillOpacity="0.42" />

        {/* Cluster milieu */}
        <circle cx="510" cy="235" r="5.5" fill="#818CF8" fillOpacity="0.45" />
        <circle cx="430" cy="52"  r="2.5" fill="#C4B5FD" fillOpacity="0.5" />
        <circle cx="860" cy="355" r="2.5" fill="#93C5FD" fillOpacity="0.38" />

        {/* Cluster bas-gauche */}
        <circle cx="135" cy="78"  r="4"   fill="#A78BFA" fillOpacity="0.32" />
        <circle cx="195" cy="365" r="3.5" fill="#818CF8" fillOpacity="0.35" />
        <circle cx="320" cy="105" r="2"   fill="#C4B5FD" fillOpacity="0.5" />
        <circle cx="65"  cy="255" r="4"   fill="#7C3AED" fillOpacity="0.24" />
        <circle cx="52"  cy="148" r="2.5" fill="#A78BFA" fillOpacity="0.33" />

        {/* ── Lignes de connexion (très subtiles) ── */}
        <line x1="630" y1="68"  x2="510" y2="235" stroke="#7C3AED" strokeOpacity="0.11" strokeWidth="0.8" />
        <line x1="510" y1="235" x2="320" y2="105" stroke="#818CF8" strokeOpacity="0.09" strokeWidth="0.8" />
        <line x1="320" y1="105" x2="135" y2="78"  stroke="#818CF8" strokeOpacity="0.09" strokeWidth="0.8" />
        <line x1="430" y1="52"  x2="630" y2="68"  stroke="#A78BFA" strokeOpacity="0.1"  strokeWidth="0.8" />
        <line x1="655" y1="350" x2="770" y2="295" stroke="#93C5FD" strokeOpacity="0.12" strokeWidth="0.8" />
        <line x1="135" y1="78"  x2="65"  y2="255" stroke="#7C3AED" strokeOpacity="0.08" strokeWidth="0.8" />
      </svg>
    </div>
  )
}
