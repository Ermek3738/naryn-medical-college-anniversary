"use client"

import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { Ornament } from "@/components/ornament"

export function History() {
  const { lang } = useLang()

  return (
    <section id="history" className="relative overflow-hidden bg-[color:var(--color-navy)] py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, var(--color-gold) 0, transparent 40%), radial-gradient(circle at 80% 70%, var(--color-gold) 0, transparent 40%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-gold-soft)]">
            {t.history.kicker[lang]}
          </p>
          <div className="mt-6 font-serif text-[7rem] font-bold leading-none text-[color:var(--color-gold)] sm:text-[10rem]">
            80
          </div>
          <p className="mt-2 font-serif text-2xl tracking-wide text-white sm:text-3xl">1945 — 2025</p>
          <Ornament className="mt-6" color="var(--color-gold)" />
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/80">
            {t.history.body[lang]}
          </p>
        </Reveal>

        {/* Timeline */}
        <div className="relative mx-auto mt-16 max-w-2xl">
          <div
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[color:var(--color-gold)]/60 via-[color:var(--color-gold)]/30 to-transparent sm:left-1/2"
            aria-hidden="true"
          />
          <ul className="space-y-10">
            {t.history.timeline.map((item, i) => (
              <Reveal as="li" key={item.year} delay={i * 100} className="relative">
                <div
                  className={`flex items-center gap-5 pl-10 sm:pl-0 ${
                    i % 2 === 0 ? "sm:flex-row-reverse sm:text-left" : "sm:text-right"
                  }`}
                >
                  <div className="sm:w-1/2">
                    <p className="font-serif text-3xl font-semibold text-[color:var(--color-gold)]">{item.year}</p>
                    <p className="mt-1 text-white/80">{item.text[lang]}</p>
                  </div>
                  <span
                    className="absolute left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-[color:var(--color-gold)] ring-4 ring-[color:var(--color-navy)] sm:left-1/2"
                    aria-hidden="true"
                  />
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={200}>
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 p-2 text-center text-[0.65rem] text-white/40"
              >
                {t.history.archiveNote[lang]}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
