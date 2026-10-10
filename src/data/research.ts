export type ResearchRecord = {
  slug: string
  topic: string
  intent: string
  primaryKeyword: string
  secondaryKeywords: string[]
  sourceUrls: string[]
  verifiedFacts: string[]
  /** Date we last cross-checked this article against official sources. */
  lastVerified: string
  recommendedInternalLinks: string[]
}

const LAST_VERIFIED = '2026-10-09'

const OPERATORS_URL = 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/game-info/operators'
const MAPS_URL = 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/game-info/maps'
const NEWS_URL = 'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates'
const HOME_URL = 'https://www.ubisoft.com/en-us/game/rainbow-six/siege'
const ANTICHEAT_URL =
  'https://www.ubisoft.com/en-us/game/rainbow-six/siege/news-updates/2EdHOzjBrQqQYDxalAitW8/rainbow-six-siege-understanding-anticheat'

/**
 * One research record per article in blogs.ts, documenting intent, sourcing
 * and verification status. Keep sourceUrls/verifiedFacts limited to facts
 * confirmed in official Ubisoft materials — do not add invented stats here.
 */
export const RESEARCH: ResearchRecord[] = [
  {
    slug: 'operator-guide',
    topic: 'How Rainbow Six Siege operators and gadgets work, and where the current roster lives',
    intent:
      'Informational — help readers understand operator fundamentals and gadget categories without claiming to be the authoritative roster list',
    primaryKeyword: 'rainbow six siege operator guide',
    secondaryKeywords: [
      'r6 siege operators',
      'r6 attacker defender roster',
      'rainbow six siege gadgets',
    ],
    sourceUrls: [OPERATORS_URL, HOME_URL],
    verifiedFacts: [
      'Official operator directory lives at the Ubisoft operators page and supports Attacker/Defender filtering.',
      'Classic roster includes Ash, Thermite, Mute and Jäger.',
      'Newer roster additions include Noor, Denari, Rauora, Skopós, Striker, Sentry, Deimos, Tubarão, Ram, Fenrir, Brava and Solis.',
    ],
    lastVerified: LAST_VERIFIED,
    recommendedInternalLinks: ['operator-gadgets', 'beginner-attack-defend', 'maps-guide'],
  },
  {
    slug: 'maps-guide',
    topic: 'How to study a Rainbow Six Siege map and where to find the official current rotation',
    intent: 'Informational — study methodology, not a claimed-current map list',
    primaryKeyword: 'rainbow six siege maps guide',
    secondaryKeywords: ['r6 siege map callouts', 'r6 siege rotations', 'map study rainbow six'],
    sourceUrls: [MAPS_URL, HOME_URL],
    verifiedFacts: [
      'Official map directory lives at the Ubisoft maps page and reflects the current rotation.',
    ],
    lastVerified: LAST_VERIFIED,
    recommendedInternalLinks: ['map-knowledge', 'beginner-attack-defend', 'operator-guide'],
  },
  {
    slug: 'ranked-3-0',
    topic: 'What Ranked 3.0 is and how it launched alongside Operation System Override',
    intent: 'Informational / news-explainer — announcement and launch timing only, no invented mechanics',
    primaryKeyword: 'ranked 3.0 rainbow six siege',
    secondaryKeywords: [
      'operation system override',
      'r6 siege ranked update',
      'rainbow six siege competitive ranked',
    ],
    sourceUrls: [NEWS_URL, HOME_URL],
    verifiedFacts: [
      'Ranked 3.0 Update announced May 17, 2026.',
      'Ranked 3.0 launched with Operation System Override on June 2, 2026.',
    ],
    lastVerified: LAST_VERIFIED,
    recommendedInternalLinks: ['season-updates', 'understanding-anticheat', 'beginner-attack-defend'],
  },
  {
    slug: 'season-updates',
    topic: 'Recent Rainbow Six Siege season patch notes, addenda and limited-time events',
    intent: 'News roundup — summarize official announcements with dates, link back to primary sources',
    primaryKeyword: 'rainbow six siege season updates',
    secondaryKeywords: [
      'y11s3 patch notes',
      'y11s3.1 patch notes',
      'operation split fire battle pass',
      'wasteland circuit event',
    ],
    sourceUrls: [NEWS_URL],
    verifiedFacts: [
      'Y11S3 Patch Notes Addendum published September 1, 2026.',
      'Operation Split Fire Battle Pass runs September 1 to December 1.',
      'Y11S3.1 Patch Notes published September 22, 2026.',
      'Wasteland Circuit event ran September 23 to October 13, 2026.',
    ],
    lastVerified: LAST_VERIFIED,
    recommendedInternalLinks: ['ranked-3-0', 'operator-guide', 'understanding-anticheat'],
  },
  {
    slug: 'understanding-anticheat',
    topic: 'How Ubisoft describes Rainbow Six Siege anti-cheat enforcement and in-game reporting',
    intent:
      'Informational / fair-play explainer — summarize Ubisoft’s 2021 anti-cheat primer accurately and attribute any figures to that date',
    primaryKeyword: 'rainbow six siege anti-cheat',
    secondaryKeywords: [
      'r6 siege battleye',
      'rainbow six siege report cheater',
      'r6 siege fair play',
    ],
    sourceUrls: [ANTICHEAT_URL, NEWS_URL],
    verifiedFacts: [
      'Ubisoft anti-cheat primer published December 13, 2021.',
      'Enforcement combines BattlEye with Ubisoft’s own data-based sanctions.',
      'Named actor categories: blatant cheaters, covert cheaters, overperforming players, boosted accounts, account stealers, and cheat makers/resellers.',
      'In-game reporting is described as the best player-help path; useful reports include username, user ID, match ID, date/time and clear evidence.',
      'Any statistics in the 2021 article are Ubisoft’s 2021 statements and must not be presented as current.',
    ],
    lastVerified: LAST_VERIFIED,
    recommendedInternalLinks: ['ranked-3-0', 'season-updates'],
  },
  {
    slug: 'beginner-attack-defend',
    topic: 'Foundational attacking and defending habits for new Rainbow Six Siege players',
    intent: 'Instructional / skill-building — general strategy, no cheat or exploit instructions',
    primaryKeyword: 'rainbow six siege beginner guide',
    secondaryKeywords: [
      'r6 siege attacking tips',
      'r6 siege defending tips',
      'rainbow six siege fundamentals',
    ],
    sourceUrls: [HOME_URL, OPERATORS_URL],
    verifiedFacts: [
      'Rainbow Six Siege matches are structured around attack and defense roles each round.',
    ],
    lastVerified: LAST_VERIFIED,
    recommendedInternalLinks: ['operator-guide', 'map-knowledge', 'operator-gadgets'],
  },
  {
    slug: 'map-knowledge',
    topic: 'Step-by-step methodology for improving Rainbow Six Siege map knowledge',
    intent: 'Instructional / skill-building — study methodology, no cheat or exploit instructions',
    primaryKeyword: 'how to improve map knowledge rainbow six siege',
    secondaryKeywords: ['r6 siege map study', 'rainbow six siege callouts', 'r6 siege practice routes'],
    sourceUrls: [MAPS_URL],
    verifiedFacts: [
      'Official map directory lives at the Ubisoft maps page and reflects the current rotation.',
    ],
    lastVerified: LAST_VERIFIED,
    recommendedInternalLinks: ['maps-guide', 'beginner-attack-defend'],
  },
  {
    slug: 'operator-gadgets',
    topic: 'How Rainbow Six Siege operator gadgets are categorized, with classic and newer examples',
    intent: 'Informational — gadget taxonomy and counter-play concepts, roster examples without side claims',
    primaryKeyword: 'rainbow six siege operator gadgets',
    secondaryKeywords: [
      'r6 siege gadget counters',
      'rainbow six siege breach gadgets',
      'r6 siege intel gadgets',
    ],
    sourceUrls: [OPERATORS_URL, NEWS_URL],
    verifiedFacts: [
      'Classic roster includes Ash, Thermite, Mute and Jäger, each with a distinct gadget category.',
      'Newer roster additions include Noor, Denari, Rauora, Skopós, Striker, Sentry, Deimos, Tubarão, Ram, Fenrir, Brava and Solis.',
    ],
    lastVerified: LAST_VERIFIED,
    recommendedInternalLinks: ['operator-guide', 'beginner-attack-defend'],
  },
]

export function getResearch(slug: string) {
  return RESEARCH.find((r) => r.slug === slug)
}
