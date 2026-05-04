import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomCard from "../../components/CustomCard/CustomCard";
import imragit from "../../assets/img/image.png"
import gipper from "../../assets/img/gipper.png"
import bizCore from "../../assets/img/bizCore.png"
import studense from "../../assets/img/studense.png"
import sun_energy_img from "../../assets/img/sun_energy_img.jpg"
import ITPARKIMG from "../../assets/img/ITPARK.png"

export default function Projects() {
  const { t } = useTranslation();

  const data = [
    {
      img: ITPARKIMG,
      titleKey: "PROJECT_ITPARK_TITLE",
      descKey: "PROJECT_ITPARK_DESC",
      techKey: "PROJECT_ITPARK_TECH",
      link: "https://www.it-park.uz/",
    },
    {
      img: gipper,
      titleKey: "PROJECT_GIPERMART_TITLE",
      descKey: "PROJECT_GIPERMART_DESC",
      techKey: "PROJECT_GIPERMART_TECH",
      link: "https://giper-mart-tau.vercel.app/",
      giturl: "https://github.com/sadriddinovtohir/giperMart",
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
      img: bizCore,
      titleKey: "PROJECT_BIZCORE_TITLE",
      descKey: "PROJECT_BIZCORE_DESC",
      techKey: "PROJECT_BIZCORE_TECH",
      link: "https://github.com/PartHub-SNG/PartHub_Frontend",
      giturl: "https://github.com/PartHub-SNG/PartHub_Frontend",
    },
    {
      img: imragit,
      titleKey: "PROJECT_IMRAGIT_TITLE",
      descKey: "PROJECT_IMRAGIT_DESC",
      techKey: "PROJECT_IMRAGIT_TECH",
      link: "https://imraagt-uz.vercel.app/",
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

      <Stack
        direction="row"
        rowGap="10px"
        gap="30px"
        justifyContent="center"
        flexWrap="wrap"
        alignItems="center"
      >
        {data.map((item, index) => (
          <CustomCard
            key={index}
            img={item.img}
            title={t(item.titleKey)}
            desc={t(item.descKey)}
            tech={t(item.techKey, { returnObjects: true })}
            link={item.link}
            giturl={item.giturl}
          />
        ))}
      </Stack>
    </Box>
  );
}