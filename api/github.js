import { handleGithubStats } from './_lib/github.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { statusCode, headers, body } = await handleGithubStats()
  for (const [k, v] of Object.entries(headers)) res.setHeader(k, v)
  return res.status(statusCode).json(body)
}
