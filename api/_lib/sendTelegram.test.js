import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { _resetRateLimit, clientIp, handleContactSubmission, isRateLimited } from "./sendTelegram.js"

const valid = { name: "Ali", phone: "+998-90-123-45-67", message: "Hello" }

describe("handleContactSubmission", () => {
  beforeEach(() => {
    _resetRateLimit()
    process.env.TELEGRAM_BOT_TOKEN = "token"
    process.env.TELEGRAM_CHAT_ID = "42"
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    delete process.env.TELEGRAM_BOT_TOKEN
    delete process.env.TELEGRAM_CHAT_ID
  })

  it("silently accepts honeypot submissions without calling Telegram", async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal("fetch", fetchMock)
    const res = await handleContactSubmission({ ...valid, company: "bot inc" })
    expect(res).toEqual({ statusCode: 200, body: { ok: true } })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it("rejects missing or whitespace-only fields", async () => {
    expect((await handleContactSubmission({ ...valid, name: "   " })).statusCode).toBe(400)
    expect((await handleContactSubmission({ phone: valid.phone })).statusCode).toBe(400)
  })

  it("rejects over-long fields and malformed phones", async () => {
    expect((await handleContactSubmission({ ...valid, message: "x".repeat(2001) })).statusCode).toBe(400)
    expect((await handleContactSubmission({ ...valid, name: "x".repeat(81) })).statusCode).toBe(400)
    expect((await handleContactSubmission({ ...valid, phone: "+998901234567" })).statusCode).toBe(400)
  })

  it("forwards a valid message to Telegram", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) })
    vi.stubGlobal("fetch", fetchMock)
    const res = await handleContactSubmission(valid, { ip: "1.1.1.1" })
    expect(res.statusCode).toBe(200)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe("https://api.telegram.org/bottoken/sendMessage")
    const body = JSON.parse(init.body)
    expect(body.chat_id).toBe("42")
    expect(body.text).toContain("Name: Ali")
  })

  it("returns 502 when Telegram refuses the message", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ ok: false, description: "bad" }) }))
    vi.spyOn(console, "error").mockImplementation(() => {})
    expect((await handleContactSubmission(valid)).statusCode).toBe(502)
  })

  it("rate-limits a single IP after 5 messages", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ json: async () => ({ ok: true }) }))
    const now = 1_000_000
    for (let i = 0; i < 5; i++) {
      expect((await handleContactSubmission(valid, { ip: "9.9.9.9", now })).statusCode).toBe(200)
    }
    expect((await handleContactSubmission(valid, { ip: "9.9.9.9", now })).statusCode).toBe(429)
    // Other visitors are unaffected, and the window expires.
    expect((await handleContactSubmission(valid, { ip: "8.8.8.8", now })).statusCode).toBe(200)
    expect((await handleContactSubmission(valid, { ip: "9.9.9.9", now: now + 10 * 60 * 1000 })).statusCode).toBe(200)
  })
})

describe("rate limit helpers", () => {
  beforeEach(() => _resetRateLimit())

  it("never limits requests without an IP", () => {
    for (let i = 0; i < 10; i++) expect(isRateLimited("")).toBe(false)
  })

  it("reads the first x-forwarded-for address", () => {
    expect(clientIp({ headers: { "x-forwarded-for": "5.5.5.5, 10.0.0.1" } })).toBe("5.5.5.5")
    expect(clientIp({ headers: {}, socket: { remoteAddress: "127.0.0.1" } })).toBe("127.0.0.1")
  })
})
