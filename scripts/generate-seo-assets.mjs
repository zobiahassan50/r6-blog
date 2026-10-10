/**
 * Generate OG JPEGs, card placeholders, and PWA icons (branded art only).
 */
import { mkdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const ogDir = join(root, 'public', 'og')
const mediaDir = join(root, 'public', 'media')
const iconsDir = join(root, 'public', 'icons')
const blogsPath = join(root, 'src', 'data', 'blogs.ts')

await mkdir(ogDir, { recursive: true })
await mkdir(mediaDir, { recursive: true })
await mkdir(iconsDir, { recursive: true })

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function brandedOgSvg(width, height, eyebrow, title, subtitle) {
  const titleSize = Math.min(54, Math.round(width * 0.042))
  const lines =
    String(title)
      .match(/.{1,28}(\s|$)/g)
      ?.map((s) => s.trim())
      .filter(Boolean) || [title]
  const titleLines = lines.slice(0, 2)
  const footerY = Math.round(height * 0.92)
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#14101f"/>
          <stop offset="0.5" stop-color="#0c0a1a"/>
          <stop offset="1" stop-color="#08060f"/>
        </linearGradient>
        <radialGradient id="glow" cx="18%" cy="12%" r="70%">
          <stop offset="0" stop-color="#b040fb" stop-opacity="0.35"/>
          <stop offset="1" stop-color="#b040fb" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#glow)"/>
      <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#a78bfa" stroke-opacity="0.18" stroke-width="2"/>
      <text x="64" y="${Math.round(height * 0.33)}" fill="#c084fc" font-size="${Math.round(width * 0.018)}" font-family="Arial, sans-serif" font-weight="700" letter-spacing="4">${escapeXml(eyebrow)}</text>
      ${titleLines
        .map(
          (line, i) =>
            `<text x="64" y="${Math.round(height * 0.46) + i * Math.round(height * 0.1)}" fill="#ffffff" font-size="${titleSize}" font-family="Arial, sans-serif" font-weight="700">${escapeXml(line)}</text>`,
        )
        .join('\n')}
      <text x="64" y="${Math.round(height * 0.46) + titleLines.length * Math.round(height * 0.1) + Math.round(height * 0.076)}" fill="#c9bdd2" font-size="${Math.round(width * 0.022)}" font-family="Arial, sans-serif">${escapeXml(subtitle)}</text>
      <text x="64" y="${footerY}" fill="#9299a3" font-size="${Math.round(width * 0.017)}" font-family="Arial, sans-serif">R6 Siege Cheats — independent product listing</text>
    </svg>
  `)
}

function iconSvg(size) {
  return Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ibg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#14101f"/>
          <stop offset="1" stop-color="#08060f"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="${Math.round(size * 0.18)}" fill="url(#ibg)"/>
      <circle cx="${size * 0.5}" cy="${size * 0.42}" r="${size * 0.22}" fill="#b040fb" fill-opacity="0.85"/>
      <text x="50%" y="${size * 0.78}" text-anchor="middle" fill="#f3f0ff" font-size="${Math.round(size * 0.12)}" font-family="Arial, sans-serif" font-weight="700">R6</text>
    </svg>
  `)
}

async function writeOgJpeg(outPath, eyebrow, title, subtitle, width = 1200, height = 630) {
  await sharp(brandedOgSvg(width, height, eyebrow, title, subtitle))
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(outPath)
}

const STATIC_OG = [
  { file: 'home.jpg', eyebrow: 'R6 SIEGE CHEATS', title: 'R6 Siege Cheats for PC', subtitle: 'Product details · buying · compatibility · risk' },
  { file: 'guides.jpg', eyebrow: 'ARTICLES', title: 'R6 Siege Cheats Articles', subtitle: 'Features, buying, compatibility and fair play' },
  { file: 'community.jpg', eyebrow: 'FORUMS', title: 'R6 Siege Cheats Forums', subtitle: 'Setup, ESP, compatibility and FAQ guides' },
  { file: 'r6-cheats.jpg', eyebrow: 'PRODUCT', title: 'R6 Siege Cheats for PC', subtitle: 'Modules · price · external checkout' },
  { file: 'faq.jpg', eyebrow: 'FAQ', title: 'R6 Siege Cheats FAQ', subtitle: 'Pricing, checkout, compatibility and risk' },
  { file: 'contact.jpg', eyebrow: 'CONTACT', title: 'Contact R6 Siege Cheats', subtitle: 'Questions about our articles or this site' },
  { file: 'privacy.jpg', eyebrow: 'POLICY', title: 'Privacy Policy', subtitle: 'How we handle analytics and messages' },
  { file: 'terms.jpg', eyebrow: 'POLICY', title: 'Terms of Use', subtitle: 'Purchase and account risk disclosures' },
]

