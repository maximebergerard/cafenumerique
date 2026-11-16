import { ICON_BODIES } from './icons.generated.js'

// Icônes Pepicons Pop, Majesticons et Streamline Freehand (voir scripts/icons.mjs pour en ajouter).
// Même usage que n'importe quel composant d'icône : <Coffee size={22} className="..." />
// Chaque icône garde la taille de son jeu d'origine (viewBox) : elle est ramenée à `size` px.
function creerIcone({ body, w, h, flip }) {
  return function Icone({ size = 24, style, ...props }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${w} ${h}`}
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        style={{ verticalAlign: '-0.125em', flexShrink: 0, ...(flip ? { transform: 'scaleX(-1)' } : {}), ...style }}
        {...props}
        dangerouslySetInnerHTML={{ __html: body }}
      />
    )
  }
}

const icones = Object.fromEntries(
  Object.entries(ICON_BODIES).map(([nom, def]) => [nom, creerIcone(def)]),
)

export const {
  Archive, ArrowBendUpLeft, ArrowCounterClockwise, ArrowDown, ArrowLeft, ArrowRight,
  ArrowSquareOut, ArrowsOutSimple, Bank, Bell, BookOpen, Books, Buildings,
  CaretDown, CaretLeft, CaretRight, ChatCircle, ChatText, Check, CheckCircle,
  Clock, Coffee, Compass, CornersOut, CreditCard, DeviceMobile, Envelope,
  FileText, Globe, Hand, Heart, House, Lifebuoy, Lightbulb, List, Lock, LockOpen,
  MagnifyingGlass, MapPin, MaskHappy, Money, Monitor, Package, PaperPlaneTilt,
  Pause, PencilSimple, Phone, Play, PuzzlePiece, QrCode, Repeat, Robot, ShareFat,
  ShieldWarning, ShoppingBag, SquaresFour, Star, Target, ThumbsUp, Trash, Tray,
  Trophy, User, Users, VideoCamera, WarningCircle, X,
} = icones
