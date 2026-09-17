import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomCard from "../../components/CustomCard/CustomCard";
import ProjectDialog from "../../components/CustomCard/ProjectDialog";
import { SectionHeading } from "@/components/common/SectionHeading";
import uzfixcar from "../../assets/img/uzfixcar.webp"
import tomservis from "../../assets/img/tomservis.webp"
import uymakon from "../../assets/img/uymakon.webp"
import gitpodClone from "../../assets/img/gitpodClone.webp"
import karvon from "../../assets/img/karvon.webp"
import RadioatorPro from "../../assets/img/RadioatorPro.webp"
import bizCore from "../../assets/img/bizCore.webp"
import studense from "../../assets/img/studense.webp"
import sun_energy_img from "../../assets/img/sun_energy_img.webp"
import ITPARKIMG from "../../assets/img/ITPARK.webp"
import clubMraa from "../../assets/img/image.webp"

// Module scope: the list never changes, only its translated strings do.
const PROJECTS = [
  {
    id: "uzfixcar",
    img: uzfixcar,
    titleKey: "PROJECT_UZFIXCAR_TITLE",
    descKey: "PROJECT_UZFIXCAR_DESC",
    techKey: "PROJECT_UZFIXCAR_TECH",
    link: "https://www.uzfixcar.com/login",
  },
  {
    id: "tomservis",
    img: tomservis,
    titleKey: "PROJECT_TOMSERVIS_TITLE",
    descKey: "PROJECT_TOMSERVIS_DESC",
    techKey: "PROJECT_TOMSERVIS_TECH",
    link: "https://tom-service.vercel.app/",
  },
  {
    id: "uymakon",
    img: uymakon,
    titleKey: "PROJECT_UYMAKON_TITLE",
    descKey: "PROJECT_UYMAKON_DESC",
    techKey: "PROJECT_UYMAKON_TECH",
    link: "https://uy-makon.vercel.app/",
  },
  {
    id: "karvon",
    img: karvon,
    titleKey: "PROJECT_KARVON_TITLE",
    descKey: "PROJECT_KARVON_DESC",
    techKey: "PROJECT_KARVON_TECH",
    link: "https://karvon-eta.vercel.app/",
  },
  {
    id: "gitpod",
    img: gitpodClone,
    titleKey: "PROJECT_GITPOD_TITLE",
    descKey: "PROJECT_GITPOD_DESC",
    techKey: "PROJECT_GITPOD_TECH",
    link: "https://gitpod-lemon.vercel.app/",
  },
  {
    id: "backend",
    img: bizCore,
    titleKey: "PROJECT_BACKEND_TITLE",
    descKey: "PROJECT_BACKEND_DESC",
    techKey: "PROJECT_BACKEND_TECH",
    link: "https://github.com/sadriddinovtohir",
    giturl: "https://github.com/sadriddinovtohir",
    badge: "AI Built",
  },
  {
    id: "itpark",
    img: ITPARKIMG,
    titleKey: "PROJECT_ITPARK_TITLE",
    descKey: "PROJECT_ITPARK_DESC",
    techKey: "PROJECT_ITPARK_TECH",
    link: "https://www.it-park.uz/",
  },
  {
    id: "ttg",
    img: studense,
    titleKey: "PROJECT_TTG_TITLE",
    descKey: "PROJECT_TTG_DESC",
    techKey: "PROJECT_TTG_TECH",
    link: "https://github.com/MaxmudAxmedov/admin-sun-energy",
    giturl: "https://github.com/MaxmudAxmedov/admin-sun-energy",
  },
  {
    id: "sun-energy",
    img: sun_energy_img,
    titleKey: "PROJECT_SUN_ENERGY_TITLE",
    descKey: "PROJECT_SUN_ENERGY_DESC",
    techKey: "PROJECT_SUN_ENERGY_TECH",
    link: "https://quyosh-panellari-admin.netlify.app/",
    giturl: "https://github.com/MaxmudAxmedov/admin-sun-energy",
  },
  {
    id: "react-native",
    img: clubMraa,
    titleKey: "PROJECT_REACTNATIVE_TITLE",
    descKey: "PROJECT_REACTNATIVE_DESC",
    techKey: "PROJECT_REACTNATIVE_TECH",
    link: "https://github.com/sadriddinovtohir",
    giturl: "https://github.com/sadriddinovtohir",
  },
  {
    id: "radiator-pro",
    img: RadioatorPro,
    titleKey: "RADIATORPRO_TITLE",
    descKey: "RADIATORPRO_DESC",
    techKey: "RADIATORPRO_TECH",
    link: "https://radiator-pro.vercel.app/",
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);

  // Resolve translations once per language instead of on every card render,
  // which also keeps the object identities stable for CustomCard's memo().
  const projects = useMemo(
    () =>
      PROJECTS.map((p) => ({
        ...p,
        title: t(p.titleKey),
        desc: t(p.descKey),
        tech: t(p.techKey, { returnObjects: true }),
      })),
    [t]
  );

  const handleOpen = useCallback((project) => {
    setActive(project);
    setOpen(true);
  }, []);

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

      {/* Mounted only after the first card click — one Dialog for the whole grid. */}
      {active && (
        <ProjectDialog project={active} open={open} onOpenChange={setOpen} />
      )}
    </div>
  );
}
