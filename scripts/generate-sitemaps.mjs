/**
 * Single sitemap at /sitemap.xml - every indexed page URL + its OG image.
 * One urlset only (never a sitemap index). 404 is excluded.
 */
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')
const pagesDir = join(root, 'src', 'pages')
const SITE = (process.env.SITE_URL || 'https://r6cheat.net').replace(/\/$/, '')
const TODAY = new Date().toLocaleDateString('en-CA')
const HREFLANG = ['en', 'x-default']

const STATIC_ROUTES = [
  '/',
  '/guides',
  '/forums',
  '/r6-cheats',
  '/faq',
  '/contact',
  '/privacy',
  '/terms',
]

const PAGE_META = {
  '/': { priority: '1.0', changefreq: 'daily' },
  '/guides': { priority: '0.9', changefreq: 'daily' },
  '/forums': { priority: '0.7', changefreq: 'weekly' },
  '/r6-cheats': { priority: '0.95', changefreq: 'daily' },
  '/faq': { priority: '0.6', changefreq: 'monthly' },
  '/contact': { priority: '0.5', changefreq: 'monthly' },
  '/privacy': { priority: '0.3', changefreq: 'yearly' },
  '/terms': { priority: '0.3', changefreq: 'yearly' },
}

const ALL_SITE_IMAGES = [
  '/og/home.jpg',
  '/og/guides.jpg',
  '/og/community.jpg',
  '/og/r6-cheats.jpg',
  '/og/faq.jpg',
  '/og/contact.jpg',
  '/og/privacy.jpg',
  '/og/terms.jpg',
]

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

/** Keep captions ASCII-safe for maximum crawler compatibility. */
function asciiSafe(value) {
  return String(value)
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '')
}

function siteUrl(path) {
  return !path || path === '/' ? `${SITE}/` : `${SITE}${path.startsWith('/') ? path : `/${path}`}`
}

