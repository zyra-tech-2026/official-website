import { useEffect, useRef, useState } from 'react'
import arrowDown from '../../assets/svg/arrow-down.svg'
import orangeLine from '../../assets/svg/orange-line.svg'
import { Header } from './Header'
import { MockPhoto, videoWidgetSrc } from './MockPhoto'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function HeroSection() {
  const expandedVideoRef = useRef<HTMLDivElement>(null)
  const [videoPosition, setVideoPosition] = useState({ x: 346, y: 88 })
  const [hasExpandedVideoEntered, setHasExpandedVideoEntered] = useState(false)

  useEffect(() => {
    const expandedVideo = expandedVideoRef.current

    if (!expandedVideo) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasExpandedVideoEntered(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.22,
      },
    )

    observer.observe(expandedVideo)

    return () => observer.disconnect()
  }, [])

  const handleVideoFloat = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const videoWidth = Math.min(496, bounds.width - 32)
    const videoHeight = videoWidth * 0.652
    const horizontalPadding = 16
    const verticalPadding = 16

    setVideoPosition({
      x: clamp(event.clientX - bounds.left - videoWidth / 2, horizontalPadding, bounds.width - videoWidth - horizontalPadding),
      y: clamp(event.clientY - bounds.top - videoHeight / 2, verticalPadding, bounds.height - videoHeight - verticalPadding),
    })
  }

  return (
    <section id="top" className="relative bg-[#f6f4ee] pb-20">
      <Header />

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-0">
        <div
          className="relative hidden h-[452px] sm:block"
          onMouseMove={handleVideoFloat}
          aria-label="Interactive hero video area"
        >
          <div
            className="fade-up absolute z-10 aspect-[496/324] w-[min(496px,calc(100%-32px))] overflow-hidden rounded-[32px] bg-line shadow-[0_20px_60px_rgba(14,13,12,0.08)] transition-[left,top] duration-300 ease-out"
            style={{ left: videoPosition.x, top: videoPosition.y }}
          >
            <iframe
              src={videoWidgetSrc}
              title="Studio process video"
              className="h-full w-full border-0"
              sandbox="allow-scripts allow-same-origin"
              allowFullScreen
            />
          </div>

          <div className="absolute left-0 top-[300px] flex flex-col gap-1 text-left">
            <p className="font-['Caveat',cursive] text-[17px] text-[#8c8781]">Idea to live product &mdash;</p>
            <img src={arrowDown} alt="" className=" w-7 h-8 " aria-hidden="true" />
          </div>
        </div>

        <div className="fade-up pt-10 sm:hidden">
          <div className="aspect-[496/324] overflow-hidden rounded-[25px] bg-line">
            <MockPhoto alt="Studio process video" />
          </div>
        </div>

        <div className="fade-up relative" style={{ animationDelay: '90ms' }}>
          <div className="mb-[26px] inline-flex max-w-full items-center gap-2.5 overflow-hidden rounded-full border border-black/10 bg-white py-2 pl-2 pr-[18px] shadow-[0_1px_12px_rgba(14,13,12,0.03)]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edfff4] px-2.5 py-1 text-[11.5px] font-medium text-[#2dab5f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2dab5f]" />
              Now booking Q3 2025
            </span>
            <span className="text-[13px] text-[#2a2825]">Full-stack product studio</span>
          </div>

          <div className="absolute right-0 top-[74px] hidden flex-col items-end gap-1 whitespace-nowrap text-right sm:flex">
            <p className="font-mono text-[13px] text-[#b9b4ad]">Est. 2026</p>
            <p className="font-['Caveat',cursive] text-[19px] italic text-[#8c8781]">Lagos &middot; Globally</p>
          </div>

          <h1 className="max-w-[1200px] font-dm-sans text-[54px] font-semibold leading-none tracking-normal text-black sm:text-[84px] lg:text-[130px]">
            We build digital
            <br />
            products that{' '}
            <span className="relative inline-block">
              <span className="relative z-10">work.</span>
              <img
                src={orangeLine}
                alt=""
                className="pointer-events-none absolute bottom-2 left-0 z-0 h-[0.2em] w-full object-fill"
                aria-hidden="true"
              />
            </span>
          </h1>
        </div>

        <div
          ref={expandedVideoRef}
          className={`hero-expanded-video mt-16 h-[90vh] overflow-hidden bg-transparent px-0 lg:-ml-[55px] lg:w-[calc(100%+110px)] lg:px-[60px] ${
            hasExpandedVideoEntered ? 'is-expanded' : ''
          }`}
        >
          <MockPhoto alt="Studio process video expanded" />
        </div>
      </div>
    </section>
  )
}
