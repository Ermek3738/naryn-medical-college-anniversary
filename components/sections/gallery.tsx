"use client"

import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { Ornament } from "@/components/ornament"
import { ImageIcon } from "lucide-react"

/* Add new photos here — path + alt text. They lay out automatically. */
const photos: { src: string; alt: string }[] = [
  { src: "/images/building.png", alt: "Нарын медициналык колледжи" },
]

export function Gallery() {
  const { lang } = useLang()
  // Fill remaining slots with placeholders that are easy to replace later.
  const slots = [...photos, ...Array.from({ length: Math.max(0, 5 - photos.length) }).map(() => null)]

  return (
    <section id="gallery" className="relative bg-[color:var(--color-navy)] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-gold-soft)]">
            {t.gallery.kicker[lang]}
          </p>
          <h2 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">{t.gallery.title[lang]}</h2>
          <Ornament className="mt-6" color="var(--color-gold)" />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3">
            {slots.map((p, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2" : ""} ${
                  p ? "" : "flex items-center justify-center border border-dashed border-white/20 bg-white/5"
                }`}
              >
                {p ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.src || "/placeholder.svg"}
                    alt={p.alt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 p-3 text-center text-white/40">
                    <ImageIcon className="h-6 w-6" strokeWidth={1.3} />
                    <span className="text-[0.65rem]">{t.gallery.note[lang]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
