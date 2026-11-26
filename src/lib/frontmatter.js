/**
 * Splits a markdown file into its `---` frontmatter and body. Understands the
 * small YAML subset the blog uses: `key: value`, quoted strings, booleans and
 * inline lists (`tags: [react, vite]`). No YAML dependency needed.
 */
export function parseFrontmatter(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source)
  if (!match) return { data: {}, body: source }

  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (!m) continue
    data[m[1]] = parseValue(m[2].trim())
  }
  return { data, body: match[2] }
}

function unquote(v) {
  return /^(["']).*\1$/.test(v) ? v.slice(1, -1) : v
}

function parseValue(v) {
  if (v === "true") return true
  if (v === "false") return false
  if (v.startsWith("[") && v.endsWith("]")) {
    return v
      .slice(1, -1)
      .split(",")
      .map((s) => unquote(s.trim()))
      .filter(Boolean)
  }
  return unquote(v)
}

/** ~200 words per minute, never less than 1. */
export function readingMinutes(text) {
  const words = String(text).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
