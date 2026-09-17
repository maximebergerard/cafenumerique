// ─────────────────────────────────────────────────────────────────────────────
// Génère les images de marque dans public/ (à relancer seulement si on change
// le logo ou le slogan) :  node scripts/images.mjs
//
//   favicon.svg, favicon-48.png, apple-touch-icon.png, icon-192.png, icon-512.png
//   og-image.png (1200×630) : aperçu affiché quand on partage un lien du site
//
// Les textes utilisent les polices système du Mac (Avenir Next).
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

// Icône "Coffee" de lucide (celle du logo dans la nav), viewBox 24×24
const COFFEE = `
  <path d="M10 2v2"/><path d="M14 2v2"/><path d="M6 2v2"/>
  <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>`

const icon = (rx) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3d2060"/><stop offset="1" stop-color="#27173A"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="${rx}" fill="url(#bg)"/>
  <g transform="translate(13 13) scale(1.6)" fill="none" stroke="#C4B5FD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${COFFEE}</g>
</svg>`

const OG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2d1a45"/><stop offset="1" stop-color="#1b0f28"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.3" r="0.55">
      <stop offset="0" stop-color="#8B5CF6" stop-opacity="0.45"/><stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.1" cy="1" r="0.5">
      <stop offset="0" stop-color="#DB2777" stop-opacity="0.22"/><stop offset="1" stop-color="#DB2777" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <g transform="translate(88 92)">
    <rect width="88" height="88" rx="22" fill="#8B5CF6" fill-opacity="0.18" stroke="#A78BFA" stroke-opacity="0.35"/>
    <g transform="translate(20 20) scale(2)" fill="none" stroke="#DDD6FE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${COFFEE}</g>
  </g>

  <g font-family="Avenir Next, Helvetica Neue, Arial" fill="#FFFFFF">
    <text x="88" y="318" font-size="92" font-weight="700" letter-spacing="-2">Cafés numériques</text>
    <text x="90" y="384" font-size="36" font-weight="500" fill="#DDD6FE">Des ateliers conviviaux pour apprivoiser le numérique</text>
    <text x="90" y="430" font-size="36" font-weight="500" fill="#DDD6FE">sans jargon, sans jugement, en petit groupe.</text>
  </g>

  <g font-family="Avenir Next, Helvetica Neue, Arial" font-size="26" font-weight="600" fill="#F5F2FF">
    <rect x="88" y="492" width="252" height="54" rx="27" fill="#FFFFFF" fill-opacity="0.1" stroke="#FFFFFF" stroke-opacity="0.18"/>
    <text x="214" y="528" text-anchor="middle">Arnaques en ligne</text>
    <rect x="356" y="492" width="310" height="54" rx="27" fill="#FFFFFF" fill-opacity="0.1" stroke="#FFFFFF" stroke-opacity="0.18"/>
    <text x="511" y="528" text-anchor="middle">Intelligence artificielle</text>
    <rect x="682" y="492" width="232" height="54" rx="27" fill="#FFFFFF" fill-opacity="0.1" stroke="#FFFFFF" stroke-opacity="0.18"/>
    <text x="798" y="528" text-anchor="middle">Réseaux sociaux</text>
  </g>
</svg>`

function png(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true, defaultFontFamily: 'Avenir Next' },
  })
  return resvg.render().asPng()
}

// Favicon arrondi ; icônes d'écran d'accueil carrées (iOS et Android arrondissent eux-mêmes)
writeFileSync(join(pub, 'favicon.svg'), icon(14))
writeFileSync(join(pub, 'favicon-48.png'), png(icon(14), 48))
writeFileSync(join(pub, 'apple-touch-icon.png'), png(icon(0), 180))
writeFileSync(join(pub, 'icon-192.png'), png(icon(0), 192))
writeFileSync(join(pub, 'icon-512.png'), png(icon(0), 512))
writeFileSync(join(pub, 'og-image.png'), png(OG, 1200))
console.log('✓ Images générées dans public/')
