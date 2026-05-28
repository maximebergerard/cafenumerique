import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLargeFont } from '../../hooks/useLargeFont.js'
import WhatsappFrame from '../../components/WhatsappFrame.jsx'
import styles from './WhatsappGroupe.module.css'

const SENDERS = {
  michele: { name: 'Michèle', color: '#1a73e8', bg: '#e3f0fd' },
  gerard:  { name: 'Gérard',  color: '#7b1fa2', bg: '#f3e8fa' },
  sophie:  { name: 'Sophie',  color: '#c65100', bg: '#fff3e0' },
  bernard: { name: 'Bernard', color: '#b71c1c', bg: '#fdecea' },
}

// ------ Message sub-components ------

function VoiceMsg({ duration, time }) {
  return (
    <div className={styles.voiceBubble}>
      <button className={styles.voicePlay} aria-label="Écouter">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <div className={styles.voiceWave}>
        {[4,8,14,10,18,12,7,16,9,13,5,11,8,15,6,12,17,9,14,7].map((h, i) => (
          <span key={i} className={styles.waveBar} style={{ height: h + 'px' }} />
        ))}
      </div>
      <span className={styles.voiceDuration}>{duration}</span>
      <span className={styles.bubbleTime}>{time}</span>
    </div>
  )
}

function GifMsg({ emoji, label, time }) {
  return (
    <div className={styles.gifBubble}>
      <div className={styles.gifThumb}>
        <span className={styles.gifEmoji}>{emoji}</span>
        <span className={styles.gifLabel}>GIF</span>
      </div>
      {label && <p className={styles.gifCaption}>{label}</p>}
      <span className={styles.bubbleTime}>{time}</span>
    </div>
  )
}

function GifBatchMsg({ count, time }) {
  return (
    <div className={styles.gifBatchBubble}>
      <div className={styles.gifBatchRow}>
        {['😸', '🐱', '😹'].map((e, i) => (
          <div key={i} className={styles.gifBatchThumb}><span>{e}</span><span className={styles.gifLabel}>GIF</span></div>
        ))}
        <div className={styles.gifBatchMore}>+{count}</div>
      </div>
      <span className={styles.bubbleTime}>{time}</span>
    </div>
  )
}

function ReplyMsg({ replyFrom, replyFromColor, replyText, replyAge, text, time }) {
  return (
    <div className={styles.replyBubble}>
      <div className={styles.replyQuote} style={{ borderLeftColor: replyFromColor }}>
        <span className={styles.replyFrom} style={{ color: replyFromColor }}>{replyFrom}</span>
        <span className={styles.replyAge}> · {replyAge}</span>
        <p className={styles.replyText}>{replyText}</p>
      </div>
      <p className={styles.replyMain}>{text}</p>
      <span className={styles.bubbleTime}>{time}</span>
    </div>
  )
}

function PhotoMsg({ time }) {
  return (
    <div className={styles.photoBubble}>
      <div className={styles.photoThumb}>
        <span className={styles.photoEmoji}>🦶</span>
      </div>
      <span className={styles.bubbleTime}>{time}</span>
    </div>
  )
}

function SystemMsg({ text }) {
  return <div className={styles.systemMsg}>{text}</div>
}

function GroupBubble({ sender, children }) {
  const s = SENDERS[sender]
  return (
    <div className={styles.groupBubble}>
      <div className={styles.groupAvatar} style={{ background: s.bg, color: s.color }}>{s.name[0]}</div>
      <div className={styles.groupBubbleInner}>
        <span className={styles.groupSenderName} style={{ color: s.color }}>{s.name}</span>
        {children}
      </div>
    </div>
  )
}

// ------ Messages data ------

