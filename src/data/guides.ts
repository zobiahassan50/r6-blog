import { blogPath } from './blog-paths'
import { PRODUCT_PATH } from './product'

export type GuideItem = {
  id: string
  title: string
  excerpt: string
  href: string
  tag: string
  readMinutes: number
  searchTerms: string
}

/**
 * Practical how-to guides — distinct from editorial blog posts and forum threads.
 * Links may point at product, FAQ, or a related blog for deeper reading.
 */
export const GUIDES: GuideItem[] = [
  {
    id: 'getting-started',
    title: 'Getting started with R6 Siege Cheats',
    excerpt:
      'A short pre-checkout checklist: confirm you are on Windows PC, skim the live product notes, and know that delivery is digital after payment.',
    href: blogPath('features-overview'),
    tag: 'Setup',
    readMinutes: 5,
    searchTerms: 'getting started setup checklist buy delivery windows pc',
  },
  {
    id: 'pc-requirements',
    title: 'PC requirements and compatibility',
    excerpt:
      'What to verify on Windows before you spend money — client scope, how compatibility notes are written, and why patch days matter.',
    href: blogPath('pc-compatibility'),
    tag: 'Compatibility',
    readMinutes: 6,
    searchTerms: 'pc requirements compatibility windows game version overlay',
  },
  {
    id: 'settings-basics',
    title: 'Settings basics before first launch',
    excerpt:
      'A plain read on how menus talk about recoil helpers, radar, triggerbots, and related controls so product notes make more sense.',
    href: blogPath('status-before-purchase'),
    tag: 'Settings',
    readMinutes: 6,
    searchTerms: 'settings basics configuration no recoil radar triggerbot',
  },
  {
    id: 'anticheat-context',
    title: 'Anti-cheat context for Siege PC',
    excerpt:
      'BattlEye and ShieldGuard in everyday language — not a live status board. Always re-check product notes after patches.',
    href: blogPath('esp-wallhack-anticheat'),
    tag: 'Anti-cheat',
    readMinutes: 7,
    searchTerms: 'anticheat battleye shieldguard context risk fair play',
  },
  {
    id: 'fair-play-checklist',
    title: 'Fair-play and risk checklist',
    excerpt:
      'What this site will and will not promise about account risk, and the questions worth asking yourself before you decide.',
    href: blogPath('fair-play-risks'),
    tag: 'Risk',
    readMinutes: 7,
    searchTerms: 'fair play risk checklist ban account honesty',
  },
  {
    id: 'checkout-help',
    title: 'Checkout and support path',
    excerpt:
      'Where pricing questions, payment issues, and general help should go — product page first, then FAQ, then Support.',
    href: PRODUCT_PATH,
    tag: 'Support',
    readMinutes: 3,
    searchTerms: 'checkout support pricing contact faq help',
  },
]

export function filterGuides(query: string): GuideItem[] {
  const term = query.trim().toLowerCase()
  if (!term) return GUIDES
  return GUIDES.filter((g) => {
    const hay = `${g.title} ${g.excerpt} ${g.tag} ${g.searchTerms}`.toLowerCase()
    return hay.includes(term)
  })
}
