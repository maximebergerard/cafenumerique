import { useState, useEffect } from 'react'

export function useLargeFont() {
  const [large, setLarge] = useState(() =>
    localStorage.getItem('largeFont') === 'true'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('large-fonts', large)
  }, [large])

  function toggle() {
    setLarge(l => {
      const next = !l
      localStorage.setItem('largeFont', String(next))
      return next
    })
  }

  return [large, toggle]
}
