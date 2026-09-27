import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../components/CustomCard/CustomCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PROJECTS, localizeProject } from "./projectsData";

export default function Projects() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Resolve translations once per language instead of on every card render,
  // which also keeps the object identities stable for CustomCard's memo().
  const projects = useMemo(() => PROJECTS.map((p) => localizeProject(p, t)), [t]);

  const handleOpen = useCallback(
    (project) => navigate(`/projects/${project.id}`),
    [navigate]
  );

  return (
    <div className="container mt-10 flex flex-wrap justify-between">
      <SectionHeading
        className="mb-0 w-full px-0 md:px-2"
        title={t("PROJECTS_TITLE")}
        subtitle={t("PROJECTS_SUBTITLE")}
        titleClassName="text-[#ff4d6d] tracking-wide text-2xl md:text-[34px]"
      />

      <div className="grid w-full grid-cols-1 gap-3 pb-8 min-[505px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1310px]:grid-cols-4 sm:gap-4 md:gap-6">
        {projects.map((project) => (
          <CustomCard key={project.id} project={project} onOpen={handleOpen} />
        ))}
      </div>
    </div>
  );
}
