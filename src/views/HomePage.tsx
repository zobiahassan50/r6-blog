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
import { FORUM_THREADS } from '../data/forums'
import { GUIDES } from '../data/guides'
import { getGuideMedia } from '../data/media'
import { PRODUCT_NAME, PRODUCT_PATH, PRODUCT_PRICE_USD } from '../data/product'

export function HomePage() {
  const featuredBlogs = BLOGS.slice(0, 3)
  const featuredGuides = GUIDES.slice(0, 4)
  const featuredForums = FORUM_THREADS.slice(0, 6)

  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      {/* Full-bleed hero — edge to edge, no side framing */}
      <section id="home" className="relative w-full overflow-hidden">
        <div className="relative w-full aspect-video min-h-[18rem] overflow-hidden sm:min-h-[22rem]">
          <HeroMedia />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-40 bg-gradient-to-t from-z-bg via-z-bg/70 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-black/20 via-transparent to-transparent"
            aria-hidden
          />
          <Navbar onVideo />

          {/* Bottom-left hero copy — top ~60% of video stays clear */}
          <div className="relative z-20 flex h-full min-h-0 flex-col justify-end pt-[4.5rem] sm:pt-[5rem]">
            <main className="page-x items-start pb-16 text-left sm:pb-20 lg:pb-24">
              <div className="relative z-30 max-w-md lg:max-w-lg">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-200 drop-shadow-md sm:mb-2.5 sm:text-xs sm:tracking-[0.2em]">
                  RAINBOW SIX SIEGE · PC · R6 SIEGE CHEATS
                </p>
                <h1 className="text-[2rem] font-semibold leading-[1.12] tracking-tight text-[#e8e0ff] drop-shadow-xl sm:text-[2.375rem] lg:text-[2.8rem] lg:leading-[1.1]">
                  {HOME_HEADINGS.h1}
                </h1>
                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-gray-200 drop-shadow-md sm:mt-3 sm:text-[0.95rem]">
                  R6 Siege Cheats for Windows PC — with separate Blogs, Guides, and Forums so you can
                  read, learn, and ask without mixed labels.
                </p>

                <div className="relative z-50 mt-4 flex flex-col items-start gap-2.5 drop-shadow-lg sm:mt-5 sm:flex-row sm:items-center">
                  <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    Buy Now
                  </CheckoutLink>
                  <a
                    href={PRODUCT_PATH}
                    className="inline-flex items-center justify-center rounded-full border border-z-soft/35 bg-[rgba(28,22,48,0.72)] px-5 py-2.5 text-sm font-semibold text-white transition-[background-color,border-color] hover:border-z-soft/50 hover:bg-[rgba(36,28,58,0.88)]"
                  >
                    View Product
                  </a>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <div className="hero-to-body" aria-hidden />

      <div className="page-body relative z-10">
        <section id="guides" className="page-band page-x border-t border-z-soft/15 py-14">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Practical checklists
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {HOME_HEADINGS.h2Guides}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                  Setup, compatibility, and risk checklists — not forum threads or blog essays.
                </p>
              </div>
              <a
                href="/guides/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                All guides
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {featuredGuides.map((guide) => (
                <a
                  key={guide.id}
                  href={guide.href}
                  className="page-card topic-card-interactive group flex items-start justify-between gap-4 rounded-2xl p-5"
                >
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-white/45">{guide.tag}</p>
                    <p className="mt-1.5 text-sm font-semibold text-white">{guide.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/50">{guide.excerpt}</p>
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

        <section id="blogs" className="page-x py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Editorial
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {HOME_HEADINGS.h2Blogs}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                  Long-form articles on features, terminology, and fair play.
                </p>
              </div>
              <a
                href="/blogs/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                All blogs
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBlogs.map((post) => {
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
                        Read blog
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

        {/* Forums preview — layout reference from dayzcheats.io (R6 copy only) */}
        <section id="forums" className="page-band page-x border-t border-z-soft/15 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Forums
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {HOME_HEADINGS.h2Forums}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                  Community boards for product questions, setup talk, status notes, and support —
                  separate from Blogs and Guides.
                </p>
              </div>
              <a
                href="/forums/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                All forums
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div className="relative z-20 mt-8 max-w-xl">
              <HeroSearch
                placeholder="Search forums — product, setup, billing, status…"
                submitTo="forums"
                corpus="forums"
              />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredForums.map((thread) => (
                <a
                  key={thread.id}
                  href={thread.href}
                  className="page-card group flex h-full flex-col rounded-2xl p-5 sm:p-6"
                >
                  <p className="text-xs uppercase tracking-wider text-white/45">{thread.board}</p>
                  <p className="mt-2 text-lg font-semibold tracking-tight text-white">
                    {thread.title}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">
                    {thread.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                    Open topic
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.75}
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="page-band page-x border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
            <a
              href="/faq/"
              className="page-card topic-card-interactive group flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
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
              className="page-card topic-card-interactive relative flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
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
          moreHref="/faq/"
          moreLabel="Full FAQ →"
        />

        <SiteFooter currentPath="/" />
      </div>
    </div>
  )
}
