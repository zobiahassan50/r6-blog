import { PAGE_OG } from './og'

/** Canonical production domain (connect when DNS is ready). */
export const SITE_URL = 'https://r6cheat.net'
export const SITE_NAME = 'R6 Siege Cheats'
export const SITE_HOST = 'r6cheat.net'

/**
 * Sole purpose statement — used in schema + about copy.
 * Product site for a third-party Rainbow Six Siege PC tool, paired with
 * original supporting articles.
 */
export const SITE_PURPOSE =
  'R6 Siege Cheats is a product site for a third-party Rainbow Six Siege PC tool. We pair the product page with original articles on what it includes, how buying and delivery work, PC compatibility, and an honest look at account risk and fair play.'

/** High-level topics used for knowsAbout / about-page copy. */
export const SITE_TOPICS = [
  'r6 siege cheats',
  'rainbow six siege cheats',
  'r6 cheats pc',
  'r6 esp wallhack anticheat',
  'r6 cheats compatibility',
  'r6 siege fair play and risk',
] as const

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

export const OG_IMAGE = PAGE_OG.home

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article' | 'product'
  /** Prefer /og/*.jpg (1200x630) for Google SERP thumbnails */
  image?: string
  imageAlt?: string
  robots?: string
}

const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const SEO = {
  home: {
    title: 'R6 Siege Cheats | Rainbow Six Siege PC Product & Articles',
    description:
      'R6 Siege Cheats for Rainbow Six Siege PC — product details, pricing from $35, and original articles on buying, compatibility and risk.',
    path: '/',
    ogType: 'website',
    image: PAGE_OG.home,
    imageAlt: 'R6 Siege Cheats — Rainbow Six Siege PC product site',
    robots: INDEX_ROBOTS,
  },
  product: {
    title: 'R6 Siege Cheats | PC Product Details & Checkout',
    description:
      'R6 Siege Cheats for Windows PC — module overview, compatibility notes, pricing from $35, and external checkout.',
    path: '/r6-cheats',
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'R6 Siege Cheats product details for PC',
    robots: INDEX_ROBOTS,
  },
  guides: {
    title: 'R6 Siege Cheats Articles | ESP, Wallhack, Compatibility & Risk',
    description:
      'Original articles about R6 Siege Cheats — features overview, R6 ESP and wallhack, anti-cheat context, settings, and hacks explainers.',
    path: '/guides',
    ogType: 'website',
    image: PAGE_OG.guides,
    imageAlt: 'R6 Siege Cheats articles hub',
    robots: INDEX_ROBOTS,
  },
  forums: {
    title: 'R6 Siege Cheats Guides | Setup, ESP, Compatibility & FAQ',
    description:
      'Forum-style R6 Siege Cheats guides — setup, ESP and aimbot terminology, BattlEye compatibility notes, configuration, troubleshooting, and FAQ before checkout.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_OG.community,
    imageAlt: 'R6 Siege Cheats forums and setup guides',
    robots: INDEX_ROBOTS,
  },
  faq: {
    title: 'R6 Siege Cheats FAQ',
    description:
      'Frequently asked questions about R6 Siege Cheats — pricing, checkout, compatibility and risk.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_OG.faq,
    imageAlt: 'R6 Siege Cheats frequently asked questions',
    robots: INDEX_ROBOTS,
  },
  contact: {
    title: 'Contact R6 Siege Cheats',
    description: 'Contact R6 Siege Cheats with questions about our articles or this site.',
    path: '/contact',
    ogType: 'website',
    image: PAGE_OG.contact,
    imageAlt: 'Contact R6 Siege Cheats',
    robots: INDEX_ROBOTS,
  },
  privacy: {
    title: 'Privacy Policy | R6 Siege Cheats',
    description: 'How R6 Siege Cheats handles site analytics and contact messages.',
    path: '/privacy',
    ogType: 'website',
    image: PAGE_OG.privacy,
    imageAlt: 'R6 Siege Cheats privacy policy',
    robots: INDEX_ROBOTS,
  },
  terms: {
    title: 'Terms of Use | R6 Siege Cheats',
    description: 'Terms of use for R6 Siege Cheats, including purchase and risk disclosures.',
    path: '/terms',
    ogType: 'website',
    image: PAGE_OG.terms,
    imageAlt: 'R6 Siege Cheats terms of use',
    robots: INDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'R6 Siege Cheats for PC',
  h2Features: 'R6 Siege',
  h2Featured: 'Forums',
  h2About: 'About R6 Siege Cheats',
  h2Access: 'R6 Siege Cheats product',
  h2Faq: 'R6 Siege Cheats FAQ',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
