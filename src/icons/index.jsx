import { ICON_BODIES } from './icons.generated.js'

// Icônes Phosphor (voir scripts/icons.mjs pour en ajouter).
// Même usage que n'importe quel composant d'icône : <Coffee size={22} className="..." />
function creerIcone(corps) {
  return function Icone({ size = 24, style, ...props }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        style={{ verticalAlign: '-0.125em', flexShrink: 0, ...style }}
        {...props}
        dangerouslySetInnerHTML={{ __html: corps }}
      />
    )
  }
}

const icones = Object.fromEntries(
  Object.entries(ICON_BODIES).map(([nom, corps]) => [nom, creerIcone(corps)]),
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
