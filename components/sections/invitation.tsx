"use client"

import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { Ornament } from "@/components/ornament"
import { DirectorPhoto } from "@/components/director-photo"

export function Invitation() {
  const { lang } = useLang()

  return (
    <section id="invitation" className="relative bg-[color:var(--color-cream)] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-gold)]">
            {t.invitation.kicker[lang]}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold text-[color:var(--color-navy)] sm:text-5xl">
            {t.invitation.title[lang]}
          </h2>
          <Ornament className="mt-6" color="var(--color-gold)" />
        </Reveal>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-[1fr_320px]">
          <Reveal delay={100}>
            <p className="text-pretty font-serif text-xl leading-relaxed text-[color:var(--color-navy-700)] sm:text-2xl">
              {t.invitation.body[lang]}
            </p>
            <p className="mt-6 text-base leading-relaxed text-[color:var(--color-navy)]/70">
              {t.invitation.official[lang]}
            </p>
            <p className="mt-8 font-serif text-lg text-[color:var(--color-navy)]">
              <span className="mb-1 block h-px w-16 bg-[color:var(--color-gold)]" />
              {t.invitation.signName[lang]}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <figure className="relative mx-auto w-full max-w-[300px]">
              <div className="absolute -inset-3 rounded-2xl border border-[color:var(--color-gold)]/40" aria-hidden="true" />
              <DirectorPhoto
                alt={t.invitation.directorAlt[lang]}
                className="aspect-[3/4] w-full rounded-xl object-cover shadow-xl"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
