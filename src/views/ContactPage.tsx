import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { FaqAccordion } from '../components/FaqSection'
import { SITE_NAME } from '../data/site'
import { CONTACT_FAQS, CONTACT_INTRO, CONTACT_TOPICS } from '../data/support'
import { blogPath } from '../data/blogs'
import { PRODUCT_PATH } from '../data/product'

export function ContactPage() {
  return (
    <div className="content-surface min-h-screen overflow-x-hidden text-white">
      <Navbar />

      <main>
        <section className="page-x pt-12 sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-z-soft/80">
              {SITE_NAME} · Contact
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Contact {SITE_NAME}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/60">{CONTACT_INTRO}</p>
            <p className="mt-3 text-sm text-white/45">
              Browse the{' '}
              <a
                href="/guides/"
                className="text-z-soft underline-offset-2 hover:text-white hover:underline"
              >
                articles hub
              </a>{' '}
              or the{' '}
              <a
                href={PRODUCT_PATH}
                className="text-z-soft underline-offset-2 hover:text-white hover:underline"
              >
                product page
              </a>
              . Start with{' '}
              <a
                href={blogPath('status-before-purchase')}
                className="text-z-soft underline-offset-2 hover:text-white hover:underline"
              >
                R6 Cheats Settings 2026
              </a>{' '}
              if you are deciding whether to purchase.
            </p>
          </div>
        </section>

        <section className="page-x py-10 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              What we can help with
            </h2>
            <ol className="mt-6 space-y-6">
              {CONTACT_TOPICS.map((topic, i) => (
                <li key={topic.heading} className="flex gap-4 sm:gap-5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-z-soft/25 bg-z-accent/15 text-sm font-semibold text-z-soft"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-base font-semibold text-white">{topic.heading}</h3>
                    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-white/55">
                      {topic.body.map((line) => (
                        <li key={line.slice(0, 48)}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="faq" className="page-x pb-10 sm:pb-12" aria-labelledby="contact-faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2
              id="contact-faq-heading"
              className="mb-6 text-lg font-semibold tracking-tight text-white sm:text-xl"
            >
              Contact FAQ
            </h2>
            <FaqAccordion items={CONTACT_FAQS} />
          </div>
        </section>

        <section className="page-x border-t border-white/10 py-14 sm:py-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Keep exploring
              </h2>
              <p className="mt-2 max-w-md text-sm text-white/50">
                Browse articles by topic, or check the FAQ for common questions.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a
                href="/faq/"
                className="inline-flex h-11 items-center justify-center rounded-full border border-z-soft/35 bg-white/[0.06] px-5 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:border-z-soft/50 hover:bg-white/[0.1]"
              >
                FAQ
              </a>
              <a
                href="/guides/"
                className="cta-gradient inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold text-white"
              >
                Articles hub
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/contact/" />
    </div>
  )
}
