import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const site = 'https://r6cheat.net'
const failures = []
const BUY_NOW_URL = 'https://zadeyo.com/products/rainbow-six-siege-cheats'

function fail(message) {
  failures.push(message)
}

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : []
  })
}

function pageUrl(file) {
  const page = relative(dist, file).replaceAll('\\', '/')
  if (page === 'index.html') return `${site}/`
  if (page.endsWith('/index.html')) return `${site}/${page.slice(0, -11)}/`
  return `${site}/${page.slice(0, -5)}/`
}

function decodeEntities(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&#38;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
}

const files = htmlFiles(dist)
const titles = new Map()
const descriptions = new Map()

for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const page = relative(dist, file).replaceAll('\\', '/')
  if (page === 'offline.html' || page === '404.html') {
    if (page === '404.html' && (html.match(/<h1(?:\s|>)/g) || []).length !== 1) {
      fail(`${page}: expected one H1`)
    }
    continue
  }

  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  const canonicalUrl = pageUrl(file)

  if (h1Count !== 1) fail(`${page}: expected one H1, found ${h1Count}`)
  if (!title) fail(`${page}: missing title`)
  else if (titles.has(title)) console.warn(`warn: ${page}: duplicate title also used by ${titles.get(title)}`)
  else titles.set(title, page)
  if (!description) fail(`${page}: missing description`)
  else if (descriptions.has(description)) {
    console.warn(`warn: ${page}: duplicate description also used by ${descriptions.get(description)}`)
  } else descriptions.set(description, page)

  if (!html.includes(`rel="canonical" href="${canonicalUrl}"`)) {
    fail(`${page}: missing self-referencing canonical ${canonicalUrl}`)
  }
  const hasHreflangEn =
    html.includes(`hreflang="en" href="${canonicalUrl}"`) ||
    html.includes(`href="${canonicalUrl}" hreflang="en"`)
  const hasHreflangDefault =
    html.includes(`hreflang="x-default" href="${canonicalUrl}"`) ||
    html.includes(`href="${canonicalUrl}" hreflang="x-default"`)
  if (!hasHreflangEn) fail(`${page}: missing self-referencing hreflang=en`)
  if (!hasHreflangDefault) fail(`${page}: missing self-referencing hreflang=x-default`)
  if (html.includes('assets-prd.ignimgs.com')) fail(`${page}: contains third-party IGN image`)
  if (html.includes('"keywords"')) fail(`${page}: contains keyword-list structured data`)
  if (/\/dayz-cheats|\/reviews\b|\/refunds\b/i.test(html)) {
    fail(`${page}: contains a retired DayZ-era route reference`)
  }
  if (/\bDayZ\b|dayzcheats|Bohemia Interactive/i.test(html)) {
    fail(`${page}: contains leftover DayZ branding or content`)
  }
  if (/\/operators\b|\/maps\b|\/updates\b/i.test(html) && !html.includes('/guides/')) {
    // allow path strings only if they're not nav destinations — fail if operators/maps/updates appear as routes
  }
  if (html.includes('href="/operators"') || html.includes('href="/maps"') || html.includes('href="/updates"')) {
    fail(`${page}: still links to removed /operators, /maps, or /updates`)
  }
  if (html.includes('Not affiliated with, endorsed by, or sponsored by Ubisoft')) {
    fail(`${page}: forbidden Ubisoft disclaimer still present`)
  }
}

const home = readFileSync(join(dist, 'index.html'), 'utf8')
const guides = readFileSync(join(dist, 'guides', 'index.html'), 'utf8')
const forums = readFileSync(join(dist, 'forums', 'index.html'), 'utf8')
const product = readFileSync(join(dist, 'r6-cheats', 'index.html'), 'utf8')
const faq = readFileSync(join(dist, 'faq', 'index.html'), 'utf8')
const contact = readFileSync(join(dist, 'contact', 'index.html'), 'utf8')

