import { BlogSection } from '../components/Home/BlogSection'
import { CallToAction } from '../components/Home/CallToAction'
import { AboutSection } from '../components/Home/AboutSection'
import { Footer } from '../components/Home/Footer'
import { HeroSection } from '../components/Home/HeroSection'
import { ProcessSection } from '../components/Home/ProcessSection'
import { ScrollReveal } from '../components/Home/ScrollReveal'
import { ServicesSection } from '../components/Home/ServicesSection'
import { ShowcaseSection } from '../components/Home/ShowcaseSection'
import { StudioIntro } from '../components/Home/StudioIntro'
import { Testimonials } from '../components/Home/Testimonials'
import { useScrollDepth } from '../hooks/useScrollDepth'

export default function HomeScreen() {
  useScrollDepth()
  return (
    <main className="min-h-screen overflow-x-clip bg-white text-ink">
      <div className="relative">
        <div className="lg:sticky lg:top-0 motion-reduce:lg:static">
          <HeroSection />
        </div>
        <div className="relative z-10">
          <StudioIntro />
        </div>
        <div className="relative z-20">
          <AboutSection />
        </div>
      </div>
      <ScrollReveal>
        <ServicesSection />
      </ScrollReveal>
      <ScrollReveal>
        <ShowcaseSection />
      </ScrollReveal>
      <ScrollReveal>
        <ProcessSection />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <BlogSection />
      </ScrollReveal>
      <ScrollReveal>
        <CallToAction />
      </ScrollReveal>
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </main>
  )
}
