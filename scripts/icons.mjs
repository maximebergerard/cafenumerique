// ─────────────────────────────────────────────────────────────────────────────
// Génère src/icons/icons.generated.js : les icônes Phosphor utilisées par le site.
//
// Le catalogue de shadcn.io (https://www.shadcn.io/icons/libraries) s'appuie sur
// les bibliothèques open source d'Iconify. Comme avec la CLI de shadcn, on copie
// les icônes dans le projet au lieu d'ajouter un paquet npm : seules les icônes
// listées ci-dessous partent dans le site.
//
// Ajouter une icône : l'ajouter à ICONS (NomDuComposant: 'nom-phosphor'), puis
//   node scripts/icons.mjs
// Noms disponibles : https://www.shadcn.io/icons/libraries (Phosphor) ou https://phosphoricons.com
// Changer de graisse : WEIGHT ci-dessous ('' = regular, 'bold', 'light', 'fill', 'duotone').
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const WEIGHT = 'bold'

const ICONS = {
  Archive: 'archive',
  ArrowDown: 'arrow-down',
  ArrowBendUpLeft: 'arrow-bend-up-left',
  ArrowCounterClockwise: 'arrow-counter-clockwise',
  ArrowLeft: 'arrow-left',
  ArrowRight: 'arrow-right',
  ArrowSquareOut: 'arrow-square-out',
  ArrowsOutSimple: 'arrows-out-simple',
  Bank: 'bank',
  Bell: 'bell',
  BookOpen: 'book-open',
  Books: 'books',
  Buildings: 'buildings',
  CaretDown: 'caret-down',
  CaretLeft: 'caret-left',
  CaretRight: 'caret-right',
  ChatCircle: 'chat-circle',
  ChatText: 'chat-text',
  Check: 'check',
  CheckCircle: 'check-circle',
  Clock: 'clock',
  Coffee: 'coffee',
  Compass: 'compass',
  CornersOut: 'corners-out',
  CreditCard: 'credit-card',
  DeviceMobile: 'device-mobile',
  Envelope: 'envelope',
  FileText: 'file-text',
  Globe: 'globe',
  Hand: 'hand',
  Heart: 'heart',
  House: 'house',
  Lifebuoy: 'lifebuoy',
  Lightbulb: 'lightbulb',
  List: 'list',
  Lock: 'lock',
  LockOpen: 'lock-open',
  MagnifyingGlass: 'magnifying-glass',
  MapPin: 'map-pin',
  MaskHappy: 'mask-happy',
  Money: 'money',
  Monitor: 'monitor',
  Package: 'package',
  PaperPlaneTilt: 'paper-plane-tilt',
  Pause: 'pause',
  PencilSimple: 'pencil-simple',
  Phone: 'phone',
  Play: 'play',
  PuzzlePiece: 'puzzle-piece',
  QrCode: 'qr-code',
  Repeat: 'repeat',
  Robot: 'robot',
  ShareFat: 'share-fat',
  ShieldWarning: 'shield-warning',
  ShoppingBag: 'shopping-bag',
  SquaresFour: 'squares-four',
  Star: 'star',
  Target: 'target',
  ThumbsUp: 'thumbs-up',
  Trash: 'trash',
  Tray: 'tray',
  Trophy: 'trophy',
  User: 'user',
  Users: 'users',
  VideoCamera: 'video-camera',
  WarningCircle: 'warning-circle',
  X: 'x',
}

const suffix = WEIGHT ? `-${WEIGHT}` : ''
const names = Object.values(ICONS).map((n) => `${n}${suffix}`)

const res = await fetch(`https://api.iconify.design/ph.json?icons=${names.join(',')}`)
if (!res.ok) throw new Error(`Iconify : HTTP ${res.status}`)
const data = await res.json()
if (data.not_found?.length) throw new Error(`Icônes introuvables : ${data.not_found.join(', ')}`)

const lignes = Object.entries(ICONS).map(([composant, nom]) => {
  const { body } = data.icons[`${nom}${suffix}`]
  return `  ${composant}: ${JSON.stringify(body)},`
})

const sortie = `// Fichier généré par scripts/icons.mjs : ne pas modifier à la main.
// Phosphor Icons (MIT), graisse « ${WEIGHT || 'regular'} », viewBox 256×256.
export const ICON_BODIES = {
${lignes.join('\n')}
}
`

const dossier = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'icons')
mkdirSync(dossier, { recursive: true })
writeFileSync(join(dossier, 'icons.generated.js'), sortie)
console.log(`${lignes.length} icônes écrites dans src/icons/icons.generated.js`)
