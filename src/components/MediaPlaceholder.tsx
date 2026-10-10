import { useEffect, useRef } from 'react'

type MediaPlaceholderProps = {
  label: string
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/4' | '21/9'
  className?: string
  kind?: 'image' | 'video'
  /** Still image (article heroes, posters). */
  src?: string
  /**
   * Looping muted card thumbnail. When set, renders `<video>` instead of `<img>`.
   * Empty / missing → dark fallback background.
   */
  videoUrl?: string
  alt?: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  unoptimized?: boolean
}

const ASPECT_STYLE: Record<NonNullable<MediaPlaceholderProps['aspectRatio']>, string> = {
  '16/9': '16 / 9',
  '4/3': '4 / 3',
  '1/1': '1 / 1',
  '3/4': '3 / 4',
  '21/9': '21 / 9',
}

const ASPECT_CLASS: Record<NonNullable<MediaPlaceholderProps['aspectRatio']>, string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  '21/9': 'aspect-[21/9]',
}

function CardVideo({
  videoUrl,
  poster,
  label,
  width,
  height,
  priority,
}: {
  videoUrl: string
  poster?: string
  label: string
  width: number
  height: number
  priority: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    void el.play().catch(() => {
      /* autoplay can be blocked; muted + playsInline usually succeeds */
    })
  }, [videoUrl])

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload={priority ? 'auto' : 'metadata'}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  )
}

export function MediaPlaceholder({
  label,
  aspectRatio = '16/9',
  className = '',
  kind = 'image',
  src,
  videoUrl,
  alt,
  width = 1920,
  height = 1080,
  priority = false,
  quality = 100,
  unoptimized = false,
}: MediaPlaceholderProps) {
  void quality

  const frameClass =
    `relative w-full overflow-hidden rounded-2xl ${ASPECT_CLASS[aspectRatio]} ${className}`.trim()
  const frameStyle = { aspectRatio: ASPECT_STYLE[aspectRatio], width: '100%' as const }

  // Prefer looping video for card thumbnails when a URL is provided.
  if (typeof videoUrl === 'string') {
    if (!videoUrl.trim()) {
      return (
        <div
          className={`${frameClass} bg-zinc-900`.trim()}
          style={frameStyle}
          role="img"
          aria-label={label}
        />
      )
    }

    return (
      <div className={`${frameClass} bg-zinc-900`.trim()} style={frameStyle}>
        <CardVideo
          videoUrl={videoUrl}
          poster={src}
          label={alt || label}
          width={width}
          height={height}
          priority={priority}
        />
      </div>
    )
  }

  if (src) {
    return (
      <div className={`${frameClass} bg-z-card`.trim()} style={frameStyle}>
        <img
          src={src}
          alt={alt || label}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          {...(unoptimized
            ? {}
            : {
                sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px',
              })}
          className="absolute inset-0 h-full w-full object-cover"
          data-quality={quality}
          data-unoptimized={unoptimized ? 'true' : undefined}
        />
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/15 bg-[linear-gradient(165deg,rgba(26,21,41,0.9),rgba(14,11,22,0.95))] ${ASPECT_CLASS[aspectRatio]} ${className}`.trim()}
      style={frameStyle}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(167,139,250,0.08),transparent_70%)]" />
      <span className="relative px-4 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-white/35 sm:text-xs">
        {kind === 'video' ? '▶ ' : ''}
        {label}
      </span>
    </div>
  )
}
