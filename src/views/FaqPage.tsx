import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { FaqAccordion } from '../components/FaqSection'
import { SITE_FAQS } from '../data/faqs'
import { SITE_NAME } from '../data/site'

export function FaqPage() {
  return (
    <div className="content-surface min-h-screen overflow-x-hidden text-white">
      <Navbar />

      <main>
        <section className="page-x pt-12 sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-z-soft/80">
              {SITE_NAME}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Rainbow Six Siege FAQ
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/60">
              What this independent publication covers, how we source facts, and how fair-play
              topics are handled.
            </p>
          </div>
        </section>

        <section id="faq" className="page-x py-10 sm:py-12" aria-labelledby="faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2
              id="faq-heading"
              className="mb-6 text-lg font-semibold tracking-tight text-white sm:text-xl"
            >
              All questions
            </h2>

            <FaqAccordion items={SITE_FAQS} />
          </div>
        </section>

        <section className="page-x border-t border-white/10 py-14 sm:py-16">
          <div className="mx-auto flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Still have a question?
              </h2>
              <p className="mt-2 max-w-md text-sm text-white/50">
                Reach out via Contact, or browse the full guides hub.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a
                href="/guides"
                className="inline-flex h-11 items-center justify-center rounded-full border border-z-soft/35 bg-white/[0.06] px-5 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:border-z-soft/50 hover:bg-white/[0.1]"
              >
                Guides hub
              </a>
              <a
                href="/contact"
                className="cta-gradient inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/faq" />
    </div>
  )
}
