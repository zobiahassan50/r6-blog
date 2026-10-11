import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSearch } from '../components/HeroSearch'
import { filterGuides } from '../data/guides'
import { SITE_NAME } from '../data/site'

type GuidesPageProps = {
  initialQuery?: string
}

export function GuidesPage({ initialQuery = '' }: GuidesPageProps) {
  const [q, setQ] = useState(() => initialQuery)

  const filtered = useMemo(() => filterGuides(q), [q])

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <Navbar />
      <main className="page-body relative z-10">
        <section className="page-x border-b border-z-soft/15 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Guides · {SITE_NAME}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              R6 Siege Cheats Guides
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              Practical checklists for setup, compatibility, settings, and risk — separate from
              editorial Blogs and community Forums.
            </p>
            <div className="relative z-50 mt-7 max-w-xl">
              <HeroSearch
                value={q}
                onChange={setQ}
                submitTo="filter"
                placeholder="Search guides — setup, compatibility, risk…"
              />
            </div>
          </div>
        </section>

        <section className="page-x py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-white">
                {q.trim() ? 'Matching guides' : 'All guides'}
              </h2>
              <p className="text-sm text-white/40">
                {filtered.length} guide{filtered.length === 1 ? '' : 's'}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="page-card mt-8 rounded-2xl px-6 py-10 text-center">
                <p className="text-sm text-white/55">
                  Nothing matched &quot;{q}&quot;. Try &quot;setup&quot;, &quot;compatibility&quot;,
                  or &quot;risk&quot;.
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
              <div className="mt-6 grid gap-3">
                {filtered.map((guide) => (
                  <a
                    key={guide.id}
                    href={guide.href}
                    className="page-card topic-card-interactive group flex items-start justify-between gap-4 rounded-2xl p-5 sm:p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-white/45">
                          {guide.tag}
                        </span>
                        <span className="text-xs text-white/35">{guide.readMinutes} min</span>
                      </div>
                      <h3 className="mt-2 text-base font-semibold tracking-tight text-white sm:text-lg">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{guide.excerpt}</p>
                    </div>
                    <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-white/80">
                      Open
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

        <SiteFooter currentPath="/guides/" />
      </main>
    </div>
  )
}
