/**
 * Ranks command-palette items against a query. Matching is case- and
 * accent-insensitive over the label plus optional keywords:
 *   3 — label starts with the query
 *   2 — a word in the label/keywords starts with it
 *   1 — the query appears anywhere
 *  0.5 — the query's letters appear in order (fuzzy, e.g. "zkcrm" → "Zukko CRM")
 * Non-matches are dropped; ties keep the original order (stable sort).
 */
export function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[‘’ʻʼ`']/g, "")
}

function isSubsequence(needle, hay) {
  let i = 0
  for (let j = 0; j < hay.length && i < needle.length; j++) {
    if (hay[j] === needle[i]) i++
  }
  return i === needle.length
}

export function scoreItem(item, query) {
  const q = normalize(query).trim()
  if (!q) return 1
  const label = normalize(item.label)
  const hay = `${label} ${normalize((item.keywords ?? []).join(" "))}`
  if (label.startsWith(q)) return 3
  if (hay.split(/[\s\-—/.]+/).some((w) => w.startsWith(q))) return 2
  if (hay.includes(q)) return 1
  if (isSubsequence(q.replace(/\s+/g, ""), hay.replace(/\s+/g, ""))) return 0.5
  return 0
}

export function filterCommands(items, query) {
  return items
    .map((item, index) => ({ item, index, score: scoreItem(item, query) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((r) => r.item)
}
