export type PolicySection = {
  heading: string
  body: string[]
}

export type PolicyPageContent = {
  slug: 'privacy' | 'terms'
  path: '/privacy/' | '/terms/'
  title: string
  description: string
  h1: string
  intro: string
  sections: PolicySection[]
  related: { label: string; to: string }[]
}

export const POLICY_PAGES: PolicyPageContent[] = [
  {
    slug: 'privacy',
    path: '/privacy/',
    title: 'Privacy Policy | R6 Siege Cheats',
    description: 'How R6 Siege Cheats handles basic site analytics and support messages.',
    h1: 'Privacy Policy',
    intro:
      'R6 Siege Cheats is a product listing site with supporting articles. This page explains what little data we collect when you read the site or reach Support.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'Like most websites, our hosting provider may log basic technical data such as IP address, browser type, and requested URLs for security and reliability.',
          'If you use the Support form, we receive the information you submit so we can respond. We do not sell support messages.',
        ],
      },
      {
        heading: 'Payments',
        body: [
          'Purchases are completed on an external checkout page. We do not process card numbers or store payment credentials on this site.',
        ],
      },
      {
        heading: 'Cookies and analytics',
        body: [
          'We may use lightweight analytics or hosting metrics. We do not use this site to build advertising profiles.',
        ],
      },
      {
        heading: 'Support',
        body: ['Questions about this privacy policy can be sent through the Support page.'],
      },
    ],
    related: [
      { label: 'Terms of Use', to: '/terms/' },
      { label: 'Support', to: '/contact/' },
    ],
  },
  {
    slug: 'terms',
    path: '/terms/',
    title: 'Terms of Use | R6 Siege Cheats',
    description: 'Terms of use for R6 Siege Cheats, including purchase and risk disclosures.',
    h1: 'Terms of Use',
    intro:
      'Using this site means you accept these terms. R6 Siege Cheats publishes a product listing and original supporting articles. Purchases are completed externally.',
    sections: [
      {
        heading: 'Editorial and product content',
        body: [
          'Articles on this site are original informational content about the product and the purchase decision. Product details on the product page take priority when information differs.',
        ],
      },
      {
        heading: 'Purchases and risk',
        body: [
          'Using unauthorized third-party tools with Rainbow Six Siege can violate the game’s terms of service and may result in account sanctions. We do not claim detection immunity, ban immunity, or guaranteed results. Purchases are at your own risk.',
        ],
      },
      {
        heading: 'No warranties',
        body: [
          'This site and its content are provided “as is,” without warranty of accuracy or completeness. We are not liable for decisions made based on editorial content or product use.',
        ],
      },
    ],
    related: [
      { label: 'Privacy Policy', to: '/privacy/' },
      { label: 'Product', to: '/r6-cheats/' },
    ],
  },
]

export function getPolicyPage(slug: string) {
  return POLICY_PAGES.find((p) => p.slug === slug)
}
