import { useEffect, useRef } from 'react'
import { HERO_POSTER, HERO_VIDEO } from '../data/media'

/**
 * Clean hero video — no CSS filters, tints, or dim overlays.
 * Lightweight playback: muted, loop, no GPU filter pipeline.
 */
export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    void video.play().catch(() => {
      /* autoplay can be blocked; muted + playsInline usually succeeds */
    })
  }, [])

  return (
    <div className="hero-video-wrap absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <video
        ref={videoRef}
        className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
        width={1920}
        height={1080}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
    </div>
  )
}
