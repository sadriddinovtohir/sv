/** Cuts a long description at a sentence boundary, near `max` characters. */
export function summarize(text, max = 240) {
  if (!text || text.length <= max) return text
  const cut = text.slice(0, max)
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "))
  return end > max * 0.4 ? cut.slice(0, end + 1) : `${cut.slice(0, cut.lastIndexOf(" "))}…`
}
