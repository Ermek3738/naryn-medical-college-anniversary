"use client"

import { useEffect, useRef, useState } from "react"
import { User } from "lucide-react"

/**
 * Renders the director's photo from /images/director1.jpeg.
 * Drop the real photo at public/images/director1.jpeg — no code change needed.
 * The provided photo is used as-is and never regenerated or altered.
 */
export function DirectorPhoto({ alt, className = "" }: { alt: string; className?: string }) {
  const [failed, setFailed] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-b from-[color:var(--color-navy-700)] to-[color:var(--color-navy)] ${className}`}
        role="img"
        aria-label={alt}
      >
        <User className="h-16 w-16 text-[color:var(--color-gold-soft)]/50" strokeWidth={1} />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/images/director1.jpeg"
      alt={alt}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  )
}