if ((faq.match(/"@type":"FAQPage"/g) || []).length !== 1) fail('/faq must own one FAQPage')
if (!product.includes('"@type":"Product"')) fail('/r6-cheats must include Product schema')
for (const [name, html] of [
  ['home', home],
  ['guides', guides],
  ['forums', forums],
  ['product', product],
  ['contact', contact],
]) {
  if (html.includes('"@type":"FAQPage"')) fail(`${name}: duplicate FAQPage schema`)
}
if (contact.includes('noindex')) fail('Contact page must be indexable')

for (const file of files) {
  const page = relative(dist, file).replaceAll('\\', '/')
  if (page === '404.html' || page === 'offline.html') continue
  const html = readFileSync(file, 'utf8')
  if (html.includes('content="noindex')) fail(`${page}: content page must not be noindex`)

  const title = decodeEntities(html.match(/<title>(.*?)<\/title>/)?.[1])
  const description = decodeEntities(html.match(/<meta name="description" content="([^"]+)"/)?.[1])
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]
  const ogTitle = decodeEntities(html.match(/<meta property="og:title" content="([^"]+)"/)?.[1])
  const ogDesc = decodeEntities(html.match(/<meta property="og:description" content="([^"]+)"/)?.[1])
  const twImage = html.match(/<meta name="twitter:image" content="([^"]+)"/)?.[1]
  const robotsMeta = html.match(/<meta name="robots" content="([^"]+)"/)?.[1]

  if (!ogImage?.includes('/og/') || !ogImage.endsWith('.jpg')) {
    fail(`${page}: og:image must be a crawlable /og/*.jpg for SERP thumbnails`)
  }
  if (!twImage || twImage !== ogImage) fail(`${page}: twitter:image must match og:image`)
  if (ogTitle !== title) fail(`${page}: og:title must match <title>`)
  if (ogDesc !== description) fail(`${page}: og:description must match meta description`)
  if (!html.includes('property="og:image:width" content="1200"')) fail(`${page}: og:image:width must be 1200`)
  if (!html.includes('property="og:image:height" content="630"')) fail(`${page}: og:image:height must be 630`)
  if (!robotsMeta?.includes('max-image-preview:large')) fail(`${page}: robots must allow max-image-preview:large`)
  if (!html.includes('rel="image_src"')) fail(`${page}: missing link rel=image_src for thumbnail crawlers`)
}

const brandingCheckHtml = (home + guides + forums).replaceAll(site, '')
if (/DayZ|Tarkov|Warzone|Bohemia/i.test(brandingCheckHtml)) {
  fail('Built pages still contain legacy DayZ cheat-site branding')
}
if (!home.includes('R6 Siege Cheats')) fail('Home must use R6 Siege Cheats branding')
if (!home.includes('Buy Now')) fail('Home must include Buy Now')
if (!home.includes(BUY_NOW_URL)) fail('Home must include the exact Zadeyo Buy Now URL')
if (!product.includes(BUY_NOW_URL)) fail('/r6-cheats must include the exact Zadeyo Buy Now URL')
if (home.includes('>Get<') || home.includes('>Get</')) fail('Home still shows Get CTA')
if (existsSync(join(dist, 'operators'))) fail('Removed /operators page must not be built')
if (existsSync(join(dist, 'maps'))) fail('Removed /maps page must not be built')
if (existsSync(join(dist, 'updates'))) fail('Removed /updates page must not be built')

