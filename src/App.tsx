import { useEffect } from 'react'
import HomeScreen from './screens/HomeScreen'
import ContactScreen from './screens/ContactScreen'
import WorkScreen from './screens/WorkScreen'
import LegalScreen from './screens/LegalScreen'
import BlogScreen from './screens/BlogScreen'
import UnsubscribeScreen from './screens/UnsubscribeScreen'
import { trackEvent } from './lib/analytics'

const KNOWN_PATHS = [
  '',
  '/',
  '/contact',
  '/work',
  '/blog',
  '/privacy-policy',
  '/terms-and-conditions',
]

const SITE_ORIGIN = 'https://www.zyra.tech'

const PAGE_TITLES: Record<string, string> = {
  '/contact': 'Contact | Zyra',
  '/work': 'Our Work | Zyra',
  '/blog': 'Blog | Zyra',
  '/privacy-policy': 'Privacy Policy | Zyra',
  '/terms-and-conditions': 'Terms of Service | Zyra',
}

function setHeadTag(selector: string, create: () => HTMLElement) {
  let tag = document.head.querySelector<HTMLElement>(selector)
  if (!tag) {
    tag = create()
    document.head.appendChild(tag)
  }
  return tag
}

// index.html has one static canonical pointing at the home page, which would
// tell Google every route is a duplicate of it. Keep it in step with the route.
function usePageSeo(pathname: string, indexable: boolean) {
  useEffect(() => {
    const url = `${SITE_ORIGIN}${pathname || '/'}`
    const canonical = setHeadTag('link[rel="canonical"]', () => {
      const link = document.createElement('link')
      link.rel = 'canonical'
      return link
    }) as HTMLLinkElement
    canonical.href = url
    document.head
      .querySelector<HTMLMetaElement>('meta[property="og:url"]')
      ?.setAttribute('content', url)

    const robots = setHeadTag('meta[name="robots"]', () => {
      const meta = document.createElement('meta')
      meta.name = 'robots'
      return meta
    })
    robots.setAttribute(
      'content',
      indexable ? 'index, follow' : 'noindex, nofollow',
    )

    if (PAGE_TITLES[pathname]) document.title = PAGE_TITLES[pathname]
  }, [pathname, indexable])
}

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '')
  const isKnown =
    KNOWN_PATHS.includes(pathname) || /^\/blog\/[^/]+$/.test(pathname)
  usePageSeo(pathname, isKnown)

  // Track unrecognised paths (404-equivalent) once per render
  if (
    !KNOWN_PATHS.includes(pathname) &&
    !/^\/(?:blog|unsubscribe)\/[^/]+$/.test(pathname) &&
    pathname !== '/unsubscribe'
  ) {
    trackEvent({ name: 'page_not_found', params: { page_path: pathname } })
  }

  return (
    <>
      {pathname === '/unsubscribe' ||
      /^\/unsubscribe\/[^/]+$/.test(pathname) ? (
        <UnsubscribeScreen token={pathname.slice('/unsubscribe/'.length)} />
      ) : pathname === '/blog' ? (
        <BlogScreen />
      ) : /^\/blog\/[^/]+$/.test(pathname) ? (
        <BlogScreen slug={decodeURIComponent(pathname.slice(6))} />
      ) : pathname === '/privacy-policy' ? (
        <LegalScreen type="privacy" />
      ) : pathname === '/terms-and-conditions' ? (
        <LegalScreen type="terms" />
      ) : pathname === '/contact' ? (
        <ContactScreen />
      ) : pathname === '/work' ? (
        <WorkScreen />
      ) : (
        <HomeScreen />
      )}
    </>
  )
}

export default App
