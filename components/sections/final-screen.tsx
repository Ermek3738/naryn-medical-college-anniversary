"use client"

import { useState } from "react"
import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { Ornament } from "@/components/ornament"
import { SiteLogo } from "@/components/site-logo"
import { Share2, Check } from "lucide-react"

export function FinalScreen() {
  const { lang } = useLang()
  const [copied, setCopied] = useState(false)

  const scrollToRsvp = () => document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" })

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    const shareData = {
      title: t.hero.college[lang],
      text: t.final.shareText[lang],
      url,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
      await navigator.clipboard.writeText(`${shareData.text} — ${url}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      /* user cancelled share — no-op */
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--color-navy)] to-[#06122b] py-24 text-center text-white sm:py-32">
      <div className="relative mx-auto max-w-3xl px-5">
        <Reveal>
          <SiteLogo size={88} className="mx-auto" />
          <Ornament className="mt-8" color="var(--color-gold)" />
          <h2 className="mt-8 text-balance font-serif text-3xl font-semibold leading-tight sm:text-5xl">
            {t.final.title[lang]}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-white/80">{t.final.body[lang]}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={scrollToRsvp}
              className="w-full rounded-full bg-[color:var(--color-gold)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[color:var(--color-navy)] transition-transform hover:scale-105 active:scale-95 sm:w-auto"
            >
              {t.final.rsvp[lang]}
            </button>
            <button
              onClick={share}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {copied ? t.final.copied[lang] : t.final.share[lang]}
            </button>
          </div>
        </Reveal>

        <p className="mt-16 text-xs text-white/40">© {new Date().getFullYear()} · 1945–2025</p>
      </div>
    </section>
  )
}
