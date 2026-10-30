import { Fragment, type ReactNode } from 'react'
import { Header } from '../components/Home/Header'
import { Footer } from '../components/Home/Footer'
import privacyDraft from '../../ZYRA_WEBSITE_PRIVACY_DRAFT.md?raw'
import termsDraft from '../../ZYRA_WEBSITE_TERMS_DRAFT.md?raw'

function inlineText(text: string): ReactNode[] {
  const parts = text.split(
    /(\[[^\]]+\]\((?:https?:\/\/|\/)[^)]+\)|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\*\*[^*]+\*\*)/g,
  )
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)]+)\)$/)
    if (link)
      return (
        <a
          key={index}
          href={link[2]}
          className="text-orange underline underline-offset-4"
          target={link[2].startsWith('http') ? '_blank' : undefined}
          rel={link[2].startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {link[1]}
        </a>
      )
    if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part))
      return (
        <a
          key={index}
          href={`mailto:${part}`}
          className="text-orange underline underline-offset-4"
        >
          {part}
        </a>
      )
    if (part.startsWith('**') && part.endsWith('**'))
      return <strong key={index}>{part.slice(2, -2)}</strong>
    return <Fragment key={index}>{part}</Fragment>
  })
}

export default function LegalScreen({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy'
  const document = isPrivacy ? privacyDraft : termsDraft
  const sections = document.replace(/\r\n/g, '\n').split(/\n(?=## )/)
  const bodySections = sections
    .slice(1)
    .map((section, index) => {
      const [heading, ...body] = section.split('\n')
      const content = body
        .join('\n')
        .replace(' No system can be guaranteed completely secure.', '')
        .replace(
          'Our [Privacy Policy]([insert privacy policy URL])',
          'Our [Privacy Policy](/privacy-policy)',
        )
        .replace(
          /Data protection contact or officer, where applicable: \[Kugbiyi Elijah\]\./,
          'Data protection contact: Kugbiyi Elijah.',
        )
        .replace(
          'To exercise your rights, contact [confirm privacy email].',
          'To exercise your rights, contact hello@zyra.tech.',
        )
        .replace(
          '[Confirm dispute resolution and jurisdiction with counsel.]',
          'For questions or concerns, contact hello@zyra.tech.',
        )
        .replace(/\[([\w.+-]+@[\w.-]+)\]/g, '$1')
        .replace(/\[(?![^\]]+\]\((?:https?:\/\/|\/))[^\]]+\]/g, '')
        .trim()
      return {
        id: `section-${index + 1}`,
        heading: heading.replace(/^##\s+/, ''),
        body: content,
      }
    })
    .filter(
      (section) =>
        section.body &&
        !(
          isPrivacy &&
          /^(5\. Cookies|7\. International transfers|8\. How long)/.test(
            section.heading,
          )
        ) &&
        !['Publication review', 'Reference materials for review'].includes(
          section.heading,
        ),
    )

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <section className="px-5 pt-14 pb-16 sm:px-8 lg:pt-20">
        <div className="mx-auto max-w-[1240px] rounded-[24px] bg-about-card px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <p className="flex items-center gap-3 text-sm">
            <span
              className="size-2 rounded-full bg-orange"
              aria-hidden="true"
            />
            Legal
          </p>
          <h1 className="mt-6 max-w-[850px] text-[clamp(42px,6vw,72px)] leading-[1.05] tracking-[-0.05em]">
            {isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'}
          </h1>
          <p className="mt-6 max-w-[650px] text-base leading-relaxed text-about-copy">
            ZYRA CORE Ltd website{' '}
            {isPrivacy ? 'privacy policy' : 'terms and conditions'}.
          </p>
          <p className="mt-3 text-sm text-about-copy">
            Effective August 1, 2026
          </p>
        </div>
      </section>
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-24 lg:px-5">
        <aside className="lg:self-start lg:sticky lg:top-28">
          <h2 className="text-sm font-medium">On this page</h2>
          <nav
            aria-label="Contents"
            className="mt-5 flex flex-wrap gap-x-5 gap-y-3 lg:flex-col lg:gap-4"
          >
            {bodySections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sm leading-snug text-about-copy hover:text-orange"
              >
                {section.heading}
              </a>
            ))}
          </nav>
        </aside>
        <article className="min-w-0">
          {bodySections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-t border-line py-8 sm:py-10"
            >
              <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-5 text-base leading-[1.75] text-about-copy">
                {section.body.split(/\n\s*\n/).map((block, index) => {
                  const lines = block
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean)
                  if (lines.every((line) => line.startsWith('- ')))
                    return (
                      <ul key={index} className="list-disc space-y-2 pl-6">
                        {lines.map((line, i) => (
                          <li key={i}>{inlineText(line.slice(2))}</li>
                        ))}
                      </ul>
                    )
                  return <p key={index}>{inlineText(lines.join(' '))}</p>
                })}
              </div>
            </section>
          ))}
        </article>
      </div>
      <Footer />
    </main>
  )
}
