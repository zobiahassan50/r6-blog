export type SeoMediaItem = {
  image: string
  alt: string
  title: string
  caption: string
}

export const HERO_POSTER = '/media/r6-hero-poster.webp'
export const HERO_POSTER_JPG = '/media/r6-hero-poster.jpg'
export const HERO_VIDEO = '/videos/r6-hero-preview.mp4'

/** Hub hero backgrounds only — never used on grid cards. */
export const FORUMS_HERO_VIDEO = '/videos/card-featured.mp4'
export const ARTICLES_HERO_VIDEO = '/videos/card-article.mp4'

/** @deprecated Use FORUMS_HERO_VIDEO / ARTICLES_HERO_VIDEO */
export const CARD_VIDEO_FEATURED = FORUMS_HERO_VIDEO
export const CARD_VIDEO_ARTICLE = ARTICLES_HERO_VIDEO

export const PLACEHOLDER_HOME = '/media/placeholder-home.jpg'
export const PLACEHOLDER_GUIDES = '/media/placeholder-guides.jpg'
export const PLACEHOLDER_COMMUNITY = '/media/placeholder-community.jpg'
export const PLACEHOLDER_FAQ = '/media/placeholder-faq.jpg'
export const PLACEHOLDER_CONTACT = '/media/placeholder-contact.jpg'
export const PLACEHOLDER_PRODUCT = '/media/placeholder-product.jpg'

export const PAGE_MEDIA = {
  home: {
    image: PLACEHOLDER_HOME,
    alt: 'Branded artwork for the R6 Siege Cheats home page',
    title: 'R6 Siege Cheats',
    caption: 'Rainbow Six Siege PC product listing with supporting articles.',
  },
  guides: {
    image: PLACEHOLDER_GUIDES,
    alt: 'Branded artwork for the R6 Siege Cheats guides and blogs hubs',
    title: 'R6 Siege Cheats Guides & Blogs',
    caption: 'Practical guides and editorial blogs in separate hubs.',
  },
  community: {
    image: PLACEHOLDER_COMMUNITY,
    alt: 'Branded artwork for the R6 Siege Cheats forums hub',
    title: 'R6 Siege Cheats Forums',
    caption: 'Community boards for product and support topics.',
  },
  faq: {
    image: PLACEHOLDER_FAQ,
    alt: 'Branded artwork for the R6 Siege Cheats FAQ page',
    title: 'R6 Siege Cheats FAQ',
    caption: 'Pricing, checkout, compatibility and risk questions.',
  },
  contact: {
    image: PLACEHOLDER_CONTACT,
    alt: 'Branded artwork for the R6 Siege Cheats support page',
    title: 'Support R6 Siege Cheats',
    caption: 'Send questions about our articles or this site.',
  },
  product: {
    image: PLACEHOLDER_PRODUCT,
    alt: 'Branded artwork for the R6 Siege Cheats product page',
    title: 'R6 Siege Cheats Product',
    caption: 'Modules, pricing and checkout for the PC product.',
  },
} as const satisfies Record<string, SeoMediaItem>

/** Canonical article stills for listing cards and article heroes (images only). */
const GUIDE_MEDIA: Record<string, SeoMediaItem> = {
  'features-overview': {
    image: '/media/blog-uploads/features-overview.jpg',
    alt: 'Branded card for the R6 Siege Cheats features overview article',
    title: 'Features Overview',
    caption: 'Module categories included with R6 Siege Cheats.',
  },
  'esp-wallhack-anticheat': {
    image: '/media/blog-uploads/esp-wallhack-anticheat.jpg',
    alt: 'Rainbow Six Siege Cheats 2026 R6 ESP wallhack and anti-cheat article artwork',
    title: 'R6 ESP, Wallhack and Anti-Cheat',
    caption: 'ESP, wallhack, aimbot terminology and BattlEye context for 2026.',
  },
  'pc-compatibility': {
    image: '/media/blog-uploads/pc-compatibility.jpg',
    alt: 'Rainbow Six Siege Cheats 2026 ESP wallhack and aimbot article artwork',
    title: 'Rainbow Six Siege Cheats 2026',
    caption: 'ESP, wallhack, aimbot and PC cheat terminology for 2026.',
  },
  'status-before-purchase': {
    image: '/media/blog-uploads/status-before-purchase.jpg',
    alt: 'R6 Cheats Settings 2026 no recoil radar and DMA article artwork',
    title: 'R6 Cheats Settings 2026',
    caption: 'No recoil, radar, triggerbot, silent aim and DMA terminology.',
  },
  'fair-play-risks': {
    image: '/media/blog-uploads/fair-play-risks.jpg',
    alt: 'Rainbow Six Siege Hacks 2026 wallhack skeleton ESP and chams article artwork',
    title: 'Rainbow Six Siege Hacks 2026',
    caption: 'Wallhack, skeleton ESP, operator ESP, gadget ESP and chams.',
  },
}

export function getGuideMedia(slug: string): SeoMediaItem {
  return GUIDE_MEDIA[slug] || PAGE_MEDIA.guides
}

export const getForumMedia = getGuideMedia
