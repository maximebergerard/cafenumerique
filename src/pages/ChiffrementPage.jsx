import { useState } from "react";
import { Link } from "react-router-dom";
import { useLargeFont } from "../hooks/useLargeFont.js";
import styles from "./ChiffrementPage.module.css";

// Chiffrement César : décale les lettres A-Z/a-z, laisse les accents/chiffres/ponctuations intacts
function caesarEncrypt(text, shift) {
  return text
    .split("")
    .map((c) => {
      if (c >= "A" && c <= "Z")
        return String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65);
      if (c >= "a" && c <= "z")
        return String.fromCharCode(((c.charCodeAt(0) - 97 + shift) % 26) + 97);
      return c;
    })
    .join("");
}

const SHIFT = 7;
const DEFAULT_MSG = "Rendez-vous demain au supermarché";

// Affiche le message avec animation lettre par lettre pour montrer le chiffrement
function EncryptedText({ text }) {
  return (
    <span className={styles.encText} aria-label="message chiffré">
      {text.split("").map((c, i) => (
        <span
          key={i}
          className={/[a-zA-Z]/.test(c) ? styles.encLetter : styles.encPunct}
        >
          {c}
        </span>
      ))}
    </span>
  );
}

export default function ChiffrementPage() {
  const [large, toggleFont] = useLargeFont();
  const [message, setMessage] = useState(DEFAULT_MSG);
  const [mode, setMode] = useState(null); // null | 'sms' | 'whatsapp'
  const [phase, setPhase] = useState("idle"); // idle | sending | done
  const [bobDecrypted, setBobDecrypted] = useState(false);

  const msg = message.trim() || DEFAULT_MSG;
  const encrypted = caesarEncrypt(msg, SHIFT);
  const isDone = phase === "done";

  function send(m) {
    setMode(m);
    setBobDecrypted(false);
    setPhase("sending");
    setTimeout(() => setPhase("done"), 1200);
  }

  function reset() {
    setMode(null);
    setPhase("idle");
    setBobDecrypted(false);
  }

  return (
    <div className={styles.page}>
      {/* Barre navigation */}
      <div className={styles.topBar}>
        <Link to="/arnaques" className={styles.backBtn}>
          ← Retour
        </Link>
        <span className={styles.topTitle}>Le chiffrement de bout en bout</span>
        <button
          className="font-toggle-btn"
          style={{ color: "rgba(255,255,255,0.7)" }}
          onClick={toggleFont}
          title="Taille du texte"
        >
          {large ? "A−" : "A+"}
        </button>
      </div>

      <div className={styles.main}>
        {/* Intro */}
        {phase === "idle" && (
          <p className={styles.intro}>
            Choisissez comment Alice envoie son message à Bob — et observez ce
            que voit une personne malveillante qui intercepte la communication.
          </p>
        )}

        {/* Composer */}
        <div className={styles.composer}>
          <label className={styles.composerLabel}>✏️ Message d'Alice</label>
          <div className={styles.composerRow}>
            <input
              className={styles.composerInput}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (phase !== "idle") reset();
              }}
              maxLength={50}
              placeholder="Écrivez un message…"
            />
            {phase !== "idle" && (
              <button className={styles.btnReset} onClick={reset}>
                ↺
              </button>
            )}
          </div>

          {phase === "idle" && (
            <div className={styles.sendBtns}>
              <button className={styles.btnSms} onClick={() => send("sms")}>
                <span className={styles.btnIcon}>📨</span>
                <span className={styles.btnMain}>Envoyer par SMS</span>
                <span className={styles.btnSub}>
                  Non chiffré · comme une lettre ouverte
                </span>
              </button>
              <button className={styles.btnWa} onClick={() => send("whatsapp")}>
                <span className={styles.btnIcon}>🔒</span>
                <span className={styles.btnMain}>Envoyer via WhatsApp</span>
                <span className={styles.btnSub}>Chiffré de bout en bout</span>
              </button>
            </div>
          )}
        </div>

        {/* Scène 3 acteurs */}
        {phase !== "idle" && (
          <div className={styles.scene}>
            {/* ── ALICE ── */}
            <div className={styles.actor}>
              <div className={styles.actorHead}>
                <span className={styles.avatar}>👩</span>
                <strong className={styles.actorName}>Alice</strong>
                <span className={styles.actorRole}>Expéditrice</span>
              </div>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneBar}>
                  <span className={styles.appName}>
                    {mode === "sms" ? "SMS" : "WhatsApp"}
                  </span>
                </div>
                <div className={styles.bubbleSent}>
                  {msg}
                  {mode === "whatsapp" && (
                    <span className={styles.lockChip}>🔒 chiffré</span>
                  )}
                </div>
              </div>
              <div
                className={`${styles.modeBadge} ${mode === "sms" ? styles.modeSms : styles.modeWa}`}
              >
                {mode === "sms" ? "📨 SMS" : "💬 WhatsApp"}
              </div>
            </div>

            {/* ── FLÈCHE + paquet ── */}
            <div className={styles.arrowZone}>
              <div
                className={`${styles.arrowLine} ${isDone ? styles.arrowActive : ""}`}
              />
              <div
                className={`${styles.packet} ${phase === "sending" ? styles.packetFly : ""} ${isDone ? styles.packetDone : ""}`}
              >
                {mode === "sms" ? "✉️" : "🔒"}
              </div>
              <div className={styles.arrowTip}>→</div>
            </div>

            {/* ── INTERCEPTEUR ── */}
            <div className={`${styles.actor} ${styles.actorEvil}`}>
              <div className={styles.actorHead}>
                <span className={styles.avatar}>🕵️</span>
                <strong className={styles.actorName}>Intercepteur</strong>
                <span className={styles.actorRole}>Pirate / opérateur</span>
              </div>

              <div className={`${styles.phoneFrame} ${styles.phoneDark}`}>
                <div className={`${styles.phoneBar} ${styles.phoneBarDark}`}>
                  <span className={styles.appName}>Écoute réseau</span>
                </div>
                {!isDone ? (
                  <div className={styles.waiting}>…</div>
                ) : mode === "sms" ? (
                  <div className={styles.bubbleDanger}>
                    <span className={styles.seesBadge}>🔓 Il peut lire :</span>
                    <span>{msg}</span>
                  </div>
                ) : (
                  <div className={styles.bubbleEncrypted}>
                    <span className={styles.cantSeeBadge}>🔒 Il voit :</span>
                    <EncryptedText text={encrypted} />
                  </div>
                )}
              </div>

              {isDone && (
                <div
                  className={`${styles.verdict} ${mode === "sms" ? styles.verdictBad : styles.verdictGood}`}
                >
                  {mode === "sms"
                    ? "⚠️ Message exposé !"
                    : "✅ Message illisible"}
                </div>
              )}
            </div>

            {/* ── FLÈCHE 2 ── */}
            <div className={styles.arrowZone}>
              <div
                className={`${styles.arrowLine} ${isDone ? styles.arrowActive : ""}`}
              />
              <div className={styles.arrowTip}>→</div>
            </div>

            {/* ── BOB ── */}
            <div className={styles.actor}>
              <div className={styles.actorHead}>
                <span className={styles.avatar}>👨</span>
                <strong className={styles.actorName}>Bob</strong>
                <span className={styles.actorRole}>Destinataire</span>
              </div>

              <div className={styles.phoneFrame}>
                <div className={styles.phoneBar}>
                  <span className={styles.appName}>
                    {mode === "sms" ? "SMS" : "WhatsApp"}
                  </span>
                </div>
                {!isDone ? (
                  <div className={styles.waiting}>…</div>
                ) : mode === "sms" ? (
                  <div className={styles.bubbleReceived}>{msg}</div>
                ) : bobDecrypted ? (
                  <div className={styles.bubbleReceived}>✅ {msg}</div>
                ) : (
                  <div className={styles.bubbleEncryptedReceived}>
                    <EncryptedText text={encrypted} />
                  </div>
                )}
              </div>

              {isDone && mode === "whatsapp" && !bobDecrypted && (
                <button
                  className={styles.btnKey}
                  onClick={() => setBobDecrypted(true)}
                >
                  🔑 Utiliser ma clé privée
                </button>
              )}
              {isDone && mode === "whatsapp" && bobDecrypted && (
                <div className={`${styles.verdict} ${styles.verdictGood}`}>
                  ✅ Déchiffré !
                </div>
              )}
              {isDone && mode === "sms" && (
                <div className={`${styles.verdict} ${styles.verdictNeutral}`}>
                  📩 Reçu
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PANNEAU EXPLICATION SMS ── */}
        {isDone && mode === "sms" && (
          <div className={`${styles.explainBox} ${styles.explainDanger}`}>
            <p className={styles.explainTitle}>
              📬 Les SMS ne sont pas chiffrés
            </p>
            <p className={styles.explainBody}>
              Un SMS, c'est comme une lettre sans enveloppe. Votre opérateur
              téléphonique, et toute personne qui intercepte le réseau, peut
              lire vos messages en clair.
            </p>
          </div>
        )}

        {/* ── PANNEAU CLÉ DE CHIFFREMENT ── */}
        {isDone && mode === "whatsapp" && (
          <div className={styles.keyBox}>
            <div className={styles.keyHeader}>
              <span className={styles.keyIcon}>🔑</span>
              <span className={styles.keyTitle}>
                La clé secrète partagée entre Alice et Bob : décalage de{" "}
                <strong>+{SHIFT}</strong>
              </span>
            </div>

            <div className={styles.cipherTable}>
              {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((c) => (
                <div key={c} className={styles.cipherCell}>
                  <span className={styles.cellPlain}>{c}</span>
                  <span className={styles.cellArrow}>↓</span>
                  <span className={styles.cellCipher}>
                    {caesarEncrypt(c, SHIFT)}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.keyExample}>
              <span className={styles.keyExLabel}>Exemple :</span>
              <span className={styles.keyExPlain}>
                "{msg.substring(0, 12)}
                {msg.length > 12 ? "…" : ""}"
              </span>
              <span className={styles.keyExArrow}>→</span>
              <span className={styles.keyExEnc}>
                "{caesarEncrypt(msg.substring(0, 12), SHIFT)}
                {msg.length > 12 ? "…" : ""}"
              </span>
            </div>

            <p className={styles.keyNote}>
              <strong>
                Seul Bob possède la clé (+{SHIFT}) pour déchiffrer.
              </strong>{" "}
              L'intercepteur intercepte le message chiffré mais sans la clé, il
              ne peut pas le lire. En réalité, WhatsApp utilise un chiffrement
              bien plus sophistiqué (Signal Protocol), mais le principe est le
              même : seuls les deux interlocuteurs possèdent la clé.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
