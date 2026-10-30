import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import skyBackground from '../../assets/png/hero-background.png'

const sentence =
  "Design that earns trust. Engineering that keeps it."
const words = sentence.split(' ')

function RevealedWord({
  word,
  index,
  progress,
  reducedMotion,
}: {
  word: string
  index: number
  progress: MotionValue<number>
  reducedMotion: boolean | null
}) {
  const start = (index / words.length) * 0.48
  const end = ((index + 1) / words.length) * 0.48
  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [8, 0])
  return (
    <motion.span
      aria-hidden="true"
      className="inline-block"
      style={reducedMotion ? undefined : { opacity, y }}
    >
      {word}
      {'\u00a0'}
    </motion.span>
  )
}

export function StudioIntro() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div
      ref={sectionRef}
      className="relative h-[240svh] motion-reduce:h-auto lg:-mb-[100svh] lg:h-[340svh] motion-reduce:lg:mb-0 motion-reduce:lg:h-auto"
    >
      <section className="sticky top-0 isolate flex h-svh min-h-[520px] items-center justify-center overflow-hidden bg-hero-sky px-6 py-24 text-center text-white motion-reduce:static motion-reduce:h-auto lg:min-h-0 motion-reduce:lg:h-svh">
        <img
          src={skyBackground}
          alt=""
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full scale-[1.02] object-fill blur-[5px]"
        />
        <h2 className="max-w-[1100px] text-[clamp(36px,6vw,60px)] leading-[1.2] font-normal tracking-[-0.055em] lg:-translate-y-[6vh]">
          <span className="sr-only">{sentence}</span>
          {words.map((word, index) => (
            <RevealedWord
              key={`${word}-${index}`}
              word={word}
              index={index}
              progress={scrollYProgress}
              reducedMotion={reducedMotion}
            />
          ))}
        </h2>
      </section>
    </div>
  )
}
