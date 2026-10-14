import { Robot, ShieldWarning, ChatCircle, MaskHappy, Hand, Users, FileText, Books, Bank, House, Heart, BookOpen } from '../icons/index.jsx'

// Icônes utilisables par leur nom dans les fichiers de src/content/
export const ICONS = {
  bot: Robot,
  shield: ShieldWarning,
  message: ChatCircle,
  theater: MaskHappy,
  hand: Hand,
  users: Users,
  file: FileText,
  library: Books,
  landmark: Bank,
  home: House,
  heart: Heart,
  book: BookOpen,
}

// Couleurs cycliques des pastilles d'icônes (aplats clairs)
export const DOT_COLORS = ['var(--c-accent-light)', 'var(--c-amber-light)', 'var(--c-pink-light)', 'var(--c-lilac-light)']
