import { describe, expect, it } from "vitest"
import { filterCommands, normalize, scoreItem } from "./commandSearch"
import { parseFrontmatter, readingMinutes } from "./frontmatter"
import { summarize } from "./text"
import { getTheme, resolveTheme, setTheme, toggleTheme } from "./theme"

describe("commandSearch", () => {
  const items = [
    { id: "home", label: "Home" },
    { id: "zukko", label: "Zukko CRM", keywords: ["react"] },
    { id: "projects", label: "Projects", keywords: ["portfolio"] },
    { id: "contact", label: "Contact", keywords: ["hire"] },
  ]

  it("returns everything for an empty query, in order", () => {
    expect(filterCommands(items, "  ").map((i) => i.id)).toEqual(["home", "zukko", "projects", "contact"])
  })

  it("ranks prefix > word > substring > fuzzy", () => {
    expect(scoreItem(items[2], "pro")).toBe(3)
    expect(scoreItem(items[1], "crm")).toBe(2)
    expect(scoreItem(items[3], "ntac")).toBe(1)
    expect(scoreItem(items[1], "zkcrm")).toBe(0.5)
    expect(scoreItem(items[0], "xyz")).toBe(0)
  })

  it("matches keywords and drops non-matches", () => {
    expect(filterCommands(items, "hire").map((i) => i.id)).toEqual(["contact"])
    expect(filterCommands(items, "react").map((i) => i.id)).toEqual(["zukko"])
  })

  it("ignores case, accents and apostrophes", () => {
    expect(normalize("O'zbekcha")).toBe("ozbekcha")
    expect(normalize("Résumé")).toBe("resume")
  })
})

describe("frontmatter", () => {
  it("parses strings, booleans and inline lists", () => {
    const { data, body } = parseFrontmatter('---\ntitle: "Hello: world"\ndraft: true\ntags: [react, "vite"]\n---\n# Body\n')
    expect(data).toEqual({ title: "Hello: world", draft: true, tags: ["react", "vite"] })
    expect(body).toBe("# Body\n")
  })

  it("handles CRLF files and files without frontmatter", () => {
    expect(parseFrontmatter("---\r\ndate: 2026-01-01\r\n---\r\nText").data.date).toBe("2026-01-01")
    expect(parseFrontmatter("Just text")).toEqual({ data: {}, body: "Just text" })
  })

  it("estimates reading time at ~200 wpm, minimum one minute", () => {
    expect(readingMinutes("one two")).toBe(1)
    expect(readingMinutes("word ".repeat(1000))).toBe(5)
  })
})

describe("summarize", () => {
  it("keeps short text and cuts long text at a sentence end", () => {
    expect(summarize("Short.")).toBe("Short.")
    const long = "First sentence here. " + "Second sentence is much longer than the limit allows for sure. ".repeat(5)
    expect(summarize(long, 30)).toBe("First sentence here.")
    // A sentence end too early in the window (< 40%) is skipped for a word cut.
    expect(summarize(long, 60).endsWith("…")).toBe(true)
  })

  it("falls back to a word boundary with an ellipsis", () => {
    expect(summarize("aaa bbb ccc ddd eee fff", 12)).toBe("aaa bbb ccc…")
  })
})

describe("theme", () => {
  it("prefers a stored choice, else the OS preference", () => {
    expect(resolveTheme("light", false)).toBe("light")
    expect(resolveTheme("dark", true)).toBe("dark")
    expect(resolveTheme(null, true)).toBe("light")
    expect(resolveTheme("bogus", false)).toBe("dark")
  })

  it("applies, persists and toggles the theme", () => {
    setTheme("light")
    expect(document.documentElement.dataset.theme).toBe("light")
    expect(localStorage.getItem("theme")).toBe("light")
    toggleTheme()
    expect(getTheme()).toBe("dark")
  })
})
