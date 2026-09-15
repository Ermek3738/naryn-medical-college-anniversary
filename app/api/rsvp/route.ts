import { NextResponse } from "next/server"

/**
 * RSVP endpoint.
 *
 * To store responses in Google Sheets:
 *  1. Create a Google Apps Script Web App (doPost) that appends a row.
 *  2. Deploy it as a Web App ("Anyone" access) and copy the /exec URL.
 *  3. Add it to the project as env var GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * The row order sent matches the required columns:
 *  timestamp | name | organization | position | city | phone | attending | guests
 *
 * (Swapping to Supabase later only requires replacing the fetch block below.)
 */

export type RsvpPayload = {
  name: string
  organization: string
  position?: string
  city: string
  phone: string
  attending: "yes" | "no"
  guests: number
}

// Keep the admin dashboard useful during the current server process.
const memoryStore: (RsvpPayload & { timestamp: string })[] = ((
  globalThis as unknown as { __rsvpStore?: (RsvpPayload & { timestamp: string })[] }
).__rsvpStore ??= [])

function isValid(body: Partial<RsvpPayload>): body is RsvpPayload {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.organization === "string" &&
    body.organization.trim().length > 0 &&
    typeof body.city === "string" &&
    body.city.trim().length > 0 &&
    typeof body.phone === "string" &&
    body.phone.trim().length > 0 &&
    (body.attending === "yes" || body.attending === "no")
  )
}

async function postToWebhook(url: string, record: object) {
  let currentUrl = url
  const body = JSON.stringify(record)

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(currentUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      redirect: "manual",
    })

    if (response.status < 300 || response.status >= 400) return response

    const location = response.headers.get("location")
    if (!location) return response
    currentUrl = new URL(location, currentUrl).toString()
  }

  throw new Error("webhook_redirect_limit")
}

export async function POST(request: Request) {
  let body: Partial<RsvpPayload>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  if (!isValid(body)) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 })
  }

  const guests = Math.min(Math.max(Number.parseInt(String(body.guests), 10) || 1, 1), 50)
  const record = {
    timestamp: new Date().toISOString(),
    name: body.name.trim(),
    organization: body.organization.trim(),
    position: body.position?.trim() ?? "",
    city: body.city.trim(),
    phone: body.phone.trim(),
    attending: body.attending,
    guests,
  }

  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "sheets_not_configured" }, { status: 503 })
  }

  try {
    const response = await postToWebhook(webhook, record)

    if (!response.ok) {
      console.error("Google Sheets webhook returned", response.status)
      return NextResponse.json({ ok: false, error: "webhook" }, { status: 502 })
    }
    memoryStore.push(record)
  } catch (err) {
    console.error("Google Sheets webhook failed:", (err as Error).message)
    return NextResponse.json({ ok: false, error: "webhook" }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
