"use client"

import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"
import { SiteLogo } from "@/components/site-logo"
import { Ornament } from "@/components/ornament"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const { lang } = useLang()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Building photo — replace public/images/building.png with the real college photo */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/building.png"
          alt={lang === "ky" ? "Нарын медициналык колледжинин имараты" : "Здание Нарынского медицинского колледжа"}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-navy)]/85 via-[color:var(--color-navy)]/60 to-[color:var(--color-navy)]/95" />
        <div className="absolute inset-0 bg-[color:var(--color-navy)]/25" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 pt-20 pb-24 text-center text-white">
        <div className="animate-[fadeInUp_1s_ease-out_forwards]">
          <SiteLogo size={104} className="mx-auto drop-shadow-lg" />
        </div>

        <p
          className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--color-gold-soft)] opacity-0 animate-[fadeInUp_1s_ease-out_0.3s_forwards]"
        >
          {t.hero.college[lang]}
        </p>

        <h1 className="mt-5 font-serif text-5xl font-semibold leading-none tracking-tight opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards] sm:text-7xl">
          {t.hero.jubilee[lang]}
        </h1>

        <p className="mt-4 font-serif text-2xl text-[color:var(--color-gold)] opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards] sm:text-3xl">
          {t.hero.years[lang]}
        </p>

        <div className="opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards]">
          <Ornament className="mt-8" color="var(--color-gold)" />
        </div>

        <div className="mt-8 opacity-0 animate-[fadeInUp_1s_ease-out_1.1s_forwards]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/70">
            {t.hero.eventsLabel[lang]}
          </p>
          <p className="mt-1.5 text-lg font-medium text-white sm:text-xl">{t.hero.eventsDate[lang]}</p>
        </div>

        <button
          onClick={() => scrollTo("invitation")}
          className="mt-10 rounded-full bg-[color:var(--color-gold)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[color:var(--color-navy)] opacity-0 shadow-lg shadow-black/30 transition-transform duration-300 animate-[fadeInUp_1s_ease-out_1.3s_forwards] hover:scale-105 active:scale-95"
        >
          {t.hero.cta[lang]}
        </button>
      </div>

      <button
        onClick={() => scrollTo("invitation")}
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 animate-bounce"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  )
}
