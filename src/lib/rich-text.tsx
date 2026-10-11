import type { ReactNode } from 'react'
import { CHECKOUT_URL } from '../data/product'

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function isAllowedHref(href: string) {
  if (href.startsWith('/') && !href.startsWith('//')) return true
  if (href === CHECKOUT_URL) return true
  return false
}

/** Keep internal routes on trailing-slash canonicals. */
function normalizeInternalHref(href: string) {
  if (!href.startsWith('/') || href.startsWith('//')) return href
  if (href.includes('?') || href.includes('#')) return href
  if (href.endsWith('/')) return href
  return `${href}/`
}

/** Render paragraph text with optional markdown-style `[label](/path)` links. */
export function renderRichParagraph(text: string): ReactNode {
  const nodes: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  const re = new RegExp(LINK_RE.source, 'g')

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const [, label, rawHref] = match
    const href = isAllowedHref(rawHref) ? normalizeInternalHref(rawHref) : rawHref
    if (isAllowedHref(rawHref)) {
      const external = rawHref === CHECKOUT_URL
      nodes.push(
        <a
          key={`${href}-${match.index}`}
          href={external ? rawHref : href}
          className="text-z-soft underline-offset-2 hover:text-white hover:underline"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
        </a>,
      )
    } else {
      nodes.push(label)
    }
    last = match.index + match[0].length
  }

  if (last < text.length) nodes.push(text.slice(last))
  return nodes.length === 1 ? nodes[0] : nodes
}
