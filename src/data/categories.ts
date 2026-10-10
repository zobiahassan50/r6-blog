import { blogPath } from './blog-paths'
import { getGuideMedia } from './media'

export type FeaturedCategory = {
  id: string
  title: string
  excerpt: string
  href: string
  category: string
  date: string
  readMinutes: number
  placeholderKey: 'home' | 'guides' | 'community' | 'faq' | 'contact' | 'product'
  imageSrc: string
  imageAlt: string
}

/** Featured article cards on the home “R6 Siege” grid (static image thumbnails). */
export const FEATURED_CATEGORIES: FeaturedCategory[] = [
  {
    id: 'pc-compatibility',
    title: 'ESP, Wallhack & Aimbot',
    excerpt: 'Rainbow Six Siege cheats 2026 terminology — ESP, wallhack, aimbot and PC features.',
    href: blogPath('pc-compatibility'),
    category: 'ESP & Aimbot',
    date: '2026-09-26',
    readMinutes: 8,
    placeholderKey: 'contact',
    imageSrc: getGuideMedia('pc-compatibility').image,
    imageAlt: getGuideMedia('pc-compatibility').alt,
  },
  {
    id: 'status-before-purchase',
    title: 'Settings 2026',
    excerpt: 'R6 cheats settings — no recoil, radar, triggerbot, silent aim and DMA terms.',
    href: blogPath('status-before-purchase'),
    category: 'Settings',
    date: '2026-10-02',
    readMinutes: 8,
    placeholderKey: 'community',
    imageSrc: getGuideMedia('status-before-purchase').image,
    imageAlt: getGuideMedia('status-before-purchase').alt,
  },
  {
    id: 'fair-play-risks',
    title: 'Hacks & ESP',
    excerpt: 'Rainbow Six Siege hacks 2026 — wallhack, skeleton ESP, chams and external cheats.',
    href: blogPath('fair-play-risks'),
    category: 'Hacks & ESP',
    date: '2026-10-05',
    readMinutes: 8,
    placeholderKey: 'guides',
    imageSrc: getGuideMedia('fair-play-risks').image,
    imageAlt: getGuideMedia('fair-play-risks').alt,
  },
]

export function getFeaturedCategory(id: string) {
  return FEATURED_CATEGORIES.find((c) => c.id === id)
}
