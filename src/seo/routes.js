// ─────────────────────────────────────────────────────────────────────────────
// SEO : source unique des métadonnées de chaque page
//
// Utilisé à deux endroits :
//   - dans le navigateur par <Seo /> (titre de l'onglet, balises à jour quand on navigue)
//   - au build par scripts/prerender.mjs, qui génère un fichier HTML par page
//     (lisible par les robots sans JavaScript), le sitemap.xml et les _redirects.
//
// Pour ajouter une page : ajouter la <Route> dans App.jsx ET une entrée ici.
// Le build échoue si les deux listes ne correspondent pas.
// Ateliers et guides sont générés depuis src/content/ : rien à ajouter ici pour eux.
//
// schema : données structurées ajoutées au build (voir scripts/schema.mjs)
//
// index: false → la page n'apparaît pas dans Google (noindex) ni dans le sitemap.
// lastmod : date ISO (AAAA-MM-JJ) de la dernière vraie modification du CONTENU de la page,
//           écrite dans le sitemap. À mettre à jour à la main quand le contenu change (pas pour
//           une retouche de balise) : Google ignore les lastmod qui bougent sans raison.
//           Obligatoire sur chaque page indexée, le build échoue sinon.
// bare: true → pas de suffixe « | Café Numérique » (titre qui contient déjà la marque).
// Limites vérifiées au build : titre complet 60 caractères, description 155.
// ─────────────────────────────────────────────────────────────────────────────

import { ATELIERS } from '../content/ateliers.js'
import { GUIDES } from '../content/guides.js'

export const SITE_URL = 'https://cafenumerique.fr'
export const SITE_NAME = 'Café Numérique'
export const DEFAULT_IMAGE = '/og-image.png'
// Pour les pages sans description (simulations, supports d'animation)
export const DEFAULT_DESCRIPTION = "Support pédagogique du Café Numérique, ateliers conviviaux pour apprivoiser le numérique."

// Dernière modification des pages ateliers (src/content/ateliers.js). Les guides ont leur propre `misAJour`.
const ATELIERS_LASTMOD = '2026-09-18'

