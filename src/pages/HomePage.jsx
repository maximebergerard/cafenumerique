import { Link } from "react-router-dom";
import {
  ShieldAlert,
  Bot,
  Smartphone,
  Mail,
  Users,
  HelpCircle,
  Play,
  Theater,
  FileText,
} from "lucide-react";
import Layout from "../components/Layout.jsx";
import SceneDecor from "../components/SceneDecor.jsx";
import styles from "./HomePage.module.css";

const THEMES = [
  {
    Icon: ShieldAlert,
    label: "Arnaques en ligne",
    desc: "Phishing, faux SMS, pop-ups alarmantes… apprendre à repérer les signaux d'alarme.",
  },
  {
    Icon: Bot,
    label: "Intelligence artificielle",
    desc: "Comprendre ce que c'est, comment s'en servir, et pourquoi il faut vérifier les infos.",
  },
  {
    Icon: Smartphone,
    label: "Réseaux sociaux",
    desc: "Vie privée, paramètres, lexique des jeunes, algorithmes et désinformation.",
  },
  {
    Icon: Mail,
    label: "Messagerie & mails",
    desc: "Boîtes mail, pièces jointes, spam, et bonnes pratiques du quotidien.",
  },
];

const HOW_IT_WORKS = [
  {
    Icon: Users,
    step: "1",
    title: "Un atelier de 2h",
    desc: "En petit groupe (6 à 10 personnes), dans un lieu de proximité.",
  },
  {
    Icon: HelpCircle,
    step: "2",
    title: "Aucun prérequis",
    desc: "On part de vos questions et de vos expériences réelles.",
  },
  {
    Icon: Play,
    step: "3",
    title: "On apprend en faisant",
    desc: "Jeux de rôle, simulations, mises en situation - pas de cours magistral.",
  },
];

export default function HomePage() {
  return (
    <Layout>
      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <SceneDecor />
          <div className={styles.heroInner}>
            <div className={styles.heroBadge}>Ateliers numériques</div>
            <h1 className={styles.heroTitle}>Les Cafés numériques</h1>
            <p className={styles.heroSubtitle}>
              Des ateliers conviviaux pour apprivoiser le numérique - sans
              jargon, sans jugement, en petit groupe.
            </p>
            <div className={styles.heroCtas}>
              <a
                href="mailto:maxime.bergerard@gmail.com"
                className={styles.ctaPrimary}
              >
                Organiser un atelier
              </a>
              <Link to="/ateliers" className={styles.ctaSecondary}>
                Découvrir le format →
              </Link>
            </div>
          </div>
        </section>

        {/* Les thèmes */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Les thèmes abordés</h2>
            <p className={styles.sectionDesc}>
              Chaque atelier se concentre sur un sujet du quotidien numérique.
            </p>
            <div className={styles.themesGrid}>
              {THEMES.map(({ Icon, label, desc }) => (
                <div key={label} className={styles.themeCard}>
                  <div className={styles.themeIconWrap}>
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className={styles.themeLabel}>{label}</div>
                    <div className={styles.themeDesc}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Comment ça marche ?</h2>
            <div className={styles.stepsRow}>
              {HOW_IT_WORKS.map(({ Icon, step, title, desc }) => (
                <div key={step} className={styles.step}>
                  <div className={styles.stepNum}>{step}</div>
                  <Icon
                    size={20}
                    strokeWidth={1.75}
                    className={styles.stepIcon}
                  />
                  <div className={styles.stepTitle}>{title}</div>
                  <div className={styles.stepDesc}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ressources */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Ressources disponibles</h2>
            <div className={styles.resourcesRow}>
              <Link to="/arnaques" className={styles.resourceCard}>
                <div className={styles.resourceIconWrap}>
                  <Theater size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <div className={styles.resourceLabel}>
                    Simulations d'arnaques
                  </div>
                  <div className={styles.resourceDesc}>
                    6 mises en situation interactives à explorer en binôme ou en
                    groupe.
                  </div>
                </div>
                <span className={styles.resourceArrow}>→</span>
              </Link>
              <Link to="/recaps" className={styles.resourceCard}>
                <div className={styles.resourceIconWrap}>
                  <FileText size={24} strokeWidth={1.75} />
                </div>
                <div>
                  <div className={styles.resourceLabel}>Récaps des séances</div>
                  <div className={styles.resourceDesc}>
                    Les fiches "ce qu'il faut retenir" à consulter après chaque
                    atelier.
                  </div>
                </div>
                <span className={styles.resourceArrow}>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA contact */}
        <section className={`${styles.section} ${styles.sectionContact}`}>
          <SceneDecor />
          <div className={styles.sectionInner}>
            <h2 className={styles.contactTitle}>
              Vous souhaitez organiser un atelier ?
            </h2>
            <p className={styles.contactDesc}>
              Que ce soit pour une association, une mairie, une bibliothèque ou
              un groupe informel - contactez-moi pour en discuter.
            </p>
            <a
              href="mailto:maxime.bergerard@gmail.com"
              className={styles.ctaPrimary}
            >
              Écrire à Maxime
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
