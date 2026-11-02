import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/common/Seo";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import CustomCard from "../../components/CustomCard/CustomCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PROJECTS, PROJECT_CATEGORIES, localizeProject } from "./projectsData";

export default function Projects() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // The active tab lives in the URL (?type=bot), so coming back from a
  // project's detail page lands on the same tab.
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type");
  const active = PROJECT_CATEGORIES.includes(type) ? type : "all";

  // Resolve translations once per language instead of on every card render,
  // which also keeps the object identities stable for CustomCard's memo().
  const projects = useMemo(() => PROJECTS.map((p) => localizeProject(p, t)), [t]);

  const counts = useMemo(() => {
    const c = { all: projects.length };
    for (const p of projects) for (const key of p.categories ?? []) c[key] = (c[key] ?? 0) + 1;
    return c;
  }, [projects]);

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.categories?.includes(active))),
    [projects, active]
  );

  const selectTab = (key) =>
    setSearchParams(key === "all" ? {} : { type: key }, { replace: true });

  const handleOpen = useCallback(
    (project) => navigate(`/projects/${project.id}`),
    [navigate]
  );

  return (
    <div className="mt-10 flex flex-wrap justify-between">
      <Seo title={t("NAV_PROJECTS")} description={t("PROJECTS_SUBTITLE")} />
      <SectionHeading
        className="mb-0 w-full px-0 md:px-2"
        title={t("PROJECTS_TITLE")}
        subtitle={t("PROJECTS_SUBTITLE")}
        titleClassName="text-aurora tracking-wide text-2xl md:text-[34px]"
      />

      <div
        role="tablist"
        aria-label={t("PROJECTS_TITLE")}
        className="mb-6 flex w-full gap-1 overflow-x-auto rounded-full border border-white/8 bg-white/4 p-1.5 [scrollbar-width:none] sm:w-fit"
      >
        {PROJECT_CATEGORIES.map((key) => {
          const selected = key === active;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => selectTab(key)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.75 text-sm font-medium whitespace-nowrap text-white/65 transition-colors duration-300 hover:bg-white/8 hover:text-white lg:px-4",
                selected &&
                  "bg-gradient-to-r from-primary to-primary/70 text-white shadow-[0_4px_18px_rgba(124,92,255,0.45)] hover:bg-primary"
              )}
            >
              {t(`PROJECTS_FILTER_${key.toUpperCase()}`)}
              <span className={cn("text-xs", selected ? "text-white/80" : "text-white/40")}>
                {counts[key] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length ? (
        <div className="grid w-full grid-cols-1 gap-3 pb-8 min-[505px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1310px]:grid-cols-4 sm:gap-4 md:gap-6">
          {visible.map((project) => (
            <CustomCard key={project.id} project={project} onOpen={handleOpen} />
          ))}
        </div>
      ) : (
        <p className="w-full pb-8 text-center text-white/50">{t("PROJECTS_FILTER_EMPTY")}</p>
      )}
    </div>
  );
}
