import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Footer } from '../components/Home/Footer'
import { Header } from '../components/Home/Header'
import { sendContactEmail, type ContactPayload } from '../lib/emailjs'
import { trackEvent } from '../lib/analytics'
import { useScrollDepth } from '../hooks/useScrollDepth'

const contactDetails = [
  ['Email', 'Hello@zyra.tech', 'mailto:hello@zyra.tech'],
  ['Twitter', '@joelstudios', 'https://twitter.com/joelstudios'],
  ['Location', 'Lagos, Nigeria · Global', undefined],
  ['Hours', 'Mon–Fri · 9am–6pm WAT', undefined],
]

const expectations = [
  ['01', 'A real conversation', "No forms, no templates. We'll talk about what you're actually building and whether we're the right fit.", 'text-[#4d8ce8]'],
  ['02', 'Honest scoping', 'If we take it on, we give you a clear scope, timeline, and price — before any commitment.', 'text-[#ea5b8d]'],
  ['03', 'Fast start', "If we're aligned, we can kick off within a week. No long sales cycles, no procurement theatre.", 'text-[#45b77a]'],
]

const expectationAccents = ['bg-[#4d8ce8]', 'bg-[#ea5b8d]', 'bg-[#45b77a]']

const stages = ['Just an idea', 'Pre-launch', 'Post-launch', 'Scaling']

const emptyForm: ContactPayload = { name: '', email: '', company: '', project: '', stage: '' }

