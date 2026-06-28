import { motion, useReducedMotion } from 'framer-motion'
import cursorDemo from '../../assets/vid/cursor-description.mp4'
import callToActionImage from '../../assets/png/call-to-action.png'
import { trackEvent } from '../../lib/analytics'

export function CallToAction() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="contact" className="mx-auto max-w-[1240px] px-5 pb-24 font-geist sm:px-8 lg:px-5">
      <div className="relative flex min-h-[630px] overflow-hidden rounded-[30px] bg-[#0d0d0c] px-6 py-16 text-center text-[#f4f1eb] sm:px-10 sm:py-20">
        <motion.div
          className="m-auto flex w-full max-w-[820px] flex-col items-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="inline-flex h-[28px] items-center gap-2 rounded-full border border-white/15 px-3 font-geist-mono text-[10px] uppercase tracking-[0.08em] text-white/65">
            <span className="size-1.5 rounded-full bg-[#34b978]" aria-hidden="true" />
            Let&apos;s build
          </p>

          <h2 className="mt-9 text-[38px] font-semibold leading-[1.18] tracking-[-0.045em] sm:text-[48px] lg:text-[50px]">
            <span className="block text-[#918e89]">
              Ready
             <motion.span
                className="relative ml-3 inline-block h-[0.95em] w-[2.45em] overflow-hidden rounded-full align-[-0.16em] ring-1 ring-white/20"
                animate={shouldReduceMotion ? undefined : { y: [0, 4, 0], rotate: [1.5, -1, 1.5] }}
                transition={{ duration: 6, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  src={callToActionImage}
                  alt=""
                />
              </motion.span>{" "}
              to build
            </span>
            <span className="mt-2 block text-[#f4f1eb]">
              something that matters?
              

               <motion.span
                className="relative mx-2 inline-block h-[0.95em] w-[2.35em] overflow-hidden rounded-full align-[-0.16em] ring-1 ring-white/20"
                animate={shouldReduceMotion ? undefined : { y: [0, -4, 0], rotate: [-1.5, 1, -1.5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <video
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  src={cursorDemo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  tabIndex={-1}
                />
              </motion.span>{' '}
            </span>
          </h2>

          <p className="mt-8 max-w-[550px] text-[16px] leading-[1.65] text-white/70 sm:text-[18px]">
            Most founders we work with have tried an agency before.
            <br className="hidden sm:block" /> This time, it&apos;s different.
          </p>

          <motion.a
            href="/contact"
            className="mt-10 inline-flex min-h-[60px] items-center justify-center rounded-full bg-white px-8 text-[16px] font-medium text-[#11110f] shadow-[0_12px_35px_rgba(0,0,0,0.2)]"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.035, y: -3 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => trackEvent({ name: 'cta_click', params: { cta_name: 'cta_section_book_discovery_call', destination: '/contact' } })}
          >
            Book a free discovery call <span className="ml-1" aria-hidden="true">↗</span>
          </motion.a>

          <p className="mt-11 font-caveat text-[19px] text-white/75">— or, Hello@zyra.tech"</p>
        </motion.div>
      </div>
    </section>
  )
}
