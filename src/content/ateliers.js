// ─────────────────────────────────────────────────────────────────────────────
// ATELIERS : contenu des pages /ateliers et /ateliers/<slug>
//
// Ajouter un atelier = ajouter un objet dans ATELIERS. La page, le menu du
// pied de page, le sitemap et les métadonnées SEO se mettent à jour seuls.
// `icon` : nom d'une icône lucide déclarée dans src/components/icons.js
// Pas de tarifs sur le site : on renvoie vers le contact.
// ─────────────────────────────────────────────────────────────────────────────

export const FORMAT = {
  duree: '2 heures',
  participants: "Jusqu'à 10 personnes",
  public: 'Adultes et seniors, grands débutants bienvenus',
  formats: 'Séance unique ou cycle de 4 ateliers',
}

export const ATELIERS = [
  {
    slug: 'intelligence-artificielle',
    icon: 'bot',
    nom: 'Intelligence artificielle',
    titre: "Découvrir et apprivoiser l'intelligence artificielle au quotidien",
    seoTitre: 'Atelier IA pour adultes et seniors débutants',
    seoDescription:
      "Atelier de 2h pour comprendre l'intelligence artificielle sans jargon : démystifier l'IA, essayer ChatGPT et la création d'images, repérer les images truquées. Pour adultes et seniors débutants.",
    accroche:
      "Comprendre ce qu'est l'IA, l'essayer pour de vrai et repartir avec une pratique utile dès le lendemain.",
    intro: [
      "L'intelligence artificielle est désormais présente dans de nombreux aspects de notre vie quotidienne, mais reste souvent perçue comme complexe ou réservée aux initiés.",
      "Cet atelier propose une première approche concrète, sans jargon, dans un esprit d'échange et d'entraide.",
    ],
    objectifGlobal:
      "Permettre à des adultes et des seniors, sans prérequis technique, de comprendre ce qu'est l'IA, de manipuler des outils accessibles et de repartir avec une pratique concrète, applicable dès le lendemain.",
    objectifs: [
      "Comprendre ce qu'est l'intelligence artificielle et ce qu'elle n'est pas (démystifier les représentations)",
      'Identifier des usages concrets et utiles dans la vie quotidienne : rédaction, image, assistance, recherche',
      "Manipuler au moins un outil d'IA en autonomie guidée pendant la séance",
      'Repérer une image ou une vidéo créée par IA, et déjouer les arnaques qui l’utilisent',
      'Repartir avec une ou deux ressources accessibles à explorer en autonomie',
    ],
    deroule: [
      {
        titre: "L'IA, de quoi parle-t-on ?",
        texte:
          "Tour de table sur les connaissances des participants. Explication simple et visuelle de ce qu'est l'IA. Exemples au quotidien : assistants vocaux, recommandations, filtres photo…",
      },
      {
        titre: "Découverte d'outils accessibles",
        texte:
          "Démonstration en direct d'outils grand public : génération de texte (questions, lettres, idées), création d'images, assistance aux tâches du quotidien. L'accent est mis sur la simplicité d'utilisation.",
      },
      {
        titre: 'Mise en pratique guidée',
        texte:
          "Chaque participant s'approprie l'IA à travers des défis : créer une image personnalisée, rédiger un message ou une lettre, poser une question à un assistant IA.",
      },
      {
        titre: 'IA ou pas ? Le jeu',
        texte:
          "Par équipes, le groupe vote : cette image, cette vidéo, est-elle vraie ou générée ? Les indices sont révélés un par un, et on parle des deepfakes utilisés dans les arnaques.",
      },
      {
        titre: 'Échanges et questions',
        texte:
          "Mise en commun : ce qui a surpris, ce qui inquiète, ce qui donne envie. Partage de ressources simples à utiliser chez soi, limites et usages responsables de l'IA.",
      },
    ],
    materiel: [
      'Ordinateurs ou smartphones (selon disponibilité)',
      'Connexion internet',
      'Vidéoprojecteur ou écran de présentation',
      'Aucun logiciel à installer au préalable',
    ],
    guides: ['reconnaitre-image-ia'],
    recap: '/retenir-cn9',
  },
  {
    slug: 'arnaques-en-ligne',
    icon: 'shield',
    nom: 'Arnaques en ligne',
    titre: 'Déjouer les arnaques en ligne',
    seoTitre: 'Atelier prévention des arnaques en ligne pour seniors',
    seoDescription:
      "Atelier de 2h pour apprendre à repérer les faux SMS, faux mails, fausses alertes et arnaques au faux proche. Théâtre-forum et cas pratiques réalistes, pour adultes et seniors.",
    accroche:
      "Faux SMS de colis, fausse alerte Microsoft, faux petit-fils sur WhatsApp : on s'entraîne à les démasquer avant qu'ils arrivent pour de vrai.",
    intro: [
      "Les arnaques en ligne visent tout le monde, et elles sont de plus en plus soignées. La meilleure protection n'est pas la peur, c'est l'entraînement.",
      "Dans cet atelier, on ne fait pas de cours sur les arnaques : on les vit. L'animateur joue la victime, le groupe mène l'enquête.",
    ],
    objectifGlobal:
      "Permettre à chacun de reconnaître les signaux d'alarme d'un message frauduleux, de faire la différence avec un vrai message et de savoir quoi faire en cas de doute, ou si l'on s'est fait piéger.",
    objectifs: [
      "Reconnaître les signaux d'alarme : urgence, lien douteux, petit montant demandé, expéditeur inconnu",
      "Distinguer un vrai message d'une arnaque, à partir de cas réels",
      'Adopter le bon réflexe : s’arrêter, vérifier par un autre moyen, en parler',
      "Savoir quoi faire si l'on a cliqué ou payé, et où signaler",
    ],
    deroule: [
      {
        titre: 'Ice-breaker : le faux mail La Poste',
        texte:
          "L'animateur reçoit « en direct » un mail de colis bloqué et s'apprête à payer. Le groupe doit l'arrêter et expliquer pourquoi. C'est du théâtre-forum : on rit, et on retient.",
      },
      {
        titre: 'Enquête en binôme',
        texte:
          "Six situations réalistes à examiner : SMS de colis, pop-up Microsoft, publicité Facebook, message WhatsApp d'un « petit-fils »… Piège : certaines sont authentiques.",
      },
      {
        titre: 'Révélation des indices',
        texte:
          "Chaque cas est projeté, les indices sont révélés un par un. Le groupe construit lui-même ses règles d'or.",
      },
      {
        titre: "Et si j'ai cliqué ?",
        texte:
          "Les gestes à faire tout de suite : faire opposition, changer ses mots de passe, signaler, porter plainte. Et les ressources officielles pour se faire aider.",
      },
    ],
    materiel: [
      'Vidéoprojecteur ou écran de présentation',
      'Connexion internet',
      'Smartphones des participants bienvenus, pas indispensables',
    ],
    guides: ['faux-sms-colis', 'arnaque-faux-proche-whatsapp'],
    recap: '/retenir',
    simulations: '/arnaques',
  },
  {
    slug: 'whatsapp',
    icon: 'message',
    nom: 'WhatsApp et messageries',
    titre: 'WhatsApp en toute sérénité',
    seoTitre: 'Atelier WhatsApp pour débutants et seniors',
    seoDescription:
      "Atelier de 2h pour bien utiliser WhatsApp : groupes, sondages, partage de position, réglages de confidentialité et arnaques à reconnaître. Pour adultes et seniors débutants.",
    accroche:
      'Groupes de famille, vocaux, sondages, position partagée : profiter de WhatsApp sans se faire piéger.',
    intro: [
      "WhatsApp est devenu le lien principal avec la famille et les amis. C'est aussi un terrain de jeu pour les arnaqueurs.",
      "Cet atelier part des usages de chacun pour maîtriser les fonctions utiles, régler sa confidentialité et reconnaître les pièges.",
    ],
    objectifGlobal:
      "Permettre à chacun d'utiliser WhatsApp avec aisance et en sécurité : communiquer en groupe, protéger son compte et reconnaître les tentatives d'arnaque.",
    objectifs: [
      'Créer un groupe, un sondage, partager sa position',
      'Régler sa confidentialité et activer la vérification en deux étapes',
      'Comprendre simplement le chiffrement de bout en bout',
      "Reconnaître les arnaques : faux proche, code à 6 chiffres, liens d'inconnus, voix imitées par IA",
    ],
    deroule: [
      {
        titre: 'Ice-breaker : le groupe famille',
        texte:
          "Un groupe WhatsApp de famille reconstitué, avec son vocal de trois minutes à 7h du matin et son avalanche de GIF. On rit, et on parle des bons usages.",
      },
      {
        titre: 'Les fonctions utiles, en pratique',
        texte:
          'Chacun manipule sur son téléphone : créer un groupe, lancer un sondage, partager sa position, réagir à un message.',
      },
      {
        titre: 'Protéger son compte',
        texte:
          "Démonstration du chiffrement, réglages de confidentialité (photo de profil, statut), vérification en deux étapes.",
      },
      {
        titre: 'Les arnaques à reconnaître',
        texte:
          "Cas réels comparés : vrai message d'un proche ou usurpation ? Le code à 6 chiffres, l'urgence, la voix imitée par IA.",
      },
    ],
    materiel: [
      'Smartphones des participants avec WhatsApp installé (ou aide à l’installation en début de séance)',
      'Vidéoprojecteur ou écran de présentation',
      'Connexion internet',
    ],
    guides: ['arnaque-faux-proche-whatsapp'],
    recap: '/retenir-cn8',
  },
]

export const SUR_MESURE = {
  titre: 'Un atelier sur mesure',
  texte:
    "Smartphone, mails, réseaux sociaux, démarches en ligne… Le contenu s'adapte à votre public et à vos besoins. Parlons-en.",
}

export function findAtelier(slug) {
  return ATELIERS.find((a) => a.slug === slug)
}
