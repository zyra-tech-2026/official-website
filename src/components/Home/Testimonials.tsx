import { SectionLabel } from './SectionLabel'

const quotes = [
  ['ZYRA took our idea from a loose direction to a launch plan in weeks. The clarity changed our roadmap.',  'Nick', 'Founder, ElderOps'],
  ['They understood the user flow faster than anyone we had tried. Our team finally knew what to build next.', 'Sruthi', 'COO, Exo-AI'],
  ['Transparent, calm, and genuinely useful. We shipped the first release with a product direction that felt obvious.', 'Emeka', 'Founder, NUBA'],
]

export function Testimonials() {
  return (
    <section id="faqs" className="mx-auto max-w-6xl px-5 pb-24 font-geist sm:px-8">
      <SectionLabel tone="pink">Testimonials</SectionLabel>
      <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-5xl">
        Don't take
        <br />
        our word for it.
      </h2>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {quotes.map(([quote, name, role]) => (
          <article key={name} className="rounded-[8px] bg-white p-6">
            <div className="mb-8 flex gap-1" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-orange" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-sm font-medium leading-6">{quote}</p>
            <div className="mt-8 text-xs text-muted">
              <p className="font-semibold text-ink">{name}</p>
              <p>{role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