const CARD_MEDIA = [
  { file: 'placeholder-home.jpg', eyebrow: 'R6 SIEGE CHEATS', title: 'Home', subtitle: 'Product site for Rainbow Six Siege PC' },
  { file: 'placeholder-guides.jpg', eyebrow: 'ARTICLES', title: 'Articles Hub', subtitle: 'Buying · compatibility · fair play' },
  { file: 'placeholder-community.jpg', eyebrow: 'FORUMS', title: 'Forums Hub', subtitle: 'Setup and troubleshooting guides' },
  { file: 'placeholder-faq.jpg', eyebrow: 'FAQ', title: 'FAQ', subtitle: 'Pricing · checkout · risk' },
  { file: 'placeholder-contact.jpg', eyebrow: 'CONTACT', title: 'Contact', subtitle: 'Questions about this site' },
  { file: 'placeholder-product.jpg', eyebrow: 'PRODUCT', title: 'R6 Siege Cheats', subtitle: 'Modules · pricing · checkout' },
]

const created = []

for (const item of STATIC_OG) {
  await writeOgJpeg(join(ogDir, item.file), item.eyebrow, item.title, item.subtitle)
  created.push(`og/${item.file}`)
}

for (const item of CARD_MEDIA) {
  await writeOgJpeg(join(mediaDir, item.file), item.eyebrow, item.title, item.subtitle, 960, 540)
  created.push(`media/${item.file}`)
}

function loadBlogMeta(src) {
  const pattern =
    /slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],[\s\S]*?tag:\s*['"]([^'"]+)['"]/g
  return [...src.matchAll(pattern)].map((m) => ({
    slug: m[1],
    title: m[2],
    tag: m[3],
  }))
}

const blogsSrc = await readFile(blogsPath, 'utf8')
const blogs = loadBlogMeta(blogsSrc)

async function writeCustomBlogArt(slug, title) {
  const candidates = [
    join(mediaDir, 'blog-uploads', `${slug}.jpg`),
    join(mediaDir, 'blog-uploads', `${slug}.source.jpeg`),
    join(mediaDir, 'blog-uploads', `${slug}.source.jpg`),
  ]
  for (const uploadPath of candidates) {
    try {
      const src = sharp(uploadPath)
      await src
        .clone()
        .resize(1200, 630, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(join(ogDir, `guides-${slug}.jpg`))
      await src
        .clone()
        .resize(960, 540, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(join(mediaDir, `card-${slug}.jpg`))
      // Keep a full-quality display jpg (same URL for cards + article heroes).
      if (!uploadPath.endsWith(`${slug}.jpg`)) {
        await sharp(uploadPath)
          .resize(1920, 1080, { fit: 'cover', position: 'centre' })
          .jpeg({ quality: 100, mozjpeg: true, chromaSubsampling: '4:4:4' })
          .toFile(join(mediaDir, 'blog-uploads', `${slug}.jpg`))
      }
      return true
    } catch {
      /* try next candidate */
    }
  }
  return false
}

for (const blog of blogs) {
  const title = blog.title.replace(/\s*\|\s*.*$/, '').slice(0, 48)
  const usedCustom = await writeCustomBlogArt(blog.slug, title)
  if (!usedCustom) {
    await writeOgJpeg(
      join(ogDir, `guides-${blog.slug}.jpg`),
      `R6 SIEGE · ${blog.tag.toUpperCase()}`,
      title,
      'R6 Siege Cheats — supporting article',
    )
    await writeOgJpeg(
      join(mediaDir, `card-${blog.slug}.jpg`),
      `R6 SIEGE · ${blog.tag.toUpperCase()}`,
      title,
      'Supporting article',
      960,
      540,
    )
  }
  created.push(`og/guides-${blog.slug}.jpg`)
  created.push(`media/card-${blog.slug}.jpg`)
}

for (const size of [192, 512]) {
  await sharp(iconSvg(size)).png().toFile(join(iconsDir, `icon-${size}.png`))
  created.push(`icons/icon-${size}.png`)
}

console.log(`SEO / media / PWA assets ready (${created.length})`)
