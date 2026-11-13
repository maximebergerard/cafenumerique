import { ChatText, DeviceMobile, Package, Lock } from "../icons/index.jsx";
import RecapFiche from "../components/RecapFiche.jsx";

const SESSION = "Café numérique #10";
const LIEU = "Nandy";

// ✏️ VAINQUEURS de la séance : null tant qu'ils ne sont pas connus (« ??? & ??? »).
// Prénoms ['Prénom', 'Prénom'] ou nom d'équipe ['Nom']. WINNERS_SUB : une phrase différente à chaque séance.
const WINNERS = null;
const WINNERS_SUB = "Les grains de café ont tranché, vous contre l'IA";

const SECTIONS = [
  {
    icon: "photos",
    title: "Mes photos : ranger, retrouver, sauvegarder",
    blocks: [
      {
        heading: "Le pari photo : les bonnes réponses",
        items: [
          ["Combien de photos tiennent dans 1 Go ?", "environ 400"],
          ["Une minute de vidéo prend autant de place que…", "environ 50 photos"],
          ["Quand je supprime une photo, elle disparaît…", "après 30 jours, elle reste dans la corbeille d'abord"],
          ["« Je retrouve mes photos de chien en tapant « chien » dans ma galerie »", "vrai"],
          ["« Si je perds mon téléphone, je perds toutes mes photos »", "ça dépend : pas si elles sont sauvegardées"],
          ["« Une photo envoyée par WhatsApp garde exactement la même qualité »", "faux, WhatsApp la compresse"],
        ],
      },
      {
        heading: "Ce qu'on retient",
        bullets: [
          "La corbeille garde mes photos 30 jours : une suppression par erreur se rattrape",
          "La sauvegarde protège mes souvenirs, même si je perds ou casse mon téléphone",
          "Je retrouve une photo en tapant un mot dans la galerie : « chat », « fleur »…",
        ],
      },
      {
        heading: "La chasse aux photos : à refaire chez soi",
        steps: [
          "Trouver ma photo la plus ancienne",
          "Taper « fleur » et voir apparaître mes fleurs",
          "Regarder la place que prennent mes photos",
          "Mettre une photo en favori",
          "Créer un album « Noël 2026 »",
        ],
        bullets: ["Bonus : jeter un œil à la corbeille"],
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
        heading: "On peut aller plus loin qu'une question",
        bullets: [
          "On peut lui montrer une photo",
          "On peut lui parler avec le mode vocal",
          "On peut continuer la discussion sans tout réexpliquer : elle se souvient du début",
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
          "On affiche la vérité",
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
        heading: "L'objet piège",
        bullets: [
          "L'IA répond toujours avec assurance, même quand elle invente",
          "Jamais pour un champignon, ni pour un médicament",
          "Un doute ? On vérifie ailleurs",
        ],
      },
      {
        heading: "La chanson de la salle",
        bullets: [
          "Donnez trois mots : un thème, un style et 2 instruments",
          "L'IA compose la chanson du groupe",
        ],
      },
      {
        heading: "Votre défi de la semaine (2 minutes)",
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
        bullets: [
          "Numéro de sécurité sociale",
          "Codes et mots de passe",
          "Coordonnées bancaires",
          "Ce qui concerne la santé de quelqu'un d'autre",
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
          ["« Une photo supprimée est perdue pour toujours » :", "faux, la corbeille la garde 30 jours"],
          ["« Je peux demander à l'IA ses sources » :", "vrai, puis on va les vérifier"],
          ["« Je peux poser une question à l'IA sans lui donner mon nom ni mon adresse » :", "vrai"],
          ["« Si la voix au téléphone ressemble à celle de mon fils, c'est forcément lui » :", "faux, une IA peut copier une voix"],
        ],
      },
    ],
  },
];

const TAKEAWAYS = [
  {
    topic: "Pour mes photos",
    text: "La corbeille garde mes photos 30 jours, la sauvegarde protège mes souvenirs, et je retrouve une photo en tapant un mot dans ma galerie.",
  },
  {
    topic: "Pour bien demander à l'IA",
    text: "Qui je suis, ce que je veux, comment je veux que ça sonne. Elle a tout lu mais ne sait rien : elle peut se tromper, donc on lui demande « Sur quoi te bases-tu ? ».",
  },
  {
    topic: "Ce qu'on garde pour soi",
    text: "Numéro de sécurité sociale, codes et mots de passe, coordonnées bancaires, santé d'un proche : jamais à l'IA. Et face à une voix connue qui réclame de l'argent, on raccroche et on rappelle soi-même.",
  },
];

const ICON_MAP = {
  photos: DeviceMobile,
  prompt: ChatText,
  objet: Package,
  "garde-fous": Lock,
};

export default function RetenirPage10() {
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
