import { ChatText, MagnifyingGlass, ShieldWarning, Robot, Package, Lock } from "../icons/index.jsx";
import RecapFiche from "../components/RecapFiche.jsx";

// Châtelet-en-Brie a sa propre numérotation (Nandy : #7, #8, #9…).
// Séance du 6 novembre 2026 (Médiathèque du Château des Dames), d'après les slides de Maxime.
const SESSION = "Café numérique #3";
const LIEU = "Châtelet-en-Brie";

// ✏️ VAINQUEURS de la séance : null tant qu'ils ne sont pas connus (« ??? & ??? »).
// Prénoms ['Prénom', 'Prénom'] ou nom d'équipe ['Nom']. WINNERS_SUB : une phrase différente à chaque séance.
const WINNERS = null;
const WINNERS_SUB = 'Jamais deux sans trois : le trophée a trouvé preneur';

const SECTIONS = [
  {
    icon: "iaoupas",
    title: "IA ou pas ? Repérer les images et vidéos",
    blocks: [
      {
        heading: "Les indices sur une image",
        items: [
          ["Les mains :", "doigts en trop, soudés ou tordus"],
          ["Les textes :", "panneaux, étiquettes ou affiches aux lettres illisibles"],
          ["L'arrière-plan :", "objets qui se fondent, lignes qui ne se raccordent pas"],
          ["Les détails :", "boucles d'oreilles différentes, lunettes déformées, dents trop régulières"],
          ["L'ambiance :", "peau trop lisse, lumière trop parfaite, image « trop belle pour être vraie »"],
        ],
      },
      {
        heading: "Les indices sur une vidéo",
        bullets: [
          "Les lèvres ne suivent pas tout à fait les paroles",
          "Le contour du visage devient flou quand la personne tourne la tête",
          "Clignements des yeux rares ou bizarres, regard fixe",
          "Voix monotone, sans respiration, ou décalée avec l'image",
        ],
      },
      {
        heading: "Quand l'œil ne suffit plus",
        bullets: [
          "Les IA progressent vite : « impossible à trancher » est une vraie réponse, pas un échec",
          "Qui publie ? Un média connu, un ami, ou une page inconnue créée le mois dernier ?",
          "Un grand média en parle-t-il ? Si une info choc n'est reprise nulle part, méfiance",
          "Dans le doute, on ne partage pas",
        ],
      },
      {
        heading: "Retrouver l'origine d'une image avec Google Lens",
        steps: [
          "Sur le téléphone, ouvrez l'image dans Chrome ou l'application Google",
          "Appuyez longuement sur l'image",
          "Choisissez « Rechercher avec Google Lens »",
          "Regardez où l'image apparaît déjà : date, site, contexte d'origine",
        ],
      },
    ],
  },
  {
    icon: "prompt",
    title: "Discuter avec une IA",
    blocks: [
      {
        heading: "C'est quoi l'IA, vraiment ?",
        bullets: [
          "Elle ne sait rien : elle a tout lu. Des milliards de pages, avalées pendant son entraînement",
          "Elle devine le mot suivant : « Il pleut des… » cordes ou hallebardes, oui ; téléphones ou voitures, non",
          "Résultat : elle peut se tromper. On reste curieux et on garde son esprit critique",
        ],
      },
      {
        heading: "La formule pour bien demander",
        items: [
          ["Qui je suis et à qui je parle :", "« Je suis un piètre cuisinier… J'ai des œufs, des courgettes et du fromage. »"],
          ["Ce que je veux exactement, longueur comprise :", "« Propose-moi une recette simple pour ce soir, en 5 étapes maximum. »"],
          ["Comment je veux que ça sonne :", "« Un ton clair et rassurant, comme pour un débutant. »"],
        ],
      },
      {
        heading: "Pour comprendre n'importe quel sujet",
        bullets: [
          "« Explique-moi ce qu'est [...] en trois phrases simples, comme à quelqu'un qui n'y connaît rien. »",
          "Remplacez [...] par le sujet de votre choix",
        ],
      },
      {
        heading: "La réponse ne convient pas ? On continue la conversation",
        bullets: [
          "« Plus court », « plus simple », « plus chaleureux »",
          "« Donne-moi 3 autres idées »",
          "« Je n'ai pas compris ce passage, reformule »",
          "Pas besoin de tout réécrire : l'IA se souvient du début de la conversation",
          "On peut lui montrer une photo",
          "On peut lui parler avec le mode vocal",
        ],
      },
      {
        heading: "Le défi à la carte : à vous de choisir",
        bullets: [
          "Le frigo : une recette pour ce soir",
          "Une histoire pour des enfants",
          "Une sortie dimanche, en douceur",
          "Un SMS louche : arnaque ou pas ?",
          "Puis 2 relances pour affiner la réponse",
          "Niveau 2 : ajoutez des contraintes",
        ],
      },
      {
        heading: "L'IA peut se tromper avec aplomb",
        bullets: [
          "Elle invente parfois des chiffres, des dates, des adresses : on appelle ça une « hallucination »",
          "Santé, argent, démarches administratives : on vérifie toujours sur un site officiel ou auprès d'un professionnel",
          "Astuce : lui demander « Quelles sont tes sources ? » puis aller les voir",
        ],
      },
      {
        heading: "Les outils gratuits",
        links: [
          { name: "ChatGPT : le plus connu, interface simple", url: "https://chatgpt.com" },
          { name: "Le Chat de Mistral : une IA créée par des Français", url: "https://chat.mistral.ai" },
          { name: "Claude : très bon pour la rédaction et les explications", url: "https://claude.ai" },
          { name: "Gemini : l'IA de Google, connectée à l'actualité", url: "https://gemini.google.com" },
        ],
      },
    ],
  },
  {
    icon: "objet",
    title: "L'objet mystère : vous contre l'IA",
    blocks: [
      {
        heading: "Les règles du duel",
        steps: [
          "Un objet est photographié",
          "Votre équipe parie, sur papier",
          "L'IA donne son avis",
          "Son propriétaire donne la vérité",
        ],
        bullets: ["Les points se comptent en grains de café : vous contre l'IA !"],
      },
      {
        heading: "La question posée à l'IA",
        bullets: [
          "« Voici la photo d'un objet. Dis-moi ce que c'est, de quelle époque il date, et traduis ce qui est écrit dessus. Sur quoi te bases-tu ? »",
        ],
      },
      {
        heading: "Les objets mystères du jour",
        items: [
          ["Une machine à écrire :", "fabriquée en 1949, en Corée du Sud"],
          ["Un moulin à café :", "fabriqué entre 1920 et 1940, en Turquie"],
        ],
      },
      {
        heading: "Ce qu'on en retient",
        bullets: [
          "Avec une simple photo, l'IA propose un nom, une époque et une traduction",
          "Mais elle peut se tromper, surtout quand elle estime l'âge d'un objet",
          "Le bon réflexe : lui demander « Sur quoi te bases-tu ? »",
          "L'histoire de votre objet, c'est vous qui la connaissez",
        ],
      },
      {
        heading: "Votre défi de la semaine",
        bullets: [
          "Prenez en photo un objet de chez vous dont vous ignorez l'histoire, et demandez à l'IA de la raconter !",
        ],
      },
    ],
  },
  {
    icon: "garde-fous",
    title: "Les garde-fous : ne pas tout partager à l'IA",
    blocks: [
      {
        heading: "Ce qu'on ne lui confie jamais",
        items: [
          ["Numéro de sécurité sociale :", "jamais, pièce d'identité non plus : on remplace par des XXX"],
          ["Codes et mots de passe :", "jamais, sous aucun prétexte"],
          ["Coordonnées bancaires :", "jamais, ni IBAN ni numéro de carte"],
          ["Ce qui concerne la santé de quelqu'un d'autre :", "on reste général, sans donner de noms"],
          ["Votre nom et votre adresse :", "inutiles pour poser une question, on s'en passe"],
          ["Pour aller plus loin :", "ChatGPT : Paramètres > Contrôles des données > désactiver « Améliorer le modèle pour tous »"],
        ],
      },
      {
        heading: "Elle ne remplace pas",
        bullets: [
          "Votre médecin",
          "Votre banquier",
          "Votre pharmacien",
          "Votre notaire",
          "Mais elle vous aide à bien préparer les rendez-vous !",
        ],
      },
      {
        heading: "Vrai ou faux ? Les réponses",
        items: [
          ["« Quand l'IA estime l'âge d'un objet, elle ne se trompe jamais » :", "faux"],
          ["« Je peux demander à l'IA ses sources » :", "vrai"],
          ["« Je peux poser une question à l'IA sans lui donner mon nom ni mon adresse » :", "vrai"],
          ["« Si la voix au téléphone ressemble à celle de mon fils, c'est forcément lui » :", "faux"],
        ],
      },
    ],
  },
  {
    icon: "deepfake",
    title: "Deepfakes et arnaques",
    blocks: [
      {
        heading: "Les arnaques qui utilisent l'IA",
        items: [
          ["Une voix familière au téléphone qui réclame de l'argent :", "une IA peut copier une voix avec quelques secondes d'enregistrement"],
          ["Une célébrité qui recommande un placement miracle :", "vidéo truquée, aucune célébrité ne fait ça"],
          ["Un faux journal télévisé ou un faux article :", "on cherche l'info sur le vrai site du média"],
        ],
      },
      {
        heading: "Les bons réflexes",
        bullets: [
          "Urgence + émotion + argent = on raccroche et on rappelle la personne sur son numéro habituel",
          "Choisir en famille un mot de code secret, à demander en cas d'appel suspect",
          "Ne jamais payer en carte cadeau, en cryptomonnaie ou par virement vers un inconnu",
        ],
      },
      {
        heading: "Signaler et se faire aider",
        items: [
          ["Info Escroqueries :", "0 805 805 817 (appel gratuit)"],
        ],
        resource: {
          label: "cybermalveillance.gouv.fr",
          url: "https://www.cybermalveillance.gouv.fr",
        },
      },
    ],
  },
];

