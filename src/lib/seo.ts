import type { FaqItem } from '../data/faqs'
import type { BlogPost } from '../data/blogs'
import {
  PRODUCT_NAME,
  PRODUCT_PATH,
  PRODUCT_PRICE_USD,
} from '../data/product'
import {
  OG_IMAGE,
  SEO_REGIONS,
  SITE_NAME,
  SITE_PURPOSE,
  SITE_TOPICS,
  SITE_URL,
  absoluteUrl,
  type PageSeo,
} from '../data/site'

function absoluteAsset(src: string) {
  return src.startsWith('http') ? src : `${SITE_URL}${src.startsWith('/') ? src : `/${src}`}`
}

const HUB_PATHS = ['/', '/blogs/', '/guides/', '/forums/', '/r6-cheats/']

export const PRODUCT_ID = `${SITE_URL}/#product`

export function siteIdentityGraph() {
  return [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: ['R6 Siege Cheats', 'Rainbow Six Siege Cheats'],
      url: SITE_URL,
      description: SITE_PURPOSE,
      knowsAbout: [...SITE_TOPICS],
      brand: { '@type': 'Brand', name: SITE_NAME },
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
        width: 48,
        height: 46,
      },
      image: absoluteAsset(OG_IMAGE),
      areaServed: 'Worldwide',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_PURPOSE,
      inLanguage: 'en',
      about: {
        '@type': 'Thing',
        name: 'Rainbow Six Siege',
        description:
          'A product site for a third-party Rainbow Six Siege PC tool, with original articles on buying, compatibility and risk.',
      },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ]
}

export function webPageNode(seo: PageSeo) {
  const img = seo.image || OG_IMAGE
  const page = {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(seo.path)}#webpage`,
    url: absoluteUrl(seo.path),
    name: seo.title,
    description: seo.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  } as Record<string, unknown>
  const hasVisibleImage =
    HUB_PATHS.includes(seo.path) ||
    seo.path.startsWith('/blogs/') ||
    seo.path.startsWith('/guides/')
  const hasOgImage = Boolean(seo.image)
  if (hasVisibleImage || hasOgImage) {
    page.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: absoluteAsset(img),
      width: 1200,
      height: 630,
      caption: seo.imageAlt || seo.title,
    }
    page.image = absoluteAsset(img)
  }
  return page
}

export function buildPageJsonLd(seo: PageSeo, extra: unknown[] = []) {
  const cleaned = extra.filter((node) => {
    if (!node || typeof node !== 'object') return true
    const t = (node as { '@type'?: string })['@type']
    return t !== 'WebSite' && t !== 'Organization'
  })
  return {
    '@context': 'https://schema.org',
    '@graph': [...siteIdentityGraph(), webPageNode(seo), ...cleaned],
  }
}

export function productJsonLd() {
  return {
    '@type': 'Product',
    '@id': PRODUCT_ID,
    name: PRODUCT_NAME,
    description:
      'Third-party Rainbow Six Siege PC modules with digital delivery after external checkout.',
    url: absoluteUrl(PRODUCT_PATH),
    image: absoluteAsset('/og/r6-cheats.jpg'),
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: 'PC game software',
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(PRODUCT_PATH),
      price: PRODUCT_PRICE_USD,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  }
}

export function faqPageJsonLd(items: FaqItem[], pageUrl?: string) {
  return {
    '@type': 'FAQPage',
    ...(pageUrl ? { '@id': `${pageUrl}#faq`, url: pageUrl } : {}),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

function resolveUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http')) return pathOrUrl
  return absoluteUrl(pathOrUrl)
}

export function articleJsonLd(post: BlogPost, pathOrUrl: string, image: string) {
  const url = resolveUrl(pathOrUrl)
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: url,
    isPartOf: { '@id': `${SITE_URL}/blogs/#webpage` },
    image: absoluteAsset(image),
    inLanguage: 'en',
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

/** Only emit HowTo when the post opts in — not used by this product site by default. */
export function howToJsonLd(post: BlogPost, pageUrl: string, image: string) {
  if (!post.howTo) return null
  return {
    '@type': 'HowTo',
    name: post.title,
    description: post.metaDescription || post.excerpt,
    image: absoluteAsset(image),
    url: pageUrl.startsWith('http') ? pageUrl : absoluteUrl(pageUrl),
    step: post.sections.map((section, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: section.heading,
      text: section.body.join(' '),
    })),
  }
}

export { SEO_REGIONS, absoluteUrl, OG_IMAGE, SITE_NAME, SITE_URL }