const ALLOWED_EXTERNAL = new Set([BUY_NOW_URL])
for (const file of files) {
  if (file.endsWith('404.html') || file.endsWith('offline.html')) continue
  const html = readFileSync(file, 'utf8')
  const page = relative(dist, file).replaceAll('\\', '/')
  const hrefs = [...html.matchAll(/\bhref=("([^"]+)"|'([^']+)')/gi)].map((m) => m[2] || m[3] || '')
  for (const href of hrefs) {
    if (!/^https?:\/\//i.test(href)) continue
    const allowed =
      ALLOWED_EXTERNAL.has(href) ||
      href.startsWith('https://schema.org') ||
      href.startsWith(site)
    if (!allowed) fail(`${page}: unauthorized external href ${href}`)
  }
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
if (sitemap.includes('<sitemapindex')) fail('sitemap.xml must be a single urlset, not an index')
if (!sitemap.includes(`${site}/`)) fail(`sitemap.xml must use ${site} URLs`)

const expectedUrls = new Set(
  files
    .filter((file) => {
      const page = relative(dist, file).replaceAll('\\', '/')
      return page !== '404.html' && page !== 'offline.html'
    })
    .map(pageUrl),
)
const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []
const pageLocs = urlBlocks.map((block) => block.match(/<loc>([^<]+)<\/loc>/)?.[1]).filter(Boolean)
const uniqueSitemapUrls = new Set(pageLocs)
const imageLocs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1])
const requiredImages = ['/og/home.jpg', '/og/guides.jpg', '/og/community.jpg', '/og/faq.jpg', '/og/contact.jpg']

for (const url of expectedUrls) {
  if (!uniqueSitemapUrls.has(url)) fail(`sitemap.xml missing built page ${url}`)
}
for (const url of uniqueSitemapUrls) {
  if (!expectedUrls.has(url)) fail(`sitemap.xml contains URL without a built page: ${url}`)
}
if (uniqueSitemapUrls.size !== pageLocs.length) fail('sitemap.xml contains duplicate URLs')
if (urlBlocks.length !== expectedUrls.size) {
  fail(`sitemap.xml must contain exactly ${expectedUrls.size} built page URLs`)
}
for (const image of requiredImages) {
  if (!imageLocs.some((loc) => loc.endsWith(image))) fail(`sitemap.xml missing required image ${image}`)
}

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8')
if (!robots.includes(`Sitemap: ${site}/sitemap.xml`)) fail('robots.txt must point at the canonical HTTPS sitemap')
if (!robots.includes('Allow: /sitemap.xml')) fail('robots.txt must explicitly allow /sitemap.xml')

const redirects = readFileSync(join(root, 'public', '_redirects'), 'utf8')
if (!redirects.includes('/dayz-cheats')) fail('_redirects must map the legacy /dayz-cheats route')
if (!redirects.includes('/community')) fail('_redirects must map legacy /community to /forums/')
if (!redirects.includes('/operators')) fail('_redirects must redirect removed /operators')
if (!redirects.includes('/blogs')) fail('_redirects must include /blogs trailing-slash canonical')
if (!redirects.includes('/guides/features-overview')) {
  fail('_redirects must map legacy /guides/:slug posts to /blogs/:slug/')
}
if (/^\/\*\s+\/index\.html\s+200/m.test(redirects)) {
  fail('_redirects must not include an SPA /* /index.html fallback (causes redirect loops)')
}
if (/^\/guides\/\s+\/guides\s+301/m.test(redirects)) {
  fail('_redirects must not strip trailing slash from /guides/ (conflicts with directory indexes)')
}

for (const asset of [
  'public/manifest.webmanifest',
  'public/sw.js',
  'public/offline.html',
  'public/icons/icon-192.png',
  'public/icons/icon-512.png',
  'public/og/home.jpg',
  'functions/_middleware.js',
]) {
  if (!existsSync(join(root, asset))) fail(`Missing asset: ${asset}`)
}
if (!home.includes('rel="manifest"') && !home.includes("rel='manifest'")) {
  fail('Home must link rel=manifest for PWA installability')
}
if (!home.includes('/sw.js')) fail('Home must register the service worker')

const worker = readFileSync(join(root, 'workers', 'site.js'), 'utf8')
if (!worker.includes("startsWith('www.')") && !worker.includes('startsWith("www.")')) {
  fail('workers/site.js must detect www. hostnames for apex redirect')
}

if (failures.length) {
  throw new Error(`SEO verification failed:\n- ${failures.join('\n- ')}`)
}

console.log(`SEO verification passed: ${files.length} HTML files checked`)
