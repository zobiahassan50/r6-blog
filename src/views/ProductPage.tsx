import { ArrowRight, Crosshair, Eye, Radar, Shield } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { FaqSection } from '../components/FaqSection'
import { CheckoutLink } from '../components/CheckoutLink'
import {
  PRODUCT_COMPAT,
  PRODUCT_FAQS,
  PRODUCT_FEATURES,
  PRODUCT_NAME,
  PRODUCT_PATH,
  PRODUCT_PRICE_USD,
  PRODUCT_STATUS_LABEL,
  PRODUCT_STATUS_NOTE,
} from '../data/product'
import { SITE_HOST, SITE_NAME } from '../data/site'

const FEATURE_ICONS = {
  aimbot: Crosshair,
  esp: Eye,
  radar: Radar,
  access: Shield,
} as const

export function ProductPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <Navbar />

      <main className="page-body">
        <section className="page-x pt-12 sm:pt-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <div>
              <nav
                className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
                aria-label="Breadcrumb"
              >
                <a href="/" className="hover:text-white/70">
                  Home
                </a>
                <span>/</span>
                <span className="text-white/70">Product</span>
              </nav>

              <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-z-soft/80">
                {SITE_NAME} · Product
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Premium R6 Siege Cheat Modules
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
                Third-party Rainbow Six Siege PC modules listed below, with digital delivery after
                external checkout. Using unauthorized tools can violate game terms and risk account
                sanctions — read our fair-play article before you buy.
              </p>

              <div className="mt-8">
                <MediaPlaceholder
                  label="[PRODUCT_PREVIEW]"
                  src="/media/product-hero.jpg"
                  alt="Branded artwork for R6 Siege Cheats product"
                  aspectRatio="16/9"
                  priority
                  unoptimized
                />
              </div>

              <h2 className="mt-12 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Included modules
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {PRODUCT_FEATURES.map((feature) => {
                  const Icon =
                    FEATURE_ICONS[feature.id as keyof typeof FEATURE_ICONS] ?? Shield
                  return (
                    <div
                      key={feature.id}
                      className="page-card flex h-full min-h-[148px] flex-col rounded-2xl p-5"
                    >
                      <div className="icon-well mb-4">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                      </div>
                      <p className="text-sm font-semibold text-white">{feature.title}</p>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                        {feature.description}
                      </p>
                    </div>
                  )
                })}
              </div>

              <h2 className="mt-12 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Compatibility
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                {PRODUCT_COMPAT.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-z-soft" aria-hidden>
                      ·
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-relaxed text-white/55">
                <strong className="font-semibold text-white/80">Editorial note:</strong> Articles on{' '}
                {SITE_HOST} cover buying, compatibility, and fair-play risk as independent
                commentary. This product page is a separate commercial listing. We do not provide
                anti-cheat evasion instructions on this site.
              </p>
            </div>

            <aside className="lg:sticky lg:top-8">
              <div className="page-card rounded-2xl p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-z-soft">
                  {PRODUCT_STATUS_LABEL}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {PRODUCT_STATUS_NOTE}
                </p>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-wider text-white/45">From</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-white">
                    ${PRODUCT_PRICE_USD}
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Digital delivery · external checkout
                  </p>
                </div>

                <CheckoutLink className="cta-gradient mt-6 flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                  Buy Now
                </CheckoutLink>
                <a
                  href="/blogs/"
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white hover:bg-white/5"
                >
                  Browse blogs
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </a>
                <a
                  href="/faq/"
                  className="mt-3 block text-center text-xs text-white/45 hover:text-white/70"
                >
                  Read FAQ before buying
                </a>
              </div>
            </aside>
          </div>
        </section>

        <FaqSection
          id="product-faq"
          heading={`${PRODUCT_NAME} FAQ`}
          intro="Price, status honesty, affiliation, and checkout — before you buy."
          items={[...PRODUCT_FAQS]}
          moreHref="/faq/"
          moreLabel="Full site FAQ →"
        />

        <SiteFooter currentPath={PRODUCT_PATH} />
      </main>
    </div>
  )
}
