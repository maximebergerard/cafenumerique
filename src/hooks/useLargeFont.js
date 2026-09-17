import { useSyncExternalStore } from 'react'

// Préférence "gros caractères", mémorisée sur l'appareil.
// useSyncExternalStore : la page pré-rendue (sans préférence) s'hydrate sans
// erreur, puis le bouton se met à jour avec la préférence de l'appareil.
const listeners = new Set()

function read() {
  try {
    return localStorage.getItem('largeFont') === 'true'
  } catch {
    return false
  }
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useLargeFont() {
  const large = useSyncExternalStore(subscribe, read, () => false)

  function toggle() {
    const next = !read()
    try {
      localStorage.setItem('largeFont', String(next))
    } catch {
      // stockage indisponible (navigation privée) : on applique quand même
    }
    document.documentElement.classList.toggle('large-fonts', next)
    listeners.forEach((l) => l())
  }

  return [large, toggle]
}
