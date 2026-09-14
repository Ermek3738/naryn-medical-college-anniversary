"use client"

import { useLang } from "@/components/language-provider"
import { t, venues } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { Ornament } from "@/components/ornament"
import { MapPin, ExternalLink } from "lucide-react"

export function Venues() {
  const { lang } = useLang()

  return (
    <section id="venues" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-gold)]">
            {t.venuesSection.kicker[lang]}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-[color:var(--color-navy)] sm:text-5xl">
            {t.venuesSection.title[lang]}
          </h2>
          <Ornament className="mt-6" color="var(--color-gold)" />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {venues.map((v, i) => (
            <Reveal as="div" key={v.id} delay={(i % 2) * 100}>
              <div className="group flex h-full flex-col justify-between rounded-xl border border-[color:var(--color-navy)]/10 bg-[color:var(--color-cream)] p-5 transition-all hover:border-[color:var(--color-gold)] hover:shadow-lg">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-navy)] text-[color:var(--color-gold)]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[color:var(--color-gold)]">
                      {t.venuesSection.place[lang]}
                    </p>
                    <h3 className="mt-0.5 font-serif text-lg font-medium leading-snug text-[color:var(--color-navy)]">
                      {v.name[lang]}
                    </h3>
                  </div>
                </div>
                <a
                  href={v.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full border border-[color:var(--color-navy)]/15 px-4 py-2 text-sm font-medium text-[color:var(--color-navy)] transition-colors hover:bg-[color:var(--color-navy)] hover:text-white"
                >
                  {t.venuesSection.map[lang]}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
