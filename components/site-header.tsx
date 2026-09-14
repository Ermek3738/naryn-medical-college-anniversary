"use client"

import { useEffect, useState } from "react"
import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"
import { SiteLogo } from "@/components/site-logo"

export function SiteHeader() {
  const { lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[color:var(--color-navy)]/90 backdrop-blur-md shadow-[0_1px_0_rgba(201,162,75,0.2)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <SiteLogo size={scrolled ? 36 : 42} className="transition-all duration-500" />
          <span className="hidden text-sm font-medium tracking-wide text-white/90 sm:block">
            {lang === "ky" ? "НМК • 1945–2025" : "НМК • 1945–2025"}
          </span>
        </a>

        <div
          className="flex items-center rounded-full border border-white/20 bg-white/5 p-0.5 text-xs font-semibold backdrop-blur-sm"
          role="group"
          aria-label="Language"
        >
          <button
            onClick={() => setLang("ky")}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              lang === "ky" ? "bg-[color:var(--color-gold)] text-[color:var(--color-navy)]" : "text-white/80 hover:text-white"
            }`}
            aria-pressed={lang === "ky"}
          >
            Кыргызча
          </button>
          <button
            onClick={() => setLang("ru")}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              lang === "ru" ? "bg-[color:var(--color-gold)] text-[color:var(--color-navy)]" : "text-white/80 hover:text-white"
            }`}
            aria-pressed={lang === "ru"}
          >
            Русский
          </button>
        </div>
      </div>
    </header>
  )
}
