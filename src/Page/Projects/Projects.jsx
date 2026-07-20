import { useTranslation } from "react-i18next";
import CustomCard from "../../components/CustomCard/CustomCard";
import { SectionHeading } from "@/components/common/SectionHeading";
import RadioatorPro from "../../assets/img/RadioatorPro.webp"
import bizCore from "../../assets/img/bizCore.webp"
import parthubLogo from "../../assets/img/parthub.webp"
import studense from "../../assets/img/studense.webp"
import sun_energy_img from "../../assets/img/sun_energy_img.webp"
import ITPARKIMG from "../../assets/img/ITPARK.webp"
import clubMraa from "../../assets/img/image.webp"

export default function Projects() {
  const { t } = useTranslation();

  const data = [
    {
      img: bizCore,
      titleKey: "PROJECT_BACKEND_TITLE",
      descKey: "PROJECT_BACKEND_DESC",
      techKey: "PROJECT_BACKEND_TECH",
      link: "https://github.com/sadriddinovtohir",
      giturl: "https://github.com/sadriddinovtohir",
      badge: "AI Built",
    },
    {
      img: ITPARKIMG,
      titleKey: "PROJECT_ITPARK_TITLE",
      descKey: "PROJECT_ITPARK_DESC",
      techKey: "PROJECT_ITPARK_TECH",
      link: "https://www.it-park.uz/",
    },
    {
      img: studense,
      titleKey: "PROJECT_TTG_TITLE",
      descKey: "PROJECT_TTG_DESC",
      techKey: "PROJECT_TTG_TECH",
      link: "https://github.com/MaxmudAxmedov/admin-sun-energy",
      giturl: "https://github.com/MaxmudAxmedov/admin-sun-energy",
    },
    {
      img: sun_energy_img,
      titleKey: "PROJECT_SUN_ENERGY_TITLE",
      descKey: "PROJECT_SUN_ENERGY_DESC",
      techKey: "PROJECT_SUN_ENERGY_TECH",
      link: "https://quyosh-panellari-admin.netlify.app/",
      giturl: "https://github.com/MaxmudAxmedov/admin-sun-energy",
    },
    {
      img: parthubLogo,
      titleKey: "PARTHUB",
      descKey: "PROJECT_BIZCORE_DESC",
      techKey: "PROJECT_BIZCORE_TECH",
      link: "https://parthub-gamma.vercel.app/",
      giturl: "https://github.com/sadriddinovtohir/PARTHUB_FRONTEND",
    },
    {
      img: clubMraa,
      titleKey: "PROJECT_REACTNATIVE_TITLE",
      descKey: "PROJECT_REACTNATIVE_DESC",
      techKey: "PROJECT_REACTNATIVE_TECH",
      link: "https://github.com/sadriddinovtohir",
      giturl: "https://github.com/sadriddinovtohir",
    },
    {
      img: RadioatorPro,
      titleKey: "RADIATORPRO_TITLE",
      descKey: "RADIATORPRO_DESC",
      techKey: "RADIATORPRO_TECH",
      link: "https://radiator-pro.vercel.app/",
    },
  ];

  return (
    <div className="container mt-10 flex flex-wrap justify-between">
      <SectionHeading
        className="mb-0 w-full px-0 md:px-2"
        title={t("PROJECTS_TITLE")}
        subtitle={t("PROJECTS_SUBTITLE")}
        titleClassName="text-[#ff4d6d] tracking-wide text-2xl md:text-[34px]"
      />

      <div className="grid w-full grid-cols-1 gap-3 pb-8 min-[505px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1310px]:grid-cols-4 sm:gap-4 md:gap-6">
        {data.map((item, index) => (
          <CustomCard
            key={index}
            img={item.img}
            title={t(item.titleKey)}
            desc={t(item.descKey)}
            tech={t(item.techKey, { returnObjects: true })}
            link={item.link}
            giturl={item.giturl}
            badge={item.badge}
          />
        ))}
      </div>
    </div>
  );
}
