// ─────────────────────────────────────────────────────────────────────────────
// Génère les images de marque dans public/ (à relancer seulement si on change
// le logo ou le slogan) :  node scripts/images.mjs
//
//   favicon.svg, favicon.ico, favicon-48.png, apple-touch-icon.png, icon-192.png, icon-512.png
//   og-image.png (1200×630) : aperçu affiché quand on partage un lien du site
//
// Les textes utilisent les polices système du Mac (Avenir Next).
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync } from 'node:fs'
import { Buffer } from 'node:buffer'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

// Icône "Coffee" de lucide (celle du logo dans la nav), viewBox 24×24
const COFFEE = `
  <path d="M10 2v2"/><path d="M14 2v2"/><path d="M6 2v2"/>
  <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>`

// Mêmes couleurs que src/index.css
const INK = '#27173A'
const PAPER = '#F8F7FC'
const VIOLET = '#8B5CF6'
const AMBER = '#F59E0B'
const PINK = '#DB2777'
const LILAC = '#C4B5FD'

// Pastille violette + tasse, comme le logo de la nav.
// round : favicon (disque) ; sinon carré papier (iOS/Android arrondissent eux-mêmes)
const icon = (round) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  ${round ? '' : `<rect width="64" height="64" fill="${PAPER}"/>`}
  <circle cx="32" cy="32" r="${round ? 32 : 26}" fill="${VIOLET}"/>
  <g transform="translate(${round ? 14 : 17.5} ${round ? 14 : 17.5}) scale(${round ? 1.5 : 1.21})" fill="none" stroke="${PAPER}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${COFFEE}</g>
</svg>`

// Aperçu de partage : papier, titre serif, tasse en formes (même dessin que CupComposition)
const OG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="0" y="600" width="1200" height="30" fill="${INK}"/>

  <g transform="translate(700 120) scale(1.18)">
    <circle cx="238" cy="168" r="128" fill="${AMBER}"/>
    <path d="M0 110 A110 110 0 0 1 110 0 L110 110 Z" fill="${LILAC}"/>
    <rect x="338" y="18" width="48" height="48" rx="6" fill="${PINK}" transform="rotate(14 362 42)"/>
    <circle cx="344" cy="226" r="36" fill="none" stroke="${INK}" stroke-width="20"/>
    <path d="M104 190 H344 A120 120 0 0 1 104 190 Z" fill="${VIOLET}"/>
    <rect x="96" y="178" width="256" height="18" rx="9" fill="${INK}"/>
    <rect x="62" y="324" width="330" height="20" rx="10" fill="${INK}"/>
    <g fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round">
      <path d="M178 150 q-18 -22 0 -44 t0 -44"/><path d="M228 146 q-18 -22 0 -44 t0 -44"/><path d="M278 150 q-18 -22 0 -44 t0 -44"/>
    </g>
  </g>

  <text x="80" y="118" font-family="Avenir Next" font-size="30" font-weight="600" fill="${VIOLET}">Cafés numériques · Maxime Bergerard</text>
  <g font-family="Avenir Next" font-weight="700" font-size="84" letter-spacing="-2" fill="${INK}">
    <text x="76" y="250">Des ateliers</text>
    <text x="76" y="350">numériques</text>
    <text x="76" y="450">conviviaux</text>
  </g>
  <path d="M80 476 q20 -15 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0" fill="none" stroke="${AMBER}" stroke-width="9" stroke-linecap="round"/>
  <text x="80" y="548" font-family="Avenir Next" font-size="32" font-weight="500" fill="#564F62">pour adultes et seniors · cafenumerique.fr</text>
</svg>`

function png(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: {
      loadSystemFonts: true,
      defaultFontFamily: 'Avenir Next',
    },
  })
  return resvg.render().asPng()
}

// favicon.ico : c'est le fichier que Google va chercher en priorité pour
// l'icône affichée dans ses résultats, et que réclament les vieux navigateurs.
function ico(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2) // type : icône
  header.writeUInt16LE(pngs.length, 4)
  let offset = 6 + pngs.length * 16
  const entries = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16)
    e[0] = size >= 256 ? 0 : size // largeur
    e[1] = size >= 256 ? 0 : size // hauteur
    e.writeUInt16LE(1, 4) // plans
    e.writeUInt16LE(32, 6) // bits par pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    return e
  })
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

writeFileSync(join(pub, 'favicon.svg'), icon(true))
writeFileSync(
  join(pub, 'favicon.ico'),
  ico([16, 32, 48].map((size) => ({ size, data: png(icon(true), size) }))),
)
writeFileSync(join(pub, 'favicon-48.png'), png(icon(true), 48))
writeFileSync(join(pub, 'apple-touch-icon.png'), png(icon(false), 180))
writeFileSync(join(pub, 'icon-192.png'), png(icon(false), 192))
writeFileSync(join(pub, 'icon-512.png'), png(icon(false), 512))
writeFileSync(join(pub, 'og-image.png'), png(OG, 1200))
console.log('✓ Images générées dans public/')
