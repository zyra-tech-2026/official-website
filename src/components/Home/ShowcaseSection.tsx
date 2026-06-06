import { MockPhoto } from './MockPhoto'
import { SectionLabel } from './SectionLabel'

const projects = [
  ['VaultFlow', 'Fintech onboarding, mobile interface, and product launch design.', '50% 63%'],
  ['VaultFlow', 'Research sprint, dashboard UX, and conversion-focused web flows.', '50% 73%'],
  ['VaultFlow', 'Account recovery, web app polish, and launch QA systems.', '50% 84%'],
]

export function ShowcaseSection() {
  return (
    <section id="works" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-5xl">
            Products we've built.
            <br />
            Results that speak.
          </h2>
        </div>
        <a href="#contact" className="hidden text-xs font-semibold hover:text-orange sm:block">
          View all work
        </a>
      </div>

      <div className="space-y-16">
        {projects.map(([title, body, position]) => (
          <article key={`${title}-${position}`}>
            <div className="mb-5">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 max-w-lg text-xs leading-6 text-muted">{body}</p>
            </div>
            <div className="h-[330px] overflow-hidden rounded-[10px] sm:h-[520px]">
              <MockPhoto alt={`${title} project preview`} position={position} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
