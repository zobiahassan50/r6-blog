import type { ReactNode } from 'react'
import { CHECKOUT_URL } from '../data/product'

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function isAllowedHref(href: string) {
  if (href.startsWith('/') && !href.startsWith('//')) return true
  if (href === CHECKOUT_URL) return true
  return false
}

/** Render paragraph text with optional markdown-style `[label](/path)` links. */
export function renderRichParagraph(text: string): ReactNode {
  const nodes: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  const re = new RegExp(LINK_RE.source, 'g')

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const [, label, href] = match
    if (isAllowedHref(href)) {
      const external = href === CHECKOUT_URL
      nodes.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
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
