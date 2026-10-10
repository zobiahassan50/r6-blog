import {
  PLACEHOLDER_HOME,
  PLACEHOLDER_GUIDES,
  PLACEHOLDER_COMMUNITY,
  PLACEHOLDER_FAQ,
  PLACEHOLDER_CONTACT,
  PLACEHOLDER_PRODUCT,
} from './media'
import { PAGE_OG, getOgImageForPath, guideOgImage } from './og'

export { PAGE_OG, getOgImageForPath, guideOgImage }

export type ImageSeoFields = {
  alt: string
  title: string
  caption: string
}

export type PageImageKey = 'home' | 'guides' | 'community' | 'faq' | 'contact' | 'product'

type PageImage = ImageSeoFields & { src: string; og: string }

export const PAGE_IMAGES: Record<PageImageKey, PageImage> = {
  home: {
    src: PLACEHOLDER_HOME,
    og: PAGE_OG.home,
    alt: 'Branded artwork for R6 Siege Cheats',
    title: 'R6 Siege Cheats',
    caption: 'Rainbow Six Siege PC product listing with supporting articles.',
  },
  guides: {
    src: PLACEHOLDER_GUIDES,
    og: PAGE_OG.guides,
    alt: 'Branded artwork for the R6 Siege Cheats articles hub',
    title: 'R6 Siege Cheats Articles',
    caption: 'Features, buying, compatibility and fair-play articles in one hub.',
  },
  community: {
    src: PLACEHOLDER_COMMUNITY,
    og: PAGE_OG.community,
    alt: 'Branded artwork for the R6 Siege Cheats forums hub',
    title: 'R6 Siege Cheats Forums',
    caption: 'Forum-style setup and compatibility guides.',
  },
  faq: {
    src: PLACEHOLDER_FAQ,
    og: PAGE_OG.faq,
    alt: 'Branded artwork for the R6 Siege Cheats FAQ page',
    title: 'R6 Siege Cheats FAQ',
    caption: 'Pricing, checkout, compatibility and risk questions answered.',
  },
  contact: {
    src: PLACEHOLDER_CONTACT,
    og: PAGE_OG.contact,
    alt: 'Branded artwork for the R6 Siege Cheats contact page',
    title: 'Contact R6 Siege Cheats',
    caption: 'Send questions about our articles or this site.',
  },
  product: {
    src: PLACEHOLDER_PRODUCT,
    og: PAGE_OG.product,
    alt: 'Branded artwork for the R6 Siege Cheats product page',
    title: 'R6 Siege Cheats Product',
    caption: 'Modules, pricing and checkout for the PC product.',
  },
}

export function getOgImage(path?: string): string {
  return getOgImageForPath(path)
}

export function getPageImage(key: PageImageKey) {
  return PAGE_IMAGES[key]
}

export function getImageAlt(key: PageImageKey, fallbackName: string): string {
  const entry = PAGE_IMAGES[key]
  return entry ? entry.alt : `${fallbackName} placeholder artwork`
}

export function getImageTitle(key: PageImageKey, fallbackName: string): string {
  const entry = PAGE_IMAGES[key]
  return entry ? entry.title : fallbackName
}
