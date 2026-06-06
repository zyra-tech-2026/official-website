import { CallToAction } from '../components/Home/CallToAction'
import { Differentiators } from '../components/Home/Differentiators'
import { Footer } from '../components/Home/Footer'
import { HeroSection } from '../components/Home/HeroSection'
import { PartnerBanner } from '../components/Home/PartnerBanner'
import { ProcessSection } from '../components/Home/ProcessSection'
import { ServicesSection } from '../components/Home/ServicesSection'
import { ShowcaseSection } from '../components/Home/ShowcaseSection'
import { StatsBar } from '../components/Home/StatsBar'
import { Testimonials } from '../components/Home/Testimonials'

export default function HomeScreen() {
  return (
    <main className="min-h-screen overflow-hidden bg-cream text-ink">
      <HeroSection />
      <StatsBar />
      <PartnerBanner />
      <ServicesSection />
      <ProcessSection />
      <section className="py-8 sm:py-14">
        <div className="marquee-track flex w-max whitespace-nowrap text-[72px] font-semibold leading-none text-ink sm:text-[118px] lg:text-[154px]">
          <span className="pr-8">Design. Build. Scale.</span>
          <span className="pr-8">Design. Build. Scale.</span>
        </div>
      </section>
      <Differentiators />
      <Testimonials />
      <ShowcaseSection />
      <CallToAction />
      <Footer />
    </main>
  )
}
