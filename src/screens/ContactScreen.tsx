import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CallToAction } from '../components/Home/CallToAction'
import { Footer } from '../components/Home/Footer'
import { Header } from '../components/Home/Header'
import { sendContactEmail, type ContactPayload } from '../lib/emailjs'
import { trackEvent } from '../lib/analytics'
import { useScrollDepth } from '../hooks/useScrollDepth'

const stages = ['Just an idea', 'Pre-launch', 'Post-launch', 'Scaling']

const emptyForm: ContactPayload = {
  name: '',
  email: '',
  company: '',
  project: '',
  stage: '',
}

const labelClass = 'mb-2 block text-sm'
const fieldClass =
  'w-full rounded-[14px] bg-white px-4 text-sm outline-none placeholder:text-black/35 focus:ring-2 focus:ring-orange'

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
        description:
          'Please try again or email us directly at hello@zyra.tech.',
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
    <main className="min-h-screen bg-white text-ink">
      <Header />
      <section className="px-5 pt-16 pb-20 sm:px-8 lg:pt-24 lg:pb-28">
        <motion.div
          className="mx-auto max-w-[900px] text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p className="flex items-center justify-center gap-3 text-base sm:text-xl">
            <span
              className="size-2.5 rounded-full bg-orange"
              aria-hidden="true"
            />
            Contact
          </p>
          <h1 className="mt-6 text-[clamp(40px,6vw,72px)] leading-[1.02] tracking-[-0.055em]">
            Let’s talk about what you’re building.
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-lg leading-relaxed text-about-copy">
            A rough idea is enough. Tell us where you are and we’ll come back
            with honest next steps, usually within one business day.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="mx-auto mt-14 max-w-[880px] rounded-[32px] bg-about-card p-6 sm:p-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Full name</span>
              <input
                required
                name="name"
                autoComplete="name"
                placeholder="Ada Obi"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`${fieldClass} h-[52px]`}
              />
            </label>
            <label className="block">
              <span className={labelClass}>Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                placeholder="ada@company.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`${fieldClass} h-[52px]`}
              />
            </label>
          </div>

          <label className="mt-6 block">
            <span className={labelClass}>Company / organization</span>
            <input
              name="company"
              autoComplete="organization"
              placeholder="Optional"
              value={form.company}
              onChange={(e) => handleChange('company', e.target.value)}
              className={`${fieldClass} h-[52px]`}
            />
          </label>

          <label className="mt-6 block">
            <span className={labelClass}>What are you building?</span>
            <textarea
              required
              name="project"
              rows={5}
              placeholder="Tell us about the idea, who it’s for, and anything we should know."
              value={form.project}
              onChange={(e) => handleChange('project', e.target.value)}
              className={`${fieldClass} min-h-[160px] resize-none py-4`}
            />
          </label>

          <fieldset className="mt-6">
            <legend className={labelClass}>What stage are you at?</legend>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {stages.map((stage) => (
                <label
                  key={stage}
                  className="flex h-[52px] cursor-pointer items-center gap-3 rounded-full bg-white px-4 text-sm has-[:checked]:ring-2 has-[:checked]:ring-orange has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange"
                >
                  <input
                    type="radio"
                    name="stage"
                    value={stage}
                    checked={form.stage === stage}
                    onChange={() => handleChange('stage', stage)}
                    className="size-[18px] shrink-0 appearance-none rounded-full border border-line checked:border-[5px] checked:border-orange"
                  />
                  {stage}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-about-copy">
              We only use your details to reply. Happy to sign an NDA first.
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-h-[46px] w-fit items-center gap-3 rounded-full bg-orange py-1 pr-1 pl-4 text-sm text-white hover:bg-orange/90 disabled:opacity-60"
            >
              {isPending ? 'Sending…' : 'Send message'}
              <span
                className="grid size-[38px] place-items-center rounded-full bg-black"
                aria-hidden="true"
              >
                ↗
              </span>
            </button>
          </div>
        </motion.form>
      </section>
      <CallToAction />
      <Footer />
    </main>
  )
}
