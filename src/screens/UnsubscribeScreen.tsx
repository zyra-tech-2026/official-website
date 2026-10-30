import { useEffect, useState } from 'react'
import { Header } from '../components/Home/Header'
import { Footer } from '../components/Home/Footer'
import { unsubscribe } from '../lib/blog'

// Share an in-flight request across Strict Mode's development remounts.
const requests = new Map<string, ReturnType<typeof unsubscribe>>()

export default function UnsubscribeScreen({ token }: { token: string }) {
  const [state, setState] = useState<'loading' | 'success' | 'error'>(
    token ? 'loading' : 'error',
  )
  const [message, setMessage] = useState(
    token ? '' : 'This unsubscribe link is invalid or has already been used.',
  )
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!token) return
    let active = true
    setState('loading')
    let request = requests.get(token)
    if (!request) {
      let decoded: string
      try {
        decoded = decodeURIComponent(token)
      } catch {
        setMessage('This unsubscribe link is invalid or has already been used.')
        setState('error')
        return
      }
      request = unsubscribe(decoded)
      requests.set(token, request)
    }
    request
      .then((result) => {
        if (active) {
          setMessage(result.message)
          setState('success')
        }
      })
      .catch((error: unknown) => {
        requests.delete(token)
        if (active) {
          setMessage(
            error instanceof Error
              ? error.message
              : 'Something went wrong. Please try again.',
          )
          setState('error')
        }
      })
    return () => {
      active = false
    }
  }, [token, attempt])

  return (
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <section className="mx-auto flex min-h-[65vh] max-w-[1240px] items-center px-5 py-20 sm:px-8">
        <div className="w-full rounded-[24px] bg-about-card px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <p className="flex items-center gap-3 text-sm">
            <span
              className="size-2 rounded-full bg-orange"
              aria-hidden="true"
            />{' '}
            Newsletter
          </p>
          <div aria-live="polite" className="mt-6 max-w-[700px]">
            <h1 className="text-[clamp(40px,5vw,64px)] leading-[1.08] tracking-[-0.05em]">
              {state === 'loading'
                ? 'Unsubscribing…'
                : state === 'success'
                  ? 'You’re unsubscribed.'
                  : 'We couldn’t unsubscribe you.'}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-about-copy">
              {state === 'loading'
                ? 'Please wait a moment.'
                : state === 'success'
                  ? `${message || 'You’ve been unsubscribed.'} Sorry to see you go.`
                  : message}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {state === 'error' && token && (
              <button
                onClick={() => setAttempt((value) => value + 1)}
                className="rounded-full bg-orange px-6 py-3 text-sm text-white"
              >
                Try again
              </button>
            )}
            <a
              href="/"
              className="rounded-full bg-about-dark px-6 py-3 text-sm text-white"
            >
              Back to home ↗
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
