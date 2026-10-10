import { ArrowRight } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSearch } from '../components/HeroSearch'
import { FaqSection } from '../components/FaqSection'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { HeroMedia } from '../components/HeroMedia'
import { CheckoutLink } from '../components/CheckoutLink'
import { HOME_FAQS } from '../data/faqs'
import { HOME_HEADINGS, SITE_NAME, SITE_PURPOSE } from '../data/site'
import { BLOGS, blogPath } from '../data/blogs'
import { FEATURED_CATEGORIES } from '../data/categories'
import { getGuideMedia } from '../data/media'
import { PRODUCT_NAME, PRODUCT_PATH, PRODUCT_PRICE_USD } from '../data/product'

export function HomePage() {
  const featuredGuides = BLOGS.slice(0, 6)
  const recentDiscussions = BLOGS.slice(0, 4)

  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      {/* Strict 16:9 hero — slightly inset from the edges; no h-screen / 100vh */}
      <div className="bg-z-bg px-3 sm:px-4 lg:px-6">
        <section
          id="home"
          className="relative mx-auto w-full max-w-[90rem] aspect-video overflow-hidden bg-z-bg"
        >
          <HeroMedia />
          {/* Light text-only scrim — no video filters; keeps copy readable */}
          <div
            className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-black/50 via-black/15 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-black/35 via-transparent to-transparent"
            aria-hidden
          />
          <Navbar onVideo />

          <div className="relative z-20 flex h-full min-h-0 flex-col pt-[4.5rem] sm:pt-[5rem]">
            <main className="page-x mt-auto pb-6 sm:pb-8 lg:pb-10">
              <div className="relative z-30 max-w-md lg:max-w-lg">
                <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-200 drop-shadow-md sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
                  RAINBOW SIX SIEGE · PC · R6 SIEGE CHEATS
                </p>
                <h1 className="text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#e8e0ff] drop-shadow-xl sm:text-[2.375rem] lg:text-[2.8rem] lg:leading-[1.1]">
                  {HOME_HEADINGS.h1}
                </h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-200 drop-shadow-md sm:mt-3.5 sm:text-[0.95rem]">
                  R6 Siege Cheats for Windows PC, with original articles on what it includes, how
                  buying and delivery work, PC compatibility, and an honest look at risk and fair
                  play.
                </p>

                <div className="relative z-50 mt-5 flex flex-col gap-2.5 drop-shadow-lg sm:flex-row sm:items-center">
                  <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    Buy Now
                  </CheckoutLink>
                  <a
                    href={PRODUCT_PATH}
                    className="inline-flex items-center justify-center rounded-full border border-z-soft/35 bg-[rgba(28,22,48,0.88)] px-5 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl transition-[background-color,border-color] hover:border-z-soft/50 hover:bg-[rgba(36,28,58,0.95)]"
                  >
                    View Product
                  </a>
                </div>
              </div>
            </main>
          </div>
        </section>
      </div>

      <div className="hero-to-body" aria-hidden />

      <div className="page-body relative z-10">
        <section className="page-band page-x border-t border-z-soft/15 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {HOME_HEADINGS.h2Features}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURED_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={cat.href}
                  className="page-card topic-card-interactive group flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <MediaPlaceholder
                    label={`[${cat.placeholderKey.toUpperCase()}_CARD]`}
                    src={cat.imageSrc}
                    alt={cat.imageAlt}
                    aspectRatio="16/9"
                    width={960}
                    height={540}
                    quality={100}
                    unoptimized
                    className="rounded-none border-0 border-b border-white/10"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-white/45">
                        {cat.category}
                      </span>
                      <span className="text-xs text-white/35">{cat.readMinutes} min</span>
                    </div>
                    <p className="mt-3 text-base font-semibold tracking-tight text-white">
                      {cat.title}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                      {cat.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <time className="text-xs text-white/35" dateTime={cat.date}>
                        {cat.date}
                      </time>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                        Read More
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.75}
                        />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="guides" className="page-x py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {HOME_HEADINGS.h2Featured}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                
                </p>
              </div>
              <a
                href="/guides"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                All articles
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredGuides.map((post) => {
                const media = getGuideMedia(post.slug)
                return (
                  <a
                    key={post.slug}
                    href={blogPath(post.slug)}
                    className="page-card topic-card-interactive group flex h-full flex-col overflow-hidden rounded-2xl"
                  >
                    <MediaPlaceholder
                      label={`[${post.slug.toUpperCase()}_CARD]`}
                      src={media.image}
                      alt={media.alt}
                      aspectRatio="16/9"
                      width={960}
                      height={540}
                      quality={100}
                      unoptimized
                      className="rounded-none border-0 border-b border-white/10"
                    />
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="text-xs uppercase tracking-wider text-white/45">{post.tag}</p>
                      <p className="mt-2 text-lg font-semibold tracking-tight text-white">
                        {post.title}
                      </p>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                        Read article
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={1.75}
                        />
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        <section className="page-band page-x border-t border-z-soft/15 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                 
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Forums
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                  Browse R6 setup, compatibility, and troubleshooting topics. These are editorial
                  guides — not live user threads.
                </p>
              </div>
              <a
                href="/forums"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                View All
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div className="relative z-20 mt-8 max-w-xl">
              <HeroSearch
                placeholder="Search forums — setup, ESP, BattlEye…"
                submitTo="forums"
              />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {recentDiscussions.map((post) => (
                <a
                  key={post.slug}
                  href={blogPath(post.slug)}
                  className="page-card group flex items-start justify-between gap-4 rounded-2xl p-5"
                >
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-white/45">{post.tag}</p>
                    <p className="mt-1.5 text-sm font-semibold text-white group-hover:text-white/85">
                      {post.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/50">{post.excerpt}</p>
                  </div>
                  <ArrowRight
                    className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="page-band page-x border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
            <a
              href="/faq"
              className="page-card group flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-purple-500/30 hover:bg-gradient-to-br hover:from-purple-900/20 hover:to-transparent hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] sm:rounded-3xl sm:p-8 lg:p-10"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  About {SITE_NAME}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {HOME_HEADINGS.h2About}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  {SITE_PURPOSE}
                </p>
              </div>
              <span className="mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                Read our FAQ
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </span>
            </a>

            <div
              id="access"
              className="page-card relative flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-purple-500/30 hover:bg-gradient-to-br hover:from-purple-900/20 hover:to-transparent hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)] sm:rounded-3xl sm:p-8 lg:p-10"
            >
              <a
                href={PRODUCT_PATH}
                className="absolute inset-0 z-0 rounded-2xl sm:rounded-3xl"
                aria-label={`View ${PRODUCT_NAME} product details`}
              />
              <div className="relative z-10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Product
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {HOME_HEADINGS.h2Access}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  {PRODUCT_NAME} for Windows PC — module overview, compatibility notes, and pricing
                  from ${PRODUCT_PRICE_USD}. Confirm status on the product page before checkout.
                </p>
              </div>
              <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <span className="pointer-events-none inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-white">
                  View product details
                </span>
                <CheckoutLink className="cta-gradient relative z-20 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                  Buy Now
                </CheckoutLink>
              </div>
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          heading={HOME_HEADINGS.h2Faq}
          intro="What this site covers, how buying works, and how risk and fair play are handled."
          items={HOME_FAQS}
          moreHref="/faq"
          moreLabel="Full FAQ →"
        />

        <SiteFooter currentPath="/" />
      </div>
    </div>
  )
}
