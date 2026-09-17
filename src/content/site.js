// ─────────────────────────────────────────────────────────────────────────────
// Textes des pages Accueil, Organiser un atelier et À propos.
// Pas de tarifs sur le site.
// ─────────────────────────────────────────────────────────────────────────────

export const INTERVENANT = {
  nom: 'Maxime Bergerard',
  role: 'Expert en ingénierie numérique, animateur des Cafés numériques',
  bio: [
    "Diplômé d'HETIC en tant qu'expert en ingénierie numérique, j'ai longtemps travaillé au cœur des technologies, jusqu'au jour où j'ai réalisé que le numérique creusait autant de fossés qu'il en comblait. Trop de gens risquaient de « rater le train », faute d'un coup de main au bon moment.",
    "C'est de ce constat qu'est né le Café numérique : un espace sans prise de tête, sans jargon, où l'on apprend en faisant et en s'amusant.",
    "J'interviens régulièrement en médiathèque et auprès de publics variés, avec une conviction simple : tout le monde peut s'approprier ces outils, à condition qu'on prenne le temps de les expliquer.",
  ],
}

export const METHODE = [
  {
    icon: 'theater',
    titre: 'Le théâtre-forum',
    texte:
      "L'animateur joue un personnage face à une situation piégée, le groupe mène l'enquête et l'arrête à temps. On apprend en riant, et on retient.",
  },
  {
    icon: 'hand',
    titre: 'On manipule',
    texte:
      'Chacun pratique sur son téléphone ou un ordinateur, avec un accompagnement individualisé pendant les exercices.',
  },
  {
    icon: 'users',
    titre: "L'entraide",
    texte:
      "Petit groupe, échanges entre participants, rythme adapté au groupe en temps réel. Aucune question n'est bête.",
  },
  {
    icon: 'file',
    titre: 'Une fiche pour après',
    texte:
      "En fin de séance, un QR code donne accès à la fiche « ce qu'il faut retenir », à relire tranquillement chez soi.",
  },
]

export const STRUCTURES = [
  {
    icon: 'library',
    titre: 'Médiathèques et bibliothèques',
    texte: 'Une animation régulière ou ponctuelle pour vos usagers, dans vos locaux.',
  },
  {
    icon: 'landmark',
    titre: 'Mairies et CCAS',
    texte: "Des actions d'inclusion numérique et de prévention des arnaques pour les habitants.",
  },
  {
    icon: 'home',
    titre: 'Résidences seniors et clubs',
    texte: 'Un moment convivial et utile, au rythme des résidents.',
  },
  {
    icon: 'heart',
    titre: 'Associations et centres sociaux',
    texte: 'Un atelier adapté aux besoins et au niveau de votre public.',
  },
]

export const ORGANISER = {
  etapes: [
    {
      titre: 'On échange',
      texte: 'Vous me présentez votre public, vos attentes et vos contraintes. Un simple message suffit, sans engagement.',
    },
    {
      titre: 'On choisit le format',
      texte: 'Un thème parmi les ateliers proposés ou un contenu sur mesure, en séance unique ou en cycle de 4 ateliers.',
    },
    {
      titre: "J'anime l'atelier",
      texte: 'Dans vos locaux, 2 heures, jusqu’à 10 participants. Je viens avec les supports et les simulations.',
    },
    {
      titre: 'Les participants gardent le fil',
      texte: "Chaque séance a sa fiche récap en ligne, accessible par QR code, et des guides pour aller plus loin.",
    },
  ],
  aPrevoir: [
    'Une salle au calme pour une dizaine de personnes',
    'Un vidéoprojecteur ou un grand écran',
    'Une connexion internet',
    'Selon le thème, des ordinateurs ou les smartphones des participants',
    'Aucun logiciel à installer',
  ],
  faq: [
    {
      q: 'Les participants doivent-ils déjà savoir utiliser un ordinateur ou un smartphone ?',
      r: "Non. Les ateliers sont pensés pour des grands débutants. Le rythme s'adapte au groupe, et chacun est accompagné pendant les exercices.",
    },
    {
      q: 'Combien de participants par atelier ?',
      r: "Jusqu'à 10 personnes. Au-delà, il n'est plus possible d'accompagner chacun pendant la pratique.",
    },
    {
      q: 'Les participants doivent-ils venir avec leur téléphone ?',
      r: "C'est conseillé pour les ateliers WhatsApp et IA, pour pratiquer sur son propre appareil. Pour l'atelier arnaques, ce n'est pas indispensable.",
    },
    {
      q: 'Peut-on adapter le contenu à notre public ?',
      r: "Oui, c'est même la règle. Le programme est ajusté après notre premier échange : niveau, centres d'intérêt, questions fréquentes de vos usagers.",
    },
    {
      q: 'Peut-on organiser plusieurs séances ?',
      r: 'Oui, sous forme de cycle de 4 ateliers : on peut alors approfondir un thème ou en aborder plusieurs, avec une progression d’une séance à l’autre.',
    },
    {
      q: 'Les participants repartent-ils avec un support ?',
      r: "Oui : une fiche « ce qu'il faut retenir » en ligne, accessible par QR code à la fin de la séance, ainsi que les guides du site.",
    },
  ],
}
