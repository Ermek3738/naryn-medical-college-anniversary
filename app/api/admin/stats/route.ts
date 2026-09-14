import { NextResponse } from "next/server"
import type { RsvpPayload } from "@/app/api/rsvp/route"

/**
 * Protected stats endpoint for organizers.
 * Access requires the ADMIN_PASSWORD env var, sent as `x-admin-password` header.
 *
 * Data source: the in-memory fallback store (resets on redeploy). Once a
 * durable store is connected (Google Sheets read API or Supabase), replace the
 * `records` source below with a query to that store.
 */
const memoryStore: (RsvpPayload & { timestamp: string })[] = ((
  globalThis as unknown as { __rsvpStore?: (RsvpPayload & { timestamp: string })[] }
).__rsvpStore ??= [])

export async function GET(request: Request) {
  const password = process.env.ADMIN_PASSWORD
  const provided = request.headers.get("x-admin-password")

  if (!password) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 })
  }
  if (provided !== password) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  const records = memoryStore
  const attending = records.filter((r) => r.attending === "yes")

  const totalGuests = attending.reduce((sum, r) => sum + (r.guests || 1), 0)

  const byOrg: Record<string, number> = {}
  const byCity: Record<string, number> = {}
  for (const r of attending) {
    byOrg[r.organization] = (byOrg[r.organization] || 0) + (r.guests || 1)
    byCity[r.city] = (byCity[r.city] || 0) + (r.guests || 1)
  }

  return NextResponse.json({
    ok: true,
    stats: {
      responses: records.length,
      confirmed: attending.length,
      declined: records.length - attending.length,
      totalGuests,
      byOrg: Object.entries(byOrg).sort((a, b) => b[1] - a[1]),
      byCity: Object.entries(byCity).sort((a, b) => b[1] - a[1]),
    },
  })
}
