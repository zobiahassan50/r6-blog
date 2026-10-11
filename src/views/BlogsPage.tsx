import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSearch } from '../components/HeroSearch'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { BLOGS, blogPath } from '../data/blogs'
import { PAGE_IMAGES } from '../data/images'
import { ARTICLES_HERO_VIDEO, getGuideMedia } from '../data/media'
import { SITE_NAME } from '../data/site'

type BlogsPageProps = {
  initialQuery?: string
}

export function BlogsPage({ initialQuery = '' }: BlogsPageProps) {
  const [q, setQ] = useState(() => initialQuery)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return BLOGS
    return BLOGS.filter((b) => {
      const hay = `${b.title} ${b.excerpt} ${b.tag} ${b.searchTerms}`.toLowerCase()
      return hay.includes(term)
    })
  }, [q])

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <section
        id="blogs-hero"
        className="relative flex min-h-[55vh] flex-col overflow-x-clip sm:min-h-[60vh]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <MediaPlaceholder
            label="[BLOGS_HERO]"
            src={PAGE_IMAGES.guides.src}
            videoUrl={ARTICLES_HERO_VIDEO}
            alt={PAGE_IMAGES.guides.alt}
            aspectRatio="16/9"
            className="absolute inset-0 h-full w-full rounded-none border-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-z-bg via-z-bg/75 to-z-bg/35" />
        </div>
        <Navbar onVideo heroSelector="#blogs-hero" />
        <div className="relative z-20 flex min-h-[55vh] flex-col pt-[4.5rem] sm:min-h-[60vh] sm:pt-[5rem]">
          <div className="page-x mt-auto pb-10 sm:pb-14">
            <div className="relative z-30 mx-auto max-w-6xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Blogs · {SITE_NAME}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                R6 Siege Cheats Blogs
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                Original editorial articles on features, ESP and wallhack terminology, anti-cheat
                context, settings, and fair play — separate from Guides and Forums.
              </p>
              <div className="relative z-50 mt-7">
                <HeroSearch
                  value={q}
                  onChange={setQ}
                  submitTo="filter"
                  placeholder="Search blogs — ESP, wallhack, BattlEye, settings…"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hero-to-body" aria-hidden />

      <main className="page-body relative z-10">
        <section className="page-x py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                {q.trim() ? 'Search results' : 'All blogs'}
              </h2>
              <p className="text-sm text-white/40">
                {filtered.length} post{filtered.length === 1 ? '' : 's'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="page-card mt-8 rounded-2xl px-6 py-10 text-center">
                <p className="text-sm text-white/55">
                  Nothing matched &quot;{q}&quot;. Try &quot;ESP&quot;, &quot;wallhack&quot;, or
                  &quot;settings&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => setQ('')}
                  className="mt-4 text-sm font-medium text-white hover:text-white/80"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => {
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
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium uppercase tracking-wider text-white/45">
                            {post.tag}
                          </span>
                          <span className="text-xs text-white/35">{post.readMinutes} min</span>
                        </div>
                        <h3 className="mt-3 text-base font-semibold tracking-tight text-white sm:text-lg">
                          {post.title}
                        </h3>
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
            )}
          </div>
        </section>

        <SiteFooter currentPath="/blogs/" />
      </main>
    </div>
  )
}
