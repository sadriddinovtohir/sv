export async function handleContactSubmission({ name, phone, message, company } = {}) {
  // Honeypot: real visitors never fill a hidden field.
  if (company) {
    return { statusCode: 200, body: { ok: true } }
  }

  if (!name || !phone || !message) {
    return { statusCode: 400, body: { error: 'Missing required fields' } }
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
