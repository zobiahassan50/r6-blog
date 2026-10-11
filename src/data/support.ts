export const CONTACT_INTRO =
  'Use this form to send questions about our articles or this site. Checkout and payment issues are handled by the external checkout provider.'

export const CONTACT_TOPICS = [
  {
    heading: 'Article corrections',
    body: [
      'If something in an article looks outdated or unclear, tell us which page and what should be clarified.',
    ],
  },
  {
    heading: 'Product questions',
    body: [
      'For module availability and pricing, check the product page first. We can point you to the right article if you are undecided.',
    ],
  },
  {
    heading: 'Not supported here',
    body: [
      'We cannot help with game-account recovery, ban appeals, or in-game technical support for the base game client.',
    ],
  },
] as const

export const CONTACT_FAQS = [
  {
    q: 'How do I reach R6 Siege Cheats support?',
    a: 'Use the Support form on this page. Include the page URL if your question is about a specific article.',
  },
  {
    q: 'Can you help with checkout payment problems?',
    a: 'Payment is handled on the external checkout page. Use the checkout provider’s support channels for billing issues.',
  },
] as const
