import { useEffect, useRef, useState, type FormEvent } from 'react'
import { subscribe } from '../lib/blog'

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const node = dialog.current
    return () => {
      if (node?.open) node.close()
    }
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    setError('')
    setPending(true)
    try {
      const result = await subscribe(email)
      setSuccessMessage(result.message || 'Subscribed successfully')
      setEmail('')
      dialog.current?.showModal()
      closeButton.current?.focus()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setPending(false)
    }
  }
  return (
    <>
      <form
        onSubmit={submit}
        className={`flex w-full max-w-[420px] items-center rounded-full p-1 pl-5 focus-within:ring-2 focus-within:ring-orange ${dark ? 'bg-white/10' : 'bg-white'}`}
      >
        <label
          className="sr-only"
          htmlFor={dark ? 'footer-newsletter' : 'blog-newsletter'}
        >
          Email address
        </label>
        <input
          id={dark ? 'footer-newsletter' : 'blog-newsletter'}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setError('')
          }}
          placeholder={dark ? 'You@company.com' : 'Enter your email'}
          className={`min-w-0 flex-1 bg-transparent py-3 text-sm outline-none ${dark ? 'text-white placeholder:text-white/45' : 'text-ink placeholder:text-black/45'}`}
        />
        <button
          disabled={pending}
          className="flex min-h-11 items-center gap-3 rounded-full bg-orange py-1 pr-1 pl-5 text-sm text-white disabled:opacity-60"
        >
          {pending ? (dark ? 'Subscribing…' : 'Joining…') : dark ? 'Subscribe' : 'Join'}
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full bg-black"
          >
            ↗
          </span>
        </button>
      </form>
      {error && (
        <p
          role="alert"
          className={`mt-3 text-sm ${dark ? 'text-white' : 'text-ink'}`}
        >
          {error}
        </p>
      )}
      <dialog
        ref={dialog}
        aria-labelledby={dark ? 'footer-success-title' : 'blog-success-title'}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-[28px] bg-white p-8 text-ink shadow-xl backdrop:bg-black/60 sm:p-10"
      >
        <span
          aria-hidden="true"
          className="grid size-12 place-items-center rounded-full bg-orange text-2xl text-white"
        >
          ✓
        </span>
        <h2
          id={dark ? 'footer-success-title' : 'blog-success-title'}
          className="mt-6 text-3xl tracking-tight"
        >
          {successMessage}
        </h2>
        <p className="mt-3 leading-relaxed text-about-copy">
          Thanks for being part of the ZYRA newsletter.
        </p>
        <button
          ref={closeButton}
          onClick={() => dialog.current?.close()}
          className="mt-8 rounded-full bg-about-dark px-6 py-3 text-sm text-white"
        >
          Close
        </button>
      </dialog>
    </>
  )
}
