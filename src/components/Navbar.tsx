import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LogoMark } from './LogoMark'
import { CheckoutLink } from './CheckoutLink'
import { PRODUCT_PATH } from '../data/product'
import { SITE_NAME } from '../data/site'
import { useScrollDirection } from '../hooks/useScrollDirection'

/** Primary nav: Forums + Product + Guides + FAQ + Contact + Buy CTA. */
const NAV_LINKS = [
  { label: 'Forums', to: '/forums' },
  { label: 'Product', to: PRODUCT_PATH },
  { label: 'Guides', to: '/guides' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
] as const

type NavbarProps = {
  onVideo?: boolean
}

/**
 * Fixed smart sticky header: hides on scroll down, shows on scroll up.
 * Desktop: right-aligned horizontal chip bar with hover expand animations.
 */
export function Navbar({ onVideo = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { direction, scrolled } = useScrollDirection()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const hidden = !menuOpen && direction === 'down' && scrolled
  const brandClass = 'text-z-ink'

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 w-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          onVideo && !scrolled
            ? 'bg-transparent'
            : 'border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl'
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
                  className="nav-chip-link inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium text-z-ink/70 transition-[color,background-color,transform,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-z-accent/15 hover:text-z-ink hover:scale-[1.03] focus-visible:bg-z-accent/15 focus-visible:text-z-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-soft/40"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <CheckoutLink className="cta-gradient flex shrink-0 items-center self-stretch whitespace-nowrap rounded-full px-5 text-sm font-semibold text-white transition-[opacity,transform] duration-300 hover:opacity-90 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-soft/50">
              Buy Now
            </CheckoutLink>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-z-soft/25 bg-z-elevated/80 text-z-ink backdrop-blur-lg transition-colors duration-300 md:hidden"
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
          <a
            href="/"
            onClick={() => setMenuOpen(false)}
            className="rounded-xl px-4 py-3 text-base font-medium text-z-ink/80 transition-all hover:bg-z-accent/15 hover:text-z-ink"
          >
            Home
          </a>
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.label}
              href={link.to}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-z-ink/80 transition-all hover:bg-z-accent/15 hover:text-z-ink"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                transitionDelay: menuOpen ? `${(index + 1) * 50}ms` : '0ms',
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
