import techInnovationVideoSrc from '../../assets/vid/tech_innovation_video.html?url'

export const videoWidgetSrc = techInnovationVideoSrc

type MockPhotoProps = {
  alt: string
  className?: string
  position?: string
}

export function MockPhoto({ alt, className = '' }: MockPhotoProps) {
  return (
    <iframe
      src={videoWidgetSrc}
      title={alt}
      className={`h-full w-full border-0 ${className}`}
      sandbox="allow-scripts allow-same-origin"
      allowFullScreen
    />
  )
}
