/**
 * Product page data for R6 Siege Cheats.
 * Checkout is an external, already-configured URL — no in-site payment backend.
 */

export const PRODUCT_SLUG = 'r6-cheats'
export const PRODUCT_PATH = '/r6-cheats/'
export const PRODUCT_NAME = 'R6 Siege Cheats'
export const PRODUCT_PRICE_USD = '35'

/** Live external checkout. This site never processes payments itself. */
export const CHECKOUT_URL = 'https://zadeyo.com/products/rainbow-six-siege-cheats'
export const CHECKOUT_REL = 'noopener noreferrer'

export const PRODUCT_STATUS_LABEL = 'Check status before buying'
export const PRODUCT_STATUS_NOTE =
  'Review this page before every purchase. Included modules, pricing and delivery details can change between releases. We do not make guarantees about outcomes on any account — see our fair play and risk guide before you buy.'

export type ProductFeature = {
  id: string
  title: string
  description: string
}

export const PRODUCT_FEATURES: ProductFeature[] = [
  {
    id: 'aimbot',
    title: 'Aim Assistance',
    description:
      'A configurable aim assistance module for the Windows PC build of Rainbow Six Siege. Available settings and ranges can vary by release — see the included-modules list above before buying.',
  },
  {
    id: 'esp',
    title: 'Visual Awareness Overlay',
    description:
      'An on-screen overlay that adds extra visual information during matches, such as highlighting player positions. Exact toggles included depend on the current build.',
  },
  {
    id: 'radar',
    title: '2D Radar Overlay',
    description:
      'An optional 2D radar-style overlay when included in the current build. Feature availability is build-dependent.',
  },
  {
    id: 'access',
    title: 'Access & Updates',
    description:
      'Digital access for the Windows PC product after external checkout. Delivery details are provided with your order rather than published as public setup instructions.',
  },
]

export const PRODUCT_COMPAT = [
  'Platform: Windows PC',
  'Game: Rainbow Six Siege (PC)',
  'Delivery: digital access after external checkout',
  'Support: use Contact for non-checkout questions',
] as const

export const PRODUCT_FAQS = [
  {
    q: 'How much does it cost?',
    a: `Licenses start from $${PRODUCT_PRICE_USD}. Longer access tiers may cost more. Confirm the live price on the checkout page before paying.`,
  },
  {
    q: 'Do you guarantee it will stay undetected?',
    a: 'No. We do not claim permanent undetectability, ban immunity, or guaranteed results. Anti-cheat systems change. Always review the status note on this page and understand that using third-party tools can violate the game’s terms and risk account sanctions.',
  },
  {
    q: 'Is this an official game product?',
    a: 'No. This is an independent third-party offering. Purchases are completed through external checkout.',
  },
  {
    q: 'Where does checkout happen?',
    a: 'Purchase is completed on an external checkout page. This site does not process cards or host a payment backend.',
  },
] as const

export function isCheckoutConfigured() {
  return Boolean(CHECKOUT_URL) && !CHECKOUT_URL.includes('[CHECKOUT_URL_PLACEHOLDER]')
}

export function getCheckoutHref() {
  return isCheckoutConfigured() ? CHECKOUT_URL : '/contact/'
}
