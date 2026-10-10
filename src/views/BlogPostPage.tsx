import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { CheckoutLink } from '../components/CheckoutLink'
import { BLOGS, blogPath, getBlog } from '../data/blogs'
import { getGuideMedia } from '../data/media'
import { PRODUCT_NAME, PRODUCT_PATH } from '../data/product'
import { renderRichParagraph } from '../lib/rich-text'
import { NotFoundPage } from './NotFoundPage'

type BlogPostPageProps = {
  slug: string
}

function sectionId(heading: string) {
  return heading
    .replace(/^\d+\)\s*/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const post = getBlog(slug)

  if (!post) return <NotFoundPage />

  const index = BLOGS.findIndex((b) => b.slug === post.slug)
  const prev = index > 0 ? BLOGS[index - 1] : undefined
  const next = index >= 0 && index < BLOGS.length - 1 ? BLOGS[index + 1] : undefined

  const related = (
    post.relatedSlugs && post.relatedSlugs.length > 0
      ? post.relatedSlugs.map((s) => getBlog(s)).filter((b): b is typeof post => Boolean(b))
      : BLOGS.filter((b) => b.slug !== post.slug)
  )
    .filter((b) => b.slug !== post.slug)
    .slice(0, 3)

  const featuredMedia = getGuideMedia(post.slug)

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <Navbar />

      <main className="page-body">
        <article className="page-x py-10 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
              aria-label="Breadcrumb"
            >
              <a href="/" className="hover:text-white/70">
                Home
              </a>
              <span>/</span>
              <a href="/guides" className="hover:text-white/70">
                Articles
              </a>
              <span>/</span>
              <span className="text-white/70">{post.tag}</span>
            </nav>

            <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {post.tag} · {post.readMinutes} min read · {post.author}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
              {post.excerpt}
            </p>
            <p className="mt-3 text-xs text-white/40">
              Published {post.date}
              {post.updated ? ` · Updated ${post.updated}` : ''}
            </p>

            {/* Same URL as listing cards via getGuideMedia(slug) — full-quality, unoptimized */}
            <MediaPlaceholder
              label="[ARTICLE_HERO_BANNER]"
              src={featuredMedia.image}
              alt={featuredMedia.alt}
              aspectRatio="16/9"
              width={1920}
              height={1080}
              quality={100}
              unoptimized
              className="mt-8 w-full"
              priority
            />

            {post.sections.length > 1 ? (
              <nav
                aria-label="Table of contents"
                className="page-card mt-8 rounded-2xl p-5 sm:p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                  On this page
                </p>
                <ol className="mt-3 space-y-2">
                  {post.sections.map((section, i) => (
                    <li key={section.heading}>
                      <a
                        href={`#${sectionId(section.heading)}`}
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {i + 1}. {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading} id={sectionId(section.heading)} className="scroll-mt-24">
                  <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/55 sm:text-base">
                    {section.body.map((para) => (
                      <p key={para.slice(0, 48)}>{renderRichParagraph(para)}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="page-card mt-12 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white">Ready for {PRODUCT_NAME}?</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Review the product page for modules and pricing, or continue browsing related
                articles. Purchases are completed through the external Buy Now checkout.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={PRODUCT_PATH}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  View product
                </a>
                <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white">
                  Buy Now
                </CheckoutLink>
                <a
                  href="/guides"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  More articles
                </a>
              </div>
            </div>

            {prev || next ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {prev ? (
                  <a
                    href={blogPath(prev.slug)}
                    className="page-card flex flex-col rounded-2xl p-5"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
                      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                      Previous
                    </span>
                    <span className="mt-1.5 text-sm font-semibold text-white">{prev.title}</span>
                  </a>
                ) : (
                  <div />
                )}
                {next ? (
                  <a
                    href={blogPath(next.slug)}
                    className="page-card flex flex-col items-end rounded-2xl p-5 text-right"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/45">
                      Next
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                    <span className="mt-1.5 text-sm font-semibold text-white">{next.title}</span>
                  </a>
                ) : null}
              </div>
            ) : null}

            <a
              href="/guides"
              className="mt-10 inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              All articles
            </a>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="page-band page-x border-t border-white/10 py-12 sm:py-16">
            <div className="mx-auto max-w-6xl">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Related articles
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((b) => {
                  const media = getGuideMedia(b.slug)
                  return (
                    <a
                      key={b.slug}
                      href={blogPath(b.slug)}
                      className="page-card topic-card-interactive group flex h-full flex-col overflow-hidden rounded-2xl"
                    >
                      <MediaPlaceholder
                        label={`[${b.slug.toUpperCase()}_RELATED]`}
                        src={media.image}
                        alt={media.alt}
                        aspectRatio="16/9"
                        width={960}
                        height={540}
                        quality={100}
                        unoptimized
                        className="rounded-none border-0 border-b border-white/10"
                      />
                      <div className="flex flex-1 flex-col p-5">
                        <p className="text-xs uppercase tracking-wider text-white/40">{b.tag}</p>
                        <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-white/85">
                          {b.title}
                        </h3>
                        <p className="mt-2 flex-1 text-xs leading-relaxed text-white/50">
                          {b.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-white/70">
                          Read
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                        </span>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        <SiteFooter currentPath={blogPath(post.slug)} />
      </main>
    </div>
  )
}
