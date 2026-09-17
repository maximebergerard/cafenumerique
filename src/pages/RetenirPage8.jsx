import { MessageCircle, Bot } from "lucide-react";
import RecapFiche from "../components/RecapFiche.jsx";

const SESSION = "Café numérique #8";

// ✏️ VAINQUEURS — À remplir après la séance !
// Remplace null par un tableau de prénoms, ex : ['Marie', 'Jean-Pierre']
// Laisse null pour afficher le placeholder mystère
const WINNERS = ['Danièle', 'Mauricette']
const WINNERS_SUB = 'Venues tout droit des Sénioriales pour régner sur le Défi des pros 👑'

const SECTIONS = [
  {
    icon: "whatsapp",
    title: "WhatsApp",
    blocks: [
      {
        heading: "Les arnaques à reconnaître",
        items: [
          ["Un inconnu envoie un lien", "→ on ne clique pas, on bloque"],
          ["Urgence + demande d'argent", "→ signal d'alarme immédiat, on raccroche et on rappelle"],
          ["Quelqu'un prétend être un proche", "→ on rappelle sur son vrai numéro enregistré"],
          ["Un code à 6 chiffres demandé", "→ jamais ! C'est pour voler votre compte"],
        ],
      },
      {
        heading: "Protéger son compte",
        bullets: [
          "Photo de profil et statut → régler sur \"Mes contacts\" uniquement (Paramètres → Confidentialité)",
          "Vérification en deux étapes → l'activer dans Paramètres → Compte",
          "Ne jamais partager son code à 6 chiffres, même à quelqu'un qui se dit de WhatsApp",
        ],
      },
      {
        heading: "Créer un groupe",
        items: [
          ["Appuyez sur le bouton vert +", "→ en haut de l'écran sur iPhone, en bas à droite sur Android"],
          ["Choisissez \"Nouveau groupe\"", "→ puis ajoutez plusieurs contacts un par un"],
          ["Donnez un nom au groupe", "→ et c'est parti !"],
        ],
      },
      {
        heading: "Créer un sondage",
        steps: [
          "Ouvrez un groupe WhatsApp",
          "Appuyez sur le trombone 📎 (en bas, à gauche du champ texte)",
          "Choisissez « Sondage »",
          "Écrivez votre question (ex : « Samedi ou dimanche ? »)",
          "Ajoutez les choix possibles, puis appuyez sur Envoyer",
        ],
      },
      {
        heading: "Partager sa position",
        steps: [
          "Ouvrez une conversation ou un groupe",
          "Appuyez sur le trombone 📎",
          "Choisissez « Position »",
          "« Envoyer ma position actuelle » → envoie où vous êtes maintenant",
          "« Partager en direct » → la personne vous voit vous déplacer en temps réel",
        ],
      },
      {
        heading: "Autres astuces",
        bullets: [
          "Réactions : appuyer longtemps sur un message pour répondre avec un emoji",
          "Quitter un groupe discrètement : depuis 2023, les autres ne sont plus notifiés",
          "Vocal : appuyer sur ▶ pour réécouter avant d'envoyer",
        ],
      },
      {
        heading: "Alternatives à WhatsApp",
        items: [
          ["Signal", "→ ultra sécurisé, sans publicité - pour les plus méfiants"],
          ["iMessage", "→ déjà sur iPhone, très simple - pour les utilisateurs Apple"],
          ["Telegram", "→ groupes très grands, fichiers lourds - pour les associations"],
        ],
      },
    ],
  },
  {
    icon: "ia",
    title: "Intelligence Artificielle",
    blocks: [
      {
        heading: "Ce que c'est",
        bullets: [
          "Un programme qui a lu des milliards de textes et sait répondre, rédiger, expliquer",
          "Comme un encyclopédiste très rapide - mais il peut se tromper et inventer des choses",
          "Pas de bon sens, pas d'émotions, pas de mémoire d'une conversation à l'autre (version gratuite)",
        ],
      },
      {
        heading: "La formule magique du prompt",
        items: [
          ['"Tu es [rôle]. Je veux [demande]. [Contexte]."', "→ plus c'est précis, meilleure est la réponse"],
          ["Recette", '"Tu es un cuisinier. Recette simple avec des œufs et des courgettes."'],
          ["Médical", '"Tu es un médecin. Explique-moi simplement la fibrillation auriculaire."'],
          ["Courrier", '"Tu es un conseiller. Aide-moi à écrire une réclamation à ma mutuelle."'],
        ],
      },
      {
        heading: "Les outils gratuits",
        links: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
          { name: "Mistral (français)", url: "https://chat.mistral.ai" },
        ],
      },
      {
        heading: "L'IA générative — vigilance",
        items: [
          ["Deepfakes vocaux", "→ une IA peut imiter n'importe quelle voix avec quelques secondes d'audio"],
          ["Urgence + voix connue + argent demandé", "→ raccrochez et rappelez vous-même sur le vrai numéro"],
          ["Images trop parfaites", "→ regardez les mains (trop de doigts), les textes illisibles, les oreilles asymétriques"],
        ],
      },
    ],
  },
];

const TAKEAWAYS = [
  {
    topic: "Sur WhatsApp",
    text: "Inconnu = on ne répond pas, on ne clique pas, on bloque. Pas de code à 6 chiffres à personne.",
  },
  {
    topic: "Sur l'IA",
    text: "Cette semaine, posez UNE question à ChatGPT. Une recette, un mot inconnu, un mail à rédiger. C'est gratuit.",
  },
  {
    topic: "Sur les deepfakes",
    text: "Urgence + voix connue + argent demandé = raccrocher et rappeler soi-même sur le vrai numéro.",
  },
];

const ICON_MAP = {
  whatsapp: MessageCircle,
  ia: Bot,
};

export default function RetenirPage8() {
  return (
    <RecapFiche
      session={SESSION}
      winners={WINNERS}
      winnersLabel="Légendes du Défi des pros"
      winnersSub={WINNERS_SUB}
      sections={SECTIONS}
      icons={ICON_MAP}
      takeaways={TAKEAWAYS}
    />
  );
}
