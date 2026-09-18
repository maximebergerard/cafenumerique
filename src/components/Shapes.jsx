import { useId } from 'react'

import styles from './Shapes.module.css'

// Formes décoratives en aplats (pas de dégradés, pas d'ombres).
// Toutes sont purement décoratives : aria-hidden.

const C = {
  ink: 'var(--c-primary)',
  violet: 'var(--c-accent)',
  amber: 'var(--c-amber)',
  pink: 'var(--c-pink)',
  lilac: 'var(--c-lilac)',
}

// Une vague verticale bien plus haute que la zone visible : en la faisant
// défiler vers le haut d'exactement une période, la boucle est invisible.
const PERIODE = 36

function vague(x, basY) {
  let d = `M${x} ${basY} q-14 -18 0 -${PERIODE}`
  for (let i = 0; i < 9; i += 1) d += ` t0 -${PERIODE}`
  return d
}

// Tasse de café construite avec des formes simples (page d'accueil)
export function CupComposition({ className }) {
  const fenetre = useId()
  return (
    <svg className={className} viewBox="0 0 420 380" aria-hidden="true" focusable="false">
      <defs>
        {/* Fenêtre par laquelle on voit la vapeur */}
        <clipPath id={fenetre}>
          <rect x="150" y="46" width="160" height="126" />
        </clipPath>
      </defs>
      {/* Soleil moutarde derrière */}
      <circle cx="238" cy="168" r="128" fill={C.amber} />
      {/* Quart de cercle lilas */}
      <path d="M0 110 A110 110 0 0 1 110 0 L110 110 Z" fill={C.lilac} />
      {/* Petit carré sauge incliné */}
      <rect x="338" y="18" width="48" height="48" rx="6" fill={C.pink} transform="rotate(14 362 42)" />
      {/* Anse */}
      <circle cx="344" cy="226" r="36" fill="none" stroke={C.ink} strokeWidth="20" />
      {/* Tasse : demi-disque */}
      <path d="M104 190 H344 A120 120 0 0 1 104 190 Z" fill={C.violet} />
      <rect x="96" y="178" width="256" height="18" rx="9" fill={C.ink} />
      {/* Soucoupe */}
      <rect x="62" y="324" width="330" height="20" rx="10" fill={C.ink} />
      {/* Vapeur : de longues vagues défilent derrière une fenêtre invisible,
          ce qui donne l'ondulation. Animation dans Shapes.module.css. */}
      <g clipPath={`url(#${fenetre})`} fill="none" stroke={C.ink} strokeWidth="9" strokeLinecap="round">
        <path className={styles.steam} d={vague(178, 168)} />
        <path className={styles.steam} d={vague(228, 164)} />
        <path className={styles.steam} d={vague(278, 168)} />
      </g>
      {/* Pointillés */}
      <g fill={C.ink}>
        <circle cx="36" cy="268" r="5" /><circle cx="58" cy="268" r="5" /><circle cx="80" cy="268" r="5" />
        <circle cx="36" cy="290" r="5" /><circle cx="58" cy="290" r="5" /><circle cx="80" cy="290" r="5" />
      </g>
    </svg>
  )
}

// Compositions plus sobres pour les en-têtes de pages (variant 0 à 3)
const HERO_VARIANTS = [
  // Arche + cercle
  <>
    <path d="M40 220 V120 A80 80 0 0 1 200 120 V220 Z" fill={C.violet} />
    <circle cx="200" cy="70" r="46" fill={C.amber} />
    <rect x="150" y="170" width="90" height="50" rx="25" fill={C.ink} />
  </>,
  // Demi-cercles empilés
  <>
    <path d="M30 140 A90 90 0 0 1 210 140 Z" fill={C.pink} />
    <path d="M60 220 A90 90 0 0 1 240 220 Z" fill={C.lilac} />
    <circle cx="66" cy="54" r="30" fill={C.violet} />
  </>,
  // Cercle + quart + trait ondulé
  <>
    <circle cx="140" cy="120" r="84" fill={C.amber} />
    <path d="M150 220 A100 100 0 0 1 250 120 L250 220 Z" fill={C.violet} />
    <path d="M20 40 q20 -24 40 0 t40 0 t40 0" fill="none" stroke={C.ink} strokeWidth="9" strokeLinecap="round" />
  </>,
  // Grille de pastilles + losange
  <>
    <rect x="120" y="60" width="110" height="110" rx="10" fill={C.lilac} transform="rotate(45 175 115)" />
    <g fill={C.ink}>
      {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => (
        <circle key={`${r}-${c}`} cx={40 + c * 26} cy={150 + r * 26} r="7" />
      )))}
    </g>
    <circle cx="70" cy="60" r="36" fill={C.pink} />
  </>,
]

export function HeroShapes({ variant = 0, className }) {
  return (
    <svg className={className} viewBox="0 0 260 240" aria-hidden="true" focusable="false">
      {HERO_VARIANTS[variant % HERO_VARIANTS.length]}
    </svg>
  )
}

// Trait ondulé, sous un mot mis en valeur
export function Squiggle({ className, color = C.amber }) {
  return (
    <svg className={className} viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M3 10 q12 -9 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

// Petit astérisque / fleur, pour les encadrés "à retenir"
export function Asterisk({ size = 22, color = C.violet }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ flexShrink: 0 }}>
      <g stroke={color} strokeWidth="3.2" strokeLinecap="round">
        <path d="M12 2.5v19" /><path d="M3.8 7.25l16.4 9.5" /><path d="M3.8 16.75l16.4-9.5" />
      </g>
    </svg>
  )
}

// Formes dispersées pour les bandeaux sombres
export function BandShapes({ className }) {
  return (
    <svg className={className} viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <circle cx="80" cy="260" r="110" fill={C.violet} />
      <path d="M1040 0 A120 120 0 0 0 1160 120 L1160 0 Z" fill={C.amber} />
      <rect x="1080" y="200" width="56" height="56" rx="8" fill={C.lilac} transform="rotate(18 1108 228)" />
      <path d="M180 50 q18 -20 36 0 t36 0 t36 0" fill="none" stroke={C.pink} strokeWidth="8" strokeLinecap="round" />
    </svg>
  )
}
