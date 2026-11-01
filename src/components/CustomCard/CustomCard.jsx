import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import { GlassPanel } from "@/components/common/GlassPanel";
import { Badge } from "@/components/ui/badge";
import { useReveal } from "@/hooks/useReveal";
import { AiBadge } from "./AiBadge";

/**
 * Presentational project tile. Clicking it hands the project back up via
 * `onOpen`, which navigates to the project's detail page (ProjectDetail).
 *
 * `project` comes from a memoized list in Projects.jsx, so the memo() below
 * actually holds between renders.
 */
function CustomCard({ project, onOpen }) {
    const { t } = useTranslation();
    const revealRef = useReveal();
    const { img, title, desc, tech, techTotal, link, badge } = project;

    const visibleTech = tech.slice(0, 4);
    const extraCount = techTotal - visibleTech.length;

    return (
        <GlassPanel
            as="div"
            hover
            accent="#7c5cff"
            ref={revealRef}
            data-reveal=""
            role="button"
            tabIndex={0}
            onClick={() => onOpen(project)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(project);
                }
            }}
            className="group w-full cursor-pointer rounded-[14px] p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_-8px_rgba(124,92,255,0.5)] sm:rounded-[20px] sm:p-4"
        >
            {/* Image + Badge */}
            <div className="relative mb-2 overflow-hidden rounded-[10px] bg-black/25 sm:mb-3 sm:rounded-[14px]">
                <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="150"
                    className="block h-[100px] w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-[150px]"
                />
                {badge && <AiBadge />}
            </div>

            {/* Title */}
            <p className="mb-1 text-[12.5px] leading-tight font-bold text-white sm:text-[15px]">
                {title}
            </p>

            {/* Truncated description — 3 lines (2 on mobile) */}
            <p className="mb-2 line-clamp-2 text-[10.5px] leading-[1.55] text-white/50 sm:mb-3 sm:line-clamp-3 sm:text-xs">
                {desc}
            </p>

            {/* Tech — max 4 tags + counter */}
            <div className="mb-2 flex flex-wrap gap-1 sm:mb-3 sm:gap-1.5">
                {visibleTech.map((item) => (
                    <Badge
                        key={item}
                        variant="outline"
                        className="rounded-full border-white/10 bg-white/7 px-2 py-0.75 text-[9px] font-medium text-white/65 sm:px-3 sm:text-[11px]"
                    >
                        {item}
                    </Badge>
                ))}
                {extraCount > 0 && (
                    <Badge className="rounded-full border-primary/30 bg-primary/15 px-2 py-0.75 text-[9px] font-semibold text-accent sm:px-3 sm:text-[11px]">
                        +{extraCount}
                    </Badge>
                )}
            </div>

            <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] font-semibold tracking-wide text-accent opacity-80 sm:text-xs">
                    {t("PROJECT_MORE")} →
                </span>

                {/* One-click shortcut straight to the live site, skipping the detail page. */}
                <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    title={t("PROJECT_VISIT")}
                    aria-label={`${title} — ${t("PROJECT_VISIT")}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/60 transition-colors hover:border-accent/50 hover:bg-accent/12 hover:text-accent sm:h-7.5 sm:w-7.5"
                >
                    <FiArrowUpRight size={14} />
                </a>
            </div>
        </GlassPanel>
    );
}

export default memo(CustomCard);
