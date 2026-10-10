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
    <div className="absolute inset-0 z-0 overflow-hidden bg-z-bg" aria-hidden>
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
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
