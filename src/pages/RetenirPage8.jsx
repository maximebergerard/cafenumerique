import {
  MessageCircle,
  Bot,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./RetenirPage.module.css";

const SESSION = "Café numérique #8";

// ✏️ VAINQUEURS — À remplir après la séance !
// Remplace null par un tableau de prénoms, ex : ['Marie', 'Jean-Pierre']
// Laisse null pour afficher le placeholder mystère
const WINNERS = null

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
    <div className={styles.page}>
      <nav className={styles.topNav}>
        <Link to="/recaps" className={styles.topNavBack}>← Récaps</Link>
      </nav>
      <header className={styles.header}>
        <div className={styles.session}>{SESSION}</div>
        <h1 className={styles.title}>Ce qu'il faut retenir</h1>
      </header>

      <main className={styles.main}>

        {/* ── Bloc vainqueurs ── */}
        <div className={WINNERS ? styles.winnersCard : styles.winnersCardPending}>
          <div className={styles.winnersTrophy}>🏆</div>
          {WINNERS ? (
            <>
              <div className={styles.winnersLabel}>Légendes du Défi des pros</div>
              <div className={styles.winnersNames}>
                {WINNERS.join(' & ')}
              </div>
              <div className={styles.winnersSub}>
                Inscrits à jamais dans les annales du Café numérique #8
              </div>
            </>
          ) : (
            <>
              <div className={styles.winnersLabel}>Légendes du Défi des pros</div>
              <div className={styles.winnersPending}>??? & ???</div>
              <div className={styles.winnersSub}>
                Les vainqueurs seront révélés très bientôt...
              </div>
            </>
          )}
        </div>

        {SECTIONS.map((section) => {
          const Icon = ICON_MAP[section.icon] || Bot;
          return (
            <section key={section.title} className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIconWrap}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>

              {section.blocks?.map((block) => (
                <div key={block.heading} className={styles.block}>
                  <div className={styles.blockHeading}>{block.heading}</div>

                  {block.items && (
                    <ul className={styles.itemList}>
                      {block.items.map(([label, value]) => (
                        <li key={label} className={styles.item}>
                          <span className={styles.itemLabel}>{label}</span>
                          <span className={styles.itemValue}>{value}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {block.steps && (
                    <ol className={styles.steps}>
                      {block.steps.map((s, i) => (
                        <li key={i} className={styles.step}>
                          <span className={styles.stepNum}>{i + 1}</span>
                          <span className={styles.stepText}>{s}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {block.bullets && (
                    <ul className={styles.bullets}>
                      {block.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {block.links && (
                    <div className={styles.linkList}>
                      {block.links.map((l) => (
                        <a
                          key={l.name}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.toolLink}
                        >
                          {l.name}
                          <span className={styles.linkUrl}>
                            {l.url.replace("https://", "")}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  {block.resource && (
                    <a
                      href={block.resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resourceLink}
                    >
                      <ExternalLink size={14} strokeWidth={2} />
                      {block.resource.label}
                    </a>
                  )}
                </div>
              ))}
            </section>
          );
        })}

        {/* Les 3 choses à retenir */}
        <section className={styles.takeawaySection}>
          <div className={styles.sectionHeader}>
            <div className={`${styles.sectionIconWrap} ${styles.sectionIconWrapLight}`}>
              <MessageSquare size={18} strokeWidth={2} />
            </div>
            <h2 className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
              Les 3 choses à retenir
            </h2>
          </div>
          {TAKEAWAYS.map((t) => (
            <div key={t.topic} className={styles.takeaway}>
              <div className={styles.takeawayTopic}>{t.topic}</div>
              <div className={styles.takeawayText}>{t.text}</div>
            </div>
          ))}
        </section>
      </main>

      <footer className={styles.footer}>
        Créé avec soin pour les Cafés numériques
      </footer>
    </div>
  );
}