function loadBlogs() {
  const src = readFileSync(join(dataDir, 'blogs.ts'), 'utf8')
  const pattern =
    /slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*excerpt:\s*['"]([^'"]+)['"],\s*metaTitle:\s*['"]([^'"]+)['"],\s*metaDescription:\s*['"]([^'"]+)['"],[\s\S]*?date:\s*['"](\d{4}-\d{2}-\d{2})['"][\s\S]*?tag:\s*['"]([^'"]+)['"]/g
  return [...src.matchAll(pattern)].map((match) => ({
    slug: match[1],
    title: match[2],
    excerpt: match[3],
    metaTitle: match[4],
    metaDescription: match[5],
    date: match[6],
    tag: match[7],
  }))
}

function loadStaticRoutes() {
  return readdirSync(pagesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.astro') && entry.name !== '404.astro')
    .map((entry) => (entry.name === 'index.astro' ? '/' : `/${entry.name.slice(0, -6)}`))
}

function alternateLinks(url) {
  return HREFLANG.map(
    (language) =>
      `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(url)}" />`,
  ).join('\n')
}

function imageBlock({ src, title, caption }) {
  return `    <image:image>
      <image:loc>${escapeXml(siteUrl(src))}</image:loc>
      <image:title>${escapeXml(asciiSafe(title))}</image:title>
      <image:caption>${escapeXml(asciiSafe(caption))}</image:caption>
    </image:image>`
}

function urlEntry({ path, priority, changefreq, lastmod = TODAY, images }) {
  if (!images?.length) throw new Error(`Sitemap entry for ${path} is missing images`)
  const url = siteUrl(path)
  const media = images.map((image) => imageBlock(image))
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateLinks(url)}
${media.join('\n')}
  </url>`
}

function imagesForPath(path, blogs) {
  if (STATIC_ROUTES.includes(path)) {
    // Forums reuses the community OG asset (same visual hub art).
    const file = path === '/' ? 'home' : path === '/forums' ? 'community' : path.slice(1)
    const label = path === '/' ? 'home' : path === '/forums' ? 'forums' : file
    return [
      {
        src: `/og/${file}.jpg`,
        title: `R6 Siege Cheats - ${label} Open Graph`,
        caption: `Google and social preview image for the ${label} page on R6 Siege Cheats.`,
      },
    ]
  }

  if (path.startsWith('/guides/')) {
    const slug = path.slice('/guides/'.length)
    const blog = blogs.find((b) => b.slug === slug)
    return [
      {
        src: `/og/guides-${slug}.jpg`,
        title: `${blog?.title || slug} Open Graph`,
        caption:
          blog?.metaDescription ||
          `Google preview image for ${blog?.title || slug} on R6 Siege Cheats.`,
      },
    ]
  }

  return [
    {
      src: '/og/home.jpg',
      title: 'R6 Siege Cheats',
      caption: 'R6 Siege Cheats page artwork.',
    },
  ]
}

function collectAllPaths(blogs, staticRoutes) {
  const paths = new Set([...staticRoutes, ...blogs.map((blog) => `/guides/${blog.slug}`)])
  // Never index error page
  paths.delete('/404')
  return [...paths]
}

function buildSitemap(blogs, allPaths) {
  const blogByPath = new Map(blogs.map((b) => [`/guides/${b.slug}`, b]))

  const sorted = [...allPaths].sort((a, b) => {
    const rank = (path) => {
      if (path === '/') return 0
      if (path === '/r6-cheats') return 1
      if (path === '/guides') return 2
      if (path.startsWith('/guides/')) return 3
      if (path === '/forums') return 4
      if (path === '/faq') return 5
      if (path === '/contact') return 6
      return 7
    }
    const diff = rank(a) - rank(b)
    return diff !== 0 ? diff : a.localeCompare(b)
  })

  const entries = sorted.map((path) => {
    const meta = PAGE_META[path] || {
      priority: path.startsWith('/guides/') ? '0.75' : '0.5',
      changefreq: path.startsWith('/guides/') ? 'monthly' : 'weekly',
    }
    const blog = blogByPath.get(path)
    return urlEntry({
      path,
      priority: meta.priority,
      changefreq: meta.changefreq,
      lastmod: blog?.date || TODAY,
      images: imagesForPath(path, blogs),
    })
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`
}

function validate(blogs, allPaths, sitemap) {
  const errors = []
  if (blogs.length && !existsSync(join(pagesDir, 'guides', '[slug].astro'))) {
    errors.push('Guide routes have no dynamic page file: src/pages/guides/[slug].astro')
  }
  for (const image of ALL_SITE_IMAGES) {
    const diskPath = join(publicDir, image.replace(/^\//, ''))
    if (!existsSync(diskPath)) errors.push(`Missing image asset on disk: ${image}`)
  }

  const expectedUrls = new Set(allPaths.map(siteUrl))
  const pageLocs = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const imageLocs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1])
  const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []

  for (const url of expectedUrls) {
    if (!pageLocs.includes(url)) errors.push(`Missing URL: ${url}`)
  }
  for (const url of pageLocs) {
    if (!expectedUrls.has(url)) errors.push(`Unexpected URL: ${url}`)
  }
  if (new Set(pageLocs).size !== pageLocs.length) errors.push('sitemap.xml contains duplicate page URLs')
  if (sitemap.includes('<sitemapindex')) errors.push('sitemap.xml must be a single urlset, not an index')
  if ((sitemap.match(/<urlset[\s>]/g) || []).length !== 1) {
    errors.push('sitemap.xml must contain exactly one <urlset>')
  }
  if (urlBlocks.length !== expectedUrls.size) {
    errors.push(`Expected ${expectedUrls.size} <url> entries, found ${urlBlocks.length}`)
  }
  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '(unknown)'
    if (!block.includes('<image:image>') || !block.includes('<image:loc>')) {
      errors.push(`URL missing image entry: ${loc}`)
    }
  }
  for (const image of ALL_SITE_IMAGES) {
    if (!imageLocs.includes(siteUrl(image))) errors.push(`Sitemap missing required image: ${image}`)
  }
  const sitemapWithoutHost = sitemap.replaceAll(SITE, '')
  if (/DayZ|Tarkov|Warzone|Bohemia/i.test(sitemapWithoutHost)) {
    errors.push('Sitemap still contains legacy cheat-site branding')
  }
  if (imageLocs.length < expectedUrls.size) {
    errors.push('Image count is lower than page count - every URL needs an image')
  }
  if (errors.length) throw new Error(`Sitemap validation failed:\n- ${errors.join('\n- ')}`)
}

function main() {
  const blogs = loadBlogs()
  const staticRoutes = loadStaticRoutes()
  const allPaths = collectAllPaths(blogs, staticRoutes)
  const sitemap = buildSitemap(blogs, allPaths)
  validate(blogs, allPaths, sitemap)

  writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
  writeFileSync(
    join(publicDir, 'robots.txt'),
    [
      'User-agent: Googlebot',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /og/',
      '',
      'User-agent: Google-InspectionTool',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /og/',
      '',
      'User-agent: Bingbot',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /og/',
      '',
      'User-agent: *',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /og/',
      'Disallow: /404',
      'Disallow: /404.html',
      'Disallow: /offline',
      'Disallow: /offline.html',
      '',
      `Sitemap: ${siteUrl('/sitemap.xml')}`,
      '',
    ].join('\n'),
    'utf8',
  )

  for (const name of [
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-forums.xml',
    'sitemap-images.xml',
    'sitemap-blogs.xml',
    'sitemap-regions.xml',
    'sitemap-index.xml',
    'sitemap_index.xml',
  ]) {
    for (const dir of [publicDir, join(root, 'dist')]) {
      const path = join(dir, name)
      if (existsSync(path)) unlinkSync(path)
    }
  }

  console.log(
    `Sitemap OK: ${allPaths.length} pages in single sitemap.xml (${siteUrl('/sitemap.xml')})`,
  )
}

main()
