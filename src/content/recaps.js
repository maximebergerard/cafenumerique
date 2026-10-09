// ─────────────────────────────────────────────────────────────────────────────
// Récaps des séances : liste partagée par la page /recaps et le pied de page.
// Chaque lieu a sa propre numérotation. Ajouter une entrée ici à chaque séance
// (la plus récente en premier), puis la fiche, sa <Route> et son entrée dans
// src/seo/routes.js (voir CLAUDE.md).
// ─────────────────────────────────────────────────────────────────────────────

// L'ordre ici est l'ordre d'affichage des sections de /recaps.
export const LIEUX = [
  { id: 'chatelet-en-brie', nom: 'Châtelet-en-Brie' },
  { id: 'nandy', nom: 'Nandy' },
]

// court : libellé du lien dans le pied de page
export const RECAPS = [
  {
    id: 'ceb2',
    lieu: 'chatelet-en-brie',
    path: '/retenir-ceb2',
    date: 'Octobre 2026',
    title: 'Séance #2',
    court: 'Châtelet-en-Brie #2',
    themes: ['Intelligence artificielle', 'Images générées', 'Deepfakes'],
    desc: "Bien écrire à une IA, ce qu'il ne faut jamais lui confier, repérer une image ou une vidéo créée par IA et déjouer les arnaques aux deepfakes.",
  },
  {
    id: 'ceb1',
    lieu: 'chatelet-en-brie',
    path: '/retenir-ceb1',
    date: 'Octobre 2026',
    title: 'Séance #1',
    court: 'Châtelet-en-Brie #1',
    themes: ['Intelligence artificielle', 'Images générées', 'Deepfakes'],
    desc: "Bien écrire à une IA, ce qu'il ne faut jamais lui confier, repérer une image ou une vidéo créée par IA et déjouer les arnaques aux deepfakes.",
  },
  {
    id: 'cn9',
    lieu: 'nandy',
    path: '/retenir-cn9',
    date: 'Septembre 2026',
    title: 'Séance #9',
    court: 'Nandy #9',
    themes: ['Intelligence artificielle', 'Images générées', 'Deepfakes'],
    desc: "Bien écrire à une IA, ce qu'il ne faut jamais lui confier, repérer une image ou une vidéo créée par IA et déjouer les arnaques aux deepfakes.",
  },
  {
    id: 'cn8',
    lieu: 'nandy',
    path: '/retenir-cn8',
    date: 'Mai 2026',
    title: 'Séance #8',
    court: 'Nandy #8',
    themes: ['WhatsApp', 'Intelligence artificielle', 'Deepfakes'],
    desc: 'Arnaques sur WhatsApp, protéger son compte, la formule du prompt IA et les deepfakes vocaux.',
  },
  {
    id: 'cn7',
    lieu: 'nandy',
    path: '/retenir',
    date: 'Avril 2026',
    title: 'Séance #7',
    court: 'Nandy #7',
    themes: ['Arnaques en ligne', 'Intelligence artificielle', 'Réseaux sociaux'],
    desc: "Les signaux d'alarme des arnaques, les outils IA gratuits, et le lexique des réseaux sociaux.",
  },
]
