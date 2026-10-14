import styles from './Clue.module.css'

export default function Clue({ index, activeIndex, type = 'danger', as: Tag = 'span', children }) {
  const isActive = activeIndex === index
  const isSeen = activeIndex > index

  const cls = [
    styles.clue,
    isActive ? styles.active : '',
    isSeen ? styles.seen : '',
    type === 'ok' ? styles.ok : styles.danger,
  ].filter(Boolean).join(' ')

  return (
    <Tag className={cls}>
      {(isActive || isSeen) && (
        <span className={styles.badge}>{index + 1}</span>
      )}
      {children}
    </Tag>
  )
}
