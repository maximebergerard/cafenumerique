// ─────────────────────────────────────────────────────────────────────────────
// Lancé après `vite build` (voir package.json).
//
// Le site est une SPA : sans ce script, toutes les adresses renvoient le même
// index.html, avec le même titre et la même description. Les robots qui
// n'exécutent pas JavaScript (aperçus WhatsApp/Facebook, Bing…) voient donc
// toutes les pages comme la page d'accueil.
//
// Ce script, à partir de src/seo/routes.js :
//   1. vérifie que chaque <Route> de App.jsx a ses métadonnées (et inversement)
//   2. écrit un fichier HTML par page, avec le bon <head>, et pour les pages
//      indexées le contenu complet pré-rendu (build SSR dans dist-ssr/)
//   3. écrit un 404.html (noindex) et un _redirects qui renvoie un vrai code 404
//   4. écrit le sitemap.xml
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { schemaFor } from './schema.mjs'
import {
  ROUTES,
  NOT_FOUND,
  SITE_URL,
  DEFAULT_IMAGE,
  DEFAULT_DESCRIPTION,
  fullTitle,
  canonicalUrl,
} from '../src/seo/routes.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { render: renderApp } = await import(join(root, 'dist-ssr/entry-server.js'))

// ── 1. App.jsx et routes.js doivent décrire les mêmes pages ──
// App.jsx peut déclarer "/guides/:slug" alors que routes.js liste chaque guide.
const appPaths = [...readFileSync(join(root, 'src/App.jsx'), 'utf8').matchAll(/path="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((p) => p !== '*')
const toRegex = (p) => new RegExp(`^${p.replace(/:[^/]+/g, '[^/]+')}$`)
const seoPaths = ROUTES.map((r) => r.path)
const missingSeo = appPaths.filter((p) => !seoPaths.some((s) => s === p || toRegex(p).test(s)))
const missingApp = seoPaths.filter((s) => !appPaths.some((p) => p === s || toRegex(p).test(s)))
if (missingSeo.length || missingApp.length) {
  if (missingSeo.length) console.error('✗ Routes sans métadonnées dans src/seo/routes.js :', missingSeo)
  if (missingApp.length) console.error('✗ Métadonnées sans <Route> dans App.jsx :', missingApp)
  process.exit(1)
}

// ── 2. Un fichier HTML par page ──
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const escape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function setAttr(html, selector, attr, value) {
  // selector : début de balise, ex. '<meta name="description"'
  const re = new RegExp(`(${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^>]*?\\s${attr}=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`Balise introuvable dans index.html : ${selector}`)
  return html.replace(re, `$1${escape(value)}$2`)
}

function render(route, pathname) {
  const title = fullTitle(route)
  const url = canonicalUrl(pathname)
  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
  html = setAttr(html, '<meta name="robots"', 'content', route.index ? 'index, follow' : 'noindex, nofollow')
  html = setAttr(html, '<link rel="canonical"', 'href', url)
  html = setAttr(html, '<meta property="og:url"', 'content', url)
  html = setAttr(html, '<meta property="og:title"', 'content', title)
  html = setAttr(html, '<meta property="og:image:alt"', 'content', title)
  html = setAttr(html, '<meta property="og:image"', 'content', `${SITE_URL}${route.image ?? DEFAULT_IMAGE}`)
  html = setAttr(html, '<meta name="description"', 'content', route.description ?? DEFAULT_DESCRIPTION)
  html = setAttr(html, '<meta property="og:description"', 'content', route.description ?? DEFAULT_DESCRIPTION)
  const schema = route.index && schemaFor(route)
  if (schema) {
    const jsonLd = JSON.stringify(schema).replace(/</g, '\\u003c')
    html = html.replace('</head>', `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`)
  }
  // Contenu complet pour les pages indexées. Les simulations restent rendues
  // côté navigateur uniquement (elles lisent l'heure, le stockage local…).
  if (route.index) {
    html = html.replace('<div id="root"></div>', `<div id="root">${renderApp(pathname)}</div>`)
  }
  return html
}

function write(file, content) {
  const target = join(dist, file)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, content)
}

// Page dynamique (/atelier-ia/defis/:id) → un fichier générique + une règle de réécriture
const rewrites = []
for (const route of ROUTES) {
  if (route.path === '/') {
    write('index.html', render(route, '/'))
  } else if (route.path.includes('/:')) {
    const base = route.path.slice(0, route.path.indexOf('/:'))
    const file = `${base}/_page.html`
    write(file, render({ ...route, index: false }, base))
    rewrites.push(`${base}/*  ${file}  200`)
  } else {
    // "/recaps" → recaps.html : Netlify le sert à l'adresse /recaps, sans slash final
    write(`${route.path.slice(1)}.html`, render(route, route.path))
  }
}
write('404.html', render(NOT_FOUND, '/404'))

// ── 3. _redirects : les pages existantes sont servies en priorité par Netlify,
// tout le reste reçoit la page 404 avec un vrai code 404 (et plus un 200) ──
// L'ancienne adresse Netlify redirige vers le domaine (une seule adresse pour Google).
// Les aperçus de déploiement (deploy-preview-N--cafenumerique.netlify.app) ne sont pas concernés.
write(
  '_redirects',
  ['https://cafenumerique.netlify.app/*  https://cafenumerique.fr/:splat  301!', ...rewrites, '/*  /404.html  404', ''].join('\n'),
)

// ── 4. sitemap.xml ──
const urls = ROUTES.filter((r) => r.index && !r.path.includes('/:'))
  .map((r) => `  <url><loc>${canonicalUrl(r.path)}</loc></url>`)
  .join('\n')
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)

console.log(`✓ SEO : ${ROUTES.length} pages pré-générées, sitemap (${urls.split('\n').length} URL), 404, _redirects`)
