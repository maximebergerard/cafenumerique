// ─────────────────────────────────────────────────────────────────────────────
// Génère src/icons/icons.generated.js : les icônes utilisées par le site.
//
// Les icônes viennent des paquets open source d'Iconify (@iconify-json/...),
// téléchargés avec `npm pack` dans un dossier temporaire, puis COPIÉES dans le
// projet : aucun paquet d'icônes ne part dans le site, seules les icônes listées
// ci-dessous sont écrites dans src/icons/icons.generated.js.
//
// Trois bibliothèques, volontairement peu courantes sur les sites générés :
//   p = Pepicons Pop (CC BY 4.0, Cyril Boulay et al.) : tracé arrondi, un peu « dessiné », la base
//   m = Majesticons (MIT) : contours simples, pour les quelques icônes absentes de Pepicons
//   f = Streamline Freehand (CC BY 4.0) : tracé à la main, pour le masque de théâtre
// Les deux premières licences CC BY exigent un crédit : section « Crédits » des mentions légales.
//
// Ajouter une icône : l'ajouter à ICONS (NomDuComposant: 'p:nom-de-l-icone'), puis
//   node scripts/icons.mjs
// Un suffixe ':flip' retourne l'icône horizontalement (ex. 'p:arrow-spin:flip').
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync, mkdirSync, mkdtempSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { tmpdir } from 'node:os'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const SOURCES = {
  p: 'pepicons-pop',
  m: 'majesticons',
  f: 'streamline-freehand',
}

const ICONS = {
  Archive: 'm:archive-line',
  ArrowBendUpLeft: 'p:arrow-left',
  ArrowCounterClockwise: 'p:arrow-spin:flip',
  ArrowDown: 'p:arrow-down',
  ArrowLeft: 'p:arrow-left',
  ArrowRight: 'p:arrow-right',
  ArrowSquareOut: 'p:arrow-up-right',
  ArrowsOutSimple: 'p:expand',
  Bank: 'p:bank',
  Bell: 'p:bell',
  BookOpen: 'p:book',
  Books: 'p:book',
  Buildings: 'p:building',
  CaretDown: 'p:angle-down',
  CaretLeft: 'p:angle-left',
  CaretRight: 'p:angle-right',
  ChatCircle: 'p:text-bubble',
  ChatText: 'p:text-bubbles',
  Check: 'p:checkmark',
  CheckCircle: 'p:checkmark-circle',
  Clock: 'p:clock',
  Coffee: 'p:cup',
  Compass: 'm:compass-line',
  CornersOut: 'p:expand',
  CreditCard: 'p:credit-card',
  DeviceMobile: 'p:smartphone',
  Envelope: 'p:letter',
  FileText: 'p:file',
  Globe: 'p:earth-europe',
  Hand: 'p:hand-open',
  Heart: 'p:heart',
  House: 'p:house',
  Lifebuoy: 'm:lifebuoy-line',
  Lightbulb: 'm:light-bulb-line',
  List: 'p:menu',
  Lock: 'p:lock-closed',
  LockOpen: 'p:lock-open',
  MagnifyingGlass: 'p:loop',
  MapPin: 'p:pin',
  MaskHappy: 'f:show-theater-drama',
  Money: 'p:money-note',
  Monitor: 'p:monitor',
  Package: 'm:box-line',
  PaperPlaneTilt: 'p:paper-plane',
  Pause: 'p:pause',
  PencilSimple: 'p:pen',
  Phone: 'p:phone',
  Play: 'p:play',
  PuzzlePiece: 'm:puzzle-line',
  QrCode: 'p:qr-code',
  Repeat: 'p:repeat',
  Robot: 'm:robot-line',
  ShareFat: 'p:share-ios',
  ShieldWarning: 'p:shield',
  ShoppingBag: 'p:cart',
  SquaresFour: 'p:grid',
  Star: 'p:star',
  Target: 'p:flag',
  ThumbsUp: 'p:thumbs-up',
  Trash: 'p:trash',
  Tray: 'm:inbox-line',
  Trophy: 'p:trophy',
  User: 'p:person',
  Users: 'p:people',
  VideoCamera: 'p:camera',
  WarningCircle: 'p:exclamation-circle',
  X: 'p:times',
}

const racine = join(dirname(fileURLToPath(import.meta.url)), '..')
const tmp = mkdtempSync(join(tmpdir(), 'icones-'))

const jeux = {}
for (const [cle, paquet] of Object.entries(SOURCES)) {
  const dossier = join(tmp, cle)
  mkdirSync(dossier)
  execFileSync('npm', ['pack', `@iconify-json/${paquet}`, '--silent'], { cwd: dossier, stdio: 'ignore' })
  execFileSync('sh', ['-c', 'tar xzf *.tgz'], { cwd: dossier })
  jeux[cle] = JSON.parse(readFileSync(join(dossier, 'package', 'icons.json'), 'utf8'))
}

const sortie = {}
for (const [composant, ref] of Object.entries(ICONS)) {
  const [cle, nom, option] = ref.split(':')
  const jeu = jeux[cle]
  const icone = jeu.icons[nom]
  if (!icone) throw new Error(`Icône introuvable : ${ref} (${composant})`)
  sortie[composant] = {
    body: icone.body,
    w: icone.width ?? jeu.width ?? 24,
    h: icone.height ?? jeu.height ?? 24,
    ...(option === 'flip' ? { flip: true } : {}),
  }
}

const lignes = Object.entries(sortie).map(([c, v]) => `  ${c}: ${JSON.stringify(v)},`)
const fichier = `// Fichier généré par scripts/icons.mjs : ne pas modifier à la main.
// Pepicons Pop (CC BY 4.0), Majesticons (MIT), Streamline Freehand (CC BY 4.0) : voir les mentions légales.
export const ICON_BODIES = {
${lignes.join('\n')}
}
`
mkdirSync(join(racine, 'src', 'icons'), { recursive: true })
writeFileSync(join(racine, 'src', 'icons', 'icons.generated.js'), fichier)
console.log(`${lignes.length} icônes écrites dans src/icons/icons.generated.js`)
