// ─── GA4 Analytics Module ────────────────────────────────────────────────────
//
// Wraps the GA4 gtag API with:
//   • Zero-dep script injection (no react-ga4 needed — no React Router here)
//   • Hard no-op in dev unless VITE_GA_FORCE_ENABLE=true
//   • Graceful no-op when Measurement ID is absent
//   • Double-init guard
//   • Type-safe discriminated-union event signatures
//
// Usage:
//   initializeAnalytics()          — call once in main.tsx
//   trackEvent({ name, params })   — call anywhere in the tree
//   trackPageView()                — if you ever add client-side routing

// ─── Window augmentation ─────────────────────────────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
    dataLayer: unknown[]
  }
}

// ─── Config ──────────────────────────────────────────────────────────────────
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
const isProduction = import.meta.env.PROD
const forceEnabled = import.meta.env.VITE_GA_FORCE_ENABLE === 'true'
// Analytics is active only in production OR when explicitly forced on in dev
const isEnabled = Boolean(GA_ID && (isProduction || forceEnabled))

let initialized = false

// ─── Initialization ──────────────────────────────────────────────────────────

/**
 * Bootstrap GA4. Call once at app start (main.tsx, before render).
 * Injects the gtag loader script and fires the initial page_view.
 */
export function initializeAnalytics(): void {
  if (!isEnabled || initialized) return

  // Dynamically inject the gtag loader so it is never downloaded in dev
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  script.async = true
  document.head.appendChild(script)

  // Bootstrap the command queue before the script finishes loading
  window.dataLayer = window.dataLayer ?? []
  window.gtag = function (...args) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  // Disable automatic page_view — we control it manually for accuracy
  window.gtag('config', GA_ID, { send_page_view: false })

  initialized = true
  trackPageView()
}

// ─── Page views ──────────────────────────────────────────────────────────────

/**
 * Send a page_view hit manually.
 * Not required here (every nav is a full reload) but exported so it's
 * ready if client-side routing is ever introduced.
 */
export function trackPageView(path = window.location.pathname): void {
  if (!isEnabled || !initialized) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  })
}

// ─── Typed event catalogue ───────────────────────────────────────────────────
// Add new events here as a new union branch. Params are required by name.

export type AnalyticsEvent =
  // CTA clicks — any prominent anchor/button that drives conversion
  | { name: 'cta_click'; params: { cta_name: string; destination?: string } }
  // Header / footer navigation link clicks
  | { name: 'nav_link_click'; params: { label: string; destination: string } }
  // Contact form successfully submitted
  | { name: 'contact_form_submit'; params?: undefined }
  // Click on an external URL (Twitter, email, etc.)
  | { name: 'outbound_link_click'; params: { link_url: string; link_text?: string } }
  // Scroll milestone reached (25 / 50 / 75 / 100 %)
  | { name: 'scroll_depth'; params: { depth_percentage: number; page_path: string } }
  // URL does not match any known route
  | { name: 'page_not_found'; params: { page_path: string } }

/**
 * Fire a typed GA4 custom event.
 * No-ops silently when analytics is disabled or not yet initialized.
 *
 * @example
 * trackEvent({ name: 'cta_click', params: { cta_name: 'hero_book_call', destination: '/contact' } })
 */
export function trackEvent<T extends AnalyticsEvent>(event: T): void {
  if (!isEnabled || !initialized) return
  window.gtag('event', event.name, event.params ?? {})
}
