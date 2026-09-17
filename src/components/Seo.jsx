import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { findRoute, fullTitle, canonicalUrl, SITE_URL, DEFAULT_IMAGE, DEFAULT_DESCRIPTION } from '../seo/routes.js'

// Met à jour le <head> à chaque changement de page.
// Les balises existent déjà dans index.html (et sont pré-remplies par page au build) :
// on modifie leur contenu au lieu d'en ajouter, pour ne jamais créer de doublon.
function setContent(selector, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(el.tagName === 'LINK' ? 'href' : 'content', value)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = findRoute(pathname)
    const title = fullTitle(route)
    const url = canonicalUrl(pathname)

    document.title = title
    setContent('meta[name="robots"]', route.index ? 'index, follow' : 'noindex, nofollow')
    setContent('link[rel="canonical"]', url)
    setContent('meta[property="og:url"]', url)
    setContent('meta[property="og:title"]', title)
    setContent('meta[property="og:image"]', `${SITE_URL}${route.image ?? DEFAULT_IMAGE}`)
    setContent('meta[name="description"]', route.description ?? DEFAULT_DESCRIPTION)
    setContent('meta[property="og:description"]', route.description ?? DEFAULT_DESCRIPTION)
  }, [pathname])

  return null
}
