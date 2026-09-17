import { MessageSquareText, ScanSearch, ShieldAlert, Bot } from "lucide-react";
import RecapFiche from "../components/RecapFiche.jsx";

const SESSION = "Café numérique #9";

// ✏️ VAINQUEURS — À remplir après la séance !
// Remplace null par un tableau de prénoms, ex : ['Marie', 'Jean-Pierre']
// Laisse null pour afficher le placeholder mystère
const WINNERS = null;
const WINNERS_SUB = null;

const SECTIONS = [
  {
    icon: "prompt",
    title: "Discuter avec une IA",
    blocks: [
      {
        heading: "La formule pour bien demander",
        items: [
          ["Qui ?", '→ "Tu es un jardinier…", "Tu es un conseiller juridique…"'],
          ["Quoi ?", '→ "Aide-moi à écrire…", "Explique-moi…", "Propose-moi…"'],
          ["Pour quoi ?", '→ le contexte : "pour ma petite-fille de 8 ans", "pour ma mairie"'],
          ["Comment ?", '→ "en 5 lignes", "avec des mots simples", "sous forme de liste"'],
        ],
      },
      {
        heading: "La réponse ne convient pas ? On continue la conversation",
        bullets: [
          "« Plus court », « plus simple », « plus chaleureux »",
          "« Donne-moi 3 autres idées »",
          "« Je n'ai pas compris ce passage, reformule »",
          "Pas besoin de tout réécrire : l'IA se souvient du début de la conversation",
        ],
      },
      {
        heading: "Ce qu'on ne lui confie jamais",
        items: [
          ["Mots de passe, codes bancaires", "→ jamais, sous aucun prétexte"],
          ["Numéro de sécurité sociale, pièce d'identité", "→ on les remplace par des XXX"],
          ["Détails de santé ou d'argent qui vous identifient", "→ on reste général"],
          ["Pour aller plus loin", "→ ChatGPT : Paramètres → Contrôles des données → désactiver « Améliorer le modèle pour tous »"],
        ],
      },
      {
        heading: "L'IA peut se tromper avec aplomb",
        bullets: [
          "Elle invente parfois des chiffres, des dates, des adresses : on appelle ça une « hallucination »",
          "Santé, argent, démarches administratives → on vérifie toujours sur un site officiel ou auprès d'un professionnel",
          "Astuce : lui demander « Quelles sont tes sources ? » puis aller les voir",
        ],
      },
      {
        heading: "Les outils gratuits",
        links: [
          { name: "ChatGPT", url: "https://chatgpt.com" },
          { name: "Le Chat de Mistral (français)", url: "https://chat.mistral.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
          { name: "Claude", url: "https://claude.ai" },
        ],
      },
    ],
  },
  {
    icon: "iaoupas",
    title: "IA ou pas ? Repérer les images et vidéos",
    blocks: [
      {
        heading: "Les indices sur une image",
        items: [
          ["Les mains", "→ doigts en trop, soudés ou tordus"],
          ["Les textes", "→ panneaux, étiquettes ou affiches aux lettres illisibles"],
          ["L'arrière-plan", "→ objets qui se fondent, lignes qui ne se raccordent pas"],
          ["Les détails", "→ boucles d'oreilles différentes, lunettes déformées, dents trop régulières"],
          ["L'ambiance", "→ peau trop lisse, lumière trop parfaite, image « trop belle pour être vraie »"],
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
    icon: "deepfake",
    title: "Deepfakes et arnaques",
    blocks: [
      {
        heading: "Les arnaques qui utilisent l'IA",
        items: [
          ["Une voix familière au téléphone qui réclame de l'argent", "→ une IA peut copier une voix avec quelques secondes d'enregistrement"],
          ["Une célébrité qui recommande un placement miracle", "→ vidéo truquée, aucune célébrité ne fait ça"],
          ["Un faux journal télévisé ou un faux article", "→ on cherche l'info sur le vrai site du média"],
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
          ["Info Escroqueries", "→ 0 805 805 817 (appel gratuit)"],
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
    text: "Qui, quoi, pour quoi, comment. Et si la réponse ne va pas, on continue la conversation au lieu d'abandonner.",
  },
  {
    topic: "Face à une image ou une vidéo",
    text: "Mains, textes, arrière-plan. Et surtout : qui la publie ? Dans le doute, on ne partage pas.",
  },
  {
    topic: "Face à un appel urgent",
    text: "Voix connue + urgence + argent = on raccroche et on rappelle soi-même. Cette semaine, choisissez votre mot de code familial.",
  },
];

const ICON_MAP = {
  prompt: MessageSquareText,
  iaoupas: ScanSearch,
  deepfake: ShieldAlert,
  ia: Bot,
};

export default function RetenirPage9() {
  return (
    <RecapFiche
      session={SESSION}
      winners={WINNERS}
      winnersLabel="Champions de « IA ou pas ? »"
      winnersSub={WINNERS_SUB}
      sections={SECTIONS}
      icons={ICON_MAP}
      takeaways={TAKEAWAYS}
    />
  );
}
