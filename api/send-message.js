import { handleContactSubmission } from './_lib/sendTelegram.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { statusCode, body } = await handleContactSubmission(req.body || {})
  return res.status(statusCode).json(body)
}