export const ROUTES = [
  // ── Pages publiques ──
  {
    path: '/',
    // Seul titre sans suffixe : il porte déjà la marque et le nom (voir fullTitle)
    title: 'Café Numérique de Maxime Bergerard : ateliers pour seniors',
    description:
      'Ateliers numériques conviviaux en petit groupe, sans jargon : arnaques, IA, WhatsApp. Organisez un Café Numérique avec Maxime Bergerard.',
    index: true,
    lastmod: '2026-10-09',
  },
  {
    path: '/ateliers',
    title: 'Ateliers numériques pour adultes et seniors',
    description:
      "Ateliers de 2h en petit groupe sur l'intelligence artificielle, les arnaques en ligne et WhatsApp. Théâtre-forum et pratique guidée, pour grands débutants.",
    index: true,
    lastmod: ATELIERS_LASTMOD,
    schema: 'ateliers',
  },
  ...ATELIERS.map((a) => ({
    path: `/ateliers/${a.slug}`,
    title: a.seoTitre,
    description: a.seoDescription,
    index: true,
    lastmod: ATELIERS_LASTMOD,
    schema: 'atelier',
    slug: a.slug,
  })),
  {
    path: '/organiser-un-atelier',
    title: 'Organiser un atelier numérique',
    description:
      'Organiser un atelier numérique en médiathèque, mairie, CCAS, résidence seniors ou association : déroulé, matériel à prévoir, questions fréquentes.',
    index: true,
    lastmod: '2026-09-18',
    schema: 'faq',
  },
  {
    path: '/guides',
    title: 'Guides pratiques : arnaques, IA, WhatsApp',
    description:
      'Des guides clairs et sans jargon pour reconnaître les arnaques en ligne, repérer les images créées par IA et utiliser WhatsApp en sécurité.',
    index: true,
    lastmod: '2026-09-18',
  },
  ...GUIDES.map((g) => ({
    path: `/guides/${g.slug}`,
    title: g.seoTitre,
    description: g.seoDescription,
    index: true,
    lastmod: g.misAJour,
    schema: 'guide',
    slug: g.slug,
  })),
  {
    path: '/a-propos',
    title: 'Maxime Bergerard, animateur d’ateliers',
    description:
      "Maxime Bergerard, diplômé d'HETIC, anime les Cafés numériques : des ateliers conviviaux et sans jargon pour que personne ne rate le train du numérique.",
    index: true,
    lastmod: '2026-10-09',
  },
  {
    path: '/arnaques',
    title: "Simulations d'arnaques en ligne",
    description:
      "Faux SMS La Poste, pop-up Microsoft, arnaque WhatsApp au faux petit-fils : des mises en situation interactives pour apprendre à reconnaître les arnaques.",
    index: true,
    lastmod: '2026-05-29',
  },
  {
    path: '/videos',
    title: 'Vidéos',
    description: 'Tutoriels vidéo pour les gestes numériques du quotidien.',
    // Page encore en construction
    index: false,
  },
  {
    path: '/recaps',
    title: 'Récaps des ateliers numériques',
    description:
      "Les fiches mémo de chaque Café numérique : arnaques, intelligence artificielle, WhatsApp, deepfakes. À relire tranquillement après l'atelier.",
    index: true,
    lastmod: '2026-10-09',
  },
  // Fiches récap : le titre contient déjà « Café numérique », donc pas de suffixe (bare)
  {
    path: '/retenir-ceb2',
    title: 'Café numérique Châtelet-en-Brie #2 : IA et images truquées',
    description:
      "Mémo du Café numérique de Châtelet-en-Brie #2 : la formule pour bien demander à une IA, les images truquées à repérer et les réflexes face aux deepfakes.",
    index: true,
    bare: true,
    lastmod: '2026-10-09',
  },
  {
    path: '/retenir-ceb1',
    title: 'Café numérique Châtelet-en-Brie #1 : IA et images truquées',
    description:
      "Mémo du Café numérique de Châtelet-en-Brie #1 : bien écrire à une IA, ce qu'il ne faut jamais lui confier, repérer les images truquées et les deepfakes.",
    index: true,
    bare: true,
    lastmod: '2026-10-09',
  },
  {
    path: '/retenir-cn9',
    title: "Café numérique de Nandy #9 : l'IA et les images truquées",
    description:
      "Mémo du Café numérique de Nandy #9 : la formule pour bien écrire à ChatGPT, les indices d'une image créée par IA et les réflexes face aux deepfakes.",
    index: true,
    bare: true,
    lastmod: '2026-10-09',
  },
  {
    path: '/retenir-cn8',
    title: 'Café numérique de Nandy #8 : WhatsApp, IA et deepfakes',
    description:
      'Mémo de la séance #8 : reconnaître les arnaques WhatsApp, protéger son compte, la formule du prompt IA et les deepfakes vocaux.',
    index: true,
    bare: true,
    lastmod: '2026-10-08',
  },
  {
    path: '/retenir',
    title: 'Café numérique de Nandy #7 : arnaques, IA et réseaux sociaux',
    description:
      "Mémo de la séance #7 : les signaux d'alarme des arnaques en ligne, les outils IA gratuits et le lexique des réseaux sociaux.",
    index: true,
    bare: true,
    lastmod: '2026-10-08',
  },
  {
    path: '/contact',
    title: 'Contacter Maxime Bergerard',
    description:
      'Association, mairie, médiathèque, résidence seniors : contactez Maxime Bergerard pour organiser un Café numérique.',
    index: true,
    lastmod: '2026-09-01',
  },

  // ── Simulations plein écran : jamais indexées ──
  // Ce sont de fausses pages La Poste / Microsoft / paiement : les indexer
  // prêterait à confusion et pourrait faire signaler le site comme frauduleux.
  { path: '/laposte', title: 'Simulation : faux mail La Poste', index: false },
  { path: '/laposte/paiement', title: 'Simulation : fausse page de paiement', index: false },
  { path: '/sms-laposte', title: 'Simulation : faux SMS La Poste', index: false },
  { path: '/popup-microsoft', title: 'Simulation : fausse alerte Microsoft', index: false },
  { path: '/facebook-arnaque', title: 'Simulation : fausse publicité Facebook', index: false },
  { path: '/whatsapp-lucas', title: 'Simulation : arnaque WhatsApp', index: false },
  { path: '/sms-banque-postale', title: 'Simulation : SMS de banque', index: false },
  { path: '/whatsapp-famille', title: 'Simulation : message WhatsApp de la famille', index: false },
  { path: '/whatsapp-groupe', title: 'Simulation : groupe WhatsApp', index: false },
  { path: '/chiffrement', title: 'Le chiffrement expliqué', index: false },
  { path: '/scores-cn8', title: 'Scores', index: false },
  // Page privée d'animation : plan des tables (un plan par lieu)
  { path: '/plan-salle', title: 'Plan de salle', index: false },

  // ── Atelier IA : supports d'animation, non indexés ──
  { path: '/atelier-ia/defis', title: 'Atelier IA : les défis', index: false },
  { path: '/atelier-ia/defis/:id', title: 'Atelier IA : défi', index: false },
  { path: '/atelier-ia/ia-ou-pas', title: 'Atelier IA : IA ou pas ?', index: false },
  { path: '/atelier-ia/scores', title: 'Scores Atelier IA', index: false },
  { path: '/atelier-ia/apres', title: "Après l'atelier IA", index: false },
  { path: '/atelier-ia/animateur', title: 'Atelier IA : animateur', index: false },
]

export const NOT_FOUND = {
  title: 'Page introuvable',
  description: "Cette adresse n'existe pas (ou plus).",
  index: false,
}

// "/atelier-ia/defis/:id" → /^\/atelier-ia\/defis\/[^/]+$/
function toRegex(path) {
  const pattern = path
    .split('/')
    .map((part) => (part.startsWith(':') ? '[^/]+' : part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    .join('/')
  return new RegExp(`^${pattern}/?$`)
}

export function findRoute(pathname) {
  return ROUTES.find((r) => toRegex(r.path).test(pathname)) ?? NOT_FOUND
}

export function fullTitle(route) {
  return route.path === '/' || route.bare ? route.title : `${route.title} | ${SITE_NAME}`
}

export function canonicalUrl(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}
