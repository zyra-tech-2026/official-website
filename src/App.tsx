import { CustomCursor } from './components/CustomCursor'
import HomeScreen from './screens/HomeScreen'
import ContactScreen from './screens/ContactScreen'
import WorkScreen from './screens/WorkScreen'
import { trackEvent } from './lib/analytics'

const KNOWN_PATHS = ['', '/', '/contact', '/work']

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '')

  // Track unrecognised paths (404-equivalent) once per render
  if (!KNOWN_PATHS.includes(pathname)) {
    trackEvent({ name: 'page_not_found', params: { page_path: pathname } })
  }

  return (
    <>
      <CustomCursor />
      {pathname === '/contact' ? <ContactScreen /> : pathname === '/work' ? <WorkScreen /> : <HomeScreen />}
    </>
  )
}

export default App
