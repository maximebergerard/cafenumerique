import { Link } from "react-router-dom";
import { Sparkles, Theater, FileText } from "lucide-react";
import Layout from "../components/Layout.jsx";
import { CupComposition, Squiggle, BandShapes } from "../components/Shapes.jsx";
import { ICONS, DOT_COLORS } from "../components/icons.js";
import { ATELIERS, SUR_MESURE } from "../content/ateliers.js";
import { GUIDES } from "../content/guides.js";
import { INTERVENANT, STRUCTURES } from "../content/site.js";
import styles from "./HomePage.module.css";

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Un atelier de 2h",
    desc: "En petit groupe, jusqu'à 10 personnes, directement dans vos locaux.",
  },
  {
    step: "2",
    title: "Aucun prérequis",
    desc: "Pensé pour les grands débutants. On part des questions et des expériences de chacun.",
  },
  {
    step: "3",
    title: "On apprend en faisant",
    desc: "Théâtre-forum, simulations réalistes, pratique guidée : pas de cours magistral.",
  },
];

export default function HomePage() {
  return (
    <Layout>
      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
            <p className={styles.heroBadge}>Cafés numériques · Maxime Bergerard</p>
            <h1 className={styles.heroTitle}>
              Des ateliers numériques{" "}
              <span className={styles.marked}>
                conviviaux
                <Squiggle className={styles.squiggle} />
              </span>{" "}
              pour adultes et seniors
            </h1>
            <p className={styles.heroSubtitle}>
              Arnaques en ligne, intelligence artificielle, WhatsApp : on
              apprivoise le numérique sans jargon, sans jugement, en petit
              groupe.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/organiser-un-atelier" className={styles.ctaPrimary}>
                Organiser un atelier
              </Link>
              <Link to="/ateliers" className={styles.ctaSecondary}>
                Découvrir les ateliers
              </Link>
            </div>
            </div>
            <CupComposition className={styles.heroArt} />
          </div>
        </section>

        {/* Les ateliers */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Les ateliers</h2>
            <p className={styles.sectionDesc}>
              Chaque atelier se concentre sur un sujet du quotidien numérique.
            </p>
            <div className={styles.themesGrid}>
              {ATELIERS.map((a, i) => {
                const Icon = ICONS[a.icon];
                return (
                  <Link
                    key={a.slug}
                    to={`/ateliers/${a.slug}`}
                    className={styles.themeCard}
                  >
                    <div className={styles.themeIconWrap} style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}>
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className={styles.themeLabel}>{a.nom}</h3>
                      <p className={styles.themeDesc}>{a.accroche}</p>
                    </div>
                  </Link>
                );
              })}
              <Link to="/contact" className={styles.themeCard}>
                <div className={styles.themeIconWrap} style={{ background: DOT_COLORS[ATELIERS.length % DOT_COLORS.length] }}>
                  <Sparkles size={22} strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className={styles.themeLabel}>{SUR_MESURE.titre}</h3>
                  <p className={styles.themeDesc}>{SUR_MESURE.texte}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
            <div className={styles.stepsRow}>
              {HOW_IT_WORKS.map(({ step, title, desc }) => (
                <div key={step} className={styles.step}>
                  <div className={styles.stepNum}>{step}</div>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pour qui */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Pour votre structure</h2>
            <p className={styles.sectionDesc}>
              J'interviens auprès des structures qui accueillent des adultes
              et des seniors.{" "}
              <Link to="/organiser-un-atelier">Comment ça se passe</Link>
            </p>
            <div className={styles.themesGrid}>
              {STRUCTURES.map((s, i) => {
                const Icon = ICONS[s.icon];
                return (
                  <div key={s.titre} className={styles.themeCard}>
                    <div className={styles.themeIconWrap} style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}>
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className={styles.themeLabel}>{s.titre}</h3>
                      <p className={styles.themeDesc}>{s.texte}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ressources */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Ressources gratuites</h2>
            <p className={styles.sectionDesc}>
              Pour les participants, et pour tous ceux qui veulent se protéger.
            </p>
            <div className={styles.resourcesRow}>
              {GUIDES.map((g) => (
                <Link
                  key={g.slug}
                  to={`/guides/${g.slug}`}
                  className={styles.resourceCard}
                >
                  <div>
                    <div className={styles.resourceLabel}>{g.titre}</div>
                    <div className={styles.resourceDesc}>Guide · {g.theme}</div>
                  </div>
                </Link>
              ))}
              <Link to="/arnaques" className={styles.resourceCard}>
                <div className={styles.resourceIconWrap}>
                  <Theater size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <div className={styles.resourceLabel}>
                    Simulations d'arnaques
                  </div>
                  <div className={styles.resourceDesc}>
                    Des mises en situation réalistes pour s'entraîner.
                  </div>
                </div>
              </Link>
              <Link to="/recaps" className={styles.resourceCard}>
                <div className={styles.resourceIconWrap}>
                  <FileText size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <div className={styles.resourceLabel}>Récaps des séances</div>
                  <div className={styles.resourceDesc}>
                    Les fiches « ce qu'il faut retenir » après chaque atelier.
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Intervenant */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>L'intervenant</h2>
            <p className={styles.sectionDesc}>
              <strong>{INTERVENANT.nom}</strong>, {INTERVENANT.role.charAt(0).toLowerCase() + INTERVENANT.role.slice(1)}.{" "}
              {INTERVENANT.bio[1]}{" "}
              <Link to="/a-propos">En savoir plus</Link>
            </p>
          </div>
        </section>

        {/* CTA contact */}
        <section className={`${styles.section} ${styles.sectionContact}`}>
          <BandShapes className={styles.contactShapes} />
          <div className={styles.sectionInner}>
            <h2 className={styles.contactTitle}>
              Vous souhaitez organiser un atelier ?
            </h2>
            <p className={styles.contactDesc}>
              Médiathèque, mairie, résidence seniors, association : parlons
              de votre public, le programme s'adapte à vos besoins.
            </p>
            <Link to="/contact" className={styles.ctaPrimary}>
              Écrire à Maxime
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
