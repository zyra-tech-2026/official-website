import { projects } from '../../data/projects'

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
const featuredProjects = featuredIds.map(
  (id) =>
    projects.find((project) => project.id === id) ?? {
      id,
      name: 'Mellow',
      year: '',
      services: [],
      summary: '',
      previewImage: projectPlaceholder,
      previewPosition: '50% 50%',
      href: undefined,
    },
)

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
       A selection of products we've shipped.
        
        </h2>
        <div className="mt-12 space-y-8">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="grid overflow-hidden rounded-[28px] bg-about-card md:min-h-[400px] md:grid-cols-[45.5%_1fr] lg:min-h-[490px]"
            >
              <div className="flex min-h-[260px] items-center justify-center overflow-hidden bg-work-image p-5 sm:min-h-[340px] md:p-8">
                <img
                  src={project.previewImage}
                  alt={`${project.name} project preview`}
                  className="max-h-full w-full rounded-xl object-contain"
                  style={{ objectPosition: project.previewPosition }}
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-9 sm:px-10 lg:px-14">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-2xl tracking-[-0.03em]">
                    {project.name}
                  </h3>
                  <span className="text-xs text-about-copy">
                    {project.year}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.services.slice(0, 3).map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-work-tag px-2 py-1 text-xs text-about-copy"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <p className="mt-8 max-w-[500px] text-base leading-relaxed sm:text-lg">
                  {project.summary}
                </p>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-about-dark py-1 pr-1 pl-4 text-sm text-white"
                  >
                    Learn more{' '}
                    <span
                      className="grid size-9 place-items-center rounded-full bg-orange"
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