export default function ContactScreen() {
  const shouldReduceMotion = useReducedMotion()
  const [form, setForm] = useState<ContactPayload>(emptyForm)
  useScrollDepth()

  const { mutate, isPending } = useMutation({
    mutationFn: sendContactEmail,
    onSuccess: () => {
      toast.success('Message sent!', {
        description: "We'll get back to you within 24 hours.",
      })
      trackEvent({ name: 'contact_form_submit' })
      setForm(emptyForm)
    },
    onError: () => {
      toast.error('Something went wrong.', {
        description: 'Please try again or email us directly at hello@zyra.tech.',
      })
    },
  })

  function handleChange(field: keyof ContactPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    mutate(form)
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] font-geist text-[#11110f]">
      <div className="bg-cream">
        <Header />
        <section className="px-5 pb-24 pt-14 text-black sm:px-8 lg:pb-32 lg:pt-20">
          <motion.div
            className="mx-auto grid max-w-[1140px] gap-12 lg:grid-cols-[1.25fr_0.9fr] lg:items-end"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="mb-7 inline-flex h-[29px] items-center gap-2 rounded-full bg-white px-3 text-[12px] font-medium text-[#282622]">
                <span className="size-1.5 rounded-full bg-[#e79a32]" aria-hidden="true" />
                Let&apos;s talk
              </p>
              <h1 className="max-w-[620px] text-[54px] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-[74px]">
                Tell us what
                <br />
                you&apos;re building.
              </h1>
            </div>

            <div className="pb-2">
              <p className="font-caveat text-[26px] text-black/65">No pitch. No pressure.</p>
              <p className="mt-3 max-w-[450px] text-[15px] leading-[1.7] text-black/65">
                Every engagement starts with a conversation — about your product, your goals, and whether we&apos;re the right fit.
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      <section className="mx-auto grid max-w-[1140px] gap-7 px-5 py-20 sm:px-8 lg:grid-cols-[1.7fr_1fr] lg:py-24">
        <motion.form
          className="rounded-[28px] border border-[#dfdcd6] bg-white p-7 shadow-[0_18px_55px_rgba(17,17,15,0.04)] sm:p-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-5 border-b border-[#dfdcd6] pb-9 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-geist-mono text-[10px] uppercase tracking-[0.12em] text-[#9a958e]">Form / 01</p>
              <h2 className="mt-3 text-[28px] font-semibold leading-[1.05] tracking-[-0.035em]">
                Book a free
                <br />
                discovery call.
              </h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e5f8ec] px-3 py-2 font-geist-mono text-[9px] tracking-[0.08em] text-[#39ad6b]">
              <motion.span
                className="size-1.5 rounded-full bg-[#39ad6b]"
                animate={shouldReduceMotion ? undefined : { opacity: [1, 0.35, 1], scale: [1, 0.75, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              Now booking
            </span>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block font-geist-mono text-[9px] uppercase tracking-[0.12em] text-[#8c8881]">Full name</span>
              <input
                required
                name="name"
                placeholder="Elijah Johnny"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="h-12 w-full rounded-[14px] border border-[#dfdcd6] bg-white px-4 text-[14px] outline-none transition focus:border-[#11110f] focus:ring-4 focus:ring-black/5"
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-geist-mono text-[9px] uppercase tracking-[0.12em] text-[#8c8881]">Email</span>
              <input
                required
                type="email"
                name="email"
                placeholder="elijah@company.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="h-12 w-full rounded-[14px] border border-[#dfdcd6] bg-white px-4 text-[14px] outline-none transition focus:border-[#11110f] focus:ring-4 focus:ring-black/5"
              />
            </label>
          </div>

          <label className="mt-6 block">
            <span className="mb-2 block font-geist-mono text-[9px] uppercase tracking-[0.12em] text-[#8c8881]">Company / organization</span>
            <input
              name="company"
              placeholder="Optional, but useful"
              value={form.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className="h-12 w-full rounded-[14px] border border-[#dfdcd6] bg-white px-4 text-[14px] outline-none transition focus:border-[#11110f] focus:ring-4 focus:ring-black/5"
            />
          </label>

          <label className="mt-6 block">
            <span className="mb-2 block font-geist-mono text-[9px] uppercase tracking-[0.12em] text-[#8c8881]">What are you building?</span>
            <textarea
              required
              name="project"
              rows={4}
              placeholder="A sentence or two is plenty — we'll dig in on the call."
              value={form.project}
              onChange={(e) => handleChange('project', e.target.value)}
              className="w-full resize-none rounded-[14px] border border-[#dfdcd6] bg-white px-4 py-4 text-[14px] outline-none transition focus:border-[#11110f] focus:ring-4 focus:ring-black/5"
            />
          </label>

          <fieldset className="mt-6">
            <legend className="mb-2 font-geist-mono text-[9px] uppercase tracking-[0.12em] text-[#8c8881]">What stage are you at?</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {stages.map((stage) => (
                <label
                  key={stage}
                  className="flex h-11 items-center gap-3 rounded-[14px] border border-[#dfdcd6] px-4 text-[13px] transition hover:border-black/30 has-[:checked]:border-black has-[:checked]:bg-[#f7f6f2]"
                >
                  <input
                    type="radio"
                    name="stage"
                    value={stage}
                    checked={form.stage === stage}
                    onChange={() => handleChange('stage', stage)}
                    className="size-4 accent-black"
                  />
                  {stage}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col gap-6 border-t border-[#dfdcd6] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] leading-5 text-[#8c8881]">
              We reply within 24 hours.
              <br />
              Usually much faster.
            </p>
            <motion.button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#11110f] px-7 text-[14px] font-medium text-white disabled:opacity-60"
              whileHover={shouldReduceMotion || isPending ? undefined : { y: -3, scale: 1.02 }}
              whileTap={shouldReduceMotion || isPending ? undefined : { scale: 0.98 }}
            >
              {isPending ? 'Sending…' : <>Send message <span className="ml-1" aria-hidden="true">↗</span></>}
            </motion.button>
          </div>
        </motion.form>

        <motion.aside
          initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, delay: shouldReduceMotion ? 0 : 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-[28px] bg-[#0d0d0c] p-7 text-white sm:p-8">
            <p className="font-geist-mono text-[9px] uppercase tracking-[0.12em] text-white/40">Direct</p>
            <h2 className="mt-4 text-[23px] font-semibold tracking-[-0.025em]">Prefer to reach out directly?</h2>

            <dl className="mt-12">
              {contactDetails.map(([label, value, href]) => (
                <div key={label} className="flex items-center justify-between gap-6 border-b border-white/10 py-8 text-[12px] first:pt-0">
                  <dt className="text-white/40">{label}</dt>
                  <dd className="text-right font-medium text-white/80">
                    {href ? (
                      <a
                        href={href}
                        className="hover:text-white"
                        {...(href.startsWith('http') ? {
                          target: '_blank',
                          rel: 'noopener noreferrer',
                          onClick: () => trackEvent({ name: 'outbound_link_click', params: { link_url: href, link_text: value } }),
                        } : {})}
                      >
                        {value}
                      </a>
                    ) : value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-[18px] border border-[#dfdcd6] bg-white p-5">
              <strong className="block text-[26px] font-semibold">24h</strong>
              <span className="mt-1 block text-[11px] text-[#8c8881]">Reply time</span>
            </div>
            <div className="rounded-[18px] border border-[#dfdcd6] bg-white p-5">
              <strong className="block text-[26px] font-semibold">100%</strong>
              <span className="mt-1 block text-[11px] text-[#8c8881]">Response rate</span>
            </div>
          </div>
        </motion.aside>
      </section>

      <section className="border-t border-[#e4e1dc] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1140px]">
          <h2 className="text-[34px] font-semibold tracking-[-0.035em]">What to expect</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {expectations.map(([number, title, body, color], index) => (
              <motion.article
                key={number}
                className="group relative overflow-hidden rounded-[24px] bg-[#f3f3f2] p-7"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 48, scale: 0.94, rotate: (index - 1) * 1.5, filter: 'blur(7px)' }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -10,
                        scale: 1.015,
                        boxShadow: '0 24px 60px rgba(17,17,15,0.09)',
                        transition: { duration: 0.32, delay: 0, ease: [0.16, 1, 0.3, 1] },
                      }
                }
                viewport={{ once: true, amount: 0.3, margin: '0px 0px -8% 0px' }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.9,
                  delay: shouldReduceMotion ? 0 : index * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-[3px] origin-left ${expectationAccents[index]}`}
                  initial={shouldReduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.75,
                    delay: shouldReduceMotion ? 0 : index * 0.18 + 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
                <span className={`inline-flex rounded-full bg-white px-2.5 py-1 font-geist-mono text-[10px] shadow-[0_4px_12px_rgba(17,17,15,0.05)] ${color}`}>
                  {number}
                </span>
                <h3
                  className={`mt-4 text-[18px] font-semibold ${
                    shouldReduceMotion ? '' : 'transition-transform duration-300 ease-out group-hover:translate-x-1'
                  }`}
                >
                  {title}
                </h3>
                <p className="mt-4 text-[13px] leading-[1.65] text-[#77736e]">{body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-28 text-center sm:px-8 lg:py-36">
        <p className="text-[27px] font-medium tracking-[-0.025em] sm:text-[31px]">Every great product started as a</p>
        <p className="mt-2 font-caveat text-[38px] text-[#de841d]">conversation.</p>
      </section>

      <Footer />
    </main>
  )
}
