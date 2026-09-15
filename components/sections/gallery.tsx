"use client"

import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { Ornament } from "@/components/ornament"

/* Add new photos here — path + alt text. They lay out automatically. */
const photos: { src: string; alt: string }[] = [
  { src: "/images/building.png", alt: "Нарын медициналык колледжи" },
  { src: "/images/1.jpg", alt: "Нарын медициналык колледжи" },
  { src: "/images/2.jpeg", alt: "Нарын медициналык колледжи" },
  { src: "/images/3.jpeg", alt: "Нарын медициналык колледжи" },
  { src: "/images/4.jpeg", alt: "Нарын медициналык колледжи" },
  { src: "/images/5.jpeg", alt: "Нарын медициналык колледжи" },
]

export function Gallery() {
  const { lang } = useLang()

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
            {photos.map((p, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.alt}
                  className="h-full w-full bg-black/10 object-contain transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
