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

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '')

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
