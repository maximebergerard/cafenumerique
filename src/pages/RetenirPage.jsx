import {
  ShieldAlert,
  Bot,
  Smartphone,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import styles from "./RetenirPage.module.css";

// ── Numéro de séance - à mettre à jour à chaque café numérique ──
const SESSION = "Café numérique #7";

const SECTIONS = [
  {
    icon: "arnaques",
    title: "Arnaques en ligne",
    blocks: [
      {
        heading: "Les signaux d'alarme",
        items: [
          ["Un message urgent", "→ on s'arrête, on réfléchit"],
          ["Un lien bizarre ou raccourci", "→ on ne clique pas"],
          ["Un petit montant demandé", "→ c'est fait pour sembler anodin"],
          ["Un numéro ou mail expéditeur inconnu", "→ on vérifie"],
        ],
      },
      {
        heading: "Les règles d'or",
        items: [
          [
            "La banque, les impôts, la police",
            "ne demandent jamais votre code ou mot de passe",
          ],
          [
            "Le cadenas dans le navigateur",
            "ne veut pas dire que le site est honnête",
          ],
          ["En cas de doute", "→ on rappelle soi-même sur le numéro officiel"],
          ["On en parle à un proche", "avant d'agir"],
        ],
      },
      {
        heading: "La ressource",
        resource: {
          label: "cybermalveillance.gouv.fr",
          url: "https://www.cybermalveillance.gouv.fr",
        },
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
          "Un programme qui a lu des milliards de textes et sait répondre à des questions",
          "Un assistant très cultivé - mais qui peut se tromper et inventer des choses",
          "Pas de la magie : c'est un outil, comme un moteur de recherche évolué",
        ],
      },
      {
        heading: "Les outils gratuits",
        links: [
          { name: "ChatGPT", url: "https://chat.openai.com" },
          { name: "Claude", url: "https://claude.ai" },
          { name: "Gemini", url: "https://gemini.google.com" },
          { name: "Suno", url: "https://suno.com" },
          { name: "MagicSchool", url: "https://www.magicschool.ai" },
        ],
      },
      {
        heading: "Comment bien l'utiliser",
        bullets: [
          "Dire qui on veut qu'il soit + ce qu'on veut + pourquoi",
          "Plus on est précis, meilleure est la réponse",
          "Toujours vérifier les infos importantes ailleurs",
        ],
      },
      {
        heading: "Ce qu'on peut en faire",
        bullets: [
          "Poser des questions comme à un expert",
          "Rédiger un mail, un courrier, une lettre",
          "Créer une image à partir de mots",
          "Trouver des idées, des recettes, préparer un voyage",
        ],
      },
    ],
  },
  {
    icon: "lexique",
    title: "Story, Like, Reel… le lexique",
    lexique: [
      ["Story", "Photo/vidéo qui disparaît en 24h"],
      ["Like", 'Le pouce ou cœur pour dire "j\'aime"'],
      ["Reel", "Courte vidéo avec musique"],
      ["DM", "Message privé"],
      ["Mème", "Image humoristique qui se partage"],
      ["Hashtag", "# pour regrouper des publications"],
      ["Viral", "Vu par des millions de personnes"],
      ["Ghoster", "Disparaître sans prévenir"],
      ["IRL", "Dans la vraie vie"],
      ["Lol", "C'est drôle / je ris"],
      ["Chelou", "Bizarre, louche"],
      ["Scroller", "Faire défiler avec le doigt"],
    ],
  },
];

const TAKEAWAYS = [
  {
    topic: "Sur les arnaques",
    text: "La règle numéro 1 : prendre le temps de souffler avant d'agir",
  },
  {
    topic: "Sur l'IA",
    text: "C'est un outil puissant mais imparfait. Essayez une fois cette semaine",
  },
  {
    topic: "Sur le lexique",
    text: "Le langage des jeunes a toujours existé. Maintenant vous parlez leur langue !",
  },
];

const ICON_MAP = {
  arnaques: ShieldAlert,
  ia: Bot,
  lexique: Smartphone,
};

export default function RetenirPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.session}>{SESSION}</div>
        <h1 className={styles.title}>Ce qu'il faut retenir</h1>
      </header>

      <main className={styles.main}>
        {SECTIONS.map((section) => {
          const Icon = ICON_MAP[section.icon] || ShieldAlert;
          return (
            <section key={section.title} className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIconWrap}>
                  <Icon size={18} strokeWidth={2} />
                </div>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>

              {/* Lexique spécial */}
              {section.lexique && (
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Mot</th>
                        <th>Définition rapide</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.lexique.map(([word, def]) => (
                        <tr key={word}>
                          <td className={styles.tableWord}>{word}</td>
                          <td>{def}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Blocs standard */}
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
            <div
              className={`${styles.sectionIconWrap} ${styles.sectionIconWrapLight}`}
            >
              <MessageSquare size={18} strokeWidth={2} />
            </div>
            <h2
              className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}
            >
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
