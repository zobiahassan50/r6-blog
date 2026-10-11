import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSearch } from '../components/HeroSearch'
import { MediaPlaceholder } from '../components/MediaPlaceholder'
import { filterForumThreads, FORUM_PAGE } from '../data/forums'
import { PAGE_IMAGES } from '../data/images'
import { FORUMS_HERO_VIDEO } from '../data/media'

type ForumsPageProps = {
  initialQuery?: string
}

export function ForumsPage({ initialQuery = '' }: ForumsPageProps) {
  const [q, setQ] = useState(() => initialQuery)

  const filtered = useMemo(() => filterForumThreads(q), [q])

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <section
        id="forums-hero"
        className="relative flex min-h-[55vh] flex-col overflow-x-clip sm:min-h-[60vh]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <MediaPlaceholder
            label="[FORUMS_HERO]"
            src={PAGE_IMAGES.community.src}
            videoUrl={FORUMS_HERO_VIDEO}
            alt={PAGE_IMAGES.community.alt}
            fill
            className="absolute inset-0 h-full w-full rounded-none border-0"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-z-bg via-z-bg/55 to-z-bg/20" />
        </div>

        <Navbar onVideo heroSelector="#forums-hero" />

        <div className="relative z-20 flex min-h-[55vh] flex-col pt-[4.5rem] sm:min-h-[60vh] sm:pt-[5rem]">
          <div className="page-x mt-auto pb-10 sm:pb-14">
            <div className="relative z-30 mx-auto max-w-6xl">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                {FORUM_PAGE.eyebrow}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {FORUM_PAGE.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                {FORUM_PAGE.intro}
              </p>
              <div className="relative z-50 mt-7">
                <HeroSearch
                  value={q}
                  onChange={setQ}
                  submitTo="forums"
                  corpus="forums"
                  placeholder={FORUM_PAGE.searchPlaceholder}
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
            <div className="page-card mb-10 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/45">
                  {FORUM_PAGE.productEyebrow}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  {FORUM_PAGE.productTitle}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/55">{FORUM_PAGE.productBlurb}</p>
              </div>
              <a
                href={FORUM_PAGE.productHref}
                className="cta-gradient inline-flex shrink-0 items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white"
              >
                {FORUM_PAGE.productCta}
              </a>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                {q.trim() ? 'Matching topics' : FORUM_PAGE.threadsHeading}
              </h2>
              <p className="text-sm text-white/40">
                {filtered.length} topic{filtered.length === 1 ? '' : 's'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="page-card mt-8 rounded-2xl px-6 py-10 text-center">
                <p className="text-sm text-white/55">
                  Nothing matched &quot;{q}&quot;. Try &quot;product&quot;, &quot;setup&quot;, or
                  &quot;billing&quot;.
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
              <div className="mt-6 divide-y divide-white/10 overflow-hidden rounded-2xl border border-z-soft/15">
                {filtered.map((thread) => (
                  <a
                    key={thread.id}
                    href={thread.href}
                    className="group flex items-start justify-between gap-4 bg-z-card/40 px-5 py-4 transition-colors hover:bg-white/[0.04] sm:px-6 sm:py-5"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-white/45">
                          {thread.board}
                        </span>
                        <span className="text-xs text-white/35">{thread.repliesLabel}</span>
                      </div>
                      <h3 className="mt-1.5 text-base font-semibold tracking-tight text-white sm:text-lg">
                        {thread.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{thread.excerpt}</p>
                    </div>
                    <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-white/70">
                      {FORUM_PAGE.openLabel}
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.75}
                      />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        <SiteFooter currentPath="/forums/" />
      </main>
    </div>
  )
}
