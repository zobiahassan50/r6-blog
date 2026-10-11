import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, SyntheticEvent } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { BLOGS, blogPath } from '../data/blogs'
import { FORUM_THREADS } from '../data/forums'
import { GUIDES } from '../data/guides'

type SearchCorpus = 'blogs' | 'guides' | 'forums' | 'all'

type Hit = {
  key: string
  title: string
  meta: string
  href: string
}

type HeroSearchProps = {
  /** Controlled value when parent owns the query (e.g. Guides page) */
  value?: string
  onChange?: (value: string) => void
  /** Where Go navigates when there's no single exact match */
  submitTo?: 'blogs' | 'guides' | 'forums' | 'filter'
  /** Which content set powers suggestions (defaults from submitTo) */
  corpus?: SearchCorpus
  placeholder?: string
  autoFocus?: boolean
  className?: string
  /** Compact control for the site navbar */
  variant?: 'hero' | 'nav'
}

function resolveCorpus(submitTo: HeroSearchProps['submitTo'], corpus?: SearchCorpus): SearchCorpus {
  if (corpus) return corpus
  if (submitTo === 'forums') return 'forums'
  if (submitTo === 'guides') return 'guides'
  if (submitTo === 'filter') return 'blogs'
  return 'blogs'
}

function searchHits(term: string, corpus: SearchCorpus): Hit[] {
  const q = term.trim().toLowerCase()
  if (!q) return []

  const blogs: Hit[] =
    corpus === 'blogs' || corpus === 'all'
      ? BLOGS.filter((post) => {
          const hay = `${post.title} ${post.excerpt} ${post.tag} ${post.searchTerms}`.toLowerCase()
          return hay.includes(q)
        }).map((post) => ({
          key: `blog-${post.slug}`,
          title: post.title,
          meta: `Blog · ${post.tag}`,
          href: blogPath(post.slug),
        }))
      : []

  const guides: Hit[] =
    corpus === 'guides' || corpus === 'all'
      ? GUIDES.filter((guide) => {
          const hay = `${guide.title} ${guide.excerpt} ${guide.tag} ${guide.searchTerms}`.toLowerCase()
          return hay.includes(q)
        }).map((guide) => ({
          key: `guide-${guide.id}`,
          title: guide.title,
          meta: `Guide · ${guide.tag}`,
          href: guide.href,
        }))
      : []

  const forums: Hit[] =
    corpus === 'forums' || corpus === 'all'
      ? FORUM_THREADS.filter((thread) => {
          const hay =
            `${thread.title} ${thread.excerpt} ${thread.board} ${thread.searchTerms}`.toLowerCase()
          return hay.includes(q)
        }).map((thread) => ({
          key: `forum-${thread.id}`,
          title: thread.title,
          meta: `Forum · ${thread.board}`,
          href: thread.href,
        }))
      : []

  return [...guides, ...blogs, ...forums].slice(0, 8)
}

function hubForCorpus(corpus: SearchCorpus, submitTo: HeroSearchProps['submitTo']) {
  if (submitTo === 'forums' || corpus === 'forums') return '/forums/'
  if (submitTo === 'guides' || corpus === 'guides') return '/guides/'
  return '/blogs/'
}

export function HeroSearch({
  value,
  onChange,
  submitTo = 'blogs',
  corpus,
  placeholder = 'Search R6 blogs…',
  autoFocus = false,
  className = '',
  variant = 'hero',
}: HeroSearchProps) {
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [internal, setInternal] = useState(value ?? '')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const q = value !== undefined ? value : internal
  const activeCorpus = resolveCorpus(submitTo, corpus)
  const isNav = variant === 'nav'

  useEffect(() => {
    if (value !== undefined) setInternal(value)
  }, [value])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const matches = useMemo(() => searchHits(q, activeCorpus), [q, activeCorpus])

  function setQuery(next: string) {
    if (value === undefined) setInternal(next)
    onChange?.(next)
    setOpen(true)
    setActive(0)
  }

  function goToMatch(index: number) {
    const hit = matches[index]
    if (!hit) return
    setOpen(false)
    window.location.assign(hit.href)
  }

  function submit(e?: SyntheticEvent) {
    e?.preventDefault()
    const term = q.trim()
    if (!term) {
      if (isNav) return
      window.location.assign(hubForCorpus(activeCorpus, submitTo))
      return
    }
    if (matches.length === 1) {
      goToMatch(0)
      return
    }
    if (matches.length > 1 && open && matches[active]) {
      goToMatch(active)
      return
    }
    setOpen(false)
    // Parent owns live filtering (Blogs / Guides / Forums pages).
    if (submitTo === 'filter' || (submitTo === 'forums' && onChange)) {
      return
    }
    const base = hubForCorpus(activeCorpus, submitTo)
    window.location.assign(`${base}?q=${encodeURIComponent(term)}`)
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp') && matches.length) {
      setOpen(true)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, Math.max(matches.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && open && matches[active]) {
      e.preventDefault()
      goToMatch(active)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const showList = open && matches.length > 0

  return (
    <div
      ref={rootRef}
      className={`relative z-50 w-full ${className || (isNav ? '' : 'max-w-xl')}`.trim()}
    >
      <form
        onSubmit={submit}
        className={
          isNav
            ? 'relative z-50 flex w-full items-center gap-1.5 rounded-full border border-z-soft/25 bg-z-elevated/70 px-2.5 py-1.5 backdrop-blur-md'
            : 'relative z-50 flex w-full max-w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white sm:p-1'
        }
        role="search"
      >
        <div
          className={
            isNav
              ? 'flex min-w-0 flex-1 items-center gap-1.5'
              : 'flex w-full min-w-0 items-center gap-2 rounded-full bg-white px-3.5 py-2.5 sm:flex-1 sm:rounded-none sm:bg-transparent sm:px-3.5 sm:py-1.5'
          }
        >
          <Search
            className={`h-4 w-4 shrink-0 ${isNav ? 'text-z-ink/45' : 'text-gray-400'}`}
            strokeWidth={1.75}
            aria-hidden
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            autoFocus={autoFocus}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded={showList}
            className={
              isNav
                ? 'w-full min-w-0 flex-1 bg-transparent text-sm text-z-ink outline-none placeholder:text-z-ink/40'
                : 'w-full min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400'
            }
            autoComplete="off"
          />
        </div>
        {isNav ? (
          <button
            type="submit"
            aria-label="Search"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-z-accent/25 text-z-ink transition-colors hover:bg-z-accent/40"
          >
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        ) : (
          <button
            type="submit"
            className="cta-gradient inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto sm:shrink-0 sm:py-2"
          >
            Go
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        )}
      </form>

      {showList ? (
        <ul
          id={listId}
          role="listbox"
          className={`search-results absolute top-full z-[60] mt-2 max-h-72 overflow-y-auto rounded-2xl border border-z-soft/20 bg-z-card py-2 ${
            isNav ? 'left-auto right-0 w-[min(22rem,calc(100vw-2rem))]' : 'left-0 right-0'
          }`}
        >
          {matches.map((item, i) => (
            <li key={item.key} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => goToMatch(i)}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                  i === active ? 'bg-z-accent/20 text-z-ink' : 'text-white/75 hover:bg-z-accent/10'
                }`}
              >
                <span className="truncate font-medium">{item.title}</span>
                <span className="ml-3 shrink-0 text-xs text-z-soft/70">{item.meta}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
