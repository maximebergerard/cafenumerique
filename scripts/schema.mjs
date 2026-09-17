// Données structurées schema.org ajoutées au <head> des pages pré-rendues.
// Elles aident Google à comprendre qui propose quoi (sans promettre d'affichage enrichi).

import { SITE_URL, SITE_NAME, canonicalUrl } from '../src/seo/routes.js'
import { findAtelier, ATELIERS, FORMAT } from '../src/content/ateliers.js'
import { findGuide } from '../src/content/guides.js'
import { ORGANISER, INTERVENANT } from '../src/content/site.js'

const PERSON_ID = `${SITE_URL}/#maxime`
const WEBSITE_ID = `${SITE_URL}/#website`

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: INTERVENANT.nom,
  jobTitle: 'Expert en ingénierie numérique, animateur d’ateliers numériques',
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'HETIC' },
  url: `${SITE_URL}/a-propos`,
}

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'fr-FR',
  publisher: { '@id': PERSON_ID },
}

// Fil d'Ariane déduit de l'adresse : /guides/faux-sms-colis → Accueil › Guides › titre
const SECTION_LABELS = { ateliers: 'Les ateliers', guides: 'Guides' }
function breadcrumb(route) {
  const parts = route.path.split('/').filter(Boolean)
  if (parts.length === 0) return null
  const items = [{ name: 'Accueil', url: `${SITE_URL}/` }]
  if (parts.length > 1 && SECTION_LABELS[parts[0]]) {
    items.push({ name: SECTION_LABELS[parts[0]], url: canonicalUrl(`/${parts[0]}`) })
  }
  items.push({ name: route.title, url: canonicalUrl(route.path) })
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  }
}

function course(a) {
  return {
    '@type': 'Course',
    '@id': `${canonicalUrl(`/ateliers/${a.slug}`)}#atelier`,
    name: a.titre,
    description: a.objectifGlobal,
    url: canonicalUrl(`/ateliers/${a.slug}`),
    inLanguage: 'fr',
    provider: { '@id': PERSON_ID },
    audience: { '@type': 'Audience', audienceType: FORMAT.public },
    teaches: a.objectifs,
    educationalLevel: 'Débutant',
    timeRequired: 'PT2H',
  }
}

export function schemaFor(route) {
  const graph = []

  if (route.path === '/') {
    graph.push(website, person, {
      '@type': 'Service',
      name: SITE_NAME,
      serviceType: "Ateliers d'inclusion numérique",
      description:
        'Ateliers de 2h en petit groupe (10 personnes maximum) pour adultes et seniors : intelligence artificielle, arnaques en ligne, WhatsApp.',
      provider: { '@id': PERSON_ID },
      availableLanguage: 'fr',
      url: `${SITE_URL}/`,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Les ateliers',
        itemListElement: ATELIERS.map((a) => ({ '@type': 'Offer', itemOffered: { '@id': `${canonicalUrl(`/ateliers/${a.slug}`)}#atelier` } })),
      },
    }, ...ATELIERS.map(course))
  }

  if (route.path === '/a-propos') graph.push(person)

  if (route.schema === 'atelier') graph.push(course(findAtelier(route.slug)))

  if (route.schema === 'guide') {
    const g = findGuide(route.slug)
    graph.push({
      '@type': 'Article',
      headline: g.titre,
      description: g.seoDescription,
      inLanguage: 'fr-FR',
      datePublished: g.misAJour,
      dateModified: g.misAJour,
      author: { '@id': PERSON_ID },
      publisher: { '@id': PERSON_ID },
      mainEntityOfPage: canonicalUrl(route.path),
      image: `${SITE_URL}/og-image.png`,
    }, person)
  }

  if (route.schema === 'faq') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: ORGANISER.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.r },
      })),
    })
  }

  const crumbs = breadcrumb(route)
  if (crumbs) graph.push(crumbs)

  return graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null
}
