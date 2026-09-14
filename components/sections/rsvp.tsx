"use client"

import { useState, type FormEvent } from "react"
import { useLang } from "@/components/language-provider"
import { t } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"
import { Ornament } from "@/components/ornament"
import { Check, Minus, Plus, Loader2 } from "lucide-react"

type Status = "idle" | "submitting" | "success" | "error"

export function Rsvp() {
  const { lang } = useLang()
  const [status, setStatus] = useState<Status>("idle")
  const [attending, setAttending] = useState<"yes" | "no">("yes")
  const [guests, setGuests] = useState(1)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const reset = () => {
    setStatus("idle")
    setAttending("yes")
    setGuests(1)
    setErrors({})
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      organization: String(data.get("organization") ?? "").trim(),
      position: String(data.get("position") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      attending,
      guests,
    }

    const newErrors: Record<string, boolean> = {}
    for (const k of ["name", "organization", "city", "phone"] as const) {
      if (!payload[k]) newErrors[k] = true
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus("submitting")
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("request_failed")
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  const fieldClass = (name: string) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-[color:var(--color-navy)] outline-none transition-colors placeholder:text-[color:var(--color-navy)]/30 focus:border-[color:var(--color-gold)] ${
      errors[name] ? "border-red-400" : "border-[color:var(--color-navy)]/15"
    }`

  return (
    <section id="rsvp" className="relative bg-[color:var(--color-cream)] py-20 sm:py-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-gold)]">
            {t.rsvp.kicker[lang]}
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-semibold text-[color:var(--color-navy)] sm:text-4xl">
            {t.rsvp.title[lang]}
          </h2>
          <Ornament className="mt-6" color="var(--color-gold)" />
          <p className="mx-auto mt-6 max-w-lg text-pretty text-[color:var(--color-navy)]/70">{t.rsvp.body[lang]}</p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 rounded-2xl bg-white p-6 shadow-[0_20px_60px_-25px_rgba(10,26,58,0.4)] sm:p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-gold)]/15 text-[color:var(--color-gold)]">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-[color:var(--color-navy)]">
                  {t.rsvp.successTitle[lang]}
                </h3>
                <p className="mt-3 text-pretty text-[color:var(--color-navy)]/70">{t.rsvp.success[lang]}</p>
                <button
                  onClick={reset}
                  className="mt-8 text-sm font-semibold text-[color:var(--color-gold)] underline-offset-4 hover:underline"
                >
                  {t.rsvp.again[lang]}
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <Field label={t.rsvp.name[lang]} required error={errors.name} errorText={t.rsvp.required[lang]}>
                  <input name="name" className={fieldClass("name")} autoComplete="name" />
                </Field>
                <Field
                  label={t.rsvp.org[lang]}
                  required
                  error={errors.organization}
                  errorText={t.rsvp.required[lang]}
                >
                  <input name="organization" className={fieldClass("organization")} />
                </Field>
                <Field label={`${t.rsvp.position[lang]} (${t.rsvp.optional[lang]})`}>
                  <input name="position" className={fieldClass("position")} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t.rsvp.city[lang]} required error={errors.city} errorText={t.rsvp.required[lang]}>
                    <input name="city" className={fieldClass("city")} />
                  </Field>
                  <Field label={t.rsvp.phone[lang]} required error={errors.phone} errorText={t.rsvp.required[lang]}>
                    <input name="phone" type="tel" inputMode="tel" className={fieldClass("phone")} autoComplete="tel" />
                  </Field>
                </div>

                {/* Attending */}
                <fieldset>
                  <legend className="mb-2 text-sm font-medium text-[color:var(--color-navy)]">
                    {t.rsvp.attendQuestion[lang]} <span className="text-[color:var(--color-gold)]">*</span>
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(["yes", "no"] as const).map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setAttending(val)}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                          attending === val
                            ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]/10 text-[color:var(--color-navy)]"
                            : "border-[color:var(--color-navy)]/15 text-[color:var(--color-navy)]/70"
                        }`}
                        aria-pressed={attending === val}
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                            attending === val
                              ? "border-[color:var(--color-gold)] bg-[color:var(--color-gold)]"
                              : "border-[color:var(--color-navy)]/30"
                          }`}
                        >
                          {attending === val && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                        {t.rsvp[val][lang]}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Guests */}
                {attending === "yes" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[color:var(--color-navy)]">
                      {t.rsvp.guests[lang]}
                    </label>
                    <div className="inline-flex items-center rounded-lg border border-[color:var(--color-navy)]/15">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="flex h-11 w-11 items-center justify-center text-[color:var(--color-navy)] disabled:opacity-30"
                        disabled={guests <= 1}
                        aria-label="-"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-serif text-lg font-semibold text-[color:var(--color-navy)]">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(50, g + 1))}
                        className="flex h-11 w-11 items-center justify-center text-[color:var(--color-navy)] disabled:opacity-30"
                        disabled={guests >= 50}
                        aria-label="+"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    <strong className="font-semibold">{t.rsvp.errorTitle[lang]}: </strong>
                    {t.rsvp.error[lang]}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-navy)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                >
                  {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status === "submitting" ? t.rsvp.submitting[lang] : t.rsvp.submit[lang]}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({
  label,
  required,
  error,
  errorText,
  children,
}: {
  label: string
  required?: boolean
  error?: boolean
  errorText?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[color:var(--color-navy)]">
        {label} {required && <span className="text-[color:var(--color-gold)]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{errorText}</p>}
    </div>
  )
}
