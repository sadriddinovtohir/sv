import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { FaQuoteLeft } from "react-icons/fa"
import { GlassPanel } from "@/components/common/GlassPanel"
import { SectionHeading } from "@/components/common/SectionHeading"
import { TESTIMONIALS } from "@/data/testimonials"

function pickQuote(quote, lang) {
  if (typeof quote === "string") return quote
  return quote?.[lang] ?? quote?.en ?? Object.values(quote ?? {})[0] ?? ""
}

function initials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

/** What clients say. Renders nothing until src/data/testimonials.js has entries. */
export default function Testimonials({ items = TESTIMONIALS }) {
  const { t, i18n } = useTranslation()
  if (!items.length) return null

  return (
    <section className="mt-14">
      <SectionHeading title={t("TESTIMONIALS_TITLE")} subtitle={t("TESTIMONIALS_SUBTITLE")} gradient />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <GlassPanel key={item.name} as="figure" hover accent="#2ee6a6" className="flex flex-col gap-4 p-5 sm:p-6">
            <FaQuoteLeft className="text-accent/70" size={20} aria-hidden="true" />
            <blockquote className="flex-1 text-[14px] leading-[1.75] text-white/80">
              {pickQuote(item.quote, i18n.language)}
            </blockquote>
            <figcaption className="flex items-center gap-3">
              {item.avatar ? (
                <img src={item.avatar} alt="" width="40" height="40" loading="lazy" className="size-10 rounded-full object-cover" />
              ) : (
                <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-accent">
                  {initials(item.name)}
                </span>
              )}
              <div className="min-w-0">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noreferrer" className="block truncate text-sm font-bold text-white hover:text-accent">
                    {item.name}
                  </a>
                ) : (
                  <p className="truncate text-sm font-bold text-white">{item.name}</p>
                )}
                {(item.role || item.project) && (
                  <p className="truncate text-xs text-white/55">
                    {item.role}
                    {item.role && item.project && " · "}
                    {item.project && (
                      <Link to={`/projects/${item.project}`} className="text-accent hover:underline">
                        {t("TESTIMONIALS_PROJECT")}
                      </Link>
                    )}
                  </p>
                )}
              </div>
            </figcaption>
          </GlassPanel>
        ))}
      </div>
    </section>
  )
}
