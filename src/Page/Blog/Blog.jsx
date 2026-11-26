import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Link, useSearchParams } from "react-router-dom"
import { FiClock, FiArrowRight } from "react-icons/fi"
import { Seo } from "@/components/common/Seo"
import { SectionHeading } from "@/components/common/SectionHeading"
import { GlassPanel } from "@/components/common/GlassPanel"
import { cn } from "@/lib/utils"
import { POSTS } from "@/lib/blog"
import { useDateFormat } from "@/hooks/useDateFormat"

/** `/blog` — post list with a tag filter kept in the URL (?tag=react). */
export default function Blog() {
  const { t } = useTranslation()
  const formatDate = useDateFormat()
  const [params, setParams] = useSearchParams()
  const tag = params.get("tag")

  const tags = useMemo(() => [...new Set(POSTS.flatMap((p) => p.tags))].sort(), [])
  const visible = tag ? POSTS.filter((p) => p.tags.includes(tag)) : POSTS

  return (
    <div className="mt-10 pb-12">
      <Seo title={t("NAV_BLOG")} description={t("BLOG_SUBTITLE")} />
      <SectionHeading
        className="mb-0 w-full px-0"
        title={t("BLOG_TITLE")}
        subtitle={t("BLOG_SUBTITLE")}
        gradient
        titleClassName="tracking-wide text-2xl md:text-[34px]"
      />

      {tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {[null, ...tags].map((tg) => {
            const selected = tg === tag
            return (
              <button
                key={tg ?? "all"}
                type="button"
                aria-pressed={selected}
                onClick={() => setParams(tg ? { tag: tg } : {}, { replace: true })}
                className={cn(
                  "rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5 text-[13px] font-medium text-white/65 transition-colors hover:text-white",
                  selected && "border-primary/50 bg-primary/15 text-white"
                )}
              >
                {tg ? `#${tg}` : t("PROJECTS_FILTER_ALL")}
              </button>
            )
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <GlassPanel className="p-8 text-center">
          <p className="text-lg font-bold text-white">{t("BLOG_EMPTY_TITLE")}</p>
          <p className="mt-1 text-sm text-white/60">{t("BLOG_EMPTY_DESC")}</p>
        </GlassPanel>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visible.map((post) => (
            <GlassPanel
              key={post.slug}
              as={Link}
              to={`/blog/${post.slug}`}
              hover
              accent="#3d6bff"
              className="group flex flex-col gap-3 p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="flex items-center gap-1"><FiClock size={12} /> {t("BLOG_MINUTES", { count: post.minutes })}</span>
                {post.draft && <span className="rounded-full bg-glow/15 px-2 py-0.5 font-semibold text-glow">draft</span>}
              </div>
              <h2 className="text-lg leading-snug font-bold text-white group-hover:text-accent">{post.title}</h2>
              <p className="line-clamp-3 text-[13.5px] leading-[1.7] text-white/60">{post.description}</p>
              <div className="mt-auto flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 4).map((tg) => (
                    <span key={tg} className="rounded-full bg-white/6 px-2.5 py-0.5 text-[11px] text-white/60">#{tg}</span>
                  ))}
                </div>
                <FiArrowRight className="shrink-0 text-accent transition-transform group-hover:translate-x-1" />
              </div>
            </GlassPanel>
          ))}
        </div>
      )}
    </div>
  )
}
