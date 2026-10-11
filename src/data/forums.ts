import { blogsPath } from './blog-paths'
import { PRODUCT_NAME, PRODUCT_PATH, PRODUCT_PRICE_USD } from './product'
import { SITE_HOST, SITE_NAME } from './site'

export type ForumThread = {
  id: string
  title: string
  excerpt: string
  href: string
  board: string
  repliesLabel: string
  searchTerms: string
}

/**
 * Community-style forum boards — discussion topics, not blog cards.
 * No blog article images; destinations are product, FAQ, contact, blogs, or guides hubs.
 */
export const FORUM_THREADS: ForumThread[] = [
  {
    id: 'welcome',
    title: 'Welcome — start here before you ask',
    excerpt:
      'House rules for this board: keep questions about the PC product, reading status notes, and fair-play context. No account trading.',
    href: '/faq/',
    board: 'General',
    repliesLabel: 'Pinned',
    searchTerms: 'welcome start here rules general faq',
  },
  {
    id: 'product-questions',
    title: 'Product questions before checkout',
    excerpt:
      'Ask about modules, pricing, and what the product page covers for Windows PC — confirm notes there before you buy.',
    href: PRODUCT_PATH,
    board: 'Product',
    repliesLabel: 'Board',
    searchTerms: 'product questions checkout modules pricing windows',
  },
  {
    id: 'delivery-access',
    title: 'Delivery and access after purchase',
    excerpt:
      'Where delivery questions go, what to expect after checkout, and how to reach Support if something looks wrong.',
    href: '/contact/',
    board: 'Support',
    repliesLabel: 'Board',
    searchTerms: 'delivery access after purchase support contact',
  },
  {
    id: 'status-notes',
    title: 'Reading status notes (not a live counter)',
    excerpt:
      'This board does not show live BattlEye clear-to-load counters. Use product notes and the FAQ for how status is communicated.',
    href: '/faq/',
    board: 'Status',
    repliesLabel: 'Board',
    searchTerms: 'status notes battleye counter faq product',
  },
  {
    id: 'setup-talk',
    title: 'Setup talk — Windows PC only',
    excerpt:
      'Discuss setup questions for the Windows PC product. For step-by-step checklists, use the Guides section.',
    href: '/guides/',
    board: 'Setup',
    repliesLabel: 'Board',
    searchTerms: 'setup talk windows pc guides checklist',
  },
  {
    id: 'risk-discussion',
    title: 'Risk and fair-play discussion',
    excerpt:
      'Honest talk about account risk and fair play. For long-form reading, see the Blogs section — this board is for short questions.',
    href: blogsPath(),
    board: 'Fair play',
    repliesLabel: 'Board',
    searchTerms: 'risk fair play discussion blogs honesty ban',
  },
  {
    id: 'billing',
    title: 'Billing and checkout issues',
    excerpt:
      'Payment or checkout problems belong with Support after you check FAQ pricing answers.',
    href: '/contact/',
    board: 'Billing',
    repliesLabel: 'Board',
    searchTerms: 'billing checkout payment issues contact faq',
  },
  {
    id: 'site-feedback',
    title: 'Site feedback and broken links',
    excerpt:
      'Report typos, broken links, or unclear copy on r6cheat.net so we can fix the pages players actually use.',
    href: '/contact/',
    board: 'Feedback',
    repliesLabel: 'Board',
    searchTerms: 'feedback broken links typo site contact',
  },
]

export const FORUM_PAGE = {
  eyebrow: `Community · ${SITE_HOST}`,
  h1: `${SITE_NAME} Forums`,
  intro:
    'Discussion boards for R6 Siege Cheats — product questions, setup talk, status notes, and support. For long-form articles use Blogs; for checklists use Guides.',
  searchPlaceholder: 'Search forums — product, setup, billing, status…',
  productEyebrow: 'Product',
  productTitle: PRODUCT_NAME,
  productBlurb: `Rainbow Six Siege PC product from $${PRODUCT_PRICE_USD} — confirm modules and notes on the product page before checkout.`,
  productCta: `View ${PRODUCT_NAME}`,
  productHref: PRODUCT_PATH,
  threadsHeading: 'Boards & topics',
  openLabel: 'Open topic',
} as const

export function filterForumThreads(query: string): ForumThread[] {
  const term = query.trim().toLowerCase()
  if (!term) return FORUM_THREADS
  return FORUM_THREADS.filter((t) => {
    const hay = `${t.title} ${t.excerpt} ${t.board} ${t.searchTerms}`.toLowerCase()
    return hay.includes(term)
  })
}
