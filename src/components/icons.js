import {
  Bot, ShieldAlert, MessageCircle, Theater, Hand, Users, FileText,
  Library, Landmark, House, Heart, Sparkles, BookOpen,
} from 'lucide-react'

// Icônes utilisables par leur nom dans les fichiers de src/content/
export const ICONS = {
  bot: Bot,
  shield: ShieldAlert,
  message: MessageCircle,
  theater: Theater,
  hand: Hand,
  users: Users,
  file: FileText,
  library: Library,
  landmark: Landmark,
  home: House,
  heart: Heart,
  sparkles: Sparkles,
  book: BookOpen,
}

// Couleurs cycliques des pastilles d'icônes (aplats clairs)
export const DOT_COLORS = ['var(--c-accent-light)', 'var(--c-amber-light)', 'var(--c-pink-light)', 'var(--c-lilac-light)']
