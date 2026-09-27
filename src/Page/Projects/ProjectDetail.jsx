import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/common/GlassPanel";
import { AiBadge } from "@/components/CustomCard/AiBadge";
import Notfound from "@/components/NotFound/Notfound";
import { PROJECTS, STACK_GROUPS, localizeProject } from "./projectsData";

function TechList({ items }) {
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <Badge
                    key={item}
                    variant="outline"
                    className="rounded-full border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white/75"
                >
                    {item}
                </Badge>
            ))}
        </div>
    );
}

/**
 * `/projects/:id` — full project page. Replaces the old details modal, which
 * couldn't fit a large grouped stack (UzFixCar spans web, mobile, backend and
 * infrastructure).
 */
export default function ProjectDetail() {
    const { id } = useParams();
    const { t } = useTranslation();

    const project = useMemo(() => {
        const raw = PROJECTS.find((p) => p.id === id);
        return raw ? localizeProject(raw, t) : null;
    }, [id, t]);

    if (!project) return <Notfound />;

    const { img, title, desc, tech, techTotal, stack, giturl, link, badge } = project;
    const groups = stack
        ? STACK_GROUPS.filter((key) => stack[key]?.length).map((key) => ({
              key,
              title: t(`PROJECT_STACK_${key.toUpperCase()}`),
              items: stack[key],
          }))
        : [];

    return (
        <div className="container mt-8 pb-12">
            <Link
                to="/projects"
                className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-accent"
            >
                <FiArrowLeft size={16} /> {t("PROJECT_BACK")}
            </Link>

            {/* Hero — image at its natural ratio (no letterbox frame), info beside it on desktop */}
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
                <div className="relative">
                    <img
                        src={img}
                        alt={title}
                        decoding="async"
                        className="block h-auto w-full rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 sm:rounded-3xl"
                    />
                    {badge && <AiBadge size="lg" />}
                </div>

                <div>
                    <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-white md:text-[34px]">
                        {title}
                    </h1>
                    <p className="mb-6 text-[13.5px] leading-[1.75] text-white/65 md:text-[15px]">
                        {desc}
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:max-w-md">
                        {giturl && (
                            <Button asChild variant="outline" className="h-10.5 flex-1 rounded-xl border-white/15 bg-transparent text-[14px] text-white/75 hover:border-accent hover:bg-accent/6 hover:text-accent">
                                <a target="_blank" href={giturl} rel="noreferrer">
                                    <FaGithub size={15} /> GitHub
                                </a>
                            </Button>
                        )}
                        <Button asChild variant="brand" className="h-10.5 flex-1 rounded-xl text-[14px]">
                            <a target="_blank" href={link} rel="noreferrer">
                                <FiExternalLink size={14} /> Live Demo
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stack */}
            <div className="mt-10 mb-4 flex items-baseline justify-between gap-3">
                <h2 className="text-xl font-extrabold text-[#ff4d6d] md:text-2xl">
                    {t("PROJECT_STACK_TITLE")}
                </h2>
                <span className="text-sm font-semibold text-white/45">
                    {t("PROJECT_STACK_TOTAL", { count: techTotal })}
                </span>
            </div>

            {groups.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {groups.map((group) => (
                        <GlassPanel key={group.key} className="p-4 sm:p-5">
                            <div className="mb-3 flex items-center justify-between gap-2">
                                <h3 className="text-[15px] font-bold text-white sm:text-base">{group.title}</h3>
                                <Badge className="rounded-full border-primary/30 bg-primary/15 px-2.5 text-xs font-semibold text-accent">
                                    {group.items.length}
                                </Badge>
                            </div>
                            <TechList items={group.items} />
                        </GlassPanel>
                    ))}
                </div>
            ) : (
                <GlassPanel className="p-4 sm:p-5">
                    <TechList items={tech} />
                </GlassPanel>
            )}
        </div>
    );
}
