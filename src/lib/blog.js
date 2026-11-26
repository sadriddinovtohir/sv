import { parseFrontmatter, readingMinutes } from "./frontmatter"

// Every post is a markdown file in src/content/blog/<slug>.md. Only the blog
// pages import this module, so the posts ship in the blog's lazy chunk.
const files = import.meta.glob("../content/blog/*.md", { query: "?raw", import: "default", eager: true })

// Drafts (`draft: true`) are visible in `npm run dev` only.
const SHOW_DRAFTS = import.meta.env.DEV

export const POSTS = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(/\.md$/, "")
    const { data, body } = parseFrontmatter(raw)
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      draft: data.draft === true,
      minutes: readingMinutes(body),
      body,
    }
  })
  .filter((p) => SHOW_DRAFTS || !p.draft)
  .sort((a, b) => String(b.date).localeCompare(String(a.date)))

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug) ?? null
}
