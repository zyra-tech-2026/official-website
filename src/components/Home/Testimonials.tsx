import { SectionLabel } from './SectionLabel'

const quotes = [
  ['JSEL Studios took our idea from a loose direction to a launch plan in weeks. The clarity changed our roadmap.', 'Ayo', 'Founder, VaultFlow'],
  ['They understood the user flow faster than anyone we had tried. Our team finally knew what to build next.', 'David', 'COO, Sentr'],
  ['Transparent, calm, and genuinely useful. We shipped the first release with a product direction that felt obvious.', 'Mara', 'Founder, Cartlift'],
]

export function Testimonials() {
  return (
    <section id="faqs" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <SectionLabel tone="pink">Testimonials</SectionLabel>
      <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-5xl">
        Don't take
        <br />
        our word for it.
      </h2>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {quotes.map(([quote, name, role]) => (
          <article key={name} className="rounded-[8px] bg-white p-6">
            <p className="mb-8 text-orange">*****</p>
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
