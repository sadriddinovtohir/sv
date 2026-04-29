import React from "react";
import { Box, Stack } from "@mui/material";
import CustomCard from "../../components/CustomCard/CustomCard";
import imragit from "../../assets/img/image.png"
import gipper from "../../assets/img/gipper.png"
import bizCore from "../../assets/img/bizCore.png"
import studense from "../../assets/img/studense.png"
import sun_energy_img from "../../assets/img/sun_energy_img.jpg"
import ITPARKIMG from "../../assets/img/ITPARK.png"

export default function Projects() {
  const data = [
    {
      img: ITPARKIMG,
      title: "IT PARK",
      desc: `I previously had experience working at IT Park, and now I have been officially accepted into a formal position. Here, I will further develop my frontend and IT skills while working on real-world projects as part of a team. My goal is to grow professionally and contribute to building high-quality and useful digital products using modern technologies.   🇷🇺 Русский (professional description)`,
      tech: ["TEACHER"],
      link: "https://giper-mart-tau.vercel.app/",
      giturl: "https://github.com/sadriddinovtohir/giperMart",
    },
    {
      img: gipper,
      title: "GiperMart",
      desc: "Developed a modern online marketplace with React 19 and Vite Built scalable architecture with Redux Toolkit and TanStack Query Implemented product catalog, search system, and user profile dashboard",
      tech: ["React",
        "Vite",
        "Material UI",
        "Redux Toolkit",
        "TanStack Query",
        "Axios",
        "React Hook Form",],
      link: "https://giper-mart-tau.vercel.app/",
      giturl: "https://github.com/sadriddinovtohir/giperMart",
    },
    {
      img: studense,
      title: "TTG",
      desc: "Developing a role-based learning platform for a Japanese company with four user roles: System Admin, Admin, Teacher, and Student",
      tech: ["React",
        "TanStack Query",
        "Tailwind CSS",
        "Shadcn UI",
        "Axios", "Context api", "React Hook Form", "React Router Dom", "Rest Api"],
      link: "https://github.com/MaxmudAxmedov/admin-sun-energy",
      giturl: "https://github.com/MaxmudAxmedov/admin-sun-energy",
    },
    {
      img: sun_energy_img,
      title: "Sun Energy",
      desc: "Improved performance and user experience Built reusable component architecture Frontend- backend collaboration",
      tech: ["React",
        "Next.js",
        "TanStack Query",
        "Tailwind CSS",
        "Shadcn UI",
        "Axios", "Redux", "React Hook Form", "React Router Dom", "Rest Api"],
      link: "https://quyosh-panellari-admin.netlify.app/",
      giturl: "https://github.com/MaxmudAxmedov/admin-sun-energy",
    },
    {
      img: bizCore,
      title: "BizCore ",
      desc: "A unified marketplace where business owners sell and manage their products online Frontend development of a modern and scalable e-commerce platform",
      tech: ["Next.js",
        "Ant Design",
        "shadcn/ui",
        "Redux",
        "TanStack Query",
        "React Hook Form",
        "Next I18",],
      link: "https://github.com/PartHub-SNG/PartHub_Frontend",
      giturl: "https://github.com/PartHub-SNG/PartHub_Frontend",
    },
    {
      img: "https://frankfurt.apollo.olxcdn.com/v1/files/skza7cxrql3g-UZ/image",
      title: "ZuhrStar IT Academy ",
      desc: "Teaching Frontend Development to students Creating comprehensive course materials Mentoring and guiding aspiring developers",
      tech: ["Teacher",],
      link: "https://yandex.uz/maps/org/19482222114/?ll=69.458631%2C41.388231&z=15",
    },
    {
      img: imragit,
      title: "IMRAAGT Uz  ",
      desc: "Developing a modern and user-friendly interface",
      tech: ["Html", "Cass"],
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
      <Stack direction="row" rowGap={"10px"} gap={"30px"} justifyContent={"center"} flexWrap="wrap" alignItems={"center"}>
        {data.map((item, index) => (
          <CustomCard
            key={index}
            img={item.img}
            title={item.title}
            desc={item.desc}
            tech={item.tech}
            link={item.link}
            giturl={item.giturl}
          />
        ))}
      </Stack>
    </Box>
  );
}