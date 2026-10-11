import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LogoMark } from './LogoMark'
import { CheckoutLink } from './CheckoutLink'
import { PRODUCT_PATH } from '../data/product'
import { SITE_NAME } from '../data/site'
import { useHeroInView } from '../hooks/useHeroInView'

/** Primary nav — Home + distinct Blogs / Guides / Forums hubs. */
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Blogs', to: '/blogs/' },
  { label: 'Guides', to: '/guides/' },
  { label: 'Forums', to: '/forums/' },
  { label: 'Product', to: PRODUCT_PATH },
  { label: 'FAQ', to: '/faq/' },
  { label: 'Support', to: '/contact/' },
] as const

type NavbarProps = {
  onVideo?: boolean
  /** CSS selector for the hero; navbar only shows while this is in view when onVideo. */
  heroSelector?: string
}

/**
 * Fixed header. On video heroes, only visible while the hero is on screen —
 * does not reappear on scroll-up after leaving the hero.
 * Background stays fully transparent.
 */
export function Navbar({ onVideo = false, heroSelector = '#home' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroInView = useHeroInView(heroSelector, onVideo)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Video heroes: hide once past the hero. Non-hero pages: always visible.
  const hidden = onVideo && !menuOpen && !heroInView
  const brandClass = 'text-z-ink'

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full bg-transparent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <nav className="page-x flex flex-row flex-nowrap items-center justify-between gap-3 py-4 sm:py-5">
          <a href="/" className="flex min-w-0 shrink items-center gap-2.5">
            <LogoMark className={`${brandClass} shrink-0 text-z-soft`} />
            <span
              className={`truncate text-sm font-semibold tracking-tight sm:text-base ${brandClass}`}
            >
              {SITE_NAME}
            </span>
          </a>

          <div className="nav-desktop-cluster ml-auto hidden shrink-0 flex-row flex-nowrap items-center gap-2 md:flex">
            <div className="nav-chip nav-chip-interactive group/nav flex flex-row flex-nowrap items-center gap-0.5 rounded-full px-1 py-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.to}
                  className="nav-chip-link inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1.5 text-sm font-medium text-z-ink/70 transition-[color,background-color] duration-200 ease-out hover:bg-z-accent/12 hover:text-z-ink focus-visible:bg-z-accent/12 focus-visible:text-z-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-soft/40 lg:px-3"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <CheckoutLink className="cta-gradient flex shrink-0 items-center self-stretch whitespace-nowrap rounded-full px-5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-soft/50">
              Buy Now
            </CheckoutLink>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-z-soft/25 bg-z-elevated/80 text-z-ink transition-colors duration-200 md:hidden"
          >
            <Menu
              className={`absolute h-5 w-5 transition-all duration-300 ${brandClass} ${
                menuOpen ? 'rotate-90 scale-0 opacity-0' : 'opacity-100'
              }`}
            />
            <X
              className={`absolute h-5 w-5 transition-all duration-300 ${brandClass} ${
                menuOpen ? 'opacity-100' : '-rotate-90 scale-0 opacity-0'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Reserve space so page content is not hidden under the fixed bar (except video heroes). */}
      {!onVideo ? <div className="h-[4.5rem] shrink-0 sm:h-[5rem]" aria-hidden /> : null}

      <div
        className={`fixed inset-0 z-40 bg-[#06020f]/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`fixed right-0 top-0 z-40 flex h-full w-64 flex-col border-l border-z-soft/20 bg-z-elevated/95 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 pt-24">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.label}
              href={link.to}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-z-ink/80 transition-all hover:bg-z-accent/15 hover:text-z-ink"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                transitionDelay: menuOpen ? `${index * 40}ms` : '0ms',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mt-auto px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
          <CheckoutLink
            onClick={() => setMenuOpen(false)}
            className="cta-gradient block w-full rounded-full px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Buy Now
          </CheckoutLink>
        </div>
      </div>
    </>
  )
}
