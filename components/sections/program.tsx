"use client"

import { useState } from "react"
import { useLang } from "@/components/language-provider"
import { t, program } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { Ornament } from "@/components/ornament"
import { MapPin } from "lucide-react"

export function Program() {
  const { lang } = useLang()
  const [active, setActive] = useState(0)

  return (
    <section id="program" className="relative bg-[color:var(--color-cream)] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-gold)]">
            {t.program.kicker[lang]}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-[color:var(--color-navy)] sm:text-5xl">
            {t.program.title[lang]}
          </h2>
          <p className="mt-2 text-[color:var(--color-navy)]/60">{t.program.dates[lang]}</p>
          <Ornament className="mt-6" color="var(--color-gold)" />
        </Reveal>

        {/* Day tabs */}
        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {program.map((day, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  active === i
                    ? "bg-[color:var(--color-navy)] text-white shadow-md"
                    : "bg-white text-[color:var(--color-navy)]/70 ring-1 ring-[color:var(--color-navy)]/10 hover:ring-[color:var(--color-gold)]"
                }`}
              >
                {day.date[lang]}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active day card */}
        <div className="mt-8">
          <Reveal key={active}>
            <div className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_-15px_rgba(10,26,58,0.25)] sm:p-8">
              <div className="mb-6 flex items-baseline justify-between border-b border-[color:var(--color-navy)]/10 pb-4">
                <h3 className="font-serif text-2xl font-semibold text-[color:var(--color-navy)]">
                  {program[active].date[lang]}
                </h3>
                <p className="text-sm text-[color:var(--color-gold)]">{program[active].subtitle[lang]}</p>
              </div>

              <ul className="space-y-5">
                {program[active].items.map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-16 shrink-0 pt-0.5 text-right font-serif text-lg font-semibold text-[color:var(--color-gold)]">
                      {item.time ?? ""}
                    </div>
                    <div className="relative flex-1 border-l border-[color:var(--color-navy)]/10 pb-1 pl-4">
                      <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[color:var(--color-gold)]" />
                      <p className="font-medium text-[color:var(--color-navy)]">{item.title[lang]}</p>
                      {item.venue && (
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-[color:var(--color-navy)]/60">
                          <MapPin className="h-3.5 w-3.5 text-[color:var(--color-gold)]" />
                          {item.venue[lang]}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
