// ─────────────────────────────────────────────────────────────────────────────
// Textes des pages Accueil, Organiser un atelier et À propos.
// Pas de tarifs sur le site.
// ─────────────────────────────────────────────────────────────────────────────

export const INTERVENANT = {
  nom: 'Maxime Bergerard',
  role: 'Expert en ingénierie numérique, animateur des Cafés numériques',
  // Recadrage carré 560×560, affiché en rond (composant Portrait)
  photo: '/images/maxime-bergerard.jpg',
  linkedin: 'https://www.linkedin.com/in/maxime-bergerard/',
  // Courte présentation à la première personne (accueil)
  presentation:
    "Je m'appelle Maxime Bergerard, je suis expert en ingénierie numérique. J'ai créé le Café numérique parce que trop de gens risquaient de « rater le train » faute d'un coup de main au bon moment : un espace sans prise de tête, sans jargon, où l'on apprend en faisant et en s'amusant.",
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
      "Je joue un personnage face à une situation piégée, le groupe mène l'enquête et m'arrête à temps. On apprend en riant, et on retient.",
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

// Mentions légales (page /mentions-legales). Les champs vides ne s'affichent pas :
// remplir `statut`, `siret` et `adresse` si Maxime intervient en tant que professionnel.
export const LEGAL = {
  misAJour: '14 octobre 2026',
  editeur: {
    nom: 'Maxime Bergerard',
    email: 'maxime.bergerard@gmail.com',
    statut: 'Microentreprise',
    siret: '94927186000015',
    adresse: '',
  },
  hebergeur: {
    nom: 'Netlify, Inc.',
    adresse: '512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis',
    site: 'https://www.netlify.com',
  },
}

// Photos prises en atelier (public/images/ateliers/), retouchées en lumière et contraste.
// Pas de lieu dans les légendes : les photos viennent de plusieurs séances.
// w/h = taille réelle du fichier (évite que la page saute pendant le chargement).
// MASQUÉ (pas affiché sur le site) : visages reconnaissables, en attente de l accord des participants.
export const PHOTOS_ATELIER = [
  {
    src: '/images/ateliers/accompagnement-individuel.jpg',
    w: 1400, h: 1186,
    alt: "Maxime penché au-dessus d'une table, un participant assis devant lui, pendant qu'un autre groupe suit l'atelier",
    legende: "Un coup de main à la demande : chacun avance sur son propre appareil.",
  },
  {
    src: '/images/ateliers/objet-mystere.jpg',
    w: 1400, h: 1050,
    alt: "Maxime tient un masque devant un écran de projection, deux participantes l'écoutent",
    legende: "Atelier IA, l'objet mystère : on devine d'abord, on demande à l'IA ensuite.",
  },
  {
    src: '/images/ateliers/pari-photos.jpg',
    w: 1400, h: 1050,
    alt: "Des participants regardent l'écran où s'affiche un pari : vrai, faux ou ça dépend",
    legende: "On parie « vrai », « faux » ou « ça dépend », puis on vérifie ensemble.",
  },
  {
    src: '/images/ateliers/accompagnement-tablette.jpg',
    w: 1000, h: 1192,
    alt: "Maxime montre quelque chose sur la tablette d'une participante assise à une table",
    legende: "Pas de cours magistral : on manipule, on se trompe, on recommence.",
  },
]

// Retours reçus par mail des structures d'accueil. Citations exactes, coupées seulement
// là où « […] » l'indique. À ne publier qu'avec l'accord de chaque personne.
// MASQUÉ (pas affiché sur le site) : en attente de la validation de Marie-Christine et Karine.
export const TEMOIGNAGES = [
  {
    texte:
      "On a eu des retours très très positifs […]. Encore un grand merci pour la qualité de tes interventions et ton investissement.",
    nom: 'Marie-Christine Pastorino',
    role: 'Directrice de la médiathèque Marguerite Yourcenar, Nandy',
    quand: 'Après un café numérique, mai 2025',
  },
  {
    texte:
      "Le plaisir fut partagé tant par notre équipe que par les participants, merci ! […] Nous réfléchissons à te proposer d'autres dates, la demande a été assez forte.",
    nom: 'Karine Lavocat-Ghazali',
    role: 'Responsable du service culturel, médiathèque du Châtelet-en-Brie',
    quand: 'Après un cycle de quatre ateliers, novembre 2026',
  },
]
