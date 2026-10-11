import { useId, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '../data/faqs'

type FaqSectionProps = {
  id?: string
  heading: string
  intro?: string
  items: FaqItem[]
  /** Extra class on the outer section */
  className?: string
  /** Optional link under the list (e.g. full FAQ on homepage) */
  moreHref?: string
  moreLabel?: string
  /** Optional heading size override to match page-specific UI */
  headingClassName?: string
}

const PANEL_TRANSITION = { duration: 0.25, ease: 'easeInOut' as const }
const ICON_TRANSITION = { duration: 0.25, ease: 'easeInOut' as const }

/**
 * Animated FAQ accordion — one panel open at a time.
 * Questions are real <h2> elements for hierarchy; answers stay in the DOM for SEO.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div key={item.q} className="faq-item py-1">
            <h2 className="m-0 text-[1.05rem] font-semibold leading-snug tracking-tight text-white sm:text-xl">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full cursor-pointer list-none items-start justify-between gap-4 rounded-lg py-5 text-left font-inherit outline-none transition-[color,box-shadow] duration-200 hover:text-white/90 focus-visible:ring-2 focus-visible:ring-z-soft/40"
              >
                <span className="pr-2">{item.q}</span>
                <motion.span
                  className="mt-1 inline-flex shrink-0"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={ICON_TRANSITION}
                  aria-hidden
                >
                  <ChevronDown className="h-5 w-5 text-white/40" strokeWidth={1.75} />
                </motion.span>
              </button>
            </h2>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={false}
              animate={
                isOpen
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={PANEL_TRANSITION}
              className="overflow-hidden"
              aria-hidden={!isOpen}
            >
              <p className="pb-5 pr-8 text-sm leading-relaxed text-white/55 sm:text-base">
                {item.a}
              </p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Visible FAQ accordion: section H2 + question H2s + answer text in the DOM.
 * Structured data comes from page-level FAQPage JSON-LD only (no duplicate microdata).
 */
export function FaqSection({
  id = 'faq',
  heading,
  intro,
  items,
  className = '',
  moreHref,
  moreLabel = 'All questions →',
  headingClassName = 'text-2xl font-semibold tracking-tight text-white sm:text-3xl',
}: FaqSectionProps) {
  return (
    <section
      id={id}
      className={`page-x border-t border-z-soft/15 py-14 sm:py-16 ${className}`.trim()}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-3xl">
        <h2 id={`${id}-heading`} className={headingClassName}>
          {heading}
        </h2>
        {intro ? (
          <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">{intro}</p>
        ) : null}

        <div className="mt-8">
          <FaqAccordion items={items} />
        </div>

        {moreHref ? (
          <a
            href={moreHref}
            className="mt-8 inline-flex text-sm font-semibold text-z-soft transition-colors hover:text-white"
          >
            {moreLabel}
          </a>
        ) : null}
      </div>
    </section>
  )
}
