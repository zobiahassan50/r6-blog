import { blogPath } from './blogs'
import { PRODUCT_NAME, PRODUCT_PATH, PRODUCT_PRICE_USD } from './product'
import { SITE_HOST, SITE_NAME } from './site'

export type ForumThread = {
  id: string
  title: string
  excerpt: string
  href: string
  tag: string
  readMinutes: number
  searchTerms: string
}

/**
 * Forum index for the R6 hub (UI modeled on a classic cheats forums listing).
 * Every card links to an existing R6 route or published article.
 * No live BattlEye counters, review scores, or invented thread stats.
 */
export const FORUM_THREADS: ForumThread[] = [
  {
    id: 'r6-cheats-features',
    title: 'R6 Cheats and Features',
    excerpt:
      'A plain-language walkthrough of R6 Siege Cheats module categories — visual awareness, aim assistance, and related PC tools — with current details on the product page.',
    href: blogPath('features-overview'),
    tag: 'Features',
    readMinutes: 6,
    searchTerms:
      'r6 cheats features rainbow six siege cheats modules overview aim assist overlay',
  },
  {
    id: 'r6-updates',
    title: 'Rainbow Six Siege Updates',
    excerpt:
      'Season and game updates can affect third-party tools. Use the articles hub for current compatibility language — this page does not host a live patch tracker.',
    href: '/guides/',
    tag: 'Updates',
    readMinutes: 3,
    searchTerms: 'rainbow six siege updates r6 patch season game version',
  },
  {
    id: 'r6-compatibility',
    title: 'R6 Compatibility and Game Versions',
    excerpt:
      'Rainbow Six Siege cheats 2026 terminology for Windows PC — ESP, wallhack, aimbot, and related feature language before checkout.',
    href: blogPath('pc-compatibility'),
    tag: 'Compatibility',
    readMinutes: 8,
    searchTerms:
      'r6 compatibility game versions windows pc rainbow six siege cheats esp wallhack aimbot',
  },
  {
    id: 'battleye-status',
    title: 'BattlEye Status and Compatibility',
    excerpt:
      'BattlEye is Rainbow Six Siege’s PC anti-cheat. We do not show live clear-to-load counters here — read fair-play guidance and confirm product notes before you buy.',
    href: blogPath('fair-play-risks'),
    tag: 'BattlEye',
    readMinutes: 8,
    searchTerms: 'battleye status compatibility r6 anti-cheat fair play risk hacks esp',
  },
  {
    id: 'r6-troubleshooting',
    title: 'R6 Troubleshooting and Support',
    excerpt:
      'Need help with checkout, access, or product questions? Start with FAQ answers, then use Contact if you still need support.',
    href: '/contact/',
    tag: 'Support',
    readMinutes: 4,
    searchTerms: 'r6 troubleshooting support errors checkout help contact',
  },
  {
    id: 'r6-configuration',
    title: 'R6 Configuration Guides',
    excerpt:
      'Settings terminology for Rainbow Six Siege cheats — no recoil, radar, triggerbot, silent aim, and related configuration phrases.',
    href: blogPath('status-before-purchase'),
    tag: 'Configuration',
    readMinutes: 8,
    searchTerms:
      'r6 configuration guides settings no recoil radar triggerbot silent aim dma',
  },
  {
    id: 'r6-setup',
    title: 'R6 ESP, Wallhack and Anti-Cheat',
    excerpt:
      'Rainbow Six Siege cheats 2026 terminology — R6 ESP, wallhack, aimbot, no recoil — plus BattlEye and ShieldGuard context before you buy.',
    href: blogPath('esp-wallhack-anticheat'),
    tag: 'R6 Cheats',
    readMinutes: 8,
    searchTerms:
      'r6 esp wallhack anticheat battleye shieldguard rainbow six siege cheats 2026 setup',
  },
  {
    id: 'r6-faq',
    title: 'R6 Frequently Asked Questions',
    excerpt:
      'Pricing, compatibility, risk, and delivery questions for R6 Siege Cheats answered in one FAQ.',
    href: '/faq/',
    tag: 'FAQ',
    readMinutes: 4,
    searchTerms: 'r6 faq frequently asked questions pricing risk compatibility',
  },
]

export const FORUM_PAGE = {
  eyebrow: `Forums · Setup · ${SITE_HOST}`,
  h1: `${SITE_NAME} Guides`,
  intro:
    'Forum-style guides for R6 Siege Cheats — features, setup, compatibility, configuration, troubleshooting, and fair-play notes before you checkout.',
  searchPlaceholder: 'Search forums — setup, ESP, BattlEye, FAQ…',
  productEyebrow: 'Product',
  productTitle: PRODUCT_NAME,
  productBlurb: `Rainbow Six Siege PC product from $${PRODUCT_PRICE_USD} — confirm modules and notes on the product page before checkout.`,
  productCta: `Buy ${PRODUCT_NAME}`,
  productHref: PRODUCT_PATH,
  threadsHeading: 'All forum threads',
  openLabel: 'Open thread',
} as const

export function filterForumThreads(query: string): ForumThread[] {
  const term = query.trim().toLowerCase()
  if (!term) return FORUM_THREADS
  return FORUM_THREADS.filter((t) => {
    const hay = `${t.title} ${t.excerpt} ${t.tag} ${t.searchTerms}`.toLowerCase()
    return hay.includes(term)
  })
}
