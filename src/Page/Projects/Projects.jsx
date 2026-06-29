import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomCard from "../../components/CustomCard/CustomCard";
import RadioatorPro from "../../assets/img/RadioatorPro.png"
import gipper from "../../assets/img/gipper.png"
import bizCore from "../../assets/img/bizCore.png"
import parthubLogo from "../../assets/img/parthub.png"
import studense from "../../assets/img/studense.png"
import sun_energy_img from "../../assets/img/sun_energy_img.jpg"
import ITPARKIMG from "../../assets/img/ITPARK.png"
import clubMraa from "../../assets/img/image.png"

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
    <Box
      sx={{
        // minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginTop: "40px"
      }}
    >
      <Stack width="100%" px={{ xs: 2, md: 10 }} mb={4}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ color: "#ff4d6d", letterSpacing: "2px" }}
        >
          {t("PROJECTS_TITLE")}
        </Typography>
        <Typography color="#ccc">{t("PROJECTS_SUBTITLE")}</Typography>
      </Stack>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: '24px',
        justifyItems: 'center',
        justifyContent: 'start',
        width: '100%',
        px: { xs: 2, md: 4 },
        pb: 4,
      }}>
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
      </Box>
    </Box>
  );
}