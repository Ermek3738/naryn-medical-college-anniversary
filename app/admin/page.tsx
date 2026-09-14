"use client"

import { useState } from "react"
import { Loader2, Lock, Users, Building2, MapPin, CheckCircle2, XCircle } from "lucide-react"

type Stats = {
  responses: number
  confirmed: number
  declined: number
  totalGuests: number
  byOrg: [string, number][]
  byCity: [string, number][]
}

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [stats, setStats] = useState<Stats | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "unauthorized" | "notconfigured">("idle")

  const load = async () => {
    setStatus("loading")
    try {
      const res = await fetch("/api/admin/stats", { headers: { "x-admin-password": password } })
      if (res.status === 401) return setStatus("unauthorized")
      if (res.status === 503) return setStatus("notconfigured")
      if (!res.ok) return setStatus("error")
      const data = await res.json()
      setStats(data.stats)
      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }

  if (!stats) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-[color:var(--color-navy)] px-5">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-navy)] text-[color:var(--color-gold)]">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-5 text-center font-serif text-2xl font-semibold text-[color:var(--color-navy)]">
            Админ панели
          </h1>
          <p className="mt-1 text-center text-sm text-[color:var(--color-navy)]/60">
            80 жылдык маараке — катышуучулар статистикасы
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              load()
            }}
            className="mt-6 space-y-3"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Сырсөз / Пароль"
              className="w-full rounded-lg border border-[color:var(--color-navy)]/15 px-4 py-3 outline-none focus:border-[color:var(--color-gold)]"
            />
            <button
              type="submit"
              disabled={status === "loading" || !password}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--color-navy)] px-4 py-3 font-semibold text-white disabled:opacity-60"
            >
              {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
              Кирүү / Войти
            </button>
          </form>
          {status === "unauthorized" && (
            <p className="mt-3 text-center text-sm text-red-500">Сырсөз туура эмес / Неверный пароль</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-center text-sm text-red-500">Ката кетти / Произошла ошибка</p>
          )}
          {status === "notconfigured" && (
            <p className="mt-3 text-center text-sm text-amber-600">
              ADMIN_PASSWORD орнотулган эмес. Долбоордун жөндөөлөрүнөн кошуңуз.
            </p>
          )}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[100svh] bg-[color:var(--color-cream)] px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl font-semibold text-[color:var(--color-navy)]">Катышуучулар статистикасы</h1>
        <p className="mt-1 text-[color:var(--color-navy)]/60">Статистика участников · 80 жылдык маараке</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <StatCard icon={<Users className="h-5 w-5" />} label="Бардык жооптор" value={stats.responses} />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Катышат"
            value={stats.confirmed}
            accent
          />
          <StatCard icon={<XCircle className="h-5 w-5" />} label="Катышпайт" value={stats.declined} />
          <StatCard icon={<Users className="h-5 w-5" />} label="Бардык конок" value={stats.totalGuests} accent />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Breakdown title="Уюмдар боюнча" icon={<Building2 className="h-4 w-4" />} rows={stats.byOrg} />
          <Breakdown title="Шаарлар боюнча" icon={<MapPin className="h-4 w-4" />} rows={stats.byCity} />
        </div>
      </div>
    </main>
  )
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: number
  accent?: boolean
}) {
  return (
    <div className={`rounded-xl p-5 ${accent ? "bg-[color:var(--color-navy)] text-white" : "bg-white"}`}>
      <div className={accent ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-navy)]/50"}>{icon}</div>
      <p className="mt-3 font-serif text-3xl font-bold">{value}</p>
      <p className={`mt-1 text-sm ${accent ? "text-white/70" : "text-[color:var(--color-navy)]/60"}`}>{label}</p>
    </div>
  )
}

function Breakdown({
  title,
  icon,
  rows,
}: {
  title: string
  icon: React.ReactNode
  rows: [string, number][]
}) {
  return (
    <div className="rounded-xl bg-white p-5">
      <h2 className="flex items-center gap-2 font-semibold text-[color:var(--color-navy)]">
        <span className="text-[color:var(--color-gold)]">{icon}</span>
        {title}
      </h2>
      <ul className="mt-4 space-y-2">
        {rows.length === 0 && <li className="text-sm text-[color:var(--color-navy)]/40">—</li>}
        {rows.map(([name, count]) => (
          <li key={name} className="flex items-center justify-between border-b border-[color:var(--color-navy)]/5 pb-2 text-sm">
            <span className="text-[color:var(--color-navy)]/80">{name}</span>
            <span className="font-semibold text-[color:var(--color-navy)]">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
