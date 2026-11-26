export const LIMITS = { name: 80, message: 2000 }

// Best-effort rate limit: 5 messages per IP per 10 minutes. It lives in the
// function instance's memory, so on a serverless platform each warm instance
// counts on its own — enough to stop a script hammering the form, not a hard
// guarantee. Use a shared store (e.g. Upstash Redis) if that is ever needed.
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX = 5
const hits = new Map()

export function isRateLimited(ip, now = Date.now()) {
  if (!ip) return false
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}

/** Test hook. */
export function _resetRateLimit() {
  hits.clear()
}

/** First address in x-forwarded-for (set by Vercel), else the socket address. */
export function clientIp(req) {
  const fwd = req.headers?.['x-forwarded-for']
  const first = (Array.isArray(fwd) ? fwd[0] : fwd)?.split(',')[0]?.trim()
  return first || req.socket?.remoteAddress || ''
}

export async function handleContactSubmission({ name, phone, message, company } = {}, { ip = '', now = Date.now() } = {}) {
  // Honeypot: real visitors never fill a hidden field.
  if (company) {
    return { statusCode: 200, body: { ok: true } }
  }

  name = typeof name === 'string' ? name.trim() : ''
  phone = typeof phone === 'string' ? phone.trim() : ''
  message = typeof message === 'string' ? message.trim() : ''

  if (!name || !phone || !message) {
    return { statusCode: 400, body: { error: 'Missing required fields' } }
  }

  if (name.length > LIMITS.name || message.length > LIMITS.message) {
    return { statusCode: 400, body: { error: 'Field too long' } }
  }

  if (!/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/.test(phone)) {
    return { statusCode: 400, body: { error: 'Invalid phone number' } }
  }

  if (isRateLimited(ip, now)) {
    return { statusCode: 429, body: { error: 'Too many messages, try again later' } }
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return { statusCode: 500, body: { error: 'Server is not configured' } }
  }

  const text = [
    '📩 New portfolio inquiry',
    `Name: ${name}`,
    `Phone: ${phone}`,
    '',
    message,
  ].join('\n')

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    const data = await tgRes.json()
    if (!data.ok) {
      console.error('Telegram API error:', data.description || data)
      return { statusCode: 502, body: { error: 'Telegram API error' } }
    }

    return { statusCode: 200, body: { ok: true } }
  } catch {
    return { statusCode: 500, body: { error: 'Failed to send message' } }
  }
}
