"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Lang } from "@/lib/i18n"

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default language is Kyrgyz.
  const [lang, setLangState] = useState<Lang>("ky")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("nmk-lang") as Lang | null) : null
    if (saved === "ky" || saved === "ru") setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem("nmk-lang", l)
      document.documentElement.lang = l
    } catch {}
  }

  const toggle = () => setLang(lang === "ky" ? "ru" : "ky")

  return <LanguageContext.Provider value={{ lang, setLang, toggle }}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must be used within LanguageProvider")
  return ctx
}
