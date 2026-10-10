import { blogPath } from './blog-paths'
import { PRODUCT_PATH } from './product'

/**
 * Primary internal routes for crawl equity and footer navigation.
 * No external links are listed here — purchases happen through the Buy Now CTA.
 */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'R6 Siege Cheats product site' },
  {
    label: 'Guides',
    to: '/guides',
    description: 'Buying, compatibility and risk articles',
  },
  {
    label: 'Product',
    to: PRODUCT_PATH,
    description: 'R6 Siege Cheats modules, price and checkout',
  },
  {
    label: 'Forums',
    to: '/forums',
    description: 'R6 setup, compatibility, and troubleshooting guides',
  },
  { label: 'FAQ', to: '/faq', description: 'Frequently asked questions about this site' },
  {
    label: 'Contact',
    to: '/contact',
    description: 'Send questions about our articles or this site',
  },
  {
    label: 'Privacy policy',
    to: '/privacy',
    description: 'How we handle analytics and contact messages',
  },
  {
    label: 'Terms of use',
    to: '/terms',
    description: 'Terms for using this site and buying the product',
  },
] as const

export const SITE_GUIDE_LINKS = [
  { label: 'Features overview', to: blogPath('features-overview') },
  { label: 'ESP, wallhack & anti-cheat', to: blogPath('esp-wallhack-anticheat') },
  { label: 'ESP, wallhack & aimbot', to: blogPath('pc-compatibility') },
  { label: 'Settings 2026', to: blogPath('status-before-purchase') },
  { label: 'Hacks & ESP', to: blogPath('fair-play-risks') },
] as const
