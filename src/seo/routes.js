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
//
// index: false → la page n'apparaît pas dans Google (noindex) ni dans le sitemap.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = 'https://cafenumerique.fr'
export const SITE_NAME = 'Cafés numériques'
export const DEFAULT_IMAGE = '/og-image.png'
// Pour les pages sans description (simulations, supports d'animation)
export const DEFAULT_DESCRIPTION = "Support pédagogique des Cafés numériques, ateliers conviviaux pour apprivoiser le numérique."

export const ROUTES = [
  // ── Pages publiques ──
  {
    path: '/',
    title: 'Cafés numériques : ateliers pour apprivoiser le numérique',
    description:
      "Ateliers numériques conviviaux en petit groupe, sans jargon : arnaques en ligne, intelligence artificielle, réseaux sociaux, WhatsApp. Organisez un atelier avec Maxime Bergerard.",
    index: true,
  },
  {
    path: '/ateliers',
    title: 'Les ateliers',
    description: "Le format des Cafés numériques : 2h, 10 personnes maximum, on apprend en faisant grâce au théâtre-forum.",
    // Page encore en construction : à passer à true quand le contenu sera en ligne
    index: false,
  },
  {
    path: '/arnaques',
    title: "Simulations d'arnaques en ligne",
    description:
      "Faux SMS La Poste, pop-up Microsoft, arnaque WhatsApp au faux petit-fils : des mises en situation interactives pour apprendre à reconnaître les arnaques.",
    index: true,
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
  },
  {
    path: '/retenir-cn9',
    title: "Café numérique #9 : l'IA et les images truquées",
    description:
      "Mémo de l'atelier IA : la formule pour bien écrire à ChatGPT, ce qu'il ne faut jamais lui confier, les indices d'une image ou vidéo créée par IA et les réflexes face aux deepfakes.",
    index: true,
  },
  {
    path: '/retenir-cn8',
    title: 'Café numérique #8 : WhatsApp, IA et deepfakes',
    description:
      'Mémo de la séance #8 : reconnaître les arnaques WhatsApp, protéger son compte, la formule du prompt IA et les deepfakes vocaux.',
    index: true,
  },
  {
    path: '/retenir',
    title: 'Café numérique #7 : arnaques, IA et réseaux sociaux',
    description:
      "Mémo de la séance #7 : les signaux d'alarme des arnaques en ligne, les outils IA gratuits et le lexique des réseaux sociaux.",
    index: true,
  },
  {
    path: '/contact',
    title: 'Organiser un atelier numérique',
    description:
      'Association, mairie, médiathèque, résidence seniors : contactez Maxime Bergerard pour organiser un Café numérique.',
    index: true,
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
  return route.path === '/' ? route.title : `${route.title} | ${SITE_NAME}`
}

export function canonicalUrl(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}
