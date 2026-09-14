"use client"

import { useEffect, useRef, useState } from "react"
import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"

/**
 * Renders the real NMK logo from /images/logo.png.
 * Drop the official logo file at public/images/logo.png — no code change needed.
 * Until then, an elegant placeholder emblem is shown (the real logo is never altered/generated).
 */
export function SiteLogo({ size = 96, className = "" }: { size?: number; className?: string }) {
  const { lang } = useLang()
  const [failed, setFailed] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  // The error event can fire before hydration; re-check on mount.
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-full border border-[color:var(--color-gold)]/60 bg-white/5 ${className}`}
        style={{ width: size, height: size }}
        aria-label={t.logoAlt[lang]}
        role="img"
      >
        <span className="font-serif text-[color:var(--color-gold)]" style={{ fontSize: size * 0.34 }}>
          НМК
        </span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/images/logo.png"
      alt={t.logoAlt[lang]}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  )
}