// step: which button press reveals this message (1-based)
const MESSAGES = [
  {
    id: 1, step: 1,
    render: () => (
      <GroupBubble sender="michele">
        <VoiceMsg duration="3:12" time="07:02" />
      </GroupBubble>
    ),
    note: '...à 7h02 du matin.',
  },
  {
    id: 2, step: 2,
    render: () => (
      <GroupBubble sender="gerard">
        <GifMsg emoji="🐱" label="GIF chaton adorable !" time="08:14" />
      </GroupBubble>
    ),
  },
  {
    id: 3, step: 2,
    render: () => (
      <GroupBubble sender="gerard">
        <GifBatchMsg count={13} time="08:15" />
      </GroupBubble>
    ),
    note: '14 GIFs au total.',
  },
  {
    id: 4, step: 3,
    render: () => (
      <GroupBubble sender="sophie">
        <ReplyMsg
          replyFrom="Michèle"
          replyFromColor={SENDERS.michele.color}
          replyText="On se retrouve samedi pour le repas ?"
          replyAge="il y a 3 semaines"
          text="ok"
          time="10:47"
        />
      </GroupBubble>
    ),
  },
  {
    id: 5, step: 4,
    render: () => <SystemMsg text="Marie-Claude a ajouté Roger Dubois" />,
  },
  {
    id: 6, step: 5,
    render: () => (
      <GroupBubble sender="bernard">
        <div className={styles.capsMsg}>
          <p className={styles.capsText}>QUELQU'UN A MES LUNETTES&nbsp;?</p>
          <span className={styles.bubbleTime}>14:06</span>
        </div>
      </GroupBubble>
    ),
  },
  {
    id: 7, step: 6,
    render: () => (
      <GroupBubble sender="gerard">
        <PhotoMsg time="18:51" />
      </GroupBubble>
    ),
    note: 'Envoi accidentel.',
  },
]

const MAX_STEP = 6

// ------ Main component ------

export default function WhatsappGroupe() {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [large, toggleFont] = useLargeFont()
  const bottomRef = useRef(null)

  const visible = MESSAGES.filter(m => m.step <= step)
  const isDone = step >= MAX_STEP
  const lastNote = visible.length > 0 ? visible[visible.length - 1].note : null

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [step])

  // Auto-play: advance every 2s
  useEffect(() => {
    if (!isPlaying || isDone) return
    const timer = setInterval(() => {
      setStep(s => Math.min(s + 1, MAX_STEP))
    }, 2000)
    return () => clearInterval(timer)
  }, [isPlaying, isDone])

  // Stop when done
  useEffect(() => {
    if (isDone) setIsPlaying(false)
  }, [isDone])

  function handleStart() {
    setStep(1)
    setIsPlaying(true)
  }

  function handleManualNext() {
    setIsPlaying(false)
    setStep(s => Math.min(s + 1, MAX_STEP))
  }

  function handleReset() {
    setStep(0)
    setIsPlaying(false)
  }

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Link to="/arnaques" className={styles.backBtn}>← Retour</Link>
        <span className={styles.topTitle}>Ice-breaker CN8 - Le groupe famille de l'enfer</span>
        <span className={styles.topStep}>
          {step === 0 ? 'Prêt à démarrer' : `Étape ${step} / ${MAX_STEP}`}
        </span>
        <button className="font-toggle-btn" style={{ color: 'rgba(255,255,255,0.7)' }} onClick={toggleFont} title="Taille du texte">
          {large ? 'A−' : 'A+'}
        </button>
      </div>

      <div className={styles.frameArea}>
        <WhatsappFrame
          contactName="Famille ❤️"
          contactAvatar="👨‍👩‍👧‍👦"
          contactStatus="Gérard, Michèle, Sophie, Bernard, Marie-Claude, Roger…"
          isUnknown={false}
        >
          {step === 0 && (
            <div className={styles.emptyHint}>
              <p>Le groupe est silencieux...<br />pour l'instant. 🤫</p>
            </div>
          )}
          {visible.map(m => (
            <div key={m.id} className={styles.msgEntry}>
              {m.render()}
            </div>
          ))}
          <div ref={bottomRef} />
        </WhatsappFrame>
      </div>

      <div className={styles.controls}>
        {isDone && (
          <div className={styles.questionCard}>
            <p className={styles.questionIcon}>😄</p>
            <p className={styles.questionText}>
              Vous vous reconnaissez dans certains de ces messages&nbsp;?
            </p>
            <p className={styles.questionSub}>
              "Dans cet atelier, on va apprendre à maîtriser tout ça - et peut-être même convaincre Gérard d'arrêter les GIFs de chatons."
            </p>
          </div>
        )}

        {lastNote && !isDone && (
          <span className={styles.noteChip}>{lastNote}</span>
        )}

        {step === 0 ? (
          <button className={styles.btnNext} onClick={handleStart}>
            ▶ Démarrer
          </button>
        ) : !isDone ? (
          isPlaying ? (
            <button className={styles.btnPause} onClick={() => setIsPlaying(false)}>
              ⏸ Pause
            </button>
          ) : (
            <div className={styles.btnRow}>
              <button className={styles.btnPlay} onClick={() => setIsPlaying(true)}>▶ Play</button>
              <button className={styles.btnNext} onClick={handleManualNext}>→ Suivant</button>
            </div>
          )
        ) : (
          <button className={styles.btnReset} onClick={handleReset}>↺ Recommencer</button>
        )}
      </div>
    </div>
  )
}
