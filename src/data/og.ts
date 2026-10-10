/**
 * Canonical 1200x630 JPEG Open Graph images for Google SERP thumbnails.
 */

export const OG_HOME = '/og/home.jpg'
export const OG_GUIDES = '/og/guides.jpg'
export const OG_COMMUNITY = '/og/community.jpg'
export const OG_PRODUCT = '/og/r6-cheats.jpg'
export const OG_FAQ = '/og/faq.jpg'
export const OG_CONTACT = '/og/contact.jpg'
export const OG_PRIVACY = '/og/privacy.jpg'
export const OG_TERMS = '/og/terms.jpg'

export const DEFAULT_OG = OG_HOME

export function guideOgImage(slug: string) {
  return `/og/guides-${slug}.jpg`
}

export function getOgImageForPath(path?: string): string {
  if (!path || path === '/') return OG_HOME
  if (path === '/guides') return OG_GUIDES
  if (path === '/forums' || path === '/community') return OG_COMMUNITY
  if (path === '/r6-cheats' || path === '/product') return OG_PRODUCT
  if (path === '/faq') return OG_FAQ
  if (path === '/contact') return OG_CONTACT
  if (path === '/privacy') return OG_PRIVACY
  if (path === '/terms') return OG_TERMS
  if (path.startsWith('/guides/')) {
    const slug = path.slice('/guides/'.length).replace(/\/$/, '')
    return guideOgImage(slug)
  }
  return OG_HOME
}

export const PAGE_OG = {
  home: OG_HOME,
  guides: OG_GUIDES,
  community: OG_COMMUNITY,
  product: OG_PRODUCT,
  faq: OG_FAQ,
  contact: OG_CONTACT,
  privacy: OG_PRIVACY,
  terms: OG_TERMS,
} as const
