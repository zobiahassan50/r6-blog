export type FaqItem = {
  q: string
  a: string
}

/**
 * Master FAQ — visible on /faq and reused in sections.
 * No fabricated detection rates or undetectability claims.
 */
export const SITE_FAQS: FaqItem[] = [
  {
    q: 'What is R6 Siege Cheats?',
    a: 'R6 Siege Cheats is a third-party Windows PC product listing for Rainbow Six Siege, paired with original articles on features, buying, compatibility, and risk. Current modules and pricing are listed on the product page.',
  },
  {
    q: 'How much does it cost?',
    a: 'Licenses start from $35. Longer access tiers may cost more. Confirm the live price on the external checkout page before paying.',
  },
  {
    q: 'Where does checkout happen?',
    a: 'Purchases are completed through an external Buy Now checkout. This site does not process cards or store payment details.',
  },
  {
    q: 'Is it available for consoles?',
    a: 'No. This product is scoped to Windows PC. Console versions are not supported.',
  },
  {
    q: 'Do you guarantee it is undetectable?',
    a: 'No. We do not claim undetectability, ban immunity, or guaranteed results. Using third-party tools can violate the game’s terms and risk account sanctions.',
  },
  {
    q: 'How do I confirm current status before buying?',
    a: 'Read the status note on the product page immediately before checkout, and review our R6 ESP, wallhack and anti-cheat article plus settings terminology before you buy.',
  },
  {
    q: 'Where can I read more before purchasing?',
    a: 'Browse the articles hub for features overview, R6 ESP and wallhack terminology, anti-cheat context, R6 settings, and hacks & ESP coverage.',
  },
  {
    q: 'How do I get in touch?',
    a: 'Use the Contact page for questions about our articles or this site. Checkout and payment issues are handled on the external checkout provider’s side.',
  },
]

/** Shown on the homepage; FAQPage schema lives on /faq. */
export const HOME_FAQS: FaqItem[] = [
  SITE_FAQS[0],
  SITE_FAQS[1],
  SITE_FAQS[3],
  SITE_FAQS[4],
]
