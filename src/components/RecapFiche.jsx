import { Bot, MessageSquare, ExternalLink } from "lucide-react";
import Layout from "./Layout.jsx";
import { Breadcrumb } from "./ContentBlocks.jsx";
import styles from "../pages/RetenirPage.module.css";

// "Nicole & Marie-Lise" à deux, "Nicole, Marie-Lise & Isabelle" au-delà
function listeDePrenoms(noms) {
  if (noms.length < 2) return noms.join('')
  return `${noms.slice(0, -1).join(', ')} & ${noms.at(-1)}`
}

// Fiche "Ce qu'il faut retenir" d'une séance (à partir de la #8).
// Chaque page RetenirPageN.jsx ne contient que ses données et appelle ce composant.
//
// Props :
//   session     "Café numérique #9"
//   winners     null (vainqueurs à révéler) ou ['Prénom', 'Prénom']
//   winnersLabel, winnersSub  textes du bloc vainqueurs
//   sections    [{ icon, title, blocks: [{ heading, items | steps | bullets | links | resource }] }]
//   icons       { clé: ComposantIcône } pour `section.icon`
//   takeaways   [{ topic, text }]
export default function RecapFiche({
  session,
  winners = null,
  winnersLabel,
  winnersSub,
  sections,
  icons = {},
  takeaways,
}) {
  return (
    <Layout>
      <div className={styles.crumbsBar}>
        <Breadcrumb
          crumbs={[{ to: "/recaps", label: "Récaps" }]}
          current={session}
          className={styles.crumbs}
        />
      </div>
      <header className={styles.header}>
        <div className={styles.session}>{session}</div>
        <h1 className={styles.title}>Ce qu'il faut retenir</h1>
      </header>

      <div className={styles.main}>

        {/* ── Bloc vainqueurs ── */}
        <div className={winners ? styles.winnersCard : styles.winnersCardPending}>
          <div className={styles.winnersTrophy}>🏆</div>
          {winners ? (
            <>
              <div className={styles.winnersLabel}>{winnersLabel}</div>
              <div className={styles.winnersNames}>
                {listeDePrenoms(winners)}
              </div>
              <div className={styles.winnersSub}>
                {winnersSub ?? `Inscrits à jamais dans les annales du ${session}`}
              </div>
            </>
          ) : (
            <>
              <div className={styles.winnersLabel}>{winnersLabel}</div>
              <div className={styles.winnersPending}>??? & ???</div>
              <div className={styles.winnersSub}>
                Les vainqueurs seront révélés très bientôt...
              </div>
            </>
          )}
        </div>

        {sections.map((section) => {
          const Icon = icons[section.icon] || Bot;
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
          {takeaways.map((t) => (
            <div key={t.topic} className={styles.takeaway}>
              <div className={styles.takeawayTopic}>{t.topic}</div>
              <div className={styles.takeawayText}>{t.text}</div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}
