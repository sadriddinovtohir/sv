import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router-dom"
import { marked } from "marked"
import { FiArrowLeft, FiClock } from "react-icons/fi"
import { Seo } from "@/components/common/Seo"
import Notfound from "@/components/NotFound/Notfound"
import { getPost } from "@/lib/blog"
import { useDateFormat } from "@/hooks/useDateFormat"

/**
 * `/blog/:slug`. The markdown comes from files in this repo (src/content/blog),
 * never from visitors, so rendering marked's HTML directly is safe here.
 */
export default function BlogPost() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const formatDate = useDateFormat()
  const post = getPost(slug)
  const html = useMemo(() => (post ? marked.parse(post.body, { gfm: true }) : ""), [post])

  if (!post) return <Notfound />

  return (
    <article className="mx-auto mt-8 max-w-[760px] pb-14">
      <Seo title={post.title} description={post.description} />
      <Link
        to="/blog"
        className="no-print mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-accent"
      >
        <FiArrowLeft size={16} /> {t("BLOG_BACK")}
      </Link>

      <header className="mb-8">
        <h1 className="text-aurora mb-3 text-[clamp(1.7rem,1.3rem+2vw,2.6rem)] leading-tight font-extrabold tracking-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/55">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="flex items-center gap-1"><FiClock size={13} /> {t("BLOG_MINUTES", { count: post.minutes })}</span>
          {post.tags.map((tg) => (
            <Link key={tg} to={`/blog?tag=${encodeURIComponent(tg)}`} className="text-accent hover:underline">#{tg}</Link>
          ))}
        </div>
      </header>

      <div className="prose-blog" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
