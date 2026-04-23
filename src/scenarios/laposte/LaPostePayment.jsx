import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LaPostePayment.module.css";

export default function LaPostePayment() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setRevealed(true);
  }

  return (
    <div className={styles.page}>
      {/* Barre navigateur - URL clairement suspecte */}
      <div className={styles.browserBar}>
        <div className={styles.browserDots}>
          <div className={`${styles.dot} ${styles.dotR}`} />
          <div className={`${styles.dot} ${styles.dotY}`} />
          <div className={`${styles.dot} ${styles.dotG}`} />
        </div>
        <div className={styles.browserUrl}>
          {/* Pas de cadenas HTTPS - red flag supplémentaire */}
          ⚠️ <span className={styles.urlDanger}>http://</span>
          <span className={styles.urlHighlight}>
            laposte-paiement-rapide.xyz
          </span>
          <span className={styles.urlText}>/fr/checkout?ref=FR882341XP</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          {/* En-tête */}
          <div className={styles.cardHeader}>
            <div className={styles.logo}>La Poste</div>
            <div className={styles.headerText}>
              <div className={styles.headerTitle}>Règlement sécurisé</div>
              <div className={styles.headerSub}>
                Frais de livraison - Colis FR882341XP
              </div>
            </div>
          </div>

          {/* Résumé commande */}
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Frais de douane colis FR882341XP</span>
              <span>2,49 €</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total à régler</span>
              <span>2,49 €</span>
            </div>
          </div>

          {/* Formulaire CB */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Numéro de carte</label>
              <input
                className={styles.input}
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Date d'expiration</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="MM/AA"
                  maxLength={5}
                  required
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Cryptogramme</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="CVV"
                  maxLength={3}
                  required
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Nom sur la carte</label>
              <input
                className={styles.input}
                type="text"
                placeholder="JEAN DUPONT"
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Payer 2,49 € →
            </button>
          </form>

          <div className={styles.trustBadges}>
            <span>🔒 Paiement sécurisé</span>
            <span>🛡️ 3D Secure</span>
            <span>✅ Certifié</span>
          </div>
        </div>
      </div>

      {/* Popup révélation */}
      {revealed && (
        <div
          className={styles.modalBackdrop}
          onClick={() => navigate("/laposte")}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTop}>
              <div className={styles.modalIcon}>💳</div>
              <div className={styles.modalBadge}>Arnaque réussie</div>
            </div>

            <h2 className={styles.modalTitle}>
              Votre carte vient d'être volée.
            </h2>
            <p className={styles.modalSub}>
              En situation réelle, ces données seraient déjà entre les mains des
              escrocs.{" "}
              <strong>Le groupe n'a pas réussi à vous arrêter à temps.</strong>
            </p>

            <div className={styles.divider} />

            <p className={styles.indicesLabel}>
              Ce que tout le monde aurait dû voir :
            </p>
            <div className={styles.indices}>
              <div className={styles.indice}>
                <span className={styles.indiceIcon}>🔓</span>
                <span>
                  <strong>HTTP sans cadenas</strong> - aucun site de paiement
                  sérieux n'utilise HTTP. HTTPS est obligatoire.
                </span>
              </div>
              <div className={styles.indice}>
                <span className={styles.indiceIcon}>🌐</span>
                <span>
                  <strong>laposte-paiement-rapide.xyz</strong> - le domaine
                  officiel de La Poste c'est laposte.fr, point.
                </span>
              </div>
              <div className={styles.indice}>
                <span className={styles.indiceIcon}>🛡️</span>
                <span>
                  <strong>Les badges "Sécurisé"</strong> sont des emojis collés
                  là pour rassurer - ils ne garantissent rien.
                </span>
              </div>
            </div>

            <button
              className={styles.modalBtn}
              onClick={() => navigate("/laposte")}
            >
              ← Retour au mail pour débriefer
            </button>
          </div>
        </div>
      )}

      {/* Bouton retour discret */}
      {!revealed && (
        <button className={styles.backBtn} onClick={() => navigate("/laposte")}>
          ← Retour au mail
        </button>
      )}
    </div>
  );
}
