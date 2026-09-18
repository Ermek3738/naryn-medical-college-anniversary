"use client"

import { useState } from "react"
import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { Ornament } from "@/components/ornament"
import { ChevronLeft, ChevronRight } from "lucide-react"

/* Add new photos here — path + alt text. */
const photos: { src: string; alt: string }[] = [
  { src: "/images/building.png", alt: "Нарын медициналык колледжи" },
  { src: "/images/1.jpg", alt: "Нарын медициналык колледжи" },
  { src: "/images/2.jpeg", alt: "Нарын медициналык колледжи" },
  { src: "/images/3.jpeg", alt: "Нарын медициналык колледжи" },
  { src: "/images/4.jpg", alt: "Нарын медициналык колледжи" },
  { src: "/images/5.jpeg", alt: "Нарын медициналык колледжи" },
  { src: "/images/6.jpg", alt: "Нарын медициналык колледжи" },
  { src: "/images/7.jpg", alt: "Нарын медициналык колледжи" },
  { src: "/images/8.jpg", alt: "Нарын медициналык колледжи" },
  { src: "/images/9.jpg", alt: "Нарын медициналык колледжи" },
   { src: "/images/10.jpg", alt: "Нарын медициналык колледжи" },
]

export function Gallery() {
  const { lang } = useLang()
  const [activeIndex, setActiveIndex] = useState(0)
  const activePhoto = photos[activeIndex]

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + photos.length) % photos.length)
  }

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % photos.length)
  }

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
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/20 shadow-2xl ring-1 ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activePhoto.src}
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="h-full w-full object-cover transition-opacity duration-300"
              />
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-navy)]/75 text-white shadow-lg transition-colors hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-navy)] sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[color:var(--color-navy)]/75 text-white shadow-lg transition-colors hover:bg-[color:var(--color-gold)] hover:text-[color:var(--color-navy)] sm:right-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-2">
              {photos.map((photo, index) => (
                <button
                  type="button"
                  key={photo.src}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={activeIndex === index}
                  className={`aspect-[4/3] overflow-hidden rounded-lg transition-opacity ${
                    activeIndex === index ? "ring-2 ring-[color:var(--color-gold)]" : "opacity-55 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