const TAKEAWAYS = [
  {
    topic: "Pour bien demander",
    text: "Qui je suis, ce que je veux, comment je veux que ça sonne. Et si la réponse ne va pas, on continue la conversation au lieu d'abandonner.",
  },
  {
    topic: "Face à une réponse, une image ou une vidéo",
    text: "L'IA a tout lu mais ne sait rien : elle peut se tromper. On garde son esprit critique, on lui demande « Sur quoi te bases-tu ? » et, dans le doute, on ne partage pas.",
  },
  {
    topic: "Ce qu'on garde pour soi",
    text: "Numéro de sécurité sociale, codes et mots de passe, coordonnées bancaires, santé d'un proche : jamais à l'IA. Et face à une voix connue qui réclame de l'argent, on raccroche et on rappelle soi-même.",
  },
];

const ICON_MAP = {
  prompt: ChatText,
  iaoupas: MagnifyingGlass,
  objet: Package,
  "garde-fous": Lock,
  deepfake: ShieldWarning,
  ia: Robot,
};

export default function RetenirPageCeb3() {
  return (
    <RecapFiche
      session={SESSION}
      lieu={LIEU}
      winners={WINNERS}
      winnersSub={WINNERS_SUB}
      sections={SECTIONS}
      icons={ICON_MAP}
      takeaways={TAKEAWAYS}
    />
  );
}
