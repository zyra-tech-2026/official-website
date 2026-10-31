import type { CSSProperties } from 'react'
import { projects, type Project } from '../../data/projects'

import projectPlaceholder from '../../assets/svg/project-placeholder.svg'

const featuredIds = [
  'refuge',
  'nuba',
  'zest',
  'alat',
  // 'mellow',
  'elderops',
  'exo-agents',
  'invoq',
]

const tagStyles = [
  'bg-[#ede9fe] text-[#6d28d9]',
  'bg-[#dcfce7] text-[#166534]',
  'bg-[#fef3c7] text-[#92400e]',
]

type ShowcaseCard = {
  id: string
  name: string
  title: string
  tags: string[]
  points: string[]
  image: string
  href?: string
}

function toCard(project: Project): ShowcaseCard {
  return {
    id: project.id,
    name: project.name,
    title: project.cardTitle ?? `${project.name} - ${project.title}`,
    tags: project.tags ?? project.services.slice(0, 3),
    points:
      project.points ?? project.metrics.map(([lead, rest]) => `${lead} ${rest}`),
    image: project.previewImage,
    href: project.href,
  }
}

const featuredCards = featuredIds.map((id): ShowcaseCard => {
  const project = projects.find((item) => item.id === id)
  return project
    ? toCard(project)
    : {
        id,
        name: id,
        title: id,
        tags: [],
        points: [],
        image: projectPlaceholder,
      }
})

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 size-5 shrink-0 text-orange"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 10.5l4.5 4.5L16.5 5" />
    </svg>
  )
}

export function ShowcaseSection() {
  return (
    <section
      id="works"
      className="bg-white px-5 py-20 text-ink sm:px-8 lg:px-5 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <p className="flex items-center justify-center gap-4 text-base sm:text-xl">
          <span
            className="size-2.5 rounded-full bg-orange"
            aria-hidden="true"
          />
          Our Work
        </p>
        <h2 className="mx-auto mt-7 max-w-[1000px] text-center text-[clamp(36px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.05em]">
          A selection of products we’ve shipped.
        </h2>
        <div className="mt-12 space-y-8">
          {featuredCards.map((card, index) => (
            <article
              key={card.id}
              className="sticky top-[calc(24px+var(--i)*12px)] grid h-[500px] grid-rows-[170px_1fr] overflow-hidden rounded-[28px] bg-white shadow-[0_-12px_32px_-16px_rgba(0,0,0,0.18)] ring-1 ring-line sm:h-[620px] sm:grid-rows-[260px_1fr] lg:top-[calc(96px+var(--i)*24px)] lg:h-[540px] lg:grid-cols-[53.5%_1fr] lg:grid-rows-1"
              style={{ '--i': index } as CSSProperties}
            >
              <div className="h-full overflow-hidden bg-work-image">
                <img
                  src={card.image}
                  alt={`${card.name} project preview`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex min-h-0 flex-col justify-center overflow-hidden px-5 py-5 sm:px-10 sm:py-9 lg:px-14 lg:py-10">
                <h3 className="max-w-[420px] text-xl leading-snug tracking-[-0.03em] sm:text-[28px]">
                  {card.title}
                </h3>
                {card.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
                    {card.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className={`rounded-full px-2.5 py-1 text-xs ${tagStyles[tagIndex % tagStyles.length]}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {card.points.length > 0 && (
                  <ul className="mt-4 space-y-2.5 text-sm leading-snug text-about-copy sm:mt-7 sm:space-y-4 sm:text-[15px]">
                    {card.points.slice(0, 4).map((point, pointIndex) => (
                      <li
                        key={point}
                        className={`gap-3 sm:gap-4 ${pointIndex >= 3 ? 'hidden lg:flex' : 'flex'}`}
                      >
                        <CheckIcon />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {card.href && (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-[46px] sm:mt-9 w-fit items-center gap-3 rounded-full bg-about-dark py-1 pr-1 pl-4 text-sm text-white"
                  >
                    Learn more{' '}
                    <span
                      className="grid size-[38px] place-items-center rounded-full bg-orange"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
